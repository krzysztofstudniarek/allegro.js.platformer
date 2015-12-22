
var width = 640, height=480; 

var platforms; 
var enemies;

var goingLeft=false; 
var goingRight=false;

var fr = 0;
var lastTime = time();
var fps = 60;

var translatedX=250;

var selectedPlatform;

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	
	ready(function(){
        loop(function(){
			wipe_log();
            clear_to_color(canvas,makecol(255,255,255));
			controls();
			logic();
			//events(); 
            draw();
			
			fr ++; 
			if(time()-lastTime >= 1000){
				fps = fr;
				lastTime = time();
				fr = 0;
			}
			log("FPS: "+fps);
			
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	translatedX = 250;
	platforms = new Set();
	enemies = new Set();
	
	arr = document.getElementsByTagName("lvl")[0].getElementsByTagName("platforms")[0].getElementsByTagName("platform");
	for(var i =0; i < arr.length; i++){
		platforms.add({
				x: parseInt(arr[i].getAttribute("x")),
				y: parseInt(arr[i].getAttribute("y")),
				width: parseInt(arr[i].getAttribute("width")),
				height: parseInt(arr[i].getAttribute("height")),
				drawShades: arr[i].getAttribute("drawShades") == "true"
		});
	}
	
	arr = document.getElementsByTagName("lvl")[0].getElementsByTagName("enemies")[0].getElementsByTagName("enemy");
	for(var i =0; i < arr.length; i++){
		enemies.add({
			x: parseInt(arr[i].getAttribute("x")),
			y: parseInt(arr[i].getAttribute("y")),
			radius: parseInt(arr[i].getAttribute("radius")),
			lastShotTime: time()
		});
	}

}