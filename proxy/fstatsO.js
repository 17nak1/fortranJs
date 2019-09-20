 
/**
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
// global nfxe,fxstat(4)
let fstats = function (fx,ifxwt,reset) {
    let nsv
    if (reset) {
      nfxe = ifxwt
      fxstat[1] = fx
      fxstat[2] = fx
      fxstat[3] = fx
      fxstat[4] = 0
    } else {
      nsv = nfxe
      f1sv = fxstat[1]
      nfxe = nfxe + ifxwt
      fxstat[1] = fxstat[1] + ifxwt * (fx - fxstat[1]) / nfxe
      fxstat[2] = Math.max(fxstat[2], fx)
      fxstat[3] = Math.min(fxstat[3], fx)
      fscale = Math.max(Math.abs(fxstat[2]),Math.abs(fxstat[3]),1)
      fxstat[4] = fscale * Math.sqrt(((nsv-1)*(fxstat[4]/fscale)**2+
                                       nsv*((fxstat[1]-f1sv)/fscale)**2+
                                       ifxwt*((fx-fxstat[1])/fscale)**2) / (nfxe-1))
    }
    return 
  }
  
module.exports = fstats;