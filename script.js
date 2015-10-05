var
	inputs = [
			['.D_max', '.pol', '.d_min', '+'],  // наибольшим предельным размером отверстия
			['.d_min', '.D_max', '.pol', '-'],  // наименьшим предельным размером вала
			['.pol',   '.D_max', '.d_min', '-']  	  // положительная разность между наибольшим предельным размером отверстия и наименьшим предельным размером вала, или между верхним отклонением отверстия и нижним отклонением вала
	]


$(document).ready(function(){

	function calculate(operand, operand2, operation){
	// Принимает:
	// -название первого поля
	// -название второго поля
	// -операция

	return eval('parseInt($("' + operand + '").val())' + operation + 'parseInt($("' + operand2 + '").val())')
	// return eval('$(.D_max).val()+$(.pol).val()')
	}

	// $(".reset").click(function(){
	// 	// Кнопка сброса
	// 	for (var key in inputs){
	// 		$(key).val('');
	// 	}
	// });

 	$(".calc").click(function(){  // по клику по кнопке "Подсчитать"
 		// $('.d_min').val('1234');
 		// $('d_min').val(calculate('.D_max', '.pol', '+'))
 		for (i = 0; i < inputs.length; ++i){
 			if ($(inputs[i][0]).val() == ''){
 				$(inputs[i][0]).val(calculate(inputs[i][1], inputs[i][2], inputs[i][3]));
 			}
 		}
 		// if (!($(param).attr("value"))){
 		// 	$(param).attr("value", '1');
 		// }
 		// if (!($(".d_min").attr("value"))){
 		// 	$(".d_min").attr("value", '2');
 		// }
 		// if (!($(".pol").attr("value"))){
 		// 	$(".pol").attr("value", '3');
 		// }
	});
 });
