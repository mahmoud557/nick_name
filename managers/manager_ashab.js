var EventEmitter = require('events');
var fetch = require('node-fetch');
var CryptoJS = require("crypto-js");

var stringText={
	parse:function(jsonStr){var j=JSON.parse(jsonStr);var cipherParams=CryptoJS.lib.CipherParams.create({ciphertext:CryptoJS.enc.Base64.parse(j.ct)});if(j.iv){cipherParams.iv=CryptoJS.enc.Hex.parse(j.iv)}if(j.s){cipherParams.salt=CryptoJS.enc.Hex.parse(j.s)}return cipherParams},
	stringify:function(cipherParams){var j={ct:cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};if(cipherParams.iv)j.iv=cipherParams.iv.toString();if(cipherParams.salt)j.s=cipherParams.salt.toString();return JSON.stringify(j)}
}

class MyEmitter extends EventEmitter {}
class Manager_Ashab{
	constructor() {
		this.events=new MyEmitter();
	}

	async get_nick_name_sycle_free_fire(id){
		try{
			var body=CryptoJS.AES.encrypt(JSON.stringify(`with the best service, it provides its services 24 hours a day, ${id}`),`with the best service, it provid${id}`,{format:stringText}).toString()
	 		const response = await fetch(`https://as7abcard.com/pubg-files/pubg.php?action=getPlayerName&game=freefire&playerID=${id}`, {
							"headers": {
							    "accept": "*/*",
							    "accept-language": "en-US,en;q=0.9,ar;q=0.8",
							    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
							    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
							    "sec-ch-ua-mobile": "?0",
							    "sec-ch-ua-platform": "\"Windows\"",
							    "sec-fetch-dest": "empty",
							    "sec-fetch-mode": "cors",
							    "sec-fetch-site": "same-origin",
							    "x-requested-with": "XMLHttpRequest",
							    "cookie": "language=arabic",
							    "Referer": "https://as7abcard.com/app/",
							    "Referrer-Policy": "strict-origin-when-cross-origin"
							  },
							  "body": `${body}`,
							  "method": "POST"
							});

			const data = await response.text()
			console.log(data)
			if(data!='invalid'){return {result:data,err:false}}
			return {result:false,err:true}
		}catch(err){
			console.log(err)
			return {result:false,err:true}
		}
	}

	async get_nick_name_sycle_pubgy_fire(id){
		try{
			var body=CryptoJS.AES.encrypt(JSON.stringify(`with the best service, it provides its services 24 hours a day, ${id}`),`with the best service, it provid${id}`,{format:stringText}).toString()
	 		const response = await fetch(`https://as7abcard.com/pubg-files/pubg.php?action=getPlayerName&game=pubg&playerID=${id}`, {
							"headers": {
							    "accept": "*/*",
							    "accept-language": "en-US,en;q=0.9,ar;q=0.8",
							    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
							    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
							    "sec-ch-ua-mobile": "?0",
							    "sec-ch-ua-platform": "\"Windows\"",
							    "sec-fetch-dest": "empty",
							    "sec-fetch-mode": "cors",
							    "sec-fetch-site": "same-origin",
							    "x-requested-with": "XMLHttpRequest",
							    "cookie": "language=arabic",
							    "Referer": "https://as7abcard.com/app/",
							    "Referrer-Policy": "strict-origin-when-cross-origin"
							  },
							  "body": `${body}`,
							  "method": "POST"
							});
			const data = await response.text()
			//console.log(data)
			if(data!='invalid'){return {result:data,err:false}}
			return {result:false,err:true}
		}catch(err){
			return {result:false,err:true}
		}
	}
 	delay(time){
		return new Promise((res,rej)=>{
			setTimeout(()=>{res()},time)
		})
	}
}



module.exports= new Manager_Ashab
// /nick_name/api/pupgy/gzBHGMbbJC4J

//693597779