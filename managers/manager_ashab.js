var EventEmitter = require('events');
var fetch = require('node-fetch');
class MyEmitter extends EventEmitter {}
class Manager_Ashab{
	constructor() {
		this.events=new MyEmitter();
	}

	async get_nick_name_sycle(id){
		try{
	 		const response = await fetch(`https://as7abcard.com/pubg-files/freefire.php?action=getPlayerName&game=freefire&playerID=${id}`);
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