module.exports = async (req, res) => {
	try {
		console.log(req.body);
		fitbitId = req.body[0].ownerId;
		date = req.body[0].date;
		console.log('daaaaaa', fitbitId, date);
	
		// refresh the access token so that the user's fitbit data can be accessed

    	res.sendStatus(204);
	} catch (err) {
		console.log('[ERROR]', err)
	}
};
