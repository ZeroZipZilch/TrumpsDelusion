function Eagle()
{
	this.point = {};
	this.scale = {x:256, y:204};

	this.canvas = document.createElement('canvas');
	this.canvas.width = this.scale.x;
	this.canvas.height = this.scale.y;
	this.context = this.canvas.getContext('2d');

	this.eagleImg = new Image();

	this.eagleImg.onload = function()
	{
		document.body.appendChild(this.eagleImg);
		this.context.drawImage(this.eagleImg, 0, 0);
	}

	this.eagleImg.src = '/eagle.png';

	this.make = false;
	this.down = true;
}

Eagle.prototype.draw = function()
{
	if(this.make == true)
	{
		context.drawImage(this.canvas, this.point.x, this.point.y);
	}
};

Eagle.prototype.update = function(dt)
{
	if(this.make == true)
	{
		if(this.down == true)
		{
			this.point.y += 150*dt;
			if(this.point.y > trump.scale.y / 4.4)
			{
				this.down = false;
			}
		}
		else
		{
			if(this.point.y > 10)
			{
				this.point.y -= 150*dt;
			}
		}

		if(this.point.x + this.scale.x > trump.point.x)
		{
			if(trump.toupeTimer == 0)
			{
				trump.toupeTimer = 3;
			}

			this.point.y -= 100*dt;
		}
		if(this.point.y < 0 - this.scale.y)
		{
			this.make = false;
			this.down = true;
		}

		this.point.x += 280*dt;
	}
};

Eagle.prototype.makeEagle = function()
{
	this.make = true;
	this.point.x = -200;
	this.point.y = 0;
}