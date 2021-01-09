import React, { Component } from 'react';
import './SortingVisualizer.css';

const NORMAL_COLOR = 'pink';
const SELECT_COLOR = 'red';
// const DELAY = 10;

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            max: 100,
            min: 1,
            delay: 10,
        };
    }
    componentDidMount(){
        this.newArray(25);
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
    getArrayCopy(){
        return JSON.parse(JSON.stringify(this.state.array));
    }
    setDelay(delay){
        this.state.delay = delay;
    }
    async swapAsync(a,b,array){
        let valid = this.isValidIndex(a) && this.isValidIndex(b)
        if(valid){
            await this.delay();
            let temp = array[a];
            array[a] = array[b];
            array[b] = temp;
            this.setState(
                {array: array}
            )

        }
        return new Promise((resolve,reject) => {
            if(!valid) reject(new Error('invalid index'));
            // setTimeout(resolve,this.state.delay);
            resolve();
        });
    }
    swap(a,b,array){
        let valid = this.isValidIndex(a) && this.isValidIndex(b)
        if(valid){
            let temp = array[a];
            array[a] = array[b];
            array[b] = temp;
            this.setState(
                {array: array}
            )
        }
    }
    delay(){
        return new Promise((resolve)=>{
            setTimeout(resolve,this.state.delay);
        });
    }
    isValidIndex(index){
        if(index >= this.state.array.length || index < 0) return false;
        return true;
    }
    async bubbleSort(){
        console.log("bubble");
        let array = this.getArrayCopy();
        let length = array.length;
    
        for(let i = 0; i < length-1; i++){
            for(let j = 0; j < length-i-1; j++){
                // await this.delay();
                const arrayValues = document.getElementsByClassName('array-value');
                arrayValues[j].style.backgroundColor = SELECT_COLOR;
                arrayValues[j+1].style.backgroundColor = SELECT_COLOR;
                if(array[j] > array[j+1]){
                    // await this.swapAsync(j,j+1,array); 
                    this.swap(j,j+1,array);
                }
                await this.delay();
                arrayValues[j].style.backgroundColor = NORMAL_COLOR;
                // arrayValues[j+1].style.backgroundColor = NORMAL_COLOR;
            }
            //makes sure the first value is highlighted at the end
            document.getElementsByClassName('array-value')[0].style.backgroundColor = SELECT_COLOR;
        }
        return array;
    }
    async insertionSort(){
        console.log("insertion");
        let array = this.getArrayCopy();
        var length = array.length;

        for(let i = 1; i < length; i++){
            const arrayValues = document.getElementsByClassName('array-value');
            let flag = false;
            let j;
            for(j = i; j >= 1 && array[j] < array[j-1]; j--){
                flag = true;
                arrayValues[j].style.backgroundColor = SELECT_COLOR;
                await this.swapAsync(j,j-1,array);
                arrayValues[j].style.backgroundColor = NORMAL_COLOR;
            }
            if(flag){
                arrayValues[j].style.backgroundColor = SELECT_COLOR;
                await this.delay();
                arrayValues[j].style.backgroundColor = NORMAL_COLOR;
            }
        }
        //highlights the whole array after done sorting
        const arrayValues = document.getElementsByClassName('array-value');
        for(let i = 0; i < length; i++){
            arrayValues[i].style.backgroundColor = SELECT_COLOR;
            await this.delay();
        }
        return array;
    }
    // async mergeSort(){
    //     function merge(array,start,middle,end){
    //         let 
    //     }
    // }
    render() { 
        // const {array} = this.state;
        const arr = this.state.array;
        return (
            <div className="array-container">
                {arr.map((value,index) => (
                    <div
                        className="array-value"
                        key={index}
                        style={{
                            backgroundColor: NORMAL_COLOR,
                            height: `${value * 2}px`,
                    }}></div>
                ))}
                <br></br>
                <button onClick={()=> this.bubbleSort()}>Bubble Sort</button>
                <button onClick={()=> this.insertionSort()}>Insertion Sort</button>
            </div>

            
          );
    }
}
export default SortingVisualizer;