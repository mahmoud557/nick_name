var EventEmitter = require('events');
var express = require('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser');
class MyEmitter extends EventEmitter {}

class API{
	constructor() {
		this.events=new MyEmitter();
		this.start()
	}


	async start(){
		console.log('loading')
		await this.load_managers()
		this.http_server = express()
		this.http_server.use(cors())
		this.http_server.use(bodyParser.json())	
		this.http_server.get('/nick_name/api/pupgy/:id',async(req,res)=>{
			var id=req.params.id
			var nick_name_result_object=await this.manager_ashab.get_nick_name_sycle_pubgy_fire(id)
			res.json(nick_name_result_object)
		})		
		this.http_server.get('/nick_name/api/likee/:id',async(req,res)=>{
			var id=req.params.id
			var nick_name_result_object=await this.manager_liky.get_nick_name_sycle(id)
			res.json(nick_name_result_object)
		})	
		this.http_server.get('/nick_name/api/freefire/:id',async(req,res)=>{
			var id=req.params.id
			var nick_name_result_object=await this.manager_ashab.get_nick_name_sycle_free_fire(id)
			res.json(nick_name_result_object)			
		})
		
		this.http_server.get('/nick_name/api/jawaker/:id',async(req,res)=>{
			var id=req.params.id
			var nick_name_result_object=await this.manager_jawaker.get_nick_name_sycle(id)
			res.json(nick_name_result_object)			
		})

		this.http_server.get('/nick_name',async(req,res)=>{
			res.send('working')
		})									
		this.http_server.listen(3002)
		console.log('working')
	}

	async load_managers(){
		//this.manager_browser = require('./manager_browser.js');
		this.manager_liky = require('./manager_liky.js');
		this.manager_ashab = require('./manager_ashab.js');
		this.manager_jawaker = require('./manager_jawaker.js');
		//await this.manager_browser.ready()
	}	

 	delay(time){
		return new Promise((res,rej)=>{
			setTimeout(()=>{res()},time)
		})
	}
}


var browser=new API

// /nick_name/api/likee/693597779