var
    // величины, формулы их расчёта и описания
    // "выв" — выведенная формула
    // выведены далеко не все формулы
	inputs = [
        ['D', 'Номинальный размер', ['Dmax - ES']],
        ['Dmax', 'Наибольший предельный размер отверстия', ['ES + D', 'TD + Dmin']],  // выв
        ['Dmin', 'Наименьший предельный размер отверстия', ['EI + D', 'Dmax - TD']],  // выв
        ['Dm', 'Средний размер отверстия', ['Em + D']],  // выв
        ['dmax', 'Наибольший предельный размер вала', ['es + d', 'Td + dmin']],  // выв
        ['dmin', 'Наименьший предельный размер вала', ['ei + d', 'dmax - Td']],  // выв
        ['dm', 'Средний размер вала', ['em + d']],  // выв
        ['ES', 'Верхнее отклонение отверстия', ['Dmax - D']],
        ['EI', 'Нижнее отклонение отверстия', ['Dmin - D']],
        ['Em', 'Среднее отклонение отверстия', ['Dm - D']],
        ['es', 'Верхнее отклонение вала', ['dmax - d']],
        ['ei', 'Нижнее отклонение вала', ['dmin - d']],
        ['em', 'Среднее отклонение вала', ['dm - d']],
        ['Smax', 'Наибольший гарантированный зазор', ['Dmax - dmin', 'ES - ei']],
        ['Smin', 'Наименьший гарантированный зазор', ['Dmin - dmax', 'EI - es']],
        ['Sm', 'Средний (наиболее вероятный) зазор', ['Dm - dm', 'Em - em', '( Smax + Smin ) / 2']],
        ['Nmax', 'Наибольший гарантированный натяг', ['dmax - Dmin',  'es - EI', '- Smin']],
        ['Nmin', 'Наименьший гарантированный натяг', ['dmin - Dmax', 'ei - ES', '- Smax']],
        ['Nm', 'Средний (наиболее вероятный) натяг', ['dm - DM', 'em - Em', '- Sm']],
        ['TD', 'Допуск отверстия', ['Dmax - Dmin']],
        ['Td', 'Допуск вала', ['dmax - dmin']],
        ['Ts', 'Допуск зазора (посадки)', ['Smax - Smin', 'TD - Td']],
        ['TN', 'Допуск натяга (посадки)', ['( Nmax ) - ( Nmin )', 'TD - Td']]
    ];


$(document).ready(function(){
    // генерация полей
    for (var i = 0; i < inputs.length; ++i){
        $('table').append( $('<tr><td>' + inputs[i][0] + '</td><td><input value="" class="' + inputs[i][0] + '"></td><td>' + inputs[i][1] + '</td></tr>') );
    }

	function calculate(expressions){
         /*
         ПОДСЧЁТ ЗНАЧЕНИЯ
         Принимает:
            expressions (massive) математическое выражение
         Возвращает:
            (int) результат
         */
        var sequence,
            fieldValue,  // значение считываемого поля
            marker,  // достаточно ли данных для просчета выражения
            sym;
        for (var i = 0; i < expressions.length; i++) {
            marker = 0;
            sequence = expressions[i].split(' ');  // разбиваем выражение на составные части
            for (var j = 0; j < sequence.length; j++) {
                // если символ, переходим на новую итерацию
                sym = sequence[j];
                if (sym == '=' || sym == '+' || sym == '-' || sym == '/' || sym == '(' || sym == ')' || sym == '' || sym == '2') {
                    continue;
                }
                else {
                    fieldValue = $('.' + sequence[j]).val();  // получаем значение поля
                    if (fieldValue){sequence[j] = fieldValue}  // записываем значение в последовательность
                    else {  // если значение отсутствует, выходим из цикла
                        marker = 1;
                        break;
                    }
                }
            }
            if (marker == 0) {break}
        }
        if (marker == 1) {
            return '';
        }
        else {
            sequence = sequence.join('');  // сливаем выражение в одно строку
            sequence = eval(sequence);
            return sequence;
        }

        //if (!(operand && operand2)) return '';
        //operand = $('.' + operand).val();
        //operand2 = $('.' + operand2).val();
        //if (operand && operand2) {  // если имеются данные для совершения операции
        //    return eval('parseInt(' + operand + ')' + operation + 'parseInt(' + operand2 + ')');
        //}
        //else return ''
	}

    // клик по кнопке подсчёта
 	$(".calc").click(function(){
        var fieldValue;  // значение поля
 		for (var i = 0; i < inputs.length; ++i) {
            fieldValue = '.' + inputs[i][0];
 			if ($(fieldValue).val() == '') {
 				$(fieldValue).val(calculate(inputs[i][2]));
 			}
 		}
	});

    // клик по кнопке сброса
    $('.reset').click(function(){
        $('#graph').css('visibility', 'hidden');
        $('.graph').css('visibility', 'hidden');
    });

    $(".plot").click(function() {
        $('#graph').css('visibility', 'visible');
        $('.graph').css('visibility', 'visible');
    });
 });