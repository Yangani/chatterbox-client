
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

var charsNotAllowed = ['&', '<', '>', '"', "'", "/"];

var app = {
   server: 'https://api.parse.com/1/classes/chatterbox',
   init: function(){
     app.fetch();
   },
   send: function(message){
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
        //   _.each(data.results, function(item){
        //     $('#messages').append('<li>'+item.text+'</li>');
        // });

        _.each(data.results, function(dataItem){
          //console.log(dataItem.text);
          screwYouDan(dataItem.text);

            $('#main').append("<div class=chat>" +dataItem.text+ "</div>")

        })
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          // console.error('chatterbox: Failed to send message');
          console.log("Hey from the ajax fetch error", data)
        }
      })
   },

   clearMessages: function(){
     $('#main').children().html('');
   },
   addMessage: function(message){
     app.send(message);
   },
   addRoom: function(){}

}
app.init();

function screwYouDan(str){
  if(str.match(/<script>/)){
    str = "I'm an idiot"
  } else {
    return str;
  }
}
