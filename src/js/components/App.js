var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserAuthentication = require('./UserAuthentication');
var User = require('./User');
var StyleGuide = require('./StyleGuide');

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

        // DEBUG - START
        // component = <StyleGuide />
        // DEBUG - END
        return (
            <div className="App">
                {component}
            </div>
        );
    }
});
