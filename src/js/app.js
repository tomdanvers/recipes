var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

console.log(require('react-router'));


var App = require('./components/App');
var Login = require('./components/Login');
var Logout = require('./components/Logout');
var User = require('./components/User');
var Recipes = require('./components/Recipes');
var Recipe = require('./components/Recipe');



Parse.initialize('hKc4I2i2tMsfs7pn5ZXHKbI5vqB7vk0jiDhvuMsP', 'bfwNgeIg1riBr7ogEq8Rql8IUsTUUGRNwD79PIQm');

ReactDOM.render((
    <Router history={browserHistory}>
    	<Route path="/" component={App} onEnter={requireAuth}>
			<Route path="recipes" component={Recipes} />
			<Route path="recipes/:recipeId" component={Recipe} />
    	</Route>
    </Router>
), document.getElementById('app'));

function requireAuth(nextState, replaceState) {
	console.log('requireAuth', ParseReact.currentUser, nextState)
	if (ParseReact.currentUser === null) {
		replaceState({ nextPathname: nextState.location.pathname }, '/login')
	}

}


/*<Route path="logout" component={Logout} />
			<Route path="about" component={About} />
			<Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
			*/