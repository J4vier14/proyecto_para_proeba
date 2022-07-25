
$(document).ready(function () {
    let url = 'http://localhost:3000/api/direcciones';
    let url2 = 'http://localhost:3000/api/ultimoid';
    let opcion = null;

    //submit para el CREAR y EDITAR
    $('#formArticulos').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: url2,
            method: 'get',
            contentType: 'application/json',
            success: function (data) {
               ID_CLIENTE = data[0].id;

                DIRECCION = $.trim($('#DIRECCION').val());
                MUNICIPIO = $.trim($('#MUNICIPIO').val());
                ID_DEPARTAMENTO = $.trim($('#ID_DEPARTAMENTO').val());
                

                $.ajax({
                    url: url,
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({ DIRECCION: DIRECCION, MUNICIPIO: MUNICIPIO, ID_DEPARTAMENTO: ID_DEPARTAMENTO, ID_CLIENTE: ID_CLIENTE }),
                    success: function (data) {
                        $('#DIRECCION').val('');
                        $('#MUNICIPIO').val('');
                        $('#ID_DEPARTAMENTO').val('');
                        
                        if ($('#conten-alert').hasClass('alert')) {
                            $("#conten-alert").remove();
                            $('#alert').show();
                        }
                        $('#alert').append('<div id="conten-alert" class="alert alert-success" role="alert">Se agrego correctamente la direccion!</div>');
                        
                        $('#alert').hide(5000);

                        
                        $("#btn-finalizar-registro").removeClass("disabled");
                        $("#btn-finalizar-registro").removeClass("btn-secondary");
                        $("#btn-finalizar-registro").addClass("btn-success");

                        $("#btn-finalizar-registro").addClass("animate-btn");
                        
                        $("#formArticulos").removeClass("was-validated");
                        $("#btn-agregar-direccion").removeClass("was-validated");
                    }
                });
                
            }

            
        });
        
        
        /* $('#modalCRUD').modal('hide'); */
    });
    
});