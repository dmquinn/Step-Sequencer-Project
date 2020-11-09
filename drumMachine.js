var audio = new AudioContext();
var data = {
  step: 0,
 
  tracks: [createTrack("#cfc565", note(audio, 880)),
           createTrack("#cfc565", note(audio, 659)),
           createTrack("#cfc565", note(audio, 587)),
           createTrack("#cfc565", note(audio, 987)),
           createTrack("#cfc565", note(audio, 659)),
           createTrack("#cfc565", pad(audio, 240)),
           createTrack("#6a93b9", snare(audio)),
           createTrack("#d15e7b", hat(audio)),
           createTrack("#e75a19", kick(audio))]
};
//  const x = tracks.classlist.add("tracks");   
// Update
// ------

setInterval(function() {
  data.step = (data.step + 1) % data.tracks[0].steps.length;
  data.tracks
    .filter(function(track) { return track.steps[data.step]; })
    .forEach(function(track) { track.playSound(); });
}, 120);

// Draw
// ----

var screen = document.getElementById("screen").getContext("2d");
(function draw() {
  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
  drawTracks(screen, data);
  drawButton(screen, data.step, data.tracks.length, "grey");
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

function note(audio, frequency) {
  return function() {
    var duration = 0.1;    
    var squareWave = createsquareWave(audio, duration);
    squareWave.frequency.value = frequency;

    chain([
      squareWave, 
      createAmplifier(audio, 22, duration),     
      audio.destination]);
  };
};

function kick(audio) {
  return function() {
    var duration = 0.5;  
    var squareWave = createsquareWave(audio, duration);
    rampDown(audio, squareWave.frequency, 260, duration);

    chain([
      squareWave,    
      createAmplifier(audio, 26, duration),
      audio.destination]);
  };
};

function pad(audio) {
    return function() {
      var duration = 5;   
      var squareWave = createsquareWave(audio, duration);
      rampDown(audio, squareWave.frequency, 120, 130, duration);
   
      chain([
        squareWave,
        createAmplifier(audio, 2, duration),
        audio.destination]);
    };
  };
function snare(audio) {
    return function() {
      var duration = 0.1;
      var squareWave = createsquareWave(audio, duration);
      rampDown(audio, squareWave.frequency, 500, 2, duration);
  
      chain([
  
      
        squareWave,
  
        
        createAmplifier(audio, 20, duration),
  
      
        audio.destination]);
    };
  };

  function hat(audio) {
    return function() {
      var duration = 0.005;
        var squareWave = createsquareWave(audio, duration);
      rampDown(audio, squareWave.frequency, 560, 450, duration);


      chain([
          squareWave,      
        createAmplifier(audio, 500, duration),
        audio.destination]);
    };
  };


function createsquareWave(audio, duration) {
  var oscillator = audio.createOscillator();
  oscillator.type = "triangle";
  oscillator.start(audio.currentTime);
  oscillator.stop(audio.currentTime + duration);

  return oscillator;
};



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

  return { steps: steps, color: color, playSound: playSound };
};

var BUTTON_SIZE = 46;
BUTTON_SIZE.className += " button";


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

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        let data= {};
    }
}