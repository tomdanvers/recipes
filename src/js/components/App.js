var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Link = require('react-router').Link;

var UserAuthentication = require('./UserAuthentication');
var User = require('./User');
var UserProfile = require('./UserProfile');
var PublicRecipes = require('./PublicRecipes');
var StyleGuide = require('./StyleGuide');
var Recipe = require('./Recipe');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    getInitialState: function() {
        return {
            user: null
        };
    },
    observe: function() {
        return {
            user: ParseReact.currentUser                    
        };
    },
    render: function() {
        var isLoggedIn = this.data.user !== undefined && this.data.user !== null;
        console.log('isLoggedIn', isLoggedIn)
        return (
            <div className="App">
                {isLoggedIn ? (
                  <Link to="/logout">Log out</Link>
                ) : (
                  <Link to="/login">Sign in</Link>
                )}
                {this.props.children || <p>You are {!isLoggedIn && 'not'} logged in.</p>}
            </div>
        );
    }
});
