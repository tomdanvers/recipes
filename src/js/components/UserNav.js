var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserNavItem = require('./UserNavItem');

    module.exports = React.createClass({
        render: function() {

            var that = this;
            var navItems = this.props.recipes.map(function(recipe) {
                return (
                    <UserNavItem id={recipe.id} key={recipe.id} label={recipe.name} onClick={that.props.onClick}/>
                );
            });

            return (
                <ul>
                    {navItems}
                    <UserNavItem id='new' label='+ New Recipe' onClick={this.props.onClick} />
                </ul>
            );

        }
    });
