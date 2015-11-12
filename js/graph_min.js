$(document).ready(function(){
    var D,
        ES,
        es,
        EI,
        ei,
        Em,
        em,

        Smax,
        Smin,
        Nmax,
        Nmin,

        TD,
        Td,

        QHoleKey,
        QShaftKey,
        zHole,
        zShaft,

        parentChart = $('.chart'),
        warningMessage = $('.warn');

    function draw() {
        // сам svg элемент
        var svgContainer = d3.select(".chart")
            .append("svg");

        // контейнер для элементов, который будем смещать
        var MainGroup = svgContainer.append("g");

        QHoleKey = tol_zones[$('.zone_hole').val()];
        QShaftKey = tol_zones[$('.zone_shaft').val()];
        zHole = $('.qual_hole').val();
        zShaft = $('.qual_shaft').val();

        D = $('.D').val();

        Em = $('.Em').text();
        em = $('.em').text();

        Smax = Number($('.Smax').text());
        Smin = Number($('.Smin').text());
        Nmax = Number($('.Nmax').text());
        Nmin = Number($('.Nmin').text());

        TD = Number($('.TD').text());
        Td = Number($('.Td').text());

        var dif;

        if (ES && es){
            dif = ES - es;
        }
        else if (EI && ei) {
            dif = EI - ei;
        }
        else if (Em && em) {
            dif = Em - em;
        } else dif = 0;

        var DopD = TD,
            Dopd = Td,
            i = 1;

        if (TD != 0 && Td != 0) {
            if (TD < 20 || Td < 20) {
                while ((DopD < 20 && Dopd < 100)|| (Dopd < 20 && DopD < 100)) {
                    Dopd = 2 * Dopd;
                    DopD = 2 * DopD;
                    i = i * 2;
                }
            } else {
                if (TD > 100 || Td > 100) {
                    while ((DopD > 20 && Dopd > 100)|| (Dopd > 20 && DopD > 100)) {
                        Dopd = Dopd / 2;
                        DopD = DopD / 2;
                        i = i * 2;
                    }
                    i = 1 / i;
                }
            }
            dif = i * dif;
        } else {
            TD = 50;
            Td = 50;
        }

        // подгоняем высоту изображения
        var svgHeight = 5 + i * TD + i * Td + Math.abs(dif) + 75;
        // смещаем картину ближе к центру
        var svgTrans;
        if (dif >= 0){
            svgTrans = 5 + 15;
        } else {
            svgTrans = 5 + Math.abs(dif) + 15;
        }

        // расставляем размеры
        var mult = 1.25;

        svgContainer.attr("height", mult * svgHeight);
        MainGroup.attr('transform', "translate(" + 0 + "," + (mult * svgTrans) + ") scale(" + mult + ")");

        //var svgWidth = $("svg").parent().width();
        var svgWidth = 350;
        svgContainer.attr("width", mult * svgWidth);


        // рисуем линии отклонений
        var jsonDevLines = [
            { "x1": 50, "y1": 0, "x2": 200, "y2": 0 },
            { "x1": 50, "y1": i * TD, "x2": 200, "y2": i * TD },
            { "x1": 150, "y1": dif, "x2": 300, "y2": dif },
            { "x1": 150, "y1": dif + i * Td, "x2": 300, "y2": dif + i * Td }
        ];

        var DevLines = MainGroup.selectAll("DevLines")
            .data(jsonDevLines)
            .enter()
            .append("line");

        var DevLinesAttributes = DevLines
            .attr("x1", function (d) { return d.x1; })
            .attr("y1", function (d) { return d.y1; })
            .attr("x2", function (d) { return d.x2; })
            .attr("y2", function (d) { return d.y2; })
            .attr("stroke-width", 1.3)
            .attr("stroke", "black");

        // рисуем значения отклонений
        var jsonDevText = [
            { "x": 100 - 3, "y": 0 - 2, "text_anchor": "end", "txt": "ES = " + ES },
            { "x": 100 - 3, "y": i * TD - 2, "text_anchor": "end", "txt": "EI = " + EI },
            { "x": 250 + 3, "y": dif - 2, "text_anchor": "start", "txt": "es = " + es },
            { "x": 250 + 3, "y": dif + i * Td - 2, "text_anchor": "start", "txt": "ei = " + ei }
        ];

        var DevText = MainGroup.selectAll("DevText")
            .data(jsonDevText)
            .enter()
            .append("text");

        var DevTextAttributes = DevText
            .attr("font-family", "arial")
            .attr("font-size", "8pt")
            .attr("font-style", "regular")
            .attr("fill", "#3c53ab")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("text-anchor", function (d) { return d.text_anchor; })
            .text(function (d) { return d.txt; });


        // рисуем линии зазоров и натягов, их значения и стрелочки
        var jsonClAlLines = [],
            jsonClAlText = [],
            jsonArrows = [];

        // добавление нужных линий
        if (Smax >= 0 && ES && ei) {
            jsonClAlLines.push( { "x1": 180, "y1": 0, "x2": 180, "y2": dif + i * Td + 50 } );
            jsonClAlText.push( { "x": 180 + 2, "y": dif + i * Td + 50, "text_anchor": "start", "txt": "Smax = " + Smax } );
            jsonArrows.push( { "type": "triangle-up", "trans": "translate(" + 180 + "," + (2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
            jsonArrows.push( { "type": "triangle-down", "trans": "translate(" + 180 + "," + (dif + i * Td - 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
        }

        if (Smin >= 0 && EI && es) {
            jsonClAlLines.push( { "x1": 185, "y1": i * TD, "x2": 185, "y2": dif + i * Td + 25 } );
            jsonClAlText.push( { "x": 185 + 2, "y": dif + i * Td + 25, "text_anchor": "start", "txt": "Smin = " + Smin } );
            jsonArrows.push( { "type": "triangle-up", "trans": "translate(" + 185 + "," + (i * TD + 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
            jsonArrows.push( { "type": "triangle-down", "trans": "translate(" + 185 + "," + (dif - 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
        }

        if (Nmax >= 0 && es && EI) {
            jsonClAlLines.push( { "x1": 170, "y1": dif, "x2": 170, "y2": i * TD + 50 } );
            jsonClAlText.push( { "x": 170 - 2, "y": i * TD + 50, "text_anchor": "end", "txt": "Nmax = " + Nmax } );
            jsonArrows.push( { "type": "triangle-up", "trans": "translate(" + 170 + "," + (dif + 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
            jsonArrows.push( { "type": "triangle-down", "trans": "translate(" + 170 + "," + (i * TD  - 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
        }

        if (Nmin >= 0 && ei && ES) {
            jsonClAlLines.push( { "x1": 165, "y1": dif + i * Td, "x2": 165, "y2": i * TD + 25 } );
            jsonClAlText.push( { "x": 165 - 2, "y": i * TD + 25, "text_anchor": "end", "txt": "Nmin = " + Nmin } );
            jsonArrows.push( { "type": "triangle-up", "trans": "translate(" + 165 + "," + (dif + i * Td + 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
            jsonArrows.push( { "type": "triangle-down", "trans": "translate(" + 165 + "," + (- 2.25) + ") scale(" + 0.35 + "," + 0.6 + ")"} );
        }

        // линии зазоров и натягов
        var ClAlLines = MainGroup.selectAll("ClAlLines")
            .data(jsonClAlLines)
            .enter()
            .append("line");

        var ClAlLinesAttributes = ClAlLines
            .attr("x1", function (d) { return d.x1; })
            .attr("y1", function (d) { return d.y1; })
            .attr("x2", function (d) { return d.x2; })
            .attr("y2", function (d) { return d.y2; })
            .attr("stroke-width", 1.25)
            .attr("stroke", "black");

        // значения зазоров и натягов
        var ClAlText = MainGroup.selectAll("ClAlText")
            .data(jsonClAlText)
            .enter()
            .append("text");

        var ClAlTextAttributes = ClAlText
            .attr("font-family", "arial")
            .attr("font-size", "8pt")
            .attr("font-style", "regular")
            .attr("fill", "#3c53ab")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("text-anchor", function (d) { return d.text_anchor; })
            .text(function (d) { return d.txt; });


        // рисуем нулевую линию и номинальный размер
        var jsonZeroLine = [
            { "x1": 0, "y1": i * Number(ES), "x2": 350, "y2": i * Number(ES) }
        ];

        var jsonZeroText = [
            { "x": 2, "y": i * Number(ES) - 2, "text_anchor": "start", "fsz": "10pt", "txt": "0" }
        ];


        // если указан номинальный размер
        if (D){
            var DEnd;
            if (dif >= 0){
                DEnd = i * Td + Math.abs(dif)
            } else {
                DEnd = i * TD + Math.abs(dif)
            }
            if (DEnd <= i * Number(ES)) {
                DEnd = DEnd + i * Number(ES)
            } else {
                DEnd = DEnd + 25
            }
            if (DEnd >= svgHeight - svgTrans) {
                DEnd = svgHeight - svgTrans - 25
            }

            jsonZeroLine.push( { "x1": 15, "y1": i * Number(ES), "x2": 15, "y2": DEnd } );
            jsonZeroText.push( { "x": 15 + 2, "y": DEnd, "text_anchor": "start", "fsz": "15pt", "txt": D } );
            jsonArrows.push( { "type": "triangle-up", "trans": "translate(" + 15 + "," + (i * Number(ES) + 4) + ") scale(" + 0.6 + "," + 1 + ")"} );
        }

        // нулевая линия
        var ZeroLine = MainGroup.selectAll("ZeroLine")
            .data(jsonZeroLine)
            .enter()
            .append("line");

        var ZeroLineAttributes = ZeroLine
            .attr("x1", function (d) { return d.x1; })
            .attr("y1", function (d) { return d.y1; })
            .attr("x2", function (d) { return d.x2; })
            .attr("y2", function (d) { return d.y2; })
            .attr("stroke-width", 1.3)
            .attr("stroke", "black");

        // значения
        var ZeroText = MainGroup.selectAll("ZeroText")
            .data(jsonZeroText)
            .enter()
            .append("text");

        var ZeroTextAttributes = ZeroText
            .attr("font-family", "arial")
            .attr("font-size", function (d) { return d.fsz; })
            .attr("font-style", "regular")
            .attr("fill", "#3c53ab")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("text-anchor", function (d) { return d.text_anchor; })
            .text(function (d) { return d.txt; });

        // стрелочки
        var Arrows = MainGroup.selectAll("Arrow")
            .data(jsonArrows)
            .enter()
            .append("path");

        var ArrowsAttributes = Arrows
            .attr("d", d3.svg.symbol().type(function (d) { return d.type; }) )
            .attr("transform", function (d) { return d.trans; })
            .attr("stroke-width", 1)
            .attr("fill", "black");


        // рисуем отверстие и вал
        var jsonHoleShaft = [
            { "x_axis": 100, "y_axis": 0, "width": 50, "height": i * TD, "color" : "#ffff99" },
            { "x_axis": 200, "y_axis": 0 + dif, "width": 50, "height": i * Td, "color" : "#999999" }
        ];

        var HoleShaft = MainGroup.selectAll("HoleShaft")
            .data(jsonHoleShaft)
            .enter()
            .append("rect");

        var HoleShaftAttributes = HoleShaft
            .attr("x", function (d) { return d.x_axis; })
            .attr("y", function (d) { return d.y_axis; })
            .attr("height", function (d) { return d.height; })
            .attr("width", function (d) { return d.width; })
            .style("fill", function(d) { return d.color; })
            .style("stroke", "#000")
            .attr("stroke-width", 0.75);


        // Рисуем допуски
        var jsonTolText = [];

        if (TD != 0 && Td != 0) {
            jsonTolText.push( { "x": 125, "y": i * TD / 2 + 6, "txt": QHoleKey + zHole });
            jsonTolText.push( { "x": 225, "y": i * Td / 2 + 6 + dif, "txt": QShaftKey + zShaft });
        }

        var TolText = MainGroup.selectAll("TolText")
            .data(jsonTolText)
            .enter()
            .append("text");

        var TolTextAttributes = TolText
            .attr("font-family", "arial")
            .attr("font-size", "12pt")
            .attr("font-style", "regular")
            .attr("text-anchor", "middle")
            .attr("fill", "#600600")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .text(function (d) { return d.txt; });
    }

    function convertToPNG(){
        var svg = d3.select("svg")[0][0],
            img = new Image(),
            serializer = new XMLSerializer(),
            svgStr = serializer.serializeToString(svg),

            svgOrig = $("svg"),

            w = svgOrig.width(),
            h = svgOrig.height();

        img.src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);

        var canvas = document.createElement("canvas");

        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);

        var parentChart = $(".chart");

        parentChart.empty();
        parentChart.append(canvas);
    }

    function warning(){
        parentChart.css('visibility', 'hidden');
        warningMessage.css('visibility', 'visible');
    }

    $(".plot").click(function () {
        parentChart.empty();
        warningMessage.css('visibility', 'hidden');
        if ($('.graph').css('visibility') == 'visible') {
            ES = $('.ES').text();
            es = $('.es').text();
            EI = $('.EI').text();
            ei = $('.ei').text();
            if (ES && EI && es && ei && $('.TD').text() && $('.Td').text()) {
                if ((Number(ES) > Number(EI)) && (Number(es) > Number(ei))){
                    draw();
                    if (navigator.userAgent.search("Firefox") == -1){
                        convertToPNG();
                    }
                } else {
                    warningMessage.text('Невозможно построить диаграмму: данные введены неверно');
                    warning()
                }
                parentChart.css('visibility', 'visible');
            } else {
                warningMessage.text('Недостаточно данных для построения диаграммы');
                warning()
            }
        }
    });
});