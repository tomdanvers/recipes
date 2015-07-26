var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    divHeight: 0,
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
    componentWillUpdate: function(){
        var domNode = React.findDOMNode(this.refs.output);
        if (domNode) {
            if (this.props.typeIn === 'textarea') {
                this.divHeight = domNode.offsetHeight;
            }
            domNode.focus();  
        }
    },
    componentDidUpdate: function(){
        var domNode = React.findDOMNode(this.refs.input);
        if (domNode) {
            if (this.props.typeIn === 'textarea' && this.divHeight > 0) {
                domNode.style.height = Math.max(200, this.divHeight) + 'px';
            }
            domNode.focus();  
        }
    },
    render: function() {
        if (this.state.editing) {
            switch (this.props.typeIn) {
                case 'textarea':
                    return (
                        <textarea id={this.props.id} value={this.props.value} className={'EditableInput EditableInput__textarea isEditing ' + this.props.className} ref="input" onFocus={this.focusHandler} onChange={this.changeHandler} onBlur={this.blurHandler}></textarea>
                    );
                    break;
                default:
                    return (
                        <input id={this.props.id} value={this.props.value} className={'EditableInput EditableInput__input isEditing ' + this.props.className} ref="input" onFocus={this.focusHandler} onChange={this.changeHandler} onBlur={this.blurHandler} />
                    );
                    break;
            }
        } else {
            var items = this.props.value === undefined ? [] : this.props.value.split('\n');
            switch (this.props.typeOut) {
                case 'ol':
                    return (
                        <ol id={this.props.id} className={'EditableInput EditableInput__ol ' + this.props.className} ref="output" onClick={this.clickHandler}>
                            {
                                items.map(function(item, index) {
                                    return <li key={index}>{item}</li>
                                })
                            }
                        </ol>
                    );
                    break;
                case 'h1':
                    return (
                        <h1 id={this.props.id} className={'EditableInput EditableInput__h1 ' + this.props.className} ref="output" onClick={this.clickHandler}>{this.props.value}</h1>
                    );
                    break;
                default:
                    return (
                        <div id={this.props.id} className={'EditableInput EditableInput__div ' + this.props.className} ref="output" onClick={this.clickHandler}>{this.props.value}</div>
                    );
                    break;
            }
        }
    }
});
