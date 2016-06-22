var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            recipes: (new Parse.Query('Recipe'))
                .equalTo('objectId', this.props.params.recipeId)
        };
    },
    render: function() {

        var recipe = this.data.recipes[0];
        
        if (recipe) {

            var ingredients = recipe.ingredients === undefined ? [] : recipe.ingredients.split('\n');
            var ingredientsList = ingredients.map(function(item, index) {
                return <li key={index}>{item}</li>
            });

            var method = recipe.method === undefined ? [] : recipe.method.split('\n');
            var methodList = method.map(function(item, index) {
                return <li key={index}>{item}</li>
            });
            
        }
        
        return (

            <div className="Recipe panel">
                    {(recipe === undefined) ? (
                        <div className="panel__content">
                            <h1>Loading...</h1>
                        </div>
                    ) : (
                        <div className="panel__content">
                            <h1 id="name" className="Recipe__name h1">{recipe.name}</h1>
                            <h2 id="user" className="Recipe__user h2">by {recipe.user.username.toUpperCase()}</h2>
                            <div id="description" className="Recipe__description">{recipe.description}</div>
                            <div className="cf">
                                <div className="Recipe__ingredients">
                                    <h2>Ingredients</h2>
                                    <div id="ingredients" className="Recipe__ingredientsInner">
                                        {recipe.ingredients}
                                    </div>
                                </div><div className="Recipe__method">
                                    <h2>Method</h2>
                                    <ol id="method" className="Recipe__methodInner">
                                        {methodList}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

        );

    }
});
