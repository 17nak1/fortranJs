let Main = require('./subplex.js');

Main.f = function (n,x) {  
   let x1 = x[1]
   let x2 = x[2]
  return 100*(x2-x1*x1)**2+(1-x1)**2

}
Main.x0 = [11,-33];
Main.run()

console.log('aaaaaaaaa')