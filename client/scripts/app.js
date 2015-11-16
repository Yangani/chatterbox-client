
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

var app = {
   server: 'https://api.parse.com/1/classes/chatterbox',
   init: function(){
     app.fetch();
   },
   send: function(){
     $.ajax({
  // This is the url you should use to communicate with the parse API server.

      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
   },

   fetch: function(){
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          _.each(data, function(message){
            $('h1').append(message.message);
          })
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          // console.error('chatterbox: Failed to send message');
          console.log("Hey from the ajax fetch error", data)
        }
      });
   },

   clearMessages: function(){},
   addMessage: function(){},
   addRoom: function(){}

}
app.init();
