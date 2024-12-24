

Unidad 1: Gestión de Ficheros

# Índice
1. Manejo básico de ficheros en java
2. E/S estándar
3. Sistema de Ficheros y Directorios en Java
4. Escribir y leer datos de archivos secuenciales binarios: Clases FileOutputStream y FileInputStream
5. Las clases orientadas al filtrado del flujo de bytes.
6. Escribir y leer datos en archivos secuenciales de texto.
7. Escritura formateada: la clase PrintWriter
8. La clase StreamTokenizer
9. Serialización
10. Ficheros de acceso directo

## 1. Manejo básico de ficheros en java

Los programas usan variables para almacenar información: los datos de entrada, los resultados calculados y valores intermedios generados a lo largo del cálculo. Toda esta información es efímera, cuando salíamos del programa, todo lo que habíamos generado se pierde. A veces nos interesaría que la vida de los datos fuera más allá que la de los programas que los generaron. Es decir, que al salir de un programa, los datos generados quedaran guardados en algún lugar que permitiera su recuperación desde el mismo u otros programas. Por tanto, querríamos que dichos datos fueran persistentes.

Persistencia: Es la capacidad que tiene el programador para que sus datos se conserven al finalizar la ejecución de un proceso, de forma que se puedan recuperar y reutilizar en otros procesos.

Cuando se desea guardar información más allá del tiempo de ejecución de un programa, podemos optar por las siguientes posibilidades:

- Organizar esa información en uno o varios ficheros almacenados en algún soporte de almacenamiento persistente.
- Almacenar los datos en una base de datos.

En este capítulo veremos el uso básico de archivos en Java para conseguir persistencia de datos. Para ello, presentaremos conceptos básicos sobre archivos y algunas de las clases de la biblioteca estándar de Java para su creación y manipulación.

## 1.1 Concepto de fichero

Un archivo o fichero es una colección de datos homogéneos almacenados en un soporte físico del computador.

- Datos homogéneos: Almacena colecciones de datos del mismo tipo (igual que arrays/vectores)
- Cada elemento almacenado en un fichero se denomina registro, que se compone de campos.
- Puede ser almacenado en diversos soportes (disco duro, disquete, pendrive,..)

Desde el punto de vista de más bajo nivel, podemos definir un archivo (o fichero) como:

Un conjunto de bits almacenados en un dispositivo, y accesible a través de un camino de acceso (pathname) que lo identifica.

Es decir, un conjunto de 0s y 1s que reside fuera de la memoria del ordenador, ya sea en el disco duro, un pendrive, un CD, entre otros.

## 1.2 Clasificación de los ficheros

Podemos utilizar varios criterios para distinguir diversas subcategorías de archivos. Estos tipos de archivos se diferenciarán desde el punto de vista de la programación, en que cada uno de ellos proporcionará diferentes funcionalidades (métodos) para su manipulación. Según su contenido:

Sabemos que es diferente manipular números que Strings, aunque en el fondo ambos acaben siendo bits en la memoria del ordenador. Por eso, cuando manipulamos archivos, distinguiremos dos clases de archivos dependiendo del tipo de datos que contienen:


➢ Los archivos de caracteres (o de texto)

➢ Los archivos de bytes (o binarios)




Unidad 1: Gestión de ficheros

![imagen_3_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_3_1.png)

- Un fichero de texto es aquél formado exclusivamente por caracteres y que, por tanto, puede crearse y visualizarse usando un editor. Las operaciones de lectura y escritura trabajarán con caracteres. Por ejemplo, los ficheros con código java son ficheros de texto.
- En cambio un fichero binario ya no está formado por caracteres sino que los bytes que contiene pueden representar otras cosas como números, imágenes, sonido, etc.
NOTA: Para “entender” los contenidos de un fichero es necesario conocer de antemano el tipo de datos que contiene.

1.2.1 Según el tipo de acceso a los datos:

Existen dos modos básicos de acceso a la información contenida en un archivo:

- Acceso Secuencial: En este caso, los datos son leídos secuencialmente, desde el principio hasta el final. La información del archivo es una secuencia de bytes (o caracteres) de manera que para acceder al byte (o carácter) N se ha de haber accedido anteriormente a los N-1 anteriores.
- Acceso aleatorio (“Random” o directo): los archivos de acceso aleatorio permiten acceder a los datos en forma no secuencial, desordenada. Nos permite acceder directamente a la información del byte N.

En java podemos incluir otro tipo de acceso a los datos:

- Concatenación (tuberías o pipes): Muchas veces es útil realizar conexiones entre programas que corren simultáneamente dentro de una misma máquina, de forma que lo que uno produce se envía por un “tubo” para ser recibido por el otro, que está esperando a la salida del tubo (sin tener que utilizar una memoria intermedia). Las tuberías o pipes cumplen esta función.

1.3 Tipos de operaciones en ficheros

Las operaciones más comunes en ficheros son:

- Operación de Creación
- Operación de Apertura. Varios modos:
  - Sólo lectura
  - Sólo escritura
  - Lectura y Escritura
- Operaciones de lectura / escritura
- Operaciones de inserción / borrado
- Operaciones de renombrado / eliminación
- Operación de desplazamiento dentro de un fichero
- Operación de ordenación
- Operación de cierre

Unidad 1: Gestión de ficheros

Punteros de lectura y escritura

Las operaciones sobre fichero se van a realizar en el byte que señalen los punteros de lectura y escritura:

- Indican el próximo byte a leer o a escribir
- Gestionados automáticamente por el sistema operativo
- Cuando se abren, se comienzan apuntando al primer byte del fichero
- Van avanzando por el fichero según se van leyendo sus contenidos o escribiendo datos.

![imagen_4_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_4_1.png)

1.4 Paquete java.io

El paquete java.io contiene todas las clases relacionadas con las funciones de entrada (input) y salida (output).

Las clases que contienen el paquete java.io se muestran en la figura siguiente:

![imagen_4_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_4_2.png)


# Unidad 1: Gestión de ficheros

## RECORDATORIO

* Clase final: se declara como la clase que termina una cadena de herencia. No se puede heredar de una clase final.
* Clase abstracta: Una clase abstracta es una clase de la que no se puede crear objetos. La utilidad de estas clases estriba en que otras clases hereden de ésta, por lo que con ello conseguiremos reutilizar código.
* Interfaz: es una clase abstracta pura, es decir una clase donde todos los métodos son abstractos (no se implementa ninguno).

## 1.5 Stream (Flujos de datos)

Java se basa en las secuencias de datos para dar facilidades de entrada y salida. Una secuencia es una corriente de datos en serie entre un emisor y un receptor de datos en cada extremo.

Los programas en Java realizan la E/S a través de streams (Flujos), es decir, cualquier programa realizado en Java que necesite llevar a cabo una operación de E/S lo hará a través de un stream.

Un stream, cuya traducción literal es "flujo", es una abstracción de todo aquello que produzca o consuma información

![imagen_5_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_5_1.png)

Un flujo no está relacionado con un dispositivo físico, comportándose todos los flujos de la misma manera aunque traten con dispositivos distintos. Debido a esta característica se pueden aplicar las mismas clases a cualquier tipo de dispositivo.

La vinculación del stream al dispositivo físico lo lleva a cabo el sistema de entrada y salida de Java.

Las clases y métodos de I/O que necesitamos emplear son las mismas independientemente del dispositivo con el que estemos actuando, luego, el núcleo de Java sabrá si tiene que tratar con el teclado, el monitor, un sistema de ficheros o un socket de red liberando a nuestro código de tener que saber con quién está interactuando.

Un programa utiliza input stream (un flujo de entrada) para obtener los datos leídos de una fuente:

![imagen_5_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_5_2.png)

Un programa utiliza un output stream (flujo de salida) para escribir los datos a un destino:

![imagen_5_3.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_5_3.png)

La fuente de datos (data source) y el destino de los datos (data destination) de los diagramas anteriores puede ser cualquier cosa que genere o consuma datos. Esto incluye obviamente archivos de disco, pero una fuente o un destino puede ser otro programa, un dispositivo (impresora, periférico, etc.), un socket de red (es un método para la comunicación entre un programa del cliente y un programa del servidor en una red) o un array.

## 1.6 Tipos de flujos en java

Podemos distinguir básicamente dos tipos de flujos:

* Los flujos de bytes: Los datos fluyen en serie, byte a byte.
* Los flujos de caracteres: Transmiten caracteres Java

## 1.6.1 Flujos de bytes

Nos proporciona un medio adecuado para el manejo de entradas y salidas de bytes y su uso lógicamente está orientado a la lectura y escritura de datos binarios.

El tratamiento del flujo de bytes viene gobernado por dos clases abstractas: InputStream y OutputStream.

Cada una de estas clases abstractas tiene varias subclases concretas que controlan las diferencias entre los distintos dispositivos de I/O que se pueden utilizar. Así mismo, estas dos clases son las que definen los métodos que sus subclases tendrán implementados y, de entre todos, destacan read() y write() que leen y escriben bytes de datos respectivamente.

## 1.6.2 Flujos de caracteres

Proporciona un medio conveniente para el manejo de entradas y salidas de caracteres.

Dichos flujos usan codificación Unicode y, por tanto, se pueden internacionalizar.

Este es un modo que Java nos proporciona para manejar caracteres pero al nivel más bajo todas las operaciones de I/O son orientadas a byte.

Al igual que la anterior el flujo de caracteres también viene gobernado por dos clases abstractas: Reader y Writer. Dichas clases manejan flujos de caracteres Unicode. Y también de ellas derivan subclases concretas que implementan los métodos definidos en ellas siendo los más destacados los métodos read() y write() que, en este caso, leen y escriben caracteres de datos respectivamente.

## 1.6.3 Utilización de los flujos

La utilización de los flujos es un nivel de abstracción que hace que un programa no tenga que saber nada del dispositivo, lo que se traduce en una facilidad más a la hora de escribir programas, ya que los algoritmos para leer y escribir datos serán siempre más o menos los mismos.

En general, las operaciones serán:

* Lectura
  1. Abrir un flujo a una fuente de datos (creación del objeto stream): Teclado, Fichero, Socket
  2. Mientras existan datos disponibles
  - Leer datos
  3. Cerrar el flujo (método close)
* Escritura
  1. Abrir un flujo a una fuente de datos (creación del objeto stream): Pantalla, Fichero, Socket
  2. Mientras existan datos disponibles
  - Escribir datos
  3. Cerrar el flujo (método close)

Nota: Para los flujos estándar ya se encarga el sistema de abrirlos y cerrarlos.

Un fallo en cualquier punto produce la excepción IOException


Unidad 1: Gestión de ficheros

### 1.7 Los nombres de las clases de java.io

Las clases de java.io siguen una nomenclatura sistemática que permite deducir su función a partir de las palabras que componen el nombre, tal como se describe en la siguiente tabla:

| Palabra | Significado |
| --- | --- |
| InputStream, OutputStream | Lectura/Escritura de bytes |
| Reader, Writer | Lectura/Escritura de caracteres |
| File | Archivos y directorios |
| String, CharArray, ByteArray, StringBuffer | Memoria (a través del tipo primitivo indicado) |
| Piped | Tubería de datos |
| Buffered | Buffer |
| Filter | Filtro o procesos sobre el stream |
| Data | Intercambio de datos en formato propio de Java (datos primitivos) |
| Object | Persistencia de objetos |
| Print | Imprimir |

Un buffer es un espacio de memoria intermedia. Cuando se necesita un dato del disco se trae a memoria ese dato y sus datos contiguos, de modo que la siguiente vez que se necesite algo del disco la probabilidad de que esté ya en memoria sea muy alta. Algo similar se hace para escritura, intentando realizar en una sola operación de escritura física varias sentencias individuales de escritura.

![imagen_7_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_7_2.png)

![imagen_7_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_7_1.png)

### Unidad 1: Gestión de ficheros

![imagen_8_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_8_1.png)

### 1.8 Jerarquía de los flujos de bytes

- Los programas utilizan secuencias de bytes para realizar la entrada y salida de bytes (8-bits).
- Todas las clases de flujos de bytes descienden de las clases abstractas InputStream y OutputStream.
- Al tratarse de clases abstractas, no vamos a poder crear objetos de estas clases porque su funcionalidad está "incompleta" (tienen métodos que no están definidos, implementándolos las subclases), y así nos permiten representar un flujo de datos de entrada o salida binario cualquiera.
- Cada una de las clases hijas de InputStream y OutputStream proporciona una funcionalidad más específica a la clase padre, por lo tanto, tendremos que crear objetos de alguna de sus subclases.
- En la siguiente figura podemos ver la jerarquía de los flujos de entrada y salida de bytes de Java:

Las clases InputStream y OutputStream son clases abstractas de las que se derivan las clases que permiten crear flujos de bytes de 8 bits de lectura e escritura.

![imagen_8_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_8_2.png)

### Métodos de InputStream

* `int available()`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
* `void close()`: Cierra la corriente de entrada y libera los recursos del sistema que esté usando.
* `void mark(int readlimit)`: Marca la posición actual de la corriente de entrada.
* `boolean markSupported()`: Prueba si esta corriente de entrada soporta los métodos mark y reset.
* `abstract int read()`: Lee el siguiente byte de la corriente de entrada.


Unidad 1: Gestión de ficheros

### Métodos de InputStream

*   `int read(byte[] b)`
    *   Lee bytes de la corriente de entrada y los deposita en el vector b.
*   `int read(byte[] b, int off, int len)`
    *   Lee hasta len bytes de la corriente de entrada y los deposita en b a partir de off.
*   `void reset()`
    *   Coloca la corriente de entrada en la posición que tenía la última vez que se invocó mark.
*   `long skip(long n)`
    *   Salta y descarta los siguientes n bytes de la corriente de entrada.

### Métodos de OutputStream

*   `void close()`
    *   Cierra la corriente de salida y libera los recursos del sistema que está utilizando.
*   `void flush()`
    *   Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
*   `void write(byte[] b)`
    *   Escribe todos los b.length bytes del vector b en la corriente de salida.
*   `void write(byte[] b, int off, int len)`
    *   Escribe len bytes del vector b comenzando en la posición off.
*   `abstract void write(int b)`
    *   Escribe un byte especificado por el int b.

### Jerarquía de los flujos de caracteres

Existen dos variaciones para las Clases InputStream y OutputStream que son: Writer y Reader.

La principal diferencia entre estas clases es que las primeras ofrecen lo que es conocido como byte-orientated I/O, mientras Writer y Reader ofrecen character-based I/O, en otras palabras las clases InputStream y OutputStream solamente soportan "Streams" de 8-bits byte, mientras las Clases Writer y Reader soporta "Streams" de 16-bits.

La importancia de 16-bits radica en Java que utiliza Unicode, al utilizarse 8-bits no es posible emplear muchos caracteres disponibles en Unicode, además debido a que las Clases Writer y Reader son una adición más reciente al JDK, estas poseen mayor velocidad de ejecución a diferencia de sus contrapartes InputStream y OutputStream.

Las clases Reader y Writer son clases abstractas de las que se derivan las clases que permiten crear flujos de caracteres de 16 bits (Unicode) de lectura e escritura.

### Métodos de Reader

*   `abstract void close()`
    *   Cierra la corriente de entrada y libera los recursos del sistema que esté usando.
*   `void mark(int readlimit)`
    *   Marca la posición actual de la corriente de entrada.
*   `boolean markSupported()`
    *   Prueba si esta corriente de entrada soporta los métodos mark y reset.
*   `int read()`
    *   Lee un character.
*   `int read(char[] cbuf)`
    *   Lee caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf
*   `abstract int read(char[] cbuf, int off, int len)`
    *   Lee len caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf a partir de off
*   `boolean ready()`
    *   Indica si el flujo de entrada está listo para ser leído
*   `void reset()`
    *   Restablece el flujo de entrada.
*   `long skip(long n)`
    *   Salta n caracteres.

### Métodos de Writer

*   `Writer append(char c)`
    *   Añade el carácter especificado en el flujo de entrada
*   `abstract void close()`
    *   Cierra el flujo de salida
*   `abstract void flush()`
    *   Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
*   `void write(char[] cbuf)`
    *   Escribe un array de caracteres
*   `abstract void write(char[] cbuf, int off, int len)`
    *   Escribe len caracteres a partir del desplazamiento marcado por off.
*   `void write(int c)`
    *   Escribe un carácter
*   `void write(String str)`
    *   Escribe una cadena
*   `void write(String str, int off, int len)`
    *   Escribe una porción de la cadena empezando en off y de longitud len.

![imagen_10_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_10_1.png)


# Unidad 1: Gestión de ficheros

## 1.10 Clases equivalentes entre flujos de bytes y flujos de caracteres

![imagen_11_3.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_11_3.png)

## 2. E/S estándar

Todos los programas Java importan el paquete Java.lang automáticamente. Este paquete define una clase llamada System:

![imagen_11_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_11_1.png)

Es una clase final y todos sus contenidos son privados.

* No se puede instanciar un objeto de esa clase.
* La clase System siempre está ahí disponible para que se pueda invocar cualquiera de sus métodos.
* Todos los miembros del paquete java.lang se pueden usar directamente, no hay que importarlos.

* Contiene tres variables con flujos predefinidos llamadas in, out y err, que se pueden utilizar sin tener una referencia a un objeto System específico.

En Java se accede a la E/S estándar a través de los atributos estáticos de la clase java.lang.System

* System.in: implementa la entrada estándar. Por defecto es el teclado.
* System.out: implementa la salida estándar. Por defecto es la pantalla.
* System.err: implementa la salida de error. Por defecto es la pantalla

Estos flujos standard el sistema se encarga de abrirlos y cerrarlos automáticamente.

![imagen_11_4.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_11_4.png)

* System.in:
	+ Instancia de la clase InputStream: flujo de bytes de entrada
	+ Métodos:
		- read(): permite leer un byte de la entrada como entero
		- skip(n ): ignora n bytes de la entrada
		- available(): número de bytes disponibles para leer en la entrada
* System.out:
	+ Instancia de la clase PrintStream (subclase de OutputStream): flujo de bytes de salida
	+ Métodos para impresión de datos
		- print()
		- println()
		- flush(): vacía el buffer de salida escribiendo su contenido
* System.err
	+ Funcionamiento similar a System.out
	+ Se utiliza para enviar mensajes de error (por ejemplo a un fichero de log o a la consola)

## Ejemplo: Leer caracteres por teclado (byte a byte) hasta pulsar retorno de carro formado una cadena. Se imprime la cadena formada y el número total de bytes.

```java
package ejentradastandardbyte;

import java.io.*;

public class EjEntradaStandardbyte {
    // se tiene que capturar la excepción IOException
    public static void main(String[] args) throws IOException {
        int c, contador = 0;
        String cadena = new String();

        // se lee byte a byte hasta encontrar el fin de línea
        while ((c = System.in.read()) != '\n') {
            contador++;
            // Concatenamos el caracter a cadena
            cadena += (char) c;
        }

        System.out.println("cadena introducida:" + cadena);
        System.out.println("Contados " + contador + " bytes en total.");
    }
}
```

## 2.1 Lectura de teclado en java

## 2.1.1 InputStream: el objeto System.in

En java tenemos accesible el teclado desde System.in, que es un InputStream del que podemos leer bytes.

System.in es un objeto de la clase InputStream.

Para java, un InputStream es cualquier cosa de la que se leen bytes. Puede ser el teclado, un fichero, un socket, o cualquier otro dispositivo de entrada. Esto, por un lado es una ventaja. Si todas esas cosas son InputStream, podemos hacer código que lea de ellas sin saber qué estamos leyendo.

Por ejemplo, podemos leer bytes del teclado de esta forma:

```java
// Lectura de un byte
int mybyte = System.in.read();
```

Cómo un InputStream es para leer bytes, sólo tiene métodos para leer bytes. El problema de leer bytes, es que luego debemos convertirlos a lo que necesitemos. Por ejemplo, si tecleamos una letra A mayúscula, el byte leído es el 65, correspondiente a la A mayúscula en código ASCII. Si tecleamos un 3 y un 2, es decir, un 32, leeremos dos bytes 51 y 52, correspondientes a los caracteres ASCII del 3 y del 2, NO leeremos un 32.


# Unidad 1: Gestión de ficheros

## 2.1.2 Los Readers: InputStreamReader y BufferedReader

Para Java, una clase Reader es una clase que lee caracteres. Un Reader tiene métodos para leer caracteres. Con esta clase ya podríamos trabajar. La pena es que seguimos teniendo System.in, que es un InputStream y no un Reader.

### Cómo convertimos el System.in en Reader?

Hay una clase en Java, InputStreamReader, que nos hace esta conversión. Para obtener un Reader, únicamente tenemos que instanciar un InputStreamReader pasándole en el constructor un InputStream. El código es el siguiente:

```java
InputStreamReader entrada = new InputStreamReader(System.in);
```

Estamos declarando una variable "entrada" de tipo InputStreamReader. Creamos un objeto de esta clase haciendo new InputStreamReader(...). Entre paréntesis le pasamos el InputStream que queremos convertir a Reader, en este caso, el System.in.

### Leer carácter a carácter vs leer una línea completa

Hasta este momento solo se puede leer carácter a carácter, ahora bien, si quisiéramos leer, por ejemplo, 10 caracteres del teclado o hasta que se pulse la tecla intro, si sólo usamos InputStreamReader, como lee caracteres sueltos, tendríamos que decirle cuántos queremos (que puede que no lo sepamos), o bien ir pidiendo de uno en uno hasta que no haya más. Leer carácter a carácter puede llegar a seguir incómodo, sería mejor leer de una sola vez un conjunto de caracteres. En Java existe una clase que nos permite leer una línea completa: la clase BufferedReader.

### Obtener un objeto BufferedReader

El mecanismo para obtener un objeto BufferedReader es a partir de otro Reader cualquiera (por ejemplo, el InputStreamReader), por tanto, se instancia pasándole en el constructor un objeto de tipo Reader. El código sería:

```java
InputStreamReader entrada = new InputStreamReader(System.in);
BufferedReader entradabuffer = new BufferedReader(entrada);
```

O simplificándolo:

```java
BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
```

Se crea un InputStreamReader a partir de System.in y pasamos el InputStreamReader al constructor de BufferedReader, para que la lectura que se haga sobre el objeto creado en ese momento sea en realidad realizadas sobre System.in, para que al final el resultado sea leer una línea completa.

### Utilizar el método BufferedReader

Para utilizar el método BufferedReader debemos importar los paquetes: BufferedReader, InputStreamReader, IOException.

### Leer una línea de texto

Para realizar la captura desde el teclado, BufferedReader cuenta con el siguiente método:

- readLine():Lee una línea de texto hasta que encuentra un carácter de salto de línea (\n) y retorno de carro (\r), o sea hasta que pulsemos enter. Se obtiene un string pero si se quiere manipular como otro tipo de dato se tendrá que hacer un a conversión.

```java
BufferedReader entradabuffer = new BufferedReader(new InputStreamReader(System.in));
String texto;
try {
    texto = entradabuffer.readLine();
} catch (IOException ioe) {
    ioe.printStackTrace();
}
```

### Convertir una cadena String a un tipo de datos numérico

Si se quiere leer un número del teclado, el usuario escribe, por ejemplo 123, con la clase BufferedReader obtendremos un String que contiene "123", es decir, tres caracteres. Si lo que se pretende es leer un número, entonces tendremos que hacer una conversión del String al tipo numérico deseado.

- Convertir un String a un valor entero.

Para convertir un String (cadena) a un valor numérico (int) hay que emplear el método estático de la clase Integer, parseInt.

```java
int entero;
try {
    entero = Integer.parseInt(texto);
} catch (java.lang.NumberFormatException e) {
    System.out.println("Error, no se puede convertir, el numero no es un entero");
}
```

- Convertir un String a un valor entero largo.

Para convertir un String (cadena) a un valor numérico (long) hay que emplear el método estático de la clase Long, parseLong.

- Convertir un String a un valor entero corto.

Para convertir un String (cadena) a un valor numérico (short) hay que emplear el método estático de la clase Short, parseshort.

- Convertir un String a un valor Float.

Para convertir un String (cadena) a valor decimal(float), hay que emplear el método estático de la clase Float, parseFloat.


# Unidad 1: Gestión de ficheros

## Convertir un String a un valor Double

Para convertir un String (cadena) a un valor decimal (Double), hay que emplear el método estático de la clase Double, `parseDouble`.

![imagen_15_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_15_1.png)

### 2.1.4 La clase Scanner

Esta clase que se encuentra disponible desde Java 1.5, nos permite leer datos de una forma más sencilla que el clásico InputStream con un BufferedReader.

La clase Scanner tiene varios constructores que admiten, además de `System.in`, cosas como secuencias de bytes o ficheros.

El constructor que se utiliza para leer de la consola es:

![imagen_15_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_15_2.png)

Para utilizar Scanner para leer datos del teclado, tan solo tenemos que crearnos un objeto de tipo Scanner (importando previamente el paquete `java.util.Scanner`) e indicándole a este que lea de la consola con `System.in`. Nos quedaría lo siguiente:

```java
Scanner pruebaScanner = new Scanner(System.in);
```

Algunos métodos de la clase Scanner para lectura de datos:

* `String`: `next()`, lee una cadena, no permite espacios en blanco
* `boolean`: `nextBoolean()`, lee una valor boolean
* `byte`: `nextByte()`, lee un byte
* `double`: `nextDouble()`, lee un valor decimal double
* `float`: `nextFloat()`, lee un valor decimal float
* `int`: `nextInt()`, lee un valor int
* `String`: `nextLine()`, lee una cadena hasta que se pulse enter, permitiendo espacios en blanco
* `long`: `nextLong()`, lee un valor numérico long
* `short`: `nextShort()`, lee un valor numérico short

### Ejemplo de uso de Scanner

```java
package ejtecladoscanner;

import java.util.Scanner;

public class EjTecladoScanner {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("¿Cómo te llamas? ");
        String nombre = sc.nextLine(); // leer una cadena de caracteres
        System.out.println("Es un placer conocerte " + nombre);
        System.out.print("¿Que edad tienes? ");
        int edad = sc.nextInt(); // leer una cadena de caracteres
        System.out.print("¿pues aparentas menos edad? ");
    }
}
```

Otros métodos de Scanner son:

* `void`: `close()`, Cierra el Scanner
* `boolean`: `hasNext()`, Indica si quedan más cadenas por leer
* `boolean`: `hasNextBoolean()`, Indica si es posible leer más datos que se interpreten como un boolean
* `boolean`: `hasNextByte()`, Indica si es posible leer más datos que se interpreten como un byte
* `boolean`: `hasNextDouble()`, Indica si es posible leer más datos que se interpreten como un double
* `boolean`: `hasNextFloat()`, Indica si es posible leer más datos que se interpreten como un float
* `boolean`: `hasNextInt()`, Indica si es posible leer más datos que se interpreten como un int
* `boolean`: `hasNextLine()`, Indica si quedan más cadenas por leer
* `boolean`: `hasNextLong()`, Indica si es posible leer más datos que se interpreten como un long
* `boolean`: `hasNextShort()`, Indica si es posible leer más datos que se interpreten como un short
* `Scanner`: `useDelimiter(String pattern)`, Cambia los delimitadores que van a separar los items

Excepciones que pueden lanzar los métodos de Scanner:

* `NoSuchElementException`: no quedan más cadenas
* `IllegalStateException`: el scanner está cerrado
* `InputMismatchException`: el dato leído no es del tipo esperado

### Uso de la clase Scanner para leer de Fichero

Podemos utilizar el siguiente constructor:

![imagen_16_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_16_1.png)

Para leer proveniente de un String:

![imagen_16_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_16_2.png)

Ejemplo:

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
                sl.useDelimiter("\\s*,\\s*");
                System.out.print(sl.next() + ", ");
            }
        } catch (FileNotFoundException e) {
            System.out.println("Error al abrir el fichero");
        }
    }
}
```

Espero que esto te ayude. Recuerda que debes mantener las imágenes y no alterar el contenido del PDF.


# Unidad 1: Gestión de ficheros

## 2.1

```java
System.out.print(sl.next()+ ", "); 
System.out.println(sl.next()); 


s.close(); 
     }  
     catch (FileNotFoundException e) { 
         System.out.println("fichero no encontrado"); 
     } 
   } 
```

La clase Scanner admite expresiones regulares como patrones de búsqueda, por lo que podemos leer 
trozos de línea directamente usando los separadores que queramos o buscando expresiones concretas.  
Por ejemplo, si pedimos por teclado una fecha dd/mm/yy, necesitamos comprobar si la cadena leída 
cumple ese patrón: dos cifras, una barra, dos cifras, otra barra y otras dos cifras. Una expresión regular que 
se ajusta al anterior patrón podría ser: 
```
\\d\\d/\\d\\d/\\d\\d
```
donde \d quiere decir dígito, como es un carácter comodín y no forma parte de la 
cadena de búsqueda, hay que escaparlo con otra \.  
Si por ejemplo, se lee una fecha con un solo dígito como 1/1/12, sólo tiene un dígito en cada caso, así que 
no cumple el patrón y devuelve false.  
Si queremos algo más sofisticado, para que se admitan los días y meses con uno o dos dígitos, podemos 
usar el siguiente patrón: 
```
\\d{1,2}/\\d{1,2}/\\d{1,2} 
```
.Ahora, la expresión `\\d{1,2}` indica un dígito entre 1 y 2 veces, es decir, uno o 
dos dígitos.  
Hay muchas opciones, solo vamos a nombrar algunas, como por ejemplo: 
- El operador *  representa que el patrón indicado debe aparecer 0 o mas veces.  
- El operador +  representa que el patrón indicado debe aparecer 1 o más veces. 
- El carácter “?”: Indica que el símbolo que le precede puede aparecer una vez o ninguna. Ejemplo “H?ola” 
describe a Hola y a ola. 
- El carácter “^”: Representa el inicio de una cadena, de la forma que si ponemos un ejemplo con este 
carácter y otros entre paréntesis buscará las cadenas con esos caracteres de inicio. Cuando se emplea 
dentro de los corchetes la búsqueda muestra aquellas cadenas que no tienen esos caracteres al inicio. 
- El carácter “$”: Representa el final de una cadena o el final de línea, es muy útil para avanzar entre 
párrafos. 
- [] agrupar caracteres en grupos o clases. 
- |  Sirve para indicar una de varias opciones 
- \s para localizar caracteres como espacios, tabuladores .\S para lo contrario a \s. 
- \d para localizar cadenas con un digito.\D para lo contrario al \d. 
- \A para empezar la búsqueda por el principio de la cadena. 
- \Z para empezar la búsqueda por el final de la cadena. 

## 2.2

Salida formateada: Clase PrintStream 

Salida por consola: 
System.out y System.err se definen como objetos de PrintStream. 
La clase PrintStream proporciona utilidades para dar formato a la salida. Tiene dos métodos print() y 
println() que están sobrecargados para los tipos primitivos, objetos, cadenas y arrays de caracteres. La 
diferencia entre ambos métodos está en que println añade un carácter de nueva línea. Además el método 
println además puede llamarse sin argumentos, produciendo una nueva línea. 
Otro método de Printf es printf() que permite visualizar la salida formateada. 
 Algunos de sus contructores de PrintStream son los siguientes constructores: 

Unidad 1: Gestión de ficheros 

Constructores de PrintStream 
PrintStream(File file)  
Crea un flujo de impresión nuevo en el archivo especificado.  
PrintStream(OutputStream out)  
Crea un flujo de impresión nuevo 
PrintStream(OutputStream out, boolean autoFlush)  
Crea un flujo de impresión nuevo con vaciado del buffer. 
PrintStream(String fileName)  
Crea un flujo de impresión nuevo en el archivo especificado. 

```java
package ejsalidaconsola; 
import java.io.PrintStream; 
public class EjSalidaConsola { 
    public static void main(String[] args) { 
 /*El constructor toma como parámetros un objeto de tipo OutputStream del 
cual deriva PrintStream, por tanto, ya tenemos linkada la clase con el dispositivo de 
salida (la consola). 
*/     //Creamos un objeto PrintStream para imprimir en la pantalla 
        PrintStream pw = new PrintStream(System.out, true); 
        pw.println("Imprime una cadena de texto"); 
        int i = 15; 
        pw.println("Imprime un entero " + i); 
        double d = 6.8e-9; 
        pw.println("Imprime un double " + d); 
        //Utilizamos el objeto ya creado System.out  
        //salida formateada 
        System.out.printf ("%d, %s, %.2f", 2,"hola ", 8.98987); 
        System.out.println(); 

    }} 
```

Salida: 

![imagen_18_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_18_2.png)

Escritura en un fichero de texto utilizando PrintStream 
Si al constructor de PrintStream, en vez de pasarle el objeto System.out, le pasamos un fichero (con File o 
mediante un String) la salida se graba en el fichero de texto especificado. Tenemos que capturar la excepción 
FileNotFoundException. 
```java
import java.io.FileNotFoundException; 
import java.io.PrintStream; 
public class EjEscrituraPrintStream { 
    public static void main(String[] args) { 
 /*El constructor toma como parámetros un objeto de tipo OutputStream del 
cual deriva PrintStream, por tanto, ya tenemos linkada la clase con el dispositivo de 
salida (la consola). 
*/         PrintStream pw = null; 
        try{ 
        //Creamos un objeto PrintStream para imprimir en la pantalla 
        pw = new PrintStream("C:/FicherosJava/TextoconPrintStream.txt"); 
        pw.println("Imprime una cadena de texto"); 
        int i = 15; 
        pw.println("Imprime un entero " + i); 
        double d = 6.8e-9; 
        pw.println("Imprime un double " + d); 
        //Utilizamos el objeto ya creado System.out  
        //salida formateada 
        System.out.printf ("%d, %s, %.2f", 2,"hola ", 8.98987); 
        System.out.println(); 
        }         
       catch (FileNotFoundException e) 

![imagen_18_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_18_1.png)

       {    System.out.printf ("Fichero no encontrado"); 
             System.out.println();  } 
        finally{ 
                if (pw!=null) 
                    pw.close(); }                     
}} 
```

Nota: He mantenido las imágenes como en el original, pero si deseas eliminarlas, solo tienes que eliminar las líneas que las incluyen.


# Unidad 1: Gestión de ficheros

## 3. Sistema de Ficheros y Directorios en Java

### 3.1 La clase FILE

La clase `FILE` trabaja directamente con los archivos y el sistema de archivos. Se utiliza para obtener o modificar información asociada con un archivo, y para navegar por la jerarquía de subdirectorios.

Un directorio en Java se trata igual que un archivo con una propiedad adicional, una lista de nombres de archivo que se puede examinar utilizando el método `LIST`.

### 3.1.1 Creación de un objeto File

Los constructores de `File` permiten inicializar el objeto con el nombre de un archivo y la ruta donde se encuentra. También, inicializar el objeto con otro objeto `File` como ruta y el nombre del archivo o a través de una URI.

#### Constructores de la clase FILE

* `public File(String nombreCompleto)`: Crea un objeto `File` con el nombre y ruta del archivo pasado como argumento.
* `public File(String ruta, String nombre)`: Crea un objeto `File` en la ruta pasada como primer argumento y con el nombre del archivo como segundo argumento.
* `public File(File ruta, String nombre)`: Crea un objeto `File` en la ruta que proporciona un objeto `FILE` pasada como primer argumento y con el nombre del archivo como segundo argumento.
* `public File(URI uri)`: Crea un objeto `File` a través de un objeto `URI`.

### 3.1.2 Métodos de la clase File

#### Modificador y tipo

| Método y descripción | Tipo |
| --- | --- |
| `canExecute()` | Devuelve `true` si el archivo existe y la aplicación puede ejecutarlo. |
| `canRead()` | Devuelve `true` si el archivo existe y se puede leer. |
| `canWrite()` | Devuelve `true` si el archivo existe y se puede escribir. |
| `compareTo(File ruta)` | Compara dos rutas en orden alfabético |
| `createNewFile()` | Crea un nuevo archivo basado en la ruta dada al objeto `File` si solo si el fichero no existe. |
| `createTempFile(String prefijo, String sufijo)` | Crea un fichero vacío en el directorio temporal por defecto usando el prefijo y sufijo para generar el nombre. |
| `createTempFile(String prefijo, String sufijo, File directorio)` | Crea un fichero vacío en el directorio especificado usando el prefijo y sufijo para generar el nombre. |
| `delete()` | Borra el fichero o directorio especificado al crear el objeto `File`. |
| `deleteOnExit()` | Borra el fichero o directorio al finaliza la ejecución del programa. |
| `equals(Object objecto)` | Devuelve `true` si la ruta especificada es igual que el objeto dado. |
| `exists()` | Devuelve `true` si el fichero o directorio especificado existe. |
| `getAbsoluteFile()` | Devuelve un objeto `File` con la ruta absoluta al objeto `File` creado. |
| `getAbsolutePath()` | Devuelve una cadena con la ruta absoluta al objeto `File`. |
| `getCanonicalFile()` | Convierte un objeto `File` a una única forma canónica más adecuada para las comparaciones. |
| `getCanonicalPath()` | Convierte una ruta a una única forma canónica más adecuada para las comparaciones. |
| `getFreeSpace()` | Devuelve el número de bytes libres en la partición. |
| `getName()` | Devuelve el nombre del fichero o directorio especificado. |
| `getParent()` | Devuelve una cadena con el directorio padre o `null` si no tiene un directorio padre. |
| `getParentFile()` | Devuelve un objeto `File` con el directorio padre o `null` si no tiene un directorio padre. |
| `getPath()` | Convierte la ruta especificada al crear el objeto `File` en una cadena |
| `getTotalSpace()` | Devuelve el espacio total en la partición. |
| `getUsableSpace()` | Devuelve el espacio utilizado por el fichero. |
| `hashCode()` | Computa un código hash para este nombre de archivo. |
| `isAbsolute()` | Devuelve `true` si la ruta es absoluta. |
| `isDirectory()` | Devuelve `true` si es un directorio. |
| `isFile()` | Devuelve `true` si es un fichero. |
| `isHidden()` | Devuelve `true` si el fichero es oculto. |
| `lastModified()` | Devuelve la fecha de la última modificación del fichero especificado. |
| `length()` | Devuelve la longitud del fichero especificado. |
| `list()` | Devuelve un array de cadenas con los nombres y directorios del directorio especificado. |
| `list(FilenameFilter filtro)` | Devuelve un array de cadenas con los nombres y directorios del directorio especificado que satisfacen el filtro. |
| `listFiles()` | Lista los archivos que componen el directorio. |
| `listFiles(FileFilter filtro)` | Lista los archivos que componen el directorio y que cumplen con el criterio especificado. |
| `listFiles(FilenameFilter filtro)` | Lista los archivos que componen el directorio y que cumplen con el criterio especificado. |
| `listRoots()` | Devuelve un array de objetos `File`, donde cada objeto del array representa la carpeta raíz de una unidad de disco. |
| `mkdir()` | Crea un directorio en la ruta especificada. |
| `mkdirs()` | Crea el directorio especificado por el objeto `FILE` aunque no exista el camino. |
| `renameTo(File destino)` | Renombra el fichero especificado |
| `setExecutable(boolean permiso, boolean soloPropietario)` | Si `permiso` es `true`, se establece el permiso de ejecución. |
| `setLastModified(long fecha)` | Establece el tiempo de la última modificación del archivo o directorio |

Espero que esto te sea útil. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!


Unidad 1: Gestión de ficheros

### Métodos de la clase File

* `boolean setReadable(boolean permiso)`
 + Si `permiso` es `true`, se permiten operaciones de lectura. Devuelve `true` si la operación ha tenido éxito.
* `boolean setReadable(boolean permiso, boolean soloPropietario)`
 + Si `permiso` es `true`, se permiten operaciones de lectura.
 + Si `soloPropietario` es `true`, el permiso de lectura solo se aplica al propietario, en otro caso, se aplica a todo el mundo.
* `boolean setReadOnly()`
 + Establece el fichero o directorio de solo lectura.
* `Boolean setWritable(boolean permiso)`
 + Si `permiso` es `true`, se permiten operaciones de lectura y escritura. Devuelve `true` si la operación ha tenido éxito.
* `boolean setWritable(boolean permiso, boolean soloPropietario)`
 + Si `permiso` es `true`, se permiten operaciones de lectura y escritura.
 + Si `soloPropietario` es `true`, el permiso de lectura y escritura solo se aplica al propietario, en otro caso, se aplica a todo el mundo.
* `Path toPath()`
 + Devuelve un objeto `java.nio.file.Path` a partir de la ruta especificada
* `String toString()`
 + Devuelve una cadena a partir de la ruta especificada.
* `URI toURI()`
 + Devuelve a `file: URI` que representa la ruta especificada.

### Ejemplo

```java
package ejinformacionfichero;

import java.io.*;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class EjInformacionFichero {
    public static void main(String[] args) {
        String ruta = "D:/ACCESO a DATOS";
        // Para formatear la fecha de modificacion con el formato dd de mes de año en español
        SimpleDateFormat formateador = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy", new Locale("es", "ES"));
        File f = new File(ruta);
        if (f.exists()) {
            System.out.println("\n\tNombre: " + f.getName());
            System.out.println("\tTamaño: " + f.length() + " bytes");
            System.out.println("\tRuta absoluta: " + f.getAbsolutePath());
            System.out.println("\tPuede leerse: " + f.canRead());
            System.out.println("\tPuede modificar: " + f.canWrite());
            System.out.println("\tEs archivo: " + f.isFile());
            System.out.println("\tEs oculto: " + f.isHidden());
            System.out.println("\tModificado por última vez: " + formateador.format(new Date(f.lastModified())));
            System.out.println("\tEs directorio: " + f.isDirectory());
            if (f.isDirectory()) {
                System.out.println("\n

```
Unidad 1: Gestión de ficheros

### Métodos de la clase FileInputStream

#### Modificador y tipo

| Método | Descripción |
| --- | --- |
| int available() | Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente. |
| void close() | Cierra el fichero y libera los recursos del sistema que esté usando. |
| protected void finalize() | Asegura que el fichero es cerrado cuando no hay más referencias al él. |
| FileChannel getChannel() | Retorna el objeto FileChannel asociado con el fichero. |
| FileDescriptor getFD() | Devuelve el objeto FileDescriptor que representa la conexión actual del fichero en el sistema de ficheros usado por el FileInputStream. |
| int read() | Lee un byte de datos desde el fichero. Devuelve -1 si no hay ningún byte más que leer. |
| int read(byte[] b) | No lee un solo byte, sino que lee hasta que `b.length` bytes guardándolos en el array `b` que se envía como parámetro. Devuelve -1 si no hay ningún byte más que leer. |
| int read(byte[] b, int off, int len) | Lee hasta `len` bytes del fichero y los deposita en `b` a partir de `off`. Devuelve -1 si no hay ningún byte más que leer. |
| long skip(long n) | Salta `n` bytes de datos del fichero. |

### Métodos de FileOutputStream

#### Modificador y tipo

| Método | Descripción |
| --- | --- |
| void close() | Cierra el flujo de salida y libera todos los recursos del sistema asociados con esta corriente. Cualquier acceso posterior generaría una IOException |
| protected void finalize() | Asegura que el método de cierre del flujo de salida del archivo se llame cuando no haya más referencias a este flujo |
| FileChannel getChannel() | Devuelve el objeto FileChannel único asociado a este flujo de salida del archivo. |
| FileDescriptor getFD() | Devuelve el descriptor de fichero asociado con el flujo de salida. |
| void write(int b) | Escribe el byte especificado `a` en el flujo de salida del archivo. |
| void write(byte[] b) | Escribe todo el array de bytes en la corriente de salida |
| void write(byte[] b, int posinicial, int numbytes) | Escribe el array de bytes en el flujo de salida, pero empezando por la posición inicial y sólo la cantidad indicada por `numbytes`. |

### Ejemplo: Lectura secuencial byte a byte de un archivo de texto

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
                int datos;
                datos = fis.read();
                while (datos != -1) {
                    System.out.print((char) datos);
                    datos = fis.read();
                }
                fis.close();
            } catch (IOException e) {
                System.out.println("Error en lectura de datos");
            }
        } catch (FileNotFoundException e) {
            System.out.println("el fichero " + f.getName() + " no se encuentra");
        }
    }
}
```

### Ejemplo: Escritura de forma secuencial en un archivo

```java
package ejescriturasecuencialbytes;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class EjEscrituraSecuencialBytes {
    public static void main(String[] args) throws FileNotFoundException {
        int contLin = 0;
        String lineas[] = {"primera linea",
                "segunda linea",
                "tercera linea",
                "cuarta linea"};
        byte[] s;
        FileOutputStream f = new FileOutputStream("C:/FicherosJava/ejemplo1.txt");

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
            System.out.println("Problema grabación");
        }
        // Lectura del archivo
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
    }
}
```

![imagen_24_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_24_1.png)


Unidad 1: Gestión de ficheros

5. Las clases orientadas al filtrado del flujo de bytes

Estas clases proporcionan de manera transparente a estos flujos orientados a byte una funcionalidad de un nivel superior dado que las clases orientadas a flujo de bytes quedan algo limitadas para "trabajar" sobre los datos leidos o sobre los datos que vamos a escribir.

Los stream filtro son una abstracción de las secuencias de bytes para hacer procesos de datos a más alto nivel; con esta abstracción ya no tratamos los items como secuencias o «chorros» de bytes, sino de forma elaborada con más funcionalidad. Así, a nivel lógico, se pueden tratar los datos dentro de un buffer, escribir o leer datos de tipo int, long, double directamente y no mediante secuencias de bytes.

Los objetos stream filtro leen de un flujo que previamente ha tenido que ser escrito por otro objeto stream filtro de salida. Las clases más representativas de este tipo son FilterInputStream y FilterOutputStream:

![imagen_25_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_25_2.png)

![imagen_25_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_25_1.png)

Los filtros devuelven la información que a su vez han leído de su InputStream o la escriben en su OutputStream asociado, previa realización de algún tipo de transformación en la misma.

- De esta manera cada filtro añade una funcionalidad adicional al InputStream o OutputStream básico.
- Se pueden encadenar varios filtros para obtener varias funcionalidades combinadas

5.1 Acceso a datos primitivos: Clases DataInputStream y DataOutputStream

Aunque leer y escribir bytes es útil, a menudo es necesario transmitir datos de tipos primitivos dentro de un flujo. Las clases DataInputStream y DataOutputStream proporcionan métodos para la lectura y escritura de tipos primitivos (int, float, double, etc..) de un modo independiente de la máquina.

![imagen_25_4.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_25_4.png)

![imagen_25_3.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_25_3.png)

Constructor de DataOutputStream

Ejemplo:

DataOutputStream(OutputStream sal)

Se crea un objeto de la clase DataOutputStream vinculándolo a un objeto OutputStream para escribir en un archivo. Permite escribir un flujo de salida, datos de cualquier tipo primitivo (int, float, doublé, etc..)

FileOutputStream fileSal=new FileOutputStream("pedido.txt");
DataOutputStream Salida=new DataOutputStream(fileSal);

Constructor de DataInputStream

Ejemplo:

DataInputStream(InputStream in)

Se crea un objeto de la clase DataInputStream vinculándolo a un objeto InputStream para leer desde un archivo. Permite leer un flujo de entrada, datos de cualquier tipo primitivo. Solo es posible leer datos, escritos por DataOutputStream

FileInputStream fileEnt=new FileInputStream("pedido.txt");
DataInputStream entrada=new DataInputStream(fileEnt);

Unidad 1: Gestión de ficheros

A continuación se detallan los métodos de estas dos clases:

### Modificador y tipo de DataOutputStream

#### Métodos y descripción

*   `void flush() throws IOException`: Vacia el buffer se salida. Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
*   `int size()`: Devuelve el número de bytes escritos en esta corriente de datos de salida hasta el momento.
*   `void write(byte[] b, int off, int len) throws IOException`: Escribe len bytes en la corriente de salida desde el array b comenzando en la posición off.
*   `void write(int b) throws IOException`: Escribe el primer byte de menor peso a corriente de salida. Los otros 3 restantes bytes se ignoran.
*   `void writeBoolean(boolean v) throws IOException`: Escribe un char en el flujo de salida ocupando 1 byte.
*   `void writeByte(int v) throws IOException`: Escribe un byte en el flujo de salida ocupando 1byte.
*   `void writeBytes(String s) throws IOException`: Escribe una cadena en el flujo de salida como una secuencia de bytes.
*   `void writeChar(int v) throws IOException`: Escribe un char en el flujo de salida ocupando 2 bytes.
*   `void writeChars(String s) throws IOException`: Escribe una cadena en el flujo de salida como una secuencia de caracteres.
*   `void writeDouble(double v) throws IOException`: Escribe un valor numérico double en el flujo de salida ocupando 8bytes.
*   `void writeFloat(float v) throws IOException`: Escribe un valor numérico float en el flujo de salida ocupando 4bytes.
*   `void writeInt(int v) throws IOException`: Escribe un valor numérico entero en el flujo de salida ocupando 4bytes.
*   `void writeLong(long v) throws IOException`: Escribe un valor entero long en el flujo de salida ocupando 8bytes.
*   `void writeShort(int v) throws IOException`: Escribe un valor entero short en el flujo de salida ocupando 2bytes.
*   `void writeUTF(String str) throws IOException`: Escribe un cadena UNICODE utilizando codificación UTF-8. en el flujo de salida.

### Modificador y tipo de DataInputStream

#### Métodos y descripción

*   `int read(byte[] b) throws IOException`: Lee b.length bytes del flujo de entrada y los guarda en el array pasado como parámetro. Devuelve el número total de bytes leidos o -1 si no hay más datos debido a que se alcanza el final del flujo de entrada.
*   `int read(byte[] b, int off, int len) throws IOException`: Lee len bytes del flujo de entrada y los guarda en el array a partir del desplazamiento off pasado como parámetro. Devuelve el número total de bytes leidos o -1 si no hay más datos debido a que se alcanza el final del flujo de entrada.
*   `boolean readBoolean() throws IOException`: Lee un byte del flujo de entrada y devuelve verdadero si ese byte es distinto de cero, falso si ese byte es cero. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `byte readByte()`: Lee un byte del flujo de entrada. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `char readChar() throws IOException`: Lee dos bytes del flujo de entrada y devuelve un valor char. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `double readDouble() throws IOException`: Lee ocho bytes del flujo de entrada y devuelve un valor numérico double. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `float readFloat() throws IOException`: Lee cuatro bytes de entrada y devuelve un valor numérico float Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `void readFully(byte[] b) throws IOException`: Lee b.length bytes del flujo de entrada y los deposita en el array b. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `void readFully(byte[] b, int off, int len) throws IOException`: Lee b.length bytes del flujo de entrada y los deposita en el array b a partir del desplazamiento off. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes.
*   `int readInt() throws IOException`: Lee cuatro bytes de entrada y devuelve un valor numérico int. Lanza una EOFException, si el archivo llega al final antes de leer todos los bytes
*   `String readLine() throws IOException`: Deprecated. Este método no convierte correctamente los bytes a caracteres. A partir de JDK 1.1, la mejor forma de leer las líneas de texto se realiza mediante el método BufferedReader.readLine(). Los programas que utilizan la clase DataInputStream para leer las líneas se pueden sustituir el código de la forma: DataInputStream d = new DataInputStream(en); Por: BufferedReader d = new BufferedReader(new InputStreamReader(en))


Unidad 1: Gestión de ficheros
================================

### 5.1 Lectura de datos primitivos

#### Métodos de lectura

* `readLong()`: Lee ocho bytes de entrada y devuelve un valor numérico `long`.
* `readShort()`: Lee dos bytes de entrada y devuelve un valor numérico `short`.
* `readUnsignedByte()`: Lee un byte del flujo de entrada y devuelve un valor `int` en el rango de valores del 0 al 255.
* `readUnsignedShort()`: Lee dos bytes del flujo de entrada y devuelve un valor `int` en el rango de valores del 0 al 65535.
* `readUTF()`: Lee una cadena Unicode en formato UTF-8 del flujo de entrada.
* `skipBytes(int n)`: Hace un intento de saltarse `n` bytes de datos del flujo de entrada.

#### Ejemplo

```java
package ejficherosecuencialdatosprimitivos;

import java.io.*;

public class EjFicheroSecuencialDatosPrimitivos {
    public static void main(String[] args) throws FileNotFoundException, IOException {
        double[] precios = {1.35, 4.0, 8.90, 6.2, 8.73};
        int[] unidades = {5, 7, 12, 8, 30};
        String[] descripciones = {"paquetes de papel", "lápices", "bolígrafos", "carteras", "mesas"};

        DataOutputStream salida = new DataOutputStream(new FileOutputStream("C:/FicherosJava/pedido.dat"));
        for (int i = 0; i < precios.length; i++) {
            salida.writeBytes(descripciones[i]);
            salida.writeChar('\n');
            salida.writeInt(unidades[i]);
            salida.writeChar('\t');
            salida.writeDouble(precios[i]);
        }

        double precio;
        int unidad;
        char car;
        String descripcion;
        double total = 0.0;

        DataInputStream entrada = new DataInputStream(new FileInputStream("C:/FicherosJava/pedido.dat"));
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
            System.out.printf("%s %.2f %s\n", "por un TOTAL de ", total, " pts.");
        }
        entrada.close();
    }
}
```

### 5.2 Flujos orientados a byte con buffer

#### Clases BufferedInputStream y BufferedOutputStream

Estas clases asignan un buffer de memoria a los flujos de byte de I/O. Este buffer le permite a Java realizar operaciones de I/O sobre más de un byte a la misma vez, lo que incrementa y optimiza las prestaciones a la hora de trabajar con estos datos.

#### Constructores

* `BufferedInputStream(InputStream in)`: Crea un objeto `BufferedInputStream` con el tamaño de buffer por defecto.
* `BufferedInputStream(InputStream in, int size)`: Crea un objeto `BufferedInputStream` con el tamaño de buffer especificado en el argumento `size`.
* `BufferedOutputStream(OutputStream out)`: Crea un objeto `BufferedOutputStream` con el tamaño de buffer por defecto.
* `BufferedOutputStream(OutputStream out, int size)`: Crea un objeto `BufferedOutputStream` con el tamaño de buffer especificado en el argumento `size`.

#### Métodos

* `available()`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
* `close()`: Cierra la corriente de entrada y libera los recursos del sistema que esté usando.
* `mark(int readlimit)`: Marca la posición actual de la corriente de entrada.
* `markSupported()`: Prueba si esta corriente de entrada soporta los métodos `mark` y `reset`.
* `read()`: Lee el siguiente byte de la corriente de entrada.
* `read(byte[] b, int off, int len)`: Lee `b.length` bytes del flujo de entrada y los guarda en el array pasado como parámetro.
* `reset()`: Coloca la corriente de entrada en la posición que tenía la última vez que se invocó `mark`.
* `skip(long n)`: Salta y descarta los siguientes `n` bytes de la corriente de entrada.

#### Ejemplo

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
        } catch (IOException e) {
            System.out.println("Error al leer el fichero");
        }
    }
}
```



# Unidad 1: Gestión de ficheros

## 5.3 Combinación de clases sobre los flujos de entrada y salida

A continuación veremos un ejemplo que combinan las clases que tratan directamente sobre los flujos de entrada o de salida con las clases que las envuelven.

### Ejemplo: leer un archivo de números reales con buffer

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
            System.out.println("No se encontro el archivo");
        } catch (IOException e) {
            System.out.println("Error al escribir");
        } finally {
            if (salida != null) {
                salida.close();
            }
            if (buffer != null) {
                buffer.close();
            }
            if (fis != null) {
                fis.close();
            }
        }

        System.out.println("lectura del archivo binario de numeros reales con buffer");

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
                System.out.println("final del archivo");
            }
        } catch (FileNotFoundException e) {
            System.out.println("No se encontro el archivo");
        } catch (IOException e) {
            System.out.println("Error al leer");
        } finally {
            if (entrada != null) {
                entrada.close();
            }
            if (buffer2 != null) {
                buffer2.close();
            }
            if (fie != null) {
                fie.close();
            }
        }
    }
}
```

## 6. Escribir y leer datos en archivos secuenciales de texto

### 6.1 Clases FileReader y FileWriter

Existen dos clases que manejan caracteres en lugar de bytes en ficheros (lo que hace más cómodo su manejo), son FileWriter y FileReader. Estas clases:

* Convierten cada carácter de la codificación del sistema operativo nativo a código Unicode.
* La mayoría de las clases de flujos orientados a byte tienen su correspondiente clase de flujo orientado a carácter:
	+ FileReader: es el equivalente a FileInputStream. Es una clase abstracta que define el modelo de Java de entrada de caracteres.
	+ FileWriter es el equivalente a FileOutputStream. Es una clase abstracta que define el modelo de salida de caracteres.

### Constructor de FileReader

* FileReader(File file) throws IOException: Lee caracteres del fichero pasado como argumento como un objeto File.
* FileReader(FileDescriptor fd): Lee caracteres del fichero pasado como argumento el descriptor del fichero.
* FileReader(String fileName) throws IOException: Lee caracteres del fichero pasado como argumento como una cadena.


![imagen_30_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_30_1.png)

### Constructor de FileWriter

* FileWriter(File file) throws IOException: Escribe caracteres en el fichero pasado como argumento como un objeto File.
* FileWriter(File file, boolean append) throws IOException: Escribe caracteres en el fichero pasado como argumento como un objeto File. Si el argumento append es true, abre el fichero para añadir datos, en caso contrario, se grabaría desde el principio borrando el contenido si existe el fichero.
* FileWriter(FileDescriptor fd): Escribe caracteres en el fichero pasado como argumento el descriptor del fichero.
* FileWriter(String fileName) throws IOException: Escribe caracteres en el fichero pasado como argumento una cadena.
* FileWriter(String fileName, boolean append) throws IOException: Escribe caracteres en el fichero pasado como argumento una cadena. Si el argumento append es true, abre el fichero para añadir datos, en caso contrario, se grabaría desde el principio borrando el contenido si existe el fichero.



![imagen_30_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_30_2.png)


Unidad 1: Gestión de ficheros

- Los métodos de FileReader son los heredados de las clases Object, Reader e InputStreamReader: 
  ![imagen_31_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_31_1.png)
- Los métodos de FileWriter son los heredados de las clases Object, Writer y OutputStreamReader: 
  ![imagen_31_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_31_2.png)

6.2 
Codificación de caracteres 
En este apartado vamos a tratar los errores que tenemos habitualmente con la codificación de caracteres 
en aplicaciones en las que se ven implicados varios sistemas que intercambian o almacenan información. 
Codificación de caracteres. 
La codificación de caracteres es el método que permite convertir un caracter del lenguage natural, 
el de los humanos, en un símbolo de otro sistema de representación, aplicando una serie de 
normas o reglas de codificación.  
El ejemplo más gráfico suele ser el del código morse, cuyas reglas permiten convertir letras y números 
en señales (rayas y puntos) emitidas de forma intermitente. 
En informática, las normas de codificación permiten que dos sistemas intercambien información usando 
el mismo código numérico para cada caracter.  
Las normas más conocidas de codificación son las siguientes: 
- ASCII: basado en el alfabeto latino tal como se usa en inglés moderno y en otras lenguas occidentales. 
Utiliza 7 bits para representar los caracteres, aunque inicialmente empleaba un bit adicional (bit de 
paridad) que se usaba para detectar errores en la transmisión. Incluye, básicamente, letras mayúsculas y 
minúsculas del inglés, dígitos, signos de puntuación y caracteres de control, dejando fuera los caracteres 
específicos de los idiomas distintos del inglés, como por ejemplo, las vocales acentuadas o la letra ñ. 
- ISO-8859-1 (Latin-1): es una extensión del código ascii que utiliza 8 bits para proporcionar caracteres 
adicionales usados en idiomas distintos al inglés, como el español. Existen 15 variantes y cada una cubre 
las necesidades de un alfabeto diferente: latino, europa del este, hebreo cirílico,... la norma ISO-8859-15, 
es el Latin-1, con el caracter del euro. 
- cp1252 (codepage 1252): Windows usa sus propias variantes de los estándares ISO. La cp1252 es 
compatible con ISO-8859-1, menos en los 32 primeros caracteres de control, que han usado para incluir, 
por ejemplo, el caracter del euro. 
- UTF-8: es el formato de transformación Unicode, de 8 bits de longitud variable. Unicode es un 
estándar industrial cuyo objetivo es proporcionar el medio por el cual un texto en cualquier forma e 
idioma pueda ser codificado para el uso informático. Cubre la mayor parte de las escrituras usadas 
actualmente. 
En la enumeración hemos ido de menos a más, no solo en el tiempo, por el momento de aparición de la 
norma, sino también por los caracteres que soporta cada una, UTF-8 es la más ambiciosa. 
Visto así, la recomendación debería ser el uso de UTF-8 puesto que, escriba en la lengua que escriba, sus 
caracteres van a ser codificables. Pero, si sólo escribo en castellano, podría limitarme a usar ISO-8859-1, o 
ISO-8859-15 si necesito el caracter del euro, sin ningún problema. 

Unidad 1: Gestión de ficheros 

Importante: 
      La misma norma de codificación que se use para escribir se debe utilizar para la 
lectura. 
Esto tiene toda la lógica del mundo, puesto que si escribimos un fichero con ISO-8859-1 no debemos esperar 
que un sistema que lee en UTF-8 lo entienda sin más (aunque realmente entienda gran parte). 
¿Por qué aparecen caracteres "raros"?: 
Los caracteres "raros" aparecen por una conversión incorrecta entre dos codificaciones distintas. Se 
suelen producir porque se utiliza la codificación por defecto del sistema o programa y esta no coincide con la 
original o, directamente, por desconocimiento de la norma de codificación de la fuente de lectura. 
Así, por ejemplo, podemos encontrarnos con los siguientes caracteres "raros" escribiendo la misma 
palabra: 
- España → EspaÃ±a: si escribimos en UTF-8 y leemos en ISO-8859-1. La letra eñe se codifica en 
UTF-8 con dos bytes que en ISO-8859-1 representan la A mayúscula con tilde (Ã) y el símbolo más-
menos (±). 
- España → Espa೦a: si escribimos en ISO-8859-1 y leemos en UTF-8. La codificación de la eñe en 
ISO-8859-1 es inválida en UTF-8 y se sustituye por un caracter de sustitución, que puede ser una 
interrogación, un espacio en blanco... depende de la implementación. 
Ejemplo: Tenemos un fichero de texto creado con el bloc de notas de Windows con codificación ASCII 

![imagen_32_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_32_1.png)

Si intentamos leerlo con FileWiter, los acentos nos saldrán caracteres raros por que los métodos de esta 
clase leen caracteres Unicode. 
Ejemplo: 
```java
public class EJCaracterAcentuadas { 
    public static void main(String[] args) throws IOException { 
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
```

Salida: 

![imagen_32_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_32_2.png)

Para solucionarlo, podemos abrir el fichero para que se use, en este caso, la codificación ISO-8859-15


Unidad 1: Gestión de ficheros

Las clases InputStreamReader e OutputStreamReader:
- Representan una conexión entre un stream de bytes y un stream de caracteres.
- Podemos leer bytes convertirlos a caracteres atendiendo a una codificación concreta (ISO Latin 1, UTF8,...).

6.3
Las clases OutputStreamReader e InputStreamReader.
La librería de io de Java proporciona estas clases: InputStreamReader, que sirve de puente entre un InputStream y un Reader, y OutputStreamReader, que hace lo mismo entre un OutputStream y un Writer.

Constructor de InputStreamReader
- InputStreamReader(InputStream in)
  Crea un objeto InputStreamWriter que usa la codificación de caracteres por defecto
- InputStreamReader(InputStream in, Charset cs)
  Crea un objeto InputStreamWriter que usa la codificación pasada como argumento
- InputStreamReader(InputStream in, CharsetDecoder dec)
  Crea un objeto InputStreamWriter que usa la codificación pasada como argumento
- InputStreamReader(InputStream in, String charsetName)
  Crea un objeto InputStreamWriter que usa la codificación pasada como argumento

Constructor de OutputStreamReader
- OutputStreamWriter(OutputStream out)
  Crea un objeto OutputStreamWriter que usa la codificación de caracteres por defecto.
- OutputStreamWriter(OutputStream out, Charset cs)
  Crea un objeto  OutputStreamWriter que usa la codificación pasada como argumento
- OutputStreamWriter(OutputStream out, CharsetEncoder enc)
  Crea un objeto  OutputStreamWriter que usa la codificación pasada como argumento
- OutputStreamWriter(OutputStream out, String charsetName)
  Crea un objeto  OutputStreamWriter que usa la codificación pasada como argumento de cadena.

Métodos de InputStreamReader
- void close()
  Cierra el fichero y libera sus recursos asociados.
- String getEncoding()
  Devuelve el nombre de la codificación usada por el flujo.
- int read()
  Lee un caracter
- int read(char[] cbuf, int off, int len)
  Lee len caracteres de la corriente de entrada y los deposita en el vector de caracteres cbuf a partir de off
- boolean ready()
  Indica si el flujo de entrada está listo para ser leído

Métodos de OutputStreamReader
- void close()
  Cierra el flujo de salida y libera sus recursos asociados.
- void flush()
  Fuerza a que se escriba inmediatamente todo lo que pueda estar en el buffer de salida.
- String getEncoding()
  Devuelve el nombre de la codificación usada por el flujo.
- void write(char[] cbuf, int off, int len)
  Escribe len caracteres a partir del desplazamiento marcado por off.
- void write(int c)
  Escribe un caracter
- void write(String str, int off, int len)
  Escribe una porción de la cadena empezando en off y de longitud len.

Ejemplo de lectura de un fichero con codificación ASCII
```java
public static void main(String[] args) throws IOException {
    InputStreamReader ent;
    try {
        ent = new InputStreamReader(new FileInputStream("C:/FicherosJava/Copia.txt"), "ISO-8859-15");
        System.out.println(ent.getEncoding());
        int cad;
        while ((cad = ent.read()) != -1)
            System.out.println((char) cad);
    } catch (FileNotFoundException e) {
        System.out.println("error al abrir el fichero");
    } catch (IOException e) {
        System.out.printf("error de entrada/salida");
    } finally {
        if (ent != null)
            ent.close();
    }
}
```

Unidad 1: Gestión de ficheros

6.4
Buffer
para
el
flujo
de
caracteres:
Clases
BufferedReader y BufferedWriter
A la hora de optimizar los flujos de caracteres, existen las clases BufferedReader y BufferedWriter que crean un buffer para agilizar las operaciones de lectura y escritura en flujos de caracteres.
Son análogas a las de flujo de bytes: BufferedInputStream y BufferedOutputStream.
- La clase BufferedReader recibe un flujo de caracteres e implementa un buffer para poder leer líneas de texto.
- Define el método readLine para leer una línea de texto.
- Esta clase se utiliza si sabemos que el archivo es de texto y está escrito en líneas separadas por retornos de carro.

Constructor de BufferedReader
- BufferedReader(Reader in)
  Crea un buffer para el flujo de caracteres de entrada utilizando el tamaño por defecto.
- BufferedReader(Reader in, int sz)
  Crea un buffer para el flujo de caracteres de entrada utilizando el tamaño indicado en el parámetro sz. Lanza un IllegalArgumentException si sz es <= 0

Para el manejo de archivos hay dos formas para construir un objeto de tipo BufferedReader:
- Una es utilizar un objeto InputStreamReader creado sobre un objeto de tipo FileInputStream:
```java
BufferedReader buffer = new BufferedReader(new InputStreamReader(new FileInputStream("archivo.dat")));
```
- La otra forma es aceptar el tamaño del buffer y la codificación predefinidos, lo cuál muchas veces es lo más conveniente, y para estos casos se puede usar la clase FileReader que como argumento en el constructor se le pasa el nombre del archivo.
```java
BufferedReader fd_in = new BufferedReader(new FileReader("archivo.dat"));
```
- La clase BufferedWriter escribe texto a un flujo de salida que acepte caracteres proporcionando un buffer para la escritura eficiente de caracteres, arreglos y strings.
- Define el método write para escribir una línea de texto y el método newLine para escribir un salto de línea de acuerdo al sistema operativo.
- Esta clase se utiliza si sabemos que el archivo es de texto y está escrito en líneas separadas por retornos de carro.


Unidad 1: Gestión de ficheros

### Constructor de BufferedWriter

* `BufferedWriter(Writer out)`: Crea un buffer para el flujo de caracteres de salida utilizando el tamaño por defecto.
* `BufferedWriter(Writer out, int sz)`: Crea un buffer para el flujo de caracteres de salida utilizando el tamaño indicado en el parámetro `sz`. Lanza una `IllegalArgumentException` si `sz` es <= 0

### Manejo de archivos

* Puedes utilizar un objeto `OutputStreamReader` creado sobre un objeto de tipo `FileOutputStream`:
```java
BufferedWriter fd_out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("archivo.dat")));
```
* La ventaja de hacerlo así es que se puede manejar el tamaño del buffer e incluso cambiar la codificación de los caracteres.
* Otra forma es aceptar el tamaño del buffer y la codificación predefinidos, lo que muchas veces es lo más conveniente, y para estos casos se puede usar la clase `FileWriter`:
```java
BufferedWriter fd_out = new BufferedWriter(new FileWriter("archivo.dat"));
```
### Ejemplo de copiar un fichero de Texto ASCII en otro fichero utilizando buffers

```java
public class EjficheroTextoBuffer {
    public static void main(String[] args) throws IOException {
        InputStreamReader entrada = null;
        OutputStreamWriter salida = null;
        BufferedReader bufferent = null;
        BufferedWriter buffersal = null;
        try {
            salida = new OutputStreamWriter(new FileOutputStream("C:/FicherosJava/Destino.txt"), "ISO-8859-15");
            buffersal = new BufferedWriter(salida);
            String cad;
            entrada = new InputStreamReader(new FileInputStream("C:/FicherosJava/Copia.txt"), "ISO-8859-15");
            bufferent = new BufferedReader(entrada);
            while ((cad = bufferent.readLine()) != null) {
                System.out.println(cad);
                salida.write(cad);
            }
        } catch (FileNotFoundException e) {
            System.out.println("error al abrir el fichero");
        } catch (IOException e) {
            System.out.printf("error de entrada/salida");
        } finally {
            if (entrada != null) entrada.close();
            if (salida != null) salida.close();
            if (buffersal != null) buffersal.close();
            if (bufferent != null) bufferent.close();
        }
    }
}
```
### Escritura formateada

La clase `PrintWriter` te permite escribir en un fichero de texto utilizando flujos de caracteres. Su análogo en flujo de bytes es `PrintStream` y uso es muy parecido.

### Constructor de PrintWriter

* `PrintWriter(File file)`: Crea un flujo de carcteres en el fichero especificado `File`.
* `PrintWriter(OutputStream out)`: Crea un flujo de carcteres en el fichero desde un `OutputStream` existente.
* `PrintWriter(OutputStream out, boolean autoFlush)`: Crea un flujo de carcteres en el fichero desde un `OutputStream` existente con vaciado de buffer.
* `PrintWriter(String fileName)`: Crea un flujo de carcteres en el fichero especificado en el argumento `String`.
* `PrintWriter(Writer out)`: Crea un flujo de carcteres en el fichero desde un `Writer` existente.
* `PrintWriter(Writer out, boolean autoFlush)`: Crea un flujo de carcteres en el fichero desde un `Writer` existente.

### Ejemplo de uso de PrintWriter

```java
import java.io.FileNotFoundException;
import java.io.PrintWriter;

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
            if (pw != null) pw.close();
        }
    }
}
```
### La clase StreamTokenizer

La clase `StreamTokenizer` te sirve para leer de un archivo o un flujo de entrada y convertir ese flujo en tokens tomando en cuenta caracteres válidos tales como: espacios, comas, punto, punto y coma, etc...

### Constructor de StreamTokenizer

* `StreamTokenizer(InputStream in)`: Crea un flujo de carcteres en el fichero desde un `InputStream` existente.

## Ejemplo de uso de StreamTokenizer



### Atributos de StreamTokenizer

* `double`: nval
	+ Si el token actual es un número, esta variable contiene ese número.
* `String`: sval
	+ Si el token actual es una palabra, esta variable contiene esa palabra.
* `static int`: TT_EOF
	+ Esta constante indica que el final del flujo de datos se ha leído.
* `static int`: TT_EOL
	+ Esta constante indica que el final de línea se ha leído.
* `static int`: TT_NUMBER
	+ Esta constante indica que el token que se ha leído es un número.
* `static int`: TT_WORD
	+ Esta constante indica que el token que se ha leído es una cadena.
* `int`: ttype
	+ Después de una llamada al método nextToken, este campo contiene el tipo del token que se acaba de leer.

### Constructor de StreamTokenizer

* `StreamTokenizer(InputStream is)`
	+ Deprecated. Desde JDK versión 1.1, la manera preferente para extraer tokens de un stream de bytes es convertirlo a un stream de caracteres, por ejemplo:
		- `Reader r = new BufferedReader(new InputStreamReader(is));`
		- `StreamTokenizer st = new StreamTokenizer(r);`
* `StreamTokenizer(Reader r)`
	+ Crea un objeto StreamTokenizer a partir de un flujo de caracteres.

### Leer tokens

* Para leer los tokens se utiliza el método nextToken().
* Ejemplo:
	+ `public class EjStreamTokenizer {`
	+ `public static void main(String[] args) throws IOException {`
	+ `FileReader r=new FileReader("C:/FicherosJava/Ejemplo.txt");`
	+ `StreamTokenizer tokens= new StreamTokenizer(r);`
	+ `while (tokens.nextToken() != StreamTokenizer.TT_EOF) {`
	+ `if (tokens.ttype == StreamTokenizer.TT_WORD)`
	+ `System.out.println(tokens.sval);`
	+ `else if (tokens.ttype == StreamTokenizer.TT_NUMBER)`
	+ `System.out.println((int) tokens.nval);`
	+ `}`

### Serialización

* La serialización de un objeto consiste en obtener una secuencia de bytes que represente el estado de dicho objeto.
* Esta secuencia puede utilizarse de varias maneras (puede enviarse a través de la red, guardarse en un fichero para su uso posterior, utilizarse para recomponer el objeto original, etc.).

### Interfaz Serializable

* Un objeto serializable es un objeto que se puede convertir en una secuencia de bytes para poder ser tratado por un stream.
* Para que un objeto sea serializable, debe implementar la interfaz java.io.Serializable.
* `import java.io.Serializable;`
* `public class Datos implements Serializable`
* `{`
* `private int a;`
* `private String b;`
* `private char c;`
* `}`

### Excluir campos al serializar objetos

* Algunas veces es necesario excluir campos a la hora de serializar objetos, por ejemplo cuando se tiene un objeto que guarda la información de un usuario incluida su contraseña.
* Para evitar que esos campos sean serializados basta con utilizar el modificador transient.
* `private String nombre;`
* `private transient String contrasenia; //Este campo no será guardado`

### Flujos para la entrada y salida de objetos

* `ObjectInputStream` y `ObjectOutputStream`
* La serialización está orientada a bytes, por lo tanto, se utilizan clases que están en la jerarquía de inputStream y OutputStream.
* Estas clases implementan las interfaces `ObjectInput` y `ObjectOutput`, que son subinterfaces de `DataInput` y `DataOutput`.
* Esto significa que todos los métodos de E/S para escribir o leer datos en flujos de datos, también se aplican a los flujos para objetos.
* Por lo tanto, un flujo de objeto puede contener una mezcla de valores primitivos y objetos.


Unidad 1: Gestión de ficheros

![imagen_39_2.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_39_2.png)

![imagen_39_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_39_1.png)

- Para serializar un objeto: es necesario crear algún objeto de tipo OutputStream que se le pasa al constructor de ObjectOutputStream. A continuación se puede llamar algún método, por ejemplo, writeObject(), para serializar el objeto.
  Constructor
  Descripción
  protected
  ObjectOutputStream(OutputStream out) throws IOException
  Crea un ObjectOutputStream que escribe en el OutputStream especificado.
  Ejemplo: Para escribir un objeto en un fichero:
    FileOutputStream fs=new FileOutputStream(fichero);
    ObjectOutputStream os = new ObjectOutputStream(fs);

  O de forma abreviada:
    ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream(fichero));

- Para recuperar un objeto: es necesario crear algún objeto de tipo InputStream que se le pasa al constructor de ObjectInputStream. A continuación se puede llamar algún método, por ejemplo, readObject(), para leer el objeto.
  Constructor
  Descripción
  protected
  ObjectInputStream(InputStream en) throws IOException
  Recupera datos primitivos y objetos previamente almacenados con ObjectOutputStream

  FileInputStream fe=new FileInputStream(fichero);
  ObjectInputStream oe = new ObjectInputStream(fe);

  O de forma abreviada:
    ObjectInputStream oe = new ObjectInputStream(new FileInputStream(fichero));

  Hay que tener claro el orden y el tipo de los objetos almacenados en el disco para recuperarlos en el mismo orden.

9.4
Escritura de objetos en ficheros
La clase ObjectOutputStream permite crear objetos que se asocian a un objeto FileOutputStream y facilita métodos para escribir o almacenar secuencialmente información codificada en binario en el fichero asociado a dicho objeto:
Algunos métodos son:

  Modifier and Type
  Method and Description
  void
  close()
  Cierra el flujo de salida.
  void
  defaultWriteObject()
  Escribe los campos no estáticos y no transient de la clase actual en el flujo de salisa.
  protected void
  drain()
  Vacia todos los datos almacenados en el buffer de ObjectOutputStream.
  protected boolean
  enableReplaceObject(boolean enable)
  Activa el flujo de salida para la sustitución de objetos en el flujo.
  void
  flush()
  Vacía el flujo de salida
  protected Object
  replaceObject(Object obj)
  Este método permitirá a las subclases de ObjectOutputStream sustituir un objeto por otro durante la serialización.
  void
  reset()
  Reset will disregard the state of any objects already written to the stream.
  void
  write(byte[] buf)
  Escribe un array de bytes en el flujo de sallida
  void
  write(byte[] buf, int off, int len)
  Escribe un array de bytes en el flujo de sallida a partir del desplazamiento off
  void
  write(int val)
  Escribe un byte.
  void
  writeBoolean(boolean val)
  Escribe boolean.
  void
  writeByte(int val)
  Escribe  1 byte.
  void
  writeBytes(String str)
  Escribe un String como secuencia de bytes
  void
  writeChar(int val)
  Escribe un char con 16 bit.
  void
  writeChars(String str)
  Escribe un String como secuencia de caracteres
  protected void
  writeClassDescriptor(ObjectStreamClass desc)
  Escribe el descriptor de la clase especificada en el ObjectOutputStream
  void
  writeDouble(double val)
  Writes un  double (64 bit)
  void
  writeFields()
  Escribe los campos del buffer en el flujo de salida.
  void
  writeFloat(float val)
  Escribe un float (32 bit).
  void
  writeInt(int val)
  Escribe un  int (32 bit).
  void
  writeLong(long val)
  Escribe un  long (64 bit).
  void
  writeObject(Object obj)
  Escribe el objeto especificado en el  ObjectOutputStream.
  protected void
  writeObjectOverride(Object obj)
  Metodo usuado por las subclases para sobreescribir el método defaultwriteObject.
  void
  writeShort(int val)
  Escribe un short (16 bit).
  void
  writeUTF(String str)
  Escribe un string con el format  UTF-8

Ejemplo: Escritura de objetos punto en un fichero.

package ejserializacionobjetosfichero;
import java.io.*;
class punto implements Serializable
{   int x,y;
punto(int x,int y){
    this.x=x;     this.y=y;    }
public int getX(){
    return x;}
public int getY(){
    return y;}
}//fin clase punto

public class EjSerializacionObjetosFichero {
    public static void main(String[] args)
        throws IOException, ClassNotFoundException {
     ObjectOutputStream salida=
 new ObjectOutputStream (new FileOutputStream("C:/FicherosJava/ejobjetos.dat"));

   salida.writeObject(new punto(5,8));
   salida.writeObject(new punto(1,9));
   salida.writeObject(new punto(3,7));
   salida.close();
   System.out.println("fin de la grabación de objetos”);
        }


Unidad 1: Gestión de ficheros

### 9.5 Lectura de objetos en ficheros

La clase `ObjectInputStream` permite crear objetos que se asocian a un objeto `FileInputStream` y facilita métodos para leer de él secuencialmente información codificada en binario:

#### Métodos

*   `available()`: Devuelve el número de bytes que se pueden leer o saltar sin bloquear la corriente.
*   `close()`: Cierra el flujo de entrada.
*   `defaultReadObject()`: Lee los campos no estáticos y no transient de la clase actual en el flujo de entrada.
*   `enableResolveObject(boolean enable)`: Activa el flujo de entrada para que los objetos leídos puedan ser sustituidos.
*   `read()`: Lee un byte de datos.
*   `read(byte[] buf, int off, int len)`: Lee en un array de bytes.
*   `readBoolean()`: Lee un boolean.
*   `readByte()`: Lee un byte (8 bits).
*   `readChar()`: Lee un carácter con 16 bits.
*   `readClassDescriptor()`: Lee el descriptor desde el flujo de serialización.
*   `readDouble()`: Lee un double (64 bit).
*   `readFloat()`: Lee un float (32 bit).
*   `readFully(byte[] buf)`: Lee `buf.length` bytes y los deposita en el array `buf`.
*   `readFully(byte[] buf, int off, int len)`: Lee `buf.length` bytes y los deposita en el array `buf` a partir del desplazamiento `off`.
*   `readInt()`: Lee un int (32 bit).
*   `readLine()`: Lee una línea de texto (depreciado).
*   `readLong()`: Lee un long (64 bit).
*   `readObject()`: Lee un objeto desde el flujo `ObjectInputStream`.
*   `readShort()`: Lee un short (16 bit).
*   `readUnsignedByte()`: Lee un byte sin signo (8 bit).
*   `readUnsignedShort()`: Lee un short sin signo (16 bit).
*   `readUTF()`: Lee un String en formato UTF-8.
*   `skipBytes(int len)`: Salta `len` bytes.

### Ejemplo: Lectura de los objetos punto escrito en el anterior fichero

```java
ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("C:/FicherosJava/ejobjetos.dat"));
try {
    while (true) {
        Punto puntoentrada = (Punto) entrada.readObject();
        System.out.println("(x=" + puntoentrada.getX() + ", y=" + puntoentrada.getY() + ")");
    }
} catch (IOException e) {
    System.out.println("Llegado al final");
}
entrada.close();
```

### 9.6 Serialización de objetos compuestos

Si dentro de la clase hay atributos que son otras clases, éstas clases a su vez también deben ser Serializable.

#### Ejemplo: La clase Rectangulo tiene un atributo de tipo Punto

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
        System.out.println("Leyendo el fichero");
        ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("C:/FicherosJava/ejobjetos2.dat"));
        try {
            while (true) {
                Rectangulo Rectentrada = (Rectangulo) entrada.readObject();
                System.out.println("(x=" + Rectentrada.getX() + ", y=" + Rectentrada.getY() + "), alto=" + Rectentrada.getAlto() + " Ancho=" + Rectentrada.getAncho());
            }
        } catch (IOException e) {
            System.out.println("Llegado al final");
        }
        entrada.close();
    }
}
```

![imagen_42_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_42_1.png)


Unidad 1: Gestión de ficheros

![imagen_43_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_43_1.png)

10. Ficheros de acceso directo

A menudo, no se desea leer un fichero de principio a fin; sino acceder al fichero como una base de datos, donde se salta de un registro a otro; cada uno en diferentes partes del fichero.

El paquete java.io contiene una clase muy útil para el tratamiento de ficheros de acceso directo, su nombre es RamdomAcessFile e implementa los interfaces DataInput y DataOutput, por lo que contiene métodos de lectura y escritura sobre este tipo de ficheros.

La clase RandomAccessFile proporciona todos los métodos necesarios para leer y escribir en archivos de manera no necesariamente secuencial, es decir, en forma aleatoria.

- Éstos son los constructores de RandomAccessFile:
  - Constructores:
    - RandomAccessFile(File fichero, String modo) throws FileNotFoundException
      Abre el fichero de acceso aleatorio especificado en el argumento File para lectura, y opcionalmente, para escritura según se especifique en el argumento modo.
    - RandomAccessFile(String nombre, String modo) throws FileNotFoundException
      Abre el fichero de acceso aleatorio especificado en el argumento nombre para lecturas, y opcionalmente, para escritura según se especifique en el argumento modo.

Modos de acceso:
- "r": Abre el fichero para sólo lectura. La invocación de cualquiera de los métodos de escritura del objeto resultante causará una excepción IOException al ser lanzada.
- "rw": Abre el fichero para lectura y escritura. Si el fichero no existe, entonces se intentará crearlo.

Excepciones que se puede lanzar:
- IllegalArgumentException - si el argumento mode no es igual a la de "r", "rw”.
- FileNotFoundException - si el modo de acceso es "r", y el fichero no existe, o si el modo de acceso es "rw", y el fichero no existe, se intenta crear uno nuevo y se produce un error al crearlo, o si existe y no se puede abrir.

Métodos de RandomAccessFile:

Modificador y tipo | Métodos y descripción
-------------------|-------------------------
void | close()throws IOException
FileChannel | getChannel()throws IOException
FileDescriptor | getFD()throws IOException
long | getFilePointer()throws IOException
long | length()throws IOException
int | read()throws IOException
int | read(byte[] b) throws IOException
int | read(byte[] b, int off, int len) throws IOException
boolean | readBoolean()throws IOException
byte | readByte()throws IOException
char | readChar()throws IOException
double | readDouble()throws IOException
float | readFloat()throws IOException
void | readFully(byte[] b) throws IOException
void | readFully(byte[] b, int off, int len)
int | readInt()throws IOException
String | readLine()throws IOException
long | readLong()throws IOException
short | readShort()throws IOException
int | readUnsignedByte()throws IOException
int | readUnsignedShort()throws IOException
String | readUTF()throws IOException
void | seek(long pos) throws IOException
void | setLength(long newLength) throws IOException
int | skipBytes(int n) throws IOException
void | write(byte[] b) throws IOException
void | write(byte[] b, int off, int len)
void | write(int b) throws IOException
void | writeBoolean(boolean v) throws IOException
void | writeByte(int v) throws IOException
void | writeBytes(String s) throws IOException
void | writeChar(int v) throws IOException
void | writeChars(String s) throws IOException
void | writeDouble(double v) throws IOException
void | writeFloat(float v) throws IOException
void | writeInt(int v) throws IOException
void | writeLong(long v) throws IOException
void | writeShort(int v) throws IOException


Unidad 1: Gestión de ficheros

### writeUTF(String str) throws IOException

Escribe una cadena UNICODE utilizando codificación UTF-8.

### Ejemplo

```java
package ejficheroaccesoaleatorio;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * @author María José Galán
 */
public class EjFicheroAccesoAleatorio {
    public static void main(String[] args) throws IOException {
        RandomAccessFile f = null;
        try {
            // Si el fichero no existe, se crea
            f = new RandomAccessFile("C:/FicherosJava/ejemplo1.txt", "rw");
            // Situarse al final del archivo
            f.seek(f.length());
            String s = "esto se va a añadir al final del archivo\n";
            f.writeBytes(s);
            // Situar el puntero de L/E al principio del archivo.
            f.seek(0L);
            String cad = f.readLine();
            while (cad != null) {
                System.out.println(cad);
                cad = f.readLine();
            }
        } catch (FileNotFoundException e) {
            System.out.println("Error al abrir el archivo");
        } finally {
            if (f != null) {
                f.close();
            }
        }
    }
}
```
### Salida

![imagen_45_1.png](resources/Acceso%20a%20datos/UNIDAD1A-Gestión%20de%20ficheros%202020-2021/images/imagen_45_1.png)


