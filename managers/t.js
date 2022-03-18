var CryptoJS = require("crypto-js");
var stringText={
	parse:function(jsonStr){var j=JSON.parse(jsonStr);var cipherParams=CryptoJS.lib.CipherParams.create({ciphertext:CryptoJS.enc.Base64.parse(j.ct)});if(j.iv){cipherParams.iv=CryptoJS.enc.Hex.parse(j.iv)}if(j.s){cipherParams.salt=CryptoJS.enc.Hex.parse(j.s)}return cipherParams},
	stringify:function(cipherParams){var j={ct:cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};if(cipherParams.iv)j.iv=cipherParams.iv.toString();if(cipherParams.salt)j.s=cipherParams.salt.toString();return JSON.stringify(j)}
}
a=CryptoJS.AES.encrypt(JSON.stringify("with the best service, it provides its services 24 hours a day, 808306716"),"with the best service, it provid808306716",{format:stringText}).toString()
console.log(a)
