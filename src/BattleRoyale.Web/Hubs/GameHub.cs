using BattleRoyale.Web.Infrastructure;
using BattleRoyale.Web.Model;
using Microsoft.AspNet.SignalR;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BattleRoyale.Web.Hubs
{
    public class GameHub : Hub
    {
        private static readonly ConnectionMapping<string> _connections = new ConnectionMapping<string>();

        private string CurrentName { get { return Context.ConnectionId; } }

        #region Connection maintenance

        public override Task OnConnected()
        {
            string name = CurrentName;

            _connections.Add(name, Context.ConnectionId);

            Trace.TraceInformation("Connected: {0}", name);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string name = CurrentName;

            _connections.Remove(name, Context.ConnectionId);

            Trace.TraceInformation("Disconnected: {0}", name);

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            string name = CurrentName;

            if (!_connections.GetConnections(name).Contains(Context.ConnectionId))
            {
                _connections.Add(name, Context.ConnectionId);
            }

            Trace.TraceInformation("Reconnected: {0}", name);

            return base.OnReconnected();
        }

        #endregion Connection maintenance

        public void Say(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }

        public void ReportLocation(PlayerLocation location)
        {
            var player = Context.ConnectionId;
            Trace.TraceInformation("Player {0} at location = {1}", player, location);
        }
    }
}