# CONSULTAR BD con ADB 

***Listamos los dispositivos disponibles***

```bash 
adb devices 
``` 
***Conecta con una shell al dispositivo***

```bash
adb -s <deivce_name> shell
```

***Cambia a su y nos movemos a la carpeta donde se encuentra la bd***

```bash
su
cd data/data/paqueteDeTuAplicacion/databases/nombreBD.bd
``` 

***Abre la bd con sqlite3***

```bash
sqlite3 nombreBD.bd
```
***Realiza consultas a la bd***

```sql
select * from tabla 
```