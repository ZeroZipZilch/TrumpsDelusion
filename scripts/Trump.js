function Trump()
{
	this.point    = {x:game.width - 220, y:10};
	this.scale    = {x:200, y:game.height - 20};
	this.maxDelusion = 99999;
	this.delusion = this.maxDelusion;
	this.damage   = 10;
	this.special  = 200;
	this.angle    = 0;

	this.color = "#343434";

	this.pending = "/pending.png";
	this.shoot = "/shoot.png";
	this.ouch = "/ouch.png";
	this.toupe = "/toupe.png";

	this.face = "pending";

	this.upperLeftArmRotation = 30;
	this.upperRightArmRotation = 30;

	this.lowerLeftArmRotation = 5;
	this.lowerRightArmRotation = 0;

	this.body = document.createElement('canvas');
	this.body.width = this.scale.x;
	this.body.height = this.scale.y;

	this.body_context = this.body.getContext('2d');

	this.makeBody();

	this.faceImg = new Image();
	this.faceImg.src = this.ouch;

	this.shot = 5;
	this.shotTimer = 5;

	this.ouchTimer = 0;
	this.ouchLasts = 0.5;

	this.toupeTimer = 0;

	this.arguments = [
		"What a hat",
		"Political Correctness is a problem",
		"Rich people solve difficult problems",
		"We should be speaking english",
		"If Ivanka weren't my daughter, I'd date her",
		"Mexico sends us rapists",
		"Mexico sends us drug dealers",
		"I will be the greatest jobs president",
		"We need a leader that wrote ‘The Art of the Deal'",
		"I dont like losers",
		"We need a great president",
		"I'm worth far too much money",
		"I don't need anybody's money",
		"Mexico's making a fortune off the US",
		"Everything in life is luck"
	];
}

Trump.prototype.draw = function()
{
	//Body
	context.drawImage(this.body, this.point.x, this.point.y * 4.5);

	//Head
	context.beginPath();

	if(this.face == 'pending')
	{
		this.faceImg.src = this.pending;
		context.drawImage(this.faceImg, this.point.x, this.point.y);
	}

	if(this.face == 'toupe')
	{
		this.faceImg.src = this.toupe;
		context.drawImage(this.faceImg, this.point.x, this.point.y);
	}

	if(this.face == 'shoot')
	{
		player_center_y = player.point.y + player.scale.y / 2;
		donald_center_y = this.point.y + (this.scale.y / 3.2) / 2;

		player_center_x = player.point.x + player.scale.x / 2;
		donald_center_x = this.point.x + (this.scale.x / 1.1) / 2;
		
		if(player.point.y > donald_center_y)
		{
			adjacent = donald_center_y;
			opposite = donald_center_y - player_center_y;

			compensation = 60;
		}
		else
		{
			adjacent = (this.point.y + (this.scale.y / 3.2)) - player.point.y;
			opposite = this.point.x + (this.scale.x / 1.1) - player.point.x + player.scale.x;
		
			compensation = -10;
		}
		
		angleY = Math.atan(Math.abs(opposite)/adjacent) * -1;


		opposite = this.point.x + (this.scale.x / 1.1) / 2;
		adjacent = (this.point.x + (this.scale.x / 1.1) / 2) - player.point.x
		
		angleX = Math.atan(opposite/Math.abs(adjacent));

		angle = angleX - angleY;

		angle = -angle * 360 / (2*Math.PI);
		
		angle -= compensation;

		if(angle < 0)
			angle += 180;

		this.angle = angle;

		context.translate
		(
			this.point.x + (this.scale.x / 1.1) /2,
			this.point.y + (this.scale.y / 3.2) / 2
		);
			context.rotate(angle * Math.PI / 180);
		context.translate
		(
			-(this.point.x + (this.scale.x / 1.1) /2),
			-(this.point.y + (this.scale.y / 3.2) / 2)
		);

			this.faceImg.src = this.shoot;
			context.drawImage(this.faceImg, this.point.x, this.point.y);

		context.translate
		(
			this.point.x + (this.scale.x / 1.1) /2,
			this.point.y + (this.scale.y / 3.2) / 2
		);
			context.rotate(-angle * Math.PI / 180);
		context.translate
		(
			-(this.point.x + (this.scale.x / 1.1) /2),
			-(this.point.y + (this.scale.y / 3.2) / 2)
		);
	}

	if(this.face == 'ouch')
	{
		this.faceImg.src = this.ouch;
		context.drawImage(this.faceImg, this.point.x + 40, this.point.y);
	}
	context.closePath();
};

Trump.prototype.update = function(dt)
{
    if(isNaN(dt))
        dt = 0;

	if(this.shot > 0)
		this.shot -= dt;
	if(this.shot <= 0 && this.toupeTimer == 0)
	{
		this.fireArgument();
		this.shot = this.shotTimer;
		this.face = 'pending';
	}

	if(this.shot <= 1 && this.toupeTimer == 0)
		this.face = 'shoot';

	if(this.ouchTimer > 0 && this.shot > 1 && this.toupeTimer == 0)
	{
		this.ouchTimer -= dt;
		this.face = 'ouch';
	}
	
	if(this.ouchTimer < 0)
		this.ouchTimer = 0;

	if(this.toupeTimer > 0)
	{
		this.face = 'toupe';
		this.toupeTimer -= dt;
	}
	if(this.toupeTimer <= 0)
	{
		this.toupeTimer = 0;
	}

	if(this.delusion > this.maxDelusion)
		this.delusion = this.maxDelusion;

    if(this.delusion <= 0)
    {
        popup.set("You saved America from Trumps delusion. Good job! ;: [Press P to see more information about us] ;: Refresh the window to play again.", "full", false);
    }
}

Trump.prototype.fireArgument = function()
{
	lines = [];
	daArgumentIndex = Math.floor(Math.random() * this.arguments.length);
	argumentz.push
	(
		new Argument
		(
			{x:this.point.x + (this.scale.x/ 1.2)/2, y:this.point.y},
			this.arguments[daArgumentIndex],
			"W",
			12,
			this.angle,
			this.damage
		)
	);
};

Trump.prototype.makeBody = function()
{
	body_context = this.body_context;

	//Spine
	body_context.beginPath();
		body_context.fillStyle = this.color;
		body_context.fillRect
		(
			this.scale.x/2,//this.point.x + this.scale.x /2 - (this.scale.x / 15) / 2,
			this.scale.y/5,//this.point.y + this.scale.y / 5,
			this.scale.x / 15,
			this.scale.y / 3
		);
	body_context.closePath();

	//Left Upper Arm
	body_context.beginPath();
		body_context.fillStyle = this.color;
		body_context.translate
		(
			this.scale.x/2.3,//this.point.x + this.scale.x /2.3, 
			this.scale.y/5.2//this.point.y + (this.scale.y / 5.2)
		);

		body_context.rotate(this.upperLeftArmRotation * Math.PI / 180);
		body_context.fillRect
		(
			0,
			0,
			this.scale.x / 15,
			this.scale.y / 6
		);
		body_context.rotate(-(this.upperLeftArmRotation * Math.PI / 180));

		body_context.translate
		(
			-(this.scale.x/2.3),//-(this.point.x + this.scale.x /2.3),
			-(this.scale.y/5.2)//-(this.point.y + (this.scale.y / 5.2))
		);
	body_context.closePath();

	//Left Lower Arm
	body_context.beginPath();
		body_context.translate
		(
			this.scale.x/2 - this.scale.x / 2.33,//this.point.x + this.scale.x /2 - (this.scale.x / 2.33),
			this.scale.y/15 * 5//this.point.y + (this.scale.y / 15) * 5
		);

		body_context.fillStyle = this.color;
		body_context.rotate(this.lowerLeftArmRotation * Math.PI / 180);
		body_context.fillRect
		(
			0,
			0,
			this.scale.x / 15,
			this.scale.y / 6
		);
		body_context.rotate(-(this.lowerLeftArmRotation * Math.PI / 180));

		body_context.translate
		(
			-(this.scale.x/2 - this.scale.x / 2.33),//-(this.point.x + this.scale.x /2 - (this.scale.x / 2.33)),
			-(this.scale.y/15 * 5)//-(this.point.y + (this.scale.y / 15) * 5)
		);
	body_context.closePath();

	//Right Upper Arm
	body_context.beginPath();
		body_context.translate
		(
			this.scale.x / 1.8,//this.point.x - this.scale.x /2 + (this.scale.x),
			this.scale.y / 5.2//this.point.y + (this.scale.y / 5.2)
		);

		body_context.fillStyle = this.color;
		body_context.rotate(-this.upperRightArmRotation * Math.PI / 180);
		body_context.fillRect
		(
			0,
			0,
			this.scale.x / 15,
			this.scale.y / 6
		);
		body_context.rotate(-(-this.upperRightArmRotation * Math.PI / 180));

		body_context.translate
		(
			-(this.scale.x / 1.8),//-(this.point.x - this.scale.x /2 + (this.scale.x)),
			-(this.scale.y / 5.2)//-(this.point.y + (this.scale.y / 5.2))
			
		);
	body_context.closePath();

	//Right Lower Arm
	body_context.beginPath();
		body_context.translate
		(
			(this.scale.x/15) + (this.scale.x/1.18),// * 4.62,//this.point.x - this.scale.x /15 + (this.scale.x / 5) * 4.62,
			(this.scale.y/15) * 4.9//this.point.y + (this.scale.y / 15) * 4.9
		);

		body_context.fillStyle = this.color;
		body_context.rotate(-this.lowerRightArmRotation * Math.PI / 180);
		body_context.fillRect
		(
			0,
			0,
			this.scale.x / 15,
			this.scale.y / 6
		);
		body_context.rotate(-(-this.lowerRightArmRotation * Math.PI / 180));

		body_context.translate
		(
			-((this.scale.x/15 ) + (this.scale.x/1.18)),// * 4.62),//-(this.point.x - this.scale.x /15 + (this.scale.x / 5) * 4.62),
			-((this.scale.y/15) * 4.9)//-(this.point.y + (this.scale.y / 15) * 4.9)
		);
	body_context.closePath();

	//Left Leg
	body_context.beginPath();
		body_context.fillStyle = this.color;
		body_context.rotate(15 * Math.PI / 180);
		body_context.fillRect
		(
			this.scale.x /15 + (this.scale.x / 5) * 5.1,//this.point.x - this.scale.x /15 + (this.scale.x / 5) * 4.8,
			(this.scale.y /2.1),//this.point.y + (this.scale.y / 5),
			this.scale.x / 15,
			this.scale.y / 2.5
		);
		body_context.rotate(-(15 * Math.PI / 180));
	body_context.closePath();

	//Right Leg
	body_context.beginPath();
		body_context.fillStyle = this.color;
		body_context.rotate(-9 * Math.PI / 180);
		body_context.fillRect
		(
			this.scale.x /15 + (this.scale.x / 15),//this.point.x + this.scale.x /15 - (this.scale.x / 2.7),
			(this.scale.y / 1.85),//this.point.y + (this.scale.y / 5) * 4.14,
			this.scale.x / 15,
			this.scale.y / 2.5
		);
		body_context.rotate(-(-9 * Math.PI / 180));
	body_context.closePath();
};