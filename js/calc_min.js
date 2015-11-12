$(document).ready(function() {

    var
        // величины, формулы их расчёта и описания
        // "выв" — выведенная формула
        // выведены далеко не все формулы
        inputs = [
            //['D', 'Номинальный размер', ['Dmax - ES']],
            ['Dmax', 'Наиб. пред. размер отверстия', ['ES + D', 'TD + Dmin']],  // выв
            ['Dmin', 'Наим. пред. размер отверстия', ['EI + D', 'Dmax - TD']],  // выв
            ['Dm', 'Средний размер отверстия', ['Em + D', '( Dmax + Dmin ) / 2']],  // выв
            ['dmax', 'Наиб. пред. размер вала', ['es + D', 'Td + dmin']],  // выв
            ['dmin', 'Наим. пред. размер вала', ['ei + D', 'dmax - Td']],  // выв
            ['dm', 'Средний размер вала', ['em + D', '( dmax + dmin ) / 2']],  // выв
            ['ES', 'Верхнее отклонение отверстия', ['Dmax - D']],
            ['EI', 'Нижнее отклонение отверстия', ['Dmin - D']],
            ['Em', 'Среднее отклонение отверстия', ['Dm - D', '( ES + EI ) / 2'/*выв*/]],
            ['es', 'Верхнее отклонение вала', ['dmax - D']],
            ['ei', 'Нижнее отклонение вала', ['dmin - D']],
            ['em', 'Среднее отклонение вала', ['dm - D', '( es + ei ) / 2'/*выв*/]],
            ['Smax', 'Наиб. гарант. зазор', ['Dmax - dmin', 'ES - ei', '- Nmin'/*выв*/, 'Smin + Ts']],
            ['Smin', 'Наим. гарант. зазор', ['Dmin - dmax', 'EI - es', '- Nmax'/*выв*/, 'Smax - Ts']],
            ['Sm', 'Средний (наиб. вер.) зазор', ['Dm - dm', 'Em - em', '( Smax + Smin ) / 2', '- Nm'/*выв*/]],
            ['Nmax', 'Наиб. гарант. натяг', ['dmax - Dmin',  'es - EI', '- Smin']],
            ['Nmin', 'Наим. гарант. натяг', ['dmin - Dmax', 'ei - ES', '- Smax']],
            ['Nm', 'Средний (наиб. вер.) натяг', ['dm - Dm', 'em - Em', '( Nmax + Nmin ) / 2'/*выв*/, '- Sm']],
            ['TD', 'Допуск отверстия', ['Dmax - Dmin', 'ES - EI'/*выв*/]],
            ['Td', 'Допуск вала', ['dmax - dmin', 'es - ei'/*выв*/]],
            ['Ts', 'Допуск зазора (посадки)', ['Smax - Smin', 'TD - Td']],
            ['TN', 'Допуск натяга (посадки)', ['Nmax - Nmin', 'TD - Td']]
        ],

        add_fields = [['fit', 'Посадка:', 'неизвестна'], ['sys_fit', 'Cистема:', 'неизвестна']],
        nmFldQualHole = '.qual_hole',
        nmFldQualShaft = '.qual_shaft',
        nmFldZoneHole = '.zone_hole',
        nmFldZoneShaft = '.zone_shaft',
        fields = [
            // ATTENTION порядок в списке используется для порядка вывода
            ['qual ' + nmFldQualHole.slice(1), 'Квалитет отверстия'],
            ['tol_zone ' + nmFldZoneHole.slice(1), 'Поле допуска отверстия'],
            ['qual ' + nmFldQualShaft.slice(1), 'Квалитет вала'],
            ['tol_zone ' + nmFldZoneShaft.slice(1), 'Поле допуска вала']
        ],

        fieldName,
        code = '',
        i;


    // ГЕНЕРАЦИЯ ПОЛЕЙ
    code +=
        '<tr>' +
        '<td>D</td>' +
        '<td><input type="number" min="1" max="500" step="1" class="D form-control input-sm"></td>' +
        //'<td>Номинальный размер</td>' +
        '</tr>';
    for (var k = 0; k < fields.length; k++) {
        code +=
            '<tr>' +
            '<td>' + fields[k][1] + '</td>' +
            '<td><select class="' + fields[k][0] + ' form-control input-sm"></select></td>' +
            //'<td>' + fields[k][1] + '</td>' +
            '</tr>'
    }
    for (var i = 0; i < inputs.length; ++i) {
        code +=
            '<tr>' +
            '<td>' + inputs[i][0] + '</td>' +
            '<td><div class="' + inputs[i][0] + '"></td>' +
            //'<td>' + inputs[i][1] + '</td>' +
            //'<td>' + inputs[i][2] + '</td>' +
            '</tr>';
    }
    for (var j = 0; j < add_fields.length; j++) {
        code +=
            '<tr>' +
            '<td>' + add_fields[j][1] + '</td>' +
            '<td><div class="' + add_fields[j][0] + '">' + add_fields[j][2] + '</div></td>' +
            '</tr>';
    }
    $('table').append(code);

    // добавляем квалитеты
    $(nmFldZoneHole).prop("disabled", true);
    $(nmFldZoneShaft).prop("disabled", true);
    for (var key in qualitets) {
        if (qualitets.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            $(nmFldQualHole).append($('<option value="' + key + '">' + qualitets[key] + '</option>'));
            $(nmFldQualShaft).append($('<option value="' + key + '">' + qualitets[key] + '</option>'));
        }
    }




    function discover_nom_zone() {
        // определение области номинального размера
        var valNomField = Number($('.D').val()),
            keyNomZone;  // код предела номинального размера
        for (i = 0; i < nom_zones.length; i++) {
            if (nom_zones[i][0] < valNomField && valNomField <= nom_zones[i][1]) {
                keyNomZone = nom_zones[i][2];
                break;
            }
            else if (valNomField == 1) {
                keyNomZone = 0;
                break;
            }
        }
        return keyNomZone;
    }


    function select_tol_zones(mark) {
        // добавить значения пределов отклонений в выпадающий список
        // TODO разрулить этот бардак
        var keyNomZone = discover_nom_zone();

        if (mark === 0) {
            var valQualHole = $(nmFldQualHole).val(),
                listHoleZones = [];
            for (i = 0; i < variations.length; i++) {
                if (variations[i][0] == 0 &&  // отверстие
                    variations[i][1] == keyNomZone &&
                    variations[i][2] == valQualHole &&
                    listHoleZones.indexOf(variations[i][3]) == -1  // нет ли уже этой зоны в массиве
                ) {
                    listHoleZones.push(variations[i][3]);
                }
            }
            $(nmFldZoneHole).empty();
            if (listHoleZones.length > 0) {
                $(nmFldZoneHole).append($('<option value="100">—</option>'));
                for (i = 0; i < listHoleZones.length; i++) {
                    $(nmFldZoneHole).append($('<option value="' + listHoleZones[i] + '">' + tol_zones[listHoleZones[i]] + '</option>'));
                    $(nmFldZoneHole).prop("disabled", false);
                }
            }
            else {$(nmFldZoneHole).prop("disabled", true);}
        }

        else if (mark === 1) {
            var valQualShaft = $(nmFldQualShaft).val(),
                listShaftZones = [];
            for (var i = 0; i < variations.length; i++) {
                if (variations[i][0] == 1 &&  // вал
                    variations[i][1] == keyNomZone &&
                    variations[i][2] == valQualShaft &&
                    listShaftZones.indexOf(variations[i][3]) == -1
                ) {
                    listShaftZones.push(variations[i][3]);
                }
            }
            $(nmFldZoneShaft).empty();
            if (listShaftZones.length > 0) {
                $(nmFldZoneShaft).append($('<option value="100">—</option>'));
                for (i = 0; i < listShaftZones.length; i++) {
                    $(nmFldZoneShaft).append($('<option value="' + listShaftZones[i] + '">' + tol_zones[listShaftZones[i]] + '</option>'));
                    $(nmFldZoneShaft).prop("disabled", false);
                }
            }
            else {
                $(nmFldZoneShaft).prop("disabled", true);
            }
        }
    }


    // выбор квалитета
    $(nmFldQualHole).change( function() {
        select_tol_zones(0);
    });
    $(nmFldQualShaft).change( function() {
        select_tol_zones(1);
    });

    // выбор поля допуска
    $('.tol_zone').change( function() {
        var valQualHole = Number( $('.qual_hole :selected').val() ),
            valQualShaft = Number( $('.qual_shaft :selected').val() ),
            valTolZoneHole = Number( $('.zone_hole :selected').val() ),
            valTolZoneShaft = Number( $('.zone_shaft :selected').val() ),
            keyNomZone = discover_nom_zone();
        if (valQualHole > 0) {
            for (i = 0; i < variations.length; i++) {
                if (variations[i][0] == 0 &&
                    variations[i][1] == keyNomZone &&
                    variations[i][2] == valQualHole &&
                    variations[i][3] == valTolZoneHole) {
                    // TODO если не будет искомого элемента, может вернуться что-то странное, наверное
                    $('.ES').text(variations[i][4][0] / 1000);  // делим на 1000 для перевода в мкм
                    $('.EI').text(variations[i][4][1] / 1000);
                    break;
                }
            }
        }
        if (valQualShaft > 0) {
            for (i = 0; i < variations.length; i++) {
                if (variations[i][0] == 1 &&
                    variations[i][1] == keyNomZone &&
                    variations[i][2] == valQualShaft &&
                    variations[i][3] == valTolZoneShaft) {
                    // TODO если не будет искомого элемента, может вернуться что-то странное, наверное
                    $('.es').text(variations[i][4][0] / 1000);
                    $('.ei').text(variations[i][4][1] / 1000);
                    break;
                }
            }
        }
    });


    function calculate(expression){
         // ПОДСЧЁТ ЗНАЧЕНИЯ ВЫРАЖЕНИЯ

        var sequence,
            fieldValue,  // значение считываемого поля
            marker;  // достаточно ли данных для просчета выражения
        for (var i = 0; i < expression.length; i++) {
            marker = 0;
            sequence = expression[i].split(' ');  // разбиваем выражение на составные части
            for (var j = 0; j < sequence.length; j++) {
                if (['=', '+', '-', '/', '(', ')', '2'].indexOf(sequence[j]) === -1) {  // если не символ
                    if (sequence[j] == 'D') {
                        fieldValue = $('.D').val();  // получаем значение поля
                    }
                    else {
                        fieldValue = $('.' + sequence[j]).text();  // получаем значение поля
                    }
                    if (fieldValue){sequence[j] = '(' + fieldValue + ')'}  // записываем значение в последовательность
                    else {  // если значение отсутствует, выходим из цикла
                        marker = 1;
                        break;
                    }
                }
            }
            if (marker === 0) {break}  // если формула просчитана
        }
        if (marker === 1) {
            return '';
        }
        else {
            sequence = sequence.join('');  // сливаем выражение в одно строку
            sequence = eval(sequence).toFixed(3);
            return sequence;
        }
    }

    function calc() {
        for (var i = 0; i < inputs.length; ++i) {
            fieldName = '.' + inputs[i][0];
            if ($(fieldName).text() == '') {  // если поле пустое, пробуем для него просчитать значение
                $(fieldName).text( calculate(inputs[i][2]) );
            }
        }

        // определение посадки
        if ($('.Smin').text() === '0') {$('.fit').text('скользящая')}
        else if ($('.Nmin').text() === '0') {$('.fit').text('легко прессовая')}
        else if (($('.Smax').text() === $('.Nmax').val()) && $('.Smax').val()) {$('.fit').text('переходная')}
        else if ($('.Smin').val() > 0) {$('.fit').text('с зазором')}
        else if ($('.Nmin').val() > 0) {$('.fit').text('с натягом')}
        else {$('.fit').text('неизвестна')}

        // определение системы (отверстия или вала)
        if ($('.EI').text() === '0') {$('.sys_fit').text('отверстия')}
        else if ($('.es').text() === '0') {$('.sys_fit').text('вала')}
        else {$('.sys_fit').text('неизвестна')}
    }

    $(".calc").click( calc ); // по клику по кнопке 'Считать'


    // клик по кнопке сброса
    $('.reset').click( function() {
        for (var i = 0; i < inputs.length; ++i) {
            $('.' + inputs[i][0]).text( '' );
        }
        $('.graph').css('visibility', 'hidden');
        $('.fit').text('неизвестна');
        $('.sys_fit').text('неизвестна');
        $(nmFldZoneHole).prop("disabled", true);
        $(nmFldZoneShaft).prop("disabled", true);
    });

    $(".plot").click( function() {
        if ($('.graph').css('visibility') === 'hidden') {
            $('.graph').css('visibility', 'visible');
        }
        else {
            $('.graph').css('visibility', 'hidden');
        }
    });



});
