var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserNav = require('./UserNav');
var UserNew = require('./UserNew');
var Recipe = require('./Recipe');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    batch: null,
    observe: function() {
        return {
            recipes: (new Parse.Query('Recipe'))
                .equalTo('user', Parse.User.current())
                .descending('createdAt')
        };
    },
    getInitialState: function() {
        return {
            selectedRecipe: null,
            editing: false
        };
    },
    navClickHandler: function(id) {
        switch (id) {
            case 'new':
                ParseReact.Mutation.Create('Recipe', {
                    name: 'New Recipe',
                    ingredients: 'Ingredients',
                    method: 'Method',
                    user: Parse.User.current()
                })
                .dispatch()
                .then(function(recipe) {
                    this.refreshQueries();
                    this.selectRecipe(recipe);
                }.bind(this));
                break;
            default:
                this.selectRecipe(this.getRecipeById(id));
                break;
        }
    },
    selectRecipe: function(recipe) {
        this.setState({
            selectedRecipe: recipe,
            name: recipe.name,
            ingredients: recipe.ingredients,
            method: recipe.method,
            editing: false
        });
    },
    getRecipeById: function(id) {
        for (var i = 0; i < this.data.recipes.length; i++) {
            if (this.data.recipes[i].objectId === id.split(':')[1]) {
                return this.data.recipes[i];
            }
        }
    },
    editStartHandler: function(type) {
        this.setState({
            editing: true
        });
    },
    editUpdateHandler: function(type, value) {
        
        var changed = {};
        changed[type] = value;

        this.setState(changed);

    },
    editStopHandler: function(type) {
        
        var changed = {};
        changed[type] = this.state[type];

        ParseReact.Mutation.Set(this.state.selectedRecipe, changed)
            .dispatch();

        this.setState({
            editing: false
        });

    },
    recipeRemoveHandler: function() {
        ParseReact.Mutation.Destroy(this.state.selectedRecipe)
            .dispatch()
            .then(function() {
                this.refreshQueries();
                this.selectRecipe(this.data.recipes[0]);
            }.bind(this));
    },
    render: function() {
        var user = Parse.User.current();
        var recipe = this.state.selectedRecipe ? (<Recipe id={this.state.selectedRecipe.objectId} name={this.state.name} ingredients={this.state.ingredients} method={this.state.method} editing={this.state.editing} onEditStart={this.editStartHandler} onEditUpdate={this.editUpdateHandler} onEditStop={this.editStopHandler} onRecipeRemove={this.recipeRemoveHandler}/>) : <UserNew/>;
        return (
            <div className="User">
                <UserNav recipes={this.data.recipes} onClick={this.navClickHandler}/>
                <h1 className="Header">Hello {user.get('username')}, {this.welcomeMessage()}</h1>
                {recipe}
                <div className="Footer">
                    <button onClick={Parse.User.logOut}>Log out</button>
                </div>
            </div>
        );
    },
    welcomeMessage: function() {
        return 'lets cook!';
    }
});
