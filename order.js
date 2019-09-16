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
    il0 = il.get()
    j =  il0 + npts * Math.floor(il0 / npts) + 1//Math.mod(il0,npts)+ 1
    if (fs.get(j) >= fs.get(il.get())){
        ih.set(j)
        is.set(il0)
    }        
    else{
        ih.set(il0)
        is.set(j)
        il.set(j)
    }

    for( i =il0 ; i<= il0+npts-2; i++){      
        j = i + npts * Math.floor(i / npts) //Math.mod(i,npts)+1
        if (fs.get(j) >= fs.get(ih)){
          is.set(ih.get())
          ih.set(j.get())
        }
        else if (fs.get(j) > fs.get(is)){
          is.set(j)
        }
        else if (fs.get(j) < fs.get(il)){
          il.set(j)
        }
    }   
}

module.exports = order;
