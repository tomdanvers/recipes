var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="panel">
                <h1>Welcome!</h1>
                <p>Log in or sign up to get cooking.</p>
            </div>
        );
    }
});
