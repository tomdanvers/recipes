var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Login = require('./Login');
var Signup = require('./Signup');
var EditableInput = require('./EditableInput');
var UserNavItem = require('./UserNavItem');
var UserNavLabel = require('./UserNavLabel');
var VoiceControl = require('./VoiceControl');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="StyleGuide">
                <VoiceControl />
                <div className="StyleGuide__item">
                    <h1 className="StyleGuide__label">EditableInput</h1>
                    <EditableInput id="editable" typeIn="textarea" typeOut="ol" className="Recipe__method" value={"Hello\nWorld!"} highlight={"editable-0"} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                </div>
                <div className="StyleGuide__item">
                    <h1 className="StyleGuide__label">UserNavItem</h1>
                    <UserNavLabel id="user-nav-label" label="User Nav Label"/>
                    <UserNavItem id="user-nav-item" label="User Nav Item"/>
                </div>
                <div className="StyleGuide__item">
                    <h1 className="StyleGuide__label">Login</h1>
                    <Login/>
                </div>
                <div className="StyleGuide__item">
                    <h1 className="StyleGuide__label">Signup</h1>
                    <Signup/>
                </div>
                <div className="StyleGuide__item">
                    <h1 className="StyleGuide__label">Button</h1>
                    <button>Button</button>
                </div>
            </div>
        );
    }
});
