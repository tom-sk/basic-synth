var keyboard = new QwertyHancock({
                 id: 'keyboard',
                 width: 600,
                 height: 150,
                 octaves: 2,
                 startNote: 'A3',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#f3e939'
            });

keyboard.keyDown = function (note, frequency) {
    console.log('Note', note, 'has been pressed');
    console.log('Its frequency is', frequency);
};
 
keyboard.keyUp = function (note, frequency) {
    console.log('Note', note, 'has been released');
    console.log('Its frequency was', frequency);
};

var context = new AudioContext(),
    masterVolume = context.createGain();
 
masterVolume.gain.value = 0.3;
masterVolume.connect(context.destination);
 
 var oscillators = {};

keyboard.keyDown = function (note, frequency) {

    
var osc = context.createOscillator(),
    osc2 = context.createOscillator();
 
    osc.frequency.value = frequency;
    osc.type = 'sawtooth';
 
    osc2.frequency.value = frequency;
    osc2.type = 'triangle';
 
    osc.connect(masterVolume);
    osc2.connect(masterVolume);
 
    masterVolume.connect(context.destination);
 
    oscillators[frequency] = [osc, osc2];
 
    osc.start(context.currentTime);
    osc2.start(context.currentTime);
};

keyboard.keyUp = function (note, frequency) {
    oscillators[frequency].forEach(function (oscillator) {
        oscillator.stop(context.currentTime);
    });
};