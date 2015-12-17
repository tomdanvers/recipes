var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    render: function() {

        var ingredients = this.props.ingredients === undefined ? [] : this.props.ingredients.split('\n');
        var ingredientsList = ingredients.map(function(item, index) {
            return <li key={index}>{item}</li>
        });

        var method = this.props.method === undefined ? [] : this.props.method.split('\n');
        var methodList = method.map(function(item, index) {
            return <li key={index}>{item}</li>
        });
        
        return (

            <div className="Recipe panel">
                <div className="panel__content">
                    <h1 id="name" className="Recipe__name h1">{this.props.name}</h1>
                    <h2 id="user" className="Recipe__user h2">by {this.props.user.toUpperCase()}</h2>
                    <div id="description" className="Recipe__description">{this.props.description}</div>
                    <div className="cf">
                        <div className="Recipe__ingredients">
                            <h2>Ingredients</h2>
                            <div id="ingredients" className="Recipe__ingredientsInner">
                                {this.props.ingredients}
                            </div>
                        </div><div className="Recipe__method">
                            <h2>Method</h2>
                            <ol id="method" className="Recipe__methodInner">
                                {methodList}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
});
