const spliceNoMutate = (myArray,indexToRemove) => {
    return myArray.slice(0,indexToRemove).concat(myArray.slice(indexToRemove+1));
}

export default spliceNoMutate