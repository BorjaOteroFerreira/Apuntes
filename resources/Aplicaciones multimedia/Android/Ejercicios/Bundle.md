## BUNDLE 


***Para utilizar un bundle y transferir datos de un activity a otro hacemos un put en el intent antes de lanzarlo hacia la otra activity***

```java
   intent.putExtra("idCliente", cliente.getId());
```

***En la segunda activity declaramos un bundle a nivel de clase y extraemos del bundle los datos con get***

```java 
clase ejemplo {
    Bundle extras ; 

    extras = getIntent().getExtras();

    extras.getInt("id", -1) //key - valorDefault
}
```

