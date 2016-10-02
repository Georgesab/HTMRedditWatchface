var rocky = require('rocky');
var text = "";
var reddit = "";

rocky.postMessage({'fetch': true});

rocky.on('message', function(event) {
  // Get message passed
  console.log(JSON.stringify(event.data));
  text = JSON.stringify(event.data);
  
  rocky.requestDraw();
  
});

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;
  
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine width and height
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  
  ////// Displaying the time
  
  // Getting the current date
  var date = new Date();
  
  // Setting text color
  ctx.fillStyle = 'white';
  // Center align
  ctx.textAlign = 'center';
  // Font for time
  ctx.font = '34px Bitham-numeric';
  // Display the time
  ctx.fillText(date.toLocaleTimeString(), w/2, 10 , w);
  
  ////// Displaying the API data
  // Setting text color
  ctx.fillStyle = 'yellow';
  // Center align
  ctx.textAlign = 'center';
  // Font for time
  ctx.font = '14px Gothic';

  
  ctx.fillText(reddit.title, w/2, (h/6)*2, w);
  
  ctx.fillText(reddit.selftext, w/2, (h/6)*4, w);
  
  ctx.fillText("r/" + reddit.subreddit, w/2, h - 20, w);
  
});


rocky.on('minutechange', function(event) {
  rocky.requestDraw();
  
  // Send a message to fetch the reddit information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});



// Listening to phone

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.reddit) {
    // Save the weather data
    reddit = message.reddit;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});