    /*


            *   DONE

                *   perform other checks on mouse events, so the video. doesn't "accedentally" get played
                *   make the progress on the video. "smoother" ( IMPORTANT )
                *   need an updateProgress function, which tracks the progress if the video is playing
                *   set bounds on the elements.scrubberShadow 

            *   TO DO

                *   Make sure the video doesn't replay when the scrubber bound is dragged farther than its upperbound
                *   Show Buffer

        */
    var scrubber = function(s) {


        'use strict';

        var elements = {

                video: document.querySelector('.video'),
                scrubber: document.querySelector('.scrubber-seek'),
                scrubberWrapper: document.querySelector('.scrubber-wrapper'),
                scrubberProgress: document.querySelector('.scrubber-progress'),
                scrubberShadow: document.querySelector('.scrubber-seek-shadow'),
                hoverTime: document.querySelector('.scrubber-time')

            },
            settings = {

                duration: '',
                _mouseDown: false,

                video: {

                    height: 320,
                    width: 640,
                    loop: false,
                    autoplay: false,
                    controls: false,
                    preload: 'metadata',
                    type: 'video/mp4'

                },

                scrubber: {

                    showTime: true
                }
            },



            extend = function(target, source) {

                for (var key in source) {

                    if (source.hasOwnProperty(key)) {

                        target[key] = source[key];

                    }

                }

                return target;

            },

            //  given the position => (number), and the proper bounds,
            //  checks if the position is within the min and maxValue
            //  returns true if it is, false if it isn't

            setBounds = function(number, minValue, maxValue) {

                /*var lowerBound = ( Math.min( number, minValue ) >= minValue ),
                    upperBound = ( Math.max( number, maxValue ) <= maxValue );


                    if( lowerBound && upperBound ){



                        return true;

                    }else{

                        return false;
                    }*/


                //  clamps the number


                return Math.min(Math.max(number, minValue), maxValue);

            },

            //  given seconds, returns the time in the format
            //  hh:mm:ss
            convertTime = function(cSeconds) {

                //  http://stackoverflow.com/a/1322830

                var totalSeconds = Math.trunc(cSeconds),
                    hours = parseInt(totalSeconds / 3600) % 24,
                    minutes = parseInt(totalSeconds / 60) % 60,
                    seconds = totalSeconds % 60;

                return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);


            },

            findTime = function(mPos) {

                //  given mouse position (mPos) => event.x
                //  duration of the video and the width of the video bar,
                //  it returns what the time of the video would be at that point


                //  get relative time according to the position of mouse
                var posToTime = ((mPos - elements.scrubberWrapper.offsetLeft) / elements.scrubberWrapper.offsetWidth) * settings.duration

                return convertTime(posToTime);


            },

            hoverTime = function(mousePos, hoverPos) {


                //  Shows the time above the progress bar

                //  if true, shows time, else doesn't show

                elements.hoverTime.innerHTML = findTime(mousePos);
                elements.hoverTime.classList.remove('hide');
                elements.hoverTime.setAttribute(

                    'style',
                    'left: ' + hoverPos + 'px'

                );
            },

            bind = function() {


                //  video. events

                elements.video.addEventListener('loadedmetadata', function() {

                    settings.duration = event.target.duration.toFixed(3);

                }, false);

                elements.video.addEventListener('click', function() {

                    switch (this.getAttribute('data-state')) {


                        case 'play':


                            this.play();

                            this.setAttribute('data-state', 'pause');

                            break;



                        case 'rewind':

                            this.play(0);

                            this.setAttribute('data-state', 'pause');

                            break;


                        case 'pause':

                            this.pause();

                            this.setAttribute('data-state', 'play');

                            break;

                    }


                }, false);


                elements.video.addEventListener('timeupdate', function() {
                    updateProgress();
                }, false);

                elements.video.addEventListener('ended', function() {
                    this.setAttribute('data-state', 'rewind');

                }, false);


                elements.scrubberWrapper.addEventListener('mousedown', mouseDown, false);

                elements.scrubberWrapper.addEventListener('mousemove', mouseMove, false);

                elements.scrubberWrapper.addEventListener('mouseup', mouseUp, false);

                elements.scrubberWrapper.addEventListener('mouseout', mouseOut, false);

                window.addEventListener('mousemove', function() {

                    if (settings._mouseDown) {



                        elements.video.currentTime = ((event.x - elements.scrubberWrapper.offsetLeft) / elements.scrubberWrapper.offsetWidth) * settings.duration;


                    }

                }, false);


                window.addEventListener('mouseup', function() {


                    if (settings._mouseDown) {


                        settings._mouseDown = false;

                        elements.video.setAttribute('data-scrub', 'off');


                        if (elements.video.getAttribute('data-state') !== "rewind") {

                            elements.video.play();
                        }


                    }


                }, false);

            },


            updateProgress = function() {


                //update the progress bar

                elements.scrubberProgress.setAttribute(

                    'style',

                    'width: ' + ((100 / settings.duration) * elements.video.currentTime) + '%'

                );

                //  spits out infinity at random run times


                console.log(((100 / settings.duration) * elements.video.currentTime));
            },

            //events
            mouseDown = function() {
                settings._mouseDown = true;
                elements.scrubber.classList.add('scrubber-seek-clicked');
                elements.video.pause();
                elements.video.setAttribute('data-state', 'play');
                elements.video.setAttribute('data-scrub', 'on');

                elements.video.currentTime = ((event.x - this.offsetLeft) / this.offsetWidth) * settings.duration;

            },
            mouseOut = function() {
                //settings._mouseDown = false;


                if (settings.scrubber.showTime) {

                    elements.hoverTime.classList.add('hide');

                }

                /*if (elements.video.getAttribute('data-scrub') == "on") {

                    elements.video.play();

                }*/
                //elements.video.setAttribute('data-scrub', 'off');
                elements.scrubberShadow.classList.add('hide');

            },
            mouseMove = function() {
                //  set the scrubber equal to the mouse position

                //  check if the mousedown variable is true



                var boundedPosition = setBounds(

                    ((event.x - this.offsetLeft) - elements.scrubber.offsetWidth / 2),

                    0,

                    this.offsetWidth

                );

                //var scrubberPos = ((event.x - this.offsetLeft) - elements.scrubber.offsetWidth / 2);

                elements.scrubberShadow.classList.remove('hide');


                //console.log( "IN BOUND: " + setBounds( (event.x - this.offsetLeft) , 0, this.offsetWidth ) );



                elements.scrubberShadow.setAttribute(

                    'style',
                    'left: ' + boundedPosition + 'px'

                );

                hoverTime(

                    event.x,
                    boundedPosition

                );




                if (settings._mouseDown) {

                    elements.video.currentTime = ((event.x - this.offsetLeft) / this.offsetWidth) * settings.duration;


                }




            },
            mouseUp = function() {
                settings._mouseDown = false;
                elements.scrubber.classList.remove('scrubber-seek-clicked');
                if (settings.scrubber.showTime) {

                    elements.hoverTime.classList.add('hide');

                }

                elements.video.play();
                elements.video.setAttribute('data-state', 'pause');
                elements.video.setAttribute('data-scrub', 'off');

                elements.video.currentTime = ((event.x - this.offsetLeft) / this.offsetWidth) * settings.duration;




            };


        s = {


            build: '1.0.0',

            initialize: function(videoOptions, scrubberOptions) {

                extend(settings.video, videoOptions);

                extend(settings.scrubber, scrubberOptions);

                for (var key in settings.video) {


                    elements.video[key] = settings.video[key];

                }

                bind();

            },

            getDuration: function() {

                return settings.duration;

            }


        };



        return s;
    }(scrubber);