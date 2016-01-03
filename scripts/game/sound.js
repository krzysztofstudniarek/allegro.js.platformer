var shotSound;
var grenadeSound;
var deathSound;
var bonusSound;
var killSound;
var menuSound;
var winSound;
var backgroundSound;

var vol = 3;
var volSprites;

function load_sounds(){
	shotSound = load_sample("sounds/Shot.wav");
	grenadeSound = load_sample("sounds/Grenade.wav");
	deathSound = load_sample("sounds/Death.wav");
	bonusSound = load_sample("sounds/Bonus.wav");
	killSound = load_sample("sounds/Kill.wav");
	menuSound = load_sample("sounds/MenuClick.wav");
	winSound = load_sample("sounds/Win.wav");
	
	backgroundSound = load_sample("sounds/Background.mp3");
	play_sample(backgroundSound,1.0,1.0,true);
	
	volSprites = [load_bmp("sprites/volume0.png"),load_bmp("sprites/volume1.png"), load_bmp("sprites/volume2.png"), load_bmp("sprites/volume3.png") ];
	
}

function sound_control(){
	draw_sprite(canvas,volSprites[vol],width-20,20);
	if(distance(mouse_x, mouse_y, width-20, 20) < 10 && mouse_pressed&1){
		vol = (vol+ 1)%4;
		set_volume(vol/4);
	}
}