let Main = require('./subplex.js');


let f2 = function (n,x) {  
  let x1 = x[1]
  let x2 = x[2]
 return 100*(x2-x1*x1)**2+(1-x1)**2

}

Main.f = function (n,x) {  
  sum = 0
  temp = x.clone(1,3,2)
  for(let i = 1; i<= n/2; i++){
    sum += f2(2,temp[i])
  }
  return sum
}

Main.maxnfe = 30000
Main.x0 = [-33,11,14,9,0,12];
Main.run()

console.log('aaaaaaaaa')