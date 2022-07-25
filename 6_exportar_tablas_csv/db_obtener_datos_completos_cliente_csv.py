import pandas as pd
import mysql.connector
from datetime import datetime

now = datetime.now()
hora_formateada = now.strftime("%Y-%m-%d %H-%M-%S")
print(hora_formateada)

db = mysql.connector.connect(database ='db_registro_clientes', host='localhost', user='root',  password='', port='3306')
cursor = db.cursor()

query = "SELECT c.ID_CLIENTE, c.ESTADO_CLIENTE, c.NOMBRE1, c.NOMBRE2, c.APELLIDO1, c.APELLIDO2, C.TELEFONO, C.EMAIL, doc.ID_DOCUMENTO, doc.NOMBRE_DOCUMENTO, doc.NUMERO_DOCUMENTO, doc.ESTADO_DOCUMENTO, di.ID_DIRECCION, di.DIRECCION, di.MUNICIPIO, di.ESTADO_DIRECCION, de.ID_DEPARTAMENTO, de.NOMBRE_DEPARTAMENTO FROM CLIENTES c INNER JOIN DOCUMENTOS doc ON doc.ID_CLIENTE = c.ID_CLIENTE INNER JOIN DIRECCIONES di ON di.ID_CLIENTE = c.ID_CLIENTE INNER JOIN DEPARTAMENTOS de ON de.ID_DEPARTAMENTO = di.ID_DEPARTAMENTO;"
cursor.execute(query)

myallData = cursor.fetchall()

all_id_cliente = []
all_estado_cliente = []
all_nombre1 = []
all_nombre2 = []
all_apellido1 = []
all_apellido2 = []
all_telefono = []
all_email = []
all_id_documento = []
all_nombre_documento = []
all_numero_documento = []
all_estado_documento = []
all_id_direccion = []
all_direccion = []
all_municipio = []
all_estado_direccion = []
all_id_departamento = []
all_nombre_departamento = []

for id_cliente, estado_cliente, nombre1, nombre2, apellido1, apellido2, telefone, email, id_documento, nombre_documento, numero_documento, estado_documento, id_direccion, direccion, municipio, estado_direccion, id_departamento, nombre_departamento in myallData:
    all_id_cliente.append(id_cliente)
    all_estado_cliente.append(estado_cliente)
    all_nombre1.append(nombre1)
    all_nombre2.append(nombre2)
    all_apellido1.append(apellido1)
    all_apellido2.append(apellido2)
    all_telefono.append(telefone)
    all_email.append(email)
    all_id_documento.append(id_documento)
    all_nombre_documento.append(nombre_documento)
    all_numero_documento.append(numero_documento)
    all_estado_documento.append(estado_documento)
    all_id_direccion.append(id_direccion)
    all_direccion.append(direccion)
    all_municipio.append(municipio)
    all_estado_direccion.append(estado_direccion)
    all_id_departamento.append(id_departamento)
    all_nombre_departamento.append(nombre_departamento)

dic = {'id_cliente': all_id_cliente, 'estado_cliente': all_estado_cliente, 'nombre1' : all_nombre1, 'nombre2' : all_nombre2, 'apellido1' : all_apellido1, 'apellido2' : all_apellido2, 'telefone' : all_telefono, 'email': all_email, 'id_documento': all_id_documento, 'nombre_documento': all_nombre_documento, 'numero_documento': all_numero_documento,'estado_documento': all_estado_documento, 'id_direccion': all_id_direccion, 'direccion' : all_direccion, 'municipio': all_municipio, 'estado_direccion': all_estado_direccion, 'id_departamento': all_id_departamento,'nombre_departamento' : all_nombre_departamento}
df = pd.DataFrame(dic)
df_csv = df.to_csv('C:/Users/Alexander/Documents/proyecto_jr/Datos_Completos_Clientes_CSV_'+str(hora_formateada)+'.csv')
df_csv = df.to_excel('C:/Users/Alexander/Documents/proyecto_jr/Datos_Completos_Clientes_XLSX_'+str(hora_formateada)+'.xlsx', sheet_name='pag', engine='openpyxl')
