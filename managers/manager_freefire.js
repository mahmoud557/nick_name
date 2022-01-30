var EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
class Manager_free_fire{
	constructor(props) {
		this.syciles_qu={}
		this.in_get_recerjen=false;
		this.last_sycile_id=0;
		this.events=new MyEmitter();
		this.start()
	}

	async start(){
		//this.handel_requstes()
		//console.log(true)
		this.handel_sycile_end()
	}

	get_nick_name_sycle(id,reserver){
		return new Promise((res,rej)=>{
			this.last_sycile_id++
			this.syciles_qu[`${this.last_sycile_id}`]={res:res,id:id,reserver:reserver}
			if(!this.in_get_recerjen){
				this.events.emit('sycil_end')
			}
		})
	}

	get_firest_key_of_syciles_qu(){
		var keys=Object.keys(this.syciles_qu)
		if(keys.length>0){return keys[0]}else{return false}
	}

	handel_sycile_end(){
		this.events.on('sycil_end',async()=>{
			var firest_sycile_key=this.get_firest_key_of_syciles_qu();
			if(firest_sycile_key){
				this.in_get_recerjen=true;
				var sycile_object=this.syciles_qu[firest_sycile_key];
				var neck_name=await this.get_sycile(sycile_object['id'],sycile_object['reserver'])
				sycile_object['res'](neck_name)
				delete this.syciles_qu[firest_sycile_key]
				this.events.emit('sycil_end')
			}else{
				this.in_get_recerjen=false;
			}
		})
	}



	async get_sycile(id,reserver){
		try{
			await this.click_on_free_fire_button(reserver)
			await this.click_on_player_id_button(reserver)
			await this.fill_player_id(id,reserver)
			await this.cheek_capatcha(reserver)
			await this.log_in(reserver)
		}catch(err){
			return {result:false,err:true}
		}
	}

	async click_on_free_fire_button(reserver){
		return new Promise(async(res,rej)=>{
			await reserver.waitForXPath('/html/body/div/div/div/div/ul/li[1]/a/div')
			var free_fire_button=await reserver.$x(`/html/body/div/div/div/div/ul/li[1]/a/div`)
			await free_fire_button[0].click()
			res(true)
		})
	}

	async click_on_player_id_button(reserver){
		return new Promise(async(res,rej)=>{
			await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/div[2]')
			var player_id_button=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/div[2]`)
			await player_id_button[0].click()
			res(true)
		})
	}

	async fill_player_id(id,reserver){
		return new Promise(async(res,rej)=>{
			await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/input')
			var national_id_input=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/input`)
			await national_id_input[0].click()
			await reserver.keyboard.type(id,{delay:200});
			res(true)
		})
	}

	async log_in(reserver){
		return new Promise(async(res,rej)=>{
			await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/div[2]/div')
			var player_id_button=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/div[2]/div`)
			await player_id_button[0].click()
			await reserver.waitForNetworkIdle()
			res(true)
		})
	}

	async cheek_capatcha(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div[2]/div[3]/div[1]/div/div/span',{timeout:4000})
				var player_id_button=await reserver.$x(`/html/body/div[2]/div[3]/div[1]/div/div/span`,{timeout:4000})
				await player_id_button[0].click()
				await reserver.waitForNetworkIdle()
				res(true)				
			}catch(err){res(true)}

		})
	}

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }

}

//gzBHGMbbJC4J

//51338094177
//5421181721
//5427697474

//1221951090

module.exports= new Manager_free_fire



