function multi_handler(){

	if(conn != 'undefined' && inGame){
		
		conn.send("HELLO");
		
		conn.on('data', function(data){
			console.log("RECEIVED ", data);
		});
	}


}