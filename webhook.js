/**
 * Module for handling Facebook messages recieved from the webhook.
 */


var processMessage = require('./process_message');
var processPostback = require('./process_postback');

/*
module.exports = async (req, res) => {
	try {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
				if (event.message)
					processMessage(event);
				if(event.postback) {
					processPostback(event);
				}
         	});
    	});
    	res.status(200).end();
    }
    } catch (err) {
    	console.log('ERROR (at webhook.js): ', err);
    }
};*/



module.exports = async (req, res) => {
	try {
  var data = req.body;
  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    if(data.entry === undefined) {
    	console.log("err first");
    	return;
    }

    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      if(pageEntry === undefined) {
    	console.log("err first");
    	return;
    }

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
      	if (messagingEvent === null || messagingEvent === undefined) {
      		console.log("GOTCHA");
      		return;
      	}

         if (messagingEvent.message) {
          processMessage(messagingEvent);
        } else if (messagingEvent.postback) {
        	console.log("WOW");
        	processPostback(messagingEvent);
        	//receivedPostback(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
} catch (err) {
	console.log('find it:', err);
}
}





