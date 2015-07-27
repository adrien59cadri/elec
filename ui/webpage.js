(function(){



document.addEventListener('DOMContentLoaded', function(event){
		var ipc=require('ipc');
		{
			var but = document.getElementById('ls_button');
	
			but.addEventListener('click',function(){
				var  path = document.getElementById('input_path').value;
			 	ipc.send('command',{'command':'ls', 'path':path});	
			});
			ipc.on('ls_res',function( arg){
			var resp=document.getElementById('res');
			resp.innerText=JSON.stringify(arg);
		});
		
		}
		{
			var but = document.getElementById('add_app_validate');
	
			but.addEventListener('click',function(){
				var  name = document.getElementById('add_app_name').value;
				var  github_url = document.getElementById('add_app_github_url').value;
			 	ipc.send('command',{'command':'add_app', 'app_name':name, 'app_github_url':github_url});	
			});
			
			
			ipc.on('ls_app_res',function( arg){
				console.log("ls app command response");
				var resp=document.getElementById('ls_app_res');
				resp.innerText=JSON.stringify(arg);
			});
		
		}
		

		ipc.send('command',{'command':'log', 'text':'test log'});

		
	}
	
);
})();