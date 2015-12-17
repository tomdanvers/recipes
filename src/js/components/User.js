var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var UserNav = require('./UserNav');
var UserNew = require('./UserNew');
var RecipeEditor = require('./RecipeEditor');

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
            case 'logout':
                Parse.User.logOut();
                break;
            case 'new':
                ParseReact.Mutation.Create('Recipe', {
                    name: 'New Recipe',
                    description: 'Lorem ipsum dolor sit amet...',
                    ingredients: 'Ingredients',
                    method: 'Method',
                    public: false,
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
        console.log('select', recipe.public);
        this.setState({
            selectedRecipe: recipe,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            method: recipe.method,
            public: recipe.public,
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
    publicChangeHandler: function(value) {

        var payload = {
            public: value
        };

        this.setState(payload);
        
        ParseReact.Mutation.Set(this.state.selectedRecipe, payload).dispatch();

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
        console.log('RENDER', this.state.public)
        var user = Parse.User.current();
        var recipe = this.state.selectedRecipe ? (<RecipeEditor id={this.state.selectedRecipe.objectId} public={this.state.public} name={this.state.name} description={this.state.description} ingredients={this.state.ingredients} method={this.state.method} editing={this.state.editing} onEditStart={this.editStartHandler} onEditUpdate={this.editUpdateHandler} onEditStop={this.editStopHandler} onPublicChange={this.publicChangeHandler} onRecipeRemove={this.recipeRemoveHandler}/>) : <UserNew/>;
        return (
            <div className="User">
                {recipe}
                <UserNav recipes={this.data.recipes} onClick={this.navClickHandler}/>
            </div>
        );
    }
});
