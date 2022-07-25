$(document).ready(function () {
    let url = 'http://localhost:3000/api/clientes/';
    let opcion = null;

    /* let ID_CLIENTE, NOMBRE1, NOMBRE2, APELLIDO1, APELLIDO2, TELEFONO, EMAIL; */

    let id, NOMBRE1, NOMBRE2, APELLIDO1, APELLIDO2, TELEFONO, EMAIL;
    //MOSTRAR



    let tablaArticulos = $('#tablaArticulos').DataTable({
        responsive: true,
        autoWidth: true,

        "language": {

            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        "ajax": {
            "url": url,
            "dataSrc": ""
        },
        "columns": [
            { "data": "ID_CLIENTE" },
            { "data": "NOMBRE1" },
            { "data": "NOMBRE2" },
            { "data": "APELLIDO1" },
            { "data": "APELLIDO2" },
            { "data": "TELEFONO" },
            { "data": "EMAIL" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar'>Editar</button><button class='btn btn-danger btn-sm btnBorrar'>Borrar</button></div></div>" }
        ], 
        
        /* order: [[1, 'asc']], */
    });

   


    //CREAR
    $("#btnCrear").click(function () {
        opcion = 'crear';
        id = null;
        $("#formArticulos").trigger("reset");
        $(".modal-header").css("background-color", "#23272b");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Crear Artículo");
        $('#modalCRUD').modal('show');
    });
    //EDITAR        
    $(document).on("click", ".btnEditar", function () {
        opcion = 'editar';
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text());
        NOMBRE1 = fila.find('td:eq(1)').text();
        NOMBRE2 = fila.find('td:eq(2)').text();
        APELLIDO1 = fila.find('td:eq(3)').text();
        APELLIDO2 = fila.find('td:eq(4)').text();
        TELEFONO = fila.find('td:eq(5)').text();
        EMAIL = fila.find('td:eq(6)').text();
        $("#id").val(id);
        $("#NOMBRE1").val(NOMBRE1);
        $("#NOMBRE2").val(NOMBRE2);
        $("#APELLIDO1").val(APELLIDO1);
        $("#APELLIDO2").val(APELLIDO2);
        $("#TELEFONO").val(TELEFONO);
        $("#EMAIL").val(EMAIL);
        $(".modal-header").css("background-color", "#7303c0");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Artículo");
        $('#modalCRUD').modal('show');
    });

    //BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        Swal.fire({
            title: '¿Confirma eliminar el registro?',
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: url + id,
                    method: 'delete',
                    data: { id: id },
                    success: function () {
                        tablaArticulos.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire('¡Registro Eliminado!', '', 'success')
            }
        })
    });
    //submit para el CREAR y EDITAR
    $('#formArticulos').submit(function (e) {
        e.preventDefault();
        id = $.trim($('#id').val());
        NOMBRE1 = $.trim($('#NOMBRE1').val());
        NOMBRE2 = $.trim($('#NOMBRE2').val());
        APELLIDO1 = $.trim($('#APELLIDO1').val());
        APELLIDO2 = $.trim($('#APELLIDO2').val());
        TELEFONO = $.trim($('#TELEFONO').val());
        EMAIL = $.trim($('#EMAIL').val());
        if (opcion == 'crear') {
            $.ajax({
                url: url,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ NOMBRE1: NOMBRE1, NOMBRE2: NOMBRE2, APELLIDO1: APELLIDO1, APELLIDO2: APELLIDO2, TELEFONO: TELEFONO, EMAIL: EMAIL }),
                success: function (data) {
                    tablaArticulos.ajax.reload(null, false);
                    setTimeout(function () { window.location.href = "./web/fortdocumento.html"});
                }
            });
        }
        if (opcion == 'editar') {
            console.log("EDITAR");
            $.ajax({
                url: url + id,
                method: 'put',
                contentType: 'application/json',
                data: JSON.stringify({ NOMBRE1: NOMBRE1, NOMBRE2: NOMBRE2, APELLIDO1: APELLIDO1, APELLIDO2: APELLIDO2, TELEFONO: TELEFONO, EMAIL: EMAIL }),
                success: function (data) {
                    tablaArticulos.ajax.reload(null, false);
                }
            });
        }


        /* opcion = 'crearDireccion';
        id = null;
        $("#formArticulos").trigger("reset");
        $(".modal-header").css("background-color", "#23272b");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Agregar dirección");
        $('#modalCRUDDocumentos').modal('show'); */

        $('#modalCRUD').modal('hide');
        

    });




    //submit para el CREAR y EDITAR Direccion
    /* $('#formDireccion').submit(function (e) {
        e.preventDefault();
        id = $.trim($('#id').val());
        NOMBRE1 = $.trim($('#NOMBRE1').val());
        NOMBRE2 = $.trim($('#NOMBRE2').val());
        APELLIDO1 = $.trim($('#APELLIDO1').val());
        APELLIDO2 = $.trim($('#APELLIDO2').val());
        TELEFONO = $.trim($('#TELEFONO').val());
        EMAIL = $.trim($('#EMAIL').val());
        if (opcion == 'crear') {
            $.ajax({
                url: url,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ NOMBRE1: NOMBRE1, NOMBRE2: NOMBRE2, APELLIDO1: APELLIDO1, APELLIDO2: APELLIDO2, TELEFONO:TELEFONO, EMAIL:EMAIL  }),
                success: function (data) {
                    tablaArticulos.ajax.reload(null, false);
                }
            });
        }
        if (opcion == 'editar') {
            console.log("EDITAR");
            $.ajax({
                url: url + id,
                method: 'put',
                contentType: 'application/json',
                data: JSON.stringify({ NOMBRE1: NOMBRE1, NOMBRE2: NOMBRE2, APELLIDO1: APELLIDO1, APELLIDO2: APELLIDO2, TELEFONO:TELEFONO, EMAIL:EMAIL}),
                success: function (data) {
                    tablaArticulos.ajax.reload(null, false);
                }
            });
        }
       
       
            opcion = 'crear';
            id = null;
            $("#formArticulos").trigger("reset");
            $(".modal-header").css("background-color", "#23272b");
            $(".modal-header").css("color", "white");
            $(".modal-title").text("Agregar dirección");
            $('#modalCRUDDocumentos').modal('show');
       
            $('#modalCRUDDocumentos').modal('hide');
        
        
    }); */

    // Example starter JavaScript for disabling form submissions if there are invalid fields
});

