var width = 640, height=480;

var platforms;

var hero;
var goingLeft=false;
var goingRight=false;

function draw()
{   
	
	rectfill(canvas, hero.x, hero.y, hero.width, hero.height, makecol(113,113,113));
	
	platforms.forEach(function(value){
		
		rectfill(canvas, value.x, value.y, value.width, value.height, makecol(0,0,0));
		
		if(value.drawShades){
			//if(hero.x< value.x || hero.x>(value.x+value.width) || hero.y<value.y || hero.y > value.y+value.height){
				var x = sgn(value.x+value.width-hero.x), x1 = sgn(value.x-hero.x);
				polygonfill(canvas, 4, [value.x, value.y, value.x+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x-hero.x) + hero.y ], makecol(0,0,0));
				polygonfill(canvas, 4, [value.x, value.y+value.height, value.x+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x-hero.x) + hero.y ], makecol(0,0,0));
			//}
		}
		
	});
	
	//polygonfill(canvas,4,[220,230, 420, 230, 420, 250, 220, 250],makecol(0,0,0));
	

}

function update()
{	

	if(hero.platform == null){
			hero.vy += 0.2;
	}

	if(hero.platform == null){
		platforms.forEach(function(value){
			if((hero.y < (value.y + value.height+1)) && (hero.y > value.y) && (hero.x + hero.width >= value.x) && (hero.x <= value.x + value.width)){
				hero.y = value.y +  value.height + 2;
				hero.vy = -hero.vy;
			}
			
			if(hero.y >= (value.y - hero.height) && hero.x + hero.width > value.x && hero.x < value.x + value.width && hero.y < value.y){
				hero.platform = value;
				hero.y = value.y - hero.height;
				hero.vy = 0;
			}
		});
	}

	if(hero.vx > 0){
		hero.vx -= 0.1;
	}else if(hero.vx < 0 && !pressed[KEY_LEFT]){
		hero.vx += 0.1;
	} 
	
	if(abs(hero.vx)<0.1){
		hero.vx = 0;
	}
	
	hero.y += hero.vy;
	hero.x += hero.vx;
	
	if(hero.platform != null && (hero.x + hero.width< hero.platform.x || hero.x > hero.platform.x + hero.platform.width)){
		hero.platform = null;
	}
}

function controls ()
{
	if(pressed[KEY_UP] && hero.platform != null){
		hero.platform = null;
		hero.vy = -6;
		hero.y -= 1;
	}
	
	if(pressed[KEY_LEFT] || goingLeft){
		goingLeft = true;
		hero.vx = -2;
	}
	if(released[KEY_LEFT]){
		goingLeft = false;
	}
	
	if(pressed[KEY_RIGHT] || goingRight){
		goingRight = true;
		hero.vx = 2;
	}
	if(released[KEY_RIGHT]){
		goingRight = false;
	}
}

function events()
{	
}

function dispose ()
{
}

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
		y: 300,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 340,
		y: 300,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 340,
		y: 160,
		width: 200,
		height: 20,
		drawShades: true
	});
	platforms.add({
		x: 100,
		y: 160,
		width: 200,
		height: 20,
		drawShades: true
	});
	
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