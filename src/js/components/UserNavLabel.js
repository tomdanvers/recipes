var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');


module.exports = React.createClass({
    render: function() {
        return <li className='UserNav__label'>{this.props.label}</li>
    }
});
