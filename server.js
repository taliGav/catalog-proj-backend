const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const logger = require('./services/logger.service');
const PORT = process.env.PORT || 3030;

const app = express();
const http = require('http').createServer(app);

app.use(
  session({
    secret: 'this-is-a-secret-that-belongs-to-Tal',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(express.json());

//API server routes
const bugRouts = require('./api/bug/routes');
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);
app.use('/api/bug', bugRouts);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

http.listen(PORT, () => logger.info('Server is running on port: ' + PORT));
