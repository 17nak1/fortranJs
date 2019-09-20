let darray  = function(base,u1,u2,arr){
    if(base === undefined){
        base = 1;
    }
    this.base = base;
     
    this.u1 = u1;
    this.u2 = u2;
    if(arr !== undefined){
        this.arr = arr;
    }
    return this
}
darray.prototype.clone = function(base,u1,u2) {
    if(base === undefined){
        base = 1
    }
    return new darray(this.base + base - 1,u1,u2,this.arr);
};

darray.prototype.get = function(i,j){
    if(i === undefined){
        i = 1;
    }
    return j === undefined ? this.arr[(this.base - 1) + i - 1] : this.arr[(this.base - 1) + i - 1 + ((j - 1)*(this.u1 - 1))];
}

darray.prototype.set = function(x,i,j){
    if(i === undefined){
        i = 1;
    }
    if(j === undefined){
        this.arr[(this.base - 1) + i - 1] = x;
    }
    else{
        this.arr[(this.base - 1) + i - 1 + ((j - 1)*(this.u1 - 1))] = x;
    }
}
module.exports = darray;

Array.prototype.darr = function(base,u1,u2) {
    return new darray(base,u1,u2,this);
};