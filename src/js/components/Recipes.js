var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Link = require('react-router').Link;

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
    contextTypes: {
      router: React.PropTypes.object,
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        var contents;
        if (this.data.recipes.length > 0) {
            var that = this;
            contents = this.data.recipes.map(function(recipe) {
                console.log(recipe)
                return (
                    <div id={recipe.id} key={recipe.id}><Link to={'/recipes/' + recipe.objectId}  >{recipe.name}</Link> by {recipe.user.username}</div>
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
