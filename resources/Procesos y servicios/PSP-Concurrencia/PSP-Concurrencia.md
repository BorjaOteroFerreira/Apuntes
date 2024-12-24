



PSP 1/2 (Concurrencia) / DAM2

1 de 31

Contenidos
================

### Introducción
----------------

Programa
Código (instrucciones) y datos almacenados en un soporte perdurable que resuelven una tarea específica.

Sistema operativo
Intermediario entre las aplicaciones de usuario y el hardware.

Usuario <> Aplicaciones <> Sistema Operativo <> Hardware

Proceso
Es un programa en ejecución. Por supuesto, puede haber procesos distintos resultado de la ejecución de un mismo programa.

Además del código y los datos mencionados anteriormente, un proceso necesita:

- un contador de programa (puntero a la instrucción en ejecución)
- la memoria de trabajo
- estado del procesador (el valor de sus registros)

Estas características son propias de cada proceso en ejecución, incluso siendo distintos procesos de un mismo programa. Lo único que compartirán serán el código (aunque cada contador de programa apuntará a instrucciones distintas, pues cada uno estará en su punto de ejecución).

### Demonio (daemon)
-------------------

Es un tipo especial de proceso, no interactivo, ejecutado en segundo plano y controlado por el sistema operativo. A veces se les denomina servicios (Windows) o programas residentes (MS-DOS).

Ejemplos pueden ser un servidor web (httpd), cron, la garbage collection, la parte residente de un antivirus, etc.

### Hilo (hebra, thread)
-------------------------

Es la unidad de procesamiento más pequeña que puede ser planificada por el sistema operativo.

Los hilos siempre pertenecen a un proceso (un proceso tiene al menos un hilo denominado principal -main thread-). Distintos hilos de un mismo proceso comparten su memoria y recursos.

5 de 31

### Procesadores y núcleos
-------------------------

Tradicionalmente se conocía como procesador el componente (el chip) que leía y ejecutaba instrucciones.

En esos momentos los sistemas multiprocesador o multi-CPU tenían varios chips físicos distintos conectados al sistema, por lo que se necesitaban placas base multi-socket. Ésto implicaba, además de todo el hardware para conectar dichos procesadores a la RAM, un gran consumo de energía.

El HyperThreading (HT) es una tecnología Intel introducida con el Pentium 4 en 2002, que intentó llevar el paralelismo a la máquinas domésticas.

Para ello implementa registros y unidades de ejecución en cada core, de manera que puede almacenar el estado de dos threads en cada núcleo para que se ejecuten en él. Obviamente esto implica un cambio de contexto (cuando se cambia de un hilo a otro) guardando y leyendo los registros necesarios, por lo que el rendimiento se ve afectado.

Es decir, es mejor tener un procesador con cuatro núcleos que dos con HT, aunque el sistema operativo en ambos casos verá cuatro. AMD por ejemplo, no implementa esta característica porque no cree que merezca la pena. De hecho muchos administradores desactivan esta característica en la BIOS del sistema.

Posteriormente ya salieron procesadores del tipo Intel Dual Core (Core Duo) y Core 2 Duo, ámbos con dos núcleos, aunque con arquitecturas distintas (buses 32/64 bits, caché, Mhz).

Por ejemplo, en el año 2020, el Intel Core i5-9400 no dispone de HyperThreading (6 núcleos, 6 hilos de ejecución), pero el Intel Core i5-10400 sí lo tiene (6 núcleos, 12 hilos de ejecución).

Hoy en día los procesadores contienen varios núcleos que, en realidad, es tener varios procesadores dentro del mismo chip, compartiendo ciertos componentes entre ellos. De esta manera se ejecutan (realmente) varias instrucciones a la vez. Las esperas en las comunicaciones son mínimas pues están todos integrados en el mismo componente.

Este tipo de procesadores de dos, cuatro, seis, ocho o más núcleos ya están presentes no sólo en los ordenadores sino también en teléfonos móviles, etc.

Teniendo en cuenta el siguiente código y suponiendo que cada instrucción se ejecuta en un ciclo de reloj, en una ejecución secuencial tardaría tres ciclos de reloj y en una ejecución paralela tardaría dos ciclos de reloj, lo que supone rebajar un 33% su tiempo de ejecución.

```java
nombre = “Perico”
apellidos = “de los Palotes”
nombreCompleto = nombre + “ “ + apellidos
```

Cada núcleo del procesador nos permite ejecutar una instrucción (hilo) en un instante determinado. Si el procesador dispone de varios, podrá procesar tantas instrucciones simultáneamente como núcleos tenga.

Hay que decir que las instrucciones pueden ser del mismo proceso o de distintos, pero si son del mismo proceso, dependerá de éste (y de su programador) que se puedan ejecutar simultáneamente distintas instrucciones debido a sus dependencias (una instrucción puede necesitar un resultado calculado en otra anterior).

6 de 31


5 de 31



![imagen_1_1.png](resources/Procesos%20y%20servicios/PSP-Concurrencia/images/imagen_1_1.png)

![imagen_1_2.png](resources/Procesos%20y%20servicios/PSP-Concurrencia/images/imagen_1_2.png)


Por parte de Intel, además del ya comentado HyperThreading, el mundo de los procesadores sigue
innovando. Uno de los últimos cambios introducidos (año 2021, a partir de la 12ª generación de
Intel) es la aparición de una llamada arquitectura heterogénea o modelo híbrido,  que consta de
dos tipos de núcleos diferentes: 
- P-cores
- E-cores
Ambos tipos de cores trabajan a diferentes frecuencias de trabajo, tienen características diferentes
y sobre todo consumos diferentes. De esta manera se pueden manejar de manera más eficiente
diferentes tipos de carga de trabajo.
E-Cores
(Eficiencia - eficiencia)
P-Cores
 (Performance - rendimiento)
Rendimiento
Menor
Máximo
Físicamente
Pequeños
Más grandes
Consumo
Menor
Mayor
Temperatura
Menor
Mayor
Permiten HyperThreading
No
Sí
Caché L2 (level 2)
Compartida
Independiente por core
Tareas indicadas
Usados en tareas sencillas
(ofimática, etc.)
Usados en tareas más pesadas
(gaming)
Delegación de tareas sencillas
No
Pueden delegar a los E-Cores
Por ejemplo, un Intel Core i7-14700K tiene 20 núcleos (8P+12E)
Pero también puede pasar que con 6P+4E se hable de 16 hilos (por el HT):   6Px2+4E==16
Y existen más tipos de cores muy especializados que, poco a poco, se irán introduciendo en el
mercado, como pueden ser los siguientes:
- LP-E Cores (Low Power E-Cores) 
Catalogados dentro de los E-Cores, son cores que funcionan practicamente sin consumo y
que básicamente mantienen al sistema cuando éste no está haciendo nada (“apagando” al
resto de cores para que su consumo sea cero). 
- NPU (Neural Processing Unit)
Núcleos especializados pensados para tareas de IA, quitándole este trabajo al resto de los
cores del sistema. En Windows, p.e., los utilizaría el asistente de IA Copilot.

6 de 31

La programación concurrente es la técnica que permite tener en ejecución simultáneamente
distintos procesos. De esta manera podemos, por ejemplo, estar trabajando  con una aplicación de
la oficina mientras escuchamos música, imprimimos un documento y bajamos un archivo de
internet.
Dependiendo de las características hardware de las que dispongamos, esta ejecución se
puede implementar de distintas maneras:
- un procesador con un único núcleo: sólo un proceso puede estar simultaneamente en ejecución,
así que el sistema operativo se encarga de intercambiar cada pocos milisegundos el proceso en
ejecución. Esto es lo que se conoce como programación concurrente.
- un procesador con varios núcleos: puede haber varias instrucciones ejecutándose realmente en
el mismo momento. Como los distintos núcleos comparten la misma memoria, se pueden utilizar
de manera coordinada. Esto es lo que se conoce como programación paralela.
- la denominada  programación distribuida, se refiere a la existencia de varios ordenadores
distribuidos en red, en donde cada ordenador tiene sus propios procesadores y memorias.
La programación concurrente y paralela no son excluyentes y pueden combinarse, puesto que
distintos hilos dentro de un núcleo también utilizarán la programación concurrente para alternarse
en la ejecución.

7 de 31

La programación utilizando hilos de ejecución puede tener multitud de ventajas, aunque
dependiendo del caso, también pueden ser un arma de doble filo. 
- En las aplicaciones adecuadas, reducen el coste de desarrollo y posterior mantenimiento
- Pueden mejorar el rendimiento en aplicaciones complejas
- Modelan mejor tareas que se realizan en paralelo en la vida real
- Son practicamente imprescindibles en la programación de casi cualquier entorno actual:
- GUIs
- Garbage Collection
- Entornos cliente / servidor (un hilo por cliente)
- Aprovechan los sistemas multiprocesador (o con varios núcleos), con un hilo en cada uno.
- Un hilo puede trabajar mientras otro espera por un recurso

8 de 31

Al iniciar una aplicación Java, la JVM crea un hilo que llamará el método público y estático
main(String[] args). Ese hilo principal creado puede ser el único existente en la aplicación, o bien
puede crear otros hilos que se ejecuten de manera concurrente con el hilo principal. La aplicación
terminará cuando no queda ningún hilo activo (aunque el main haya acabado antes).
La ejecución de un hilo se realiza creando (directa o indirectamente) un objeto de la clase
Thread, sobreescribiendo el método run() (donde estará el código del hilo) y llamando a su método
start().
Existen básicamente dos posibilidades para la creación de un hilo.


# Extendiendo de la clase Thread

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

# Creando un objeto Thread pasándole al constructor un objeto que implemente el interfaz Runnable

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
```

# Creando un objeto Thread pasándole al constructor un objeto que implemente el interfaz Runnable (con lambda)

```java
class Principal {
    public static void main(String[] args) {
        Thread hilo = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println(i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException ex) {
                }
            }
        });
        hilo.start();
    }
}
```

# Estados de un hilo - Ciclo de vida

![imagen_1_3.png](resources/Procesos%20y%20servicios/PSP-Concurrencia/images/imagen_1_3.png)

El estado de un Thread puede tomar alguno de los siguientes valores (encapsulados en la enumeración java.lang.Thread.State)

```java
public static final Thread.State NEW;
public static final Thread.State RUNNABLE;
public static final Thread.State BLOCKED;
public static final Thread.State TIMED_WAITING;
public static final Thread.State WAITING;
public static final Thread.State TERMINATED;
```

# Prioridades

El planificador es la parte de la máquina virtual encargada de decidir el hilo que pasa a la CPU en cada momento. El algoritmo de planificación no tiene que ser el mismo en cada implementación de distintas máquinas virtuales, pero siempre existen unos mínimos a cumplir, entre los que se encuentran los siguientes:

*   se respetan las prioridades a la hora de ejecutar un hilo, es decir, entrará antes un hilo con más prioridad que uno con menos. Y no se asegura que habiendo hilos de más prioridad se ejecuten en algún momento los de prioridad inferior.
*   si hay varios hilos de igual prioridad, todos deben ejecutarse en algún momento.

Como norma general, cuando se crea un nuevo hilo, éste hereda la prioridad del hilo desde el que ha sido creado, aunque dicha prioridad se puede modificar.

Para la gestión de la prioridad existen los métodos getPriority() y setPriority(int). Sus valores de asignación serán entre Thread.MIN_PRIORITY (1) y Thread.MAX_PRIORITY (10). Thread.NORM_PRIORITY tiene un valor de 5, y será la asignada por defecto al hilo creado por la JVM para arrancar la función main().


Métodos básicos
===============

### De objeto (no estáticos)

#### `public long getId()`

Devuelve el identificador del hilo, un número entero positivo generado en su creación. Este identificador es único y permanece sin cambios durante toda su vida. Cuando un hilo termina su ejecución, dicho identificador podría reutilizarse.

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

Provoca que el hilo comience su ejecución; la máquina virtual Java (JVM) llama a su método `run`. El resultado es que dos hilos se ejecutan concurrentemente: el hilo actual (que vuelve de la llamada al método `start`) y el otro hilo (que ejecuta su método `run`).

#### `public void interrupt()`

Interrumpe el hilo. A no ser que el hilo actual se interrumpa a sí mismo, lo cual siempre está permitido, se invoca al método `checkAccess` de este hilo, lo cual puede causar el lanzamiento de una `SecurityException`.

#### `public boolean isInterrupted()`

Devuelve si el hilo ha sido interrumpido. El estado de interrupción de un hilo no se ve alterado por este método.

#### `public final void join()`

Espera a que el hilo muera.

#### `public final ThreadGroup getThreadGroup()`

Devuelve el grupo al que pertenece este hilo. Este método devuelve `null` si el hilo ha muerto.

De clase (estáticos)
================

### `public static void sleep(long millis) throws InterruptedException`

Hace que el hilo que está actualmente en ejecución se vaya a dormir el tiempo indicado en el parámetro (sujeto a la precisión que pueda ofrecer el sistema). El hilo no pierde la propiedad de sus bloqueos (ver más adelante). Debe capturar una `InterrupedException` por si al hilo lo interrumpen con el método `interrupt()`.

### `public static void yield()`

Pausa temporalmente el hilo en ejecución, se activa el planificador y carga otro hilo para ejecución (que podría volver a ser el mismo). Es decir, pasa el hilo actual de `Running` a `Runnable` y decide quién es el siguiente.

### `public static Thread currentThread()`

Devuelve una referencia al hilo que se está en ese momento en ejecución.

### `public static boolean interrupted()`

Devuelve `true` si el hilo actual ha sido interrumpido, `false` en caso contrario. El estado de interrupción del hilo se libera con la llamada a este método. En otras palabras, si este método se llama dos veces seguidas, la segunda llamada devolverá `false` (a no ser que el hilo actual fuera interrumpido de nuevo, después de que la primera llamada liberara su estado de interrupción y antes de que la segunda llamada lo examinara).

Sincronización
==============

Cuando queremos sincronizar un cierto código (denominado sección crítica), es decir, cuando queremos asegurar que sólo existe un hilo accediendo simultáneamente a cualquier código sincronizado de ese objeto, pues lo metemos en un bloque `synchronized` de la siguiente manera:

```java
public void f() {
    ...
    synchronized (objeto) {
        // código sincronizado
    }
    ...
}
```

Se dice que todo objeto Java tiene un candado (cerrojo, lock, monitor lock …), y cuando un hilo adquiere la llave del candado, tiene su acceso exclusivo. Los hilos que intenten acceder a un objeto a través de un código sincronizado deberán tener la llave y, en caso contrario, esperarán hasta que se libere.

Es decir, cuando un hilo quiere acceder a un bloque sincronizado, se pone a la espera si ya hay otro hilo ejecutando cualquier código sincronizado para ese objeto (ese código u otro). O sea, dos o más métodos sincronizados nunca se ejecutarán simultáneamente sobre el mismo objeto (exclusión mútua). Aunque obviamente puede ser que un mismo hilo esté ejecutando un método sincronizado y llame a otro distinto (mientras tiene el lock).

Al sobreescribir un método de una clase, éste se puede declarar sincronizado o no, con independencia de cómo era en su clase superior.

Hay que tener en cuenta que si se va a sincronizar todo el método para el objeto actual, es más fácil declarar `synchronized` en la definición de la función.

```java
public void f() {
    synchronized (this) {
        // código sincronizado
    }
}
```

es lo mismo que:

```java
public synchronized void f() {
    // código sincronizado
}
```


Coordinación/Señalización
==========================

El mecanismo de sincronización del código de acceso a un objeto nos permite asegurar la
atomicidad a la hora de la ejecución de secciones críticas de código. Así sabremos que no se
intercalan ejecuciones de distintos hilos accediendo al estado de un mismo objeto, pudiendo
dejarlo en un estado inconsistente o erróneo.

Pero existen otros métodos (existentes en `Object` y por lo tanto heredados por todos los
objetos), que nos permiten avisos entre hilos para evitar que estén continuamente interrogando
sobre la disponibilidad de un recurso y, por lo tanto, consumiendo ciclos de CPU. Es decir, evitar
código del tipo `while (!condiciónQueQuiero) ;`

Las llamadas a estos métodos sólo podrán realizarse cuando un hilo sea “propietario” de un
objeto, o sea, que sólo se podrán ejecutar en código sincronizado.

`wait()` y `notify()`
--------------------

El método `wait()` pone el hilo que está accediendo al objeto en espera y, obviamente, liberará
la llave del candado. Por lo tanto el objeto sincronizado deja de estar bloqueado y otros hilos
podrán usarlo. El hilo estará esperando indefinidamente a que lo avisen para continuar su
ejecución.

La versión sobrecargada del método permite que el hilo espere a que lo avisen hasta un
máximo de los milisegundos indicados. Una vez se supere ese tiempo se pondrá a las órdenes del
planificador para entrar en la CPU de nuevo.

El método `wait()` se suele usar cuando esperamos por alguna condición que depende de
alguna condición externa. En ese caso es mejor ponerse a descansar que estar interrogando
continuamente la condición, lo cual consume muchos ciclos de CPU que pueden ser útiles para
otros procesos.

`notify()` y `notifyAll()`
-------------------------

Cuando algún hilo haga un `notify()` sobre un objeto, el planificador avisará a un hilo que esté
esperando por dicho objeto, el bloque sincronizado volverá a estar ocupado y seguirá la ejecución
a continuación del `wait()` que lo mandó a esperar.

Cada llamada a `notify()` despierta al hilo que toca (puede haber varios esperando). En teoría
habría que hacer tantos `notify()` como `wait()` para despertarlos a todos. El hilo al que el planificador
despierta no está asegurado y dependerá de la implementación concreta de la JVM utilizada.

Se puede utilizar `notifyAll()` para despertar a todos los hilos que esperan (sobre el mismo
objeto). El planificador decidirá cuál de ellos entra en la CPU. El resto se ejecutarán en su momento
y dependiendo de sus condiciones pues podrán volver a esperar o bien continuar.

Esperando el final de un hilo
---------------------------

`join()`
---------

Espera a que el hilo sobre el que se hizo el `join()` se muera

Ejemplo:
```java
public class Hilo extends Thread {
    @Override
    public void run() {
        for(int i=0; i<10; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ex) { }
            System.out.println("Hilo trabajando");
        }
    }

    public static void main(String[] args) {
        Hilo t = new Hilo();
        t.start();
        for(int i=0; i<10; i++) {
            try {
                Thread.sleep(500);
                System.out.println("Voy haciendo otras cosas por aquí ... ");
            } catch (InterruptedException ex) { }
        }
        try {
            t.join();
        } catch (InterruptedException ex) { }
        System.out.println("Trabajo importante asumiendo que el hilo acabó");
    }
}
```
Salida del código:
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

Ejemplo de código
-----------------

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
        try { Thread.sleep(1000); } catch (InterruptedException ex) {}
        h1.interrupt();
        System.out.println("Fin main");
    }
}
```

Hilos demonio (daemon)
----------------------

Los hilos demonio son aquellos que realizan tareas en segundo plano necesarias para el funcionamiento de la aplicación, pero no imprescindibles en su lógica de programa (comprobar si se pulsa un botón, por ejemplo).

Una aplicación Java finaliza cuando no queda ningún hilo, o bien todos los hilos que quedan son de tipo demonio.

Para establecer e interrogar a un hilo sobre si es un demonio se utilizan las instrucciones setDaemon (boolean) y isDaemon() respectivamente.

Ejemplo de código
-----------------

```java
public class Daemon {
    public static void main(String[] args) {
        new Hilo(true).start();
        //new Hilo(false).start();
        try {
            Thread.sleep(3500);
        } catch (InterruptedException e) {}
        System.out.println("Fin Main") ;
    }
}
class Hilo extends Thread {
    public Hilo(boolean esDemonio) {
        setDaemon(esDemonio) ;   
    }
    public void run() {
        int count=0 ;
        while (count<10) {
            System.out.println(((isDaemon())?"DEMONIO ":"HILO ") + count++) ;
            try {
                sleep(1500);
            } catch (InterruptedException e) { }
        }
    }
}
```

Grupos de hilos (ThreadGroup)
-----------------------------

Todos los hilos de Java forman parte de un grupo. Por defecto están en el grupo de su hilo creador, pero se puede indicar otro grupo cualquiera en su constructor.

Para obtener el grupo de un hilo concreto, podemos utilizar el siguiente método:

```java
public final ThreadGroup getThreadGroup()
```

Devuelve el ThreadGroup al que pertenece el hilo. Devuelve null si el hilo está muerto.

Obviamente, en una aplicación donde no se indique nada al respecto, todos los hilos estarán en el grupo del hilo principal (main), el que se crea al arrancar la aplicación.

Para crear un grupo de Threads utilizaremos alguno de sus constructores:

```java
public ThreadGroup(String name)
public ThreadGroup(ThreadGroup parent, String name)
```

La principal utilidad de la existencia de los grupos es manejar varios hilos como un solo objeto, llamando a métodos que se apliquen directamente a todos ellos. Ejemplos de estos métodos podrían ser los siguientes:

```java
public final void interrupt()
public final void setMaxPriority(int pri)
```


Librería de concurrencia de alto nivel
=====================================

Los mecanismos vistos hasta el momento permiten un control preciso a bajo nivel de todos
los detalles de los hilos. En todo caso, a partir de la versión 5 de la plataforma Java, se introdujo el
paquete  java.util.concurrent que  proporcionan  nuevas  estructuras  para  manejar  múltiples
estructuras concurrentes de una manera más adecuada.

Objetos con operaciones atómicas
-------------------------------

Las clases java.util.concurrent.atomic.Atomic* nos permiten crear objetos que  almacenan
dato(s) de un tipo primitivo y cuyas operaciones ya están protegidas ante accesos simultáneos de
varios hilos, sin necesidad de que el programador indique los bloques de código sincronizados.

Algunas de las clases existentes son AtomicBoolean, AtomicInteger, AtomicLong, AtomicReference.
Algunos de los métodos que tienen en común son los siguientes:

*   get()
*   getAndAdd (valorSumar)
*   addAndGet(valorSumar)
*   incrementAndGet()
*   getAndIncrement()
*   decrementAndGet()
*   getAndDecrement()
*   set(valor)
*   getAndSet(valor)
*   boolean compareAndSet(valorSiIgual, nuevoValor)

Otras clases existentes son AtomicIntegerArray, AtomicLongArray y AtomicReferenceArray, que nos
permiten almacenar un array de valores de su tipo primitivo, y donde los métodos son similares a
los anteriormente indicados, con la excepción de un primer parámetro que indica la posición del
array en donde se va a realizar la operación.

Semáforos
------------

java.util.concurrent.Semaphore nos permite limitar el número de hilos concurrentes accediendo a
un recurso específico.  Su funcionamiento sería similar a lo que conseguimos con un bloque
sincronizado, donde solo puede entrar un hilo, pero en este caso con un número máximo de ellos.

Semaphore(int permits) // se indica el n.º máximo de permisos de acceso
void acquire()
// adquiere un permiso, bloqueándose hasta que se obtiene (o el hilo es interrumpido)
void release()
// libera un permiso, devolviéndoselo al semáforo para que lo use otro hilo

Ejemplo: Implementaciones del productor/consumidor
---

Ejemplo INCORRECTO - 1 productor y 1 consumidor consumiendo 1 dato

Los hilos entran y salen de la CPU en cualquier momento y puede interrumpirse la ejecución
de algún conjunto de instrucciones que deban ejecutarse de manera atómica (marco que he leído
y aún no lo he hecho, leo y aún no he marcado que he leído, marco que he escrito y aún no lo he
hecho, etc.). De esa manera pueden escribirse dos datos seguidos, perdiendo el primero de ellos,
puedo leer dos veces el mismo datos, etc.

```java
public class Principal {
public static void main(String[] args)
{
Buffer datos = new Buffer();
Productor productor = new Productor(datos, VelocidadAcceso.RAPIDO);
Consumidor consumidor = new Consumidor(datos, VelocidadAcceso.LENTO);
productor.start();
consumidor.start();
}
}
```

```java
public class Productor extends Thread
{
Buffer buffer;
VelocidadAcceso velocidad;
public Productor(Buffer buffer, VelocidadAcceso velocidad)
{
this.buffer=buffer;
this.velocidad=velocidad;
}
@Override
public void run() 
{
for(int i=0;i<10;i++)
{
while(buffer.disponible)
try {
Thread.sleep(velocidad.getMilisegundos());
} catch (InterruptedException e) {}
buffer.put(""+i);
System.out.println("Producido: " + i);
}
}
}
```

```java
public class Consumidor extends Thread
{
Buffer buffer;
VelocidadAcceso velocidad;
public Consumidor(Buffer buffer, VelocidadAcceso velocidad)
{
this.buffer=buffer;
this.velocidad=velocidad;
}
@Override
public void run() 
{
for(int i=0;i<10;i++)
{
while(!buffer.disponible)
try {
Thread.sleep(velocidad.getMilisegundos());
} catch (InterruptedException e) 
{}
System.out.println("Consumido: " + buffer.get());
}
}
}
```

```java
public class Buffer 
{
private String str;
boolean disponible = false;
public String get()
{
disponible=false;
return str;
}
public boolean put(String str)
{
if(disponible)
return false;
this.str=str;
disponible=true;
return true;
}
}
```

```java
enum VelocidadAcceso 
{ 
LENTO(1000), RAPIDO(100);
private int milisegundos;
VelocidadAcceso(int milisegundos)
{
this.milisegundos=milisegundos;
}
public int getMilisegundos()
{
return milisegundos;
}
};
```

Ejemplo correcto  - 1 productor y 1 consumidor consumiendo 1 dato

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

```java
public class Consumidor extends Thread{
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
} catch (InterruptedException e) {
}
}
}
}
```

```java
enum VelocidadAcceso {
LENTO(1000), RAPIDO(100), INMEDIATO(0), ALEATORIO(-1);
private int milisegundos;
VelocidadAcceso(int milisegundos) {
this.milisegundos = milisegundos;
}
public int getMilisegundos() {
if (milisegundos>=0)
return milisegundos;
return new Random().nextInt(LENTO.getMilisegundos());
}
}
```


# Ejemplo de Productor-Consumidor

## Introducción

El problema del productor-consumidor es un patrón de diseño que se utiliza para resolver el problema de sincronización entre procesos que producen y consumen datos. En este ejemplo, se muestra cómo implementar un productor-consumidor utilizando Java.

## Clase Buffer

La clase `Buffer` es responsable de almacenar los datos producidos por el productor y consumidos por el consumidor. La clase utiliza un objeto `ArrayList` para almacenar los datos y proporciona métodos para agregar y eliminar datos del buffer.

```java
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
        while (!hayDatos())
            wait();
        int dato = lista.remove(0);
        System.out.print(nombreHilo + " GET " + dato + " ");
        System.out.println(lista);
        notify();
        return dato;
    }

    public synchronized void put(String str) throws InterruptedException {
        while (!cabenMasDatos())
            wait();
        int nuevoDato = random.nextInt(100);
        lista.add(nuevoDato);
        System.out.print("PUT " + nuevoDato + " ");
        System.out.println(lista);
        notify();
    }
}
```

## Clase Productor

La clase `Productor` es responsable de producir datos y agregarlos al buffer. La clase utiliza un objeto `Thread` para ejecutar el método `run()` que produce datos y los agrega al buffer.

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
        for (int i = 0; i < 15; i++) {
            try {
                buffer.put();
                sleep(velocidad.getMilisegundos());
            } catch (InterruptedException e) {
            }
        }
    }
}
```

## Clase Consumidor

La clase `Consumidor` es responsable de consumir datos del buffer. La clase utiliza un objeto `Thread` para ejecutar el método `run()` que consume datos del buffer.

```java
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
```

## Enum VelocidadAcceso

El enum `VelocidadAcceso` es utilizado para definir las velocidades de acceso al buffer. La clase proporciona métodos para obtener el tiempo de acceso en milisegundos.

```java
enum VelocidadAcceso {
    LENTO(1000), RAPIDO(100), INMEDIATO(0), ALEATORIO(-1);

    private int milisegundos;

    VelocidadAcceso(int milisegundos) {
        this.milisegundos = milisegundos;
    }

    public int getMilisegundos() {
        if (milisegundos >= 0)
            return milisegundos;
        return new Random().nextInt(LENTO.getMilisegundos());
    }
};
```

## Clase Principal

La clase `Principal` es responsable de crear un objeto `Buffer` y varios objetos `Productor` y `Consumidor`. La clase utiliza un objeto `Thread` para ejecutar el método `run()` que crea y ejecuta los hilos.

```java
public class Principal {
    public static void main(String[] args) {
        final int NUM_CONSUMIDORES = 3;
        Buffer datos = new Buffer();
        Productor productor = new Productor(datos, VelocidadAcceso.RAPIDO);
        productor.start();
        for (int i = 0; i < NUM_CONSUMIDORES; i++)
            new Consumidor("H" + i, datos, VelocidadAcceso.ALEATORIO).start();
    }
}
```

## Ejemplo de Uso

El ejemplo de uso se muestra en la clase `Principal`. La clase crea un objeto `Buffer` y varios objetos `Productor` y `Consumidor`. La clase utiliza un objeto `Thread` para ejecutar el método `run()` que crea y ejecuta los hilos.

```java
public class Principal {
    public static void main(String[] args) {
        final int NUM_CONSUMIDORES = 3;
        Buffer datos = new Buffer();
        Productor productor = new Productor(datos, VelocidadAcceso.RAPIDO);
        productor.start();
        for (int i = 0; i < NUM_CONSUMIDORES; i++)
            new Consumidor("H" + i, datos, VelocidadAcceso.ALEATORIO).start();
    }
}
```

## Conclusión

En este ejemplo, se muestra cómo implementar un productor-consumidor utilizando Java. La clase `Buffer` es responsable de almacenar los datos producidos por el productor y consumidos por el consumidor. La clase `Productor` es responsable de producir datos y agregarlos al buffer. La clase `Consumidor` es responsable de consumir datos del buffer. El enum `VelocidadAcceso` es utilizado para definir las velocidades de acceso al buffer. La clase `Principal` es responsable de crear un objeto `Buffer` y varios objetos `Productor` y `Consumidor`.
