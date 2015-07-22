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
            selectedRecipe: null
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
                    this.setState({
                        selectedRecipe: recipe
                    });
                }.bind(this));
                break;
            default:
                var recipe = this.getRecipeById(id);
                this.setState({
                    selectedRecipe: recipe,
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    method: recipe.method
                });
                break;
        }
    },
    getRecipeById: function(id) {
        for (var i = 0; i < this.data.recipes.length; i++) {
            if (this.data.recipes[i].objectId === id.split(':')[1]) {
                return this.data.recipes[i];
            }
        }
    },
    editStartHandler: function(type) {
        this.batch = new ParseReact.Mutation.Batch();
    },
    editUpdateHandler: function(type, value) {
        
        var changed = {};
        changed[type] = value;

        // ParseReact.Mutation.Set(this.state.selectedRecipe, changed)
        //     .dispatch({batch:this.batch});

        this.setState(changed);

    },
    editStopHandler: function(type) {
        
        var changed = {};
        changed[type] = this.state[type];

        ParseReact.Mutation.Set(this.state.selectedRecipe, changed)
            .dispatch();

    },
    render: function() {
        var user = Parse.User.current();
        var recipe = this.state.selectedRecipe ? (<Recipe name={this.state.name} ingredients={this.state.ingredients} method={this.state.method} onEditStart={this.editStartHandler} onEditUpdate={this.editUpdateHandler} onEditStop={this.editStopHandler} />) : <UserNew/>;
        return (
            <div>
                <div>
                    Hello {user.get('username')}, {this.welcomeMessage()}
                </div>
                <UserNav recipes={this.data.recipes} onClick={this.navClickHandler}/>
                {recipe}
                <div>
                    <a href="#" onClick={Parse.User.logOut}>Log out</a>
                </div>
            </div>
        );
    },
    welcomeMessage: function() {
        return 'lets cook!';
    }
});
