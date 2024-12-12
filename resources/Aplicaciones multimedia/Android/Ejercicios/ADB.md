# CONSULTAR BD con ADB 

***Listamos los dispositivos disponibles***

```batch 
adb devices 
``` 
***Conecta con una shell al dispositivo***

```batch
adb -s <deivce_name> shell
```

***Cambia a su y nos movemos a la carpeta donde se encuentra la bd***

```batch
su
cd data/data/paqueteDeTuAplicacion/databases/nombreBD.bd
``` 

***Abre la bd con sqlite3***

```batch
sqlite3 nombreBD.bd
```
***Realiza consultas a la bd***

```sql
select * from tabla 
```