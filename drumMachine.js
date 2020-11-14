

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();


// var oscillator2 = audioCtx.createOscillator();

// oscillator2.type = 'sine';
// oscillator2.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
// oscillator2.connect(audioCtx.destination);
// oscillator2.start();

var audio = new AudioContext || webkitAudioContext();
var data = {
  step: 0,
 
  tracks: [createTrack("#cfc565", note(audio, 932)),
           createTrack("#cfc565", note(audio, 880.00)),
           createTrack("#cfc565", note(audio, 932.33)),
           createTrack("#cfc565", note(audio, 1046.50)),
           createTrack("#cfc565", note(audio, 1174.66)),
           createTrack("#cfc565", pad(audio, 932)),
           createTrack("#6a93b9", snare(audio)),
           createTrack("#d15e7b", hat(audio)),
           createTrack("#e75a19", kick(audio))]
};


//  const x = tracks.classlist.add("tracks");   
// Update
// ------

const playButton = document.querySelector("#play-button");
playButton.addEventListener("click", function(){
  go();
})

function go(){
 
   setInterval(function() {

      function createTrack(color, playSound) {
        var steps = [];
        for (var i = 0; i < 120; i++) {
          steps.push(false);
          
        }
      console.log('steps: ', steps)
      console.log('function createTrack on line 56')
       
      return { steps: steps, color: color, playSound: playSound };
     
     
      };

    data.step = (data.step + 1) % data.tracks[0].steps.length;
    data.tracks
      .filter(function(track) { return track.steps[data.step]; })
      .forEach(function(track) { track.playSound(); });
  }, 120);
  console.log('data.tracks: ', data.tracks)
  console.log('tracks: ', tracks)
  console.log('1 data.track: ', data.track)
  console.log('track: ', track)
  

  
  // return createTrack;
  
  
}

const stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click", function(){
  stop()
  //console.log("yes");
  
  function stop(){

console.log('stop')


data.step = 0[0];

// draw;
  
  }
})


// Draw
// ----

var screen = document.getElementById("screen").getContext("2d");
(function draw() {
  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
  drawTracks(screen, data);
  drawButton(screen, data.step, data.tracks.length, "lightgrey");
    requestAnimationFrame(draw);
})();

// Handle events
// -------------


(function setupButtonClicking() {
  document.getElementById("screen").addEventListener("click", function(e) { 
    var p = { x: e.offsetX, y: e.offsetY };
    data.tracks.forEach(function(track, row) {
      track.steps.forEach(function(on, column) {
        if (isPointInButton(p, column, row)) {
          track.steps[column] = !on;
        }
      });
    });
  });
})();



function goGlobal() {
  go();
}

function note(audio, frequency) {
  return function() {
    var duration = 1;    
    var sineWave = createsineWave (audio, duration);
    sineWave.frequency.value = frequency;

    chain([
      sineWave, 
      createAmplifier(audio, 1, duration),     
      audio.destination]);

      var sineWave2 = createsineWave2 (audio, duration);
    sineWave2.frequency.value = frequency;

    chain([
      sineWave2, 
      createAmplifier(audio, 2, duration),     
      audio.destination]);
  };
};

function kick(audio) {
  return function() {
    var duration = 0.5;  
    var sineWave = createsineWave(audio, duration);
    rampDown(audio, sineWave.frequency, 260, duration);

    chain([
      sineWave,    
      createAmplifier(audio, 26, duration),
      audio.destination]);
  };
};

function pad(audio) {
    return function() {
      var duration = 1;   
      var sineWave = createsineWave(audio, duration);
      rampDown(audio, sineWave.frequency, 1125, 125, duration);
   
      chain([
        sineWave,
        createAmplifier(audio, 1, duration),
        audio.destination]);
    };
  };
function snare(audio) {
    return function() {
      var duration = 0.1;
      var sineWave = createsineWave(audio, duration);
      rampDown(audio, sineWave.frequency, 500, 2, duration);
  
      chain([
  
      
        sineWave,
  
        
        createAmplifier(audio, 20, duration),
  
      
        audio.destination]);
    };
  };

  function hat(audio) {
    return function() {
      var duration = 0.005;
        var sineWave = createsineWave(audio, duration);
      rampDown(audio, sineWave.frequency, 560, 500, duration);


      chain([
          sineWave,      
        createAmplifier(audio, 500, duration),
        audio.destination]);
    };
  };


function createsineWave(audio, duration) {
  var oscillator = audio.createOscillator();
  oscillator.type = "sine";
  oscillator.start(audio.currentTime);
  oscillator.stop(audio.currentTime + duration);

  return oscillator;
};
// function createsineWave2(audio, duration) {
//   var oscillator2 = audio.createOscillator();
//   oscillator2.type = "sine";
//   oscillator2.start(audio.currentTime);
//   oscillator2.stop(audio.currentTime + duration);

//   return oscillator2;
// };


function rampDown(audio, value, startValue, duration) {
  value.setValueAtTime(startValue, audio.currentTime);
  value.exponentialRampToValueAtTime(0.01, audio.currentTime + duration);
};


function createAmplifier(audio, startValue, duration) {
  var amplifier = audio.createGain();
  rampDown(audio, amplifier.gain, startValue, duration);
  return amplifier;
};


function chain(soundNodes) {
  for (var i = 0; i < soundNodes.length - 1; i++) {
    soundNodes[i].connect(soundNodes[i + 1]);
  }
};


function createTrack(color, playSound) {
  var steps = [];
  for (var i = 0; i < 16; i++) {
    steps.push(false);
  }
  console.log('steps: ', steps)
console.log('function createTrack on line 245')

  return { steps: steps, color: color, playSound: playSound };
};

var BUTTON_SIZE = 46;
BUTTON_SIZE.className +="button";


function buttonPosition(column, row) {
  return {
    x: BUTTON_SIZE / 2 + column * BUTTON_SIZE * 1.1,
    y: BUTTON_SIZE / 2 + row * BUTTON_SIZE * 1.1
  };
};

function drawButton(screen, column, row, color) {
  var position = buttonPosition(column, row);
  screen.fillStyle = color;
  screen.fillRect(position.x, position.y, BUTTON_SIZE, BUTTON_SIZE);
};

function drawTracks(screen, data) {
  data.tracks.forEach(function(track, row) {
    track.steps.forEach(function(on, column) {
      drawButton(screen,
                 column,
                 row,
                 on ? track.color : "#929292");
    });
  });
};


function isPointInButton(p, column, row) {
  var b = buttonPosition(column, row);
  return !(p.x < b.x ||
           p.y < b.y ||
           p.x > b.x + BUTTON_SIZE ||
           p.y > b.y + BUTTON_SIZE);
};


