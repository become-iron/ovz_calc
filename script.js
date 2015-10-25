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
    ],
    add_fields = [['fit', 'Посадка:', 'неизвестна'], ['sys_fit', 'Cистема:', 'неизвестна']],
    reFieldValue = /^(\-?[0-9]+(\.?[0-9]+)?)?$/,  // валидность числа TODO улучшить
    fieldName;


$(document).ready(function(){
    // генерация полей
    for (var i = 0; i < inputs.length; ++i){
        $('table').append( $('<tr><td>' + inputs[i][0] + '</td><td><input type="text" class="field ' + inputs[i][0] + '"></td><td>' + inputs[i][1] + '</td><td>' +  inputs[i][2] +'</td></tr>') );
    }
    for (var j = 0; j < add_fields.length; j++) {
        $('table').append( $('<tr><td>' + add_fields[j][1] + '</td><td><div class="' + add_fields[j][0] + '">' + add_fields[j][2] + '</div></td><td></td></tr>') );
    }


    function calculate(expression){
         /*
         ПОДСЧЁТ ЗНАЧЕНИЯ ВЫРАЖЕНИЯ
         Принимает:
            expression (massive) математическое выражение
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
                if (['=', '+', '-', '/', '(', ')', '2'].indexOf(sequence[j]) == -1) {  // если не символ
                    fieldValue = $('.' + sequence[j]).val();  // получаем значение поля
                    if (fieldValue){sequence[j] = '(' + fieldValue + '*10000)'}  // записываем значение в последовательность
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
            sequence = eval(sequence) / 10000;
            return sequence;
        }
	}

    function calc(){
        for (var i = 0; i < inputs.length; ++i) {
            fieldName = '.' + inputs[i][0];
            //$(fieldName).val( $(fieldName).val().replace(',', '.') );
            if ($(fieldName).val() == '') {  // если поле пустое, пробуем для него просчитать значение
                $(fieldName).val(calculate(inputs[i][2]));
            }
        }

        // определение посадки
        if ($('.Smin').val() == '0') {$('.fit').text('скользящая')}
        else if ($('.Nmin').val() == '0') {$('.fit').text('легко прессовая')}
        else if (($('.Smax').val() == $('.Nmax').val()) && $('.Smax').val()) {$('.fit').text('переходная')}
        else {$('.fit').text('неизвестна')}

        // определение системы (отверстия или вала)
        if ($('.EI').val() == '0') {$('.sys_fit').text('отверстия')}
        else if ($('.es').val() == '0') {$('.sys_fit').text('вала')}
        else {$('.sys_fit').text('неизвестна')}
    }


    // просчёт значений
    $('form').change( function() {
        if ($('#auto-upd').prop("checked")) {  // если стоит флажок "Обновлять автоматически"
            calc();
        }
    });
    $(".calc").click(calc); // по клику по кнопке 'Считать'

    // проверка валидности значений в полях
    $('form').keyup( function() {  // TODO улучшить
        for (var i = 0; i < inputs.length; ++i) {
            fieldName = '.' + inputs[i][0];
            $(fieldName).val( $(fieldName).val().replace(',', '.') );
            if (reFieldValue.test($(fieldName).val())) {
                $(fieldName).css('background-color', 'white');
            }
            else {
                $(fieldName).css('background-color', '#ff988a');
            }
        }
    });

    // клик по кнопке сброса
    $('.reset').click(function(){
        $('.graph').css('visibility', 'hidden');
        $('.fit').text('неизвестна');
        $('.sys_fit').text('неизвестна');
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
