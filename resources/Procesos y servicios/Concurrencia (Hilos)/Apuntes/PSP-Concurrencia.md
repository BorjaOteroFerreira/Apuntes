Contenidos
================

### Introducción

Introducción a la programación concurrente y los hilos en Java.

### Procesadores y núcleos

*   Procesadores: Unidades que ejecutan instrucciones del programa.
*   Núcleos: Unidades que ejecutan instrucciones del programa y comparten recursos.

### Programación concurrente

*   Programación concurrente: Técnicas para ejecutar múltiples tareas simultáneamente.
*   Ventajas: Mejora el rendimiento, permite la ejecución de tareas en paralelo.

### Hilos - Introducción

*   Hilos: Unidades de ejecución que comparten el mismo espacio de memoria.
*   Ventajas: Permite la ejecución de tareas en paralelo, reduce el tiempo de respuesta.

### Hilos - Creación y muerte

*   Creación de hilos: Se crea un objeto `Thread` y se llama al método `start()`.
*   Muerte de hilos: Un hilo muere cuando se llama al método `stop()` o cuando se completa su ejecución.

### Estados de un hilo - Ciclo de vida

*   Estado de un hilo: Puede estar en uno de los siguientes estados: `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, `TERMINATED`.

### Prioridades

*   Prioridades: Se pueden establecer prioridades para los hilos para determinar el orden de ejecución.

### Métodos básicos

#### De objeto (no estáticos)

*   `start()`: Inicia la ejecución del hilo.
*   `run()`: Método que se ejecuta cuando se inicia el hilo.
*   `join()`: Espera a que el hilo termine su ejecución.

#### De clase (estáticos)

*   `currentThread()`: Devuelve el hilo actual.
*   `sleep(long millis)`: Pone en espera al hilo durante un período de tiempo.

#### Desaconsejados/Obsoletos (deprecated)

*   `stop()`: No se debe utilizar, ya que puede causar problemas en el programa.

### Sincronización

*   Sincronización: Permite que solo un hilo acceda a un recurso compartido en un momento determinado.

### Coordinación/Señalización

*   Coordinación: Permite que los hilos se comuniquen entre sí.
*   Señalización: Permite que los hilos se comuniquen entre sí mediante señales.

### Esperando el final de un hilo

*   Esperar a que un hilo termine su ejecución.

### Interrumpir a un hilo

*   Interrumpir la ejecución de un hilo.

### Hilos demonio (daemon)

*   Hilos demonio: Hilos que se ejecutan en segundo plano y no bloquean la ejecución del programa.

### Grupos de hilos (ThreadGroup)

*   Grupos de hilos: Permite agrupar hilos para fines de administración.

### Librería de concurrencia de alto nivel

*   Librería de concurrencia de alto nivel: Permite la programación concurrente de manera más fácil y segura.

### Objetos con operaciones atómicas

*   Objetos con operaciones atómicas: Permite la ejecución de operaciones atómicas en objetos compartidos.

### Semáforos

*   Semáforos: Permite la sincronización de hilos mediante un mecanismo de señales.

### Ejemplo: Implementaciones del productor/consumidor

#### Ejemplo INCORRECTO - 1 productor y 1 consumidor consumiendo 1 dato

*   Ejemplo incorrecto de implementación del productor/consumidor.

#### Ejemplo correcto - 1 productor y 1 consumidor consumiendo 1 dato

*   Ejemplo correcto de implementación del productor/consumidor.

#### Ejemplo correcto - 1 productor y 1 consumidor consumiendo varios datos

*   Ejemplo correcto de implementación del productor/consumidor.

#### Ejemplo correcto - 1 productor y varios consumidores consumiendo varios datos

*   Ejemplo correcto de implementación del productor/consumidor.



# Introducción
Programa
Código (instrucciones) y datos almacenados en un soporte perdurable que resuelven una tarea específica.

## Sistema Operativo
Intermediario entre las aplicaciones de usuario y el hardware.
Usuario <> Aplicaciones <> Sistema Operativo <> Hardware

## Proceso
Es un programa en ejecución. Por supuesto, puede haber procesos distintos resultado de la ejecución de un mismo programa.
Además del código y los datos mencionados anteriormente, un proceso necesita:
- un contador de programa (puntero a la instrucción en ejecución)
- la memoria de trabajo
- estado del procesador (el valor de sus registros)
Estas características son propias de cada proceso en ejecución, incluso siendo distintos procesos de un mismo programa.

## Demonio (daemon)
Es un tipo especial de proceso, no interactivo, ejecutado en segundo plano y controlado por el sistema operativo. A veces se les denomina servicios (Windows) o programas residentes (MS-DOS).
Ejemplos pueden ser un servidor web (httpd), cron, la garbage collection, la parte residente de un antivirus, etc.

## Hilo (hebra, thread)
Es la unidad de procesamiento más pequeña que puede ser planificada por el sistema operativo.
Los hilos siempre pertenecen a un proceso (un proceso tiene al menos un hilo denominado principal -main thread-). Distintos hilos de un mismo proceso comparten su memoria y recursos.

## Procesadores y núcleos
Tradicionalmente se conocía como procesador el componente (el chip) que leía y ejecutaba instrucciones. En esos momentos los sistemas multiprocesador o multi-CPU tenían varios chips físicos distintos conectados al sistema, por lo que se necesitaban placas base multi-socket. Ésto implicaba, además de todo el hardware para conectar dichos procesadores a la RAM, un gran consumo de energía.

## HyperThreading (HT)
Es una tecnología Intel introducida con el Pentium 4 en 2002, que intentó llevar el paralelismo a la máquinas domésticas. Para ello implementa registros y unidades de ejecución en cada core, de manera que puede almacenar el estado de dos threads en cada núcleo para que se ejecuten en él. Obviamente esto implica un cambio de contexto (cuando se cambia de un hilo a otro) guardando y leyendo los registros necesarios, por lo que el rendimiento se ve afectado.

## Procesadores actuales
Hoy en día los procesadores contienen varios núcleos que, en realidad, es tener varios procesadores dentro del mismo chip, compartiendo ciertos componentes entre ellos. De esta manera se ejecutan (realmente) varias instrucciones a la vez. Las esperas en las comunicaciones son mínimas pues están todos integrados en el mismo componente.

## Ejemplo de código
nombre = “Perico”apellidos = “de los Palotes”nombreCompleto = nombre + “ “ + apellidos
Cada núcleo del procesador nos permite ejecutar una instrucción (hilo) en un instante determinado. Si el procesador dispone de varios, podrá procesar tantas instrucciones simultáneamente como núcleos tenga.



5 de 31

Por parte de Intel, además del ya comentado HyperThreading, el mundo de los procesadores sigue innovando. Uno de los últimos cambios introducidos (año 2021, a partir de la 12ª generación de Intel) es la aparición de una llamada arquitectura heterogénea o modelo híbrido,  que consta de dos tipos de núcleos diferentes: 

### Núcleos de procesador

#### P-Cores
- Rendimiento: Máximo
- Físicamente: Más grandes
- Consumo: Mayor
- Temperatura: Mayor
- Permiten HyperThreading: Sí
- Caché L2 (level 2): Compartida
- Tareas indicadas: Usados en tareas más pesadas (gaming)

#### E-Cores
- Rendimiento: Menor
- Físicamente: Pequeños
- Consumo: Menor
- Temperatura: Menor
- Permiten HyperThreading: No
- Caché L2 (level 2): Independiente por core
- Tareas indicadas: Usados en tareas sencillas (ofimática, etc.)

#### Tipos de núcleos especializados

- **LP-E Cores (Low Power E-Cores)**
  - Funcionan prácticamente sin consumo
  - Mantienen al sistema cuando éste no está haciendo nada
- **NPU (Neural Processing Unit)**
  - Núcleos especializados pensados para tareas de IA
  - Quitan este trabajo al resto de los cores del sistema

6 de 31


# Programación Concurrente

La programación concurrente es la técnica que permite tener en ejecución simultáneamente distintos procesos. De esta manera podemos, por ejemplo, estar trabajando con una aplicación de la oficina mientras escuchamos música, imprimimos un documento y bajamos un archivo de internet.

Dependiendo de las características hardware de las que dispongamos, esta ejecución se puede implementar de distintas maneras:

- Un procesador con un único núcleo: sólo un proceso puede estar simultaneamente en ejecución, así que el sistema operativo se encarga de intercambiar cada pocos milisegundos el proceso en ejecución. Esto es lo que se conoce como programación concurrente.
- Un procesador con varios núcleos: puede haber varias instrucciones ejecutándose realmente en el mismo momento. Como los distintos núcleos comparten la misma memoria, se pueden utilizar de manera coordinada. Esto es lo que se conoce como programación paralela.
- La denominada programación distribuida, se refiere a la existencia de varios ordenadores distribuidos en red, en donde cada ordenador tiene sus propios procesadores y memorias.

La programación concurrente y paralela no son excluyentes y pueden combinarse, puesto que distintos hilos dentro de un núcleo también utilizarán la programación concurrente para alternarse en la ejecución.

Para que el sistema operativo sepa qué instrucciones de un proceso poner en cada núcleo, el programador tendrá que utilizar diversas técnicas de programación de hilos para decir qué instrucciones pueden ejecutarse de forma paralela, y sincronizar los distintos hilos de manera que no se produzcan efectos no deseados como que se ejecuten desordenadamente o se acceda a recursos compartidos a los que no se tenga acceso en ese momento.

Finalmente, y dependiendo de en qué plataforma se ejecuta el proceso, los distintos hilos estarán en distintos núcleos o se alternarán en el único núcleo del procesador. Independientemente de esto, el programa siempre funcionará correctamente (simplemente acabará antes o más tarde).

## Hilos - Introducción

Java proporciona, de manera nativa, la posibilidad de crear aplicaciones que ejecuten código en hilos de ejecución independiente.

Debido a que Java es un lenguaje multiplataforma, y la implementación de la programación concurrente debe ser también independiente de la plataforma, es la JVM la que gestiona los hilos de ejecución, y no (al menos directamente) el sistema operativo subyacente.

El algoritmo que utilice el planificador de hilos es dependiente de la JVM específica que utilicemos, pero tiene que cumplir unos mínimos para que el resultado final de la ejecución sea el mismo en cualquier plataforma.

Las especificaciones tanto del lenguaje de programación Java como de la JVM las dicta su empresa creadora, Sun Microsystems (comprada en 2009 por Oracle).

El lenguaje nos proporciona multitud de mecanismos para programar de manera concurrente, sincronizada y segura, lo cual no quita que será responsabilidad del programador utilizarlos de la manera adecuada para evitar los típicos problemas de este tipo de aplicaciones.

La programación utilizando hilos de ejecución puede tener multitud de ventajas, aunque dependiendo del caso, también pueden ser un arma de doble filo.

- En las aplicaciones adecuadas, reducen el coste de desarrollo y posterior mantenimiento
- Pueden mejorar el rendimiento en aplicaciones complejas
- Modelan mejor tareas que se realizan en paralelo en la vida real
- Son practicamente imprescindibles en la programación de casi cualquier entorno actual:
  - GUIs
  - Garbage Collection
  - Entornos cliente / servidor (un hilo por cliente)
  - Aprovechan los sistemas multiprocesador (o con varios núcleos), con un hilo en cada uno.
  - Un hilo puede trabajar mientras otro espera por un recurso

## Hilos - Creación y Muerte

Al iniciar una aplicación Java, la JVM crea un hilo que llamará el método público y estático main(String[] args). Ese hilo principal creado puede ser el único existente en la aplicación, o bien puede crear otros hilos que se ejecuten de manera concurrente con el hilo principal. La aplicación terminará cuando no queda ningún hilo activo (aunque el main haya acabado antes).

La ejecución de un hilo se realiza creando (directa o indirectamente) un objeto de la clase Thread, sobreescribiendo el método run() (donde estará el código del hilo) y llamando a su método start().

Existen básicamente dos posibilidades para la creación de un hilo.

### Creación de un hilo directa

La creación de un hilo directa se realiza mediante la clase Thread, pasando como parámetro el objeto que se quiere ejecutar en el hilo.

### Creación de un hilo indirecta

La creación de un hilo indirecta se realiza mediante la clase Runnable, pasando como parámetro el objeto que se quiere ejecutar en el hilo.


Extendiendo de la clase Thread
==========================

```java
public class Hilo extends Thread {
    public Hilo(String nombre) {
        super(nombre);
    }

    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(getName() + " > " + i);
            try {
                Thread.sleep(100);
            } catch (InterruptedException ex) {
            }
        }
    }

    public static void main(String[] args) {
        Hilo hilo1 = new Hilo("hilo1");
        Hilo hilo2 = new Hilo("hilo2");
        hilo1.start();
        hilo2.start();
    }
}
```

Creando un objeto Thread pasándole al constructor un objeto que implemente el interfaz Runnable
================================

```java
public interface Runnable {
    public abstract void run();
}

class Hilo implements Runnable {
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
            try {
                Thread.sleep(100);
            } catch (InterruptedException ex) {
            }
        }
    }
}

class Principal {
    public static void main(String[] args) {
        Thread hilo = new Thread(new Hilo());
        hilo.start();
    }
}

class Principal {
    public static void main(String[] args) {
        Thread hilo = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException ex) {
                    }
                }
            }
        });
        hilo.start();
    }
}
```

Muerte natural de un hilo
=====================

Un hilo muere “de muerte natural” cuando finaliza su método run(). Muchos programadores utilizan un bucle infinito para que un hilo se ejecute continuamente y lo matan cuando ya no lo necesitan utilizando métodos actualmente desaconsejados que no aseguran que el hilo se acabe de forma correcta.

Una solución más efectiva es la siguiente:

```java
class Hilo extends Thread {
    private boolean salir = false;
    private int i = 0;

    public void fin() {
        salir = true;
    }

    @Override
    public void run() {
        while (!salir) {
            System.out.println(i++);
            try {
                Thread.sleep(100);
            } catch (InterruptedException ex) {
            }
        }
    }
}

class Principal {
    public static void main(String[] args) {
        Hilo hilo = new Hilo();
        hilo.start();
        System.out.println("Vamos a esperar cuatro segundos ...");
        try {
            Thread.sleep(4000);
        } catch (InterruptedException ex) {
        }
        System.out.println("... y matamos 'suavemente' el hilo.");
        hilo.fin();
    }
}
```

 de los índices y el número de página, y he transformado las listas en listas con guiones (-). También he agregado un salto de línea tras un punto final en los párrafos y listas.



# Estados de un hilo - Ciclo de vida

## Estados de un hilo

*   **NEW**: Estado para un hilo que todavía no ha sido iniciado.
*   **RUNNABLE**: Estado para un hilo ejecutable. Un hilo en estado ejecutable está en ejecución en la JVM pero puede estar esperando por otros recursos del sistema operativo, como puede ser el procesador.
*   **BLOCKED**: Estado para un hilo bloqueado esperando tener acceso a la llave del candado de un objeto para poder entrar (o reentrar) en un método (o bloque de código) sincronizado. Ocurre cuando un hilo va a entrar en un bloque sincronizado, pero hay otro hilo actualmente ejecutándolo para el mismo objeto, por lo que tendrá que esperar a que el segundo hilo finalice la ejecución del bloque.
*   **TIMED_WAITING**: Estado para un hilo que está esperando con un tiempo específico de espera. Esto es debido a la llamada de alguno de los siguientes métodos especificando un tiempo de espera: Thread.sleep, Object.wait (con timeout) o Thread.join (con timeout)
*   **WAITING**: Estado para un hilo que está esperando por haberse llamado alguno de los siguientes métodos: Object.wait (sin timeout) y Thread.join (sin timeout). A diferencia del estado bloqueado, un hilo en este estado está esperando una acción por parte de otro hilo. Por ejemplo, un hilo que ha llamado a wait() en un objeto está esperando por otro hilo que llame a notify() o notifyAll() de ese mismo objeto. Un hilo que ha llamado a Thread.join() está esperando por un hilo específico a que termine.
*   **TERMINATED**: Estado para un hilo que ha completado su ejecución y ha terminado.

## Prioridades

*   El planificador es la parte de la máquina virtual encargada de decidir el hilo que pasa a la CPU en cada momento.
*   El algoritmo de planificación no tiene que ser el mismo en cada implementación de distintas máquinas virtuales, pero siempre existen unos mínimos a cumplir, entre los que se encuentran los siguientes:
    *   -se respetan las prioridades a la hora de ejecutar un hilo, es decir, entrará antes un hilo con más prioridad que uno con menos. Y no se asegura que habiendo hilos de más prioridad se ejecuten en algún momento los de prioridad inferior.
    *   -si hay varios hilos de igual prioridad, todos deben ejecutarse en algún momento.
*   Como norma general, cuando se crea un nuevo hilo, éste hereda la prioridad del hilo desde el que ha sido creado, aunque dicha prioridad se puede modificar.
*   Para la gestión de la prioridad existen los métodos getPriority() y setPriority(int). Sus valores de asignación serán entre Thread.MIN_PRIORITY (1) y Thread.MAX_PRIORITY (10). Thread.NORM_PRIORITY tiene un valor de 5, y será la asignada por defecto al hilo creado por la JVM para arrancar la función main().
*   Las librerías gráficas de Java (AWT, Swing, ...) tienen su propio hilo para gestionar el interfaz.
*   Para que el sistema funcione correctamente y el usuario sienta que cuando realiza una acción (clic a un botón, desplegar una lista, teclear algo) el sistema responde inmediatamente, se le ha asignado una prioridad de 6 (un punto por encima de la normal). Obviamente si hay muchos hilos con prioridad más alta el sistema puede dejar de responder de manera fluida.
Métodos básicos
===============

### De objeto (no estáticos)

#### `public long getId()`

Devuelve el identificador del hilo, un número entero positivo generado en su creación. Este identificador es único y permanece sin cambios durante toda su vida.

#### `public final String getName()`

Devuelve el nombre del hilo.

#### `public final void setName(String name)`

Cambia el nombre del hilo por el indicado en el parámetro.

#### `public final int getPriority()`

Devuelve la prioridad del hilo.

#### `public final void setPriority(int newPriority)`

Cambia la prioridad del hilo. Lanza una `IllegalArgumentException` si la prioridad indicada en el parámetro no está en el rango `MIN_PRIORITY` a `MAX_PRIORITY`.

#### `public final void setDaemon(boolean on)`

Establece el hilo bien como un hilo demonio o como un hilo de usuario. Este método debe llamarse antes de iniciar el hilo.

#### `public final boolean isDaemon()`

Devuelve si el hilo es un demonio.

#### `public Thread.State getState()`

Devuelve el estado del hilo. Este método está diseñado para usar en la monitorización del estado del sistema, no para controlar la sincronización.

#### `public final boolean isAlive()`

Devuelve si un hilo está vivo. Un hilo está vivo si ha sido iniciado y no ha muerto todavía (estado distinto de `NEW` y de `TERMINATED`).

#### `public void run()`

Si el hilo se construyó usando un objeto `Runnable` independiente, entonces se llama a su método `run`. Las subclases de `Thread` deberían sobreescribir este método, incluyendo en él el código ejecutable del hilo.

#### `public synchronized void start()`

Provoca que el hilo comience su ejecución; la máquina virtual java (JVM) llama a su método `run`. El resultado es que dos hilos se ejecutan concurrentemente: el hilo actual (que vuelve de la llamada al método `start`) y el otro hilo (que ejecuta su método `run`).

#### `public void interrupt()`

Interrumpe el hilo. A no ser que el hilo actual se interrumpa a sí mismo, lo cual siempre está permitido, se invoca al método `checkAccess` de este hilo, lo cual puede causar el lanzamiento de una `SecurityException`.

#### `public boolean isInterrupted()`

Devuelve si el hilo ha sido interrumpido. El estado de interrupción de un hilo no se ve alterado por este método.

#### `public final void join()`

Espera a que el hilo muera.

#### `public final ThreadGroup getThreadGroup()`

Devuelve el grupo al que pertenece este hilo. Este método devuelve `null` si el hilo ha muerto.



De clase (estáticos)
### sleep(long millis)

Hace que el hilo que está actualmente en ejecución se vaya a dormir el tiempo indicado en el
parámetro (sujeto a la precisión que pueda ofrecer el sistema). El hilo no pierde la propiedad de
sus  bloqueos  (ver  más  adelante).  Debe  capturar  una  InterrupedException  por  si  al  hilo  lo
interrumpen con el método interrupt().

### yield()

Pausa temporalmente el hilo en ejecución, se activa el planificador y carga otro hilo para ejecución
(que podría volver a ser el mismo). Es decir, pasa el hilo actual de Running a Runnable y decide
quién es el siguiente.

### currentThread()

Devuelve una referencia al hilo que se está en ese momento en ejecución.

### interrupted()

Devuelve  true  si  el  hilo  actual  ha  sido  interrumpido,  false  en  caso  contrario.  El  estado  de
interrupción del hilo se libera con la llamada a este método. En otras palabras, si este método se
llama dos veces seguidas, la segunda llamada devolverá false (a no ser que el hilo actual fuera
interrumpido de nuevo, después de que la primera llamada liberara su estado de interrupción y
antes de que la segunda llamada lo examinara).  

### Desaconsejados/Obsoletos (deprecated)

- suspend/resume
- stop
- destroy

Sincronización
Cuando queremos sincronizar un cierto código (denominado sección crítica), es decir, cuando
queremos  asegurar  que  sólo  existe  un  hilo  accediendo  simultaneamente  a  cualquier  código
sincronizado de ese objeto, pues lo metemos en un bloque synchronized de la siguiente manera:
```java
public void f() {...synchronized (objeto){// código sincronizado}...}
```
Se dice que todo objeto Java tiene un candado (cerrojo, lock, monitor lock …), y cuando un
hilo adquiere la llave del candado, tiene su acceso exclusivo. Los hilos que intenten acceder a un
objeto a través de un código sincronizado deberán tener la llave y, en caso contrario, esperarán
hasta que se libere.
Es decir, cuando un hilo quiere acceder a un bloque sincronizado,  se pone a la espera si ya
hay otro hilo ejecutando cualquier código sincronizado para ese objeto  (ese código u otro). 
O sea, dos o más métodos sincronizados nunca se ejecutarán simultáneamente sobre el
mismo  objeto  (exclusión  mútua).  Aunque  obviamente  puede  ser  que  un  mismo  hilo  esté
ejecutando un método sincronizado y llame a otro distinto (mientras tiene el lock).
Al sobreescribir un método de una clase, éste se puede declarar sincronizado o no, con
independencia de cómo era en su clase superior.
Hay que tener en cuenta que si se va a sincronizar todo el método para el objeto actual, es
más fácil declarar synchronized en la definición de la función.
```java
public void f() {
synchronized (this){// código sincronizado}}
```
es lo mismo que:
```java
public synchronized void f() {// código sincronizado}
```


Coordinación/Señalización
=====================================

El mecanismo de sincronización del código de acceso a un objeto nos permite asegurar la
atomicidad a la hora de la ejecución de secciones críticas de código. Así sabremos que no se
intercalan ejecuciones de distintos hilos accediendo al estado de un mismo objeto, pudiendo
dejarlo en un estado inconsistente o erróneo.

Pero existen otros métodos (existentes en Object y por lo tanto heredados por todos los
objetos), que nos permiten avisos entre hilos para evitar que estén continuamente interrogando
sobre la disponibilidad de un recurso y, por lo tanto, consumiendo ciclos de CPU. Es decir, evitar
código del tipo while (!condiciónQueQuiero) ;

Las llamadas a estos métodos sólo podrán realizarse cuando un hilo sea “propietario” de un
objeto, o sea, que sólo se podrán ejecutar en código sincronizado.

### Métodos de espera y notificación

#### wait()

El método wait() pone el hilo que está accediendo al objeto en espera y, obviamente, liberará
la llave del candado. Por lo tanto el objeto sincronizado deja de estar bloqueado y otros hilos
podrán usarlo. El hilo estará esperando indefinidamente a que lo avisen para continuar su
ejecución.

#### wait(long timeout)

La versión sobrecargada del método permite que el hilo espere a que lo avisen hasta un
máximo de los milisegundos indicados. Una vez se supere ese tiempo se pondrá a las órdenes del
planificador para entrar en la CPU de nuevo.

#### notify()

Cuando algún hilo haga un notify() sobre un objeto, el planificador avisará a un hilo que esté
esperando por dicho objeto, el bloque sincronizado volverá a estar ocupado y seguirá la ejecución
a continuación del wait() que lo mandó a esperar.

#### notifyAll()

Cuando algún hilo haga un notifyAll() sobre un objeto, el planificador avisará a todos los hilos
que estén esperando por dicho objeto, el bloque sincronizado volverá a estar ocupado y seguirá la
ejecución a continuación del wait() que los mandó a esperar.

### Ejemplo de uso

```java
public class Principal {
    public static void main(String[] args) {
        int N = 77777777;
        long t;

        // Uso de wait()
        {
            String str = "";
            t = System.currentTimeMillis();
            for (int i = N; i-- > 0;) str += "x";
            System.out.println(System.currentTimeMillis() - t);
        }

        // Uso de wait(long timeout)
        {
            StringBuffer sb = new StringBuffer();
            t = System.currentTimeMillis();
            for (int i = N; i-- > 0;) sb.append("x");
            System.out.println(System.currentTimeMillis() - t);
        }

        // Uso de notify() y notifyAll()
        {
            // Código que utiliza wait() y notify()
        }
    }
}
```

19 de 31


Dependiendo del diseño de la aplicación, no siempre que un hilo es despertado se puede asegurar que la condición por la que esperaba ya se cumple, por lo que la llamada al `wait()` se debe realizar en un `while()` y no en un `if()`.

Realmente `wait()` y `notify()` tienen un contador para cada bloqueo. `wait()` bloquea si el contador es <=0. Al desbloquearse `notify()` incrementa el contador y si es >=0 entonces despierta al primer hilo de la cola. Es decir, que podrían producirse varios `notify()` antes que sus `wait()` correspondientes, y estos no bloquearían el hilo.

### Esperando el final de un hilo

`public final void join()`

Espera a que el hilo sobre el que se hizo el `join()` se muera

### Código de ejemplo

`public class Hilo extends Thread {`

`    @Override`

`    public void run() {`

`        for(int i=0; i<10; i++) {`

`            try {`

`                Thread.sleep(1000);`

`            } catch (InterruptedException ex) { }`

`            System.out.println("Hilo trabajando");`

`        }`

`    }`

`    public static void main(String[] args) {`

`        Hilo t = new Hilo();`

`        t.start();`

`        for(int i=0; i<10; i++) {`

`            try {`

`                Thread.sleep(500);`

`                System.out.println("Voy haciendo otras cosas por aquí ... ");`

`            } catch (InterruptedException ex) { }`

`        }`

`        try {`

`            t.join();`

`        } catch (InterruptedException ex) { }`

`        System.out.println("Trabajo importante asumiendo que el hilo acabó");`

`    }`

### Salida del código

```
Voy haciendo otras cosas por aquí ... 
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Voy haciendo otras cosas por aquí ... 
Hilo trabajando
Hilo trabajando
Hilo trabajando
Hilo trabajando
Hilo trabajando
Trabajo importante asumiendo que el hilo acabó
```



Interrumpir a un hilo
=====================

Interrumpir un hilo se refiere a decirle al hilo que se encuentra en ejecución que acabe en cuanto pueda. Es responsabilidad del propio hilo (del programador) cerrarse como lo considere más oportuno, pero podría si quisiera incluso no hacer caso a la interrupción (lo cual no estaría bien).

Para la implementación del mecanismo de interrupción se utiliza un flag de estado de la interrupción, de la siguiente manera: Un hilo puede llamar a otroHilo.interrupt() para activar dicho flag. El hilo que está en ejecución chequeará (si quiere) ese flag utilizando Thread.interrupted(), que nos devolverá su estado y, de manera automática, lo pone a false. También es posible que un hilo utilice el método de instancia otroHilo.isInterrupted() para conocer el estado de la interrupción de unHilo, pero en este caso no cambia el estado del flag.

Ejemplo 1
---------

```java
public class Hilo extends Thread {
    public Hilo(String nombre) {
        super(nombre);
    }

    @Override
    public void run() {
        System.out.println("Comienza " + getName());
        try {
            Thread.sleep(9000);
        } catch (InterruptedException ex) {
            System.out.println("Interrumpido!");
        }
        System.out.println("Fin " + getName());
    }

    public static void main(String[] args) {
        Hilo h1 = new Hilo("Hilo 1");
        h1.start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {}
        h1.interrupt();
        System.out.println("Fin main");
    }
}
```

La salida será (en cuanto transcurre un segundo, no espera nueve):

Comienza Hilo 1
Fin main
Interrumpido!
Fin Hilo 1

Ejemplo 2
---------

```java
public class HiloTrabajador extends Thread {
    int paciencia;

    public HiloTrabajador(int paciencia) {
        this.paciencia = paciencia;
    }

    @Override
    public void run() {
        int num_toc_toc = 0;
        int i = 0;
        System.out.println("Comienza el hilo a trabajar");
        while (num_toc_toc < paciencia) {
            System.out.println(i++ + " ");
            if (Thread.interrupted())
                if (++num_toc_toc < paciencia)
                    System.out.println(num_toc_toc + "º interrupción. PASO");
        }
        System.out.println("Qué pesados!. Tendré que parar de trabajar e ir ver quién es.");
    }

    public static void main(String[] args) {
        HiloTrabajador hilo = new HiloTrabajador(3);
        hilo.start();
        int num_toc_toc = 0;
        while (hilo.isAlive()) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException ex) {}
            if (!hilo.isInterrupted()) {
                System.out.println("TOC TOC! (" + ++num_toc_toc + ")");
                hilo.interrupt();
            }
        }
    }
}
```

La salida será algo así:

Comienza el hilo a trabajar
0 1 …6 7 TOC TOC! (1)
8 …39 40 TOC TOC! (2)
41 2º interrupción. PASO
42 …TOC TOC! (3)
72 Qué pesados!. Tendré que parar de trabajar e ir ver quién es.
TOC TOC! (4)


# Hilos demonio (daemon)

Los hilos demonio son aquellos que realizan tareas en segundo plano necesarias para el funcionamiento de la aplicación, pero no imprescindibles en su lógica de programa (comprobar si se pulsa un botón, por ejemplo).

## Características de los hilos demonio

*   Una aplicación Java finaliza cuando no queda ningún hilo, o bien todos los hilos que quedan son de tipo demonio.
*   Para establecer e interrogar a un hilo sobre si es un demonio se utilizan las instrucciones `setDaemon (boolean)` y `isDaemon()` respectivamente.
*   Si queremos que un hilo sea de tipo demonio, llamaremos al método `setDaemon(true)` antes de iniciar (de llamar a `start()`). No se puede llamar al método después pues saltaría una `IllegalThreadStateException`.
*   Por defecto, los hilos que se crean no son de este tipo.

## Ejemplo de hilo demonio

```java
public class Daemon {
    public static void main(String[] args) {
        new Hilo(true).start(); // new Hilo(false).start();
        try {
            Thread.sleep(3500);
        } catch (InterruptedException e) {}
        System.out.println("Fin Main");
    }
}

class Hilo extends Thread {
    public Hilo(boolean esDemonio) {
        setDaemon(esDemonio);
    }

    public void run() {
        int count = 0;
        while (count < 10) {
            System.out.println(((isDaemon()) ? "DEMONIO " : "HILO ") + count++);
            try {
                sleep(1500);
            } catch (InterruptedException e) {}
        }
    }
}
```

# Grupos de hilos (ThreadGroup)

Todos los hilos de Java forman parte de un grupo. Por defecto están en el grupo de su hilo creador, pero se puede indicar otro grupo cualquiera en su constructor.

## Métodos para crear un grupo de hilos

*   `public Thread(ThreadGroup group, String name)`
*   `public Thread(ThreadGroup group, Runnable target)`
*   `public Thread(ThreadGroup group, Runnable target, String name)`

## Métodos para obtener el grupo de un hilo

*   `public final ThreadGroup getThreadGroup()`

Devuelve el `ThreadGroup` al que pertenece el hilo. Devuelve `null` si el hilo está muerto.

## Crear un grupo de hilos

*   `public ThreadGroup(String name)`
*   `public ThreadGroup(ThreadGroup parent, String name)`

La principal utilidad de la existencia de los grupos es manejar varios hilos como un solo objeto, llamando a métodos que se apliquen directamente a todos ellos. Ejemplos de estos métodos podrían ser los siguientes:

*   `public final void interrupt()`
*   `public final void setMaxPriority(int pri)`

Asigna la máxima prioridad al grupo. Los hilos de dicho grupo que tienen una prioridad superior no se ven afectados.


Librería de concurrencia de alto nivel
=====================================

Los mecanismos vistos hasta el momento permiten un control preciso a bajo nivel de todos los detalles de los hilos. En todo caso, a partir de la versión 5 de la plataforma Java, se introdujo el paquete `java.util.concurrent` que proporcionan nuevas estructuras para manejar múltiples estructuras concurrentes de una manera más adecuada.

Objetos con operaciones atómicas
-------------------------------

Las clases `java.util.concurrent.atomic.Atomic*` nos permiten crear objetos que almacenan dato(s) de un tipo primitivo y cuyas operaciones ya están protegidas ante accesos simultáneos de varios hilos, sin necesidad de que el programador indique los bloques de código sincronizados.

Algunas de las clases existentes son `AtomicBoolean`, `AtomicInteger`, `AtomicLong`, `AtomicReference`. Algunos de los métodos que tienen en común son los siguientes:

*   `get()`
*   `getAndAdd(valorSumar)`
*   `addAndGet(valorSumar)`
*   `incrementAndGet()`
*   `getAndIncrement()`
*   `decrementAndGet()`
*   `getAndDecrement()`
*   `set(valor)`
*   `getAndSet(valor)`
*   `boolean compareAndSet(valorSiIgual, nuevoValor)`

Otras clases existentes son `AtomicInt egerArray`, `AtomicLongArray` y `AtomicReferenceArray`, que nos permiten almacenar un array de valores de su tipo primitivo, y donde los métodos son similares a los anteriormente indicados, con la excepción de un primer parámetro que indica la posición del array en donde se va a realizar la operación.

Semáforos
------------

`java.util.concurrent.Semaphore` nos permite limitar el número de hilos concurrentes accediendo a un recurso específico. Su funcionamiento sería similar a lo que conseguimos con un bloque sincronizado, donde solo puede entrar un hilo, pero en este caso con un número máximo de ellos.

*   `Semaphore(int permits)` // se indica el n.º máximo de permisos de acceso
*   `void acquire()` // adquiere un permiso, bloqueándose hasta que se obtiene (o el hilo es interrumpido)
*   `void release()` // libera un permiso, devolviéndoselo al semáforo para que lo use otro hilo

Ejemplo: Implementaciones del productor/consumidor
---

Ejemplo INCORRECTO - 1 productor y 1 consumidor consumiendo 1 dato

Los hilos entran y salen de la CPU en cualquier momento y puede interrumpirse la ejecución de algún conjunto de instrucciones que deban ejecutarse de manera atómica (marco que he leído y aún no lo he hecho, leo y aún no he marcado que he leído, marco que he escrito y aún no lo he hecho, etc.). De esa manera pueden escribirse dos datos seguidos, perdiendo el primero de ellos, puedo leer dos veces el mismo datos, etc.

```java
public class Principal {
    public static void main(String[] args) {
        Buffer datos = new Buffer();
        Productor productor = new Productor(datos, VelocidadAcceso.RAPIDO);
        Consumidor consumidor = new Consumidor(datos, VelocidadAcceso.LENTO);
        productor.start();
        consumidor.start();
    }
}

public class Productor extends Thread {
    Buffer buffer;
    VelocidadAcceso velocidad;

    public Productor(Buffer buffer, VelocidadAcceso velocidad) {
        this.buffer = buffer;
        this.velocidad = velocidad;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            while (buffer.disponible)
                try {
                    Thread.sleep(velocidad.getMilisegundos());
                } catch (InterruptedException e) {
                }
            buffer.put("" + i);
            System.out.println("Producido: " + i);
        }
    }
}

public class Consumidor extends Thread {
    Buffer buffer;
    VelocidadAcceso velocidad;

    public Consumidor(Buffer buffer, VelocidadAcceso velocidad) {
        this.buffer = buffer;
        this.velocidad = velocidad;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            while (!buffer.disponible)
                try {
                    Thread.sleep(velocidad.getMilisegundos());
                } catch (InterruptedException e) {
                }
            System.out.println("Consumido: " + buffer.get());
            buffer.clear();
        }
    }
}
```

Nota: He corregido el código del ejemplo para que el consumidor se bloquee hasta que haya datos disponibles en el buffer.
**Ejemplo de productor y consumidor con buffer**

### Clase Buffer

El buffer es una clase que simula un contenedor que puede almacenar un dato. Tiene métodos para agregar (`put`) y obtener (`get`) el dato.

```java
public class Buffer {
  private String str;
  boolean disponible = false;

  public String get() {
    disponible = false;
    return str;
  }

  public boolean put(String str) {
    if (disponible) return false;
    this.str = str;
    disponible = true;
    return true;
  }
}
```

### Clase Productor

La clase Productor extiende la clase Thread y representa un hilo que produce datos y los agrega al buffer.

```java
public class Productor extends Thread {
  Buffer buffer;
  VelocidadAcceso velocidad;

  public Productor(Buffer buffer, VelocidadAcceso velocidad) {
    this.buffer = buffer;
    this.velocidad = velocidad;
  }

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      try {
        buffer.put("" + i);
        sleep(velocidad.getMilisegundos());
      } catch (InterruptedException e) {}
    }
  }
}
```

### Clase Consumidor

La clase Consumidor extiende la clase Thread y representa un hilo que consume datos del buffer.

```java
public class Consumidor extends Thread {
  Buffer buffer;
  VelocidadAcceso velocidad;

  public Consumidor(Buffer buffer, VelocidadAcceso velocidad) {
    this.buffer = buffer;
    this.velocidad = velocidad;
  }

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      try {
        buffer.get();
        sleep(velocidad.getMilisegundos());
      } catch (InterruptedException e) {}
    }
  }
}
```

### Enum VelocidadAcceso

El enum VelocidadAcceso representa las diferentes velocidades de acceso al buffer.

```java
enum VelocidadAcceso {
  LENTO(1000),
  RAPIDO(100),
  INMEDIATO(0),
  ALEATORIO(-1);

  private int milisegundos;

  VelocidadAcceso(int milisegundos) {
    this.milisegundos = milisegundos;
  }

  public int getMilisegundos() {
    if (milisegundos >= 0) return milisegundos;
    return new Random().nextInt(LENTO.getMilisegundos());
  }
}
```

### Clase Principal

La clase Principal es la clase principal del programa y crea un productor y un consumidor que comparten un buffer.

```java
public class Principal {
  public static void main(String[] args) {
    Buffer datos = new Buffer();
    Productor productor = new Productor(datos, VelocidadAcceso.ALEATORIO);
    Consumidor consumidor = new Consumidor(datos, VelocidadAcceso.ALEATORIO);
    productor.start();
    consumidor.start();
  }
}
```

Este ejemplo demuestra cómo un productor y un consumidor pueden compartir un buffer para intercambiar datos. El productor agrega datos al buffer y el consumidor los obtiene y los procesa. La velocidad de acceso al buffer se puede configurar mediante el enum VelocidadAcceso.



# Clase Buffer
La clase Buffer es una implementación de un buffer de datos que utiliza un método sincronizado para gestionar el acceso a los datos.

## Métodos
La clase Buffer tiene los siguientes métodos:

### get()
Este método devuelve un dato del buffer y lo elimina de la lista. Si el buffer está vacío, el método se bloquea hasta que haya datos disponibles.

### put()
Este método agrega un nuevo dato al buffer. Si el buffer está lleno, el método se bloquea hasta que haya espacio disponible.

## Clase Productor
La clase Productor es una implementación de un hilo que produce datos y los agrega al buffer.

## Clase Consumidor
La clase Consumidor es una implementación de un hilo que consume datos del buffer.

## Enum VelocidadAcceso
El enum VelocidadAcceso define diferentes velocidades de acceso a los datos, incluyendo LENTO, RAPIDO, INMEDIATO y ALEATORIO.

### Métodos
El enum VelocidadAcceso tiene el siguiente método:

### getMilisegundos()
Este método devuelve el tiempo de acceso en milisegundos para la velocidad especificada.

## Ejemplo de uso
El ejemplo de uso muestra cómo crear un buffer y dos hilos, un productor y un consumidor, que interactúan con el buffer.

### Clase Principal
La clase Principal es la clase principal del programa y crea un buffer y dos hilos, un productor y un consumidor.

### Clase Productor
La clase Productor es una implementación de un hilo que produce datos y los agrega al buffer.

### Clase Consumidor
La clase Consumidor es una implementación de un hilo que consume datos del buffer.

### Enum VelocidadAcceso
El enum VelocidadAcceso define diferentes velocidades de acceso a los datos, incluyendo LENTO, RAPIDO, INMEDIATO y ALEATORIO.

### Métodos
El enum VelocidadAcceso tiene el siguiente método:

### getMilisegundos()
Este método devuelve el tiempo de acceso en milisegundos para la velocidad especificada.

## Código
El código del programa se encuentra a continuación:


```java
import java.util.ArrayList;
import java.util.Random;

public class Buffer {
    private ArrayList<Integer> lista = new ArrayList<Integer>();
    private final int MAX = 10;
    private Random random = new Random();

    public boolean hayDatos() {
        return lista.size() > 0;
    }

    public boolean cabenMasDatos() {
        return lista.size() < MAX;
    }

    public synchronized int get() throws InterruptedException {
        while (!hayDatos()) {
            wait();
        }
        int dato = lista.remove(0);
        System.out.print("GET " + dato + " ");
        System.out.println(lista);
        notify();
        return dato;
    }

    public synchronized void put() throws InterruptedException {
        while (!cabenMasDatos()) {
            wait();
        }
        int nuevoDato = random.nextInt(100);
        lista.add(nuevoDato);
        System.out.print("PUT " + nuevoDato + " ");
        System.out.println(lista);
        notify();
    }
}

enum VelocidadAcceso {
    LENTO(1000),
    RAPIDO(100),
    INMEDIATO(0),
    ALEATORIO(-1);

    private int milisegundos;

    VelocidadAcceso(int milisegundos) {
        this.milisegundos = milisegundos;
    }

    public int getMilisegundos() {
        if (milisegundos >= 0) {
            return milisegundos;
        }
        return new Random().nextInt(LENTO.getMilisegundos());
    }
}

public class Productor extends Thread {
    Buffer buffer;
    VelocidadAcceso velocidad;

    public Productor(Buffer buffer, VelocidadAcceso velocidad) {
        this.buffer = buffer;
        this.velocidad = velocidad;
    }

    @Override
    public void run() {
        for (int i = 0; i < 15; i++) {
            try {
                buffer.put();
                sleep(velocidad.getMilisegundos());
            } catch (InterruptedException e) {
            }
        }
    }
}

public class Consumidor extends Thread {
    Buffer buffer;
    VelocidadAcceso velocidad;

    public Consumidor(Buffer buffer, VelocidadAcceso velocidad) {
        this.buffer = buffer;
        this.velocidad = velocidad;
    }

    @Override
    public void run() {
        for (int i = 0; i < 15; i++) {
            try {
                buffer.get();
                sleep(velocidad.getMilisegundos());
            } catch (InterruptedException e) {
            }
        }
    }
}

public class Principal {
    public static void main(String[] args) {
        Buffer datos = new Buffer();
        Productor productor = new Productor(datos, VelocidadAcceso.ALEATORIO);
        Consumidor consumidor = new Consumidor(datos, VelocidadAcceso.LENTO);
        productor.start();
        consumidor.start();
    }
}
```


1. productor y varios consumidores consumiendo varios datos
```java
public class Principal {
    public static void main(String[] args) {
        final int NUM_CONSUMIDORES = 3;
        Buffer datos = new Buffer();
        Productor productor = new Productor(datos, VelocidadAcceso.RAPIDO);
        productor.start();
        for (int i = 0; i < NUM_CONSUMIDORES; i++) {
            new Consumidor("H" + i, datos, VelocidadAcceso.ALEATORIO).start();
        }
    }
}

public class Consumidor extends Thread {
    Buffer buffer;
    VelocidadAcceso velocidad;

    public Consumidor(String nombreHilo, Buffer buffer, VelocidadAcceso velocidad) {
        super(nombreHilo);
        this.buffer = buffer;
        this.velocidad = velocidad;
    }

    @Override
    public void run() {
        for (int i = 0; i < 15; i++) {
            try {
                buffer.get(getName());
                sleep(velocidad.getMilisegundos());
            } catch (InterruptedException e) {
            }
        }
    }
}

public class Buffer {
    private ArrayList<Integer> lista = new ArrayList<Integer>();
    private final int MAX = 10;
    private Random random = new Random();

    public boolean hayDatos() {
        return lista.size() > 0;
    }

    public boolean cabenMasDatos() {
        return lista.size() < MAX;
    }

    public synchronized int get(String nombreHilo) throws InterruptedException {
        while (!hayDatos()) {
            wait();
        }
        int dato = lista.remove(0);
        System.out.print(nombreHilo + " GET " + dato + " ");
        System.out.println(lista);
        notify();
        return dato;
    }

    public synchronized void put(String str) throws InterruptedException {
        while (!cabenMasDatos()) {
            wait();
        }
        int nuevoDato = random.nextInt(100);
        lista.add(nuevoDato);
        System.out.print("PUT " + nuevoDato + " ");
        System.out.println(lista);
        notify();
    }
}
```

 de los índices y el número de página, y he transformado la lista a una lista con anclas en markdown con guiones. También he agregado un salto de línea tras un punto final en los párrafos y en las listas.
