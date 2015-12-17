//Display width and height
var width = 640, height=480; 

/*Set of platforms in the level.
Example Platform Structure
platform = {
		x: 320,
		y: 150,
		width: 200,
		height: 20,
		drawShades: true
	}
*/
var platforms; 
//Set of platforms that are currently displayed on screen
var activePlatforms; 
//Set of bullets on the screen
var bullets; 
//Set of enemies
var enemies;
var activeEnemies;

/*
	Hero structure; x,y - hero position; width,height - hero size; vx,vy - hero speed; platform - platform that hero is currently standing on;
	Starting Stucture:
	
	hero = {
		x : width/2,
		y : 100,
		vx : 0,
		vy : 0,
		width : 15,
		height : 15,
		platform: null
	};
*/
var hero;

//Flags used to make controls smooth
var goingLeft=false; 
var goingRight=false;

//Varialbes used to calculate current frame rate
var fr = 0;
var lastTime = time();
var fps = 60;

//Side scroller translation variable
var translatedX=15;

function main()
{
	//Initiation of all elements
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	
	ready(function(){
        loop(function(){
			wipe_log(); //clear log
            clear_to_color(canvas,makecol(255,255,255)); //clear display
			dispose(); //dispose all inactive elements (dispose.js)
            update(); //update all elements (update.js)
			controls(); //game controls (controls.js)
			events(); //events handling, like endgame, start game (events.js)
            draw(); //drawing all scene elements (draw.js)
			
			
			//calculating and displaying frame rate
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


//function loads elements on start of the game.
function load_elements()
{
	platforms = new Set();
	activePlatforms = new Set();
	
	enemies = new Set();
	activeEnemies = new Set();
	
	for(var i = 0; i<10000; i++){
		platforms.add({
			x: 460 + i*width/2,
			y: 230,
			width: 200,
			height: 20,
			drawShades: true
		});
		
		platforms.add({
			x: 320 + i*width/2,
			y: 310,
			width: 200,
			height: 20,
			drawShades: true
		});
		
		platforms.add({
			x: 560 + i*width/2,
			y: 310,
			width: 200,
			height: 20,
			drawShades: true
		});
		
		platforms.add({
			x: 560 + i*width/2,
			y: 150,
			width: 200,
			height: 20,
			drawShades: true
		});
		
		platforms.add({
			x: 320 + i*width/2,
			y: 150,
			width: 200,
			height: 20,
			drawShades: true
		});
		
		enemies.add({
			x: 560 + i*width/2,
			y: 215,
			radius: 15,
			lastShotTime: time()
		});
	}
	
	
	
	bullets = new Set();
	
	hero = {
		x : width/2,
		y : 100,
		vx : 0,
		vy : 0,
		width : 15,
		height : 15,
		platform: null
	};
}