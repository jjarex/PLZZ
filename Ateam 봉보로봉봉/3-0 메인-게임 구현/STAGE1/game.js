
(function(){
	var WIDTH = 1500;
	var HEIGHT = 750;
    
    var WIDTH0 = 1500;
	var HEIGHT0 = 500;

	var _game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
	var _gamegame = new Phaser.Game(WIDTH0, HEIGHT0, Phaser.AUTO, 'game0');
    

	var mainState = {
		preload : function(){
			this.game.load.image('bullet','img/bim.png');
			this.game.load.image('bgSpace','img/NEW_background.png');
			this.game.load.image('bgSpace2','img/starfield.png');
			
			this.game.load.spritesheet('yoyo','img/yoyo.png',81,81,5);
            this.game.load.spritesheet('mama','img/mama.png',52,68,6);
			this.game.load.spritesheet('ship','img/RUNRUN.png',52,70,6);
			
			this.game.load.spritesheet("enemyship1","img/vilrun1.png",52, 73, 6);
			this.game.load.spritesheet("enemyship2","img/vilrun1.png",52, 73, 6);
			this.game.load.spritesheet("enemyship3","img/vilrun1.png",52, 73, 6);
			this.game.load.spritesheet("enemyship4","img/vilrun1.png",52, 73, 6);
			this.game.load.spritesheet("enemyship5","img/vilrun1.png",52, 73, 6);
		},

		create : function(){
			this.lastBullet = 0;
			this.lastEnemy = 10;
			this.lastTick = 0;
			this.speed = 250;            //냄궁민수 스피드
//			this.bg1Speed = 50;          //배경 가로로 움직이는 속도
			this.bg2Speed =40;           //먼지 배경 움직이는 속도
			this.enemySpeed = 600;       //빌런 다가오는 속도
			this.bulletSpeed = 400;
			this.lives = 3;              //목숨갯수
			this.score = 0;              

			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.bg = this.game.add.tileSprite(0,0,1500,750,'bgSpace');
			this.bg.autoScroll(-this.bg1Speed,0);        //게임 배경 움직이는 속도

			this.bg2 = this.game.add.tileSprite(0,0,1500,750,'bgSpace2');
			this.bg2.autoScroll(-this.bg2Speed,0);       //먼지 배경 움직이는 속도

			
			
			//요나		( 가로, 세로화면 기준 가운데:2, 클레스이름 )
			this.yoyo = this.game.add.sprite(20,HEIGHT/2.2, 'yoyo');
			this.yoyo.animations.add('move');
			this.yoyo.animations.play('move', 20, true);
			this.game.physics.arcade.enable(this.yoyo, Phaser.Physics.ARCADE);
			
			
			//남궁민수    ( 가로, 세로화면 기준 가운데:2, 클레스이름 )
			this.ship = this.game.add.sprite(80,HEIGHT/2, 'ship');
			this.ship.animations.add('move');
			this.ship.animations.play('move', 20, true);
			this.game.physics.arcade.enable(this.ship, Phaser.Physics.ARCADE);
            
            
            //마커스		( 가로, 세로화면 기준 가운데:2, 클레스이름 )
			this.mama = this.game.add.sprite(8,HEIGHT/2, 'mama');
			this.mama.animations.add('move');
			this.mama.animations.play('move', 20, true);
			this.game.physics.arcade.enable(this.mama, Phaser.Physics.ARCADE);
			
			

			//총
			this.bullets = this.game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(10,'bullet');			
    		this.bullets.setAll('outOfBoundsKill', true);
    		this.bullets.setAll('checkWorldBounds', true);

			this.enemies = this.game.add.group();
			this.enemies.enableBody = true;
			this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

			var style = { font: "20px Arial", fill: "#fff", align: "center" };
			this.scoreText = this.game.add.text(20,10,"점수 : "+this.score,style);
			this.livesText = this.game.add.text(20,35,"Lives : "+this.lives,style);
		},

		update : function(){
            
            //남궁민수
			this.ship.body.velocity.setTo(0,0);
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.ship.x > 0)
			{
				this.ship.body.velocity.x = -2*this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.ship.x < (WIDTH-this.ship.width))
			{
				this.ship.body.velocity.x = this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.ship.y > 0)
			{
				this.ship.body.velocity.y = -this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.ship.y < (HEIGHT-this.ship.height))
			{
				this.ship.body.velocity.y = +this.speed;
			}

			var curTime = this.game.time.now;

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
			{
				if(curTime - this.lastBullet > 300)
				{
					this.fireBullet();
					this.lastBullet = curTime;
				}
			}

			if(curTime - this.lastEnemy > 200)       //악당나오는 수
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastTick > 10000)
				
			{
				if(this.speed < 500)                   //악당 스피드
				{
					this.speed *= 1.1;
					this.enemySpeed *= 1.1;
					this.bulletSpeed *= 1.1;
					this.bg.autoScroll(-this.bg1Speed, 0);
					this.bg2.autoScroll(-this.bg2Speed, 0);
					
					this.lastTick = curTime;
				}
			}
			
			this.game.physics.arcade.collide(this.enemies, this.ship, this.enemyHitPlayer,null, this);
			this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet,null, this);
			this.game.physics.arcade.collide(this.enemies, this.yoyo, this.enemyHitPlayer,null, this);
			this.game.physics.arcade.collide(this.enemies, this.mama, this.enemyHitPlayer,null, this);
			
			
//this.yoyo.x = 100; 
            this.yoyo.body.velocity.setTo(0,0);
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.yoyo.x > 0)
			{				
				this.yoyo.body.velocity.x = -2*this.speed;  //x좌표 스피트 곱하기 2배
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.yoyo.x < (WIDTH-this.yoyo.width))
			{
				this.yoyo.body.velocity.x = this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.yoyo.y > 0)
			{
				this.yoyo.body.velocity.y = -this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.yoyo.y < (HEIGHT-this.yoyo.height))
			{
				this.yoyo.body.velocity.y = +this.speed;
			}

			var curTime = this.game.time.now;

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
			{
				if(curTime - this.lastBullet > 300)
				{
					this.fireBullet();
					this.lastBullet = curTime;
				}
			}

			if(curTime - this.lastEnemy > 500)
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastTick > 10000)
				
			{
				if(this.speed < 500)
				{
					this.speed *= 1.1;
					this.enemySpeed *= 1.1;
					this.bulletSpeed *= 1.1;
					this.bg.autoScroll(-this.bg1Speed, 0);
					this.bg2.autoScroll(-this.bg2Speed, 0);
					
					this.lastTick = curTime;
				}
			}	
			
            
//this.mama.x = 100; 
            this.mama.body.velocity.setTo(0,0);
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.mama.x > 0)
			{				
				this.mama.body.velocity.x = -2*this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.mama.x < (WIDTH-this.mama.width))
			{
				this.mama.body.velocity.x = this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.mama.y > 0)
			{
				this.mama.body.velocity.y = -this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.mama.y < (HEIGHT-this.mama.height))
			{
				this.mama.body.velocity.y = +this.speed;
			}

			var curTime = this.game.time.now;

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.A))
			{
				if(curTime - this.lastBullet > 300)
				{
					this.fireBullet();
					this.lastBullet = curTime;
				}
			}

			if(curTime - this.lastEnemy > 500)
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastTick > 10000)
				
			{
				if(this.speed < 500)
				{
					this.speed *= 1.1;
					this.enemySpeed *= 1.1;
					this.bulletSpeed *= 1.1;
					this.bg.autoScroll(-this.bg1Speed, 0);
					this.bg2.autoScroll(-this.bg2Speed, 0);
					
					this.lastTick = curTime;
				}
			}	
            
		},
        
       
        

			

			



		
		

		//총
		fireBullet : function(curTime){
			var bullet = this.bullets.getFirstExists(false);
			if(bullet)
			{
				bullet.reset(this.ship.x+this.ship.width,this.ship.y+this.ship.height/2);
				bullet.body.velocity.x = this.bulletSpeed;
			}
		},

		generateEnemy : function(){
			var enemy = this.enemies.getFirstExists(false);
			if(enemy)
			{
				enemy.reset(WIDTH - 20,Math.floor(Math.random()*(HEIGHT-0)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			else
			{
				enemy = this.enemies.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			enemy.body.velocity.x = -this.enemySpeed;
			enemy.outOfBoundsKill = true;
			enemy.checkWorldBounds = true;
			enemy.animations.add('move');
			enemy.animations.play('move',20,true);
		},
        
/////////////////////////////////////////////////////////
		enemyHitPlayer : function(player, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
//            this.game.load.spritesheet('img/vilrun1.png',81,81,5);
			this.lives -= 1;
			this.livesText.setText("Lives : "+this.lives);
			if(this.lives < 0)
				this.game.state.start('replay');
		},

		enemyHitBullet : function(bullet, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				this.enemies.remove(enemy);
			enemy.kill();
			bullet.kill();
			this.score += 10;
			this.scoreText.setText("Score : "+this.score);
		}
	}
    
 // 게임 Main //
	var menuState = {         
		preload : function(){
			this.game.load.image('bgSpace','img/back.png')
		},

		create : function(){
			this.speed = 30;			//게임시작화면 속도

			this.bg = this.game.add.tileSprite(0,0,1782,750,'bgSpace');
			this.bg.autoScroll(-this.speed,0);

            //텍스트 스타일(CSS)

			var style = {font: "48px Nomal", fill: "#fff", align: "center" };
			this.title = this.game.add.text(650,300,"STAGE 1",style);           //텍스트(가로,세로)
//            
            var style1 = { font: "28px Nomal", fill: "#fff", align: "center" };
			this.title = this.game.add.text(700,350,"START",style1);           //텍스트(가로,세로)
//
			var style2 = { font: "20px Nomal", fill: "#fff", align: "center" };
			this.help = this.game.add.text(610,400,"SPACE 눌러 게임을 시작하세요",style2);
		},

		update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
				this.game.state.start('main');
		}
	}

// 게임 Replay //
    var menuReplay = {        
		preload : function(){
			this.game.load.image('bgSpace','img/back.png')
		},

		create : function(){
			this.speed = 30;			//게임시작화면 속도

			this.bg = this.game.add.tileSprite(0,0,1782,750,'bgSpace');
			this.bg.autoScroll(-this.speed,0);

            //텍스트 스타일(CSS)
			var style3 = { font: "48px Nomal", fill: "#fff", align: "center" };
			this.title = this.game.add.text(460,300,"GAME OVER! TRY AGAIN!",style3);           //텍스트(가로,세로)
			var style4 = { font: "25px Nomal", fill: "#fff", align: "center" };
			this.help = this.game.add.text(500,380,"F5를 눌러 게임을 처음부터 다시 시작하세요.",style4);
		},

		update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
				this.game.state.start('main');
		}
	}

    
    
    
    _game.state.add('replay', menuReplay);
	_game.state.add('main', mainState);
	_game.state.add('menu', menuState);
	_game.state.start('menu');
})();