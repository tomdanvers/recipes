var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');


module.exports = React.createClass({
    render: function() {

        return (
            <div className="Checkbox">
                <input id="c1" type="checkbox" className="Checkbox" checked={this.props.checked} onChange={this.props.onChange}/>
                <label htmlFor="c1"><span>{this.props.label}</span></label>
            </div>
        );

    }
});
