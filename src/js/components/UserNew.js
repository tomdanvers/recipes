var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    welcomeMessage: function() {
        return 'lets cook!';
    },
    render: function() {
        var user = Parse.User.current();
        return (
            <div className="UserNew">
                <h1 className="Header">Hello {user.get('username')}, {this.welcomeMessage()}</h1>
                <div>Select a recipe or create a new one...</div>
            </div>
        );

    }
});
