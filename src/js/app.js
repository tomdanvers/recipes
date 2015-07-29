var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var App = require('./components/App');


Parse.initialize('hKc4I2i2tMsfs7pn5ZXHKbI5vqB7vk0jiDhvuMsP', 'bfwNgeIg1riBr7ogEq8Rql8IUsTUUGRNwD79PIQm');

React.render(
    <App />,
    document.getElementById('app')
);
