var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {

        return (
            <div className="UserNew">
                Select a recipe or create a new one...
            </div>
        );

    }
});
