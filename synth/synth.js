// $(function(){
//   $(".dial").knob({
//       'change' : function (v) {
//           gain(v/100);
//
//        }
//   });
//
//   var keyboard = new QwertyHancock({
//        id: 'keyboard',
//        width: 600,
//        height: 150,
//        octaves: 2
//   });
//   var synth = new Tone.Synth();
//   var vol = new Tone.Volume(-12);
//   synth.chain(vol, Tone.Master);
//
//   var oscillators = {};
//   var context = new AudioContext(),
//       masterVolume = context.createGain();
//
//   masterVolume.gain.value = 0.3;
//   masterVolume.connect(context.destination);
//
//   function gain(value){
//     masterVolume.gain.value = value;
//   }
// vol.volume = 10;
// console.log(vol.volume = 10);
//
//   keyboard.keyDown = function (note, frequency) {
//       var osc = context.createOscillator(),
//           osc2 = context.createOscillator();
//         synth.triggerAttackRelease(note);
//       osc.frequency.value = frequency;
//       osc.type = 'sawtooth';
//
//       osc2.frequency.value = frequency;
//       osc2.type = 'triangle';
//
//       osc.connect(masterVolume);
//       osc2.connect(masterVolume);
//
//       masterVolume.connect(context.destination);
//
//       oscillators[frequency] = [osc, osc2];
//
//       osc.start(context.currentTime);
//       osc2.start(context.currentTime);
//   };
//
//   keyboard.keyUp = function (note, frequency) {
//       oscillators[frequency].forEach(function (oscillator) {
//           oscillator.stop(context.currentTime);
//       });
//   };
//
//
// });



$(function(){

  var a = new Interface.Panel({
  container:document.querySelector("#sliderPanel")
  });
  var b = new Interface.Slider({
    label: 'vertical slider',
    bounds:[.05,.05,.3,.9],
    onvaluechange : function() {

      var v = convertRange(this.value, [0,1],[-48,1]);
      vol.set('volume', v);
    }
  });

  a.add(b);

  function convertRange( value, r1, r2 ) {
      return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
  }






  $(".dial").knob({
      'change' : function (v) {
        vol.set('volume', v);
       }
  });

  var keyboard = new QwertyHancock({
       id: 'keyboard',
       width: 600,
       height: 150,
       octaves: 2
  });


  var synth = new Tone.Synth();
  var vol = new Tone.Volume(-12);

  synth.chain(vol, Tone.Master);


  var context = new AudioContext();

  function gain(vaule){
    vol.set('volume', vaule);
  }


console.log(vol.volume = 10);

  keyboard.keyDown = function (note, frequency) {
        synth.triggerAttackRelease(note);
  };

  keyboard.keyUp = function (note, frequency) {
    synth.triggerRelease();
  };


});
