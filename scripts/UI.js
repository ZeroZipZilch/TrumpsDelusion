function UI()
{
	//Trumps Delusion
	this.tc = trump.delusion;
	this.tmc = trump.maxDelusion;

	//Player Sanity
	this.ps = player.sanity;
	this.pms = player.maxSanity;

	//Player Charisma
	this.pc = player.charisma;
	this.pmc = player.maxCharisma;

	//Player Level
	this.pl = player.level;

	//Player Exp
	this.pe = player.exp;
	this.pnl = player.nextLevel;

	//Player abilities cooldowns
	//	Grayed out when unavailable due to low level
	//	Darkened with timer when on CD
	//-1 means unavailable
	this.paz = 0;
	this.pax = 0;
	this.pac = -1;
	this.pav = -1;

	//Colors
	this.republican = "#C94B4B";
	this.democratic  = "#4694C9";
	this.charisma = "#FFC057";
	this.charismaBG = "#B4977D";
	this.iconGray = "#7a7a7a";
	this.orange = "#FFC057";
	this.levelBar = "#A241D3";
	this.metallic = "#A1B7C6";

	//Icons
	this.platform_canvas = document.createElement('canvas');
	this.platform_canvas.width = 40;
	this.platform_canvas.height = 40;
	this.platform_context = this.platform_canvas.getContext('2d');

	this.argument_canvas = document.createElement('canvas');
	this.argument_canvas.width = 40;
	this.argument_canvas.height = 40;
	this.argument_context = this.argument_canvas.getContext('2d');

	this.epicArgument_canvas = document.createElement('canvas');
	this.epicArgument_canvas.width = 40;
	this.epicArgument_canvas.height = 40;
	this.epicArgument_context = this.epicArgument_canvas.getContext('2d');

	this.steelPlatform_canvas = document.createElement('canvas');
	this.steelPlatform_canvas.width = 40;
	this.steelPlatform_canvas.height = 40;
	this.steelPlatform_context = this.steelPlatform_canvas.getContext('2d');

	this.makeAbilitiesIcons();
}

UI.prototype.draw = function()
{
	// Draw Icons
	context.drawImage(this.platform_canvas, (game.width / 5) + 30, 29);
	if(this.paz > 0)
	{
		context.fillStyle = "rgba(19,19,19,0.8)";
		context.fillRect((game.width/5)+30, 29, 40, 40);
		context.fillStyle = "#fafafa";
		context.font = "20pt Arial";
		context.fillText(Math.ceil(this.paz), (game.width/5)+43, 57)
	}
	if(this.paz == -1)
	{
		context.fillStyle = "rgba(245,245,245,0.9)";
		context.fillRect((game.width/5)+30, 29, 40, 40);
		context.fillStyle = "#676767";
		context.font = "20pt Arial";
		context.fillText(player.abilitiesLevel.platform, (game.width/5)+43, 57)
	}
	else
	{
		context.fillStyle = "#fafafa";
		context.font = "Bold 13pt Arial";
		context.fillText("Z", (game.width/5)+45, 87)
	}

	context.drawImage(this.argument_canvas, (game.width / 5) + 75, 29);
	if(this.pax > 0)
	{
		context.fillStyle = "rgba(19,19,19,0.8)";
		context.fillRect((game.width/5)+75, 29, 40, 40);
		context.fillStyle = "#fafafa";
		context.font = "20pt Arial";
		context.fillText(Math.ceil(this.pax), (game.width/5)+88, 57)
	}
	if(this.pax == -1)
	{
		context.fillStyle = "rgba(245,245,245,0.9)";
		context.fillRect((game.width/5)+75, 29, 40, 40);
		context.fillStyle = "#676767";
		context.font = "20pt Arial";
		context.fillText(player.abilitiesLevel.argument, (game.width/5)+88, 57)
	}
	else
	{
		context.fillStyle = "#fafafa";
		context.font = "Bold 13pt Arial";
		context.fillText("X", (game.width/5)+90, 87)
	}

	context.drawImage(this.epicArgument_canvas, (game.width / 5) + 120, 29);
	if(this.pac > 0)
	{
		context.fillStyle = "rgba(19,19,19,0.8)";
		context.fillRect((game.width/5)+120, 29, 40, 40);
		context.fillStyle = "#fafafa";
		context.font = "20pt Arial";
		context.fillText(Math.ceil(this.pac), (game.width/5)+133, 57)
	}
	if(this.pac == -1)
	{
		context.fillStyle = "rgba(245,245,245,0.9)";
		context.fillRect((game.width/5)+120, 29, 40, 40);
		context.fillStyle = "#676767";
		context.font = "20pt Arial";
		context.fillText(player.abilitiesLevel.epicArgument, (game.width/5)+133, 57)
	}
	else
	{
		context.fillStyle = "#fafafa";
		context.font = "Bold 13pt Arial";
		context.fillText("C", (game.width/5)+135, 87)
	}

	context.drawImage(this.steelPlatform_canvas, (game.width / 5) + 165, 29);
	if(this.pav > 0)
	{
		context.fillStyle = "rgba(19,19,19,0.8)";
		context.fillRect((game.width/5)+165, 29, 40, 40);
		context.fillStyle = "#fafafa";
		context.font = "20pt Arial";
		context.fillText(Math.ceil(this.pav), (game.width/5)+178, 57)
	}
	if(this.pav == -1)
	{
		context.fillStyle = "rgba(245,245,245,0.9)";
		context.fillRect((game.width/5)+165, 29, 40, 40);
		context.fillStyle = "#676767";
		context.font = "20pt Arial";
		context.fillText(player.abilitiesLevel.steelPlatform, (game.width/5)+178, 57)
	}
	else
	{
		context.fillStyle = "#fafafa";
		context.font = "Bold 13pt Arial";
		context.fillText("V", (game.width/5)+180, 87)
	}

	// Trumps Delusion
	context.beginPath();
		context.fillStyle = this.democratic;
		context.fillRect
		(
			20, 
			game.ground.point.y + game.ground.scale.y / 4,
			game.ground.scale.x - 40,
			game.ground.scale.y / 2
		);

		context.fillStyle = this.republican;
		context.fillRect
		(
			20, 
			game.ground.point.y + game.ground.scale.y / 4,
			this.tc / (this.tmc / (game.ground.scale.x - 40)),
			game.ground.scale.y / 2
		);
	context.closePath();

	context.beginPath();
		context.fillStyle = "#fafafa";
		context.font = "20pt Arial";
		context.fillText("Trumps Delusion",((game.ground.scale.x - 40) / 2) - (context.measureText("Trumps Delusion").width / 2.5), game.ground.point.y + game.ground.scale.y / 1.7);
	context.closePath();

	// Player Level Bar
	context.beginPath();
		context.strokeStyle = "#818181";
		context.lineWidth = 1;

		context.fillStyle = this.metallic;
		context.fillRect
		(
			20, 
			30,
			game.width / 5,
			25
		);

		context.fillStyle = this.levelBar;
		context.fillRect
		(
			20, 
			30,
			this.pe / (this.pnl / (game.width / 5)),
			25
		);
		context.strokeRect
		(
			20, 
			30,
			game.width / 5,
			25
		);
	context.closePath();

	// Player Sanity
	context.beginPath();
		context.strokeStyle = "#818181";
		context.lineWidth = 1;

		context.fillStyle = this.republican;
		context.fillRect
		(
			20, 
			65,
			game.width / 5,
			25
		);
		context.strokeRect
		(
			20, 
			65,
			game.width / 5,
			25
		);

		context.fillStyle = this.democratic;
		context.fillRect
		(
			20, 
			65,
			this.ps / (this.pms / (game.width / 5)),
			25
		);
		context.strokeRect
		(
			20, 
			65,
			game.width / 5,
			25
		);
	context.closePath();

	context.beginPath();
		context.fillStyle = "#fafafa";
		context.font = "15pt Arial";
		context.fillText("Sanity",((game.width / 5) / 2) - (context.measureText("Sanity").width/8), 85);
	context.closePath();

	// Player Charisma
	context.beginPath();
		context.fillStyle = this.charismaBG;
		context.fillRect
		(
			20, 
			100,
			game.width / 5,
			25
		);
		context.strokeRect
		(
			20, 
			100,
			game.width / 5,
			25
		);

		context.fillStyle = this.charisma;
		context.fillRect
		(
			20, 
			100,
			this.pc / (this.pmc / (game.width / 5)),
			25
		);
		context.strokeRect
		(
			20, 
			100,
			game.width / 5,
			25
		);
	context.closePath();

	context.beginPath();
		context.fillStyle = "#ffffff";
		context.font = "15pt Arial";
		context.fillText("Charisma",((game.width / 5) / 2) - (context.measureText("Charisma").width/4), 120);
	context.closePath();

	// Player Level
	context.beginPath();
		context.fillStyle = "#343434";
		context.font = "15pt Arial";
		context.fillText("Level: "+this.pl,((game.width / 5) / 2) - (context.measureText("Level: 00").width/5), 50);
	context.closePath();
	context.beginPath();
		context.fillStyle = "#fafafa";
		context.font = "Bold 12pt Arial";
		context.fillText("Press P to pause the game",30, 145);
	context.closePath();
	context.beginPath();
		context.fillStyle = "#fafafa";
		context.font = "Bold 12pt Arial";
		context.fillText("Press H for help",30, 170);
	context.closePath();	
};

UI.prototype.update = function()
{
	this.tc = trump.delusion;
	this.ps = player.sanity;
	this.pc = player.charisma;
	this.pms = player.maxSanity;
	this.pmc = player.maxCharisma;
	this.pl = player.level;
	this.pe = player.exp;
	this.pnl = player.nextLevel;

	this.paz = Math.ceil(player.activeCD.platform);
	this.pax = Math.ceil(player.activeCD.argument);
	this.pac = Math.ceil(player.activeCD.epicArgument);
	this.pav = Math.ceil(player.activeCD.steelPlatform);

	if(this.pl < player.abilitiesLevel.platform)
		this.paz = -1;
	if(this.pl < player.abilitiesLevel.argument)
		this.pax = -1;
	if(this.pl < player.abilitiesLevel.epicArgument)
		this.pac = -1;
	if(this.pl < player.abilitiesLevel.steelPlatform)
		this.pav = -1;
};

UI.prototype.makeAbilitiesIcons = function()
{
	var context = this.platform_context;
	// Stage Icon
	context.beginPath();
		context.fillStyle = this.iconGray;
		context.fillRect(0,0,40,40);
	context.closePath();

	context.fillStyle   = this.orange;
	context.strokeStyle = this.orange;
	context.lineWidth   = 4;

	context.beginPath();
		context.moveTo(6,17);
		context.lineTo(34, 17);
		context.lineTo(34, 23);
		context.lineTo(6, 23);
		context.fill();
	context.closePath();


	// Argument Icon
	var context = this.argument_context;

	context.beginPath();
		context.fillStyle = this.iconGray;
		context.fillRect(0,0,40,40);
	context.closePath();

	context.fillStyle   = this.orange;
	context.strokeStyle = this.orange;
	context.lineWidth   = 2;

	context.beginPath();
		context.moveTo(30,10);
		context.quadraticCurveTo(40, 18, 30, 25);
		context.quadraticCurveTo(24, 28, 18, 28);

		context.quadraticCurveTo(10, 29, 0, 32);
		context.quadraticCurveTo(11, 29, 6, 23);

		context.quadraticCurveTo(4, 10, 20, 9);
		context.quadraticCurveTo(25, 8, 30, 10);
		context.fill();
	context.closePath();

	// Epic Argument Icon
	var context = this.epicArgument_context;

	context.beginPath();
		context.fillStyle = this.iconGray;
		context.fillRect(0,0,40,40);
	context.closePath();

	context.fillStyle   = this.orange;
	context.strokeStyle = this.orange;
	context.lineWidth   = 2;

	context.beginPath();
		context.arc(0,20,15,Math.PI*1.5,Math.PI/2,false);
		context.fill();
	context.closePath();

	context.beginPath();
		context.moveTo(3,5);
		context.lineTo(10,-5);
		context.lineTo(10, 8);
		context.lineTo(17, -2);
		context.lineTo(15, 16);
		context.lineTo(23, 10);
		context.lineTo(16, 20);
		context.lineTo(26, 20);
		context.lineTo(16, 25);
		context.lineTo(25, 32);
		context.lineTo(14, 29);
		context.lineTo(23, 37);
		context.lineTo(5, 35);
		context.fill();
	context.closePath();

	var context = this.steelPlatform_context;
	// Steel Stage Icon
	context.beginPath();
		context.fillStyle = this.iconGray;
		context.fillRect(0,0,40,40);
	context.closePath();

	context.fillStyle   = this.orange;
	context.strokeStyle = this.orange;
	context.lineWidth   = 4;

	context.beginPath();
		context.moveTo(6,11);
		context.lineTo(34, 11);
		context.lineTo(34, 18);
		context.lineTo(6, 18);
		context.fill();
	context.closePath();

	context.beginPath();
		context.moveTo(6,21);
		context.lineTo(34, 21);
		context.lineTo(34, 28);
		context.lineTo(6, 28);
		context.fill();
	context.closePath();

	context.beginPath();
		context.moveTo(6,11);
		context.lineTo(6, 28);
		context.stroke();
	context.closePath();

	context.beginPath();
		context.moveTo(34,11);
		context.lineTo(34, 28);
		context.stroke();
	context.closePath();
}