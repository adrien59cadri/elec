'use strict';
(function(document){

		document.addEventListener('DOMContentLoaded', function(event){
		var ipc=require('ipc');
		{
			var ls_button = document.getElementById('ls_button');
	
			ls_button.addEventListener('click',function(){
				var  path = document.getElementById('input_path').value;
			 	ipc.send('command',{command:'ls', path:path});	
			});
			ipc.on('ls_res',function( arg){
				var resp=document.getElementById('ls_app_res');
				resp.innerText=JSON.stringify(arg);
			});
		
		}
		{
			var add_app_validate = document.getElementById('add_app_validate');
	
			add_app_validate.addEventListener('click',function(){
				var  name = document.getElementById('add_app_name').value;
				var  github_url = document.getElementById('add_app_github_url').value;
			 	ipc.send('command',{command:'add_app', app_name:name, app_github_url:github_url});	
			});
		
		}
		{
			var ls_app_validate = document.getElementById('ls_app_validate');
	
			ls_app_validate.addEventListener('click',function(){
			 	ipc.send('command',{command:'ls_app'});	
			});
			
		}
		
		ipc.on('ls_app_res',function( arg){
			console.log("ls app command response");
			var resp=document.getElementById('ls_app_res');
			resp.innerText=JSON.stringify(arg);
		});
		
		ipc.on('pong-main',function(){console.log('pong-main in render');});

		ipc.send('command',{command:'ping-renderer'});

		
	}
	
);
})(document);