var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserNavItem = require('./UserNavItem');
var UserNavLabel = require('./UserNavLabel');

    module.exports = React.createClass({
        getInitialState: function() {
            return {
                isShown: false
            };
        },
        navHandler: function(event) {

            this.toggleHandler(false);

            this.props.onClick(event);

        },
        toggleHandler: function(arg) {

            var isShown = typeof(arg) === 'boolean' ? arg : !this.state.isShown;

            this.setState({
                isShown: isShown
            });
        },
        render: function() {

            var that = this;
            var navItems = this.props.recipes.map(function(recipe) {
                return (
                    <UserNavItem id={recipe.id} key={recipe.id} label={recipe.name} onClick={that.navHandler}/>
                );
            });

            return (
                <div className={"UserNav " + (this.state.isShown ? "is-shown" : "")}>
                    <div className="UserNav__blocker" onClick={this.toggleHandler}></div>
                    <ul className={"UserNav__items"}>
                        <UserNavLabel label='My Recipes' />
                        {navItems}
                        <UserNavItem id='new' label='+ New Recipe' onClick={this.navHandler} />
                    </ul>
                    <div className="UserNav__toggle" onClick={this.toggleHandler}></div>
                </div>
            );

        }
    });
