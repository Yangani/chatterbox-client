

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
        console.log(data);
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    })
     app.fetch();
   },

   fetch: function(){
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          var resultsArray = data.results;
          console.log("resultsArray:", resultsArray);
          resultsArray.forEach(function(messageObj, index){
            if(messageObj.text){
              if(messageObj.text.indexOf('<') > -1){
                resultsArray.splice(index, 1);
              } else {
                divString = "<div class=chat username>" + messageObj.username + "<div class=chat>" +messageObj.text+ "</div>"+"</div>"
                $('#main').append(divString);
              }
            }
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
   addMessage: function(){
    // e.preventdefault();
     if(window.document.getElementById('Message').value !== "") {
       var username = window.document.URL.split('=')[1],
           text = window.document.getElementById('Message').value;
       var message = app.makeMessage(username, text, 'lobby');
     }
       this.send(message);
       // app.fetch();
   },
   addRoom: function(){},
   makeMessage: function(username, text, roomname){
      var myObj = {}
      myObj.username = username || null, //
      myObj.text = text || null, //
      myObj.roomname = roomname || null
      return myObj;
   }

}
app.init();

