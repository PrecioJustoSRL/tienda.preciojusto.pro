function sortArray (x,y) {
    if(x['nombre'].toLowerCase() < y['nombre'].toLowerCase()  ) {return -1}
    if(x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) {return 1}
    return 0  
}


export { sortArray,  }