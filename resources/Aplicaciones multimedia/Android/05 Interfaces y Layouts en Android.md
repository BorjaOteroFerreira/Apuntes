<br>
<small>Tanto el contenido como la estructura de estos apuntes ha sido realizado integramente por <b>David Lopez Amenedo</b></small><br>
<small>Esta obra está bajo una <a href="https://creativecommons.org/licenses/by-sa/4.0/">licencia de Creative Commons Reconocimiento-CompartirIgual 4.0 Internacional</a>.</small>


# Interfaces y Layouts en Android


### Introducción a los Layouts

* **Definición**: Un layout es la estructura de la interfaz de usuario de una aplicación Android
* **Tipos de Layouts**:
	+ **LinearLayout**: Organiza vistas en una sola columna o fila
	+ **RelativeLayout**: Organiza vistas relativas entre sí
	+ **ConstraintLayout**: Organiza vistas utilizando restricciones
	+ **GridLayout**: Organiza vistas en una cuadrícula
	+ **TableLayout**: Organiza vistas en una tabla

### Elementos de un Layout

* **Vistas (Views)**: Elementos individuales de la interfaz de usuario (botones, texto, etc.)
* **ViewGroups**: Contenedores para vistas (layouts)
* **Attrs**: Atributos utilizados para configurar vistas y viewgroups

### Creación de un Layout

* **Utilizando el Editor de Layout de Android Studio**:
	+ **Arrastrar y soltar vistas** en el editor
	+ **Configurar attrs** en la paleta de attrs
* **Utilizando XML**:
	+ **Definir el layout** en un archivo XML
	+ **Utilizar attrs** para configurar vistas y viewgroups

### Ejemplo de Layout en XML
```xml
<!-- activity_main.xml -->
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/tvTitulo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hola Mundo"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/btnSalir"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Salir"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Asignación de un Layout a una Actividad

* **Utilizando el método `setContentView()`**:
```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

**¿Qué deseas hacer a continuación?**

1. **Continuar con el siguiente MD:** Notificaciones y Alerts en Android
2. **Repetir el anterior:** Interfaces y Layouts en Android
3. **Volver:** Regresar al índice y cambiar de sección
4. **Saltar siguiente:** Omitir la siguiente sección (Notificaciones y Alerts en Android) y generar el siguiente MD