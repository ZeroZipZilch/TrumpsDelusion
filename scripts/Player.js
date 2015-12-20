function Player()
{
    this.point = {x:100, y:600};
    this.scale = {x:30, y:30};
    this.velocity = {x:0, y:0};

    this.moving = false;
    this.falling = true;

    this.speed = 45;
    this.maxSpeed = 450;

    this.friction = 0.76;

    this.gravity = 26;
    this.maxFallSpeed = 9980;

    this.jumpSpeed = 46;
    this.maxJumpSpeed = -265;

    this.maxSanity = 1000;
    this.sanity = this.maxSanity;

    this.maxCharisma = 160;
    this.charisma = this.maxCharisma;
    this.charismaIncrease = 5;

    this.damage = 50;
    this.strength = 15;

    this.level = 1;
    this.exp = 0;
    this.nextLevel = 700;

    this.abilitiesCD = {platform: 2, argument: 1.5, epicArgument:8, steelPlatform: 9};
    this.abilitiesLevel = {platform: 1, argument: 1, epicArgument:5, steelPlatform: 9};
    this.activeCD = {platform:0, argument: 0, epicArgument:0, steelPlatform: 0};
    this.abilitiesCharismaCost = {platform:5, argument: 1, epicArgument:20, steelPlatform: 50};

    this.color = "#4C98C9";
    this.colorTimer = 0;
    this.colorTimerReset = 0.2;

    this.arguments = [{argument:"Common Sense", damage:0}];
    this.epicArguments = [];
}

Player.prototype.move = function()
{
    this.moving = false;

    if(input.isDown(input.keys.SPACE))
    {
        if(this.falling == false)
        {
            if(this.velocity.y + this.jumpSpeed < this.maxJumpSpeed)
            {
                this.falling = true;
            }
            else
            {
                this.velocity.y -= this.jumpSpeed;
            }
        }
    }
    else
    {
        this.falling = true;
    }

    if(input.isDown(input.keys.LEFT))
    {
        this.velocity.x -= this.speed;
        this.moving = true;
    }

    if(input.isDown(input.keys.RIGHT))
    {
        this.velocity.x += this.speed;
        this.moving = true;
    }

    /*if(input.isDown(input.keys.DOWN))
    {
        this.velocity.y += this.speed;
        this.moving = true;
    }*/

    if(this.velocity.x > this.maxSpeed)
        this.velocity.x = this.maxSpeed;
    if(this.velocity.x < -this.maxSpeed)
        this.velocity.x = -this.maxSpeed;

    if(this.moving == false)
        this.velocity.x *= this.friction;

    if(this.falling == true)
    {
        if(this.velocity.y + this.gravity < this.maxFallSpeed)
            this.velocity.y += this.gravity;
        else
            this.velocity.y = this.maxFallSpeed;
    }
}

Player.prototype.ability = function()
{
    /**
     * Player arguments:
     *
     * Normal argument:
     * "Common Sense" -- Level 1
     * "Logic" -- Level 3
     * "Reason" -- 4
     * 
     * Epic arguments:
     * "The Benefits of:"
     *
     * "Gun Control" -- Level 5
     * "Job Security" -- Level 6
     * "Welfare Funding" -- Level 7
     * "Universal Healthcare" -- Level 9
     * "Luxury Tax" -- Level 12
     * "Liberalism" -- Level 14
     * "Socialism" -- Level 16
     */
    
    if(input.isDown(input.keys.Z) && this.activeCD.platform == 0 && this.level >= this.abilitiesLevel.platform && this.charisma > this.abilitiesCharismaCost.platform)
    {
        if(this.point.y < 50)
            platforms.push(new Platform({x:100,y:15}, {x:this.point.x - 50,y:this.point.y + this.scale.y + 5 + 50}, "stage"));
        else
            platforms.push(new Platform({x:100,y:15}, {x:this.point.x - 50,y:this.point.y + this.scale.y + 5}, "stage"));
        this.activeCD.platform = this.abilitiesCD.platform;
        this.charisma -= this.abilitiesCharismaCost.platform;
    }
    if(input.isDown(input.keys.X) && this.activeCD.argument == 0 && this.level >= this.abilitiesLevel.argument && this.charisma > this.abilitiesCharismaCost.argument)
    {   
        argumentIndex = Math.floor(Math.random() * (this.arguments.length));
        argumentz.push(new Argument
        (
            {x:this.point.x + this.scale.x + 5, y:this.point.y + this.scale.y / 2},
            this.arguments[argumentIndex].argument,
            "E",
            this.strength,
            0,
            this.damage + this.arguments[argumentIndex].damage
        ));

        this.activeCD.argument = this.abilitiesCD.argument;
        this.charisma -= this.abilitiesCharismaCost.argument;
    }
    if(input.isDown(input.keys.C) && this.activeCD.epicArgument == 0 && this.level >= this.abilitiesLevel.epicArgument && this.charisma > this.abilitiesCharismaCost.epicArgument)
    {
        epicArgumentIndex = Math.floor(Math.random() * (this.epicArguments.length));
        argumentz.push(new Argument
        (
            {x:this.point.x + this.scale.x + 5, y:this.point.y + this.scale.y / 2},
            this.epicArguments[epicArgumentIndex].argument,
            "E",
            this.strength + 10,
            0,
            this.damage + this.arguments[argumentIndex].damage
        ));

        this.activeCD.epicArgument = this.abilitiesCD.epicArgument;
        this.charisma -= this.abilitiesCharismaCost.epicArgument;
    }
    if(input.isDown(input.keys.V) && this.activeCD.steelPlatform == 0 && this.level >= this.abilitiesLevel.steelPlatform && this.charisma > this.abilitiesCharismaCost.steelPlatform)
    {
        if(this.point.y < 50)
            platforms.push(new Platform({x:100,y:15}, {x:this.point.x - 50,y:this.point.y + this.scale.y + 5 + 50}, "steel"));
        else
            platforms.push(new Platform({x:100,y:15}, {x:this.point.x - 50,y:this.point.y + this.scale.y + 5}, "steel"));
        this.activeCD.steelPlatform = this.abilitiesCD.steelPlatform;
        this.charisma -= this.abilitiesCharismaCost.steelPlatform;
    }
};

Player.prototype.isColliding = function() 
{
    if(this.point.x < 0)
    {
        this.point.x = 0;
        this.velocity.x = (this.velocity.x * -1) + this.scale.x;
    }
    if(this.point.x + this.scale.x > canvas.width - trump.scale.x - 200)
    {
        this.point.x = canvas.width - trump.scale.x - 200 - player.scale.x;
        this.velocity.x = (this.velocity.x * -1) - this.scale.x;
    }
    if(this.point.y < 0)
    {
        this.point.y = 0;
        this.velocity.y = 0;
        this.falling = true;
    }
        
    for(var i = 0;i < platforms.length;i++)
    {   
        if(this.point.x + this.scale.x > platforms[i].point.x
            && this.point.x < platforms[i].point.x + platforms[i].scale.x)
        {
            if(this.point.y + this.scale.y >= platforms[i].point.y
                && this.point.y <= platforms[i].point.y + platforms[i].scale.y)
            {
                this.falling = false;
                
                if(this.point.y < platforms[i].point.y + platforms[i].scale.y
                    && this.point.y + this.scale.y > platforms[i].point.y + platforms[i].scale.y)
                    this.velocity.y = -12;
                else if(this.point.y + this.scale.y > platforms[i].point.y)
                {
                    this.point.y = platforms[i].point.y - this.scale.y;
                    this.velocity.y = -3;
                }
            }
        }
    }
};

Player.prototype.update = function(dt)
{
    if(isNaN(dt))
        dt = 0;

    if(this.activeCD.epicArgument > 0)
        this.activeCD.epicArgument -= dt;
    if(this.activeCD.argument > 0)
        this.activeCD.argument -= dt;
    if(this.activeCD.platform > 0)
        this.activeCD.platform -= dt;
    if(this.activeCD.steelPlatform > 0)
        this.activeCD.steelPlatform -= dt;

    if(this.activeCD.epicArgument < 0)
        this.activeCD.epicArgument = 0;
    if(this.activeCD.argument < 0)
        this.activeCD.argument = 0;
    if(this.activeCD.platform < 0)
        this.activeCD.platform = 0;
    if(this.activeCD.steelPlatform < 0)
        this.activeCD.steelPlatform = 0;

    if(this.colorTimer > 0)
        this.colorTimer -= dt;

    if(this.colorTimer < 0)
        this.colorTimer = 0;

    if(this.exp >= this.nextLevel)
    {
        this.onLevelUp();
    }
    if(this.sanity <= 0)
    {
        this.sanity = this.maxSanity;
        trump.delusion += 5000;
        argumentz = [];
        platforms = [];
        game.makeBase();

        popup.set("Woah, you've gone insane.. Or have you? ;: [Press Enter to continue playing]", "full", true);
    }

    if(this.charisma < this.maxCharisma)
        this.charisma += this.charismaIncrease * dt;
    if(this.charisma > this.maxCharisma)
        this.charisma = this.maxCharisma;
    if(this.charisma < 0)
        this.charisma = 0;

    this.point.x += this.velocity.x * dt;
    this.point.y += this.velocity.y * dt;

    this.move();
    this.ability();
    this.isColliding();
}

Player.prototype.draw = function()
{
    context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.point.x, this.point.y, this.scale.x, this.scale.y);
    context.closePath();
}

Player.prototype.onLevelUp = function()
{
    eagle.makeEagle();
    this.level++;
    this.nextLevel += 100;
    this.exp = 0;
    this.damage += 8;
    this.maxSanity += 20;
    this.sanity += 20;
    this.maxCharisma += 10;
    this.charisma = this.maxCharisma;

    this.abilitiesCD.platform -= 0.1;
    if(this.abilitiesCD.platform < 0)
        this.abilitiesCD.platform = 0;

    this.abilitiesCD.argument -= 0.05;
    if(this.abilitiesCD.argument < 0)
        this.abilitiesCD.argument = 0;

    if(this.level > this.abilitiesLevel.epicArgument)
        this.abilitiesCD.epicArgument -= 0.1;
    if(this.abilitiesCD.epicArgument < 0)
        this.abilitiesCD.epicArgument = 0;

    if(this.level > this.abilitiesLevel.steelPlatform)
        this.abilitiesCD.steelPlatform -= 0.1;
    if(this.abilitiesCD.steelPlatform < 0)
        this.abilitiesCD.steelPlatform = 0;

    ///////////////////////////////////////////////////

    switch(this.level)
    {
        case 2:
            popup.set("You have leveled up. Ability cooldowns will be decreased each level. Argument damage, charisma and sanity will be increased.", "dropdown", false);
        break;
        case 3:
            this.arguments.push({argument:"Logic", damage:5});
            popup.set("You have leveled up! ;: You have learned to argument with logic.", "dropdown", false);
        break;
        case 4:
            this.arguments.push({argument:"Reason", damage:13});
            popup.set("You have leveled up! ;: Your arguments now have the chance to be enhanced with reason.", "dropdown", false);
        break;
        case 5:
            this.epicArguments.push({argument:"Gun Control", damage:0});
            popup.setDropdownOption("You have leveled up. You have learned to use Epic arguments. Your first topic is Gun Control. ;: [Press Enter to read more about Gun Control]", "Gun Control: ;: If the U.S. got rid of guns, 12,000 deaths, and 84,300 injuries would be avoided every year. Donald Trump however, is strongly opposed to gun control. ;: [Press Enter to return to the game]");
        break;
        case 6:
            this.arguments.push({argument:"Feeling", damage:13});
            popup.set("You have leveled up! ;: You have learned to make arguments that are not only logical or reasonable, but also enthusiastic.", "dropdown", false);
        break;
        case 7:
            this.epicArguments.push({argument:"Welfare Funding", damage:5});
            popup.setDropdownOption("You have leveled up. ;: Welfare Funding has been added to your Epic Arguments. ;: [Press Enter to read more about Welfare Funding]", "Welfare Funding: ;: Allowing people the means to get out of poverty will help them, and help the economy prosper. Donald trump doesn’t want to cut welfare directly, but he wants to limit funding to some very important programs. ;: [Press Enter to return to the game]");
        break;
        case 9:
            this.epicArguments.push({argument:"Universal Healthcare", damage:10});
            popup.setDropdownOption("You have leveled up. ;: You can now create longer lasting stages made out of steel. Universal Healthcare has also been added to your Epic Arguments. ;: [Press Enter to read more about Universal Healthcare]", "Universal Healthcare: ;: Being able to see a doctor and get the healthcare that you need shouldn’t be a luxury, it should be a basic human right. Donald Trump wants to replace Obamacare with health care savings plans. While neither provide universal healthcare, our current system is a step in the right direction, while trumps system would keep us stagnant. ;: [Press Enter to return to the game]");
        break;
        case 12:
            this.epicArguments.push({argument:"Luxury Tax", damage:15});
            popup.setDropdownOption("You have leveled up. ;: Luxury Tax has been added to your Epic Arguments. ;: [Press Enter to read more about Luxury Tax]", "Luxury Tax: ;: A luxury tax was a tax imposed on high end luxury items owned by the richest members of society. (Vacation homes, yachts, etc.). This tax was done away with in the 1980’s by Ronald Reagan, in the whirlwind that was “Regeanomics”. Reinstating a luxury tax would help our economy to prosper. ;: [Press Enter to return to the game]");
        break;
        case 14:
            this.epicArguments.push({argument:"Liberalism", damage:20});
            popup.setDropdownOption("You have leveled up. ;: Liberalism has been added to your Epic Arguments. ;: [Press Enter to read more about Liberalism]", "Liberalism: ;: A 2015 buzz word that most people associate with dirty tree hugging hippies. Sure, maybe some tree huggers are liberals. However, liberalism encompasses the notion that society should be progressive, and prosperous. Opportunities should be provided to everyone, not just a privileged few. ;: [Press Enter to return to the game]");
        break;
        case 16:
            this.epicArguments.push({argument:"Socialism", damage:25});
            popup.setDropdownOption("You have leveled up. ;: Socialism has been added to your Epic Arguments. ;: [Press Enter to read more about Socialism]", "Socialism: ;: Another 2015 buzz word that, more often than not, gets associated with Communism. The panic around the word Socialism is reminiscent of The Red Scare and the McCarthy era. Socialism however, is the radical idea that people should be provided with the basics in order to afford to live a happy and healthy life style, and that not every aspect of life is a competition amongst people. ;: [Press Enter to return to the game]");
        break;
        default:
        break;
    }
}