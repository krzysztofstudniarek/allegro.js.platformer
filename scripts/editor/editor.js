
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
var selectedEnemy;

var newX, newY;

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

}