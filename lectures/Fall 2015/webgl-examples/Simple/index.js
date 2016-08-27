(function() {
    "use strict";
    /*global window,document,Float32Array,createProgram*/

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("experimental-webgl");

    var points = new Float32Array([
        -0.5, -0.5,   0.5, -0.5,
         0.5,  0.5,   0.5,  0.5,
        -0.5,  0.5,  -0.5, -0.5
    ]);


    var buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, points, context.STATIC_DRAW);

    var vs = "attribute vec4 vPosition;" +
        "void main(void) { gl_Position = vPosition; }";
    var fs = "void main(void) { gl_FragColor = vec4(1.0); }";
    var program = createProgram(context, vs, fs, message);  // Helper; not part of WebGL
    context.useProgram(program);

    var loc = context.getAttribLocation(program, "vPosition");
    context.enableVertexAttribArray(loc);
    context.vertexAttribPointer(loc, 2, context.FLOAT, false, 0, 0);

    context.clearColor(0.0, 0.0, 0.0, 1.0);


    (function animate() {
        context.clear(context.COLOR_BUFFER_BIT);
        context.drawArrays(context.TRIANGLES, 0, 6);
        window.requestAnimFrame(animate);
    })();
}());