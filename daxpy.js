
// c     constant times a vector plus a vector. y = a*x + y

function daxpy(n,da,dx,incx,dy,incy) {
  if(n <= 0) return 0
  if (da === 0) return 0
  if(incx === 1 && incy === 1) {
    m = n- 4 * Math.floor(n / 4)
    if( m === 0 ) {
      mp1 = m + 1
      for (let i = mp1 - 1; i < n; i +=4) {
        dy[i] = dy[i] + da*dx[i]
        dy[i + 1] = dy[i + 1] + da*dx[i + 1]
        dy[i + 2] = dy[i + 2] + da*dx[i + 2]
        dy[i + 3] = dy[i + 3] + da*dx[i + 3]
      }
      return dy
    } else {
      for (let i = 0; i < m; i++) {
        dy[i] = dy[i] + da*dx[i]
      }
      if( n < 4 ) return dy
      }
  } else {
    ix = 0
    iy = 0
    if(incx < 0) {
      ix = (-n+1)*incx + 1
    }
    if(incy < 0) {
      iy = (-n+1)*incy + 1
    }
    for (let i = 1; i <= n; i++) {
      dy[iy] = dy[iy] + da*dx[ix]
      ix = ix + incx
      iy = iy + incy
    }
  }
  return dy
}

console.log(daxpy(2,1,[2,4],1, [2,2],1))