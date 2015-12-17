var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            recipes: (new Parse.Query('Recipe'))
                .include('user')
                .equalTo('public', true)
                .descending('createdAt')
        };
    },
    getInitialState: function() {
        return {};
    },
    recipeClickHandler: function(event) {
        event.preventDefault();
        console.log('PublicRecipes.recipeClickHandler(', event.target.id, ')');
        this.props.onRecipeClick(event.target.id);
    },
    userClickHandler: function(event) {
        event.preventDefault();
        console.log('PublicRecipes.userClickHandler(', event.target.id, ')');
        this.props.onUserClick(event.target.id);
    },
    render: function() {
        var contents;
        if (this.data.recipes.length > 0) {
            var that = this;
            contents = this.data.recipes.map(function(recipe) {
                return (
                    <div id={recipe.id} key={recipe.id}><a id={recipe.id} href='#' onClick={that.recipeClickHandler}>{recipe.name}</a> by <a id={recipe.user.id} href='#' onClick={that.userClickHandler}>{recipe.user.username}</a></div>
                );
            });
        } else {
            contents = <div>No public recipes...</div>;
        }
        return (
            <div className="panel">
                <div className="panel__content">
                    <h2>Public Recipes</h2>
                    {contents}
                </div>
            </div>
        );
    }
});
