import React, { Component } from 'react';
import './SortingVisualizer.css';
import SortingMenu from './SortingMenu';

const NORMAL_COLOR = 'pink';
const SELECT_COLOR = 'red';
const PRIMARY_BOUNDARY_COLOR = 'green';
const SECONDARY_BOUNDARY_COLOR = 'blue';
// const DELAY = 10;

class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            max: 100,
            min: 1,
            delay: 50,
            isSorting: false,
        };
    }
    componentDidMount(){
        this.newArray(50);
        console.log(this.props);
    }
    newArray(length){
        const arr = [];
        for(let i = 0; i < length; i++){
            arr.push(this.generateValue());
        }
        this.setState({array: arr});
        let arrayValues = document.getElementsByClassName('array-value');
        for(let i = 0; i < arrayValues.length; i++){
            arrayValues[i].style.backgroundColor = NORMAL_COLOR;
        }
    }
    generateValue(){
        const {state} = this;
        return Math.floor(Math.random() * (state.max-state.min) + state.min);
    }
    getArrayCopy(){
        return this.state.array.slice();
    }
    setDelay(delay){
        this.setState(
            {delay: delay}
        );
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
    async sweep(array){
        //highlights the whole array after done sorting
        let length = array.length;
        const arrayValues = document.getElementsByClassName('array-value');
        for(let i = 0; i < length; i++){
            arrayValues[i].style.backgroundColor = SELECT_COLOR;
            await this.delay();
        }
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
        await this.sweep(array);
        return array;
    }
    async mergeSort(){
        let array = this.getArrayCopy();
        let dummyArray = array.slice();
        let realArray = array.slice();
        if(array.length <= 1) return array;
        await this.mergeSortRecursive(array,0,array.length-1,dummyArray);
        console.log(array);
        // await this.sweep(array);
        return array;
    }
    async mergeSortRecursive(array, start, end, dummyArray){
        if(start === end) return;
        const middle = Math.floor((start + end) / 2);
        await this.mergeSortRecursive(dummyArray,start,middle, array);
        await this.mergeSortRecursive(dummyArray,middle+1,end, array);
        await this.merge(array,start,middle,end, dummyArray);
        // this.setState({array: array});
        // return array;
    }
    async merge(array, start, middle, end, dummyArray){
        const arrayValues = document.getElementsByClassName('array-value');
        let leftIndex = start;
        let rightIndex = middle+1;
        let currentIndex = start;
        while(leftIndex <= middle && rightIndex <= end){
            if(array[leftIndex] < array[rightIndex]){
                arrayValues[currentIndex].style.backgroundColor = SELECT_COLOR;
                arrayValues[leftIndex].style.backgroundColor = SELECT_COLOR;
                await this.delay();
                arrayValues[currentIndex].style.backgroundColor = NORMAL_COLOR;
                arrayValues[leftIndex].style.backgroundColor = NORMAL_COLOR;
                dummyArray[currentIndex++] = array[leftIndex++];
            } else{
                arrayValues[currentIndex].style.backgroundColor = SELECT_COLOR;
                arrayValues[rightIndex].style.backgroundColor = SELECT_COLOR;
                await this.delay();
                arrayValues[currentIndex].style.backgroundColor = NORMAL_COLOR;
                arrayValues[rightIndex].style.backgroundColor = NORMAL_COLOR;
                dummyArray[currentIndex++] = array[rightIndex++];
            }
        }
        while(leftIndex <= middle){
            
            // const arrayValues = document.getElementsByClassName('array-value');
            arrayValues[currentIndex].style.backgroundColor = SELECT_COLOR;
            arrayValues[leftIndex].style.backgroundColor = SELECT_COLOR;
            await this.delay();
            arrayValues[currentIndex].style.backgroundColor = NORMAL_COLOR;
            arrayValues[leftIndex].style.backgroundColor = NORMAL_COLOR;
            dummyArray[currentIndex++] = array[leftIndex++];

        }
        while(rightIndex <= end){
            // const arrayValues = document.getElementsByClassName('array-value');
            arrayValues[currentIndex].style.backgroundColor = SELECT_COLOR;
            arrayValues[rightIndex].style.backgroundColor = SELECT_COLOR;
            await this.delay();
            arrayValues[currentIndex].style.backgroundColor = NORMAL_COLOR;
            arrayValues[rightIndex].style.backgroundColor = NORMAL_COLOR;
            dummyArray[currentIndex++] = array[rightIndex++];

        }
        await this.mergeCopy(array,dummyArray,start,end);
    }
    async mergeCopy(targetArray, dummyArray, start, end){
        for(let i = start; i <= end; i++){
            let arrayValues = document.getElementsByClassName('array-value');
            await this.delay();         
            arrayValues[i].style.backgroundColor = SELECT_COLOR;
            targetArray[i] = dummyArray[i];
            this.setState({array:targetArray});
            // await this.delay();
            // arrayValues[i].style.backgroundColor = NORMAL_COLOR;
        }
    }
    render() { 
        // const {array} = this.state;
        const arr = this.state.array;
        return (
            <div>
                <div className="array-container">
                    <div className="array-value-placeholder invisible" value={this.state.max}></div>
                    {arr.map((value,index) => (
                        <div
                            className="array-value"
                            key={index}
                            style={{
                                backgroundColor: NORMAL_COLOR,
                                height: `${value * 2}px`,
                        }}></div>
                    ))}
                </div>
                <SortingMenu 
                    parent={this}
                ></SortingMenu>
            </div>
           

            
          );
    }
}
export default SortingVisualizer;