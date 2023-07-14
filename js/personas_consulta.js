$(document).ready(() => {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/consultar/personas/',
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
                  <td><a class="btn btn-success">Modificar</a>    <a class="btn btn-danger">Eliminar</a></td>
                </tr>      
              `);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    })
});