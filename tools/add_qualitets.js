var
    nmFldNomSize = '#nom_size',
    nmFldQual = '#qual',
    nmFldTolZone = '#tol_zone',
    nmFldES = '#es',
    nmFldEI = '#ei',
    key;


// добавляем номинальные размеры
for (var i = 0; i < nom_zones.length; i++) {
    $(nmFldNomSize).append($('<option value="' + nom_zones[i][2] + '">' + nom_zones[i][0] + ' — ' +  nom_zones[i][1] + '</option>'));
}

// добавляем квалитеты
for (key in qualitets) {
    if (qualitets.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
        $(nmFldQual).append($('<option value="' + key + '">' + qualitets[key] + '</option>'));
    }
}

// добавляем поля допусков
for (key in tol_zones) {
    if (tol_zones.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
        $(nmFldTolZone).append($('<option value="' + key + '">' + tol_zones[key] + '</option>'));
    }
}


var strNewVariations = '';
//Array.prototype.toString = function() { // TODO понять, как это работает :D
//    return '[' + this.join(', ') + ']';
//};
$('#add').click( function() {
    var
        newVariation,
        holeOrShaft = -1,
        valFldNomSize = $(nmFldNomSize).val(),
        valFldQual = $(nmFldQual).val(),
        valFldTolZone = $(nmFldTolZone).val(),
        valFldES = $(nmFldES).val(),
        valFldEI = $(nmFldEI).val();

    // по пределу отклонений определяем вал это или отверстие
    if (1 <= valFldTolZone && valFldTolZone <= 28) {
        holeOrShaft = 0;
    }
    else if (29 <= valFldTolZone && valFldTolZone <= 56) {
        holeOrShaft = 1;
    }

    // проверка корректности данных
    if (
        holeOrShaft == -1 ||
        valFldQual == 0 ||
        valFldTolZone == 0 ||
        valFldES == '' ||
        valFldEI == ''
        ) {
        return;
    }


    newVariation =
        '[' +
        holeOrShaft
        + ', ' +
        valFldNomSize
        + ', ' +
        valFldQual
        + ', ' +
        valFldTolZone
        + ', ' + '[' +
        valFldES
        + ', ' +
        valFldEI
        + '],\n';

    strNewVariations += newVariation;

    $('#code').val( strNewVariations );
});