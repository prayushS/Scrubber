<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> scrubber </title>
	<link rel = "stylesheet" type = "text/css" href = "demo.css"/>
	<link rel = "stylesheet" type = "text/css" href = "scrubber.css"/>
</head>
<body>
	<a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
	
	<h1>Scrubber.js</h1>
	<video class = "video" data-state="play" data-scrub = "off">
		

		<source src = "http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm" type = "audio/mp3">

	</video>
	<!-- 
			http://localhost:8888/videoPlayer/cane.mp4
			http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm
			http://i.imgur.com/zvATqgs.mp4



			*	File Types

				*	mp3/mp4
				*	webm
				*	gif
				*	gifv
				

	-->
	<div class="scrubber-wrapper">


  		<div class="scrubber-progress">

			<span class = "scrubber-time hide"></span>

    		<div class="scrubber-seek"></div>

    		<div class="scrubber-seek-shadow hide"></div>

  		</div>
</div>


<div id = "project-description">

	<span id = "note"> <b> ( click the video to play/pause ) </b> </span>


	<span class = "log" id = "duration">Duration: </span>
	<span class = "log" id = "currTime">Current Time: </span>
	<span class = "log" id = "percentage">Percentage: </span>

	

</div>
<script src = "scrubber.js"></script>

<script>
	
	scrubber.initialize();
</script>

</body>
</html>