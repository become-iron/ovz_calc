var
    // пределы номинальных размеров
    nom_zones = [
        // [нижний, верхний, код]
        [1, 3, 0],
        [3, 6, 1],
        [6, 10, 2],
        [10, 14, 3],
        [14, 18, 4],
        [18, 24, 5],
        [24, 30, 6]
    ],

    // квалитеты
    qualitets = {
        // ключ : квалитет
        0 : '—',
        //19  : '01',
        //1  : '1',
        //2  : '2',
        //3  : '3',
        //4  : '4',
        //5  : '5',
        //6  : '6',
        7  : '7',
        8  : '8'/*,*/
        //9  : '9',
        //10 : '10',
        //11 : '11',
        //12 : '12',
        //13 : '13',
        //14 : '14',
        //15 : '15',
        //16 : '16',
        //17 : '17',
        //18 : '18'
    },

    // поля допусков
    tol_zones = {
        // поле допуска : ключ
        //0  : '—',
        1  :  'a',
        2  :  'b',
        3  :  'c',
        4  : 'cd',
        5  :  'd',
        6  :  'e',
        7  : 'ef',
        8  :  'f',
        9  : 'fg',
        10 :  'g',
        11 :  'h',
        12 : 'js',
        13 :  'j',
        14 :  'k',
        15 :  'm',
        16 :  'n',
        17 :  'p',
        18 :  'r',
        19 :  's',
        20 :  't',
        21 :  'u',
        22 :  'v',
        23 :  'x',
        24 :  'y',
        25 :  'z',
        26 : 'za',
        27 : 'zb',
        28 : 'zc',
        29 :  'A',
        30 :  'B',
        31 :  'C',
        32 : 'CD',
        33 :  'D',
        34 :  'E',
        35 : 'EF',
        36 :  'F',
        37 : 'FG',
        38 :  'G',
        39 :  'H',
        40 : 'JS',
        41 :  'J',
        42 :  'K',
        43 :  'M',
        44 :  'N',
        45 :  'P',
        46 :  'R',
        47 :  'S',
        48 :  'T',
        49 :  'U',
        50 :  'V',
        51 :  'X',
        52 :  'Y',
        53 :  'Z',
        54 : 'ZA',
        55 : 'ZB',
        56 : 'ZC'
    },

    // ОТВЕРСТИЯ
    variationsHoles = [
        // указываются коды
        //[предел размеров, квалитет, поле допуска, [верхний предел, нижний предел]]
        [0, 7, 38, [12, 2]],
        [1, 7, 38, [16, 4]],
        [2, 7, 38, [20, 5]],
        [3, 7, 38, [24, 6]],
        [4, 7, 38, [24, 6]],
        [5, 7, 38, [28, 7]],
        [6, 7, 38, [28, 7]],
        [0, 7, 39, [10, 0]],
        [1, 7, 39, [12, 0]],
        [2, 7, 39, [15, 0]],
        [3, 7, 39, [18, 0]],
        [4, 7, 39, [18, 0]],
        [5, 7, 39, [21, 0]],
        [6, 7, 39, [21, 0]],

        [0, 8, 39, [14, 0]],
        [1, 8, 39, [18, 0]],
        [2, 8, 39, [22, 0]],
        [3, 8, 39, [27, 0]],
        [4, 8, 39, [27, 0]],
        [5, 8, 39, [33, 0]],
        [6, 8, 39, [33, 0]]
    ],
    // ВАЛЫ
    variationsShafts = [
        [0, 7, 11, [0, -10]],
        [1, 7, 11, [0, -12]],
        [2, 7, 11, [0, -15]],
        [3, 7, 11, [0, -18]],
        [4, 7, 11, [0, -18]],
        [5, 7, 11, [0, -21]],
        [6, 7, 11, [0, -21]],
        [0, 8, 11, [0, -14]],
        [1, 8, 11, [0, -18]],
        [2, 8, 11, [0, -22]],
        [3, 8, 11, [0, -27]],
        [4, 8, 11, [0, -27]],
        [5, 8, 11, [0, -33]],
        [6, 8, 11, [0, -33]]],

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

    reFieldValue = /^(\-?[0-9]+(\.?[0-9]+)?)?$/,  // валидность числа TODO улучшить

    fieldName,
    code = '',
    i;


$(document).ready(function(){

    // ГЕНЕРАЦИЯ ПОЛЕЙ
    code += '<tr><td>D</td><td><input type="number" min="1" max="500" step="1" class="field D"></td><td>Номинальный размер</td><td></td></tr>';
    for (var k = 0; k < fields.length; k++) {
        code += '<tr><td></td><td><select class="' + fields[k][0] + '"></select></td><td>' + fields[k][1] + '</td><td></td></tr>'
    }
    for (var i = 0; i < inputs.length; ++i){
        code += '<tr><td>' + inputs[i][0] + '</td><td><input type="text" class="field ' + inputs[i][0] + '"></td><td>' + inputs[i][1] + '</td><td>' +  inputs[i][2] +'</td></tr>';
    }
    for (var j = 0; j < add_fields.length; j++) {
        code += '<tr><td>' + add_fields[j][1] + '</td><td><div class="' + add_fields[j][0] + '">' + add_fields[j][2] + '</div></td><td></td></tr>';
    }
    $('table').append(code);
    $(nmFldZoneHole).prop("disabled", true);
    $(nmFldZoneShaft).prop("disabled", true);
    for (var key in qualitets) {
        if (qualitets.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            $(nmFldQualHole).append($('<option value="' + key + '">' + qualitets[key] + '</option>'));
            $(nmFldQualShaft).append($('<option value="' + key + '">' + qualitets[key] + '</option>'));
        }
    }


    function calculate(expression){
         /*
         ПОДСЧЁТ ЗНАЧЕНИЯ ВЫРАЖЕНИЯ
         Принимает:
            expression (array) математическое выражение
         Возвращает:
            (int) результат
         */
        var sequence,
            fieldValue,  // значение считываемого поля
            marker;  // достаточно ли данных для просчета выражения
        for (var i = 0; i < expression.length; i++) {
            marker = 0;
            sequence = expression[i].split(' ');  // разбиваем выражение на составные части
            for (var j = 0; j < sequence.length; j++) {
                if (['=', '+', '-', '/', '(', ')', '2'].indexOf(sequence[j]) === -1) {  // если не символ
                    fieldValue = $('.' + sequence[j]).val();  // получаем значение поля
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
            if ($(fieldName).val() === '') {  // если поле пустое, пробуем для него просчитать значение
                $(fieldName).val(calculate(inputs[i][2]));
            }
        }

        // определение посадки
        if ($('.Smin').val() === '0') {$('.fit').text('скользящая')}
        else if ($('.Nmin').val() === '0') {$('.fit').text('легко прессовая')}
        else if (($('.Smax').val() === $('.Nmax').val()) && $('.Smax').val()) {$('.fit').text('переходная')}
        else {$('.fit').text('неизвестна')}

        // определение системы (отверстия или вала)
        if ($('.EI').val() === '0') {$('.sys_fit').text('отверстия')}
        else if ($('.es').val() === '0') {$('.sys_fit').text('вала')}
        else {$('.sys_fit').text('неизвестна')}
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
        var keyNomZone = discover_nom_zone();

        if (mark === 0) {
            var valQualHole = $(nmFldQualHole).val(),
                listHoleZones = [];
            for (i = 0; i < variationsHoles.length; i++) {
                if (variationsHoles[i][0] == keyNomZone && variationsHoles[i][1] == valQualHole && listHoleZones.indexOf(variationsHoles[i][2]) == -1) {
                    listHoleZones.push(variationsHoles[i][2]);
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
            $(nmFldZoneShaft).empty();
            var valQualShaft = $(nmFldQualShaft).val(),
                listShaftZones = [];
            for (var i = 0; i < variationsShafts.length; i++) {
                if (variationsShafts[i][0] == keyNomZone && variationsShafts[i][1] == valQualShaft && listShaftZones.indexOf(variationsShafts[i][2]) == -1) {
                    listShaftZones.push(variationsShafts[i][2]);
                }
            }
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
            for (i = 0; i < variationsHoles.length; i++) {
                if (variationsHoles[i][0] == keyNomZone &&
                    variationsHoles[i][1] == valQualHole &&
                    variationsHoles[i][2] == valTolZoneHole) {
                    // TODO если не будет искомого элемента, может вернуться что-то странное, наверное
                    $('.ES').val(variationsHoles[i][3][0] / 1000);  // делим на 1000 для перевода в мкм
                    $('.EI').val(variationsHoles[i][3][1] / 1000);
                    break;
                }
            }
        }
        if (valQualShaft > 0) {
            for (i = 0; i < variationsShafts.length; i++) {
                if (variationsShafts[i][0] == keyNomZone &&
                    variationsShafts[i][1] == valQualShaft &&
                    variationsShafts[i][2] == valTolZoneShaft) {
                    // TODO если не будет искомого элемента, может вернуться что-то странное, наверное
                    $('.es').val(variationsShafts[i][3][0] / 1000);
                    $('.ei').val(variationsShafts[i][3][1] / 1000);
                    break;
                }
            }
        }
    });

    // просчёт значений
    $('form').change( function() {
        if ($('#auto-upd').prop("checked")) {  // если стоит флажок "Обновлять автоматически"
            calc();
        }
    });
    $(".calc").click( calc() ); // по клику по кнопке 'Считать'

    // проверка валидности значений в полях
    $('input').keyup( function() {  // TODO улучшить, не работает для поля "D"
        for (var i = 0; i < inputs.length; ++i) {
            fieldName = '.' + inputs[i][0];
            $(fieldName).val( $(fieldName).val().replace(',', '.') );
            // TODO добавить проверку значений для пределов
            if (reFieldValue.test($(fieldName).val())) {
                $(fieldName).css('background-color', 'white');
            }
            else {
                $(fieldName).css('background-color', '#ff988a');
            }
        }
    });

    // клик по кнопке сброса
    $('.reset').click( function() {
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
