<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="Defeat Trumps delusion in this lively HTML5 game."> 
    <meta name="verifyownership" content="f074b2a0c84349f608e3513c5982b600" />

   	<title>Trumps Delusion</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    <link rel="stylesheet" href="/styles/allODemStyles.css">
  </head>
  <body>
    <div id="noSupport">
      Sorry... Due to Google Chrome being the only cool browser that handles<br />
      HTML 5 canvas relatively well, we decided to drop support for all other browsers.
    </div>
    <div id="confFlag"></div>
    <div id="mericanFlag"></div>
    <canvas id="daCanvas"></canvas>
    <a href="http://valiant.ninja/#donate" style="display:none;" class="donate" target="_blank"></a>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-69820305-7', 'auto');
      ga('send', 'pageview');

    </script>

    <!-- jQuery first, then Bootstrap JS. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    
    <script src="/scripts/variables.js"></script>

    <script>
      $(function()
      {  

        isCanvasSupported = function()
        {
          return !!(canvas.getContext && canvas.getContext('2d'));
        }
  
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera && !isSafari;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
        var isChrome = !!(window.chrome && chrome.webstore);

        canvas.width = $(document).width();
        canvas.height = $(document).height();

        if(isChrome)
        {
        }
        else if(!isSafari)
        { 
            context.fillStyle = "#fafafa";
          context.fillRect(0,0,canvas.width,canvas.height);

          context.font = "15pt Arial";
          context.fillStyle = "#343434";
          context.textAlign = 'center';
          context.textBaseLine = 'middle';
          context.fillText("Sorry... Due to Google Chrome being the only cool browser that handles", canvas.width/2, canvas.height/2);
          context.fillText("HTML 5 canvas relatively well, we decided to drop support for all other browsers.", canvas.width/2, canvas.height/2 + 20);

        }
        else
        {
          $("#noSupport").show();
        }

        if(!isCanvasSupported())
        {
          $("#noSupport").show();
        }
    });
    </script>

    <script src="/scripts/Input.js"></script>  
    <script src="/scripts/Player.js"></script>
    <script src="/scripts/Platform.js"></script>
    <script src="/scripts/Game.js"></script> 
    <script src="/scripts/Trump.js"></script> 
    <script src="/scripts/Argument.js"></script> 
    <script src="/scripts/UI.js"></script> 
    <script src="/scripts/Popup.js"></script> 
    <script src="/scripts/Eagle.js"></script> 

    <script src="/scripts/classes.js"></script>

    <script> 
      $(function()
      {    
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera && !isSafari;              // Chrome 1+
       
        //var isChrome = !!(window.chrome && chrome.webstore);

        if(isChrome)
        {
          game.preLoadImages();
        }
    });
    </script>
  </body>
</html>