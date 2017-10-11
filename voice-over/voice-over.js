/**
 * voice-over.js
 *
 *
 * @license  the MIT license
 * @version 1.0.0
 * @author  G Naga Subrahmanyam, https://github.com/GNSubrahmanyam
 * @created 11-Oct-2017
 * @link https://github.com/GNSubrahmanyam/voice-over
 *
 *
 **/

/**
 * Usage:
 * <div class="voice-over" data-voice-over="Some Text">Some Text</div>
 *
 **/


 //  Check for browser support
 if ('speechSynthesis' in window) {
   console.log('Your browser supports speech synthesis.');
 } else {
   console.log('Sorry your browser does not support speech synthesis.');
 }

 // getting getElementsByClassName voice-over
 var voiceOver = document.getElementsByClassName('voice-over');


 // voices select menu
 var voiceSelect = document.getElementById('voices');


 // Fetch the list of voices and populate the voice options.
 function loadVoices() {
   // Fetch the available voices.
   var voices = speechSynthesis.getVoices();

   // Loop through each of the voices.
   voices.forEach(function(voice, i) {
     // Create a new option element.
     var option = document.createElement('option');

     // Set the options value and text.
     option.value = voice.name;
     option.innerHTML = voice.name;

     // Add the option to the voice selector.
     voiceSelect.appendChild(option);
   });
 }

 // Execute loadVoices.
 loadVoices();

 // Chrome loads voices asynchronously.
 window.speechSynthesis.onvoiceschanged = function(e) {
   loadVoices();
 };


 // Create a new utterance for the specified text and add it to
 // the queue.
 function speak(text) {
   // Create a new instance of SpeechSynthesisUtterance.
   var msg = new SpeechSynthesisUtterance();

   // Set the text.
   msg.text = text;

   // Set the attributes.
   msg.volume = 1; // 0 to 1
   msg.rate = 0.8; // 0.1 to 10
   msg.pitch = 1.2; //0 to 2

   // If a voice has been selected, find the voice and set the
   // utterance instance's voice attribute.
   if (voiceSelect.value) {
     msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
   }

   // Queue this utterance.
   window.speechSynthesis.speak(msg);
 }

 for (var i = 0; i < voiceOver.length; i++) {
 voiceOver[i].addEventListener('click',function(){
   var speechMsgInput = this.getAttribute("data-voice-over");
       speak(speechMsgInput);
     });
 }
