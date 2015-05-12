function init() {
    alert('Master client connecting');

    var game = $.connection.gameHub;

    function connect() {
        console.log('Master client connecting...');

        // Hook chat ability
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            game.server.say($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });

        // Server-originating broadcast messages
        game.client.broadcastMessage = function (name, message) {
            // Html encode display name and message.
            var encodedName = $('<div />').text(name).html();
            var encodedMsg = $('<div />').text(message).html();

            // Add the message to the page.
            $('#discussion').append('<li><strong>' + encodedName
                + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
        };

        // Get the user name and store it to prepend to messages.
        $('#displayname').val(prompt('Enter your name:', ''));

        // Set initial focus to message input box.
        $('#message').focus();

        // Start the connection.
        $.connection.hub.start().done(function () {
            // Get current location from client API
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(sendLocation);
                } else {
                    console.error('Unable to read current location');
                }
            }

            // Send location to server
            function readAndSendLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(sendLocation);
                } else {
                    console.error('Unable to read current location');
                }
            }
            function sendLocation(location) {
                console.log('Sending location', location.coords);
                game.server.reportLocation({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                });
            }

            // Start sending locations
            window.setInterval(readAndSendLocation, 1000);
        });
    }

    function prepare() {
        var d = $.Deferred();
        $(".container").load("Areas/Master/chat.html", d.resolve);
        return d;
    }

    prepare().then(function () {
        console.log('Init complete. Connecting...');
        connect();
    });
}