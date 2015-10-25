$(document).ready(function(){
    var ES,
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
        Td;

    function draw() {
        var svgContainer = d3.select(".chart").append("svg").attr("width", 500).attr("height", 500);

        ES = Number($('.ES').val());
        es = Number($('.es').val());
        EI = Number($('.EI').val());
        ei = Number($('.ei').val());
        Em = Number($('.Em').val());
        em = Number($('.em').val());

        Smax = Number($('.Smax').val());
        Smin = Number($('.Smin').val());
        Nmax = Number($('.Nmax').val());
        Nmin = Number($('.Nmin').val());

        TD = Number($('.TD').val());
        Td = Number($('.Td').val());

        var dif;

        if (ES!= 0 || es!= 0){
            dif = ES - es;
        }
        else if (EI != 0 || ei != 0) {
            dif = EI - ei;
        }
        else if (Em != 0 || em != 0) {
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

        // рисуем отверстие
        var hole = svgContainer.append("rect")
            .attr("x", 100)
            .attr("y", 100)
            .attr("width", 50)
            .attr("height", i * TD)
            .attr("stroke-width", 0.75)
            .style("stroke", "#000")
            .style("fill", "#ffff99");

        // рисуем вал
        var shaft = svgContainer.append("rect")
            .attr("x", 200)
            .attr("y", 100 + dif)
            .attr("width", 50)
            .attr("height", i * Td)
            .attr("stroke-width", 0.75)
            .style("stroke", "#000")
            .style("fill", "#999999");

        var lineGroup = svgContainer.append("g")
            .attr("stroke-width", 1.5)
            .attr("stroke", "black");

        var textGroup = svgContainer.append("g")
            .attr("font-family", "arial")
            .attr("font-size", "8pt")
            .attr("font-style", "italic")
            .attr("fill", "red");

        // рисуем линию ES
        var ESline = lineGroup.append("line")
            .attr("x1", 50)
            .attr("y1", 100)
            .attr("x2", 200)
            .attr("y2", 100);

        var EStext = textGroup.append("text")
            .attr("x", 100 - 3)
            .attr("y", 100 - 2)
            .attr("text-anchor", "end")
            .text("ES = " + ES);

        // рисуем линию EI
        var EIline = lineGroup.append("line")
            .attr("x1", 50)
            .attr("y1", 100 + i * TD)
            .attr("x2", 200)
            .attr("y2", 100 + i * TD);

        var EItext = textGroup.append("text")
            .attr("x", 100 - 3)
            .attr("y", 100 + i * TD - 2)
            .attr("text-anchor", "end")
            .text("EI = " + EI);

        // рисуем линию es
        var esline = lineGroup.append("line")
            .attr("x1", 150)
            .attr("y1", 100 + dif)
            .attr("x2", 300)
            .attr("y2", 100 + dif);

        var estext = textGroup.append("text")
            .attr("x", 250 + 3)
            .attr("y", 100 + dif - 2)
            .attr("text-anchor", "start")
            .text("es = " + es);

        // рисуем линию ei
        var eiline = lineGroup.append("line")
            .attr("x1", 150)
            .attr("y1", 100 + dif + i * Td)
            .attr("x2", 300)
            .attr("y2", 100 + dif + i * Td);

        var eitext = textGroup.append("text")
            .attr("x", 250 + 3)
            .attr("y", 100 + dif + i * Td - 2)
            .attr("text-anchor", "start")
            .text("ei = " + ei);

        //Рисуем линию Smax (от ES до ei)
        if (Smax >= 0 && ES >= 0 && ei >= 0) {
            var Smaxtext = textGroup.append("text")
                .attr("x", 180 + 2)
                .attr("y", 100 + dif + i * Td + 50)
                .attr("text-anchor", "start")
                .text("Smax = " + Smax);

            var Smaxline = lineGroup.append("line")
                .attr("x1", 180)
                .attr("y1", 100)
                .attr("x2", 180)
                .attr("y2", 100 + dif + i * Td + 50);

            //Стрелочка верхняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-up"))
                .attr('transform', "translate(" + 180 + "," + (100 + 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");

            //Стрелочка нижняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-down"))
                .attr('transform', "translate(" + 180 + "," + (100 + dif + i * Td - 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");
        }


        //Рисуем линию Smin (от EI до es)
        if (Smin >= 0 && EI >= 0 && es >= 0) {
            var Smintext = textGroup.append("text")
                .attr("x", 185 + 2)
                .attr("y", 100 + dif + i * Td + 25)
                .attr("text-anchor", "start")
                .text("Smin = " + Smin);

            var Sminline = lineGroup.append("line")
                .attr("x1", 185)
                .attr("y1", 100 + i * TD)
                .attr("x2", 185)
                .attr("y2", 100 + dif + i * Td + 25);

            //Стрелочка верхняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-up"))
                .attr('transform', "translate(" + 185 + "," + (100 + i * TD + 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");

            //Стрелочка нижняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-down"))
                .attr('transform', "translate(" + 185 + "," + (100 + dif - 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");
        }

        //Рисуем линию Nmax (от es до EI)
        if (Nmax >= 0 && es >= 0 && EI >= 0) {
            var Nmaxtext = textGroup.append("text")
                .attr("x", 170 - 2)
                .attr("y", 100 - dif + i * TD + 50)
                .attr("text-anchor", "end")
                .text("Nmax = " + Nmax);

            var Nmaxline = lineGroup.append("line")
                .attr("x1", 170)
                .attr("y1", 100 + dif)
                .attr("x2", 170)
                .attr("y2", 100 - dif + i * TD + 50);

            //Стрелочка верхняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-up"))
                .attr('transform', "translate(" + 170 + "," + (100 + dif + 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");

            //Стрелочка нижняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-down"))
                .attr('transform', "translate(" + 170 + "," + (100 + i * TD  - 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");
        }


        //Рисуем линию Nmin (от ei до ES)
        if (Nmin >= 0 && ei >= 0 && ES >= 0) {
            var Nmintext = textGroup.append("text")
                .attr("x", 165 - 2)
                .attr("y", 100 - dif + i * TD + 25)
                .attr("text-anchor", "end")
                .text("Nmin = " + Nmin);

            var Nminline = lineGroup.append("line")
                .attr("x1", 165)
                .attr("y1", 100 + dif + i * Td)
                .attr("x2", 165)
                .attr("y2", 100 - dif + i * TD + 25);

            //Стрелочка верхняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-up"))
                .attr('transform', "translate(" + 165 + "," + (100 + dif + i * Td + 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");

            //Стрелочка нижняя
            lineGroup.append("path")
                .attr("d", d3.svg.symbol().type("triangle-down"))
                .attr('transform', "translate(" + 165 + "," + (100 - 1.5) + ") scale(" + 0.4 + ")")
                .style("fill", "black");
        }


        // Рисуем допуски
        var textTolGroup = svgContainer.append("g")
            .attr("font-family", "arial")
            .attr("font-size", "12pt")
            .attr("font-style", "italic")
            .attr("text-anchor", "middle")
            .attr("fill", "green");

        if (TD != 0 && Td != 0) {
            var TolD = textTolGroup.append("text")
                .attr("x", 125)
                .attr("y", 100 + i * TD / 2 + 6)
                .text(TD);
            var Told = textTolGroup.append("text")
                .attr("x", 225)
                .attr("y", 100 + i * Td / 2 + 6 + dif)
                .text(Td);
        }
    }

    $(".plot").click(function () {
        $('.chart').empty();
        $('.warn').css('visibility', 'hidden');
        if ($('.graph').css('visibility') == 'visible') {
            if ($('.ES').val() && $('.EI').val() && $('.es').val() && $('.ei').val() && $('.TD').val() && $('.Td').val()) {
                draw();
                $('.chart').css('visibility', 'visible');
            } else {
                $('.warn').text('Недостаточно данных для построения диаграммы');
                $('.chart').css('visibility', 'hidden');
                $('.warn').css('visibility', 'visible');
            }
        }
    });
});