var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    componentDidMount: function() {
        Parse.User.logOut();
    },
    render: function() {
        return (
            <div className="panel panel--half panel--halfLeft">
                <div className="panel__content">
                    <h2>Logged out</h2>
                </div>
            </div>
        );
    }
});
