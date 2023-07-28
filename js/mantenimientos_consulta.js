$(document).ready(() => {
    let mantenimientos = undefined; 
    let vehiculos = undefined;

    $.ajax({
        url: 'https://inverdata.pythonanywhere.com/api/consultar/mantenimientos/',
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
      url: 'https://inverdata.pythonanywhere.com/api/consultar/vehiculos/',
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
          <td><a id="modificar_${actual.id}" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></a>    <a id="eliminar_${actual.id}" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a></td>
        </tr>   

        <script>
          $('#modificar_${actual.id}').click((e) => {
            e.preventDefault();
            localStorage.setItem('modificar', ${actual.id});
            window.location.replace("/acciones/modificar/modificar_mantenimiento.html");
          });

          $('#eliminar_${actual.id}').click((e) => {
            e.preventDefault();
            console.log("A");
            $.ajax({
              url: 'https://inverdata.pythonanywhere.com/api/eliminar/mantenimiento/${actual.id}/',
              type: 'POST',
              success: function ({res}, textStatus, xhr) {
                  alert("Eliminado Exitosamente");
                  location.reload();
              },
              error: function (xhr, textStatus, errorThrown) {
                  console.log(xhr);
              },
              async: true
            });
          });
        </script>      
      `);
    }
});