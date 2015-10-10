$(document).ready(function(){

    $(".plot").click(function(){
        var drawingCanvas = document.getElementById('graph');
        if(drawingCanvas && drawingCanvas.getContext) {
            var context = drawingCanvas.getContext('2d');
            context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            context.font = "italic 10pt arial";

            dif = Number($('.Dmax').val());

            //// Рисуем ось
            //context.beginPath();
            //context.moveTo(0, 100);
            //context.lineTo(500, 100);
            //context.stroke();

            // Рисуем отверстие
            context.strokeStyle = "#000";
            context.fillStyle = "#ffff99";
            context.beginPath();
            context.rect(100, 100, 50, 50);
            context.closePath();
            context.stroke();
            context.fill();

            // Рисуем вал
            context.strokeStyle = "#000";
            context.fillStyle = "#999999";
            context.beginPath();
            context.rect(200, 100 + dif, 50, 50);
            context.closePath();
            context.stroke();
            context.fill();

            //Рисуем линию ES
            context.beginPath();
            context.moveTo(25, 100);
            context.lineTo(300, 100);
            context.fillStyle = "red";
            context.fillText("ES", 100 - 25, 100 - 2);
            context.stroke();

            //Рисуем линию EI
            context.beginPath();
            context.moveTo(25, 100 + 50);
            context.lineTo(300, 100 + 50);
            context.fillStyle = "red";
            context.fillText("EI", 100 - 25, 100 + 50 - 2);
            context.stroke();

            //Рисуем линию Em
            context.beginPath();
            context.moveTo(25, 100 + 50/2);
            context.lineTo(300, 100 + 50/2);
            context.fillStyle = "red";
            context.fillText("Em", 100 - 25, 100 + 50/2 - 2);
            context.stroke();

            //Рисуем линию es
            context.beginPath();
            context.moveTo(25, 100 + dif);
            context.lineTo(300, 100 + dif);
            context.fillStyle = "red";
            context.fillText("es", 200 - 25, 100 + dif - 2);
            context.stroke();

            //Рисуем линию ei
            context.beginPath();
            context.moveTo(25, 100 + dif + 50);
            context.lineTo(300, 100 + dif + 50);
            context.fillStyle = "red";
            context.fillText("ei", 200 - 25, 100 + dif + 50 - 2);
            context.stroke();

            //Рисуем линию em
            context.beginPath();
            context.moveTo(25, 100 + dif + 50/2);
            context.lineTo(300, 100 + dif + 50/2);
            context.fillStyle = "red";
            context.fillText("em", 200 - 25, 100 + dif + 50/2 - 2);
            context.stroke();

            // Рисуем ось y
            context.beginPath();
            context.moveTo(25, 0);
            context.lineTo(25, 500);
            context.stroke();

            // Рисуем деления на оси y
            context.fillStyle = "red";
            context.textAlign = "right";
            context.fillText(dif, 22, 100);
            context.stroke();
        }
    });
});