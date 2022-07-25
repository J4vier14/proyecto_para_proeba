$(document).ready(function () {
    let url = 'http://localhost:3000/api/documentos/';
    let opcion = null;


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
            { "data": "ID_DOCUMENTO" },
            { "data": "NOMBRE_DOCUMENTO" },
            { "data": "NUMERO_DOCUMENTO" },
            { "data": "ID_CLIENTE" },
           ], 
        
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
 
});

