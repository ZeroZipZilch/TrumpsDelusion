function Popup()
{
	this.type = "";
	this.phrase = "";
	this.fullPhrase = "";

	this.phrase1 = "";
	this.phrase2 = "";

	this.phraseArray1 = [];
	this.phraseArray2 = [];

	this.phraseArray = [];

	this.republican = "#C94B4B";
	this.democratic  = "#4694C9";
	this.opaqueDemocratic  = "rgba(76, 152, 201, 0.8)";

	this.bg = this.democratic;

	this.dropdownTimer = 0;
	this.dropdownTimeSet = 6;

	this.confirmTimer = 0;
}

Popup.prototype.dropdown = function()
{
	context.beginPath();
		context.fillStyle = this.bg;
		context.fillRect(game.width / 2 - 300, 0, 600, 200);
		context.fillStyle = "#fafafa";
		context.font = "15pt Arial";
		this.phraseArray = this.getLines(context, this.phrase, 580)

		var lineheight = 0;

		for(var i = 0;i < this.phraseArray.length;i++)
		{
			if(this.phraseArray[i - 1] == " ")
				lineheight += 5;
			else
				lineheight += 30;

			context.fillText(this.phraseArray[i], game.width / 2 - 290, lineheight + 15);
		}
	context.closePath();
};

Popup.prototype.full = function()
{
	context.beginPath();
		context.fillStyle = this.bg;
		context.fillRect(0, 0, game.width, game.height);
		context.fillStyle = "#fafafa";
		context.font = this.fontSize+"pt Arial";
		this.phraseArray = this.getLines(context, this.phrase, 600)

		var lineheight = 0;

		for(var i = 0;i < this.phraseArray.length;i++)
		{
			if(this.phraseArray[i - 1] == " ")
				lineheight += 20;
			else
				lineheight += 40;

			context.fillText(this.phraseArray[i], game.width / 2 - 300, lineheight + 150);
		}
	context.closePath();
};

Popup.prototype.fullTwoColumns = function()
{
	context.beginPath();
		context.fillStyle = this.bg;
		context.fillRect(0, 0, game.width, game.height);
		context.fillStyle = "#fafafa";
		context.font = this.fontSize+"pt Arial";
		this.phraseArray1 = this.getLines(context, this.phrase1, 300)

		var lineheight = 0;

		for(var i = 0;i < this.phraseArray1.length;i++)
		{
			if(this.phraseArray1[i - 1] == " ")
				lineheight += 20;
			else
				lineheight += 40;

			context.fillText(this.phraseArray1[i], game.width/2 - 320, lineheight + 50);
		}

		this.phraseArray2 = this.getLines(context, this.phrase2, 300)

		maxLineheight = lineheight;

		var lineheight = 0;

		for(var i = 0;i < this.phraseArray2.length;i++)
		{
			if(this.phraseArray2[i - 1] == " ")
				lineheight += 20;
			else
				lineheight += 40;

			context.fillText(this.phraseArray2[i], game.width / 2 + 40, lineheight + 50);
		}

		if(lineheight > maxLineheight)
			maxLineheight = lineheight;

		context.moveTo(game.width/2, 50);
		context.lineTo(game.width/2, maxLineheight + 170);
		context.strokeStyle = "#fafafa";
		context.stroke();
	context.closePath();
};

Popup.prototype.empty = function()
{
	game.state = "playing";
	this.phrase = "";
	this.phraseArray = [];
	this.bg = this.democratic;
};

Popup.prototype.draw = function()
{
	if(this.type == "dropdown" || this.type == "dropdownOption")
		this.dropdown();
	if(this.type == "full")
		this.full();
	if(this.type == "fullTwoColumns")
		this.fullTwoColumns();
	if(this.type == "")
		this.empty();
};

Popup.prototype.update = function(dt)
{
	if(this.confirmTimer > 0)
		this.confirmTimer -= dt;
	if(this.confirmTimer < 0)
		this.confirmTimer = 0;

	if(this.dropdownTimer > 0)
		this.dropdownTimer -= dt;

	if(this.dropdownTimer <= 0 && (this.type == 'dropdown' || this.type == 'dropdownOption'))
	{
		this.type = "";
		this.dropdownTimer = 0;
	}

	if(this.type == 'dropdownOption')
	{
		if(input.isDown(input.keys.ENTER))
	    	this.setFullOption();
	}

	this.confirm();
}

Popup.prototype.set = function(phrase, type, bad)
{
	this.fontSize = 20;

	this.dropdownTimer = this.dropdownTimeSet;

	this.phrase = phrase;
	this.type = type;

	if(type == 'full')
		game.state = "paused";

	if(bad == true)
		this.bg = this.republican;
	else
		this.bg = this.democratic;

	if(type == 'dropdown')
		this.bg = this.opaqueDemocratic;
}

Popup.prototype.setTwoColumns = function(phrase1, phrase2, type, bad, size)
{
	this.fontSize = size;

	this.phrase1 = phrase1;
	this.phrase2 = phrase2;
	this.type = 'fullTwoColumns';

	game.state = "paused";

	if(bad == true)
		this.bg = this.republican;
	else
		this.bg = this.democratic;
}

Popup.prototype.setDropdownOption = function(phrase, fullPhrase)
{	
	this.phrase = phrase;
	this.fullPhrase = fullPhrase;
	this.type = "dropdownOption"; //Option to click on enter to view full
	
	this.dropdownTimer = this.dropdownTimeSet + 5;

	this.bg = this.opaqueDemocratic;
}
Popup.prototype.setFullOption = function()
{
	this.phrase = this.fullPhrase;
	this.type = "full"; //Option to click on enter to view full
	this.dropdownTimer = 0;
	game.state = 'paused';
	this.confirmTimer = 1;

	this.bg = this.democratic;
}

Popup.prototype.confirm = function()
{
	if(this.confirmTimer == 0)
	{
		if(input.isDown(input.keys.ENTER))
	    {
	        if(this.type == "full" || this.type == 'fullTwoColumns')
	        	this.type = "";
	    }
	}
}

Popup.prototype.getLines = function(context,phrase,maxPxLength)
{
    var wa 			= phrase.split(" "),
        phraseArray = [],
        lastPhrase 	= wa[0],
        measure 	= 0,
        splitChar 	= " ",
        newLine 	= ";:";

    if (wa.length <= 1)
    {
        return wa;
    }

    //context.font = textStyle;

    for (var i = 1;i < wa.length;i++)
    {
        var w = wa[i];

        measure = context.measureText(lastPhrase + splitChar + w).width;
        
        if(w == newLine)
        {
            phraseArray.push(lastPhrase);
            lastPhrase = "";
        	phraseArray.push(" ");

        }
        else
        {
	        if (measure < maxPxLength)
	        {
	        	if(lastPhrase != "")
	        		lastPhrase += splitChar
	            
	            lastPhrase += w;
	        }
	        else
	        {
	            phraseArray.push(lastPhrase);
	            lastPhrase = w;
	        }

	        if (i === wa.length - 1)
	        {
	            phraseArray.push(lastPhrase);
	            break;
	        }
	    }
    }
    return phraseArray;
}