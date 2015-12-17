var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function() {
        return {
            user: new Parse.Query('_User')
                .equalTo('id', this.props.id)
        };
    },
    render: function() {
        console.log(this.props.createdAt)
        return (
            <div className="Recipe panel">
                <div className="panel__content">
                    <h1 id="name" className="h1">{this.props.name}</h1>
                    <h2 id="name" className="h2">{this.props.createdAt.toString()}</h2>
                </div>
            </div>
        );
    }
});
