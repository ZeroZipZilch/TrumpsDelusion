function Platform(scale, point, type)
{
	this.scale = scale;
	this.point = point;

	if(type == "stage")
		this.maxTime = 20;

	if(type == "steel")
		this.maxTime = 60;

	this.time = this.maxTime;

	if(type == "steel")
		this.bg = "#AFAFAF";
	if(type == 'base')
		this.bg = "#7BC868";
	if(type == 'stage')
		this.bg = "#CFB787"

	this.timeColor = "#4694C9";
	this.timeBg = "#C94B4B";

	this.type = type;
}

Platform.prototype.draw = function()
{
	for(var i = 0;i < platforms.length;i++)
	{
		context.beginPath();
			context.fillStyle = platforms[i].bg;
			context.fillRect(platforms[i].point.x, platforms[i].point.y, platforms[i].scale.x, platforms[i].scale.y);
		context.closePath();

		context.beginPath();
			context.fillStyle = this.timeBg;
			context.fillRect(platforms[i].point.x + 5, platforms[i].point.y + platforms[i].scale.y + 5, platforms[i].scale.x - 10, 5);
		context.closePath();

		context.beginPath();
			context.fillStyle = this.timeColor;
			context.fillRect(platforms[i].point.x + 5, platforms[i].point.y + platforms[i].scale.y + 5, platforms[i].time / (platforms[i].maxTime / (platforms[i].scale.x - 10)), 5);
		context.closePath();
	}
};

Platform.prototype.update = function(dt)
{
	for(var i = 0;i < platforms.length;i++)
	{
		if(platforms[i].type != "base")
		{
			platforms[i].time -= dt;
			if(platforms[i].time <= 0)
				platforms.splice(i, 1);
		}
	}
};