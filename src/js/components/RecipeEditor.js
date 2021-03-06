var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var EditableInput = require('./EditableInput');
var Checkbox = require('./Checkbox');

// var VoiceControl = require('./VoiceControl');

module.exports = React.createClass({
    highlights: [],
    getInitialState: function() {
        return {
            highlightIndex: false,
            highlightMatch: null,
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
    componentWillMount: function() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    componentWillReceiveProps: function(nextProps){


        this.highlights = [];
        this.highlights.push('ingredients');
        this.highlights.push('method');
        
        var methodItems = this.props.method.split('\n');
        methodItems.map(function(item, index) {
            this.highlights.push('method '+(index+1));
        }.bind(this));

        var highlightCount = this.highlights.length;

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

        } else if (event.keyCode === 38 || event.keyCode === 40) { 
            
            event.preventDefault();
            
            var diff;
            switch (event.keyCode) {
                case 38:
                    diff = -1;
                    break;
                case 40:
                    diff = 1;
                    break;
            }

            this.adjustHighlightIndex(diff);

        }

    },
    adjustHighlightIndex: function(diff) {

        var index;
            
        if (typeof(this.state.highlightIndex) === 'boolean') {
            
            // Initial 
            index = 0;

        } else if (this.state.highlightMatch) {
            
            // Determine index from previous  match
            for (var i = 0; i < this.highlights.length; i++) {
                if (this.highlights[i] === this.state.highlightMatch) {
                    index = i;
                }
            }

        } else {

            // Otherwise increment/decrement
            index = this.state.highlightIndex;
            
            index += diff;

            if (index < 0) {
                index = this.state.highlightCount - 1;
            } else if(index >= this.state.highlightCount) {
                index = 0;
            }

        }
        
        if (this.state.highlightIndex !== index) {
            // If its changed then update
            this.setState({
                highlightMatch: null,
                highlightIndex:index
            });
        }

    },
    handleMatch: function(match) {
        
        console.log('Recipe.handleMatch(',match,')');

        if (match === 'next') {
            
            this.adjustHighlightIndex(1);

        } else if (match === 'previous') {

            this.adjustHighlightIndex(-1);

        } else {
            
            this.setState({
                highlightMatch: match
            });

        }
    },
    previousHandler: function() {
        this.adjustHighlightIndex(-1);
    },
    nextHandler: function() {
        this.adjustHighlightIndex(1);
    },
    publicChangeHandler: function(event) {
        this.props.onPublicChange(event.target.checked);
    },
    render: function() {
        
        var highlight;
        
        if (this.state.highlightMatch) {
            highlight = this.state.highlightMatch;
        } else {
            highlight = this.state.highlightIndex === false ? null : this.highlights[this.state.highlightIndex];
        }

        var phrases = this.highlights.concat(['next','previous']);
        
        return (

            <div className="Recipe panel">
                <div className="panel__content">
                    <EditableInput id="name" typeIn="input" typeOut="h1" className="Recipe__name h1" value={this.props.name} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                    <EditableInput id="description" typeIn="textarea" typeOut="div" className="Recipe__description" value={this.props.description} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                    <div className="cf">
                        <div className="Recipe__ingredients">
                            <h2>Ingredients</h2>
                            <EditableInput id="ingredients" typeIn="textarea" typeOut="div" className="Recipe__ingredientsInner" value={this.props.ingredients} highlight={highlight} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                        </div><div className="Recipe__method">
                            <h2>Method</h2>
                            <EditableInput id="method" typeIn="textarea" typeOut="ol" className="Recipe__methodInner" value={this.props.method} highlight={highlight} onFocus={this.props.onEditStart} onChange={this.props.onEditUpdate} onBlur={this.props.onEditStop} />
                        </div>
                    </div>
                    <div className="Recipe__public">
                        <h2>Public?</h2>
                        <Checkbox id='public' checked={this.props.public} onChange={this.publicChangeHandler}/>
                    </div>
                    <button className="Recipe__remove" onClick={this.removeHandler}>Remove Recipe</button>
                </div>
            </div>

        );

    }
});
