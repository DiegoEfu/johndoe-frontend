$(document).ready(() => {
    $.ajax({
        url: 'https://inverdata.pythonanywhere.com/api/consultar/personas/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            const datos = res;
            for(let i = 0; i < datos.length; i++){
              let actual = datos[i];
              console.log(actual);
              $('#body').append(`
                <tr>
                  <td>${actual.tipo}${actual.cedula}</td>
                  <td>${actual.nombre.toUpperCase()}</td>
                  <td>${actual.apellido.toUpperCase()}</td>
                  <td>${actual.genero === 'H' ? 'Hombre' : 'Mujer'}</td>
                  <td><a id="modificar_${actual.id}" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></a>    
                  <a id="eliminar_${actual.id}" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a></td>
                </tr>   

                <script>
                  $('#modificar_${actual.id}').click((e) => {
                    e.preventDefault();
                    localStorage.setItem('modificar', ${actual.id});
                    window.location.replace("/acciones/modificar/modificar_persona.html");
                  });

                  $('#eliminar_${actual.id}').click((e) => {
                    e.preventDefault();
                    $.ajax({
                      url: 'https://inverdata.pythonanywhere.com/api/eliminar/persona/${actual.id}/',
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
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    })
});