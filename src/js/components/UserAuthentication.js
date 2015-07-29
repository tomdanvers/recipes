var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Intro = require('./Intro');
var Login = require('./Login');
var Signup = require('./Signup');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
            	<Intro />
                <Login />
                <Signup />
            </div>
        );
    }
});
