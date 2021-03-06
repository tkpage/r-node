/*
  Copyright 2010 Jamie Love. All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are
  permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice, this list of
        conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright notice, this list
        of conditions and the following disclaimer in the documentation and/or other materials
        provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY JAMIE LOVE ``AS IS'' AND ANY EXPRESS OR IMPLIED
  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JAMIE LOVE OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  The views and conclusions contained in the software and documentation are those of the
  authors and should not be interpreted as representing official policies, either expressed
  or implied, of Jamie Love.
*/

/**
 * Lines
 */

rnode.graph.LinesDefault = RNodeCore.extend (rnode.graph.Graph, {

    requiresPreviousGraph: true,

    constructor: function () {
        rnode.graph.LinesDefault.superclass.constructor.call (this);
    },


    plot: function (target, d, config) {
        // does not get implemented.
        throw new Error ('rnode.graph.LinesDefault requires a previous graph.');
    },

    plotOver: function (visInfo, d, config) {

        var yDataToGraph = d.find('y');
        var dataToGraph = [];

        if (yDataToGraph == null) {
            yDataToGraph = d.find('x');
            counter = 0;
            yDataToGraph.forEach (function (y) { dataToGraph.push ( { x: counter++, y: y } ); });
        } else {
            var xDataToGraph = d.find('x');
            counter = 0;
            yDataToGraph.forEach (function (y) { dataToGraph.push ( { x: xDataToGraph[counter++], y: y } ); });
        }

        var col = d.find ('color')  || 'black';

        visInfo.root.add (pv.Line)
            .data (dataToGraph)
            .bottom (function (d) { return visInfo.yscale(d.y); })
            .left (function (d) { return visInfo.xscale (d.x); })
            .strokeStyle (col)
            ;
    }
});


rnode.graph.Graph.register ('lines.default', rnode.graph.LinesDefault);


