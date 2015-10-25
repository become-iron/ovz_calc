$(document).ready(function(){
    $(".plot").click(function () {
        if ($('.ES').val() && $('.EI').val() && $('.es').val() && $('.ei').val() && $('.TD').val() && $('.Td').val()) {
            $('.graph').text('');
            $('.graph').append('<canvas id="graph" width="350" height="500"></canvas>');
            var drawingCanvas = document.getElementById('graph');
            if (drawingCanvas && drawingCanvas.getContext) {
                var context = drawingCanvas.getContext('2d');
                context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                context.font = "italic 8pt arial";
                context.textAlign = "right";
                var dif;

                if (Number($('.ES').val()) != 0 || Number($('.es').val()) != 0) {
                    dif = Number($('.ES').val()) - Number($('.es').val());
                }
                else if (Number($('.EI').val()) != 0 || Number($('.ei').val()) != 0) {
                    dif = Number($('.EI').val()) - Number($('.ei').val());
                }
                else if (Number($('.Em').val()) != 0 || Number($('.em').val()) != 0) {
                    dif = Number($('.Em').val()) - Number($('.em').val());
                } else dif = 0;

                var TD = Number($('.TD').val()),
                    Td = Number($('.Td').val());

                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        var DopD = TD,
                            Dopd = Td;
                        var i = 1;
                        while (DopD < 20 || Dopd < 20) {
                            Dopd = 2 * Dopd;
                            DopD = 2 * DopD;
                            i = i * 2;
                        }
                        dif = i * dif;
                    }
                }


                // Рисуем отверстие
                context.strokeStyle = "#000";
                context.fillStyle = "#ffff99";
                context.beginPath();
                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.rect(100, 100, 50, i * TD);
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
                        context.rect(200, 100 + dif, 50, i * Td);
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

                //Рисуем линию EI
                context.beginPath();
                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.moveTo(50, 100 + i * TD);
                        context.lineTo(200, 100 + i * TD);
                        context.fillText("EI", 100 - 3, 100 + i * TD - 2);
                    } else {
                        context.moveTo(50, 100 + TD);
                        context.lineTo(200, 100 + TD);
                        context.fillText("EI", 100 - 3, 100 + TD - 2);
                    }
                } else {
                    context.moveTo(50, 100 + 50);
                    context.lineTo(200, 100 + 50);
                    context.fillText("EI", 100 - 3, 100 + 50 - 2);
                }
                context.stroke();

                context.textAlign = "left";

                //Рисуем линию es
                context.beginPath();
                context.moveTo(150, 100 + dif);
                context.lineTo(300, 100 + dif);
                context.fillText("es", 250 + 3, 100 + dif - 2);
                context.stroke();

                //Рисуем линию ei
                context.beginPath();
                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.moveTo(150, 100 + dif + i * Td);
                        context.lineTo(300, 100 + dif + i * Td);
                        context.fillText("ei", 250 + 3, 100 + dif + i * Td - 2);
                    } else {
                        context.moveTo(150, 100 + dif + Td);
                        context.lineTo(300, 100 + dif + Td);
                        context.fillText("ei", 250 + 3, 100 + dif + Td - 2);
                    }
                } else {
                    context.moveTo(150, 100 + dif + 50);
                    context.lineTo(300, 100 + dif + 50);
                    context.fillText("ei", 250 + 3, 100 + dif + 50 - 2);
                }
                context.stroke();


                //Рисуем линию Smax (от ES до ei)
                if (Number($('.Smax').val()) >= 0 && $('.ES').val() && $('.ei').val()) {
                    context.beginPath();
                    context.moveTo(180, 100);
                    context.lineTo(180, 100 + 250);
                    context.fillText("Smax = " + $('.Smax').val(), 180 + 2, 100 + 250);
                    //Стрелочка верхняя
                    context.moveTo(180, 100);
                    context.lineTo(180 + 2, 100 + 5);
                    context.moveTo(180, 100);
                    context.lineTo(180 - 2, 100 + 5);
                    //Стрелочка нижняя
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(180, 100 + dif + i * Td);
                            context.lineTo(180 + 2, 100 + dif + i * Td - 5);
                            context.moveTo(180, 100 + dif + i * Td);
                            context.lineTo(180 - 2, 100 + dif + i * Td - 5);
                        } else {
                            context.moveTo(180, 100 + dif + Td);
                            context.lineTo(180 + 2, 100 + dif + Td - 5);
                            context.moveTo(180, 100 + dif + Td);
                            context.lineTo(180 - 2, 100 + dif + Td - 5);
                        }
                    } else {
                        context.moveTo(180, 100 + dif + 50);
                        context.lineTo(180 + 2, 100 + dif + 50 - 5);
                        context.moveTo(180, 100 + dif + 50);
                        context.lineTo(180 - 2, 100 + dif + 50 - 5);
                    }
                    context.stroke();
                }


                //Рисуем линию Smin (от EI до es)
                if (Number($('.Smin').val() >= 0 && $('.EI').val() && $('.es').val())) {
                    context.beginPath();
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(185, 100 + i * TD);
                        } else {
                            context.moveTo(185, 100 + TD);
                        }
                    } else {
                        context.moveTo(185, 100 + 50);
                    }
                    context.lineTo(185, 100 + 225);
                    context.fillText("Smin = " + $('.Smin').val(), 185 + 2, 100 + 225);
                    //Стрелочка верхняя
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(185, 100 + i * TD);
                            context.lineTo(185 + 2, 100 + i * TD + 5);
                            context.moveTo(185, 100 + i * TD);
                            context.lineTo(185 - 2, 100 + i * TD + 5);
                        } else {
                            context.moveTo(185, 100 + TD);
                            context.lineTo(185 + 2, 100 + TD + 5);
                            context.moveTo(185, 100 + TD);
                            context.lineTo(185 - 2, 100 + TD + 5);
                        }
                    } else {
                        context.moveTo(185, 100 + 50);
                        context.lineTo(185 + 2, 100 + 50 + 5);
                        context.moveTo(185, 100 + 50);
                        context.lineTo(185 - 2, 100 + 50 + 5);
                    }
                    //Стрелочка нижняя
                    context.moveTo(185, 100 + dif);
                    context.lineTo(185 + 2, 100 + dif - 5);
                    context.moveTo(185, 100 + dif);
                    context.lineTo(185 - 2, 100 + dif - 5);
                    context.stroke();
                }

                context.textAlign = "right";

                //Рисуем линию Nmax (от es до EI)
                if (Number($('.Nmax').val() >= 0 && $('.es').val() && $('.EI').val())) {
                    context.beginPath();
                    context.moveTo(170, 100 + dif);
                    context.lineTo(170, 100 + 250);
                    context.fillText("Nmax = " + $('.Nmax').val(), 170 - 2, 100 + 250);
                    //Стрелочка верхняя
                    context.moveTo(170, 100 + dif);
                    context.lineTo(170 + 2, 100 + dif + 5);
                    context.moveTo(170, 100 + dif);
                    context.lineTo(170 - 2, 100 + dif + 5);
                    //Стрелочка нижняя
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(170, 100 + i * TD);
                            context.lineTo(170 + 2, 100 + i * TD - 5);
                            context.moveTo(170, 100 + i * TD);
                            context.lineTo(170 - 2, 100 + i * TD - 5);
                        } else {
                            context.moveTo(170, 100 + TD);
                            context.lineTo(170 + 2, 100 + TD - 5);
                            context.moveTo(170, 100 + TD);
                            context.lineTo(170 - 2, 100 + TD - 5);
                        }
                    } else {
                        context.moveTo(170, 100 + 50);
                        context.lineTo(170 + 2, 100 + 50 - 5);
                        context.moveTo(170, 100 + 50);
                        context.lineTo(170 - 2, 100 + 50 - 5);
                    }
                    context.stroke();
                }


                //Рисуем линию Nmin (от ei до ES)
                if (Number($('.Nmin').val() >= 0 && $('.ei').val() && $('.ES').val())) {
                    context.beginPath();
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(165, 100 + dif + i * Td);
                        } else {
                            context.moveTo(165, 100 + dif + Td);
                        }
                    } else {
                        context.moveTo(165, 100 + dif + 50);
                    }
                    context.lineTo(165, 100 + 225);
                    context.fillText("Nmin = " + $('.Nmin').val(), 165 - 2, 100 + 225);
                    //Стрелочка верхняя
                    if (TD != 0 && Td != 0) {
                        if (TD < 20 || Td < 20) {
                            context.moveTo(165, 100 + dif + i * Td);
                            context.lineTo(165 + 2, 100 + dif + i * Td + 5);
                            context.moveTo(165, 100 + dif + i * Td);
                            context.lineTo(165 - 2, 100 + dif + i * Td + 5);
                        } else {
                            context.moveTo(165, 100 + dif + Td);
                            context.lineTo(165 + 2, 100 + dif + Td + 5);
                            context.moveTo(165, 100 + dif + Td);
                            context.lineTo(165 - 2, 100 + dif + Td + 5);
                        }
                    } else {
                        context.moveTo(165, 100 + dif + 50);
                        context.lineTo(165 + 2, 100 + dif + 50 + 5);
                        context.moveTo(165, 100 + dif + 50);
                        context.lineTo(165 - 2, 100 + dif + 50 + 5);
                    }
                    //Стрелочка нижняя
                    context.moveTo(165, 100);
                    context.lineTo(165 + 2, 100 - 5);
                    context.moveTo(165, 100);
                    context.lineTo(165 - 2, 100 - 5);
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
                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.fillText($('.EI').val(), 47, 100 + i * TD + 4);
                    } else {
                        context.fillText($('.EI').val(), 47, 100 + TD + 4);
                    }
                } else {
                    context.fillText($('.EI').val(), 47, 100 + 50 + 4);
                }
                //context.fillText($('.Em').val(), 47, 100 + 50 / 2 + 4);

                context.textAlign = "left";
                context.fillText($('.es').val(), 302, 100 + dif + 4);
                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.fillText($('.ei').val(), 302, 100 + dif + i * Td + 4);
                    } else {
                        context.fillText($('.ei').val(), 302, 100 + dif + Td + 4);
                    }
                } else {
                    context.fillText($('.ei').val(), 302, 100 + dif + 50 + 4);
                }
                //context.fillText($('.em').val(), 302, 100 + dif + 50 / 2 + 4);


                // Рисуем допуски
                context.fillStyle = "green";
                context.font = "normal 12pt arial";
                context.textAlign = "center";

                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.fillText(TD, 125, 100 + i * TD / 2 + 6);
                    } else {
                        context.fillText(TD, 125, 100 + TD / 2 + 6);
                    }
                }

                if (TD != 0 && Td != 0) {
                    if (TD < 20 || Td < 20) {
                        context.fillText(Td, 225, 100 + i * Td / 2 + 6 + dif);
                    } else {
                        context.fillText(Td, 225, 100 + Td / 2 + 6 + dif);
                    }
                }
            }
        } else {
            $('.graph').text('Недостаточно данных для построения диаграммы');
            }
    });
});