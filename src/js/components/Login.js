var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    submitHandler: function(event) {
        event.preventDefault();

        Parse.User.logIn(this.state.username, this.state.password, {
            success: function(user) {
            }.bind(this),
            error: function(user, error) {
                console.log('error', error);
                this.setState({
                    code: error.code
                });
            }.bind(this)
        });

    },
    getErrorFromCode: function(code) {
        switch(code) {
            case 100:
                return 'Please check your connection and try again.';
                break;
            default:
                return 'An error occured.'
                break;
        }
    },
    changeUsernameHandler: function(event) {
        this.setState({username: event.target.value});
    },
    changePasswordHandler: function(event) {
        this.setState({password: event.target.value});
    },
    render: function() {
        var error = this.state.code === undefined ? null : (<div className="Form__error">{this.getErrorFromCode(this.state.code)}</div>);
        return (
            <form onSubmit={this.submitHandler} className="panel panel--half panel--halfLeft">
                <div className="panel__content">
                    <h2>Log In</h2>
                    <p>Enter your username and password.</p>
                    <input type="text" placeholder="Username" onChange={this.changeUsernameHandler} />
                    <input type="password" placeholder="Password" onChange={this.changePasswordHandler} />
                    <button>Log In</button>
                    {error}
                </div>
            </form>
        );
    }
});
