//Fucntion for drawing elements on canvas
var isPlaySelected = false;
var isEditorSelected = false;
var isLeftSelected = false, isRightSelected=false,leftPlay =false, rightPlay=false;
var playPlay = false, playEditor = false;
function draw(editor)
{   

	editor = editor !== 'undefined' ? editor : false;

	if(inGame){
		//draw all bullets
		bullets.forEach(function(value){
			circlefill(canvas, value.x, value.y, 2, makecol(255,0,0));
		});
		
		grenades.forEach(function(value){
			if(value.bang == 0){
				circlefill(canvas, value.x - translatedX, value.y, 5, makecol(0,255,0));
			}else{
				circlefill(canvas, value.x - translatedX, value.y, 75, makecol(255,0,0,2550/(time()-value.bang)));
			}
		});
		
		secrets.forEach(function(value){
			circlefill(canvas, value.x+value.radius/2 - translatedX, value.y+value.radius/2, value.radius, makecol(255,255,0));
			textout_centre(canvas,font1,"S",value.x+value.radius/2 - translatedX,value.y+value.radius,15,makecol(0,0,0));
		});
		
		
		//draw hero
		circlefill(canvas, hero.x+hero.width/2, hero.y+hero.height/2, hero.width/2, makecol(0,0,0));
		
		//draw heros hand
		var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, mouse_x, mouse_y);
		circlefill(canvas, hero.x +hero.width/2 + 15*((mouse_x-hero.x-hero.width/2)/d), hero.y + hero.height/2 + 15*((mouse_y-hero.y- hero.height/2)/d), 4, makecol(0,0,0));
		
		
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		
		activeEnemies.forEach(function(enemy){	
			var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2);
			circlefill(canvas, enemy.x - translatedX + enemy.radius/2 - 15*((enemy.x+enemy.radius/2 - translatedX -hero.x-hero.width/2)/d), enemy.y + enemy.radius/2 - 15*((enemy.y+enemy.radius/2-hero.y- hero.height/2)/d), 4, makecol(255,0,0));
		
			circlefill(canvas, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2, enemy.radius/2, makecol(255,0,0));
			
			rectfill(canvas, enemy.x - translatedX, enemy.y - 5, enemy.radius * enemy.hp/100, 5, makecol(0,255,0));
		});
		
		activePlatforms.forEach(function(value){
			if(value.trap){
				
				if(value.drawShades){
						var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
						polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
						polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
				}
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(255,0,0));
			}
		});
		
		//draw all platforms
		activePlatforms.forEach(function(value){
			
			//draw platform body
			if(!value.trap){
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,0,0));
				
				//draw platform shades, relatively to hero positiond
				if(value.drawShades){
						var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
						polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
						polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
				}
			}
			
		});
		
		rectfill(canvas, 0, height-5, width*(hero.hp/100), 5, makecol(255*(1 - (hero.hp/100)),255*(hero.hp/100),0));

		var mv = 20;
		
		enemies.forEach(function (value){
			
			circlefill(canvas, mv, height - 20, 5, makecol(255,0,0));
			mv += 20;
			
		});
		
		mv = width - 20;
		
		for(var i = 0; i< hero.grenades; i++){
			circlefill(canvas, mv, height - 20, 5, makecol(0,255,0));
			mv -= 20;
		}

		if(enemies.size <= 0 && !editor){
			rectfill(canvas, width/2-151, height/2-101, 302, 202, makecol(0,0,0,180));
			rectfill(canvas, width/2-150, height/2-100, 300, 200, makecol(255,255,255,180));
			textout_centre(canvas,font1,"LEVEL CLEARED",SCREEN_W/2,SCREEN_H/2-20,30,makecol(0,0,0));
			textout_centre(canvas,font1,"press SPACE to continue",SCREEN_W/2,SCREEN_H/2+20,30,makecol(0,0,0));
		}
		
		
	}else if(!won && !lost && !selectLvl){
		
		if(playPlay || playEditor){
			play_sample(menuSound);
		}
		
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		
		var x = sgn(width/2+100-mouse_x), x1 = sgn(width/2-100 - mouse_x);
		
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, x*10000, ((height/2 -50 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 -50 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2-100, height/2+10, x1*10000, ((height/2+10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 - 50- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2+100, height/2-50, width/2+100, height/2+10, x*10000, ((height/2+10 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 - 50- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2+10, width/2+100, height/2+10, x*10000, ((height/2 +10 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		polygon(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, x*10000, ((height/2 -50 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 -50 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2-50, width/2-100, height/2+10, x1*10000, ((height/2+10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 - 50- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2+100, height/2-50, width/2+100, height/2+10, x*10000, ((height/2+10 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 - 50- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2+10, width/2+100, height/2+10, x*10000, ((height/2 +10 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		x = sgn(width/2+100-mouse_x), x1 = sgn(width/2-100 - mouse_x);
		
		polygonfill(canvas, 4, [width/2-100, height/2+30, width/2+100, height/2 + 30, x*10000, ((height/2 +30 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +30 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2+30, width/2-100, height/2+90, x1*10000, ((height/2+90 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 + 30- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2+100, height/2+30, width/2+100, height/2+90, x*10000, ((height/2+90 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 +30- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2+90, width/2+100, height/2+90, x*10000, ((height/2 +90 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +90 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		polygon(canvas, 4, [width/2-100, height/2+30, width/2+100, height/2 + 30, x*10000, ((height/2 +30 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +30 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2+30, width/2-100, height/2+90, x1*10000, ((height/2+90 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 + 30- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2+100, height/2+30, width/2+100, height/2+90, x*10000, ((height/2+90 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 +30- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2+90, width/2+100, height/2+90, x*10000, ((height/2 +90 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +90 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		if(mouse_x >= width/2-100 && mouse_x <= width/2+100 && mouse_y >= height/2-50 && mouse_y <= height/2+10){
			if(!isPlaySelected){
				playPlay = true;
				isPlaySelected = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, width/2+100, height/2+10, width/2-100, height/2+10], makecol(255,255,255));
			textout_centre(canvas,font1,"PLAY GAME",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
			if(mouse_b){
				//load_elements();
				//inGame = !inGame;
				selectLvl = true;
				//play_sample(backgroundSound,1.0,1.0,true);
			}
		}else{
			if(isPlaySelected){
				isPlaySelected = false;
				playPlay = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, width/2+100, height/2+10, width/2-100, height/2+10], makecol(0,0,0));
			textout_centre(canvas,font1,"PLAY GAME",SCREEN_W/2,SCREEN_H/2-10,30,makecol(255,255,255));
		}
		
		if(mouse_x >= width/2-100 && mouse_x <= width/2+100 && mouse_y >= height/2+30 && mouse_y <= height/2+90){
			if(!isEditorSelected){
				playEditor = true;
				isEditorSelected = true;
			}else{
				playEditor = false;
			}
			
			polygonfill(canvas, 4, [width/2-100, height/2+30, width/2+100, height/2+30, width/2+100, height/2+90, width/2-100, height/2+90], makecol(255,255,255));
			textout_centre(canvas,font1,"LEVEL EDITOR",SCREEN_W/2,SCREEN_H/2+70,30,makecol(0,0,0));
			if(mouse_b){
				window.location.replace("editor.html");
			}
		}else{
			if(isEditorSelected){
				isEditorSelected = false;
				playEditor = true;
			}else{
				playEditor = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2+30, width/2+100, height/2+30, width/2+100, height/2+90, width/2-100, height/2+90], makecol(0,0,0));
			textout_centre(canvas,font1,"LEVEL EDITOR",SCREEN_W/2,SCREEN_H/2+70,30,makecol(255,255,255));
		}
		
	}else if(won){
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"CONGRATULATIONS!",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
		textout_centre(canvas,font1,"you've won the game.",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
	}else if(lost && hero.lives <= 0){
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"GAME OVER!",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
		textout_centre(canvas,font1,"press SPACE to play again",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
	}else if(lost && hero.lives > 0){
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"You've got "+hero.lives+" lives left",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
		textout_centre(canvas,font1,"press SPACE to keep on playing",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
	}else if(selectLvl){
		
		if(leftPlay || rightPlay || playPlay){
			play_sample(menuSound);
		}
		
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"Select Level",SCREEN_W/2,150,45,makecol(0,0,0));
		if(lvl <= unlockedLvl){
			textout_centre(canvas,font1,lvl,SCREEN_W/2,SCREEN_H/2+50,100,makecol(0,0,0));
		}else{
			textout_centre(canvas,font1,lvl,SCREEN_W/2,SCREEN_H/2+50,100,makecol(125,125,125));
			textout_centre(canvas,font1,"LOCKED",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
		}
		
		
		if(mouse_x >=0 && mouse_x <= 250 && mouse_y >= SCREEN_H/2-25 && mouse_y <= SCREEN_H/2+55){
			if(!isLeftSelected){
				leftPlay = true;
				isLeftSelected = true;
			}else{
				leftPlay = false;
			}
			rectfill(canvas, 0, SCREEN_H/2-25, 250, 80, makecol(255,255,255));
			trianglefill(canvas,210,SCREEN_H/2+13,235,SCREEN_H/2-12,235,SCREEN_H/2+38,makecol(0,0,0));
			if(mouse_pressed && lvl > 0){
				lvl --;
			}
		}else{
			if(isLeftSelected){
				isLeftSelected = false;
				leftPlay = true;
			}else{
				leftPlay = false;
			}
			rectfill(canvas, 0, SCREEN_H/2-25, 250, 80, makecol(0,0,0));
			trianglefill(canvas,210,SCREEN_H/2+13,235,SCREEN_H/2-12,235,SCREEN_H/2+38,makecol(255,255,255));
		}
		
		if(mouse_x >=width-250 && mouse_x <= width && mouse_y >= SCREEN_H/2-25 && mouse_y <= SCREEN_H/2+55){
			if(!isRightSelected){
				rightPlay = true;
				isRightSelected = true;
			}else{
				rightPlay = false;
			}
			rectfill(canvas, width-250, SCREEN_H/2-25, 250, 80, makecol(255,255,255));
			trianglefill(canvas,width-210,SCREEN_H/2+13,width-235,SCREEN_H/2-12,width-235,SCREEN_H/2+38,makecol(0,0,0));
			if(mouse_pressed && lvl < maxLvl){
				lvl ++;
			}
		}else{
			if(isRightSelected){
				isRightSelected = false;
				rightPlay = true;
			}else{
				rightPlay = false;
			}
			rectfill(canvas, width-250, SCREEN_H/2-25, 250, 80, makecol(0,0,0));
			trianglefill(canvas,width-210,SCREEN_H/2+13,width-235,SCREEN_H/2-12,width-235,SCREEN_H/2+38,makecol(255,255,255));
		}
		
		if(mouse_x >=width/2-100 && mouse_x <= width/2+100 && mouse_y >= height/2+100 && mouse_y <= height/2+160){
			if(!isPlaySelected){
				playPlay = true;
				isPlaySelected = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2+100, width/2+100, height/2+100, width/2+100, height/2+160, width/2-100, height/2+160], makecol(255,255,255));
			textout_centre(canvas,font1,"PLAY GAME",SCREEN_W/2,SCREEN_H/2+140,30,makecol(0,0,0));
			if(mouse_pressed && lvl <= unlockedLvl){
				load_elements();
				inGame = !inGame;
				selectLvl = true;
				play_sample(backgroundSound,1.0,1.0,true);
			}
		}else{
			if(isPlaySelected){
				isPlaySelected = false;
				playPlay = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2+100, width/2+100, height/2+100, width/2+100, height/2+160, width/2-100, height/2+160], makecol(0,0,0));
			textout_centre(canvas,font1,"PLAY GAME",SCREEN_W/2,SCREEN_H/2+140,30,makecol(255,255,255));
		}

		
	}
}