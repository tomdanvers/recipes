var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var EditableInput = require('./EditableInput');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            highlightIndex: false,
            highlightCount: 0
        };
    },
    focusHandler: function(event) {
        this.props.onEditStart(event.target.id);
    },
    changeHandler: function(event) {
        this.props.onEditUpdate(event.target.id, event.target.value);
    },
    blurHandler: function(event) {
        this.props.onEditStop(event.target.id);
    },
    removeHandler: function(event) {
        if (confirm('Are you sure you want to remove this recipe?')) {
            this.props.onRecipeRemove();
        }
    },
    componentDidMount: function() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    componentWillReceiveProps: function(nextProps){

        var highlightCount = 0; 
        
        // Ingredients
        highlightCount ++;

        // Method 
        highlightCount ++;
        highlightCount += nextProps.method.split('\n').length;

        if (this.props.id !== nextProps.id) {

            this.setState({
                highlightIndex: false,
                highlightCount: highlightCount
            });

        } else {

            this.setState({
                highlightCount: highlightCount
            });
            
        }
        
    },
    handleKeyDown: function(event) {
        
        if (this.props.editing) {
            return;  
        } else {
            event.preventDefault();
        }

        var index;
        
        if (typeof(this.state.highlightIndex) === 'boolean') {
            index = 0;
        } else {
            index = this.state.highlightIndex;
            
            switch (event.keyCode) {
                case 38:
                    index --;
                    break;
                case 40:
                    index ++;
                    break;
            }

            if (index < 0) {
                index = this.state.highlightCount - 1;
            } else if(index >= this.state.highlightCount) {
                index = 0;
            }

        }
        
        if (this.state.highlightIndex !== index) {
            this.setState({highlightIndex:index});
        }
        

    },
    render: function() {
        
        var highlights = [];
        highlights.push('ingredients');
        highlights.push('method');

        var methodItems = this.props.method.split('\n');
        methodItems.map(function(item, index) {
            highlights.push('method-'+index);
        });

        var highlight = this.state.highlightIndex === false ? null : highlights[this.state.highlightIndex];
        console.log(highlight)
        return (

            <div className="Recipe">
                <EditableInput id="name" typeIn="input" typeOut="h1" className="h1" value={this.props.name} highlight={highlight} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <h2>Ingredients</h2>
                <EditableInput id="ingredients" typeIn="textarea" typeOut="div" className="Recipe__ingredients" value={this.props.ingredients} highlight={highlight} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <h2>Method</h2>
                <EditableInput id="method" typeIn="textarea" typeOut="ol" className="Recipe__method" value={this.props.method} highlight={highlight} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                <button onClick={this.removeHandler}>Remove Recipe</button>
            </div>

        );

    }
});
