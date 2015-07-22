var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserAuthentication = require('./UserAuthentication');
var User = require('./User');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    getInitialState: function() {
        return {
            isLoggedIn: false
        };
    },
    observe: function() {
        return {
            user: ParseReact.currentUser
        };
    },
    render: function() {
        var component;
        if (this.data.user) {
            component = <User />;
        } else {
            component = <UserAuthentication />;
        }
        return (
            <div>
                {component}
            </div>
        );
    }
});
