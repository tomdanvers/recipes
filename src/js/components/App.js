var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

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
            recipe: null,
            user: null
        };
    },
    observe: function() {
        return {
            user: ParseReact.currentUser,
            recipes: (new Parse.Query('Recipe'))
                .include('user')
                .equalTo('public', true)
                .descending('createdAt'),
            users: (new Parse.Query('_User'))
                .descending('createdAt')                      
        };
    },
    recipeClickHandler: function(id) {
        this.setState({
            recipe: id
        });
    },
    userClickHandler: function(id) {
        this.setState({
            user: id
        });
    },
    getRecipeById: function(id) {
        for (var i = 0; i < this.data.recipes.length; i++) {
            if (this.data.recipes[i].objectId === id.split(':')[1]) {
                return this.data.recipes[i];
            }
        }
    },
    getUserById: function(id) {
        for (var i = 0; i < this.data.users.length; i++) {
            if (this.data.users[i].objectId === id.split(':')[1]) {
                return this.data.users[i];
            }
        }
    },
    render: function() {
        var content;
        if (this.state.recipe) {
            var recipe = this.getRecipeById(this.state.recipe);
            content = <Recipe id={this.state.recipe} name={recipe.name} user={recipe.user.username} description={recipe.description} ingredients={recipe.ingredients} method={recipe.method} />
        } else if (this.state.user) {
            var user = this.getUserById(this.state.user);
            console.log(user)
            content = <UserProfile id={this.state.user} name={user.username} createdAt={user.createdAt}/>;
        } else if (this.data.user) {
            content = <User />;
        } else {
            content = (
                <div>
                    <UserAuthentication />
                    <PublicRecipes recipes={this.data.recipes} onRecipeClick={this.recipeClickHandler} onUserClick={this.userClickHandler}/>
                </div>
            );
        }

        return (
            <div className="App">
                {content}
            </div>
        );
    }
});
