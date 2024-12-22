Unidad 1: Gestión de Ficheros

- Manejo básico de ficheros en java
  - Concepto de fichero
  - Clasificación de los ficheros
    - Según el tipo de acceso a los datos
  - Tipos de operaciones en ficheros
  - Paquete java.io
  - Stream (Flujos de datos)
    - Tipos de flujos en java
      - Flujos de bytes:
        - Jerarquía de los flujos de bytes
      - Flujos de caracteres:
        - Jerarquía de los flujos de caracteres
        - Clases equivalentes entre flujos de bytes y flujos de caracteres
  - E/S estándar
    - Lectura de teclado en java
      - InputStream: el objeto System.in
      - Los Readers: InputStreamReader y BufferedReader
      - Convertir una cadena String a un tipo de datos numérico
      - La clase Scanner
    - Salida formateada: Clase PrintStream
  - Sistema de Ficheros y Directorios en Java
    - La clase FILE
      - Creación de un objeto File
      - Métodos de la clase File
  - Escribir y leer datos de archivos secuenciales binarios: Clases FileOutputStream y FileInputStream
  - Las clases orientadas al filtrado del flujo de bytes.
    - Acceso a datos primitivos:Clases DataInputStream y DataOutputStream
    - Flujos orientados a byte con buffer: Clases BufferedInputStream y BufferedOutputStream
    - Combinación de clases sobre los flujos de entrada y salida
  - Escribir y leer datos en archivos secuenciales de texto.
    - Clases FileReader y FileWriter
    - Codificación de caracteres
    - Las clases OutputStreamReader e InputStreamReader
    - Buffer para el flujo de caracteres: Clases BufferedReader y BufferedWriter
  - Escritura formateada: la clase printWriter
  - La clase StreamTokenizer
  - Serialización
    - Interfaz Serializable
    - Excluir campos al serializar objetos
    - Flujos para la entrada y salida de objetos: ObjectInputStream e ObjectOutputStream
    - Escritura de objetos en ficheros
    - Lectura de objetos en ficheros
    - Seria lización de objetos compuestos
  - Ficheros de acceso directo
Unidad 1: Gestión de ficheros

### 1.1 Concepto de fichero

Un archivo o fichero es una colección de datos homogéneos almacenados en un soporte físico del computador.

*   Datos homogéneos: Almacena colecciones de datos del mismo tipo (igual que arrays/vectores)
*   Cada elemento almacenado en un fichero se denomina registro, que se compone de campos.
*   Puede ser almacenado en diversos soportes (disco duro, disquete, pendrive,.. )

Desde el punto de vista de más bajo nivel, podemos definir un archivo (o fichero) como:

Un conjunto de bits almacenados en un dispositivo, y accesible a través de un camino de acceso (path name) que lo identifica.

Es decir, un conjunto de 0s y 1s que reside fuera de la memoria del ordenador, ya sea en el disco duro, un pendrive, un CD, entre otros.

### 1.2 Clasificación de los ficheros

Podemos utilizar varios criterios para distinguir diversas sub categorías de archivos. Estos tipos de archivos se diferenciarán desde el punto de vista de la programación, en que cada uno de ellos proporcionará diferentes funcionalidades (métodos) para su manipulación. Según su contenido:

*   Los archivos de caracteres (o de texto)
*   Los archivos de bytes (o binarios)

### 1.3 Tipos de archivos

*   **Archivos de caracteres (o de texto)**: Contienen datos de texto, como cadenas de caracteres, números y otros tipos de datos que se pueden interpretar como texto.
*   **Archivos de bytes (o binarios)**: Contienen datos binarios, como imágenes, audio y otros tipos de datos que no se pueden interpretar como texto.

### 1.4 Uso de archivos en Java

En Java, podemos utilizar archivos para almacenar y recuperar datos de manera persistente. Los archivos se pueden crear y manipular utilizando las clases de la biblioteca estándar de Java.

### 1.5 Clases de archivo en Java

*   `File`: Clase que representa un archivo o directorio en el sistema de archivos.
*   `FileInputStream`: Clase que permite leer datos de un archivo.
*   `FileOutputStream`: Clase que permite escribir datos en un archivo.
*   `BufferedReader`: Clase que permite leer datos de un archivo de manera eficiente.
*   `BufferedWriter`: Clase que permite escribir datos en un archivo de manera eficiente.

### 1.6 Creación y manipulación de archivos en Java

*   Crear un archivo: `File file = new File("archivo.txt");`
*   Leer un archivo: `BufferedReader reader = new BufferedReader(new FileReader(file));`
*   Escribir en un archivo: `BufferedWriter writer = new BufferedWriter(new FileWriter(file));`

### 1.7 Ejemplo de creación y manipulación de archivos en Java

```java
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.BufferedWriter;

public class EjemploArchivo {
    public static void main(String[] args) {
        // Crear un archivo
        File file = new File("archivo.txt");

        // Escribir en el archivo
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write("Hola, mundo!");
        } catch (IOException e) {
            System.err.println("Error al escribir en el archivo: " + e.getMessage());
        }

        // Leer el archivo
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }
        } catch (IOException e) {
            System.err.println("Error al leer el archivo: " + e.getMessage());
        }
    }
}
```

Este código crea un archivo llamado "archivo.txt", escribe en él la cadena "Hola, mundo!", y luego lee el contenido del archivo y lo imprime en la consola.
Unidad 1: Gestión de ficheros

* Un fichero de texto es aquél formado exclusivamente por caracteres y que, por tanto, puede crearse y visualizarse usando un editor. Las operaciones de lectura y escritura trabajarán con caracteres. Por ejemplo, los ficheros con código java son ficheros de texto.
* En cambio, un fichero binario ya no está formado por caracteres sino que los bytes que contiene pueden representar otras cosas como números, imágenes, sonido, etc.

1.2.1 Según el tipo de acceso a los datos:

Existen dos modos básicos de acceso a la información contenida en un archivo:

* Acceso secuencial: En este caso, los datos son leídos secuencialmente, desde el principio hasta el final. La información del archivo es una secuencia de bytes (o caracteres) de manera que para acceder al byte (o carácter) N se ha de haber accedido anteriormente a los N-1 anteriores.
* Acceso aleatorio (“Ran dom” o directo): los archivos de acceso aleatorio permiten acceder a los datos en forma no secuencial, desordenada. Nos permite acceder directamente a la información del byte N.

En java podemos incluir otro tipo de acceso a los datos:

* Concatenación (tuberías o pipes): Muchas veces es útil realizar conexiones entre programas que corren simultáneamente dentro de una misma máquina, de forma que lo que uno produce se envía por un “tubo” para ser recibido por el otro, que está esperando a la salida del tubo (sin tener que utilizar una memoria intermedia). Las tuberías o pipes cumplen esta función.

1.3 Tipos de operaciones en ficheros

Las operaciones más comunes en ficheros son:

* Operación de Creación
* Operación de Apertura. Varios modos:
  - Sólo lectura
  - Sólo escritura
  - Lectura y Escritura
* Operaciones de lectura/escritura
* Operaciones de inserción/borrado
* Operaciones de renombrado/eliminación
* Operación de desplazamiento dentro de un fichero
* Operación de ordenación
* Operación de cierre
- Unidad 1: Gestión de ficheros
- Las operaciones sobre fichero se van a realizar en el byte que señalen los punteros de lectura y escritura:
  - Indican el próximo byte a leer o a escribir
  - Gestionados automáticamente por el sistema operativo
  - Cuando se abren, se comienzan apuntando al primer byte del fichero
  - Van avanzando por el fichero según se van leyendo sus contenidos o escribiendo datos.

1.4 Paquete java.io
El paquete java.io contiene todas las clases relacionadas con las funciones de entrada (input) y salida (output).

- Clases del paquete java.io:
  - FileInputStream
  - FileOutputStream
  - FileInputStreamReader
  - FileOutputStreamWriter
  - InputStream
  - OutputStream
  - Reader
  - Writer
Unidad 1: Gestión de ficheros

Clase final
No se puede heredar de una clase final.

Clase abstracta
Una clase abstracta es una clase de la que no se puede crear objetos. La utilidad de estas clases 
estriba en que otras clases hereden de ésta, por lo que con ello conseguiremos reutilizar código. Para de 
clarar una clase como abstracta utilizamos la palabra clave abstract. Los métodos para los que no aporte una 
implementación serán declarados a su vez abstractos. Si una clase tiene un método abstract es obligatorio que la 
clase sea abstract. Todas las subclases que hereden de una clase abstracta tendrán que redefinir los métodos 
abstractos dándoles una implementación.

Interfaz
es una clase abstracta pura, es decir una clase donde todos los métodos son abstractos (no se implementa 
ninguno). Permite al diseña dor de clases establecer la forma de una clase (nombres de métodos, listas de 
argumentos y tipos de retorno, pero no bloques de código) obligando a  que ciertas clases utilicen estos mismos 
métodos (nombres y parámetros).

1.5 Stream (Flujos de datos)

Java se basa en las secuencias de datos para dar facilidades de entrada y salida. Una secuencia es una 
corriente de datos en serie entre un emisor y un receptor de datos en cada extremo.

Los programas en Java realizan la E/S a través de streams (Flujos), es decir, cualquier programa 
realizado en Java que necesite llevar a cabo una operación de E/S lo hará a través de un stream.

Un stream, cuya traducción literal es "flujo", es una abstracción de todo aquello que produzca o consuma 
información.

Un flujo no está relacionado con un dispositivo físico, comportándose todos los flujos de la misma 
manera aunque traten con dispositivos distintos. Debido a esta característica se pueden aplicar las mismas 
clases a cualquier tipo de dispositivo.

La vinculación del stream al dispositivo físico lo lleva a cabo el sistema de entrada y salida de Java.

Las clases y métodos de I/O que necesitamos emplear son las mismas independientemente del dispositivo 
con el que estemos actuando, luego, el núcleo de Java sabrá si tiene que tratar con el teclado, el monitor, un 
sistema de ficheros o un socket de red liberando a nuestro código de tener que saber con quién está 
interactuando.

Un programa utiliza input stream (un flujo de entrada) para obtener los datos leídos de una fuente:

Un programa utiliza un output stream (flujo de salida) para escribir los datos a un destino:

La fuente de datos (data source) y el destino de los datos (data destination) de los diagramas anteriores 
puede ser cualquier cosa que genera o consume datos. Esto incluye obviamente archivos de disco, pero una 
fuente o un destino puede ser otro programa, un dispositivo (impresora, periférico, etc.), un socket de red 
(es un método para la comunicación entre un programa del cliente y un programa del servidor en una red) o un 
array.
Unidad 1: Gestión de ficheros

*   Los flujos de bytes: Los datos fluyen en serie, byte a byte.
*   Los flujos de caracteres: Transmiten caracteres Java

**1.6.1 Flujos de bytes**

Nos proporciona un medio adecuado para el manejo de entradas y salidas de bytes y su uso lógicamente está orientado a la lectura y escritura de datos binarios.

El tratamiento del flujo de bytes viene gobernado por dos clases abstractas: `InputStream` y `OutputStream`.

Cada una de estas clases abstractas tiene varias subclases concretas que controlan las diferencias entre los distintos dispositivos de I/O que se pueden utilizar. Así mismo, estas dos clases son las que definen los métodos que sus subclases tendrán implementados y, de entre todo s, destacan `read()` y `write()` que leen y escriben bytes de datos respectivamente.

**1.6.2 Flujos de caracteres**

Proporciona un medio conveniente para el manejo de entradas y salidas de caracteres.

Dichos flujos usan codificación Unicode y, por tanto, se pueden internacionalizar.

Este es un modo que Java nos proporciona para manejar caracteres pero al nivel más bajo todas las operaciones de I/O son orientadas a byte.

Al igual que la anterior el flujo de caracteres también viene gobernado por dos clases abstractas: `Reader` y `Writer`.

Dichas clases manejan flujos de caracteres Unicode. Y también de ellas derivan subclases concretas que implementan los métodos definidos en ellas siendo los más destacados los métodos `read()` y `write()` que, en este caso, leen y escriben caracteres de datos respectivamente.

**1.6.3 Utilización de los flujos**

La utilización de los flujos es un nivel de abstracción que hace que un programa no tenga que saber nada del dispositivo, lo que se traduce en una facilidad más a la hora de escribir programas, ya que los algoritmos para leer y escribir datos serán siempre más o menos los mismos.

En general, las operaciones serán:

▪ Lectura
1.  Abrir un flujo a una fuente de datos (creación del objeto stream): Teclado, Fichero, Socket
2.  Mientras existan datos disponibles
- Leer datos
3.  Cerrar el flujo (método close)

▪ Escritura
1.  Abrir un flujo a una fuente de datos (creación del objeto stream): Pantalla, Fichero, Socket
2.  Mientras existan datos disponibles
- Escribir datos
3.  Cerrar el flujo (método close)

Nota: Para los flujos estándar ya se encarga el sistema de abrirlos y cerrarlos.

Un fallo en cualquier punto produce la excepción `IOException`
Unidad 1: Gestión de ficheros

Las clases de java.io siguen una nomenclatura sistemática que permite deducir su función a partir de las palabras que componen el nombre.

- **InputStream, OutputStream**: Lectura/Escritura de bytes
- **Reader, Writer**: Lectura/Escritura de caracteres
- **File**: Archivos y directorios
- **String, CharArray, ByteArray, StringBuffer**: Memoria (a través del tipo primitivo indicado)
- **Piped**: Tubería de datos
- **Buffered**: Buffer
- **Filter**: Filtro o procesos sobre el stream
- **Data**: Intercambio de datos en formato propio de Java (datos primitivos)
- **Object**: Persistencia de objetos
- **Print**: Imprimir

Un buffer es un espacio de memoria intermedia. Cuando se necesita un dato del disco se trae a memoria ese dato y sus datos contiguos, de modo que la siguiente vez que se necesite algo del disco la probabilidad de que esté ya en memoria sea muy alta. Algo similar se hace para escritura, intentando realizar en una sola operación de escritura física varias sentencias individuales de escritura.
Unidad 1: Gestión de ficheros

Jerarquía de los flujos de bytes
================================

- Los programas utilizan secuencias de bytes para realizar la entrada y salida de bytes (8-bits).
- Todas las clases de flujos de bytes descienden de las clases abstractas `InputStream` y `OutputStream`.
- Al tratarse de clases abstractas, no vamos a poder crear objetos de estas clases porque su funcionalidad está "incompleta" (tienen métodos que no están definidos, implementándolos las subclases), y así nos permiten representar un flujo de datos de entrada o salida binario cualquiera.
- Cada una de las clases hijas de `InputStream` y `OutputStream` proporciona una funcionalidad más específica a la clase padre, por lo tanto, tendremos que crear objetos de alguna de sus subclases.
- En la siguiente figura podemos ver la jerarquía de los flujos de entrada y salida de bytes de Java:

Métodos de `InputStream`
-------------------------

- `int available()`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
- `void close()`: Cierra la corriente de entrada y libera los recursos del sistema que esté usando.
- `void mark(int readlimit)`: Marca la posición actual de la corriente de entrada.
- `boolean markSupported()`: Prueba si esta corriente de entrada soporta los métodos mark y reset.
- `abstract int read()`: Lee el siguiente byte de la corriente de entrada.
Unidad 1: Gestión de ficheros

- Lee bytes de la corriente de entrada y los deposita en el vector b.
 ```java
int read(byte[] b, int off, int len)  
   Lee hasta len bytes de la corriente de entrada y los deposita en b a partir de off.
```
- Lee hasta len bytes de la corriente de entrada y los deposita en b a partir de off.
- Coloca la corriente de entrada en la posición que tenía la última vez que se invocó mark.
 ```java
void  reset()  
   Coloca la corriente de entrada en la posición que tenía la última vez que se invocó  mark.
```
- Salta y descarta los siguientes n bytes de la corriente de entrada.
 ```java
long  skip(long n)  
   Salta y descarta los siguientes n bytes de la corriente de entrada.
```
Métodos de OutputStream

- Cierra la corriente de salida y libera los recursos del sistema que está utilizando.
 ```java
void  close()  
    Cierra la corriente de salida y libera los recursos del sistema que está utilizando.
```
- Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
 ```java
void  flush()  
    Fuerza a que se escriba inmediatamente t odo l o que pueda estar en el buffer de salida.
```
- Escribe todos los bytes del vector b en la corriente de salida.
 ```java
void  write(byte[] b)  
    Escribe todos los b.length bytes del vector  b en la corriente de salida.
```
- Escribe len bytes del vector b comenzando en la posición off.
 ```java
void  write(byte[] b, int off, int  len)  
    Escribe   len bytes del vector  b comenzando en la posición  off.
```
- Escribe un byte especificado por el int b.
 ```java
abstract  void  write(int b)  
    Escribe un byte especificado por el int  b.
```
Los tres métodos read sirven para leer bytes:

- Lee un solo byte y devuelve su valor como un entero entre 0 y 255.
 ```java
public abstract int read() throws IOExcept ion; 
```
- Lee tantos bytes como pueda hasta llenar el vector (array) b que se le pasa como parámetro o hasta que se acabe la corriente.
 ```java
public int read(byte[] b) throws IOException;  
```
- Lee los n bytes y los pone en el vector b, a partir de la posición pos.
 ```java
public int read(byte[] b,int pos, int n) throws IOException ; 
```
El primero lee un solo byte y devuelve su valor como un entero entre 0 y 255. El segundo lee tantos bytes 
como pueda hasta llenar el vector (array) b que se le pasa como parámetro o hasta que se acabe la corriente. 
El último lee los n bytes y los pone en el vector b, a partir de la posición pos. ¿Qué ocurre si la corriente de 
entrada se termina? En ese caso el resultado de los métodos read es -1.

Los tres métodos de escritura write son análogos a los de lectura.

- Escribe un byte aunque se le pase como parámetro un entero.
 ```java
public abstract void write(int b) throws IOException;  
```
- Escribe todos los bytes del vector b que se le pasa como parámetro y el tercero escribe n bytes del vector b comenzando desde la posición pos.
 ```java
public void write(byte[] b) throws IOException;  
public void write(byte[] b,int pos, int n) throws IOException;  
```
El primero e scrib e un byte aunque se le pase como parámetro un entero. El método convierte el entero a 
byte y luego lo escribe. Para no perder información al método write(int n) sólo se le deben pasar valores n 
entre 0 y 255. El segundo método write escribe todos los bytes  del vector b que se le pasa como parámetro y 
el tercero escribe n bytes del vector b comenzando desde la posición pos.

1.9 Jerarquía de los flujos de caracteres

Existen dos variaciones para las Clases InputStream y OutputStream que son: Writer y Reader .

La p rincipal diferencia entre estas clases es que las primeras ofrecen lo que es
# Unidad 1: Gestión de ficheros

## Metodos de Reader

### Cierra la corriente de entrada y libera los recursos del sistema que esté usando
```java
abstract void close()
```

### Marca la posición actual de la corriente de entrada
```java
void mark(int readlimit)
```

### Prueba si esta corriente de entrada soporta los métodos mark y reset
```java
boolean markSupported()
```

### Lee un character
```java
int read()
```

### Lee caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf
```java
void read(char[] cbuf)
```

### Lee len caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf a partir de off
```java
abstract int read(char[] cbuf, int off, int len)
```

### Indica si el flujo de entrada está listo para ser leído
```java
boolean ready()
```

### Restablece el flujo de entrada
```java
void reset()
```

### Salta n caracteres
```java
long skip(long n)
```

## Metodos de Writer

### Añade el carácter especificado en el flujo de salida
```java
Writer append(char c)
```

### Cierra el flujo de salida
```java
abstract void close()
```

### Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida
```java
abstract void flush()
```

### Escribe un array de caracteres
```java
void write(char[] cbuf)
```

### Escribe len caracteres a partir del desplazamiento marcado por off
```java
abstract void write(char[] cbuf, int off, int len)
```

### Escribe un carácter
```java
void write(int c)
```

### Escribe una cadena
```java
void write(String str)
```

### Escribe una porción de la cadena empezando en off y de longitud len
```java
void write(String str, int off, int len)
```
Unidad 1: Gestión de ficheros

1.10 Clases equivalentes entre flujos de bytes y fujos de caracteres

2. E/S estándar

Todos los programas Java importan el paquete Java.lang automáticamente. Este paquete define una clase llamada System:

Es una clase final y todos sus contenidos son privados. No se puede instanciar un objeto de esa clase. La clase System siempre está ahí disponible para que se pueda invocar cualquiera de sus métodos.

Todos los miembros del paquete java.lang se pueden usar directamente, no hay que importarlos.

Contiene tres variables con flujos predefinidos llamadas in, out y err, que se pueden utilizar sin tener una referencia a un objeto System específico.

En Java se accede a la E/S estándar a través de los atributos estáticos de la clase java.lang.System

• System.in: implementa la entrada estándar. Por defecto es el teclado.
• System.out: implementa la salida estándar. Por defecto es la pantalla.
• System.err: implementa la salida de error. Por defecto es la pantalla

Estos flujos standard el sistema se encarga de abrirlos y cerrarlos automáticamente.

• System.in:
  - Instancia de la clase InputStream: flujo de bytes de entrada
# Unidad 1: Gestión de ficheros

## Lectura de un byte de la entrada como entero
```java
int c = System.in.read();
```
## Ignorar n bytes de la entrada
```java
System.in.skip(10);
```
## Número de bytes disponibles para leer en la entrada
```java
int bytesDisponibles = System.in.available();
```
## System.out
- Instancia de la clase `PrintStream` (subclase de `OutputStream`): flujo de bytes de salida
- Métodos para impresión de datos
```java
System.out.println("Hola, mundo!");
```
## System.err
- Funcionamiento similar a `System.out`
- Se utiliza para enviar mensajes de error (por ejemplo, a un fichero de log o a la consola)

## Ejemplo: Leer caracteres por teclado (byte a byte) hasta pulsar retorno de carro formado una cadena
```java
package ejentradastandardbyte;

import java.io.*;

public class EjEntradaStandardbyte {
    public static void main(String[] args) throws IOException {
        int c, contador = 0;
        String cadena = new String();

        while ((c = System.in.read()) != '\n') {
            contador++;
            cadena += (char) c;
        }

        System.out.println("Cadena introducida: " + cadena);
        System.out.println("Contados " + contador + " bytes en total.");
    }
}
```
## Lectura de teclado en Java
### InputStream: el objeto System.in
En Java tenemos acceso al teclado desde `System.in`, que es un `InputStream` del que podemos leer bytes.

### Lectura de un byte
```java
int mybyte = System.in.read();
```
### Problema de leer bytes
El problema a la hora de leer bytes es que luego debemos convertirlos a lo que necesitemos. Por ejemplo, si tecleamos una letra A mayúscula, el byte leído es el 65, correspondiente a la A mayúscula en código ASCII. Si tecleamos un 3 y un 2, es decir, un 32, leeremos dos bytes 51 y 52, correspondientes a los caracteres ASCII del 3 y del 2, NO leeremos un 32.
Unidad 1: Gestión de ficheros

### Clases de lectura

Una clase `Reader` en Java es una clase que lee caracteres. Un `Reader` tiene métodos para leer caracteres. Sin embargo, seguimos teniendo `System.in`, que es un `InputStream` y no un `Reader`.

### Conversión de InputStream a Reader

Para convertir `System.in` a un `Reader`, podemos utilizar la clase `InputStreamReader`. Esta clase nos permite realizar la conversión.

```java
InputStreamReader entrada = new InputStreamReader(System.in);
```

En este código, estamos declarando una variable `entrada` de tipo `InputStreamReader` y creando un objeto de esta clase mediante el constructor `new InputStreamReader(...)`. Entre paréntesis le pasamos el `InputStream` que queremos convertir a `Reader`, en este caso, `System.in`.

### Lectura de caracteres

Hasta este momento, solo podemos leer caracteres de manera suelta. Para leer un conjunto de caracteres, podemos utilizar el método `read()` de la clase `Reader`. Sin embargo, si queremos leer una línea completa, podemos utilizar la clase `BufferedReader`.

### Clases de lectura

La clase `BufferedReader` nos permite leer una línea completa. Para obtener un objeto `BufferedReader`, debemos instanciar un objeto de la clase `InputStreamReader` y pasarle como parámetro en el constructor.

```java
BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
```

O simplificándolo:

```java
BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
```

### Uso de BufferedReader

Para utilizar el método `readLine()` de la clase `BufferedReader`, debemos importar los paquetes `BufferedReader`, `InputStreamReader` y `IOException`.

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
```

El método `readLine()` lee una línea de texto hasta que se encuentre un carácter de salto de línea (`\n`) o retorno de carro (`\r`). Se obtiene un string, pero si se quiere manipular como otro tipo de dato, se tendrá que hacer una conversión.

```java
String linea = entradabuffer.readLine();
```

### Ejemplo de uso

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Ejemplo {
    public static void main(String[] args) throws IOException {
        BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
        String linea = entradabuffer.readLine();
        System.out.println(linea);
    }
}
```
Unidad 1: Gestión de ficheros

*   BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
*   String texto;
*   try {
*       texto = entradabuffer.readLine();
*   } catch (IOException ioe) {
*       ioe.printStackTrace();
*   }

2.1.3 Convertir una cadena String a un tipo de datos numérico

*   Si se quiere leer un número del teclado, el usuario escribe, por ejemplo, 123, con la clase BufferedReader
*   obtendremos un String que contiene "123", es decir, tres caracteres. Si lo que se pretende es leer un número,
*   entonces tendremos que hacer una conversión del String al tipo numérico deseado.

    *   **Conversión de String a valor entero (int)**
        Para convertir un String (cadena) a un valor numérico (int) hay que emplear el método estático de la clase Integer, parseInt.
        Para convertir el String a int se necesita que el String sea exactamente un int. Cualquier carácter o letra que tenga el String que no sea válida, se hará que la conversión falle.
        Ejemplo:
            int entero;
            try {
                entero = Integer.parseInt(texto);
            } catch (java.lang.NumberFormatException e) {
                System.out.println("Error, no se puede convertir, el número no es un entero");
            }

    *   **Conversión de String a valor entero largo (long)**
        Para convertir un String (cadena) a un valor numérico (long) hay que emplear el método estático de la clase Long, parseLong.

    *   **Conversión de String a valor entero corto (short)**
        Para convertir un String (cadena) a un valor numérico (short) hay que emplear el método estático de la clase Short, parse short.

    *   **Conversión de String a valor decimal (float)**
        Para convertir un String (cadena) a valor decimal(float), hay que emplear el método estático de la clase Float, parseFloat.
Unidad 1: Gestión de ficheros

Para convertir un String (cadena) a un valor decimal (Double), hay que emplear el método estático de 
la clase Double, parseDouble

2.1.4 La clase Scanner
Esta clase que se encuentra disponible desde Java 1.5, nos permite leer datos de  una forma más sencilla 
que el clásico InputStream con un BufferedReader. 
La clase Scanner tiene varios constructores que admiten, además de System.in, cosas como secuencias de 
bytes o ficheros. 
El  constructor que se utiliza par leer de la consola  es: 

Scanner pruebaScanner = new Scanner(System.in); 

Algunos métodos de la clase Scanner para lectura de datos : 
- String  next() 
  lee una cadena, no permite espacios en blanco 
- boolean  nextBoolean () 
  lee una valor boolean 
- byte  nextByte () 
  lee un byte 
- double  nextDouble () 
  lee un valor decimal double 
- float  nextFloat () 
  lee un valor decimal float 
- int nextInt() 
  lee un valor int 
- String  nextLine () 
  lee una cadena hasta que se pulse enter, permitiendo espacios en blanco 
- long  nextLong () 
  lee un valor numérico long 
- short  nextShort () 
  lee un valor numérico short 

package ejtecladoscanner;  
import java.util.Scanner;  
public class EjTecladoScanner {  
    public static void main(String[] args) {  
        Scanner sc = new Scanner(System.in);  
        System.out.print("¿Cómo te llamas? ");  
        String nombre = sc.nextLine();  // leer una cadena de caracteres  
        System.out.println("Es un placer conocerte "+nombre);  
        System.out.print("¿Que edad tienes? " ); 
        int edad  = sc.nextInt();  // leer una cadena de caracteres  
        System.out.print("¿pues aparentas menos edad? ");  
    } 
}
Unidad 1: Gestión de ficheros

- Cierra el Scanner
- boolean hasNext()
- Indica si quedan más cadenas por leer
- boolean hasNextBoolean()
- Indica si es posible leer más datos que se interpreten como un boolean
- boolean hasNextByte()
- Indica si es posible leer más datos que se interpreten como un byte
- boolean hasNextDouble()
- Indica si es posible leer más datos que se interpreten como un double
- boolean hasNextFloat()
- Indica si es posible leer más datos que se interpreten como un float
- boolean hasNextInt()
- Indica si es posible leer más datos que se interpreten como un int
- boolean hasNextLine()
- Indica si quedan más cadenas por leer
- boolean hasNextLong()
- Indica si es posible leer más datos que se interpreten como un long
- boolean hasNextShort()
- Indica si es posible leer más datos que se interpreten como un short
- Scanner useDelimiter(String pattern)
- Cambia los delimitadores que van a separar los items
- Excepciones que pueden lanzar los métodos de Scanner:
  - NoSuchElementException: no queda más cadenas
  - IllegalStateException: el scanner está cerrado
  - InputMismatchException: el dato leído no es del tipo esperado
- Uso de la clase Scanner para leer de Fichero
  - Podemos utilizar el siguiente constructor:
    - Para leer proveniente de un String

Ejemplo de uso de la clase Scanner para leer de un fichero:

Tenemos un fichero de texto con la siguiente información que corresponde a identificativo, nombre y edad de una persona:

Ejemplo de código en Java que utiliza la clase Scanner para leer este fichero y visualizar la información por la pantalla:

```java
package ejficheroscanner;

import java.io.FileNotFoundException;
import java.io.File;
import java.util.Scanner;

public class EJFicheroScanner {
    public static void main(String[] args) {
        File f = new File("C:/FicherosJava/ejemplo1.txt");
        Scanner s;
        try {
            s = new Scanner(f);
            while (s.hasNextLine()) {
                String linea = s.nextLine();
                Scanner sl = new Scanner(linea);
                sl.useDelimiter(" \\s*,\\s*");
                System.out.print(sl.next() + ", ");
            }
        } catch (FileNotFoundException e) {
            System.out.println("Fichero no encontrado");
        }
    }
}
```

Nota: El código anterior utiliza un patrón de búsqueda para separar los datos en el fichero, en este caso, uno o más espacios seguidos de una coma y luego uno o más espacios.
```java
- Unidad 1: Gestión de ficheros

  System.out.println(sl.next());  
} 
s.close();  
} 
catch (FileNotFoundException e ) { 
  System.out.println("fichero no encontrado");  
} 
} 
La clase Scanner admite expresiones regulares como patrones de búsqueda, por lo que podemos leer trozos de línea directamente usando los se paradores que queramos o buscando expresiones concretas.

Por ejemplo, si pedimos por teclado una fecha dd/mm/yy, necesitamos comprobar si la cadena leída cumple ese patrón: dos cifras, una barra, dos cifras, otra barra y otras dos cifras. Una expresión regular que se ajusta al anterior patrón podría ser: \\d\\d/\\d\\d/\\d\\d     donde \d quiere decir dígito, como es un carácter comodín y no forma parte de la cadena de búsqueda, hay que escaparlo con otra \.

Si por ejemplo, se lee una fecha con un solo dígito como 1/1/12, sólo tiene un dígito en cada caso, así que no cumple el patrón y devuelve false. Si queremos algo más sofisticado, para que se admitan los días y meses con uno o dos dígitos, podemos usar el siguiente patrón: \\d{1,2}/ \\d{1,2}/ \\d{1,2}  .Ahora, la expresión \\d{1,2} indica un dígito entre 1 y 2 veces, es decir, uno o dos dígitos.

Hay muchas opciones, solo vamos a nombrar algunas , como por ejem plo: 
▪ El operador *  representa que el patrón indicado debe aparecer 0 o mas veces.  
▪ El operador +  representa que el patrón indicado debe aparecer  1 o más veces.  
▪ El carácter “?”: Indica que el símbolo que le precede puede aparecer una vez o ninguna. Ejempl o “H? ola” describe a Hola y a ola.  
▪ El carácter “^”: Representa el inicio de una cadena, de la forma que si ponemos un ejemplo con este carácter y otros entre paréntesis buscará las cadenas con esos caracteres de inicio. Cuando se emplea dentro de los corch etes la búsqueda muestra aquellas cadenas que no tienen esos caracteres al inicio.  
▪ El carácter “$”: Representa el final de una cadena o el final de línea, es muy útil para avanzar entre párrafos.  
▪ [] agrupar caracteres en grupos o clases.  
▪ |  Sirve para indicar una de varias opciones  
▪ \s para localizar caracteres como espacios , tabuladores .\S para lo contrario a \s. 
▪ \d para localizar cadenas con un digito. \D para lo contrario al \d. 
▪ \A para empezar la búsqueda por el principio de la cadena.  
▪ \Z para empezar la  búsqueda por el final de la cadena.  

2.2 Salida formateada: Clase PrintStream  
Salida por consola:  
System.out y System.err se definen como objetos de PrintStream . 
La clase PrintStream  proporciona utilidades para dar formato a la salida . Tiene dos métodos print () y println () que están sobrecargados para los tipos primitivos, objetos, cadenas y arrays de caracteres. La diferencia entre ambos métodos está en que println añade un carácter de nueva línea. Además el método println además puede llamarse sin argumentos,  produciendo una nueva línea.  
Otro método de Printf es printf() que permite visualizar la salida formateada . 
 Algunos de sus constructores de PrintStream  son los siguientes constructores: 
```
Unidad 1: Gestión de ficheros

### Constructores de PrintStream

#### 1. Crea un flujo de impresión nuevo en el archivo especificado

```java
PrintStream (File file)
```

#### 2. Crea un flujo de impresión nuevo

```java
PrintStream (OutputStream out)
```

#### 3. Crea un flujo de impresión nuevo con vaciado del buffer

```java
PrintStream (OutputStream out, boolean autoFlush)
```

#### 4. Crea un flujo de impresión nuevo en el archivo especificado

```java
PrintStream (String fileName)
```

### Ejemplo de uso

```java
package ejsalidaconsola;

import java.io.PrintStream;
import java.io.FileNotFoundException;

public class EjSalidaConsola {
    public static void main(String[] args) {
        // Creamos un objeto PrintStream para imprimir en la pantalla
        PrintStream pw = new PrintStream(System.out, true);
        pw.println("Imprime una cadena de texto");
        int i = 15;
        pw.println("Imprime un entero " + i);
        double d = 6.8e -9;
        pw.println("Imprime un double " + d);
        // Utilizamos el objeto ya creado System.out
        // salida formateada
        System.out.printf("%d, %s, %.2f", 2, "hola ", 8.98987);
        System.out.println();
    }
}
```

### Escritura en un fichero de texto utilizando PrintStream

```java
package ejsalidaconsola;

import java.io.FileNotFoundException;
import java.io.PrintStream;

public class EjEscrituraPrintStream {
    public static void main(String[] args) {
        // Creamos un objeto PrintStream para imprimir en un fichero de texto
        PrintStream pw = null;
        try {
            pw = new PrintStream("C:/FicherosJava /TextoconPrintStream.txt");
            pw.println("Imprime una cadena de texto");
            int i = 15;
            pw.println("Imprime un entero " + i);
            double d = 6.8e -9;
            pw.println("Imprime un double " + d);
            // Utilizamos el objeto ya creado System.out
            // salida formateada
            System.out.printf("%d, %s, %.2f", 2, "hola ", 8.98987);
            System.out.println();
        } catch (FileNotFoundException e) {
            System.out.printf("Fichero no encontrado");
            System.out.println();
        } finally {
            if (pw != null)
                pw.close();
        }
    }
}
```

### Salida

```
Imprime una cadena de texto
Imprime un entero 15
Imprime un double 6.8e-9
2, hola , 8.98987
Fichero no encontrado
```
Unidad 1: Gestión de ficheros

### 3.1 La clase FILE

La clase FILE trabaja directamente con los archivos y el sistema de archivos. Se utiliza para obtener o modificar información asociada con un archivo, y para navegar por la jerarquía de subdirectorios.

#### 3.1.1 Creación de un objeto File

Los constructores de File permiten inicializar el objeto con el nombre de un archivo y la ruta donde se encuentra.

- **Constructor con nombre de archivo**
 ```java
public File(String nombreCompleto)
```
  Crea un objeto File con el nombre y ruta del archivo pasado como argumento.

- **Constructor con ruta y nombre de archivo**
 ```java
public File(String ruta, String nombre)
```
  Crea un objeto File en la ruta pasada como primer argumento y con el nombre del archivo como segundo argumento.

- **Constructor con ruta y objeto File**
 ```java
public File(File ruta, String nombre)
```
  Crea un objeto File en la ruta que proporciona un objeto FILE pasada como primer argumento y con el nombre del archivo como segundo argumento.

- **Constructor con URI**
 ```java
public File(URI uri)
```
  Crea un objeto File a través de un objeto URI.

### 3.1.2 Métodos de la clase File

- **boolean canExecute()**
  Devuelve true si el archivo existe y la aplicación puede ejecutarlo.

- **boolean canRead()**
  Devuelve true si el archivo existe y se puede leer.

- **boolean canWrite()**
  Devuelve true si el archivo existe y se puede escribir.

- **int compareTo(File ruta)**
  Compara dos rutas en orden alfabético.

- **boolean createNewFile() throws IOException**
  Crea un nuevo archivo basado en la ruta dada al objeto File si solo si el fichero no existe. Hay que capturar la excepción IOException que ocurriría si hubo error crítico al crear el archivo.

- **Devuelve true si se hizo la creación del archivo vacío y false si ya había otro archivo con ese nombre.**

- **static File createTempFile(String prefijo, String sufijo) throws IOException**
  Crea un fichero vacío en el directorio temporal por defecto usando el prefijo y sufijo para generar el nombre. El prefijo y el sufijo deben de tener al menos tres caracteres (el sufijo suele ser la extensión), de otro modo se produce una excepción del tipo IllegalArgumentsException. Requiere capturar la excepción IOException que se produce ante cualquier fallo en la creación de l archivo.
```java
# Unidad 1: Gestión de ficheros

## Crea un fichero vacío en el directorio especificado

- Crea un fichero vacío en el directorio especificado usando el prefijo y sufijo para generar el nombre.

## Borrado de ficheros y directorios

- **boolean delete()**: Borra el fichero o directorio especificado al crear el objeto File. Devuelve true si puede hacerlo
- **void deleteOnExit()**: Borra el fichero o directorio al finaliza la ejecución del programa.
- **boolean equals(Object objecto)**: Devuelve true si la ruta especificada es igual que el objeto dado.
- **boolean exists()**: Devuelve true si el fichero o directorio especificado existe.

## Obtención de información del fichero o directorio

- **File getAbsoluteFile()**: Devuelve un objeto File con la ruta absoluta al objeto File creado.
- **String getAbsolutePath()**: Devuelve una cadena con la ruta absoluta al objeto File.
- **File getCanonicalFile()**: Convierte un objeto File a una única forma canónica más adecuada para las comparaciones.
- **String getCanonicalPath()**: Convierte una ruta a una única forma canónica más adecuada para las comparac iones.
- **long getFreeSpace()**: Devuelve el número de bytes libres en la partición.
- **String getName()**: Devuelve el nombre del fichero o directorio especificado.
- **String getParent()**: Devuelve una cadena con el directorio padre o null si no tiene un directorio padre.
- **File getParentFile()**: Devuelve un objeto File con el directorio padre o null si no tiene un directorio padre.
- **String getPath()**: Convierte la ruta especificada al crear el objeto File en una cadena.
- **long getTotalSpace()**: Devuelve el espacio total en la partición.
- **long getUsableSpace()**: Devuelve el espacio utilizado por el fichero.
- **int hashCode()**: Computes un hash code para este abstract pathname.
- **boolean isAbsolute()**: Devuelve true si la ruta es absoluta.
- **boolean isDirectory()**: Devuelve true si es un directorio.
- **boolean isFile()**: Devuelve true si es un fichero.
- **boolean isHidden()**: Devuelve true si el fichero es oculto.
- **long lastModified()**: Devuelve la fecha de la última modificación del fichero especificado.
- **long length()**: Devuelve la longitud del fichero especificado.
- **String[] list()**: Devuelve un array de cadenas con los nombres y directorios del directorio especificado.
- **String[] list(FilenameFilter filtro)**: Devuelve un array de cadenas con los nombres y directorio s del directorio especificado que satisfacen el filtro.
- **File[] listFiles()**: Lista los archivos que componen el directorio.
- **File[] listFiles(FileFilter filtro)**: Lista los archivos que componen el directorio y que cumplen con el criterio especificado.
- **File[] listFiles(FilenameFilter filtro)**: Lista los archivos que c omponen el directorio y que cumplen con el criterio especificado.
- **Static File[] listRoots()**: Devuelve un array de objetos File, donde cada objeto del array representa la carpeta raíz de una unidad de disco.
- **Boolean mkdir()**: Crea un d irectorio en la ruta especificada.
- **boolean mkdirs()**: Crea el directorio especificado por el objeto FILE aunque no exista el camino. Todos los directorios anterio res a la carpeta se crearán, si no existe. De este modo no saltará ninguna excepción si es que los directorios no existen.
- **boolean renameTo(File destino)**: Renombra el fichero especificado.
- **boolean setExecutable(boolean permiso, boolean soloPropietario)**: Si permiso es true, se establece el permiso de ejecución. Si soloPropietario es true, el permiso de ejecucion solo se aplica al propietario, en otro caso, se aplica a todo el mundo.
- **boolean setLastModified(long fecha)**: Establece el tiempo de la última modificación del archivo o directorio.
```
- Unidad 1: Gestión de ficheros
- Si permiso es true, se permiten operaciones de lectura. Devuelve true si la operación ha tenido éxito.
- Si permiso es true, se permiten operaciones de lectura. Si soloPropietario es true, el permiso de lectura solo se aplica al propietario, en otro caso, se aplica a todo el mundo.
- Establece el fichero o directorio de solo lectura.
- Si permiso es true, se permiten operaciones de lectura y escritura. Devuelve true si la operación ha tenido éxito.
- Si permiso es true, se permiten operaciones de lectura y escritura. Si soloPropietario es true, el permiso de lectura y escritura solo se aplica al propietario, en otro caso, se aplica a todo el mundo.
- Devuelve un objeto java.nio.file.Path a partir de la ruta especificada
- Devuelve una cadena a partir de la ruta especificada.
- Devuelve a file: URI que representa la ruta especificada.
- **FileInputStream** 
  - Crea un flujo de entrada `FileInputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por el objeto `File` fichero.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.
  - Si el fichero existe, los datos que contienen se borrarán.

  Ejemplos:
  ```
  FileInputStream miFichero = new FileInputStream("texto.txt");
  FileInputStream miFichero2 = new FileInputStream(new File("texto.txt"));
  FileInputStream Fichero1 = new FileInputStream();
  FileDescriptor fd = Fichero1.getFD();
  FileInputStream Fichero2 = new FileInputStream(fd);
  ```

- **FileOutputStream**
  - Crea un flujo de salida `FileOutputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por el objeto `File` fichero.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.
  - Si el fichero existe, los datos que contienen se borrarán.

  Ejemplos:
  ```
  FileOutputStream miFichero = new FileOutputStream("texto.txt");
  FileOutputStream miFichero2 = new FileOutputStream(new File("texto.txt"));
  FileOutputStream Fichero1 = new FileOutputStream();
  FileDescriptor fd = Fichero1.getFD();
  FileOutputStream Fichero2 = new FileOutputStream(fd);
  ```

- **FileInputStream (String nombreFichero)**
  - Crea un flujo de entrada `FileInputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por la cadena `nombreFichero`.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.

  Ejemplos:
  ```
  FileInputStream miFichero = new FileInputStream("C: \texto.txt");
  FileInputStream miFichero2 = new FileInputStream("C: \texto.txt");
  ```

- **FileOutputStream (String nombreFichero)**
  - Crea un flujo de salida `FileOutputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por la cadena `nombreFichero`.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.

  Ejemplos:
  ```
  FileOutputStream miFichero = new FileOutputStream("C: \texto.txt");
  FileOutputStream miFichero2 = new FileOutputStream("C: \texto.txt");
  ```

- **FileInputStream (FileDescriptor DescriptorFichero)**
  - Crea un flujo de entrada `FileInputStream` mediante el descriptor de Fichero.

  Ejemplos:
  ```
  FileInputStream Fichero1 = new FileInputStream();
  FileDescriptor fd = Fichero1.getFD();
  FileInputStream Fichero2 = new FileInputStream(fd);
  ```

- **FileOutputStream (FileDescriptor DescriptorFichero)**
  - Crea un flujo de salida `FileOutputStream` mediante el descriptor de Fichero.

  Ejemplos:
  ```
  FileOutputStream Fichero1 = new FileOutputStream();
  FileDescriptor fd = Fichero1.getFD();
  FileOutputStream Fichero2 = new FileOutputStream(fd);
  ```

- **FileInputStream (boolean agregar)**
  - Crea un flujo de entrada `FileInputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por el objeto `File` fichero.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.
  - Si el fichero existe y el parámetro `agregar` es cierto, entonces los bytes se escriben en el final del archivo y no el principio, es decir, no se pierde la información del fichero.

  Ejemplos:
  ```
  FileOutputStream miFichero = new FileOutputStream("texto.txt", true);
  ```

- **FileOutputStream (boolean agregar)**
  - Crea un flujo de salida `FileOutputStream` abriendo una conexión a un archivo en la ruta y nombre indicado por la cadena `nombreFichero`.
  - Un objeto `FileDescriptor` se crea para representar a esta conexión de archivo.
  - Si el fichero existe y el parámetro `agregar` es cierto, entonces los bytes se escriben en el final del archivo y no el principio, es decir, no se pierde la información del fichero.

  Ejemplos:
  ```
  FileOutputStream miFichero = new FileOutputStream("C: \texto.txt", true);
  ```

- **FileInputStream (FileDescriptor DescriptorFichero)**
  - Crea un flujo de entrada `FileInputStream` mediante el descriptor de Fichero.

  Ejemplos:
 
Unidad 1: Gestión de ficheros

### Métodos de File

#### Métodos de File

*   `int available()`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
*   `void close()`: Cierra el fichero y libera los recursos del sistema que esté usando.
*   `protected void finalize()`: Asegura que el fichero es cerrado cuando no hay más referencias al él.
*   `FileChannel getChannel()`: Retorna el objeto `FileChannel` asociado con el fichero.
*   `FileDescriptor getFD()`: Devuelve el objeto `FileDescriptor` que representa la conexión actual del fichero en el sistema de ficheros usado por el sistema.
*   `int read()`: Lee un byte de datos desde el fichero. Devuelve -1 si no hay ningún byte más que leer.
*   `int read(byte[] b)`: No lee un solo byte, sino que lee hasta que `b.length` bytes guardándolos en el array `b` que se envía como parámetro. Devuelve -1 si no hay ningún byte más que leer.
*   `int read(byte[] b, int off, int len)`: Lee hasta `len` bytes del fichero y los deposita en `b` a partir de `off`. Devuelve -1 si no hay ningún byte más que leer.
*   `long skip(long n)`: Salta `n` bytes de datos del fichero.

### Métodos de FileInputStream

#### Métodos de FileInputStream

*   `void close()`: Cierra el flujo de entrada y libera todos los recursos del sistema asociados con esta corriente. Cualquier acceso posterior generaría una IOException
*   `protected void finalize()`: Asegura que el método de cierre del flujo de entrada del archivo se llame cuando no haya más referencias a este flujo
*   `FileChannel getChannel()`: Devuelve el objeto `FileChannel` único asociado a este flujo de entrada del archivo.
*   `FileDescriptor getFD()`: Devuelve el descriptor de fichero asociado con el flujo de entrada.
*   `void write(int b)`: Escribe el byte especificado a en el flujo de entrada del archivo.
*   `void write(byte[] b)`: Escribe todo el array de bytes en la corriente de entrada
*   `void write(byte[] b, int posinicial, int numbytes)`: Escribe el array de bytes en el flujo de entrada, pero empezando por la posición inicial y sólo la cantidad indicada por numbytes.

### Ejemplo de lectura secuencial byte a byte de un archivo

```java
package ejficherosecuencialbytes;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class EjFicheroSecuencialBytes {
    public static void main(String[] args) {
        File f = new File("C:/FicherosJava/ejemplo.txt");
        try {
            FileInputStream fis = new FileInputStream(f);
            try {
                int dato;
                while ((dato = fis.read()) != -1) {
                    System.out.print((char) dato);
                }
            } catch (IOException e) {
                System.out.println("Error de lectura");
            } finally {
                fis.close();
            }
        } catch (FileNotFoundException e) {
            System.out.println("Fichero no encontrado");
        } catch (IOException e) {
            System.out.println("Error de lectura");
        }
    }
}
```
- Unidad 1: Gestión de ficheros
  - Ejemplo: Escritura de forma secuencial en un archivo
   ```java
System.out.println("Error en lectura de dato s");
```
- Unidad 1: Gestión de ficheros
  - Ejemplo: Escritura de forma secuencial en un archivo
   ```java
catch (FileNotFoundException e) {
  System.out.println("el fichero " + f.getName() + " no se encuentra");
}
```
- Unidad 1: Gestión de ficheros
  - Ejemplo: Escritura de forma secuencial en un archivo
   ```java
try {
  for (int i = 0; i < lineas.length; i++) {
    s = lineas[i].getBytes();
    f.write(s);
    f.write((byte) '\n');
    contLin++;
  }
  System.out.println("Grabadas " + contLin + " lineas (exito)");
  f.close();
} catch (IOException e) {
  System.out.println("Problema grabación ");
}
```
- Unidad 1: Gestión de ficheros
  - Ejemplo: Lectura del archivo
   ```java
try {
  FileInputStream fis = new FileInputStream("C:/FicherosJava/ejemplo1.txt");
  try {
    int datos;
    datos = fis.read();
    while (datos != -1) {
      System.out.print((char) datos);
      datos = fis.read();
    }
    f.close();
  } catch (IOException e) {
    System.out.println("Error en lectura de datos");
  }
} catch (FileNotFoundException e) {
  System.out.println("el fichero no se encuentra");
}
```
- Unidad 1: Gestión de ficheros
  - Ejemplo: Lectura del archivo
   ```java
int datos;
datos = fis.read();
while (datos != -1) {
  System.out.print((char) datos);
  datos = fis.read();
}
```
Unidad 1: Gestión de ficheros

### Flujo de bytes

Las clases proporcionan de manera transparente a estos flujos orientados a byte una funcionalidad de un nivel superior. Los stream filtro son una abstracción de las secuencias de bytes para hacer procesos de datos a más alto nivel; con esta abstracción ya no tratamos los items como secuencias o «chorros» de bytes, sino de forma elaborada con más funcionalidad.

### Clases de stream filtro

Las clases más representativas de este tipo son FilterInputStream y FilterOutputStream:

*   Los filtros devuelven la información que a su vez han leído de su InputStream o la escriben en su OutputStream asociado, previa realización de algún tipo de transformación en la misma.
*   De esta manera cada filtro añade una funcionalidad adicional al InputStream o OutputStream básico.
*   Se pueden encadenar varios filtros para obtener varias funcionalidades combinadas

### Acceso a datos primitivos: Clases DataInputStream y DataOutputStream

Aunque leer y escribir bytes es útil, a menudo es necesario transmitir datos de tipos primitivos dentro de un flujo. Las clases DataInputStream y DataOutputStream proporcionan métodos para la lectura y escritura de tipos primitivos (int, float, double, etc..) de un modo independiente de la máquina.

#### Constructor de DataOutputStream

Ejemplo:

```java
DataOutputStream Salida = new DataOutputStream(new FileOutputStream("pedido.txt"));
```

#### Constructor de DataInputStream

Ejemplo:

```java
DataInputStream entrada = new DataInputStream(new FileInputStream("pedido.txt"));
```

### Ejemplo de uso

```java
public class EjemploStream {
    public static void main(String[] args) {
        // Crear un archivo de salida
        FileOutputStream fileSal = new FileOutputStream("pedido.txt");
        DataOutputStream Salida = new DataOutputStream(fileSal);

        // Escribe un flujo de salida, datos de cualquier tipo primitivo
        Salida.writeDouble(10.5);
        Salida.writeByte(20);
        Salida.writeChar('A');

        // Cerrar el flujo de salida
        Salida.close();

        // Crear un archivo de entrada
        FileInputStream fileEnt = new FileInputStream("pedido.txt");
        DataInputStream entrada = new DataInputStream(fileEnt);

        // Leer un flujo de entrada, datos de cualquier tipo primitivo
        double valor = entrada.readDouble();
        byte valorByte = entrada.readByte();
        char valorChar = entrada.readChar();

        // Cerrar el flujo de entrada
        entrada.close();
    }
}
```
**Unidad 1: Gestión de ficheros**

**Modificador y tipo de DataOutputStream**

*   `void flush()` - Vacia el buffer de salida y fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
*   `int size()` - Devuelve el número de bytes escritos en esta corriente de datos de salida hasta el momento.
*   `void write(byte[] b, int off, int len)` - Escribe `len` bytes en la corriente de salida desde el array `b` comenzando en la posición `off`.
*   `void write(int b)` - Escribe el primer byte de menor peso en la corriente de salida. Los otros 3 restantes bytes se ignoran.
*   `void writeBoolean(boolean v)` - Escribe un `boolean` en el flujo de salida ocupando 1 byte.
*   `void writeByte(int v)` - Escribe un `byte` en el flujo de salida ocupando 1 byte.
*   `void writeBytes(String s)` - Escribe una cadena en el flujo de salida como una secuencia de bytes.
*   `void writeChar(int v)` - Escribe un `char` en el flujo de salida ocupando 2 bytes.
*   `void writeChars(String s)` - Escribe una cadena en el flujo de salida como una secuencia de caracteres.
*   `void writeDouble(double v)` - Escribe un valor numérico `double` en el flujo de salida ocupando 8 bytes.
*   `void writeFloat(float v)` - Escribe un valor numérico `float` en el flujo de salida ocupando 4 bytes.
*   `void writeInt(int v)` - Escribe un valor numérico en tero en el flujo de salida ocupando 4 bytes.
*   `void writeLong(long v)` - Escribe un valor entero `long` en el flujo de salida ocupando 8 bytes.
*   `void writeShort(int v)` - Escribe un valor entero `short` en el flujo de salida ocupando 2 bytes.
*   `void writeUTF(String str)` - Escribe un cadena única utilizando codificación UTF-8 en el flujo de salida.

**Modificador y tipo de DataInputStream**

*   `int read(byte[] b)` - Lee `b.length` bytes del flujo de entrada y los guarda en el array pasado como parámetro. Devuelve el número total de bytes leidos o -1 si no hay más datos debido a que se alcanza el final del flujo de entrada.
*   `int read(byte[] b, int off, int len)` - Lee `len` bytes del flujo de entrada y los guarda en el array a partir del desplazamiento `off` pasado como parámetro. Devuelve el número total de bytes leidos o -1 si no hay más datos debido a que se alcanza el final del flujo de entrada.
*   `boolean readBoolean()` - Lee un byte del flujo de entrada y devuelve verdadero si ese byte es distinto de cero, falso si ese byte es cero. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `byte readByte()` - Lee un byte del flujo de entrada. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `char readChar()` - Lee dos bytes del flujo de entrada y devuelve un valor `char`. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `double readDouble()` - Lee ocho bytes del flujo de entrada y devuelve un valor numérico `double`. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `float readFloat()` - Lee cuatro bytes del flujo de entrada y devuelve un valor numérico `float`. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `void readFully(byte[] b)` - Lee `b.length` bytes del flujo de entrada y los deposita en el array `b`. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `void readFully(byte[] b, int off, int len)` - Lee `b.length` bytes del flujo de entrada y los deposita en el array `b` a partir del desplazamiento `off`. Lanza una EOFException si el archivo llega al final antes de leer todos los bytes.
*   `int readInt()` - Lee cuatro bytes del flujo de
```markdown
# Unidad 1: Gestión de ficheros

## Lectura de datos

### readShort()
Lee dos bytes de entrada y devuelve un valor numérico short.
```java
short readShort() throws IOException
```

### readUnsignedByte()
Lee un byte del flujo de entrada y devuelve un valor int en el rango de valores del 0 al 255.
```java
int readUnsignedByte() throws IOException
```

### readUnsignedShort()
Lee dos byte del flujo de entrada y devuelve un valor int en el rango de valores del 0 al 65535.
```java
int readUnsignedShort() throws IOException
```

### readUTF()
Lee una cadena Unicode en formato UTF-8 formato del flujo de entrada.
```java
String readUTF() throws IOException
```

### readUTF(DataInput in)
Lee una cadena Unicode en formato UTF-8 formato del flujo de entrada.
```java
static String readUTF(DataInput in) throws IOException
```

### skipBytes(n)
Hace un intento de saltarse n bytes de datos del flujo de entrada, descarta los bytes omitidos.
```java
int skipBytes(int n) throws IOException
```

## Estructuras de datos

### Double
```java
double[] precios = {1.35, 4.0, 8.90, 6.2, 8.73};
```

### Entero
```java
int[] unidades = {5, 7, 12, 8, 30};
```

### Cadena
```java
String[] descripciones = {"paquetes de papel", "lápices", "bolígrafos", "carteras", "mesas"};
```

## Salida de datos

### DataOutputStream
```java
DataOutputStream salida = new DataOutputStream(new FileOutputStream("C:/FicherosJava/pedido.dat"));
```

### Estructura de datos en salida
```java
for (int i = 0; i < precios.length; i++) {
    salida.writeBytes(descripciones[i]);
    salida.writeChar('\n');
    salida.writeInt(unidades[i]);
    salida.writeChar('\t');
    salida.writeDouble(precios[i]);
}
```

## Lectura de datos

### DataInputStream
```java
DataInputStream entrada = new DataInputStream(new FileInputStream("C:/FicherosJava/pedido.dat"));
```

### Estructura de datos en entrada
```java
try {
    while (true) {
        descripcion = "";
        car = (char) entrada.readUnsignedByte();
        while (car != '\n') {
            descripcion += car;
            car = (char) entrada.readUnsignedByte();
        }
        unidad = entrada.readInt();
        entrada.readChar();
        precio = entrada.readDouble();
        System.out.println("Has pedido " + unidad + " " + descripcion + " a " + precio + " Euros.");
        total = total + unidad * precio;
    }
} catch (EOFException e) {
    System.out.printf("%s %.2f %s \n", "por un TOTAL de ", total, " pts.");
    entrada.close();
}
```

## Variables y tipos de datos

### Variables
```java
double precio;
int unidad;
char car;
String descripcion;
```

### Tipos de datos
```java
double: 1.35, 4.0, 8.90, 6.2, 8.73
int: 5, 7, 12, 8, 30
String: paquetes de papel, lápices, bolígrafos, carteras, mesas
```
Unidad 1: Gestión de ficheros

### BufferedInputStream y BufferedOutputStream

Estas clases asignan un buffer de memoria a los flujos de byte de I/O. Este buffer le permite a Java realizar operaciones de I/O sobre más de un byte a la misma vez, lo que incrementa y optimiza las prestaciones a la hora de trabajar con estos datos. La diferencia es clara, no es lo mismo leer o escribir byte a byte que leer o enviar un flujo de N bytes (tamaño del buffer) de una tacada desde o al dispositivo.

### Constructor de BufferedInputStream

*   `BufferedInputStream(InputStream in)`: Crea un objeto `BufferedInputStream` con el tamaño de buffer por defecto.
*   `BufferedInputStream(InputStream in, int size)`: Crea un objeto `BufferedInputStream` con el tamaño de buffer especificado en el argumento `size`. Lanza una `IllegalArgumentException` si `size <= 0`.

### Constructor de BufferedOutputStream

*   `BufferedOutputStream(OutputStream out)`: Crea un objeto `BufferedOutputStream` con el tamaño de buffer por defecto.
*   `BufferedOutputStream(OutputStream out, int size)`: Crea un objeto `BufferedOutputStream` con el tamaño de buffer especificado en el argumento `size`. Lanza una `IllegalArgumentException` si `size <= 0`.

### Métodos de BufferedInputStream

*   `int available() throws IOException`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
*   `void close() throws IOException`: Cierra la corriente de entrada y libera los recursos del sistema que esté usando.
*   `void mark(int readlimit)`: Marca la posición actual de la corriente de entrada.
*   `boolean markSupported()`: Prueba si esta corriente de entrada soporta los métodos mark y reset.
*   `int read() throws IOException`: Lee el siguiente byte de la corriente de entrada.
*   `int read(byte[] b, int off, int len) throws IOException`: Lee `b.length` bytes del flujo de entrada y los guarda en el array pasado como parámetro. Devuelve el número total de bytes leídos o -1 si no hay más datos debido a que se alcance el final del flujo de entrada.
*   `void reset() throws IOException`: Coloca la corriente de entrada en la posición que tenía la última vez que se invocó `mark`.
*   `long skip(long n) throws IOException`: Salta y descarta los siguientes `n` bytes de la corriente de entrada.

### Métodos heredados de la clase `java.io.FilterInputStream`: `read`

### Métodos de BufferedOutputStream

*   `void flush() throws IOException`: Vacia el buffer de salida. Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
*   `void write(byte[] b, int off, int len) throws IOException`: Escribe `len` bytes en la corriente de salida desde el array `b` comenzando en la posición `off`.
*   `void write(int b) throws IOException`: Escribe el primer byte de menor peso a corriente de salida. Los otros 3 restantes bytes se ignoran.

### Métodos heredados de la clase `java.io.FilterOutputStream`: `close` y `write`

### Ejemplo: Leer un fichero de texto utilizando un flujo de bytes con buffer

```java
public class EjFicheroSecuencialByteconBuffer {
    public static void main(String[] args) throws IOException {
        File f = new File("C:/FicherosJava/ejemplo.txt");
        FileInputStream fis = null;
        BufferedInputStream entrada = null;

        try {
            fis = new FileInputStream(f);
            entrada = new BufferedInputStream(fis);

            try {
                int datos;
                datos = entrada.read();
                while (datos != -1) {
                    System.out.print((char) datos);
                    datos = entrada.read();
                }
            }
        } finally {
            if (entrada != null) {
                entrada.close();
            }
            if (fis != null) {
                fis.close();
            }
        }
    }
}
```

Este código lee un fichero de texto utilizando un flujo de bytes con buffer. El flujo de bytes se utiliza para leer el contenido del fichero de manera eficiente, ya que el buffer reduce el número de veces que se accede al dispositivo.
# Unidad 1: Gestión de ficheros

## 5.3 Combinación de clases sobre los flujos de entrada y salida

### Lectura de un archivo de números reales con buffer

```java
public class EjFicheroDatosRealesconbuffer {
    public static void main(String[] args) throws IOException {
        File f = new File("C:/FicherosJava/FicheroDoublebuffer.bin");
        Random r;
        FileOutputStream fis = null;
        DataOutputStream salida = null;
        BufferedOutputStream buffer = null;

        try {
            fis = new FileOutputStream(f);
            buffer = new BufferedOutputStream(fis);
            salida = new DataOutputStream(buffer);

            for (int i = 0; i < 100; i++) {
                r = new Random();
                salida.writeDouble(r.nextDouble());
            }
        } catch (FileNotFoundException e) {
            System.out.println("No se encontró el archivo");
        } catch (IOException e) {
            System.out.println("Error al escribir");
        } finally {
            if (salida != null) salida.close();
            if (buffer != null) buffer.close();
            if (fis != null) fis.close();
        }

        System.out.println("Lectura del archivo binario de números reales con buffer");

        FileInputStream fie = null;
        BufferedInputStream buffer2 = null;
        DataInputStream entrada = null;

        try {
            fie = new FileInputStream(f);
            buffer2 = new BufferedInputStream(fie);
            entrada = new DataInputStream(buffer2);

            try {
                double datos;
                int i = 1;
                datos = entrada.readDouble();
                while (true) {
                    System.out.printf("%6.2f%c", datos, ';');
                    datos = entrada.readDouble();
                    i++;
                }
            } catch (EOFException e) {
                System.out.println();
                System.out.println("Fin del archivo");
            }
        } catch (FileNotFoundException e) {
            System.out.println("No se encontró el archivo");
        } catch (IOException e) {
            System.out.println("Error al leer");
        } finally {
            if (entrada != null) entrada.close();
            if (buffer2 != null) buffer2.close();
            if (fie != null) fie.close();
        }
    }
}
```

### Salida

```
lectura del archivo binario de numeros reales con buffer
0,00;
1,00;
2,00;
3,00;
4,00;
5,00;
6,00;
7,00;
8,00;
9,00;
10,00;
11,00;
12,00;
13,00;
14,00;
15,00;
16,00;
17,00;
18,00;
19,00;
20,00;
21,00;
22,00;
23,00;
24,00;
25,00;
26,00;
27,00;
28,00;
29,00;
30,00;
Fin del archivo
```
# Unidad 1: Gestión de ficheros

## 6.1 Clases File Reader y File Writer

Existen dos clases que manejan caracteres en lugar de bytes en ficheros, son `FileReader` y `FileWriter`. Estas clases:

*   Convierten cada carácter de la codificación del sistema operativo nativo a código Unicode.
*   La mayoría de las clases de flujos orientados a byte tienen su correspondiente clase de flujo orientado a carácter:
    *   `FileReader` es el equivalente a `FileInputStream`.
    *   `FileWriter` es el equivalente a `FileOutputStream`.

## Construcción de objetos FileReader

La construcción de objetos `FileReader` se hace con un parámetro que puede ser un objeto `File` o un `String` o el descriptor del fichero que representará a un determinado archivo.

*   Constructor de `FileReader`:
    *   `FileReader(File file)` throws `IOException`: Lee caracteres del fichero pasado como argumento como un objeto `File`.
    *   `FileReader(FileDescriptor fd)`: Lee caracteres del fichero pasado como argumento el descriptor del fichero.
    *   `FileReader(String fileName)` throws `IOException`: Lee caracteres del fichero pasado como argumento como una cadena.

## Construcción de objetos FileWriter

La construcción de objetos `FileWriter` se hace igual, pero se puede añadir un segundo parámetro booleano que, en caso de valer `true`, indica que se abre el archivo para añadir datos; en caso contrario se abre para grabar desde cero (se borra su contenido).

*   Constructor de `FileWriter`:
    *   `FileWriter(File file)` throws `IOException`: Escribe caracteres en el fichero pasado como argumento como un objeto `File`.
    *   `FileWriter(File file, boolean append)` throws `IOException`: Escribe caracteres en el fichero pasado como argumento como un objeto `File`. Si el argumento `append` es `true`, abre el fichero para añadir datos, en caso contrario, se grabaría desde el principio borrando el contenido si existe el fichero.
    *   `FileWriter(FileDescriptor fd)`: Escribe caracteres en el fichero pasado como argumento el descriptor del fichero.
    *   `FileWriter(String fileName)` throws `IOException`: Escribe caracteres en el fichero pasado como argumento una cadena.
    *   `FileWriter(String fileName, boolean append)` throws `IOException`: Escribe caracteres en el fichero pasado como argumento una cadena. Si el argumento `append` es `true`, abre el fichero para añadir datos, en caso contrario, se grabaría desde el principio borrando el contenido si existe el fichero.
Unidad 1: Gestión de ficheros

* Los métodos de FileWriter son los heredados de las clases Object, Writer y OutputStreamReader:
 
6.2 Codificación de caracteres
En este apartado vamos a tratar los errores que tenemos habitualmente con la codificación de caracteres 
en aplicaciones en las que se ven implicados varios sistemas que intercambian o almacenan información.  

Codificación de caracteres.
La codificación de caracteres es el método que permite convertir un caracter del lenguaje natural, 
el de los humanos, en un símbolo de otro sistema de representación, aplicando una serie de 
normas o reglas de codificación.  

El ejemplo más gráfico suele ser el del código morse, cuyas reglas permiten convertir letras y números 
en señales (rayas y puntos) emitidas de forma intermitente.  

En informática, las normas de codificación permiten que dos sistemas intercambien información usando 
el mismo código numérico o para cada caracter.  

Las normas más conocidas de codificación son las siguientes:  

* ASCII: basado en el alfabeto latino tal como se usa en inglés moderno y en otras lenguas occidentales. 
Utiliza 7 bits para representar los caracteres, aunque inicialmente empleaba un bit adicional (bit de 
paridad) que se usaba para detectar errores en la transmisión. Incluye, básicamente, letras mayúsculas y 
minúsculas del inglés, dígitos, signos de puntuación y caracteres de control, dejando fuera los caracteres 
específicos de los idiomas distintos del inglés, como por ejemplo, las vocales acentuadas o la letra ñ.  

* ISO-8859-1 (Latin-1): es una extensión del código ASCII que utiliza 8 bits para proporcionar caracteres 
adicionales usados en idiomas distintos al inglés, como el español. Existen 15 variantes y cada una cubre 
las necesidades de un alfabeto diferente: latino, Europa del Este, hebreo cirílico,... la norma ISO-8859-15, 
es el Latin-1, con el caracter del euro.  

* cp1252 (codepage 1252): Windows usa sus propias variantes de los estándares ISO. La cp1252 es 
compatible con ISO-8859-1, menos en los 32 primeros caracteres de control, que han usado para incluir, 
por ejemplo, el caracter del euro.  

* UTF-8: es el formato de transformación Unicode, de 8 bits de longitud variable. Unicode es un 
estándar industrial cuyo objetivo es proporcionar el medio por el cual un texto en cualquier forma e 
idioma pueda ser codificado para el uso informático. Cubre la mayor parte de las escrituras usadas 
actualmente.  

En la enumeración hemos ido de menos a más, no solo en el tiempo, por el momento de aparición de la 
norma, sino también por los caracteres que soporta cada una, UTF-8 es la más ambiciosa.  

Visto así, la recomendación debería ser el uso de UTF-8 puesto que, escriba en la lengua que escribe, sus 
caracteres van a ser codificables. Pero, si sólo escribo en castellano, podría limitarme a usar ISO-8859-1, o 
ISO-8859-15 si necesito el caracter del euro, sin ningún problema.
Unidad 1: Gestión de ficheros

La misma norma de codificación que se use para escribir se debe utilizar para la lectura.
Esto tiene toda la lógica del mundo, puesto que si escribimos un fichero con ISO-8859-1 no debemos esperar
que un sistema que lee en UTF-8 lo entienda sin más (aunque realmente entienda gran parte).

¿Por qué aparecen caracteres "raros"?: 

Los caracteres "raros" aparecen por una conversión incorrecta entre dos codificaciones distintas. Se 
suelen producir porque se utiliza la codificación por defecto del sistema o programa y esta no coincide con la 
original o, directamente, por desconocimiento de la norma de codificación de la fuente de lectura.

Así, por ejemplo, podemos encontrarnos con los siguientes caracteres "raros" escribiendo la misma 
palabra: 

▪ España → España: si escribimos en UTF-8 y leemos en ISO-8859-1. La letra eñe se codifica en 
UTF-8 con dos bytes que en ISO-8859-1 representan la A mayúscula con tilde (Ã) y el símbolo más -
menos (±).

▪ España → España: si escribimos en ISO-8859-1 y leemos en  UTF-8. La codificación de la eñe en 
ISO-8859-1 es inválida en UTF-8 y se sustituye por un caracter de sustitución, que puede ser una 
interrogación, un espacio en blanco... depende de la implementación.

Ejemplo: Tenemos un fichero de texto creado con el bloque de notas de Windows con codificación ASCII

Si intentamos leerlo con FileWriter, los acentos nos saldrán caracteres raros por que los métodos de esta 
clase leen caracteres Unicode.

Ejemplo: 

public class EJCaracterAcentuadas {  
    public static void main (String[] args) throws IOException {  
       FileReader entrada=null;  
       try{ 
           int cad;  
            entrada= new FileReader("C:/FicherosJava/Copia.txt");  
            while ((cad = entrada.read()) != -1) 
            {      System.out.print((char)cad);        } 
           } 
        catch(FileNotFoundException e){  
            System.out.println("error al abrir el fichero");   }  
        catch(IOException e){  
            System.out.printf("error de entrada/salida");      } 
        finally{  
            if (entrada!=null)  
                    entrada.close();  
            } 
    } 
} 

Salida: 

Para solucionarlo, podemos abrir el fichero para que se use, en este caso, la codificación ISO-8859-15
Unidad 1: Gestión de ficheros

* Representa una conexión entre un stream de bytes y un stream de caracteres.
* Podemos leer bytes convertirlos a caracteres atendiendo a una codificación concreta (ISO Latin 1, UTF8,...).

Las clases InputStreamReader e InputStreamReader de la librería de io de Java proporcionan una forma de conectar un InputStream con un Reader y un OutputStream con un Writer, respectivamente.

**Constructores de InputStreamReader**

* `InputStreamReader(InputStream in)`: Crea un objeto InputStreamReader que usa la codificación de caracteres por defecto.
* `InputStreamReader(InputStream in, Charset cs)`: Crea un objeto InputStreamReader que usa la codificación pasada como argumento.
* `InputStreamReader(InputStream in, CharsetDecoder dec)`: Crea un objeto InputStreamReader que usa la codificación pasada como argumento.
* `InputStreamReader(InputStream in, String charsetName)`: Crea un objeto InputStreamReader que usa la codificación pasada como argumento.

**Constructores de OutputStreamReader**

* `OutputStreamWriter(OutputStream out)`: Crea un objeto OutputStreamWriter que usa la codificación de caracteres por defecto.
* `OutputStreamWriter(OutputStream out, Charset cs)`: Crea un objeto OutputStreamWriter que usa la codificación pasada como argumento.
* `OutputStreamWriter(OutputStream out, CharsetEncoder enc)`: Crea un objeto OutputStreamWriter que usa la codificación pasada como argumento.
* `OutputStreamWriter(OutputStream out, String charsetName)`: Crea un objeto OutputStreamWriter que usa la codificación pasada como argumento de cadena.

**Métodos de InputStreamReader**

* `void close()`: Cierra el fichero y libera sus recursos asociados.
* `String getEncoding()`: Devuelve el nombre de la codificación usada por el flujo.
* `int read()`: Lee un caracter.
* `int read(char[] cbuf, int off, int len)`: Lee len caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf a partir de off.
* `boolean ready()`: Indica si el flujo de entrada está listo para ser leído.

**Métodos de OutputStreamReader**

* `void close()`: Cierra el flujo de salida y libera sus recursos asociados.
* `void flush()`: Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
* `String getEncoding()`: Devuelve el nombre de la codificación usada por el flujo.
* `void write(char[] cbuf, int off, int len)`: Escribe len caracteres a partir del desplazamiento marcado por off.
* `void write(int c)`: Escribe un caracter.
* `void write(String str, int off, int len)`: Escribe una porción de la cadena empezando en off y de longitud len.

Ejemplo de lectura de un fichero con codificación ASCII:

```java
public static void main(String[] args) throws IOException {
    InputStreamReader ent;
    try {
        ent = new InputStreamReader(new FileInputStream("C:/FicherosJava/Copia.txt"), "ISO -8859-15");
        System.out.println(ent.getEncoding());
        int cad;
        while ((cad = ent.read()) != -1) {
            System.out.println((char) cad);
        }
    }
}
```
- 6.4 Buffer para el flujo de caracteres: Clases 
  BufferedReader y BufferedWriter  
  A la hora de optimizar los flujos de caracteres, existen las clases Buffer edReader y BufferedWriter que 
  crean un buffer para agilizar las operaciones de lectura y escritura en flujos de caracteres.  
  Son análogas a las de flujo de bytes: BufferedInputStream y BufferedOutputStream.  
  ▪ La clase BufferedReader recibe un flujo de caracte res e implementa un buffer para poder leer líneas de 
  texto.  
  Define el método readLine  para leer una línea de texto. Esta clase se utiliza si sabemos que el archivo es 
  de texto y está escrito en líneas separadas por retornos de carro.  

  Constructor  de BufferedReader  
  BufferedReader (Reader in)  
  Crea un buffer para el flujo de caracteres de entrada  utilizando el tamaño por defecto.  
  BufferedReader (Reader in, int sz)  
  Crea un buffer para el flujo de caracteres  de entrada  utilizando el tamaño indicado en el parámetro sz. Lanza un IllegalArgumentException si sz es  <= 0 

  Para e l manejo de archivos hay dos formas para construir u n objeto de tipo BufferedReader:  
  - Una es utilizar un objeto InputStreamReader creado sobre un objeto de tipo FileInputStream:  

  BufferedReader buffer  = new BufferedReader ( new InputStreamReader  (                           
 new FileInputStream (“archivo.dat”)));  
  - La otra forma es aceptar el tamaño del buffer y la codificación predefinidos, lo cuál muchas 
  veces es lo más conveniente, y para estos casos se puede usar la clase FileReader que como 
  argumento en el constructor se le pasa el nombre del archivo.  

  BufferedReader fd_in = new BufferedReader (  new FileReader (“archivo.dat”));  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings.  
  Define el método write  para escribir una línea de texto y el método newLine  para escribir un salto de 
  línea de acuer do al sistema operativo. Esta clase se utiliza si sabemos que el archivo es de texto y está 
  escrito en líneas s eparadas por retornos de carro.  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings.  
  Define el método write  para escribir una línea de texto y el método newLine  para escribir un salto de 
  línea de acuer do al sistema operativo. Esta clase se utiliza si sabemos que el archivo es de texto y está 
  escrito en líneas s eparadas por retornos de carro.  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings.  
  Define el método write  para escribir una línea de texto y el método newLine  para escribir un salto de 
  línea de acuer do al sistema operativo. Esta clase se utiliza si sabemos que el archivo es de texto y está 
  escrito en líneas s eparadas por retornos de carro.  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings.  
  Define el método write  para escribir una línea de texto y el método newLine  para escribir un salto de 
  línea de acuer do al sistema operativo. Esta clase se utiliza si sabemos que el archivo es de texto y está 
  escrito en líneas s eparadas por retornos de carro.  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings.  
  Define el método write  para escribir una línea de texto y el método newLine  para escribir un salto de 
  línea de acuer do al sistema operativo. Esta clase se utiliza si sabemos que el archivo es de texto y está 
  escrito en líneas s eparadas por retornos de carro.  
  ▪ La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un 
  buffer para la escritura eficiente de caracteres, arreglos y strings
Unidad 1: Gestión de ficheros

### Constructor de BufferedWriter

#### `BufferedWriter(Writer out)`

Crea un buffer para el flujo de caracteres de salida utilizando el tamaño por defecto.

#### `BufferedWriter(Writer out, int sz)`

Crea un buffer para el flujo de caracteres de salida utilizando el tamaño indicado en el parámetro `sz`. Lanza un `IllegalArgumentException` si `sz` es <= 0

### Manejo de archivos con BufferedWriter

Existen dos formas de construir un objeto de tipo BufferedWriter:

1. Utilizando un objeto `OutputStreamReader` creado sobre un objeto de tipo `FileOutputStream`:

```java
BufferedWriter fd_out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("archivo.dat")));
```

Ventaja: se puede manejar el tamaño del buffer e incluso cambiar la codificación de los caracteres.

2. Aceptar el tamaño del buffer y la codificación predefinidos, lo cuál muchas veces es lo más conveniente. Para estos casos se puede usar la clase `FileWriter` que como argumento en el constructor se le pasa el nombre del archivo:

```java
BufferedWriter fd_out = new BufferedWriter(new FileWriter("archivo.dat"));
```

### Ejemplo de copiar un fichero de Texto ASCII en otro fichero utilizando buffers para mejorar las operaciones de lectura y escritura:

```java
public class EjficheroTextoBuffer {
    public static void main(String[] args) throws IOException {
        InputStream reader = null;
        OutputStreamWriter salida = null;
        BufferedReader bufferent = null;
        BufferedWriter buffersal = null;

        try {
            salida = new OutputStreamWriter(new FileOutputStream("C:/FicherosJava/Destino.txt"), "ISO -8859-15");
            buffersal = new BufferedWriter(salida);
            String cad;

            reader = new InputStreamReader(new FileInputStream("C:/FicherosJava/Copia.txt"), "ISO -8859-15");
            bufferent = new BufferedReader(reader);

            while ((cad = bufferent.readLine()) != null) {
                System.out.println(cad);
                salida.write(cad);
            }
        } catch (FileNotFoundException e) {
            System.out.println("error al abrir el fichero");
        } catch (IOException e) {
            System.out.printf("error de entrada/salida");
        } finally {
            if (reader != null) reader.close();
            if (salida != null) salida.close();
            if (buffersal != null) buffersal.close();
            if (bufferent != null) bufferent.close();
        }
    }
}
```

### Escritura formateada: la clase PrintWriter

Java también proporciona la clase PrintWriter para escribir en un fichero de texto utilizando flujos de caracteres. Su analogo en flujo de bytes es PrintStream y su uso es muy parecido.

El constructor de la clase PrintWriter recibe un objeto de tipo File y puede lanzar la excepcion FileNotFoundExceptio n si se produce algún problema para su apertura.

Constructor:

```java
public PrintWriter(File file)
```
Unidad 1: Gestión de ficheros

### Crea un flujo de carcteres en el fichero especificado File

```java
PrintWriter(out) 
```

### Crea un flujo de carcteres en el fichero desde un OutputStream existente

```java
PrintWriter(out, boolean autoFlush) 
```

### Crea un flujo de carcteres en el fichero desde un OutputStream existente con vaciado de buffer

```java
PrintWriter(out, boolean autoFlush) 
```

### Crea un flujo de carcteres en el fichero especificado en el argumento String

```java
PrintWriter(fileName) 
```

### Crea un flujo de carcteres en el fichero desde un Writer existente

```java
PrintWriter(out) 
```

### Crea un flujo de carcteres en el fichero desde un Writer existente

```java
PrintWriter(out, boolean autoFlush) 
```

### Escribe un valor de tipo Tipo en el fichero

```java
print(Tipo t) 
```

### Escribe un objeto de tipo boolean, char, char [], String, double, float, int, long o Object y salta de línea en el fichero

```java
println(Tipo p) 
```

### Ejemplo de uso

```java
public class EjEscrituraPrintWriter {
    public static void main(String[] args) {
        PrintWriter pw = null;
        try {
            pw = new PrintWriter("C:/FicherosJava/TextoconPrintWriter.txt");
            pw.println("Imprime una cadena de texto");
            int i = 15;
            pw.println("Imprime un entero " + i);
            double d = 6.8e-9;
            pw.println("Imprime un double " + d);
            System.out.printf("%d, %s, %.2f", 2, "hola ", 8.98987);
            System.out.println();
        } catch (FileNotFoundException e) {
            System.out.printf("Fichero no encontrado");
            System.out.println();
        } finally {
            if (pw != null)
                pw.close();
        }
    }
}
```
Unidad 1: Gestión de ficheros

- Si el token actual es un número, esta variable contiene ese número.
- Si el token actual es una palabra, esta variable contiene esa palabra.
- Esta constante indica que el final del flujo de datos se ha leído.
- Esta constante indica que el final de línea se ha leído.
- Esta constante indica que el token que se ha leído es un número.
- Esta constante indica que el token que se ha leído es una cadena.
- Después de una llamada al método nextToken, este campo contiene el tipo del token que se acaba de leer.

Constructor de StreamTokenizer
- StreamTokenizer(InputStream is)
- Deprecated.
- Desde JDK version 1.1, la manera preferente para extrer tokens de un stream de bytes es convertirlo a un stream de caracteres.
- StreamTokenizer(Reader r)
- Crea un objeto StreamTokenizer a partir de un flujo de caracteres.

Para leer los token se utiliza el método nextToken().
Ejemplo:
El siguiente ejemplo es uno de los que usa el tokenizer. Tenemos un fichero de texto con la siguiente información que corresponde a identificativo, nombre y edad de una persona:
```java
public class EjStreamTokenizer {
    public static void main(String[] args) throws IOException {
        FileReader r = new FileReader("C:/FicherosJava/Ejemplo.txt");
        StreamTokenizer tokens = new StreamTokenizer(r);
        while (tokens.nextToken() != StreamTokenizer.TT_EOF) {
            if (tokens.ttype == StreamTokenizer.TT_WORD)
                System.out.println(tokens.sval);
            else if (tokens.ttype == StreamTokenizer.TT_NUMBER)
                System.out.println((int) tokens.nval);
        }
    }
}
```
Salida:
9. Serialización
La serialización de un objeto consiste en obtener una secuencia de bytes que represente el estado de dicho objeto. Esta secuencia puede utilizarse de varias maneras (puede enviarse a través de la red, guardarse en un fichero para su uso posterior, utilizarse para recomponer el objeto original, etc.).
Unidad 1: Gestión de ficheros

9.1 Interfaz Serializable

Un objeto serializable es un objeto que se puede convertir en una secuencia de bytes para poder ser tratado por un stream.

Para que un objeto sea serializable, debe implementar la interfaz java.io.Serializable.

```java
import java.io.Serializable;

public class Datos implements Serializable {
    private int a;
    private String b;
    private char c;
}
```

Esta interfaz no define ningún método. Simplemente se usa para 'marcar' a aquellas clases cuyas instancias pueden ser convertidas a secuencias de bytes (y posteriormente reconstruidas).

Objetos tan comunes como String, Vector o ArrayList implementan Serializable, de modo que pueden ser serializados y reconstruidos más tarde.

El sistema de ejecución de Java se encarga de hacer la serialización de forma automática.

9.2 Excluir campos al serializar objetos

Algunas veces es necesario excluir campos a la hora de serializar objetos, por ejemplo cuando se tiene un objeto que guarda la información de un usuario incluida su contraseña.

Para evitar que esos campos sean serializados, basta con utilizar el modificador transient.

```java
private String nombre;
private transient String contrasenia; // Este campo no será guardado
```

9.3 Flujos para la entrada y salida de objetos

ObjectInputStream e ObjectOutputStream

La serialización está orientada a bytes, por lo tanto, se utilizan clases que están en la jerarquía de inputStream y OutputStream.

Estas clases implementan las interfaces ObjectInput y ObjectOutput, que son subinterfaces de DataInput y DataOutput.

Esto significa que todos los métodos de E/S para escribir o leer datos en flujos de datos también se aplican a los flujos para objetos. Por lo tanto, un flujo de objeto puede contener una mezcla de valores primitivos y objetos.

```java
import java.io.*;

public class Flujos {
    public static void main(String[] args) throws IOException {
        // Código de ejemplo para utilizar flujos de objeto
    }
}
```
# Unidad 1: Gestión de ficheros

## Serialización de objetos

Para serializar un objeto, es necesario crear un objeto de tipo `OutputStream` que se le pasa al constructor de `ObjectOutputStream`. A continuación se puede llamar algún método, por ejemplo, `writeObject()` para serializar el objeto.

### Constructor de ObjectOutputStream

```java
protected ObjectOutputStream(OutputStream out) throws IOException
```

Crea un `ObjectOutputStream` que escribe en el `OutputStream` especificado.

### Ejemplo de serialización

Para escribir un objeto en un fichero:

```java
FileOutputStream fs = new FileOutputStream(fichero);
ObjectOutputStream os = new ObjectOutputStream(fs);
```

O de forma abreviada:

```java
ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(fichero));
```

## Recuperación de objetos

Para recuperar un objeto, es necesario crear un objeto de tipo `InputStream` que se le pasa al constructor de `ObjectInputStream`. A continuación se puede llamar algún método, por ejemplo, `readObject()` para leer el objeto.

### Constructor de ObjectInputStream

```java
protected ObjectInputStream(InputStream en) throws IOException
```

Recupera datos primitivos y objetos previamente almacenados con `ObjectOutputStream`.

### Ejemplo de recuperación

Para leer un objeto de un fichero:

```java
FileInputStream fe = new FileInputStream(fichero);
ObjectInputStream oe = new ObjectInputStream(fe);
```

O de forma abreviada:

```java
ObjectInputStream oe = new ObjectInputStream(new FileInputStream(fichero));
```

Es importante tener claro el orden y el tipo de los objetos almacenados en el disco para recuperarlos en el mismo orden.

## Escritura de objetos en ficheros

La clase `ObjectOutputStream` permite crear objetos que se asocian a un objeto `FileOutputStream` y facilita métodos para escribir o almacenar secuencialmente información codificada en binario en el fichero asociado a dicho objeto.

Algunos métodos son:

- `close()`: Cierra el flujo de salida.
- `defaultWriteObject()`: Escribe los campos no estáticos y no transient de la clase actual en el flujo de salida.
- `drain()`: Vacia todos los datos almacenados en el buffer de `ObjectOutputStream`.
- `enableReplaceObject(boolean enable)`: Activa el flujo de salida para la sustitución de objetos en el flujo.
- `flush()`: Vacía el flujo de salida.
- `replaceObject(Object obj)`: Reemplaza un objeto en el flujo de salida.
- Unidad 1: Gestión de ficheros
  - `reset()`
  - `write(byte[] buf)`
  - `write(byte[] buf, int off, int len)`
  - `write(int val)`
  - `writeBoolean(boolean val)`
  - `writeByte(int val)`
  - `writeBytes(String str)`
  - `writeChar(int val)`
  - `writeChars(String str)`
  - `writeClassDescriptor(ObjectStreamClass desc)`
  - `writeDouble(double val)`
  - `writeFields()`
  - `writeFloat(float val)`
  - `writeInt(int val)`
  - `writeLong(long val)`
  - `writeObject(Object obj)`
  - `writeObjectOverride(Object obj)`
  - `writeShort(int val)`
  - `writeUTF(String str)`

Ejemplo: Escritura de objetos punto en un fichero.

```java
package ejserializacionobjetosfichero;

import java.io.*;

class punto implements Serializable {
    int x, y;

    punto(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}

public class EjSerializacionObjetosFichero {
    public static void main(String[] args)
            throws IOException, ClassNotFoundException {
        ObjectOutputStream salida = new ObjectOutputStream(
                new FileOutputStream("C:/FicherosJava/ejobjetos.dat"));

        salida.writeObject(new punto(5, 8));
        salida.writeObject(new punto(1, 9));
        salida.writeObject(new punto(3, 7));
        salida.close();
        System.out.println("fin de la grabación de objetos");
    }
}
```
Unidad 1: Gestión de ficheros

- **ObjectInputStream**: permite crear objetos que se asocian a un objeto FileInputStream y facilita métodos para leer de él secuencialmente información codificada en binario.

  - **available()**: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
  - **close()**: Cierra el flujo de entrada.
  - **defaultReadObject()**: Lee los campos no estáticos y no transient de la clase actual en el flujo de entrada.
  - **enableResolveObject(boolean enable)**: Activa el flujo de entrada para que los objetos leídos puedan ser sustituidos.
  - **read()**: Lee un byte de datos.
  - **read(byte[] buf, int off, int len)**: Lee en un array de bytes.
  - **readBoolean()**: Lee un boolean.
  - **readByte()**: Lee un byte (8 bits).
  - **readChar()**: Lee un carácter con 16 bits.
  - **readClassDescriptor()**: Lee el descriptor desde el flujo de serialización.
  - **readDouble()**: Lee un double (64 bit).
  - **readFloat()**: Lee un float (32 bit).
  - **readFully(byte[] buf)**: Lee b uf.length bytes y los deposita en el array b uf.
  - **readFully(byte[] buf, int off, int len)**: Lee b uf.length bytes y los deposita en el array b uf a partir del desplazamiento off.
  - **readInt()**: Lee un int (32 bit).
  - **readLine()**: Obsoleto.
  - **readLong()**: Lee un long (64 bit).
  - **readObject()**: Lee un objeto desde el flujo ObjectInputStream.
  - **readShort()**: Lee un short (16 bit).
  - **readUnsignedByte()**: Lee un byte sin signo (8 bit).
  - **readUnsignedShort()**: Lee un short sin signo (16 bit).
  - **readUTF()**: Lee un String en formato UTF-8.
  - **skipBytes(int len)**: Salta len bytes.

  Ejemplo de lectura de objetos punto escritos en un fichero:

 ```java
ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("C:/FicherosJava/ejobjetos.dat"));
try {
    while (true) {
        punto puntoentrada = (punto) entrada.readObject();
        System.out.println("(x=" + puntoentrada.getX() + ", y=" + puntoentrada.getY() + ")");
    }
} catch (IOException e) {
    System.out.println("llegado al final");
}
entrada.close();
```
```java
Unidad 1: Gestión de ficheros  
### 9.6 Seria lización de objetos compuestos

Si dentro de la clase hay atributos que son otras clases, ésta s clases  a su vez también deben ser 
Serializable.

Con los tipos de java (String, Integer, etc.) no hay problema porque lo son. Las principales clases en java 
ya son serializables.

Si ponemos como atributos nuestras propias clases, éstas a su vez deben implementar Serializable.

Si no java lanza una excepción, por ejemplo: 
Exception in thread "main" 
java.io.NotSerializableException: ejemplo de serialización de ficheros objetos compuestos.Punto

Ejemplo: la clase Rectangulo tiene un atributo de tipo Punto. La clase Punto debe implementar también la 
interfaz serializable:

```java
package ejserializacionficherosobjetoscompuestos;

import java.io.*;

class Punto implements Serializable {
    int x, y;
    Punto(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public int getX() {
        return x;
    }
    public int getY() {
        return y;
    }
}

class Rectangulo implements java.io.Serializable {
    private int ancho;
    private int alto;
    private Punto origen;

    public Rectangulo(int x, int y, int ancho, int alto) {
        origen = new Punto(x, y);
        this.ancho = ancho;
        this.alto = alto;
    }

    public int getX() {
        return origen.getX();
    }

    public int getY() {
        return origen.getY();
    }

    public int getAncho() {
        return ancho;
    }

    public int getAlto() {
        return alto;
    }
}

public class EjSerializacionFicherosObjetosCompuestos {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream("C:/FicherosJava/ejobjetos2.dat"));
        salida.writeObject(new Rectangulo(3, 4, 5, 8));
        salida.writeObject(new Rectangulo(6, 1, 5, 8));
        salida.writeObject(new Rectangulo(2, 4, 5, 8));
        salida.close();
        System.out.println("leyendo el fichero");
        ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("C:/FicherosJava/ejobjetos2.dat"));
        try {
            while (true) {
                Rectangulo Rectentrada = (Rectangulo) entrada.readObject();
                System.out.println("(x=" + Rectentrada.getX() + ", y=" + Rectentrada.getY() + "), alto=" + Rectentrada.getAlto() + " Ancho=" + Rectentrada.getAncho());
            }
        } catch (IOException e) {
            System.out.println("llegado al final");
        }
        entrada.close();
    }
}
```
Unidad 1: Gestión de ficheros

10. Ficheros de acceso directo

A menudo, no se desea leer un fichero de principio a fin; sino acceder al fichero como una base de datos, 
donde se salta de un registro a otro; cada uno en diferentes partes del fichero.

El paquete java.io  contiene una clase muy útil para el tratamiento de ficheros de acceso directo, su 
nombre es RandomAccessFile  e implementa los interfaces DataInput y DataOutput, por lo que contiene 
métodos de lectura y escritura sobre este tipo de ficheros.

La clase RandomAccessFile proporciona todos los métodos necesarios para leer y escribir en archivos de 
manera no necesariamente secuencial, es decir, en forma aleatoria.

**Constructores**

* RandomAccessFile (File fichero, String modo)  throws FileNotFoundException
Abre el fichero de acceso aleatorio especificado en el argumento File para lectura, y opcionalmente, para escritura según se especifique 
en el argumento modo.
* RandomAccessFile(String nombre, String modo)  throws FileNotFoundException
Abre el fichero de acceso aleatorio especificado en el argumento nombre  para lecturas, y opcionalmente, para escritura según  se 
especifique en el argumento modo.

**Modos de acceso**

* "r": Abre el fichero para sólo lectura . La invocación de cualquiera de los métodos de escritura del objeto 
resultante causará una excepción IOException al ser lanzada.
* "rw" : Abre el fichero para lectura y escritura . Si el fichero  no existe , entonces se intentará crearlo.

**Excepciones que se puede lanzar**

* IllegalArgumentException  - si el argumento mode no es igual a la de "r", "rw".
* FileNotFoundException  - si el modo de acceso es "r", y el fichero no existe , o si el modo de acceso es  
"rw", y el fichero no existe, se intenta crear uno nuevo y se produce un error al crearlo, o si existe y no se 
puede abrir.

**Métodos de RandomAccessFile**

* void  close()throws IOException  
Cierra el fichero y libera sus recursos asociados.
* FileChannel  getChannel ()throws IOException  
Devuelve el objeto único FileChannel  asociado con el fichero.
* FileDescriptor  getFD()throws IOException  
Devuelve el objeto descriptor del fichero asociado con el stream.
* long  getFilePointer ()throws IOException  
Devuelve la posición actual del punteo de lectura/es critura.
* long  length()throws IOException  
Devuelve la longitud del fichero.
* int read()throws IOException  
Lee un  byte del fichero. Devuelve -1 si no hay ningún byte más que leer.
* int read(byte[] b) throws IOException  
No lee un solo byte, sino que lee hasta que  b.length bytes guardándolos en el array b que se envía como parámetro. Devuelve -1 si no 
hay ningún byte más que leer.
Aquí está el contenido del PDF convertido a Markdown:

**Gestión de ficheros**

### Lectura de ficheros

* `readBoolean()`: Lee un boolean desde el fichero. Este método lee un solo byte del archivo, a partir del puntero de archivo actual. Un valor de 0 representa false. Cualquier otro valor representa el verdadero.
* `readByte()`: Lee un byte con signo desde el fichero. Lanza EOFException si el archivo ha llegado al final.
* `readChar()`: Lee un carácter desde el fichero. Lanza una EOFException si el archivo llega al final antes de leer 2 bytes.
* `readDouble()`: Lee un double desde el fichero. Lanza una EOFException si el archivo llega al final antes de leer 8 bytes.
* `readFloat()`: Lee un float desde el fichero. Lanza una EOFException si el archivo llega al final antes de leer 4 bytes.
* `readFully(byte[] b)`: Lee b.length bytes comenzando en la posición actual del puntero de lectura y escritura y los deposita en el array b.
* `readFully(byte[] b, int off, int len)`: Lee len bytes comenzando en la posición actual del puntero de lectura y escritura y los deposita en el array b a partir de off.
* `readInt()`: Lee un entero de 32-bit desde el fichero. Lanza una EOFException si el archivo llega al final antes de leer 4 bytes.
* `readLine()`: Lee una cadena hasta que se encuentre el final de línea desde el fichero.
* `readLong()`: Lee un entero de 64-bit desde el fichero. Lanza una EOFException si el archivo llega al final antes de leer 4 bytes.
* `readShort()`: Lee un entero corto de 16-bit desde el fichero. Lanza EOFException si el archivo llega al final antes de la lectura de dos bytes.
* `readUnsignedByte()`: Lee un entero sin signo de 8-bit desde el fichero. Lanza EOFException si el archivo ha llegado al final.
* `readUnsignedShort()`: Lee un entero corto sin signo de 16-bit desde el fichero. Lanza EOFException si el archivo llega al final antes de la lectura de dos bytes.
* `readUTF()`: Lee una cadena desde el archivo. La cadena se ha codificado con UTF-8 formato.

### Escritura de ficheros

* `write(byte[] b)`: Escribe b.length bytes en el fichero desde el array b en la posición actual del puntero de lectura/escritura.
* `write(byte[] b, int off, int len)`: Escribe len bytes en el fichero desde el array b comenzando en la posición off.
* `write(int b)`: Escribe el primer byte de menor peso en el fichero. Los otros 3 restantes bytes se ignoran.
* `writeBoolean(boolean v)`: Escribe un boolean en el fichero. Si el argumento v es verdadero, el valor (byte) 1 se escribe, y si v es falso, el valor (byte) 0 se escribe.
* `writeByte(int v)`: Escribe el primer byte de menor peso en el fichero. Los otros 3 restantes bytes se ignoran.
* `writeBytes(String s)`: Escribe una cadena en el fichero. Por cada carácter de la cadena s, tomadas en orden, un byte se escribe en el fichero.
* `writeChar(int v)`: Escribe un valor char, que se compone de dos bytes, en el fichero.
* `writeChars(String s)`: Escribe una cadena en el fichero. Por cada carácter de la cadena s, tomadas en orden, se escribe un byte en el fichero.
* `writeDouble(double v)`: Escribe un número real Double.
* `writeFloat(float v)`: Escribe un número real Float.
* `writeInt(int v)`: Escribe un número entero.
* `writeLong(long v)`: Escribe un número entero long.
* `writeShort(int v)`: Escribe un número entero Short.

### Posicionamiento y longitud del fichero

* `seek(long pos)`: Establece el puntero de lectura y escritura en la posición pos del fichero.
* `setLength(long newLength)`: Establece la longitud del fichero.
* `skipBytes(int n)`: Trata de saltar n bytes en el fichero.
- Unidad 1: Gestión de ficheros  
 
- Escribe una cadena UNICODE utilizando codificación UTF-8. 

Ejemplo:
```java
package ejficheroaccesoaleatorio;  
import java.io.FileNotFoundException;  
import java.io.IOException;  
import java.io.RandomAccessFile;  
/* @author María José Galán  
 */ 
public class EjFicheroAccesoAleatorio {  
    public static void main(String[] args) throws IOException  { 
        RandomAccessFile f =null; 
        try{ 
            //si el fichero no existe, se crea  
         f=new RandomAccessFile ("C:/FicherosJava/ejemplo1.txt"," rw"); 
       //siturarse al final del archivo  
        f.seek(f.length());  
        String s="esto se va a añadir al final del archivo \n"; 
        f.writeBytes(s);  
     //situar el puntero de L/E al principio del archivo.  
         f.seek(0L);  
         String cad= f.readLine();  
          while (cad!=null){  
               System.out.println(cad);  
                cad=f.readLine();  
          }   
               } 
        catch (FileNotFoundException e){  
            System.out.println("Error al abrir el archivo");  
        } 
        finally 
        {   if (f!=null) f.close();                
        }         
    } 
 }
```
