var
	inputs = [
             ['ES', 'Верхнее отклонение отверстия', 'Dmax', 'D', '-'],  // наибольшим предельным размером отверстия
             ['Dmax', 'Наибольший предельный размер', 'ES', 'D', '+'],  // наименьшим предельным размером вала
             ['D', 'Номинальный размер', 'Dmax', 'ES', '-']  	  // положительная разность между наибольшим предельным размером отверстия и наименьшим предельным размером вала, или между верхним отклонением отверстия и нижним отклонением вала
			 ];


$(document).ready(function(){
    for (var i = 0; i < inputs.length; ++i){
        $('table').append( $('<tr><td>' + inputs[i][0] + '</td><td><input value="" class="' + inputs[i][0] + '"></td><td>' + inputs[i][1] + '</td></tr>') );
    }


	function calculate(operand, operand2, operation){
        // Принимает:
        // -название первого поля
        // -название второго поля
        // -операция
        console.log(eval('parseInt($(".' + operand + '").val())' + operation + 'parseInt($(".' + operand2 + '").val())'));
        return eval('parseInt($(".' + operand + '").val())' + operation + 'parseInt($(".' + operand2 + '").val())');
	}


 	$(".calc").click(function(){  // по клику по кнопке "Подсчитать"
        //$('.' + inputs[0][0]).val(calculate(inputs[0][2], inputs[0][3], inputs[0][4]));
 		for (var i = 0; i < inputs.length; ++i){
 			if ($('.' + inputs[i][0]).val() == ''){
 				$('.' + inputs[i][0]).val(calculate(inputs[i][2], inputs[i][3], inputs[i][4]));
 			}
 		}
	});
 });