function Game()
{
    this.width = $(document).width();
    this.height = $(document).height();

    this.ground = {
    	scale:{x:this.width,y:100}, 
    	point:{x:0, y:this.height - 100}
    };

	this.lastUpdate = Date.now() / 1000;
	this.state = "playing";
}

Game.prototype.init = function()
{
	$("#confFlag").show();
	$("#mericanFlag").show();
	canvas.width = this.width;
    canvas.height = this.height;

	confDiv.css('width', this.width);
    confDiv.css('height', this.height);
	mericanDiv.css('width', this.width);
    mericanDiv.css('height', this.height);

    this.makeBase();
   
    window.addEventListener('keydown', input.onKeyDown, false);
    window.addEventListener('keyup', input.onKeyUp, false);

    this.loop();
};

Game.prototype.render = function()
{
	context.clearRect(0,0,this.width,this.height);
	
	if(this.state == 'playing')
	{
		platform.draw();
		trump.draw();
		argument.draw();
		player.draw();
		ui.draw();
		eagle.draw();
	}

	popup.draw();
};

Game.prototype.update = function(dt)
{
    if(isNaN(dt))
        dt = 0;
	
	if(this.state == 'playing')
	{
		argument.update(dt);
		trump.update(dt);
		player.update(dt);
		platform.update(dt);
		eagle.update(dt);
		ui.update();
	}

	confDiv.css('opacity', trump.delusion / trump.maxDelusion);

	popup.update(dt);
};

Game.prototype.loop = function()
{
	now = Date.now() / 1000;
	dt 	= now - this.lastUpdate;

	if(dt > 0.1)
		dt = 0.1;

	this.lastUpdate = now;

	if(input.isDown(input.keys.P))
	{
		this.state = 'paused';
		popup.set("The game has been paused. ;: For more information about us, visit http://www.valiant.ninja ;: Twitter @ valiant_ninja ;: Copyright &copy; Valiant Ninja ;: [Press Enter to resume game]", 'full', false)
	}

	if(input.isDown(input.keys.H))
	{
		this.state = 'paused';
		popup.setTwoColumns("[Press Enter to resume game] ;: Welcome to Trumps Delusion. Your objective is to defeat Trump in a debate. At the same time, you have to avoid Trumps delusional sentences. Your Sanity meter keeps track of how sane you still are, while your Charisma meter keeps track of how much you can actually do. ;: Your Charisma meter will increase each second. Using your abilities to debate costs Charisma.", "Your first abilities are building a stage and making an Argument. You need to build stages to be able to reach trump, and make arguments to defeat him. A stage lasts for 20 seconds. On level 5 you'll learn to make an epic argument, and on level 9 you'll learn to make stages out of steel that last for 1 minute. ;: To move around, use the arrow keys. To jump, use the space bar. To use your abilities, use the keys that are indicated under the icons located next to your Sanity and Charisma meters.", false, 8)
	}

	game.update(dt);
	game.render();

	requestAnimationFrame(game.loop);
};

Game.prototype.makeBase = function()
{
    platforms.push(new Platform
    (
    	{x:this.ground.scale.x, y:this.ground.scale.y}, 
    	{x:this.ground.point.x, y:this.ground.point.y},
    	"base"
    ));
}

Game.prototype.preLoadImages = function()
{
	context.fillStyle = "#fafafa";
	context.fillRect(0,0,canvas.width,canvas.height);

	context.font = "15pt Arial";
	context.fillStyle = "#343434";
	context.textAlign = 'center';
	context.textBaseLine = 'middle';
	context.fillText("Loading game...", canvas.width/2, canvas.height/2);

	images = ['/eagle.png', '/pending.png', '/shoot.png', '/ouch.png', '/toupe.png', '/confFlag.jpg', '/mericanFlag.jpg'];
	loadingImages = [];
	loadedImages = 0;

	for(i = 0;i < images.length;i++)
	{
		loadingImages.push(new Image());
		
		loadingImages[i].onload = function()
		{
			loadedImages++;
			if(loadedImages == images.length)
				game.init();
		}

		loadingImages[i].src = images[i];
	}
}