'use strict';

const crypto = require('crypto');

const cryptoKeys = 'gYqjgGI7ZafPQtjt/QmEWVIaAMBjjLTnWO65PLw4UxPihHmMU6x2g3B6VBG8yeljsGyeo15xBmquE/mtAW1Q+sJXPxyj/2NdtF3aqDjROak=';

let cryptoUtils;

function initializeCrypto(password) {

  const iv = '5183666c72sdrtyu';
  const key = crypto.createHash('md5').update(password).digest("hex");
  let initialized = false;
  let data;

  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const json = decipher.update(cryptoKeys, 'base64', 'utf8') + decipher.final('utf8');

    data = JSON.parse(json);

    console.log('Crypto keys initialized: ', data);

    initialized = true;
  } catch(e) { console.warn(e); }

  if (!initialized) return false;

  cryptoUtils = {
    encrypt: ((val) => {
      let cipher = crypto.createCipheriv('aes-256-cbc', data.key, data.iv);
      let encrypted = cipher.update(val, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    }),

    decrypt: ((encrypted) => {
      let decipher = crypto.createDecipheriv('aes-256-cbc', data.key, data.iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      return (decrypted + decipher.final('utf8'));
    })
  };

  return true;
}

function initialized() {
  return !!cryptoUtils;
}

let dataStore = null;

function set(data) {
  const encrypted = cryptoUtils.encrypt(data);

  console.log('Storing encrypted data:', encrypted);

  dataStore = encrypted;
}

function get() {
  if (!dataStore) return;

  console.log('Decrypting:', dataStore);

  const decrypted = cryptoUtils.decrypt(dataStore);

  console.log('Decrypted:', decrypted);

  return decrypted;
}

module.exports = {
  initializeCrypto,
  initialized,
  get,
  set
};
