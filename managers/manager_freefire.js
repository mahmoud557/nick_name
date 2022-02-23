var EventEmitter = require('events');
//const useProxy = require('puppeteer-page-proxy');
var fetch = require('node-fetch');
const FormData = require('form-data');

class MyEmitter extends EventEmitter {}
class Manager_free_fire{
	constructor(props) {
		this.reservers={};
		this.in_get_recerjen=false;
		this.last_sycile_id=0;
		this.events=new MyEmitter();
		this.start()
	}

	async start(){
		//this.handel_sycile_end()
	}

	set_reserver(reserver,reserver_id){
		this.reservers[reserver_id]=new Object()
		this.reservers[reserver_id]['reserver']=reserver;
		this.reservers[reserver_id]['waiting_qu']={};
		this.reservers[reserver_id]['last_waiting_id']=0;
		this.reservers[reserver_id]['waiting_qu_count']=0;
		this.reservers[reserver_id]['in_get_recerjen']=false;
		this.handel_reserver_sycile_end(reserver_id)
	}



	get_nick_name_sycle(id,reserver_id){
		return new Promise((res,rej)=>{
			this.reservers[reserver_id]['last_waiting_id']++
			this.reservers[reserver_id]['waiting_qu'][`${this.reservers[reserver_id]['last_waiting_id']}`]={res:res,id:id,reserver:this.reservers[reserver_id]['reserver']}
			this.reservers[reserver_id]['waiting_qu_count']++
			if(!this.reservers[reserver_id]['in_get_recerjen']){
				this.events.emit(`${reserver_id}_sycil_end`)
			}
		})
	}

	get_firest_key_of_syciles_qu(reserver_id){
		var keys=Object.keys(this.reservers[reserver_id]['waiting_qu'])
		if(keys.length>0){return keys[0]}else{return false}
	}

	handel_reserver_sycile_end(reserver_id){
		this.events.on(`${reserver_id}_sycil_end`,async()=>{
			var firest_sycile_key=this.get_firest_key_of_syciles_qu(reserver_id);
			if(firest_sycile_key){
				this.reservers[reserver_id]['in_get_recerjen']=true;
				var sycile_object=this.reservers[reserver_id]['waiting_qu'][firest_sycile_key];
				var neck_name=await this.get_sycile(sycile_object['id'],sycile_object['reserver'])
				sycile_object['res'](neck_name)
				delete this.reservers[reserver_id]['waiting_qu'][firest_sycile_key];
				this.reservers[reserver_id]['waiting_qu_count']--
				this.events.emit(`${reserver_id}_sycil_end`)
			}else{
				this.reservers[reserver_id]['in_get_recerjen']=false;
			}
		})
	}



	async get_sycile(id,reserver){
		try{
			await this.click_on_free_fire_button(reserver)
			await this.click_on_player_id_button(reserver)
			await this.fill_player_id(id,reserver)
			await this.solve_capatcha_if_exsesst(reserver)
			await this.log_in(reserver)
			await this.solve_capatcha_if_exsesst(reserver)
			await this.log_in_after_solve(reserver)
			var neck_name=await this.get_name_text(reserver)
			await this.realod(reserver)
			if(!neck_name){return {result:false,err:true}}
			return {result:neck_name,err:false}			
		}catch(err){
			console.log('error catch',err)
			await this.realod(reserver)
			return {sucssess:false,err:err}
		}
	}


	get_name_text(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForSelector('._2QdiuL_QlCieAAl1OTTsY0')
				var free_fire_button=await reserver.$(`._2QdiuL_QlCieAAl1OTTsY0`)
				const value = await free_fire_button.evaluate(el => el.textContent);
				res(value)
			}catch(err){
				rej('Error in get_name_text')
			}			
		})	
	}	

	async type_as_a_humen(reserver,text){
		var wait_pariods=[5,10,15,13,22,10];
		for(var chracter of text){
			await this.delay(wait_pariods.random())
			await reserver.keyboard.type(chracter,{delay:0});
		}
	}
	async solve_text_capatch(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForSelector('img._3qmppU24pI7IrGzBFxsItc',{timeout:6000})
				var capatcha_img=await reserver.$('img._3qmppU24pI7IrGzBFxsItc')
				try{
					var base_64_photo=await reserver.evaluate(() => {
						try{
							var img=document.querySelector('img._3qmppU24pI7IrGzBFxsItc')
							var canvas = document.createElement('canvas');
							canvas.height = img.naturalHeight;
							canvas.width = img.naturalWidth;
							document.body.appendChild(canvas)
							var ctx =canvas.getContext('2d');
	  						ctx.drawImage(img, 0, 0);
	  						var base64String = canvas.toDataURL();
	  						return base64String;
						}catch(err){return(false)}
					})
					if(base_64_photo){
						var text_anwser=await this.get_text_capatcha_answer_by_base_64_string(base_64_photo)
						text_anwser=text_anwser.toUpperCase();
						await this.fill_capatcha_answer(reserver,text_anwser)
					}
				}catch(err){rej('Error in solve_text_capatch')}
			}catch(err){
				res(true)
			}
		})
	}

	fill_capatcha_answer(reserver,text){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForSelector('input._2sKyNNrNHK-oZIkAUg3gZu',{timeout:6000})
				var capatcha_input=await reserver.$('input._2sKyNNrNHK-oZIkAUg3gZu')
				await capatcha_input.click()
				await this.type_as_a_humen(reserver,text);
				res(true)
			}catch(err){
				rej('Error in fill_capatcha_answer')
			}				
		})		
	}

	async get_text_capatcha_answer_by_base_64_string(streeng){
		var form = new FormData();
		form.append('key', '4628c8a5502d2ce831730b7e044beef8');
		form.append('body', streeng);	
		form.append('method', 'base64');
		form.append('regsense', 1);
 		var response = await fetch(
	 			`http://2captcha.com/in.php?`,{
				method: 'POST',         
				body: form
			}
		);
		var data = await response.text()
		var id_state=data.slice(0,2)
		if(id_state=='OK'){
			var id=data.slice(3);
			var object=await this.get_anwer_recerjen(id,'4628c8a5502d2ce831730b7e044beef8')
			if(object.state=='solved'){
				return object.text
			}
		}	
	}

	async get_anwer_recerjen(id,key){

			console.log('get recerjen')
			await this.delay(2000)
			var responde = await fetch(
					`https://2captcha.com/res.php?key=${key}&action=get&id=${id}&json=1`,{
					method: 'POST',  
				}
			);
			var answer_object= await responde.json()
			if(answer_object.status==1){
				return {state:'solved',text:answer_object.request}
			}else{
				switch(answer_object.request){
					case 'CAPCHA_NOT_READY':
						return await this.get_anwer_recerjen(id,key)
						break
					case 'ERROR_CAPTCHA_UNSOLVABLE':
					case 'ERROR_BAD_DUPLICATES':
						return {state:'unsolved',action:'re_post'}
						break	
					default:
					    return {state:'unsolved',action:'stop'}							
				}
			}

	}

	async click_on_free_fire_button(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div/div/div/div/ul/li[1]/a/div')
				var free_fire_button=await reserver.$x(`/html/body/div/div/div/div/ul/li[1]/a/div`)
				await free_fire_button[0].click()
				res(true)
			}catch(err){
				rej('Error in click_on_free_fire_button')
			}			
		})
	}

	async click_on_player_id_button(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/div[2]')
				var player_id_button=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/div[2]`)
				await player_id_button[0].click()
				res(true)
			}catch(err){
				rej('Error in click_on_player_id_button')
			}			
		})
	}

	async fill_player_id(id,reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/input')
				var national_id_input=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/input`)
				await national_id_input[0].click()
				await this.type_as_a_humen(reserver,id);
				res(true)
			}catch(err){
				rej('Error in fill_player_id')
			}				
		})
	}

	async fill_code(code,reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div[1]/div/div/div/div[5]/div[2]/div[3]/div/div[2]/div[2]/div[2]/div/input')
				var national_id_input=await reserver.$x(`/html/body/div[1]/div/div/div/div[5]/div[2]/div[3]/div/div[2]/div[2]/div[2]/div/input`)
				await national_id_input[0].click()
				await reserver.keyboard.type(code,{delay:0});
				res(true)
			}catch(err){
				rej('Error in fill_code')
			}				
		})
	}

	async click_on_sure_button(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div/div/div/div/div[5]/div[2]/div[3]/div/div[3]/div')
				var player_id_button=await reserver.$x(`/html/body/div/div/div/div/div[5]/div[2]/div[3]/div/div[3]/div`)
				await player_id_button[0].click()
				await reserver.waitForNetworkIdle()
				res(true)
			}catch(err){
				rej('Error in click_on_chur_button')
			}			
		})
	}

	async cheek_if_error(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath("//input[contains(@value,'تأكيد')]",{timeout:2000})
				rej('Error in cheek_if_error')
			}catch(err){
				res(true)
			}			
		})
	}

	//_3mdCl_sRaO5vXGuGtdDqTO _3sYGlvN9b3AEZixLIfPEyv
	async log_in(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForXPath('/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/div[2]/div',{timeout:2000})
				var player_id_button=await reserver.$x(`/html/body/div/div/div/div/div[4]/div[2]/div[2]/div[2]/form/div[2]/div`)
				await player_id_button[0].click()
				res(true)
			}catch(err){
				console.log(err)
				res('Error in log_in')
			}			
		})
	}

	async log_in_after_solve(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.click('input[type="submit"')
				await reserver.waitForNavigation()
				res(true)				
			}catch(err){
				rej('Error in log_in_after_solve')
			}
		})
	}	

	async cheek_if_capatcha(reserver){
		return new Promise(async(res,rej)=>{
			try{
				await reserver.waitForSelector('[title="reCAPTCHA"]',{timeout:4000})
				res(true)
			}catch(err){
				res(false)
			}	
		})		
	}

	async solve_capatcha_if_exsesst(reserver){
		return new Promise(async(res,rej)=>{
			try{
				var capatcha_state=await this.cheek_if_capatcha(reserver)
				console.log(capatcha_state)
				if(capatcha_state){
					var solve_state=await reserver.solveRecaptchas()
					if(solve_state.error){return res(false)}
					if(solve_state.solved[0].isSolved){return res(true)}
					res(false)
				}else{
					return res(true)
				}
			}catch(err){
				rej('Error in solve_capatcha_if_exsesst',err)
			}
		})
	}

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }
 	async realod(reserver){
		await reserver.deleteCookie(...[
		{
            name : 'JSESSIONID',
            domain : "checkoutshopper-live.adyen.com"
        },
		{
            name : 'JSESSIONID',
            domain : "checkoutshopper-live.adyen.com"
        },
		{
            name : '__csrf__',
            domain : "shop2game.com"
        },
		{
            name : '_ga_TVZ1LG7BEB',
            domain : "shop2game.com"
        },
		{
            name : 'datadome',
            domain : "shop2game.com"
        },
		{
            name : '_ga',
            domain : "shop2game.com"
        },
		{
            name : 'language',
            domain : "shop2game.com"
        },
		{
            name : 'region',
            domain : "shop2game.com"
        }, 
		{
            name : 'session_key',
            domain : "shop2game.com"
        },
		{
            name : 'source',
            domain : "shop2game.com"
        },
		{
            name : 'GOP',
            domain : "shop2game.com"
        },                
        ])
		await reserver.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
	}	   

}
//808306716
//2506885218

//8271085898984458
//5628545761752345
//6116920351512408
//5564701136345865
//5812478917341867
//R6SZVT
//https://gop.captcha.garena.com/image?key=172deb2f-2f33-41cf-be1f-b15f5ecaa865

Object.defineProperty(Array.prototype, 'random', {
  value: function(chunkSize) {
  	  if(this.length==0){return new Error('Cant Use Roundom With Empty Array')}
	  min = Math.ceil(0);
	  max = Math.floor(this.length);
	  r=Math.floor(Math.random() * (max - min) + min);
	  return this[r]
  }
});

module.exports= new Manager_free_fire



