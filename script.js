var
    // величины, формулы их расчёта и описания
    // "выв" — выведенная формула
    // выведены далеко не все формулы
	inputs = [
        ['D', 'Номинальный размер', ['Dmax - ES']],
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
    ];


$(document).ready(function(){
    // генерация полей
    for (var i = 0; i < inputs.length; ++i){
        $('table').append( $('<tr><td>' + inputs[i][0] + '</td><td><input value="" class="' + inputs[i][0] + '"></td><td>' + inputs[i][1] + '</td><td>' +  inputs[i][2] +'</td></tr>') );
    }
    $('table').append( $('<tr><td>Тип посадки:</td><td><div class="fit">не определена</div></td><td></td></tr>') );
    $('table').append( $('<tr><td>Система:</td><td><div class="sys_fit">не определена</div></td><td></td></tr>') );


    function calculate(expressions){
         /*
         ПОДСЧЁТ ЗНАЧЕНИЯ ВЫРАЖЕНИЯ
         Принимает:
            expressions (massive) математическое выражение
         Возвращает:
            (int) результат
         */
        var sequence,
            fieldValue,  // значение считываемого поля
            marker;  // достаточно ли данных для просчета выражения
        for (var i = 0; i < expressions.length; i++) {
            marker = 0;
            sequence = expressions[i].split(' ');  // разбиваем выражение на составные части
            for (var j = 0; j < sequence.length; j++) {
                // если символ, переходим на новую итерацию
                if ('=+-/()2'.indexOf(sequence[j]) != -1) {  // костыль
                    continue;
                }
                else {
                    fieldValue = $('.' + sequence[j]).val();  // получаем значение поля
                    if (fieldValue){sequence[j] = '(' + fieldValue + '*1000)'}  // записываем значение в последовательность
                    else {  // если значение отсутствует, выходим из цикла
                        marker = 1;
                        break;
                    }
                }
            }
            if (marker == 0) {break}  // если формула просчитана
        }
        if (marker == 1) {
            return '';
        }
        else {
            sequence = sequence.join('');  // сливаем выражение в одно строку
            sequence = eval(sequence) / 1000;
            return sequence;
        }
	}

    function calc(){
        var fieldValue;  // значение поля
        for (var i = 0; i < inputs.length; ++i) {
            fieldValue = '.' + inputs[i][0];
            if ($(fieldValue).val() == '') {
                $(fieldValue).val(calculate(inputs[i][2]));
            }
        }

        // определение посадки
        if (($('.Smax').val() == $('.Nmax').val()) && $('.Smax').val()) {$('.fit').text('переходная')}
        else if ($('.Smin').val() == '0') {$('.fit').text('скользящая')}
        else if ($('.Nmin').val() == '0') {$('.fit').text('легко прессовая')}

        // определение системы (отверстия или вала)
        if ($('.EI').val() == '0') {$('.sys_fit').text('отверстия')}
        else if ($('.es').val() == '0') {$('.sys_fit').text('вала')}
    }


    // просчёт значений
    $('form').change(function() {
        if ($('#check').prop("checked")) {  // если стоит флажок "Обновлять автоматически"
            calc();
        }
    });
    $(".calc").click(calc);

    // клик по кнопке сброса
    $('.reset').click(function(){
        $('.graph').css('visibility', 'hidden');
        $('.fit').text('не определена');
        $('.sys_fit').text('не определена');
    });

    $(".plot").click(function() {
        if ($('.graph').css('visibility') == 'hidden') {
            $('.graph').css('visibility', 'visible');
        }
        else {
            $('.graph').css('visibility', 'hidden');
        }
    });
 });
