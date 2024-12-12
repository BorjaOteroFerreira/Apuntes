## ResultLauncher para obtener resultado de otra activity

**Activity 1**

```java
//A nivel de clase 
ActivityResultLauncher<Intent> resultLauncher;

//en el oncreate 
resultLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> EstamosDeVuelta(result.getResultCode())
        );
```

**metodo que hace algo en funcion del resultado obtenido de la actividad 2**

```java

    private void EstamosDeVuelta(int resultCode) {
        if(resultCode==RESULT_OK){
             mostrarClientes(); 
        };
    }
```

**Activity 2**

***Se setea el resultado con el tipo deseado antes de cerrar la activdad que devuelve el resultado***

```java 
setResult(RESULT_OK);
finish();
```