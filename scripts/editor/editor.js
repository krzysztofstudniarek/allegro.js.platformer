
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

var gameMode = false;
var inGame = true;

var hero;

var bullets; 

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	
	ready(function(){
        loop(function(){
			if(gameMode){
				wipe_log(); //clear log
				clear_to_color(canvas,makecol(255,255,255)); //clear display
				dispose(); //dispose all inactive elements (dispose.js)
				controls(); //game controls (controls.js)
				update(true); //update all elements (update.js)
				draw(); //drawing all scene elements (draw.js)
			}else{
				wipe_log();
				clear_to_color(canvas,makecol(255,255,255));
				editor_controls();
				editor_logic();
				editor_draw();
			}

			if(pressed[KEY_P]){
				hero = {
					x : width/2,
					y : 150,
					vx : 0,
					vy : 0,
					width : 15,
					height : 15,
					hp: 100,
					platform: null
				};
				gameMode = !gameMode;
			}
			
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
	bullets = new Set();
}