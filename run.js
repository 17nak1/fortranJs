let run = function(){
    if(this.scale.length === 1){
        this.scale[0] = -Math.abs(this.scale[0]);
    }
    else{
        for(let i = 0; i< this.scale.length; i++){
            this.scale[i] = Math.abs(this.scale[i]);
        }
    }
    this.n = this.x0.length;
    this.work = new Array(this.n).fill(Array((this.n+6)+1))
    this.iwork = new Array(2).fill(Array(this.n))

    this.subplx (this.f,this.n,this.tol,this.maxnfe,this.scale,this.x0,this.fx,this.nfe,this.work,this.iwork,this.iflag)

    switch (this.conv) {
        case -1:
            console.log('number of function evaluations exceeds \'maxit\'');
          break;
        case 0:
            console.log('success! tolerance satisfied');
          break;
        case 1:
            console.log('limit of machine precision reached');
          break;
        case -2:
            console.log('\'parscale\' is too small relative to \'par\'');
          break;
        case 2: default:
            console.log('impossible error in subplex'); // # nocov
          break;
        }
}

module.exports = run;