/*
*  @file         dist.js
*                fstats modifies the global variables nfxe,fxstat.
*  @inputs
*   fx          - most recent evaluation of f at best x
*
*   ifxwt       - integer weight for fx
*
*   reset       - logical switch
*                = true  : initialize nfxe,fxstat
*                = false : update nfxe,fxstat
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

let fstats = function (fx,ifxwt,reset) {
  let nfxe, nsv
  let fxstat =[]
    if (reset) {
      nfxe = ifxwt
      fxstat[0] = fx
      fxstat[1] = fx
      fxstat[2] = fx
      fxstat[3] = 0
    } else {
      nsv = nfxe
      f1sv = fxstat[0]
      nfxe = nfxe + ifxwt
      fxstat[0] = fxstat[0] + ifxwt * (fx - fxstat[0]) / nfxe
      fxstat[1] = Math.max(fxstat[1], fx)
      fxstat[2] = Math.min(fxstat[2], fx)
      fscale = Math.max(Math.abs(fxstat[1]),Math.abs(fxstat[2]),1)
      fxstat[3] = fscale * Math.sqrt(((nsv-1)*(fxstat[3]/fscale)**2+
                            nsv*((fxstat[0]-f1sv)/fscale)**2+
                            ifxwt*((fx-fxstat[0])/fscale)**2) / (nfxe-1))
    }
    console.log(nfxe,fxstat)
    return 0
  }
  
module.exports = fstats;
