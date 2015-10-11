$(document).ready(function(){
    $(".plot").click(function () {
        var drawingCanvas = document.getElementById('graph');
        if (drawingCanvas && drawingCanvas.getContext) {
            var context = drawingCanvas.getContext('2d');
            context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            context.font = "italic 8pt arial";
            context.textAlign = "right";

            TD = Number($('.TD').val());
            Td = Number($('.Td').val());

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    DopD = TD;
                    Dopd = Td;
                    i = 1;
                    while (DopD < 20 || Dopd < 20) {
                        Dopd = 2 * Dopd;
                        DopD = 2 * DopD;
                        i = i * 2;
                    }
                }
            }

            if (Number($('.ES').val()) != 0 || Number($('.es').val()) != 0) {
                dif = Number($('.ES').val()) - Number($('.es').val());
            }
            else if (Number($('.EI').val()) != 0 || Number($('.ei').val()) != 0) {
                dif = Number($('.EI').val()) - Number($('.ei').val());
            }
            else if (Number($('.Em').val()) != 0 || Number($('.em').val()) != 0) {
                dif = Number($('.Em').val()) - Number($('.em').val());
            } else dif = 0;


            // Рисуем отверстие
            context.strokeStyle = "#000";
            context.fillStyle = "#ffff99";
            context.beginPath();
            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    context.rect(100, 100, 50, i*TD);
                } else {
                    context.rect(100, 100, 50, TD);
                }
            } else {
                context.rect(100, 100, 50, 50);
            }
            context.closePath();
            context.stroke();
            context.fill();


            // Рисуем вал
            context.strokeStyle = "#000";
            context.fillStyle = "#999999";
            context.beginPath();

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    context.rect(200, 100 + dif, 50, i*Td);
                } else {
                    context.rect(200, 100 + dif, 50, Td);
                }
            } else {
                context.rect(200, 100 + dif, 50, 50);
            }
            context.closePath();
            context.stroke();
            context.fill();


            context.fillStyle = "red";

            //Рисуем линию ES
            context.beginPath();
            context.moveTo(50, 100);
            context.lineTo(200, 100);
            context.fillText("ES", 100 - 3, 100 - 2);
            context.stroke();

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    //Рисуем линию EI
                    context.beginPath();
                    context.moveTo(50, 100 + i*TD);
                    context.lineTo(200, 100 + i*TD);
                    context.fillText("EI", 100 - 3, 100 + i*TD - 2);
                    context.stroke();

                    //Рисуем линию Em
                    context.beginPath();
                    context.moveTo(50, 100 + i*TD / 2);
                    context.lineTo(200, 100 + i*TD / 2);
                    context.fillText("Em", 100 - 3, 100 + i*TD / 2 - 2);
                    context.stroke();
                } else{
                    //Рисуем линию EI
                    context.beginPath();
                    context.moveTo(50, 100 + TD);
                    context.lineTo(200, 100 + TD);
                    context.fillText("EI", 100 - 3, 100 + TD - 2);
                    context.stroke();

                    //Рисуем линию Em
                    context.beginPath();
                    context.moveTo(50, 100 + TD / 2);
                    context.lineTo(200, 100 + TD / 2);
                    context.fillText("Em", 100 - 3, 100 + TD / 2 - 2);
                    context.stroke();
                }
            } else {
                //Рисуем линию EI
                context.beginPath();
                context.moveTo(50, 100 + 50);
                context.lineTo(200, 100 + 50);
                context.fillText("EI", 100 - 3, 100 + 50 - 2);
                context.stroke();

                //Рисуем линию Em
                context.beginPath();
                context.moveTo(50, 100 + 50 / 2);
                context.lineTo(200, 100 + 50 / 2);
                context.fillText("Em", 100 - 3, 100 + 50 / 2 - 2);
                context.stroke();
            }

            context.textAlign = "left";

            //Рисуем линию es
            context.beginPath();
            context.moveTo(150, 100 + dif);
            context.lineTo(300, 100 + dif);
            context.fillText("es", 250 + 3, 100 + dif - 2);
            context.stroke();

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    //Рисуем линию ei
                    context.beginPath();
                    context.moveTo(150, 100 + dif + i*Td);
                    context.lineTo(300, 100 + dif + i*Td);
                    context.fillText("ei", 250 + 3, 100 + dif + i*Td - 2);
                    context.stroke();

                    //Рисуем линию em
                    context.beginPath();
                    context.moveTo(150, 100 + dif + i*Td / 2);
                    context.lineTo(300, 100 + dif + i*Td / 2);
                    context.fillText("em", 250 + 3, 100 + dif + i*Td / 2 - 2);
                    context.stroke();
                } else{
                    //Рисуем линию ei
                    context.beginPath();
                    context.moveTo(150, 100 + dif + Td);
                    context.lineTo(300, 100 + dif + Td);
                    context.fillText("ei", 250 + 3, 100 + dif + Td - 2);
                    context.stroke();

                    //Рисуем линию em
                    context.beginPath();
                    context.moveTo(150, 100 + dif + Td / 2);
                    context.lineTo(300, 100 + dif + Td / 2);
                    context.fillText("em", 250 + 3, 100 + dif + Td / 2 - 2);
                    context.stroke();
                }
            } else {
                //Рисуем линию ei
                context.beginPath();
                context.moveTo(150, 100 + dif + 50);
                context.lineTo(300, 100 + dif + 50);
                context.fillText("ei", 250 + 3, 100 + dif + 50 - 2);
                context.stroke();

                //Рисуем линию em
                context.beginPath();
                context.moveTo(150, 100 + dif + 50 / 2);
                context.lineTo(300, 100 + dif + 50 / 2);
                context.fillText("em", 250 + 3, 100 + dif + 50 / 2 - 2);
                context.stroke();
            }


            // Рисуем ось y
            context.beginPath();
            context.moveTo(50, 0);
            context.lineTo(50, 500);
            context.moveTo(300, 0);
            context.lineTo(300, 500);
            context.stroke();

            // Рисуем деления на оси y
            context.fillStyle = "blue";
            context.textAlign = "right";
            context.fillText($('.ES').val(), 47, 100 + 4);
            context.fillText($('.EI').val(), 47, 100 + 50 + 4);
            context.fillText($('.Em').val(), 47, 100 + 50 / 2 + 4);
            context.textAlign = "left";
            context.fillText($('.es').val(), 302, 100 + dif + 4);
            context.fillText($('.ei').val(), 302, 100 + dif + 50 + 4);
            context.fillText($('.em').val(), 302, 100 + dif + 50 / 2 + 4);


            // Рисуем допуски
            context.fillStyle = "green";
            context.font = "normal 12pt arial";
            context.textAlign = "center";

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    context.fillText(TD, 125, 100 + i*TD / 2 + 6);
                } else {
                    context.fillText(TD, 125, 100 + TD / 2 + 6);
                }
            } else {
                context.fillText(TD, 125, 100 + 25 + 6);
            }

            if (TD != 0 && Td != 0) {
                if (TD < 20 || Td < 20) {
                    context.fillText(Td, 225, 100 + i*Td / 2 + 6 + dif);
                } else {
                    context.fillText(Td, 225, 100 + Td / 2 + 6 + dif);
                }
            } else {
                context.fillText(Td, 225, 100 + 25 + 6 + dif);
            }
        }
    });
});