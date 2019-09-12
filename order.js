/*
*  @file         order.js
*                order determines the indices of the vertices with the
*                lowest, second highest, and highest function values.
*
*  @inputs
*   npts   - number of points in simplex
*
*   fs     - double precision vector of function values of
*            simplex
*
*   il     - index to vertex with lowest function value
*
*  @output
*
*   il     - new index to vertex with lowest function value
*
*   is     - new index to vertex with second highest
*            function value
*
*   ih     - new index to vertex with highest function value
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

let order  = function(npts,fs,il,is,ih){
    let i,il0,j
    il0 = il
    j = il0 + npts * Math.floor(il0 / npts) + 1//Math.mod(il0,npts) + 1
    if (fs[j] >= fs[il]){
        ih = j
        is = il0
    }        
    else{
        ih = il0
        is = j
        il = j
    }

    for( i =il0 ; i< il0+npts-1; i++){      
        j = i + npts * Math.floor(i / npts) //Math.mod(i,npts)+1
        if (fs[j] >= fs[ih]){
          is = ih
          ih = j
        }
        else if (fs[j] > fs[is]){
          is = j
        }
        else if (fs[j] < fs[il]){
          il = j
        }
    }   
}

module.exports = order;
