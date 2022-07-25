import pandas as pd
import mysql.connector

from datetime import datetime

now = datetime.now()
hora_formateada = now.strftime("%Y-%m-%d %H-%M-%S")
print(hora_formateada)

db = mysql.connector.connect(database ='db_registro_clientes', host='localhost', user='root',  password='', port='3306')
cursor = db.cursor()

query = "SELECT ID_CLIENTE, NOMBRE1, APELLIDO1, TELEFONO, EMAIL FROM CLIENTES"
cursor.execute(query)

myallData = cursor.fetchall()

all_id_cliente = []
all_nombre1 = []
all_apellido1 = []
all_telefono = []
all_email = []

for id_cliente, nombre1, apellido1, telefone, email in myallData:
    all_id_cliente.append(id_cliente)
    all_nombre1.append(nombre1)
    all_apellido1.append(apellido1)
    all_telefono.append(telefone)
    all_email.append(email)

dic = {'id_cliente': all_id_cliente, 'nombre1' : all_nombre1, 'apellido1' : all_apellido1, 'telefone' : all_telefono, 'email': all_email}
df = pd.DataFrame(dic)
df_csv = df.to_csv('C:/Users/Alexander/Documents/proyecto_jr/Clientes_CSV_'+str(hora_formateada)+'.csv')
df_csv = df.to_excel('C:/Users/Alexander/Documents/proyecto_jr/Clientes_XLSX_'+str(hora_formateada)+'.xlsx', sheet_name='pag', engine='openpyxl')
