let personas_registradas;

$(document).ready(() => {
    $.ajax({
        url: 'https://inverdata.pythonanywhere.com/api/consultar/personas/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            personas_registradas = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    });
});

const consigue_persona = (tipo, cedula) => {
  console.log(personas_registradas);
  return personas_registradas.some((p) => p.tipo === tipo && p.cedula === cedula);
};

$('form').submit((e) => {
  e.preventDefault();

  if(personas_registradas && consigue_persona($('#tipo').val(), $('#cedula').val())){
    alert("Ya existe una persona registrada con esa cédula.");
    return false;
  } else if(!personas_registradas){
    alert("NO HAY PERSONAS REGISTRADAS. REGISTRE AL DUEÑO ANTES DE REGISTRAR SU VEHÍCULO.");
    return false;
  }

  $(document).ready(() => {
    $.ajax({
        url: 'https://inverdata.pythonanywhere.com/api/crear/persona/',
        type: 'POST',
        data: {
          'tipo': $('#tipo').val(),
          'cedula': $('#cedula').val(),
          'genero': $('#genero').val(),
          'nombre': $('#nombre').val(),
          'apellido': $('#apellido').val(),
        },
        success: function (res, textStatus, xhr) {
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: false
    });
  });

  alert("Creado exitosamente.")
  window.location.replace("/");
});