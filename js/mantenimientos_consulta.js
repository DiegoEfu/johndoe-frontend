$(document).ready(() => {
    let mantenimientos = undefined; 
    let vehiculos = undefined;

    $.ajax({
        url: 'http://127.0.0.1:8000/api/consultar/mantenimientos/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            mantenimientos = res;
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

    const consigue_vehiculo = (id) => {
      for(let i = 0; i < vehiculos.length; i++){
        if(vehiculos[i].id == id)
          return {'placa': vehiculos[i].placa};
      }
    };

    for(let i = 0; i < mantenimientos.length; i++){
      let actual = mantenimientos[i];
      let vehiculo = consigue_vehiculo(mantenimientos[i].vehiculo_id);

      console.log(actual);
      console.log(vehiculo);

      $('#body').append(`
        <tr>
          <td>${vehiculo.placa}</td>
          <td>${actual.fecha}</td>
          <td>${actual.tipo == 'P' ? 'Preventivo' : 'Correctivo'}</td>
          <td>${actual.estado == 'P' ? 'Pendiente' : actual.estado == 'F' ? 'Finalizado' : 'Cancelado'}</td>
          <td>${actual.resultados ? actual.resultados : ''}</td>
          <td><a class="btn btn-success">Modificar</a>    <a class="btn btn-warning">Cancelar</a>     <a class="btn btn-danger">Eliminar</a></td>
        </tr>      
      `);
    }

});