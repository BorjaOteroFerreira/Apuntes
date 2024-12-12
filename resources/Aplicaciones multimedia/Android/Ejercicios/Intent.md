## INTENTS 

***Se instancia un nuevo intent y se le pasa como parametro el contexto (this al ser una vista), y el .Class de la activity que quieres cargar, despues se utiliza un resultLauncher previamente instanciado para lanzar el intent***

```java
Intent intent = new Intent(this, FormularioCliente.class);
resultLauncher.launch(intent);
```