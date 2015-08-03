var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    submitHandler: function(event) {
        event.preventDefault();

        Parse.User.signUp(this.state.username, this.state.password, {
            success: function(user) {
            }.bind(this),
            error: function(user, error) {
                console.log('error', error);
                this.setState({
                    code: error.code,
                    message: error.message
                });
            }.bind(this)
        });

    },
    changeUsernameHandler: function(event) {
        this.setState({username: event.target.value});
    },
    changePasswordHandler: function(event) {
        this.setState({password: event.target.value});
    },
    render: function() {
        var error = this.state.code === undefined ? null : (<div className="Form__error">{this.state.code} {this.state.message}</div>);
        return (
            <form onSubmit={this.submitHandler} className="panel">
                <h2>Sign Up</h2>
                <p>Choose a username and password.</p>
                <input type="text" placeholder="Username" onChange={this.changeUsernameHandler} />
                <input type="password" placeholder="Password" onChange={this.changePasswordHandler} />
                <button>Sign Up</button>
                {error}
            </form>
        );
    }
});
