let simplx = function(f,n,step,ns,ips,maxnfe,cmode,x,fx,nfe,s,fs,iflag){
    let i,icent,ih = [].darr(),il = [].darr(),inew = [].darr(),is = [].darr(),itemp,j,npts
    let dist,dum = [].darr(),fc = [].darr(),fe = [].darr(),fr = [].darr(),tol
    let small = [].darr(),updatc = [].darr()
    s = s.clone(1,ns,ns+3);
    let goto_variable = 0;
    while (true)
    {
      switch (goto_variable){
         case 0:
            if (cmode){
               goto_variable = 50;
            }
            else{
               goto_variable = 5;
            }
         break;
         case 5:
            npts = ns+1
            icent = ns+2
            itemp = ns+3
            updatc.set(false)
            this.start(n,x,step,ns,ips,s.clone(1,ns,ns+3),small)
            if (small.get()){
               iflag = 1
               return
            }
            fs.set(fx.get(),1)
            for(j = 2 ; j<= npts; j++){// 10
               this.evalf (f,ns,ips,s.clone((j-1)*ns+1),n,x,fs.clone(j),this.nfe)
            }

            il.set(1)
            this.order(npts,fs,il,is,ih)
            this.tol = this.psi*this.dist(ns,s.clone((ih.get()-1)*ns+1),s.clone((il.get()-1)*ns+1))
            goto_variable = 20;
         break;
         case 20: // 20
            this.calcc (ns,s,ih,inew,updatc,s.clone((icent-1)*ns+1))
            updatc.set(true)
            inew.set(ih.get())
            this.newpt(ns,this.alpha,s.clone((icent-1)*ns+1),s.clone((ih.get()-1)*ns+1),true,s.clone((itemp-1)*ns+1),small)
            goto_variable = 40; // 40
            if (small.get()){
               break;
            }

            this.evalf (f,ns,ips,s.clone((itemp-1)*ns+1),n,x,fr,this.nfe)
            if (fr.get() < fs.get(il.get())){  
               this.newpt(ns,-this.gamma,s.clone((icent-1)*ns+1),s.clone((itemp-1)*ns+1),true,s.clone((ih.get()-1)*ns+1),small)
               goto_variable = 40; // 40
               if (small.get()){
                  break;
               }
               this.evalf (f,ns,ips,s.clone((ih.get()-1)*ns+1),n,x,fe,this.nfe)
               if (fe.get() < fr.get()){
                  fs.set(fe.get(),ih.get())
               }
               else{
                  this.dcopy(ns,s.clone((itemp-1)*ns+1),1,s.clone((ih.get()-1)*ns+1),1)
                  fs.set(fr.get(),ih.get())
               }
            }
            else if (fr.get() < fs.get(is.get())){
               this.dcopy(ns,s.clone((itemp-1)*ns+1),1,s.clone((ih.get()-1)*ns+1),1)
               fs.set(fr.get(),ih.get())
            }
            else{
               if (fr.get() > fs.get(ih.get())){
                  this.newpt(ns,-this.beta,s.clone((icent-1)*ns+1),s.clone((ih.get()-1)*ns+1),true,s.clone((itemp-1)*ns+1),small)
               }
               else{
                  this.newpt(ns,-this.beta,s.clone((icent-1)*ns+1),s.clone((itemp-1)*ns+1),false,dum,small)
               }     
               goto_variable = 40; // 40
               if (small.get()){
                  break;
               }
               this.evalf (f,ns,ips,s.clone((itemp-1)*ns+1),n,x,fc,this.nfe)
               if (fc.get() < Math.min(fr.get(),fs.get(ih.get()))){
                  this.dcopy(ns,s.clone((itemp-1)*ns+1),1,s.clone((ih.get()-1)*ns+1),1)
                  fs.set(fc.get(),ih.get())
               }
               else{
                     for(j = 1; j<= npts; j++){          
                        if (j !== il.get()){
                           this.newpt(ns,-delta,s.clone((il.get()-1)*ns+1),s.clone((j-1)*ns+1),false,dum,small)
                           goto_variable = 40; // 40
                           if (small.get()){
                              break;
                           }
                           this.evalf(f,ns,ips,s.clone((j-1)*ns+1),n,x,fs.clone(j),this.nfe)
                        }
                     }
               }   
               updatc.set(false)
            }
            this.order(npts,fs,il,is,ih)
            goto_variable = 40;
         break;
         case 40: //40   continue
            fx.set(fs.get(il.get()))
            goto_variable = 50;
         break;
         case 50: // 50   continue
            if (this.nfe >= maxnfe){
               iflag = -1
            }
            else if (this.dist(ns,s.clone((ih.get()-1)*ns+1),s.clone((il.get()-1)*ns+1)) <= this.tol || small.get()){
               iflag = 0
            }
            else{
               goto_variable = 20;//    go to 20
               break;
            }

            for(i= 1 ; i<= ns; i++){
               x.set(s.get(i,il.get()),ips.get(i))
            }
            return
         break;
      }
   }
}

module.exports = simplx;