let vehiculos_registrados;

$(document).ready(() => {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/consultar/vehiculos/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            vehiculos_registrados = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    });
});

const consigue_vehiculo = (placa) => {
  return vehiculos_registrados.some((p) => p.placa.toUpperCase() === placa.toUpperCase());
};

$('form').submit((e) => {
  e.preventDefault();

  if(!consigue_vehiculo($('#placa').val().toUpperCase())){
    alert("No hay ningún vehículo con la placa introducida registrado.");
    return false;
  }
  if(new Date() > new Date($('#fecha').val()))
    alert("La fecha introducida no puede ser menor a la presente. Verifique fecha y hora.");

  $(document).ready(() => {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/crear/mantenimiento/',
        type: 'POST',
        data: {
          'vehiculo': $('#placa').val(),
          'fecha': $('#fecha').val(),
          'tipo': $('#tipo').val()
        },
        success: function (res, textStatus, xhr) {
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    });
  });

  alert("Creado exitosamente.")
  window.location.replace("/");
});