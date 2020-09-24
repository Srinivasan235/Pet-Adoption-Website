const websiteRoutes = require('./routes/website-routes');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// set up routes
app.use('/', websiteRoutes);

app.listen(3000, () => {
	console.log('app now listening for requests on port 3000');
});
