## ArrayAdapter para Spiner

***Cargar elementos de una bd y meterlos en un Spiner***

```java
    private void cargarProvincias() {
        ArrayList<Provincia> provincias = asistenteBd.getProvincias();
        ArrayAdapter<Provincia> adapter = new ArrayAdapter<>(this,
                                                          android.R.layout.simple_spinner_item,
                                                          provincias);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spProvincia.setAdapter(adapter);
    }
```

***Marcar como seleccionado un elemento de un Spiner***

```java 
        private void marcarProvinciaCliente(Provincia provincia) {
        ArrayAdapter<Provincia> adapter = (ArrayAdapter<Provincia>) spProvincia.getAdapter();
        int position = adapter.getPosition(provincia);
        spProvincia.setSelection(position);
    }
```