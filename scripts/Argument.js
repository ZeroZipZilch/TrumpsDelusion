function Argument(point, argument, direction, strength, rotation, damage)
{
	this.point = point;
	this.argument = argument;
	this.direction = direction;
	this.strength = strength;
	this.font = 'Bold ' + strength + 'pt Arial';;
	this.rotation = rotation;
	this.damage = damage;

	this.speed = 85;

	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');

	this.context.font = this.font;

	this.scale = {x:this.context.measureText(this.argument).width,
				  y:this.getTextHeight(this.font)};

	this.canvas.width = this.scale.x;
	this.canvas.height = this.scale.y;

	this.slope = 0;
	this.y_intercept = 0;

	this.line = {};

	if(this.direction == "W")
	{
		trump_x = trump.point.x + (trump.scale.x / 1.1) /2;
		trump_y = trump.point.y + (trump.scale.y / 3.2) / 2;

		rise = trump_y - player.point.y - (player.scale.y / 2.2);
		run = trump_x - player.point.x - (player.scale.x / 2.2);

		this.slope = rise/ run;

		this.y_intercept = trump_y - (this.slope * trump_x);

		this.line.start_y = this.point.y;
		this.line.start_x = this.point.x;

		this.point.x -= this.scale.x;
		this.point.y -= this.scale.y*8;

		this.line.end_y = this.slope * (player.point.x) + this.y_intercept;
		this.line.end_x = (this.line.end_y - this.y_intercept) / this.slope;//player.point.x + player.scale.x;

		lines.push({
			start_x:this.line.start_x,
			start_y:this.line.start_y,
			end_x:this.line.end_x,
			end_y:this.line.end_y
		});

		p1 = {x:this.line.start_x, y:this.line.start_y};
		p2 = {x: this.line.end_x, y:this.line.end_y};
		p3 = {x:this.line.start_x, y:this.line.end_y};

		p12 = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
		p13 = Math.sqrt(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2));
		p23 = Math.sqrt(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2));

		this.rotation = 1.2;
	}

	this.make();
}

Argument.prototype.draw = function()
{	
	for(var i = 0;i < argumentz.length;i++)
	{
		context.translate
		(
			argumentz[i].point.x + argumentz[i].scale.x/2, 
			argumentz[i].point.y + argumentz[i].scale.y/2
		);
			context.rotate(argumentz[i].rotation);
		context.translate
		(
			-(argumentz[i].point.x + argumentz[i].scale.x/2), 
			-(argumentz[i].point.y + argumentz[i].scale.y/2)
		);
				context.drawImage(argumentz[i].canvas, argumentz[i].point.x, argumentz[i].point.y + 3);
		
		context.translate
		(
			argumentz[i].point.x + argumentz[i].scale.x/2, 
			argumentz[i].point.y + argumentz[i].scale.y/2
		);	
			context.rotate(-argumentz[i].rotation);
		context.translate
		(
			-(argumentz[i].point.x + argumentz[i].scale.x/2), 
			-(argumentz[i].point.y + argumentz[i].scale.y/2)
		);

		daArgument = argumentz[i];
		centerX = daArgument.point.x + daArgument.scale.x / 2;
		centerY = daArgument.point.y + daArgument.scale.y / 2;

		topLeft = {x:daArgument.point.x, y:daArgument.point.y};
		topRight = {x:daArgument.point.x + daArgument.scale.x, y:daArgument.point.y};
		bottomLeft = {x:daArgument.point.x, y:daArgument.point.y + daArgument.scale.y};
		bottomRight = {x:daArgument.point.x + daArgument.scale.x, y:daArgument.point.y + daArgument.scale.y};

		arg = {};
		arg.topLeft = daArgument.translate(centerX, centerY, topLeft.x, topLeft.y, daArgument.rotation);
		arg.topRight = daArgument.translate(centerX, centerY, topRight.x, topRight.y, daArgument.rotation);
		arg.bottomRight = daArgument.translate(centerX, centerY, bottomRight.x, bottomRight.y, daArgument.rotation);
		arg.bottomLeft = daArgument.translate(centerX, centerY, bottomLeft.x, bottomLeft.y, daArgument.rotation);
	}
};

Argument.prototype.translate = function(cx, cy, x, y, theta)
{
	// translate point to origin
	var tempX = x - cx;
	var tempY = y - cy;

	// now apply rotation
	var rotatedX = tempX*Math.cos(theta) - tempY*Math.sin(theta);
	var rotatedY = tempX*Math.sin(theta) + tempY*Math.cos(theta);

	// translate back
	x = rotatedX + cx;
	y = rotatedY + cy;

	return {x, y};
};

Argument.prototype.update = function(dt)
{
    if(isNaN(dt))
        dt = 0;

	for(var i = 0;i < argumentz.length;i++)
	{
		if(argumentz[i].direction == "W")
		{
			argumentz[i].rotation -= 0.015;
			argumentz[i].point.x -= argumentz[i].speed * dt;
			argumentz[i].point.y = argumentz[i].slope * (argumentz[i].point.x + argumentz[i].scale.x/2) + argumentz[i].y_intercept;

			if(argumentz[i].point.x < -200)
				argumentz.splice(i, 1);

			if(typeof argumentz[i] !== "undefined")
			{

				daArgument = argumentz[i];
				centerX = daArgument.point.x + daArgument.scale.x / 2;
				centerY = daArgument.point.y + daArgument.scale.y / 2;

				topLeft = {x:daArgument.point.x, y:daArgument.point.y};
				topRight = {x:daArgument.point.x + daArgument.scale.x, y:daArgument.point.y};
				bottomLeft = {x:daArgument.point.x, y:daArgument.point.y + daArgument.scale.y};
				bottomRight = {x:daArgument.point.x + daArgument.scale.x, y:daArgument.point.y + daArgument.scale.y};

				arg = {};
				arg.topLeft = daArgument.translate(centerX, centerY, topLeft.x, topLeft.y, daArgument.rotation);
				arg.topRight = daArgument.translate(centerX, centerY, topRight.x, topRight.y, daArgument.rotation);
				arg.bottomRight = daArgument.translate(centerX, centerY, bottomRight.x, bottomRight.y, daArgument.rotation);
				arg.bottomLeft = daArgument.translate(centerX, centerY, bottomLeft.x, bottomLeft.y, daArgument.rotation);

				if(this.intersects(arg, player))
				{
					argumentz.splice(i, 1);
					player.sanity -= daArgument.damage;

					player.color = "#9DD500";
					player.colorTimer = player.colorTimerReset;
				}
				else
				{
					if(player.colorTimer == 0)
						player.color = "#4C98C9";
				}
			}
		}
		else if(argumentz[i].direction == "E")
		{
			argumentz[i].point.x += argumentz[i].speed * dt;
			
			if(argumentz[i].point.x + argumentz[i].width > canvas.width)
				argumentz.splice(i, 1);

			if(typeof argumentz[i] !== "undefined")
			{
				if(argumentz[i].point.x + argumentz[i].scale.x / 1.5> trump.point.x &&
					argumentz[i].point.y < trump.point.y + trump.scale.y / 3.2)
				{
					trump.ouchTimer = trump.ouchLasts;
					trump.delusion -= argumentz[i].damage;
					player.exp += argumentz[i].damage;
					argumentz.splice(i, 1);
				}
			}
		}
	}
}

Argument.prototype.intersects = function(a, b)
{
	P = {x:a.topLeft.x, y:a.topLeft.y};
	Q = {x:a.topRight.x, y:a.topRight.y};
	R = {x:a.bottomRight.x, y:a.bottomRight.y};
	S = {x:a.bottomLeft.x, y:a.bottomLeft.y};

	vertices1 = [P,Q];

	topLeft = {x:b.point.x, y:b.point.y};
	topRight = {x:b.point.x + b.scale.x, y:b.point.y};
	bottomRight = {x:b.point.x + b.scale.x, y:b.point.y + b.scale.y};
	bottomLeft = {x:b.point.x, y:b.point.y + b.scale.y};

	vertices2 = [topLeft,topRight];
	
	a.axis = [];
	a.axis.push({x:-(Q.y - P.y), y:(Q.x - P.x)});
	//a.axis.push({x:-(Q.y - R.y), y:(Q.x - R.x)});
	//a.axis.push({x:(P.y - S.y), y:-(P.x - S.x)});
	//a.axis.push({x:(R.y - S.y), y:-(R.x - S.x)});
	
	b.axis = [];
	b.axis.push({x:-(topRight.y - topLeft.y), y:(topRight.x - topLeft.x)});
	//b.axis.push({x:-(topRight.y - bottomRight.y), y:(topRight.x - bottomRight.x)});
	//b.axis.push({x:(topLeft.y - bottomLeft.y), y:-(topLeft.x - bottomLeft.x)});
	//b.axis.push({x:(bottomLeft.y - bottomRight.y), y:-(bottomLeft.x - bottomRight.x)});

	smallest = null;
	overlap = 9999999;

	for(i = 0;i < a.axis.length;i++)
	{
		axis = a.axis[i];
		p1 = this.projection(axis, vertices1);
		p2 = this.projection(axis, vertices2);

		if(!this.overlap(p1, p2))
			return false;
		else
		{
			o = this.getOverlap(p1, p2);

			if(o < overlap)
			{
				overlap = o;
				smallest = axis;
			}
		}
	}

	for(i = 0;i < b.axis.length;i++)
	{
		axis = b.axis[i];

		p1 = this.projection(axis, vertices1);
		p2 = this.projection(axis, vertices2);

		if(!this.overlap(p1, p2))
			return false;
		else
		{
			o = this.getOverlap(p1, p2);

			if(o < overlap)
			{
				overlap = o;
				smallest = axis;
			}
		}
	}

	return true;
}

Argument.prototype.dot = function(axis, vertex)
{
	return vertex.x * axis.x + vertex.y * axis.y;
}

Argument.prototype.projection = function(axis, shape)
{
	min = this.dot(axis, shape[0]);
	max = min;

	for(i = 1;i < shape.length;i++)
	{
		p = this.dot(axis, shape[i]);
		if(p < min)
			min = p;
		if(p > max)
			max = p;
	}

	return {min, max};
}

Argument.prototype.overlap = function(p1, p2)
{
	return !(p1.min > p2.max || p2.min > p1.max);
}

Argument.prototype.getOverlap = function(p1, p2)
{
	if(this.overlap(p1, p2))
	{
		return Math.min(p1.max, p2.max) - Math.max(p1.min, p2.min);
	}

	return 0;
}

Argument.prototype.make = function()
{
	text_context = this.context;

	text_context.beginPath();
		text_context.fillStyle = "#fafafa";
		text_context.font = this.font;
		text_context.textBaseline = 'top';
		text_context.fillText(this.argument,0,0);
	text_context.closePath();
};

Argument.prototype.getTextHeight = function(font)
{
	var text = $('<span>Hg</span>').css({ font: font });
	var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

	var div = $('<div></div>');
	div.append(text, block);

	var body = $('body');
	body.append(div);

	try {

	var result = {};

	block.css({ verticalAlign: 'baseline' });
	result.ascent = block.offset().top - text.offset().top;

	block.css({ verticalAlign: 'bottom' });
	result.height = block.offset().top - text.offset().top;

	result.descent = result.height - result.ascent;

	} finally {
	div.remove();
	}

	return result.height;
};