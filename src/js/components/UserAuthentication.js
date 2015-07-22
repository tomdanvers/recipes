var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Login = require('./Login');
var Signup = require('./Signup');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <Login />
                <Signup />
            </div>
        );
    }
});
