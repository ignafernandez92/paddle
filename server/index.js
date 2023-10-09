const app = require('./app');
const PORT = 8080; 
app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);

});
// const PORT_HTTPS = 8443; 
// const https = require('https');
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync('../padel-app/key.pem', 'utf8'), 
//   cert: fs.readFileSync('../padel-app/cert.pem'), 
//   passphrase: process.env.SSL_PASSPHRASE, 
// };



// httpApp.use((req, res) => {
//   res.redirect(`https://${req.hostname}:${PORT_HTTPS}${req.url}`);
// });





// const server = https.createServer(options, app);

// server.listen(PORT_HTTPS, (error) => {
//   if (error) {
//     console.error('Error starting HTTPS server:', error);
//   } else {
//     console.log(`HTTPS server is running on https://localhost:${PORT_HTTPS}`);
//   }
// });
