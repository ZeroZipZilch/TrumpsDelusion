<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

   	<title>Apocalypse</title>

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

    <!-- jQuery first, then Bootstrap JS. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    
    <script src="/scripts/variables.js"></script>

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
        game.preLoadImages();
      });
    </script>
  </body>
</html>