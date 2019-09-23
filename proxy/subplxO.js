// let sortd =require('./sort'.js)
// let evalf =require('./evalfO.js')
// let partx =require('./partxO.js')
// let setstp =require('./setstpO.js')
// let simplx =require('./simplxO.js')
// let subopt =require('./suboptO.js')
let dcopy =require('./dcopyO.js')
let FortranIndex = require('./fArray.js')


let nsmin,nsmax,irepl,ifxsw,nfxe
let fstop,fxstat,ftest
let initx,newx
let fbonus,sfstop,sfbest
let nnew
 let p = {
  alpha: 0,
  beta: 0,
  gamma: 0,
  delta: 0,
  psi: 0,
  omega: 0,
  nsmin: 0,
  nsmax: 0,
  irepl: 0,
  ifxsw: 0,
  bonus :0,
  nfstop: 0,
  minf: 0,
  sfx: 0,
  nfe : 0
} 
global.p   
                      
let subplx = function(f,n,tol,maxnfe,mode,scale,x,fx,nfe,work,iwork,iflag){ 
  let i,j,ifsptr,ins,insfnl,insptr,ipptr,isptr,istep,istptr,ns,nsubs
  let bnsfac,dum,scl,sfx,xpscl;
  let cmode

  bnsfac = [[-1,-2],[0,1],[0,2]];
  // let dum ,scl = [],sfx = [],xpscl = [];
  // let cmode;
  // fstop = f(x)
  let pc = 0;
  scale = FortranIndex.array(scale);
  x = FortranIndex.array(x);
  bnsfac = FortranIndex.array(bnsfac)
  jump:
  while(true) {
    debugger;
    switch(pc)
    {
      case 0:
      if (mode % 2 ===  0) {
        if (n < 1) {
          pc = 120;
          continue jump;
        }
        if (tol < 0) {
          pc = 120;
          continue jump;
        }
        if (maxnfe < 1) {
          pc = 120;
          continue jump;
        }
        if (scale[1] >= 0) {
          l10:for(let i = 1; i<= n;i++) {
            xpscl = x[i] + scale[i]
            if (xpscl === x[i]) {  
              pc = 120;
              continue jump;
            }
            continue l10;
          }
        } else {
          scl = abs(scale[1])
          l20:for(let i = 1; i<= n;i++) {
            xpscl = x[i] + scl
            if (xpscl === x[i]) {
              pc = 120;
              continue jump;
            }
            continue l20;
          }
        }
        if (((mode/2) % 2) === 0) {
          subopt(n)
        } else {
          if (alpha <= 0) { 
          pc = 120;
          continue jump;
          }
          if (beta <= 0 || beta >= 1) {
            pc = 120;
            continue jump;
          }
          if (gamma <= 1) {
            pc = 120;
            continue jump;
          }
          if (delta <= 0 || delta >= 1) {
            pc = 120;
            continue jump;
          }
          if (psi <= 0 || psi >= 1) {
            pc = 120;
            continue jump;
          }
          if (omega <= 0 || omega >= 1) {
            pc = 120;
            continue jump;
          }
          if (nsmin < 1 || nsmax < nsmin || n < nsmax) {
            pc = 120;
            continue jump;
          }
          if (n < ((n-1)/nsmax+1)*nsmin) {
            pc = 120;
            continue jump;
          }
          if (irepl < 0 || irepl > 2) {
            pc = 120;
            continue jump;
          }
          if (ifxsw < 1 || ifxsw > 3) {
            pc = 120;
            continue jump;
          }
          if (bonus < 0) {
            pc = 120;
            continue jump;
          }
          if (nfstop < 0) {
            pc = 120;
            continue jump;
          }
        }
// c       initialization
        istptr = n+1
        isptr = istptr+n
        ifsptr = isptr+nsmax*(nsmax+3)
        insptr = n+1
        if (scale[1] > 0) {
           dcopy (n,scale,1,work,1,1)
           dcopy (n,scale,1,work,1,istptr)
        } else {
           dcopy (n,scl,0,work,1,1)
           dcopy (n,scl,0,work,1,istptr)
        }
        l30:for(let i = 1; i <= n; i++){
          iwork[i] = i;
          continue l30;
        }
        nfe = 0
        nfxe = 1
        if (irepl === 0) {
          fbonus = 0
        } else if (minf) {
          fbonus = bnsfac[ifxsw][1]*bonus
        } else {
          fbonus = bnsfac[ifxsw][2]*bonus
        }
        if (nfstop === 0) {
          sfstop = 0
        } else if (minf) {
          sfstop = fstop
        } else {
          sfstop = -fstop
        }
        ftest = 0
        cmode = false
        nnew = true
        initx = true
        evalf (f,0,iwork,dum,n,x,sfx,nfe)
        initx = false
      } else { 
     //   continuation of previous 
        if (iflag === 2) {
          if (minf) {
            sfstop = fstop
          } else {
            sfstop = -fstop
          }
          cmode = true
          pc = 70;
          continue jump;
        } else if (iflag === -1) {
          cmode = true
          pc = 70;
          continue jump;
        } else if (iflag === 0) {
          cmode = false
          pc = 90;
          continue jump;
        } else {
          return
        }
      }

      case 40:
      // subplex loop
      l50:for (let i = 1; i<= n; i++) {
        work[i] = Math.abs(work[i]);
        continue l50;
      }
       sortd (n,work,iwork)
       partx (n,iwork,work,nsubs,iwork(insptr))
       dcopy (n,x,1,work,1,1)
      ins = insptr
      insfnl = insptr+nsubs-1
      ipptr = 1

      case 60:
      // subplex loop
      ns = iwork(ins)

      case 70:
       simplx (f,n,work(istptr),ns,iwork(ipptr),maxnfe,cmode,x,sfx,nfe,work(isptr),work(ifsptr),iflag)
      cmode = false
      if (iflag !== 0) {
        np = 110;
        continue jump;
      }
      if (ins < insfnl) {
        ins = ins+1
        ipptr = ipptr+ns
        np = 60;
        continue jump;
      }
      // end simplex loop
      l80:for (let i = 1; i <= n; i++) {
        work(i) = x[i]-work(i);
        continue l80;
      }

      case 90:
      istep = istptr
        l100:for (let i = 1; i <= n; i++) {
          if (max(abs(work(i)),abs(work(istep))*psi)/max(abs(x[i]),1) > tol) {
             setstp (nsubs,n,work,work(istptr))
            pc = 40;
            continue jump;
          }
          istep = istep+1
          continue l100;
        }  
      // end subplex loop
      iflag = 0

      case 110:
      if (minf) {
        fx = sfx
      } else {
        fx = -sfx
      }
      return;

      case 120:
      iflag = -2
      return;

      break jump;
    }
  }
}


let run = function(){
    let niwmax=300,nwmax=300,nxmax=300
    let scl =.1
    x0 = Array(10).fill(1)
    n = x0.length - 1 ;
    tol = 100
    
    let maxnfe,fx,nfe,work,iwork,iflag=0
    iwork = Array(niwmax + 1).fill(0)
    scale = Array(nxmax + 1).fill(0)
    work = Array(nwmax +1).fill(0)
    let x = Array(nwmax +1).fill(0)

    let f = function(x) {
    let sum = 0
      for(let i =1; i<= n; i++) {
        sum += x[i]**2
      }
      return sum
    }
    mode = 0
    scale[1] = -Math.abs(scl)
    
    x = x0
    subplx (f,n,tol,maxnfe,mode,scale,x,fx,nfe,work,iwork,iflag)
}

  run()   