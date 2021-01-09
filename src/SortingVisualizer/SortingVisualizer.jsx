import React, { Component } from 'react';
import './SortingVisualizer.css';
class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            max: 100,
            min: 1,
        };
    }
    componentDidMount(){
        this.newArray(50);
    }
    newArray(length){
        const arr = [];
        for(let i = 0; i < length; i++){
            arr.push(this.generateValue());
        }
        this.setState({array: arr});
    }
    generateValue(){
        const {state} = this;
        return Math.floor(Math.random() * (state.max-state.min) + state.min);
    }
    render() { 
        // const {array} = this.state;
        const arr = this.state.array;
        return (
            <div className="array-container">
                {arr.map((value,index) => (
                    <div className="array-value" key={index}>
                        {value}
                    </div>
                ))}
            </div>
          );
    }
}
 
export default SortingVisualizer;