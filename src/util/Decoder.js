// 引入crypto-js
let CryptoJS = require("crypto-js");

class Decoder {
  constructor(appId, sEncodingAESKey) {
    this.appId = appId;
    this.sessionKey = sEncodingAESKey + '=';
  }

  decryptData(encryptedData, ivv) {
    let encryptedDataBytes = Crypto.util.base64ToBytes(encryptedData)
    let key = CryptoJS.enc.Base64.parse(this.sessionKey)
    let iv = CryptoJS.enc.Base64.parse(ivv)

    let mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

    let decryptResult;

    try {
      // 解密
      let bytes = Crypto.AES.decrypt(encryptedDataBytes, key, {
        asBytes:true,
        iv: iv,
        mode: mode
      });

      decryptResult = JSON.parse(bytes);

    } catch (err) {
      console.log(err)
    }

    if (decryptResult.appid !== this.appId) {
      return "error!";
    }

    return decryptResult
  }
}


export default Decoder