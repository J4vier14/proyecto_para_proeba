/* Variable de modulos instalados */
const e = require('express');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

/* acceder a todos los metodos y variables de la libreria express*/
var app = express();
/* Para enviar datos JSON posr metodo POST */
app.use(express.json());
/* Para que los clientes no tengan problemas al consumir la api */
app.use(cors());

/*---------- Parametros de conexion a la Base de Datos middelwares----------*/
var conexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_registro_clientes'
  });


/*---------- Probar la conexion ----------*/
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("¡Conexion exitosa en la base de datos!");
    }
})  

/* variable de abiente para el despliege en hosting y el hostin da una puerta */
const port = process.env.PORT || 3000;


/*---------- Configurar las Rutas ----------*/

/* Crear una ruta de prueba para la raiz con un mensaje */
app.get('/', function(req, res) {
    res.send('Estas Conectado a la API port:'+' '+ port + ` <br><h1 style="color:#1F4690"> Listado de APIs disponibles <h1/><hr>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene todos los campos de tabla clientes</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/clientes</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene un cliente espesificando el "id"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/clientes/id</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene los nombres y apellidos del cliente espesificando el "id"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/clientes/nombres/id</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene los documentos de un cliente espesificando el "id"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/clientes/documentos/id</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene todos los documentos mas el cliente"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/cliente/documentos</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene todos los documentos"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/documentos</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene las direcciones de un cliente espesificando el "id"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/clientes/direcciones/id</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene todas las direcciones mas el cliente"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/cliente/direcciones</p>
    <br>
    <h3 style="color: #003865; padding: 0px 20px 0px 20px;">Api obtiene todos los direciones"</h3>
    <p style="font-size: 18px; color: #EF5B0C; padding: 0px 20px 0px 20px;">/api/direcciones</p>
    <br><br><br><br>
`);
})

/* Traer los nombres y apellidos del cliente espesificando el id*/
app.get('/api/clientes/nombres/:id', (req, res) => {
    conexion.query('SELECT * FROM clientes  WHERE id_cliente = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila[0].NOMBRE1+' '+fila[0].NOMBRE2+' '+fila[0].APELLIDO1+' '+fila[0].APELLIDO2);
        }
    })
});


/* GRUD */
/* GET rescatar ultimi id registrado*/
app.get('/api/ultimoid', (req, res) => {
    conexion.query('SELECT MAX(`ID_CLIENTE`) AS id FROM `clientes`', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

app.get('/api/clientes', (req, res) => {
    conexion.query('SELECT * FROM clientes WHERE ESTADO_CLIENTE = "1" ORDER BY ID_CLIENTE DESC', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

/* GET Traer un cliente*/
app.get('/api/clientes/:id', (req, res) => {
    conexion.query('SELECT * FROM clientes  WHERE id_cliente = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
            
        }
    })
});

/* POS INSERTAR insertar clientes*/
app.post('/api/clientes', (req, res) => {
    let data = {nombre1: req.body.NOMBRE1, nombre2: req.body.NOMBRE2, apellido1: req.body.APELLIDO1, apellido2: req.body.APELLIDO2, telefono: req.body.TELEFONO, email: req.body.EMAIL};
    let sql = "INSERT INTO CLIENTES SET ? ";
    conexion.query(sql, data, function (error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* PUT modifica un cliente */
app.put('/api/clientes/:id', (req, res) => {
    /* Capturar valor desde la ruta */
    let ID_CLIENTE = req.params.id;
    let NOMBRE1 = req.body.NOMBRE1;
    let NOMBRE2 = req.body.NOMBRE2;
    let APELLIDO1 = req.body.APELLIDO1;
    let APELLIDO2 = req.body.APELLIDO2;
    let TELEFONO = req.body.TELEFONO;
    let EMAIL = req.body.EMAIL;
    /* let ESTADO_CLIENTE = req.body.ESTADO_CLIENTE; */

    let sql = "UPDATE CLIENTES SET NOMBRE1 = ?, NOMBRE2 = ?, APELLIDO1 = ?, APELLIDO2 = ?, TELEFONO = ?, EMAIL = ?  WHERE ID_CLIENTE = ?";
    conexion.query(sql, [NOMBRE1, NOMBRE2, APELLIDO1, APELLIDO2, TELEFONO, EMAIL,  ID_CLIENTE], function(error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* DELETE elimina un cliente */
app.delete('/api/clientes/:id', (req, res) => {
        /* Capturar valor desde la ruta */
        let ID_CLIENTE = req.params.id;
        let sql = "UPDATE  CLIENTES SET ESTADO_CLIENTE = '0'  WHERE ID_CLIENTE = ?";
        conexion.query(sql, [ID_CLIENTE], function(error, results) {
            if(error){
                throw error;
            }else{
                res.send(results)
            }
        })
});
/* DELETE elimina un cliente */
/* app.delete('/api/clientes/:id', (req, res) => {
    conexion.query('DELETE FROM CLIENTES WHERE id_cliente = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});
 */
/*METODO DOCUMENTOS*/
/* Traelos documentos de un cliente espesificando el id*/
app.get('/api/clientes/documentos/:id', (req, res) => {
    conexion.query('SELECT c.ID_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, d.ID_DOCUMENTO, d.NOMBRE_DOCUMENTO, d.NUMERO_DOCUMENTO FROM DOCUMENTOS d INNER JOIN CLIENTES c ON d.ID_CLIENTE = c.ID_CLIENTE WHERE c.ID_CLIENTE = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

/* Traer un documentos  de los clientes */
app.get('/api/clientes/docu', (req, res) => {
    conexion.query('SELECT c.ID_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, d.ID_DOCUMENTO, d.NOMBRE_DOCUMENTO, d.NUMERO_DOCUMENTO FROM DOCUMENTOS d INNER JOIN CLIENTES c ON d.ID_CLIENTE = c.ID_CLIENTE', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});



/* GRUD */
/* GET Traer todos los documentos */
app.get('/api/documentos', (req, res) => {
    conexion.query('SELECT c.ID_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, c.APELLIDO2, d.ID_DOCUMENTO, d.NOMBRE_DOCUMENTO, d.NUMERO_DOCUMENTO FROM DOCUMENTOS d INNER JOIN CLIENTES c ON d.ID_CLIENTE = c.ID_CLIENTE WHERE c.ESTADO_CLIENTE = "1" AND d.ESTADO_DOCUMENTO = "1"', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

/* GET Traer un documento*/
app.get('/api/documentos/:id', (req, res) => {
    conexion.query('SELECT * FROM documentos  WHERE id_documento = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

/* POS INSERTAR un documentos*/
app.post('/api/documentos', (req, res) => {
    let data = {nombre_documento: req.body.NOMBRE_DOCUMENTO, numero_documento: req.body.NUMERO_DOCUMENTO, id_cliente: req.body.ID_CLIENTE};
    let sql = "INSERT INTO DOCUMENTOS SET ?";
    conexion.query(sql, data, function (error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* PUT modifica un documento */
app.put('/api/documentos/:id', (req, res) => {
    let ID_DOCUMENTO = req.params.id;
    let NOMBRE_DOCUMENTO = req.body.NOMBRE_DOCUMENTO;
    let NUMERO_DOCUMENTO = req.body.NUMERO_DOCUMENTO;
    let ID_CLIENTE = req.body.ID_CLIENTE;
    let ESTADO_DOCUMENTO = req.body.ESTADO_DOCUMENTO;

    let sql = "UPDATE DOCUMENTOS SET  NOMBRE_DOCUMENTO = ?, NUMERO_DOCUMENTO = ?, ID_CLIENTE = ?, ESTADO_DOCUMENTO = ? WHERE ID_DOCUMENTO = ?";
    conexion.query(sql, [NOMBRE_DOCUMENTO, NUMERO_DOCUMENTO, ID_CLIENTE, ESTADO_DOCUMENTO, ID_DOCUMENTO], function (error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* DELETE elimina un documento */
app.delete('/api/documentos/:id', (req, res) => {
    conexion.query('DELETE FROM DOCUMENTOS WHERE ID_DOCUMENTO = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});


/*METODOS DIRECCIONES*/

/* Traer un direccionnes  de un cliente */
app.get('/api/clientes/direcciones/:id', (req, res) => {
    conexion.query('SELECT c.ID_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, di.DIRECCION, de.NOMBRE_DEPARTAMENTO, di.MUNICIPIO FROM DIRECCIONES di INNER JOIN DEPARTAMENTOS de ON de.ID_DEPARTAMENTO = di.ID_DEPARTAMENTO INNER JOIN CLIENTES c ON di.ID_CLIENTE = c.ID_CLIENTE WHERE c.ID_CLIENTE = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

/* Traer un direcciones de los clientes */
app.get('/api/cliente/direcciones', (req, res) => {
    conexion.query('SELECT c.ID_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, di.ID_DIRECCION, di.DIRECCION, di.MUNICIPIO, de.NOMBRE_DEPARTAMENTO FROM DIRECCIONES di INNER JOIN DEPARTAMENTOS de ON de.ID_DEPARTAMENTO = di.ID_DEPARTAMENTO INNER JOIN CLIENTES c ON di.ID_CLIENTE = c.ID_CLIENTE',(error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});


/* GRUD */
/* GET Traer todos las direcciones*/
app.get('/api/direcciones', (req, res) => {
    conexion.query('SELECT * FROM DIRECCIONES', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

/* GET Traer todos las direcciones*/
app.get('/api/direcciones/:id', (req, res) => {
    conexion.query('SELECT * FROM direcciones WHERE ID_DIRECCION = ?', [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila)
        }
    })
});

/* POS INSERTAR insertar direcciones*/
app.post('/api/direcciones', (req, res) => {
    let data = {direccion: req.body.DIRECCION, municipio: req.body.MUNICIPIO, id_departamento: req.body.ID_DEPARTAMENTO, id_cliente: req.body.ID_CLIENTE};
    let sql = "INSERT INTO DIRECCIONES SET ?";
    conexion.query(sql, data, function (error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* PUT modifica un direccion */
app.put('/api/direcciones/:id', (req, res) => {
    let ID_DIRECCION = req.params.id;
    let DIRECCION = req.body. DIRECCION;
    let MUNICIPIO  = req.body.MUNICIPIO ;
    let ESTADO_DIRECCION = req.body.ESTADO_DIRECCION;
    let ID_DEPARTAMENTO  = req.body.ID_DEPARTAMENTO ;
    let ID_CLIENTE = req.body.ID_CLIENTE;

    let sql = "UPDATE DIRECCIONES SET  DIRECCION = ?, MUNICIPIO = ?, ESTADO_DIRECCION = ?, ID_DEPARTAMENTO = ?, ID_CLIENTE = ? WHERE ID_DIRECCION = ?";
    conexion.query(sql, [DIRECCION, MUNICIPIO, ESTADO_DIRECCION, ID_DEPARTAMENTO, ID_CLIENTE, ID_DIRECCION], function (error, results) {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
});

/* DELETE elimina un direccion */
app.delete('/api/direcciones/:id', (req, res) => {
    conexion.query('DELETE FROM DIRECCIONES WHERE ID_DIRECCION = ?' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

/*-------------------- METODOS DEPARTAMENTOS-------------------- */
/* GET Traer todos los departamentos*/
app.get('/api/departamentos', (req, res) => {
    conexion.query('SELECT * FROM DEPARTAMENTOS', (error, filas) => {
        if(error){
            throw error;
        }else{
            res.send(filas)
        }
    })
});

/* GET Traer una departamento*/
app.get('/api/departamentos/:id', (req, res) => {
    conexion.query('SELECT * FROM DEPARTAMENTOS WHERE ID_DEPARTAMENTO = ?', [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila)
        }
    })
});

/*METODO Buscar*/
/* Traer los resultados de busqueda del cliente*/
app.get('/api/clientes/buscar/:id', (req, res) => {
    conexion.query('SELECT * FROM clientes WHERE NOMBRE1 LIKE "%'+req.params.id+'%" OR NOMBRE2 LIKE "%'+req.params.id+'%";' , [req.params.id], (error, fila) => {
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

/*---------- Servidor corriendo ---------*/

/* Resive el puesto de escucha y un mensaje  */
app.listen(port, function () {
    console.log("Servidor OK", port);
});

