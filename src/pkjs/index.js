// rocky index.js

// HTTP Variables
var method = 'GET';
var url = 'http://www.reddit.com/r/Jokes/new.json?count=1&limit=1&before=domain';
var json_data;

Pebble.on('message', function(event) {
  
  var message = event.data;

  if (message.fetch) {
    
    // Create the request
    var request = new XMLHttpRequest();
    
    // Specify the callback for when the request is completed
    request.onload = function() {
      // The request was successfully completed!
      json_data = JSON.parse(this.responseText);
      console.log(JSON.stringify(json_data));
      //console.log(jsony.data.children[0].data.subreddit);;
    };
    
    // Send the request
    request.open(method, url);
    request.send();
  
    
    // Send data back to watch
    Pebble.postMessage({
    'reddit': {
      'title': json_data.data.children[0].data.title,
      'subreddit': json_data.data.children[0].data.subreddit,
      'selftext': json_data.data.children[0].data.selftext,
    }
    });
    
    if(json_data.data.children[5].data.link_flair_text == "Long") {
      console.log("TOO LONG!!!");
    }
    
  } 
});