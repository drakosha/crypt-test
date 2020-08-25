'use strict';
// Passphrase to init application
const PASSWORD = '1q2w3e4r5t';

const crypto = require('crypto');

// set random initialisation vector, will be hardcoded for decryption
const IV = "5183666c72sdrtyu";

const SECRET_CRYPT_DATA = JSON.stringify({
  iv: '(*^&SDAJNZ@Q)(sd',
  key: 'mkl23098jmdowljp3;239047poiJLK!m'
});

const ENC_KEY = crypto.createHash('md5').update(PASSWORD).digest("hex");

console.log(encrypt(SECRET_CRYPT_DATA));

function encrypt(val) {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);

  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}
