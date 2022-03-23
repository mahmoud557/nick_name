var EventEmitter = require('events');
var fetch = require('node-fetch');

class MyEmitter extends EventEmitter {}
class Manager_jawaker{
	constructor() {
		this.events=new MyEmitter();
	}
	async get_nick_name_sycle(id){
		try{
	 		const response = await fetch("https://www.jawaker.com/ar/m_vouchers/check", {
							"headers": {
							    "accept": "*/*",
							    "accept-language": "en-US,en;q=0.9",
							    "content-type": "application/x-www-form-urlencoded",
							    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
							    "sec-ch-ua-mobile": "?0",
							    "sec-ch-ua-platform": "\"Windows\"",
							    "sec-fetch-dest": "empty",
							    "sec-fetch-mode": "cors",
							    "sec-fetch-site": "same-origin",
							    "x-csrf-token": "1/1/IwmDmqRNwf8NlF5yiFJlu0Y7H01WQ8ypMCfJiT9Axo1L/gWdOM+QSXSoWOhTTvakSBkE6g7ijV2HcKHysA==",
							    "x-newrelic-id": "VwQBWVdACwIJVFFQ",
							    "x-requested-with": "XMLHttpRequest",
							    "cookie": "locale=ar; show_app_overlay=show; _jawaker_session=6a0a28d5e05d15bf32423af2f59b0f2a; _ga=GA1.2.5702776.1648064502; _gid=GA1.2.711003261.1648064502; _vwo_uuid_v2=D2511C3941B74D0769585BCD788CE7F51|26d8c5fd66bde8dd1f02359f55815598; pseudoid=eyJfcmFpbHMiOnsibWVzc2FnZSI6Ik5UZ3hOVEl6TmpZMSIsImV4cCI6IjIwMjQtMDMtMjNUMTk6NDk6NDQuOTAyWiIsInB1ciI6bnVsbH19--cce74c0419f565a86ddf522d20c7dd4f6239698a",
							    "Referer": "https://www.jawaker.com/ar/code",
							    "Referrer-Policy": "strict-origin-when-cross-origin"
							},
							"body": `player_number=${id}&pin_code=2K5KKGJLN4KX`,
							"method": "POST"
						});
			var data= await response.json()
			if(data.error){return {result:false,err:data.error.msg}}
			if(data.user){return {result:data.user.login,err:false}}
			return {result:false,err:true}
		}catch(err){
			console.log(err)
			return {result:false,err:true}
		}
	}
 	delay(time){
		return new Promise((res,rej)=>{
			setTimeout(()=>{res()},time)
		})
	}
}



module.exports= new Manager_jawaker
// /nick_name/api/pupgy/gzBHGMbbJC4J

//693597779