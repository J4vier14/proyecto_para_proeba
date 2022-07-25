
$(document).ready(function () {
    let url = 'http://localhost:3000/api/documentos/';
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

                NOMBRE_DOCUMENTO = $.trim($('#NOMBRE_DOCUMENTO').val());
                NUMERO_DOCUMENTO = $.trim($('#NUMERO_DOCUMENTO').val());
                

                $.ajax({
                    url: url,
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({ NOMBRE_DOCUMENTO: NOMBRE_DOCUMENTO, NUMERO_DOCUMENTO: NUMERO_DOCUMENTO, ID_CLIENTE: ID_CLIENTE }),
                    success: function (data) {
                        $('#NOMBRE_DOCUMENTO').val('');
                        $('#NUMERO_DOCUMENTO').val('');
                        
                        if ($('#conten-alert').hasClass('alert')) {
                            $("#conten-alert").remove();
                            $('#alert').show();
                        }
                        $('#alert').append('<div id="conten-alert" class="alert alert-success" role="alert">Se agrego correctamente el documento!</div>');
                        
                        $('#alert').hide(5000);
                        
                        $("#btn-agregar-direccion").removeClass("disabled");
                        $("#btn-agregar-direccion").removeClass("btn-secondary");
                        $("#btn-agregar-direccion").addClass("animate-btn");

                        $("#btn-finalizar-registro").addClass("animate-btn");
                        
                        $("#formArticulos").removeClass("was-validated");
                 

                        let agregarDi = document.getElementById('btn-agregar-direccion');

                        agregarDi.addEventListener('click', function removef(){
                            setTimeout(
                                $("#formArticulos").removeClass("was-validated"), 5000
                            );
                            
                        })
                    

                    }
                });
                
            }

            
        });

        
        
        /* $('#modalCRUD').modal('hide'); */
    });




      
    
});