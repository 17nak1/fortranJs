let getfunc = function (target, prop, receiver) {
    let j = 0,i = 0,index = 0            
    if (typeof prop === 'symbol' || isNaN(+prop)){
        if(!prop.includes(',')){                    
            console.log(prop)
            return target[prop]
        }
        else{
            temp =prop.split(',');
            i = parseInt(temp[0]);
            j = parseInt(temp[1]);
        }                    
    }
    else{
        i = parseInt(prop)
    }
    if(i > 0)
        index = (j === 0) ? (target.base - 1) + i - 1 : (target.base - 1) + i - 1 + ((j - 1)*(target.u1 + 1 - 1));
    return target.arr[index]    
}
let setFunc = function (target, prop, value, receiver) {
    let j = 0,i = 0,index = 0            
    if (typeof prop === 'symbol' || isNaN(+prop)){
        if(prop.includes(',')){
            temp =prop.split(',');
            i = parseInt(temp[0]);
            j = parseInt(temp[1]);
        }                    
    }
    else{
        i = parseInt(prop)
    }

    if(i > 0)
        index = (j === 0) ? (target.base - 1) + i - 1 : (target.base - 1) + i - 1 + ((j - 1)*(target.u1 + 1 - 1));
    target.arr[index] = value;
}
let dArray  = function(base,u1,u2,arr){
    this.arr = arr === undefined ? [] : arr
    this.base = base === undefined ? 1 : base;  
    this.u1 = u1;
    this.u2 = u2;

    return new Proxy(this, { get: getfunc, set: setFunc})
  
}

dArray.prototype.clone = function(base,u1,u2) {
    if(base === undefined){
        base = 1
    }
    return new dArray(this.base + base - 1,u1,u2,this.arr);
};

module.exports = dArray;

Array.prototype.dArray = function(base,u1,u2) {
    return new dArray(base,u1,u2,this);
};