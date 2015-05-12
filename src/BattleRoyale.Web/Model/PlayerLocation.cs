namespace BattleRoyale.Web.Model
{
    public class PlayerLocation
    {
        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public override string ToString()
        {
            return string.Format("[{0:0.00}, {1:0.00}]", Longitude, Latitude);
        }
    }
}