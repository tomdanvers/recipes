var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isAvailable: false
		};
	},
	componentWillMount: function() {
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
		this.setState({
			isAvailable: window.SpeechRecognition !== null
		});
	},
	render: function() {
		return (
			<div className={'VoiceControl '+(this.state.isAvailable ? 'is-available' : '')}>
				<input type="checkbox" checked={this.state.isEnabled} />
			</div>
		);
	}
});