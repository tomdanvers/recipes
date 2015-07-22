var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var EditableInput = require('./EditableInput');

module.exports = React.createClass({
    focusHandler: function(event) {
        this.props.onEditStart(event.target.id);
    },
    changeHandler: function(event) {
        this.props.onEditUpdate(event.target.id, event.target.value);
    },
    blurHandler: function(event) {
        this.props.onEditStop(event.target.id);
    },
    removeHandler: function(event) {
        if (confirm('Are you sure you want to remove this recipe?')) {
            this.props.onRecipeRemove();
        }
    },
    render: function() {

        return (

            <div>
                <EditableInput id="name" typeIn="input" typeOut="h1" className="h1" value={this.props.name} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <h2>Ingredients</h2>
                <EditableInput id="ingredients" typeIn="textarea" typeOut="div" className="Recipe__ingredients" value={this.props.ingredients} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <h2>Method</h2>
                <EditableInput id="method" typeIn="textarea" typeOut="ol" className="Recipe__method" value={this.props.method} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <button onClick={this.removeHandler}>Remove Recipe</button>
            </div>

        );

    }
});
