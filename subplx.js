let sortd = require('sortd')
let evalf = require('evalf')
let partx = require('partx')
let setstp = require('setstp')
let simplx = require('simplx')
let subopt = require('subopt')

function subplx (f,n,tol,maxnfe,mode,scale,x,fx,nfe,work,iwork,iflag) {}
      let nsmin,nsmax,irepl,ifxsw,nfstop,nfxe
      let alpha,beta,gamma,delta,psi,omega, bonus,fstop,fxstat,ftest
      let minf,initx,newx

     // common /usubc/ alpha,beta,gamma,delta,psi,omega,nsmin,
     // *               nsmax,irepl,ifxsw,bonus,fstop,nfstop,
     // *               nfxe,fxstat(4),ftest,minf,initx,newx

      let fbonus,sfstop,sfbest
      let neew

      // common /isubc/ fbonus,sfstop,sfbest,neew

      let i,j,ifsptr,ins,insfnl,insptr,ipptr,isptr, istep,istptr,ns,nsubs
      let bnsfac = new Array(3).fill(new Array(2))
      let dum,scl,sfx,xpscl
      let cmode

// c   blas
//       external dcopy
// c   fortran
//       intrinsic abs,mod
c
c data
c
      data ((bnsfac(i,j),i=1,3),j=1,2) /-1,-2.d0,0,1,0,2.d0/
c-----------------------------------------------------------
c
      if (mod(mode,2) === 0) {
// c
// c       first call, check input
// c
        if (n < 1 || tol < 0 || maxnfe < 1) go to 120
        if (scale(1) > 0) {
          for (let i = 1; i<= n; i++) {
            xpscl = x[i]+scale[i]
            if (xpscl === x[i]) go to 120
          }
        }else{
          scl = Math.abs(scale[1])
          for (let i = 1; i<= n; i++) {
            xpscl = x[i] + scl
            if (xpscl === x[i]) go to 120
          }
        }
        if (mod(mode/2,2) === 0) {
          subopt (n)
        }else{
          if (alpha <= 0) go to 120
          if (beta <= 0 || beta > 1) go to 120
          if (gamma <= 1) go to 120
          if (delta <= 0 || delta > 1) go to 120
          if (psi <= 0 || psi > 1) go to 120
          if (omega <= 0 || omega > 1) go to 120
          if (nsmin < 1 || nsmax < nsmin || n < nsmax) go to 120
          if (n < ((n-1)/nsmax+1)*nsmin) go to 120
          if (irepl < 0 || irepl > 2) go to 120
          if (ifxsw < 1 || ifxsw > 3) go to 120
          if (bonus < 0) go to 120
          if (nfstop < 0) go to 120
        }
// c       initialization
        istptr = n+1
        isptr = istptr+n
        ifsptr = isptr+nsmax*(nsmax+3)
        insptr = n+1
        if (scale(1) > 0) {
          dcopy (n,scale,1,work,1)
          dcopy (n,scale,1,work(istptr),1)
        }else{
          dcopy (n,scl,0,work,1)
          dcopy (n,scl,0,work(istptr),1)
        }
        for (let i = 1; i<= n; i++) {
          iwork[i] = i
        }
        nfe = 0
        nfxe = 1
        if (irepl === 0) {
          fbonus = 0
        }else if (minf) {
          fbonus = bnsfac(ifxsw,1)*bonus
        }else{
          fbonus = bnsfac(ifxsw,2)*bonus
        }
        if (nfstop === 0) {
          sfstop = 0
        }else if (minf) {
          sfstop = fstop
        }else{
          sfstop = -fstop
        }
        ftest = 0
        cmode = false
        neew= true
        initx = true
        evalf (f,0,iwork,dum,n,x,sfx,nfe)
        initx = false
      }else{
c
c       continuation of previous call
c
        if (iflag === 2) then
          if (minf) then
            sfstop = fstop
          else
            sfstop = -fstop
          end if
          cmode = true
          go to 70
        else if (iflag === -1) then
          cmode = true
          go to 70
        else if (iflag === 0) then
          cmode = false
          go to 90
        else
          return
        end if
      }
c
c     subplex loop
c
   40 continue
        do 50 i = 1,n
          work(i) = abs(work(i))
   50   continue
        sortd (n,work,iwork)
        partx (n,iwork,work,nsubs,iwork(insptr))
        dcopy (n,x,1,work,1)
        ins = insptr
        insfnl = insptr+nsubs-1
        ipptr = 1
c
c       simplex loop
c
   60   continue
          ns = iwork(ins)
   70     continue
          simplx (f,n,work(istptr),ns,iwork(ipptr),
     *                 maxnfe,cmode,x,sfx,nfe,work(isptr),
     *                 work(ifsptr),iflag)
          cmode = false
          if (iflag .ne. 0) go to 110
          if (ins < insfnl) then
            ins = ins+1
            ipptr = ipptr+ns
            go to 60
          end if
c
c       end simplex loop
c
        do 80 i = 1,n
          work(i) = x(i)-work(i)
   80   continue
c
c       check termination
c
   90   continue
        istep = istptr
        do 100 i = 1,n
          if (max(abs(work(i)),abs(work(istep))*psi)/
     *        max(abs(x(i)),1) > tol) then
            setstp (nsubs,n,work,work(istptr))
            go to 40
          end if
          istep = istep+1
  100   continue
c
c     end subplex loop
c
      iflag = 0
  110 continue
      if (minf) then
        fx = sfx
      else
        fx = -sfx
      end if
      return
c
c     invalid input
c
  120 continue
      iflag = -2
      return
      end


let mod = function (x,y) {
  return x - y * Math.floor(x / y).
}