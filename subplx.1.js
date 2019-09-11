//       external f,sortd,evalf,partx,setstp,simplx,subopt
//       external dcopy
//       intrinsic abs,mod

let subplx = function(f,n,tol,maxnfe,scale,x,fx,nfe,work,iwork,iflag){

  let i,ifsptr,ins,insfnl,insptr,ipptr,isptr,istep,istptr,ns,nsubs;
  let bnsfac = [[-1,-2,0],[1,0,2]];
  let dum,scl,sfx,xpscl;
  let cmode;

  let goto_variable = 10;
  while (true)
  {
      switch (goto_variable){
        case 10:
          goto_variable = 15;
          if(scale[0] >= 0){
            //
            // 10
            //
            for( i = 0; i < n; i++){
              xpscl = x[i]+scale[i];
              if (xpscl === x[i]){
                 goto_variable = 120;
                 break;
              }
            }
          }
          else{
            //
            //20
            //
            scl = Math.abs(scale[1])
            for( i = 0; i < n; i++){
              xpscl = x[i]+scl;
              if (xpscl === x[i]){
                goto_variable = 120;
                break;
              }
            }
          }
        break;

        case 15:

          this.subopt(n)

          istptr = n + 1;
          isptr = istptr + n;
          ifsptr = isptr + nsmax * (nsmax + 3)
          insptr = n + 1
          if (scale[0] > 0){
            this.dcopy(n,scale,1,work,1)
            this.dcopy(n,scale,1,work[istptr],1)
          }
          else{
            this.dcopy(n,scl,0,work,1)
            this.dcopy(n,scl,0,work[istptr],1)
          }

          //
          // 30
          //

          for( i = 0; i < n; i++){
            iwork[i] = i;
          }
          
          nfe = 0
          nfxe = 1
          this.ftest = 0
          cmode = false
          initx = true
          this.evalf(f,0,iwork,dum,n,x,sfx,nfe)
          initx = false
          
          goto_variable = 40;
        break;
        
        case 40:  
          //
          // 40
          //

          //
          //50
          //

          for( i = 0; i < n; i++){
            work[i] = Math.abs(work[i]);
          }
          this.sortd(n,work,iwork)
          this.partx(n,iwork,work,nsubs,iwork[insptr])
          this.dcopy(n,x,1,work,1)
          ins = insptr
          insfnl = insptr + nsubs - 1
          ipptr = 1

          goto_variable = 60;
        break;

        case 60:

          //
          // 60
          //

          ns = iwork[ins]
          //
          // continue
          //

          simplx(f,n,work[istptr],ns,iwork[ipptr],maxnfe,cmode,x,sfx,nfe,work[isptr],work[ifsptr],iflag)
          cmode = false
          if (iflag !== 0){
            goto_variable = 110
          }
          else{
            goto_variable = 70;
          }
        break;

        case 70:
          if (ins < insfnl){
            ins = ins + 1
            ipptr = ipptr + ns
            goto_variable = 60;
          }
          else{
            goto_variable = 80;
          }
        break;

        case 80:

          //
          // 80
          //

          for( i = 0; i < n; i++){
            work[i] = x[i] - work[i];
          }

          //
          // continue
          //
          istep = istptr
          goto_variable = 100;
        break;
        
        case 100:

          //
          // 100
          //
          for( i = 0; i < n; i++){
            if (Math.max(Math.abs(work[i]),Math.abs(work[istep])* this.psi) / Math.max(Math.abs(x[i]),1) > tol){
              setstp(nsubs,n,work,work[istptr]);
              goto_variable = 40;
              break;
            }
            goto_variable = 105;
            istep = istep + 1;
          }
        break;

        case 105:

          iflag = 0
          goto_variable = 110;
        break;

        case 110:
          //
          // 110
          //
          fx = sfx
          return 0;
        break;

        case 120:

          //
          //120
          //
          iflag = -2
          return 0;
        break;             
      }
  }

}

module.exports = subplx;