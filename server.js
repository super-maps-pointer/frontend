import { join } from 'path';
import express, { static } from 'express';
const app = express();

// Serve static files
app.use(static(__dirname + '/dist/frontend'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(join(__dirname + '/dist/frontend/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 4200);