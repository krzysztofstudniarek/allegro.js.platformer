var width = 640, height=480;

var platforms;
var bullets;

var hero;
var goingLeft=false;
var goingRight=false;

var fr = 0;
var lastTime = time();
var fps = 60;

function main()
{
    enable_debug('debug');
    allegro_init_all("game_canvas", width, height);
	load_elements();
	
	ready(function(){
        loop(function(){
			
            clear_to_color(canvas,makecol(255,255,255));
			dispose();
            update();
			controls();
			events();
            draw();
			
			
			fr ++;
			if(time()-lastTime >= 1000){
				fps = fr;
				lastTime = time();
				fr = 0;
			}
			wipe_log();
			log(fps);
			
        },BPS_TO_TIMER(60));
    });
    return 0;
}
END_OF_MAIN();

function load_elements()
{
	platforms = new Set();
	platforms.add({
		x: 220,
		y: 230,
		width: 200,
		height: 20,
		drawShades: true
	});
	
	platforms.add({
		x: 100,
		y: 310,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 340,
		y: 310,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 340,
		y: 150,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 100,
		y: 150,
		width: 200,
		height: 20,
		drawShades: true
	});
	
	bullets = new Set();
	
	hero = {
		x : 150,
		y : 100,
		vx : 0,
		vy : 0,
		width : 15,
		height : 15,
		platform: null
	};
}