import pandas as pd
import mysql.connector

from datetime import datetime

now = datetime.now()
hora_formateada = now.strftime("%Y-%m-%d %H-%M-%S")
print(hora_formateada)

db = mysql.connector.connect(database ='db_registro_clientes', host='localhost', user='root',  password='', port='3306')
cursor = db.cursor()

query = "SELECT ID_BITACORA, B_FECHA, NOMBRE_ACCION, DATOS_ACCION, VER_USUARIO, EJECUTAR_CAMBIO, REVERTIR_CAMBIO  FROM DB_BITACORA;"
cursor.execute(query)

myallData = cursor.fetchall()

all_id_bitacora = []
all_b_fecha = []
all_nombre_accion = []
all_datos_accion = []
all_ver_usuario = []
all_ejecutar_cambio = []
all_revertir_cambio = []


for id_bitacora, b_fecha, nombre_accion, datos_accion, ver_usuario, ejecutar_cambio, revertir_cambio in myallData:
    all_id_bitacora.append(id_bitacora)
    all_b_fecha.append(b_fecha)
    all_nombre_accion.append(nombre_accion)
    all_datos_accion.append(datos_accion)
    all_ver_usuario.append(ver_usuario)
    all_ejecutar_cambio.append(ejecutar_cambio)
    all_revertir_cambio.append(revertir_cambio)


dic = {'id_bitacora': all_id_bitacora, 'b_fecha' : all_b_fecha, 'nombre_accion' : all_nombre_accion, 'datos_accion' : all_datos_accion, 'ver_usuario': all_ver_usuario, 'ejecutar_cambio': all_ejecutar_cambio, 'revertir_cambio': all_revertir_cambio}
df = pd.DataFrame(dic)
df_csv = df.to_csv('C:/Users/Alexander/Documents/proyecto_jr/Bitacora_CSV_'+str(hora_formateada)+'.csv')
df_csv = df.to_excel('C:/Users/Alexander/Documents/proyecto_jr/Bitacora_XLSX_'+str(hora_formateada)+'.xlsx', sheet_name='pag', engine='openpyxl')
