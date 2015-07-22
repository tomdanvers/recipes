var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            editing: false
        };
    },
    focusHandler: function(event) {
        this.props.onFocus(this.props.id);
    },
    changeHandler: function(event) {
        this.props.onChange(this.props.id, event.target.value);
    },
    blurHandler: function(event) {
        this.props.onBlur(this.props.id);
        this.setState({
            editing: false
        });
    },
    clickHandler: function(event) {
        this.setState({
            editing: true
        });
    },
    componentDidUpdate: function(){
        if (React.findDOMNode(this.refs.input)) {
            React.findDOMNode(this.refs.input).focus();  
        }
    },
    render: function() {
        if (this.state.editing) {
            switch (this.props.typeIn) {
                case 'textarea':
                    return (
                        <textarea id={this.props.id} value={this.props.value} className={'EditableInput ' + this.props.className} ref="input" onFocus={this.focusHandler} onChange={this.changeHandler} onBlur={this.blurHandler}></textarea>
                    );
                    break;
                default:
                    return (
                        <input id={this.props.id} value={this.props.value} className={'EditableInput ' + this.props.className} ref="input" onFocus={this.focusHandler} onChange={this.changeHandler} onBlur={this.blurHandler} />
                    );
                    break;
            }
        } else {
            switch (this.props.typeOut) {
                case 'ol':
                    var items = this.props.value.split('\n');
                    console.log('items', items);
                    return (
                        <ol id={this.props.id} className={'EditableInput ' + this.props.className} onClick={this.clickHandler}>
                            {items.map(function(item) {
                                console.log('item', item);
                                return <li key={item}>{item}</li>
                            })}
                        </ol>
                    );
                    break;
                default:
                    return (
                        <div id={this.props.id} className={'EditableInput ' + this.props.className} onClick={this.clickHandler}>{this.props.value}</div>
                    );
                    break;
            }
        }
    }
});
