import React, { Component } from 'react';
class SortingMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            parent: props.parent,

        };
    }
    render() { 
        let {parent} = this.state;
        // return <div></div>;
        return ( 
            <div>
                <button onClick={()=> parent.newArray(parent.state.array.length)}>New Array</button>
                <button onClick={()=> parent.bubbleSort()}>Bubble Sort</button>
                <button onClick={()=> parent.insertionSort()}>Insertion Sort</button>
                <button onClick={()=> parent.mergeSort()}>Merge Sort</button>
            </div>
        );
    }
}
 
export default SortingMenu;