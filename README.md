# **Run Project Proyecto Para Prueba**

Este documento describe la forma adecuada para que el proyecto funcione correctamente;
este proyecto consta de:

:white_check_mark: **Base de Datos**

:white_check_mark: **Api RestFul**


:white_check_mark: **Administrador  Cliente Web**


:white_check_mark: **Script Python para exportar tablas MySql a CSV, XLSX**

:white_check_mark: **Trigger para Auditoria de modificaciones en la base de datos**


## Paso :one:: Crear la base de datos en MySql
En esta parte se detalla como crear la base de datos e insertar la información.

**Paso 1: Abrir carpeta**
:open_file_folder: 1_data_base: abrir carpeta

**Paso 2: Inserta registro por registro respetando el orden de numeración**
  Copiar y pegar el contenido del archivo: :page_facing_up:insert_data_db_registro_clientes.txt


## Paso :two:: Levantar servicios API RestFul
:green_heart: [Es necesario tener instalado node js.](https://nodejs.org)

### Instalar Paquetes y Framework necesarios
En esta sección se describe como levantar servicios api con el servidor API RestFul .

Los paquetes y framework ya están instalados en el package.json de nuestro servidor son:

✅ [**Express**](https://expressjs.com/)
```js
$ npm install express --save
```

✅ [**mysql**](https://www.npmjs.com/package/mysql)
```js
$ npm install mysql
```

✅ [**cors**](https://www.npmjs.com/package/cors)

```js
$ npm install cors
```

✅ [**nodemon**](https://www.npmjs.com/package/nodemon)
```js
$ npm install nodemon --save-dev
```

### Paso 1: Instalar todos los paquetes y framework necesarios
:open_file_folder: Abrir la carpeta 2_api_restful con Visual Studio Code y en la consola integrada colocaremos:
```js
$ npm install
```
### Paso 2 (Opcional): Instalar nodemon
:bulb: Recargar automáticamente el servidor al haber cambios y agregar “--save-dev” para darle a entender que es un módulo de desarrollo y no vital para que funcione el servidor.
```js
$ npm install nodemon --save-dev
```


### Paso 3 : Correr servicios

Escribiendo en la consola para inicializar el servidor.
```js
npm run start
```
## Paso :four:: Exportar tablas MySql a CSV, XLSX

En esta parte se detalla cómo crear el reporte, exportando las tablas de la base de datos en archivos csv y xlsx.

### :bulb: Importante
Esto es necesario para ejecutar los script.

:snake:  [Es importante tener Python instalado.](https://www.python.org/)

Si usas Visual Studio Code puede instalar la extensión de  [:snake: Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

### Paso 1: Abrir carpeta
📂 6_exportar_tablas_csv

### Paso 2: Ejecutamos los script Python

En la carpeta tenemos tres scripts:

**Obtiene todos los datos de la tabla DB_BITACORA**
 :page_facing_up: db_obtener_bitacora_csv.py

**Obtiene todos los datos de la tabla CLIENTES**
 :page_facing_up: db_obtener_bitacora_csv.py

**Obtiene todos los datos de las tablas:**

 - CLIENTES
 - DOCUMENTOS
 - DIRECCIONES
 - DEPARTAMENTOS

 :page_facing_up: db_obtener_bitacora_csv.py

### Paso 3: Instalar las librerías a usar en el Script Python
:blue_book: Instalar pandas
```py
pip install pandas
```
:orange_book: Instalar mysql.connector
```py
pip install mysql.connector
```

:green_book: Instalar openpyxl
```py
pip install openpyxl
```

### Paso 4: Modificar credenciales de conexión si se necesita
 
```py
db = mysql.connector.connect(database ='', host='', user='', password='', port='')
```

### Paso 5: Modificar las rutas de guardado

Colocar tu ruta de guardado en:
```
df_csv = df.to_csv('C:/Users/Documents/proyecto/Datos_Completos_Clientes_CSV_'+str(hora_formateada)+'.csv')
```

```
df_csv = df.to_excel('C:/Users/Documents/proyecto/Datos_Completos_Clientes_XLSX_'+str(hora_formateada)+'.xlsx', sheet_name='pag', engine='openpyxl')
```

## Paso :five:: Crear Auditoría
En este paso se crea la auditoria de las modificaciones en la base de datos.

### Paso 1: Abrir carpeta
📂7_auditoria_cambios
 :page_facing_up: triggers_db_registro_clientes_s.txt

**Paso 2: Ejecutar los triggers en la base de datos**  
Copiar y pegar el contenido del archivo:  :page_facing_up: triggers_db_registro_clientes_s.txt

## Paso :eight:: CRUD con Cliente Web
En este paso administramos los datos de los clientes con el cliente web que esta consumiendo las APIs, desde nuestro servidor.

### Paso 1:  Abrir carpeta
📂5_cliente_admin  con Visual Studio code y situados en el index.html ejecutamos la extencion  [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
 
 ### Paso 3:  Ultimo paso
 En este paso solo nos queda usar el cliente web para realizar las operaciones de crud.



