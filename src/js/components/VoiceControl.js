var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Checkbox = require('./Checkbox');

module.exports = React.createClass({
	recognition: null,
	getInitialState: function() {
		return {
			isAvailable: false,
			isChecked: false,
			isEnabled: false,
			isError: false,
			result: 'Say something...'
		};
	},
	componentWillMount: function() {
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
		
		var isAvailable = window.SpeechRecognition !== null;
		this.setState({
			isAvailable: isAvailable
		});

		if (isAvailable) {
			this.recognition = new window.SpeechRecognition();
			this.recognition.continuous = true;
			this.recognition.interimResults = false;
			this.recognition.lang = 'en-US';

			this.recognition.onstart = function() {
				this.setState({
					isEnabled: true,
					isError: false
				});
			}.bind(this);

			this.recognition.onerror = function(event) {
				console.warn('VoiceControl.error(',event.error,')');
				if (event.error === 'not-allowed') {
					this.setState({
						isAvailable: false,
						isChecked: false
					});
				} else {	
					this.setState({
						isEnabled: false,
						isChecked: false,
						isError: event.error
					});
				}
			}.bind(this);

			this.recognition.onend = function() {
				this.setState({
					isChecked: false,
					isEnabled: false
				});
			}.bind(this);

			this.recognition.onresult = function(event) {
				var results = event.results;
				var result = results[results.length - 1]

				var transcript = result[0].transcript.trim();
				var confidence = result[0].confidence;

				if (confidence > .75) {
					this.setState({
						result: '"'+transcript+'"'
					});

					var match = this.checkResult(transcript);
					if (match) {
						this.props.onMatch(match);
					}
				}

			}.bind(this);
		}
	},
	checkResult: function(result) {

		var phrase;
		
		console.log('VoiceControl.checkResult(', result, ')');
		
		for (var i = 0; i < this.props.phrases.length; i++) {
			phrase = this.props.phrases[i];
			
			// Check exact match
			if (phrase === result) {
				return phrase;
			}
		}

		return false;

	},
	componentWillUpdate: function(nextProps, nextState) {
		
		if (!this.state.isChecked && nextState.isChecked) {
			this.recognition.start();
		} else if(this.state.isChecked && !nextState.isChecked) {
			this.recognition.stop();
		}

	},
	changeHandler: function(event) {
		this.setState({
			isChecked: event.target.checked
		});
	},
	render: function() {
		var classes = ['VoiceControl'];
		if (this.state.isAvailable) classes.push('is-available');
		if (this.state.isEnabled) classes.push('is-enabled');
		if (this.state.isError) classes.push('is-error');
		if (this.state.isError) classes.push('is-error--'+this.state.isError);
		return (
			<div className={classes.join(' ')}>
				<div className="VoiceControl__panel">
					<div className="VoiceControl__check"><Checkbox checked={this.state.isChecked} onChange={this.changeHandler}/></div>
					<button className="VoiceControl__previous" onClick={this.props.onPrevious}></button>
					<button className="VoiceControl__next" onClick={this.props.onNext}></button>
					<div className="VoiceControl__result">{this.state.result}</div>
				</div>
			</div>
		);
	}
});