// start-ssl.js
const { exec } = require('child_process');

const sslPassphrase = '123456'; // Replace with your actual SSL passphrase

// Set the SSL_PASSPHRASE environment variable
process.env.SSL_PASSPHRASE = sslPassphrase;

// Run the ng serve command with SSL options
const ngServeProcess = exec(
  'ng serve --ssl true --ssl-key ./key.pem --ssl-cert ./cert.pem',
  (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    console.log(stdout);
  }
);

ngServeProcess.stdout.on('data', (data) => {
  console.log(data);
});

ngServeProcess.stderr.on('data', (data) => {
  console.error(data);
});
