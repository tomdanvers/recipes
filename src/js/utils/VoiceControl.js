module.exports = function() {
	var api = {
		start: start,
		stop: stop,
		destroy: destroy
	};

	var recognition = null;

	function init() {

		if ('webkitSpeechRecognition' in window) {

			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = false;
			recognition.lang = 'en-US';

			recognition.onstart = function() {
				recognizing = true;
			};

			recognition.onerror = function(event) {
				console.log(event.error);
			};

			recognition.onend = function() {
				recognizing = false;
			};

			recognition.onresult = function(event) {
				// var interim_transcript = '';
				// for (var i = event.resultIndex; i < event.results.length; ++i) {
				// 	if (event.results[i].isFinal) {
				// 		final_transcript += event.results[i][0].transcript;
				// 	} else {
				// 		interim_transcript += event.results[i][0].transcript;
				// 	}
				// }
				// final_transcript = capitalize(final_transcript);
				// final_span.innerHTML = linebreak(final_transcript);
				// interim_span.innerHTML = linebreak(interim_transcript);

				// };
				console.log(event);
			};

		}

	}

	function start() {

		if (!recognition) {
			init();
		}

		recognition.start();
		
	}

	function stop() {

		if (recognition) {
			recognition.stop();
		}

	}

	function destroy() {
	
		stop();
		
	}

	return api;
}