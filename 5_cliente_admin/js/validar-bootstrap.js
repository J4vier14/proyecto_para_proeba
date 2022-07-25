(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

     // Loop over them and prevent submission
     Array.prototype.slice.call(forms)
     .forEach(function (form) {
       form.addEventListener('click', function (event) {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }
 
           
           form.classList.add('was-validated')
         
       }, false)
     })
})()

/* 
let agregarDi = document.getElementById('btn-agregar-direccion');
let finalizarRe = document.getElementById('btn-finalizar-registro');

agregarDi.addEventListener('click', function () {
  window.location.href = "../web/fortdireccion.html"
})

finalizarRe.addEventListener('click', function () {
  window.location.href = "../index.html"
}) */