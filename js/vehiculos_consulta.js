$(document).ready(() => {
    let personas = undefined; 
    let vehiculos = undefined;

    $.ajax({
        url: 'http://127.0.0.1:8000/api/consultar/personas/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            personas = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: false
    });

    $.ajax({
      url: 'http://127.0.0.1:8000/api/consultar/vehiculos/',
      type: 'GET',
      success: function ({res}, textStatus, xhr) {
          vehiculos = res;
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
      },
      async: false
    });

    const consigue_persona = (id) => {
      for(let i = 0; i < personas.length; i++){
        if(personas[i].id == id)
          return {'cedula': `${personas[i].tipo}${personas[i].cedula}`,
            'nombre': `${personas[i].nombre} ${personas[i].apellido}`.toUpperCase()}
      }
    };

    for(let i = 0; i < vehiculos.length; i++){
      let actual = vehiculos[i];
      let persona = consigue_persona(vehiculos[i].dueno_id);

      $('#body').append(`
        <tr>
          <td>${persona.cedula}<br>${persona.nombre}</td>
          <td>${actual.placa.toUpperCase()}</td>
          <td>${actual.marca.toUpperCase()}</td>
          <td>${actual.modelo.toUpperCase()}</td>
          <td>${actual.color.toUpperCase()}</td>
          <td><a id="modificar_${actual.id}" class="btn btn-success">Modificar</a>    <a class="btn btn-danger">Eliminar</a></td>
        </tr>   

        <script>
          $('#modificar_${actual.id}').click((e) => {
            e.preventDefault();
            localStorage.setItem('modificar', ${actual.id});
            window.location.replace("/acciones/modificar/modificar_vehiculo.html");
          });
        </script>
      `);
    }

});