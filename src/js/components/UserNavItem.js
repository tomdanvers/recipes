var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');


module.exports = React.createClass({
    clickHandler: function(event) {
        this.props.onClick(event.target.id);
    },
    render: function() {
        return <li id={this.props.id} className={this.props.selected ? 'isSelected':''} onClick={this.clickHandler}>{this.props.recipe ? this.props.recipe.name : this.props.label}</li>
    }
});
