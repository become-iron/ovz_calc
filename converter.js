$(document).ready(function() {
    //// Create an export button
    //d3.select("body")
    //    .append("button")
    //    .html("Export")
    //    .on("click", svgToCanvas);
    //
    //// Create the export function - this will just export
    //// the first svg element it finds
    //function svgToCanvas() {
    $(".plot").click(function (){
    // Select the first svg element
        var svg = d3.select("svg")[0][0],
            img = new Image(),
            serializer = new XMLSerializer(),
            svgStr = serializer.serializeToString(svg);

        var svgOrig = $("svg");

        var w = svgOrig.width(), // or whatever your svg width is
            h = svgOrig.height();

        img.src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);

        // You could also use the actual string without base64 encoding it:
        //img.src = "data:image/svg+xml;utf8," + svgStr;

        var canvas = document.createElement("canvas");

        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);

        var parentChart = $(".chart");

        parentChart.empty();
        parentChart.append(canvas);
    });
});