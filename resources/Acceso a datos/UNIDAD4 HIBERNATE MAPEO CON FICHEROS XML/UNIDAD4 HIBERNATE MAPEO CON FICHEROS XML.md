

# Unidad 4: HIBERNATE Mapeo con ficheiros xml

## C.S. de Desenvolveento de Aplicacions Multiplataforma

### UNIDAD 4: HIBERNATE -ficheiros de mapeo

#### Índice

1. Estrutura dos ficheiros de Hibernate para o mapeo obxecto-relacional. Clases persistentes e mapeo
2. Estratexias no mapeo. Entidades e Tipos Valor
	* 2.1 Entidades
	* 2.2 Tipo Valor
	* 2.3 Mapeamento de coleccións
		+ 2.3.1 Atributos comúns dos elementos de colección
		+ 2.3.2 Etiqueta Key. Mapeo da clave foránea
		+ 2.3.3 Mapeo dos elementos da colección
		+ 2.3.4 Mapeo dun Set
		+ 2.3.5 Mapeo dunha lista
		+ 2.3.6 Mapeo dun Map
		+ 2.3.7 Mapeamento dun bag e ibag
		+ 2.3.8 Colección ordenada (Ordered collection)
		+ 2.3.9 Colección de compoñentes
		+ 2.3.10 Navegación bidireccional nas coleccións de compoñentes
	* 2.4 Mapeo de clase compoñente: Composición.
	* 2.5 Relacións entre entidades: Asociacións
		+ 2.5.1 Características das relacións
		+ 2.5.2 Estratexias de carga dos obxectos.
		+ 2.5.3 Representación das asociacións
		+ 2.5.4 Asociación One-to-One
		+ 2.5.5 Asociación One-to-Many ou Many-to-One
		+ 2.5.6 Asociación Many-to-Many
		+ 2.5.7 Asociación Many-to-Many con atributos propios na relación
		+ 2.5.8 Persistencia transitiva
	* 2.6 Mapeamento da herdanza (xerarquías)
		+ 2.6.1 Táboa por cada suclase concreta
		+ 2.6.2 Táboa por clase concreta con unións
		+ 2.6.3 Táboa por xerarquía
		+ 2.6.4 Táboa por clase

### Unidad 4: HIBERNATE-Herramienta ORM

#### 1. Estrutura dos ficheiros de Hibernate para o mapeo obxecto-relacional. Clases persistentes e mapeo

Hibernate ten dous ficheiros importantes que permiten o mapeo entre os obxectos Java e as táboas do SXBD relacional e son:

* As clases Java (a estas clases Hibernate refírese como POJOS), que representan os obxectos que teñen unha correspondencia coas táboas da base de datos relacional.
* O ficheiro de mapeo (.hbm.xml), que indica o mapeo entre os atributos dunha clase e os campos da táboa relacional coa que está relacionado.

Nota: Hai outra alternativa para especificar o mapeo entre os obxectos java e as táboas, que é utilizar Anotacións JPA sobre as clases persistentes, en vez do ficheiro xml de mapeo. Nesta actividade imos utilizar os ficheiros de mapeo XML.

#### 1.1 Clases persistentes

As clases persistentes son clases que nunha aplicación implementan as entidades do problema empresarial (por exemplo: Cliente, Pedido, etc). Representan os obxectos nunha aplicación que use Hibernate e correspóndense coa información almacenada nun SXBD relacional.

Hibernate traballa con estas clases, sempre e cando sexan POJOS (Plain Old Java Object.- Obxectos Simples ). Estas clases deben cumprir as especificacións JavaBeans:

* Implementar un construtor sen argumentos.
* Proporcionar unha propiedade identificadora (opcional).
* Métodos getter e setter para cada atributo.
* Implementar a interface Serializable. Non é obrigatorio implementar esta interface, pero si recomendable.

![imagen_2_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_2_1.png)

Exemplo simple de POJO:

Unidad 4: HIBERNATE-Herramienta ORM

O atributo "id" manterá un valor único que identificará a cada unha das instancias de "Persoa". Todas as clases de entidades persistentes deben ter unha propiedade que sirva como identificador, se queremos usar o conxunto completo de funcionalidades que nos ofrece Hibernate.

#### 1.2 Ficheiro de mapeo

Establece a correspondencia entre os obxectos java e as táboas da base de datos. Asignaráselle o nome da clase, seguido da extensión .hbm.xml.

Os ficheiros de mapeo que se utilizan na aplicación, defínense en hibernate.cfg.xml, indicando a ruta onde se atopan estes.

Para cada clase que se queira facer persistente (por exemplo, a clase Persoa) na base de datos, crearase un ficheiro XML, coa información que permitirá mapear esta clase a unha táboa da base de datos relacional.

Exemplo simple de ficheiro Persoa.hbm.xml, que realiza o mapeo á táboa Persoa almacenada no SXBD SQL Server :

![imagen_3_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_3_1.png)

![imagen_3_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_3_2.png)


# Unidad 4: HIBERNATE-Herramienta ORM

## Elementos del archivo XML de mapeo

### Doctype

Todos los mapeos XML deben declarar el tipo de documento DTD.

![imagen_4_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_4_1.png)

### Mapeo de Hibernate: <Hibernate-mapping>

Él es el elemento raíz que contiene todos los elementos <class>. Dentro de él se declaran las clases de objetos persistentes.

![imagen_4_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_4_2.png)

### Atributos del elemento hibernate-mapping

- **schema** (opcional): Nombre de un esquema de la base de datos. Si se especifica, los nombres de las tablas se cualifican con el nombre del esquema dado. Si se omite, los nombres de las tablas no se cualifican.
- **catalog** (opcional): Nombre de un catálogo de la base de datos. Si se especifica, los nombres de las tablas se cualifican con el nombre del catálogo dado.
- **default-cascade** (opcional, valor por defecto es none): Estilo de cascada por defecto. Define cómo los cambios en el objeto afectan a los objetos relacionados con él.
- **default-access** (opcional, valor por defecto es property): Estrategia que Hibernate debe utilizar para acceder a los datos de la clase.
- **default-lazy** (opcional, valor por defecto es true): Especifica si se debe cargar la información de la tabla relacionada de manera diferida o no.
- **auto-import**: Si está activada, se puede usar nombres de clases no cualificados en la consulta.
- **package**: Permite especificar un prefijo de paquete que se debe usar para los nombres de clase no cualificados en el documento de mapeo.

### Clase <class name>

El elemento class declara una clase persistente que se va almacenar en la base de datos, sus atributos y su relación con la tabla de la base de datos.

![imagen_5_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_5_1.png)

### Atributos de la clase

- **name**: Nombre completamente cualificado de la clase Java.
- **table** (opcional): Nombre de la tabla en la base de datos a la que se está mapeando la clase. Si no se especifica, Hibernate usará el nombre de la clase.
- **mutable** (opcional - true por defecto): Especifica si las instancias son mutables o no.
- **schema** y **catalog**: Opciones que se usan para especificar el esquema y el catálogo de la base de datos, respectivamente.
- **proxy** (opcional): Especifica una interfaz o clase a utilizar para los proxies de preguiceira (lazy).
- **lazy** (opcional): Permite deshabilitar la recuperación preguiceira.
- **dynamic-update** (opcional - false por defecto): La sentencia SQL UPDATE se genera en tiempo de ejecución, y si es false, solo contiene las columnas con valores que cambian.
- **dynamic-insert** (opcional - false por defecto): La sentencia SQL INSERT se genera en tiempo de ejecución, y si es false, solo contiene las columnas con valores distintos a null.
- **select-before-update** (opcional - false por defecto): Se produce una sentencia SELECT antes de actualizar para comprobar si un objeto ha sido modificado y la actualización es necesaria.
- **entity-name** (opcional - por defecto el nombre de la clase): Nombre que se usa en lugar del nombre de la clase.
- **optimistic-lock** (opcional - versión por defecto): El bloqueo optimista es una estrategia que Hibernate usa para manejar el problema de concurrencia en la base de datos.
- **rowid** (opcional): Indica que identificador de columna debe ser usado.


Unidad 4: HIBERNATE-Herramienta ORM

Podes usar o rowid para recuperar unha fila específica de forma moi eficiente. Non obstante, o uso de rowid é bastante específico da base de datos e non é portátil entre diferentes sistemas de xestión de bases de datos.

### Subselect (opcional)

Permite mapear unha entidade a unha subconsulta da base de datos. Isto é especialmente útil cando queres mapear a túa clase a unha vista en lugar dunha táboa.

```xml
<class name="com.mipaquete.Usuario" entity-name="UsuarioSubselect">
    <subselect>
        SELECT * FROM USUARIO WHERE ID > 100
    </subselect>
    <!-- máis configuracións aquí -->
</class>
```

A clase Usuario está mapeada a unha subconsulta que selecciona todos os usuarios cuxo ID é maior que 100. Isto significa que cando cargues instancias da clase Usuario, Hibernate executará esa subconsulta e só obterás os usuarios cuxo ID é maior que 100.

Un uso común para isto sería cando queres traballar con un subconxunto dos datos que cumpren certas condicións, pero non queres ou non podes crear unha vista na base de datos para iso. Neste caso, podes usar Subselect para definir a subconsulta directamente na túa clase de entidade.

### Declaración columna de clave primaria

As clases mapeadas teñen que declarar a columna de clave primaria da táboa da base de datos.

![imagen_7_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_7_1.png)

Hibernate necesita coñecer cal é a estratexia elixida para a xeración de claves primarias. Moitas bases de datos usan claves primarias naturais, claves que teñen un significado no mundo real (CIF, NSS, ...). Nalgúns casos as claves naturais están compostas de varias columnas, o que fai o mantemento, consultas e a evolución do sistema máis difícil.  Unha recomendación é utilizar claves artificiais (ou suplentes), que non teñen significado para a aplicación e que son xeradas automaticamente polo sistema, e definir restricións de unicidade nas claves naturais.

### Elemento <id>

O elemento que define o mapeo da columna de clave primaria é a etiqueta <id>. Sintaxe:

![imagen_7_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_7_2.png)

- name (opcional): Nome do atributo da clase persistente que vai ser un identificador. Si se omite name, asúmese que a clase non ten propiedade identificadora.
- type (opcional): Nome que indica o tipo de datos de Hibernate.
- column (opcional - por defecto é o nome do atributo): Nome da columna de clave primaria na base de datos.
- access (opcional - property por defecto): Estratexia de acceso ao valor da propiedade.
- generator (opcional): Ao establecer unha clave primaria, débese especificar a forma en que esta se xera. Hibernate ten implementada varias formas de xerar a clave primaria, pero non todas as formas son portables a todos os SXBD.

### Estratexias de xeración de claves primarias

Hibernate ten implementada varias formas de xerar a clave primaria, pero non todas as formas son portables a todos os SXBD. Todos os xeradores implementan a interface org.hibernate.id.IdentifierGenerator. Algúns xeradores incorporados son os seguintes:

- assigned: Esta estratexia permite á túa aplicación asignar o valor do identificador. Deixa á aplicación asignar un identificador ao obxecto antes de que se chame ao método save(). Esta é a estratexia por defecto se non se especifica un elemento <generator>.
- increment: Esta estratexia xera identificadores incrementais. Cada vez que necesitas un novo identificador, Hibernate incrementa o valor máximo actual na columna do identificador.
- identity: Esta estratexia usa columnas de identidade proporcionadas pola base de datos.
- sequence: Esta estratexia usa secuencias de base de datos para xerar identificadores.
- hilo e seqhilo: Estas estratexias usan un algoritmo “high/low” para xerar identificadores de forma eficiente.
- uuid e guid: Estas estratexias xeran identificadores únicos a nivel global.
- native: Esta estratexia permite a Hibernate escoller a mellor estratexia baseándose nas capacidades da base de datos.
- select e foreign: Estas estratexias son un pouco diferentes. select recupera un identificador asignado por un disparador da base de datos, mentres que foreign usa o identificador dun obxecto asociado.

### Claves compostas

Define claves compostas por varios campos. Hai varias alternativas para definir un identificador composto e a máis recomendada é a de implementalo como unha clase compoñente aparte.

![imagen_8_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_8_1.png)

- name (obrigatorio para esta alternativa): Nome da propiedade que contén o identificador composto.
- class (opcional): A forma de implementar unha clave composta en Hibernate é a través dunha clase. Esta propiedade indica o nome da devandita clase que conterá atributos para cada unha das columnas que compoñen a clave.
- access (optativo, por defecto, property): Estratexia que Hibernate debería usar para acceder ao valor das propiedades.
- key-property: Dentro da etiqueta composite-id, indica cada un dos campos que forman a clave e que corresponden ás claves foráneas doutras táboas.

### Propiedade

O elemento <property> declara unha propiedade dunha clase persistente, estilo JavaBean da clase.

![imagen_9_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_9_3.png)

Algúns dos seus atributos son:

![imagen_9_4.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_9_4.png)

Espero que esto te sea útil. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!


Unidad 4: HIBERNATE-Herramienta ORM

### Propiedades de la clase

- **name**: Nombre de la propiedad, con la letra inicial en minúscula.
- **column** (opcional - por defecto es el nombre de la propiedad): Nombre de la columna de la tabla de base de datos mapeada.
- **type** (opcional): Nombre que indica el tipo de datos de Hibernate.
- **update, insert** (opcional - por defecto es true): Especifica que las columnas mapeadas deben ser incluidas en las declaraciones SQL UPDATE y/o INSERT.
- **formula** (opcional): Expresión SQL que define el valor para una propiedad calculada.
- **lazy** (opcional - por defecto es false): Especifica que se debe recuperar preguiceiramente esta propiedad cuando se acceda por primera vez a la variable de instancia.
- **unique** (opcional): Restricción de unicidad para la columna.
- **not-null** (opcional): Restricción de nulabilidad para la columna.
- **generated** (opcional - por defecto es never): Especifica que el valor de la propiedad es generado por la base de datos.

### Tipos de datos Hibernate

El mapeo implica la conversión entre tipos de datos de JAVA y tipos de datos SQL. Hibernate gestiona esta conversión por medio de sus propios tipos de datos para mapeo. Cada tipo Hibernate tiene un equivalente en JAVA y en ANSI SQL.

Mediante el “dialecto SQL” del SXBD, Hibernate adaptará sus tipos de datos nativos a los tipos de datos SQL. Así consíguese independencia frente a un SXBD específico. También se pueden usar tipos Java, o incluso no indicados, pero es menos convincente.

![imagen_10_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_10_1.png)

### Estrategias en el mapeo

#### Entidades

- Un objeto de tipo de entidad tiene una identidad propia en la base de datos (valor de clave principal).
- Una referencia de objeto a una instancia de entidad es persistido como una referencia en la base de datos (un valor de clave externa).
- La entidad tiene su propio ciclo de vida, y puede existir independientemente de cualquier otra entidad.

#### Tipo Valor (compoñente)

- Un objeto de tipo valor no tiene una identidad de base de datos, sino que pertenece a una instancia de entidad y su estado persistente incrústase en la fila de la tabla a la que pertenece.
- Objetos persistentes sin identidad propia (ni tabla propia).
- Los tipos de valor no tienen identificadores o propiedades identificadoras.
- La vida útil de una instancia de tipo de valor está limitada por la vida útil de la pertenencia a instancias de entidad.
- Un tipo de valor no es compatible con referencias compartidas.

#### Mapeo de colecciónes

Hibernate ofrece distintas formas para almacenar colecciónes. Cuando Hibernate almacena una colección, almacena también toda la semántica asociada al su interface. Por ejemplo, cuando una lista (interface List) es almacenada, el índice que identifica la orden también es almacenado. De esta forma cuando esta sea recuperada de la base de datos su comportamiento será idéntico al inicial.

Hibernate soporta las colecciónes que se amosan en la siguiente tabla:

![imagen_12_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_12_1.png)

Los arrays están soportados por Hibernate con `<primitive-array>` (para tipos primitivos Java) y `<array>` (para otros) pero úsanse raramente.


Unidad 4: HIBERNATE-Herramienta ORM

Hibernate recomienda usar interfaces en las declaraciones de tipo de colecciones Java para poder realizar el mapeo de las colecciones correctamente. El procedimiento recomendado es:

- Usar una interfaz para declarar el tipo de la colección (ex: Set).
- Crear una clase que implemente la interfaz (ex: HashSet) e inicializarla en la declaración sin esperar a hacerlo en el constructor o en algún método setter. Este es el método recomendado.

La sintaxis para declarar una propiedad de colección es:

```java
private <Interface> nombreColeccion = new <Implementación>();
```

...

/ / Los métodos getter y setter

Ejemplo:

![imagen_13_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_13_1.png)

Las colecciones pueden contener: tipos básicos, entidades y compoñentes. No se pueden crear colecciones de colecciones.

2.3.1 Atributos comunes de los elementos de colección

La mayoría de los elementos de colección comparten atributos que se muestran a continuación:

![imagen_13_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_13_2.png)

- name: Nombre de la propiedad colección.
- table: Nombre de la tabla de la base de datos que contiene la relación.
- schema: Nombre del esquema de la base de datos.
- lazy (opcional - por defecto es false): Especifica que se debe recuperar preguiceiramente esta propiedad cuando se acceda por primera vez a la variable de instancia.
- inverse (defecto false): Declárase en las relaciones un a muchos o muchos a muchos. Sirve para decidir qué de las dos relaciones es la propietaria para manejar la relación y hacer las operaciones de inserción y actualización en la columna foránea. En el caso de las relaciones muchos a muchos es necesario poner un lado de la relación con el valor true y el otro con el valor false.

Unidad 4: HIBERNATE-Herramienta ORM

- cascade (opcional- por defecto none): Indica la acción a determinar con los objetos relacionados cuando en el objeto padre se realiza una operación de actualización (inserción, borrado o modificación).
- order-by (opcional): Nombre de columna que define la orden de iteración.
- where (opcional): Condición WHERE a utilizar cuando se recuperan o eliminan objetos de la colección.
- fetch (opcional - select por defecto): Elije entre buscar mediante outer join o por select secuencial.
- batch-size (opcional -por defecto 1): Especifica el número de elementos de la colección que se pueden recuperar cuando se instancia la clase por la propiedad identificadora.
- access (opcional - property por defecto): Estrategia utilizada para acceder a la propiedad.
- optimistic-lock (opcional - true por defecto): Establece estrategia de bloqueo optimista.
- mutable (opcional - true por defecto): Establece si los elementos de la colección pueden cambiar o no.

2.3.2 Etiqueta Key. Mapeo de la clave foránea

Indica la clave foránea de la tabla referenciada. Sus atributos son:

![imagen_14_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_14_1.png)

- column: Nombre de la columna de la clave foránea.
- on-delete (opcional - por defecto es no action): Con el valor true se especifica que la restricción de clave foránea tiene el borrado en “cascade” activado a nivel de base de datos.
- property-ref (opcional): Especifica que la clave foránea referencia columnas que no son la clave principal de la tabla original. Proporciónase para los datos heredados.
- not-null (opcional): Con el valor true se especifica que las columnas de la clave foránea son no nulables. Esto se aplica cuando la clave foránea también es parte de la clave principal. También hay que declararlo a true en una relación un a muchos unidireccional si la clave foránea no admite valores nulos.
- update (opcional): Con el valor false se especifica que la clave foránea nunca se debe actualizar. Esto se aplica cuando la clave foránea también es parte de la clave principal.
- unique (opcional): Con el valor true se especifica que la clave foránea debe tener una restricción de unicidad.

2.3.3 Mapeo de los elementos de la colección

Las colecciones pueden contener: tipos básicos, compoñentes y referencias a otras entidades.

Un elemento en una colección puede ser manejado como:

Unidad 4: HIBERNATE-Herramienta ORM

- Tipo valor: su ciclo de vida depende completamente del objeto propietario de la colección. Los tipos básicos, los personalizados y los compoñentes se mapean como este tipo. Estos elementos se mapean con <element> para los tipos básicos o <composite-element> para los compoñentes.
- Referencia a otra entidad: tienen su propio ciclo de vida. Son las asociaciones entre objetos. Se mapean con <one-to-many> o <many-to-many>.

2.3.4 Mapeo de un Set

Una colección de entidades Set se mapea con el elemento <set>. Esta colección no permite elementos duplicados y no es necesario un índice ya que los elementos están sin ordenar.

Ejemplo:

![imagen_15_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_15_1.png)

El diagrama de clases UML es:

![imagen_15_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_15_2.png)

Las relaciones entre clase, en la programación OO, se representan mediante referencias a objetos y colecciones de referencias a objetos. A través de estas referencias, podemos navegar desde un objeto a otro. En este ejemplo, estamos utilizando direccionalidad en los dos sentidos, porque ambas clases tienen referencia una con la otra.

Como un departamento puede controlar de 0 a N proyectos, para representar esta relación tenemos que engadir en la clase Departamento, una referencia mediante una colección a la clase Proyecto. Para realizar esta referencia, podemos utilizar una colección Set, ya que en este caso no puede haber elementos repetidos y sin orden establecida.

![imagen_15_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_15_3.png)


# Unidad 4: HIBERNATE-Herramienta ORM

![imagen_16_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_16_1.png)

Las instancias de una colección son diferenciadas en la base de datos mediante una clave foránea del objeto relacional al que pertenece. Esta clave se denomina clave de la colección. Esta clave será mapeada con el tag `<key>`.

- En el archivo de mapeo Departamento.hbm.xml tenemos que mapear la colección set.

![imagen_16_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_16_2.png)

## 2.3.5 Mapeo de una lista

Las listas pueden contener elementos duplicados y están indexadas, se utiliza un índice para acceder y buscar elementos en la lista a través de su posición.

- Una propiedad de una colección de tipo lista se mapea con `<list>` y la propiedad tiene que ser inicializada con `ArrayList`.
- El índice de la lista tiene que mantenerse en una columna adicional, por tanto hay que agregar esta columna extra a la tabla. Esta columna de índice define la posición del elemento en la colección y mediante ella, Hibernate es capaz de preservar el orden de los elementos de la colección.

Para definir la columna que almacena el índice se utiliza el elemento `<list-index>`.

<List-index
    column="nombre_columna"
    base="0|1|..."
/>

- `column` (requerido): Nombre de la columna que tiene los valores del índice de la colección.
- `base` (opcional - por defecto es 0): Valor de la columna índice que corresponde al primer elemento de la lista o del array.

## 2.3.6 Mapeo de un Map

Un `<map>` almacena sus entradas como pares clave/valor, no puede almacenar claves duplicadas, pero sí almacenar datos idénticos en su campo valor, no tiene un orden establecido. A los elementos valor del map se accede especificando la clave.

- La propiedad de un `<map>` tiene que ser inicializada con la interfaz `HashMap()`. La interfaz `Map` proporciona entre otros los siguientes métodos:
  - `Object Map.get(Object clave)`: Retorna el objeto que actúa como valor y que está asociado con la clave que se pasa como parámetro (si esa clave tiene un objeto en la colección).
  - `Map.put(Object clave, Object valor)`: Inserta una pareja clave/objeto en la colección.

Una colección `Map` se mapea con la etiqueta `<map>`. Para definir la columna que almacena la clave se utiliza la etiqueta `<map-key>`.

<Map-key
    column="nombre_columna"
    formula="expresión SQL"
    type="Tipo de datos"
/>

- `column` (opcional): Nombre de la columna que tiene los valores de la clave de la colección.
- `formula` (opcional): Fórmula SQL que se utiliza para evaluar la clave del map.
- `type` (requerido): Tipo de datos de la clave del map.

## Ejemplo

Supongamos que ahora, las imágenes de un producto tienen un índice no numérico, mediante una cadena: “Imagen1”, “Imagen2”, etc..., y también se guarda el nombre del archivo asociado a la imagen. Una forma de modelar esto es con un map que tiene el nombre de la imagen como la clave y el nombre del archivo como el valor.

![imagen_18_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_18_1.png)

Mapeo del map en el archivo de mapeo `Produto.hbm.xml` que corresponde al mapeo de la propiedad `imágenes` de la clase `producto`.

```java
private Map<String, String> imágenes = new HashMap<>(0)
```

Espero que esto sea lo que estabas buscando. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!


Unidad 4: HIBERNATE-Herramienta ORM

### 2.3.7 Mapeamento dun bag e ibag

Unha colección `<bag>` é unha colección que permite elementos duplicados e sen orden.

Non está implementada na API de coleccións de Java pero pódense utilizar as interfaces `java.util.List` ou `java.util.Collection` para mapear os `<bag>`. Recoméndase utilizar mellor a interface `Collection`. As dúas interfaces inicialízanse con `ArrayList`.

Unha colección `<idbag>` é similar a un `<bag>`, pero no mapeo engade unha columna clave primaria “artificial” na táboa da colección, que se xerará automaticamente por Hibernate. O xerador asigna unha clave “artificial” diferente a cada fila da colección. Hibernate pode localizar filas individuais eficientemente e actualizalas ou borralas individualmente, do mesmo xeito que si fose unha lista, mapa ou conxunto.

Para definir a columna que almacena a clave primaria xerada, utilízase a etiqueta `<collection-id>`:

```xml
<collection-id
  column="nome_columna"
  type="Tipo de datos"
>
  <generator class="clase_xeradora"/>
</collection-id>
```

- `column`: Nome da columna que ten a clave primaria xerada da colección.
- `type`: Tipo de datos da clave principal.
- `generator` (opcional): Forma en que a clave primaria se xera. Na implementación actual, a estratexia de xeración de identificador native non se atopa soportada para identificadores de coleccións.

No seguinte exemplo, engadimos na táboa Imaxe unha clave primaria “artificial”, `IDImaxe`, que será xerada automaticamente por Hibernate e así permítense valores duplicados na colección, é dicir dous produtos poden ter a mesma imaxe.

### Coleccións ordenadas

Hai dúas formas de ordenar unha colección ao mapealas:

- Colección clasificada (Sorted collection): Utilizando as funcións de ordenación proporcionadas polas coleccións de Java. Os datos lense dende a base de datos e realízase a clasificación na memoria da máquina virtual Java (JVM). Este tipo de ordenación non é eficiente para grandes coleccións. Só as coleccións `<set>` e `<map>` apoian este tipo de ordenación.
- Colección ordenada (Ordered collection): Ordenar unha colección a nivel de consulta mediante a cláusula `order-by`. Os datos cárganse na colección xa ordenados. Este é o xeito máis eficaz se a colección é moi grande.

### Colección clasificada (Sorted collection)

Utilizan o atributo `sort` para definir a clasificación nas coleccións `<map>` ou `<set>`.

```xml
<set|map
  name="nome propiedade"
  table="nome da táboa"
  sort="unsorted|natural|nome clase"
>
  .....................
</set|map>
```

Os valores permitidos do atributo `sort` son `unsorted`, `natural` e o nome dunha clase que implementar `java.util.Comparator`.

Si se especifica `sort="natural"`, a ordenación realízase usando o método `compareTo()` definido na interface `java.lang.Comparable` do tipo de datos correspondente. Moitos tipos de datos básicos, como `String`, `Integer` e `Double` implementan esta interface. Se queremos outros algoritmos (por exemplo, orde alfabética inversa), temos que especificar unha clase que implemente `java.util.Comparator`.

Hibernate soporta ás coleccións clasificadas implementando:

- Para as coleccións `<map>`: `java.util.SortedMap` e inicialízanse con `TreeMap`.
- Para as coleccións `<set>`: `java.util.SortedSet` e inicialízanse con `TreeSet`.

### Exemplo

Temos as seguintes táboas que se van mapear coa clase produto utilizando unha colección clasificada `<map>`, utilizando o campo clave `nomeImaxe` para establecer a ordenación de forma alfabética. O mesmo proceso sería válido para unha colección `<set>`.

### Colección ordenada (Ordered collection)

Ordenar unha colección a nivel de consulta mediante a cláusula `order-by`. Os datos cárganse na colección xa ordenados. Este é o xeito máis eficaz se a colección é moi grande.

### Implementación

Si quixeramos outra ordenación diferente, teriamos que especificar unha clase que implemente `java.util.Comparator` e sobrescriba o método `CompareTo`. Por exemplo, para obter os nomes das imáxenes na orde alfabética inversa, implementamos a seguinte clase:

```java
public class ComparadorInverso implements Comparator<String> {
  @Override
  public int compare(String o1, String o2) {
    return (o2.compareTo(o1));
  }
}
```

No atributo `sort` da colección teriamos que indicar que utilice agora este comparador.

Espero que esto sea lo que estabas buscando. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_22_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_22_1.png)

2.3.8 Colección ordenada (Ordered collection)

Si queremos que la misma base de datos ordene los elementos de la colección, se utiliza el atributo `order-by` en los mapeos `set`, `bag`, `idbag` o `map`. La ordenación se realiza mediante la lengua SQL. Esta solución está disponible solo bajo el JDK 1.4 o superior.

<set|map|bag|idbag>
  name="nombre propiedad"
  table="nombre de la tabla"
  order-by="columna1 [,columna2..] [asc|desc]">
  .......................
</set|map|bag|idbag>

El atributo `order-by` debe ser una columna de la base de datos (o columnas), no una propiedad y podemos especificar el orden (asc o desc). Podemos ordenar por cualquier columna de la tabla de colección.

En los archivos de las clases, las colecciones se implementan de la forma habitual según el tipo de colección (Set / HashSet, Map/HashMap o Collection|List/ArrayList), pero internamente, Hibernate utiliza variaciones de estas colecciones (LinkedHashSet o LinkedHash-Map) que conservan la orden de inserción de los elementos clave.

Ejemplo:

En el mapeo del `<ibag>` en el archivo de mapeo `Produto.hbm.xml` que corresponde al mapeo de la propiedad `imágenes` de la clase `producto`, se agrega el atributo `order-by` para ordenar por el campo `nombreImagen` en orden descendente cuando se recupere la colección.

- En el archivo `producto.java`:
 ```java
  private Collection<String> imágenes = new ArrayList<>(0);
  ```
- En el archivo `produto.hbm.xml`:
 ```xml
  <ibag>
    <key column="clave foránea"/>
    <composite-element class="nombre clase compoñente">
      <property name="nombre propiedad"/>
      .......................
    </composite-element>
  </ibag>
  ```

Unidad 4: HIBERNATE-Herramienta ORM

![imagen_23_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_23_1.png)

2.3.9 Colección de compoñentes

Hasta ahora hemos mapeado colecciones de un solo dato. Podemos tener varios datos como propiedades en una clase compoñente y tener una colección de ellas. La clase compoñente se implementa como un POJO sin identificador.

![imagen_23_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_23_2.png)

Imaginemos por ejemplo que tenemos el siguiente modelo de datos.

Hibernate proporciona `<composite-element>` para el mapeo de una colección de compoñentes. En las colecciones `<set>`, `<list>`, `<map>`, `<bag>` y `<idbag>` se puede utilizar esta etiqueta.

<set|list|map|bag|idbag>
  name="nombre de la propiedad"
  table="nombre de la tabla"
  >
  <key column="clave foránea"/>
  <composite-element class="nombre clase compoñente">
    <property name="nombre propiedad"/>
   .............................
  </composite-element>
</set|list|map|bag|idbag>

Si definimos una colección de compoñentes, y sobre todo en los Set, es muy importante implementar los métodos `equals()` y `hashCode()`, de manera correcta en la clase compoñente. Hibernate necesita estos métodos para comparar y verificar instancias en caso de modificaciones.

Ejemplo:

En el archivo `produto.hbm.xml` se agrega el subelemento `<parent>` para mapear una propiedad de la clase compoñente como una referencia a la entidad propietaria.

![imagen_24_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_24_1.png)

2.3.10 Navegación bidireccional en las colecciones de compoñentes

El elemento `<composite-element>` permite un subelemento `<parent>` que mapea una propiedad de la clase compoñente como una referencia a la entidad propietaria.

<parent name="nombre de la propiedad propietaria"/>

En el ejemplo anterior, la navegación de `Producto` a `Imaxe` es unidireccional, es decir, podemos obtener las imágenes de un producto mediante `imágenes.getImágenes().iterator()`. Si queremos obtener a partir de una imagen su producto con el método `prod.getProducto`, tendríamos que agregar en el XML el subelemento `<parent>`.

![imagen_24_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_24_2.png)

En la tarea 7 haremos ejercicios de cómo mapear los elementos de una colección utilizando diferentes interfaces de colecciones soportadas por Hibernate.

2.4
Mapeo de clase compoñente: Composición.


Unidad 4: HIBERNATE-Herramienta ORM

Hibernate denomina “compoñente” á clase que traslada o seu estado persistente á táboa da súa clase “propietaria”. A clase “compoñente” persiste como un tipo valor, non como unha referencia de entidade.

En programación orientada a obxectos, o termo "compoñente" fai referencia ao concepto de composición. A clase compoñente non necesita un atributo identificador e tampouco o seu propio ficheiro hbm.xml. Mapéase no mesmo ficheiro de mapeo da súa clase propietaria utilizando a etiqueta `<component>`:

![imagen_25_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_25_2.png)

Tamén se permite a navegación bidireccional, igual que no mapeo das coleccións de compoñentes vistos anteriormente e segue a mesma lóxica. O elemento `<component>`, igual que o elemento `<composite-element>` para o mapeo das coleccións de compoñentes, permite un subelemento `<parent>` que mapea unha propiedade da clase do compoñente como unha referencia á entidade propietaria.

<component name:………  > 
   <parent name="nome da propiedade propietaria"/> 
   <property name:…./> 
</component> 

Na tarefa 8 faremos exercicios de como mapear as clases compoñente que non teñen unha táboa na base de datos asociadas.

Unidad 4: HIBERNATE-Herramienta ORM

2.5 
Relacións entre entidades: Asociacións

As clases, ao igual que os obxectos, non existen de modo illado. Por esta razón existirán relacións entre clases e entre obxectos. Unha relación representa o vínculo entre dúas clases e represéntase cunha referencia aos obxectos.

Ante un deseño orientado a obxectos, é importante coñecer as diferentes relacións que se poden establecer entre as clases.

Imos considerar só as relacións entre "clases entidades", chamada asociacións.

O mapeo de asociacións entre clases é unha das partes fundamentais de calquera ferramenta ORM.

- Todas as clases participantes deben ter unha clave primaria na base de datos e polo tanto, unha táboa propia.

![imagen_26_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_26_1.png)

- Cada instancia das clases entidades ten un completo ciclo de vida independente. Os novos obxectos son transitorios e teñen que facerse persistentes cada un, se queremos almacenalos na base de datos. A súa relación non inflúe no seu ciclo de vida, son independientes un do outro. Se a clase fose un compoñente de tipo valor, o estado dunha instancia súa sería o mesmo que o estado da súa entidade propietaria. Neste caso, non obstante, cada clase entidade é unha entidade separada co seu propio estado completamente independente.

2.5.1 Características das relacións

A relación entre clases ten as seguintes características:

- Cardinalidade: indica cantas instancias poden existir en cada lado da relación. Por tanto, limita o número de obxectos relacionados.

Hibernate define catro tipos de relacións segundo a súa cardinalidade:

- Un a Un
- Un a Moitos / Moitos a Un
- Moitos a Moitos

Hibernate non ten en conta a cardinalidade mínima, é irrelevante.

- Direccionalidade (multiplicidade): define a forma en que se navega entre as entidades que manteñen unha relación:

- Unidireccional: se só unha entidade referencia á outra, é dicir sabe con que obxectos está relacionado, pero os devanditos obxectos non coñecen o obxecto orixinal.

- Bidireccional: se cada entidade referencia á outra, é dicir cando os obxectos en ambos os dous extremos da relación saben do obxecto no extremo contrario. Hibernate soporta 2 tipos de asociacións bidireccionais: one-to-many e many-to-many.

No seguinte exemplo:

- A direccionalidade é bidireccional, xa que cada entidade referencia á outra.
- A relación dende Proxecto a Departamento é moitos a un.
- A relación inversa dende Departamento a Proxecto é un a moitos.

2.5.2 Estratexias de carga dos obxectos.

Hibernate permite utilizar diferentes estratexias de carga para recuperar ou cargar un obxecto na memoria, coas súas coleccións e asociacións.

Por exemplo:  si a clase Persoa mantén unha colección de Actividades que realiza. Cando carguemos unha Persoa en memoria, Hibernate podería cargar xa os obxectos correspondentes ás súas Actividades: estratexia "inmediata" (ou temperá). Unha única consulta (cun join) permitiría a Hibernate traer a información da persoa e das súas actividades e crear os obxectos.

Pero tamén podemos cargar só a Persoa en memoria, e cargar máis adiante as Actividades: estratexia "preguiceira ". Nese caso, Hibernate necesitaría polo menos dúas consultas (unha para a persoa e outra para as súas actividades).

- A estratexia temperá (EAGER), indica que no momento de obter a entidade mestra se deben obter as entidades fillas que estean asociadas, mentres que a estratexia preguiceira (LAZY) só obtén a entidade mestra e os datos das entidades fillas obtéñense ao forzar a súa consulta.

- Si usamos a estratexia lazy, podemos ter problemas ao acceso da colección fóra da sesión. Hibernate xerará unha excepción.

- Na estratexia eager, si accedemos a colección con moitos elementos, podemos ter problemas de memoria.

Hibernate soporta diferentes estratexias para decidir COMO cargar os datos (unha consulta, varias....) e CANDO facelo (todo, á vez, por partes...).

Estratexia de como cargar os obxectos. Fetch mode

Catro tipos de estratexias definen COMO se cargan os datos:

- Recuperación por unión (join fetching): recupérase a instancia asociada a colección cun só SELECT, usando join.

- Exemplo: ao recuperar un departamento, coa mesma consulta Hibernate tráese ao seu director.

- Recuperación por selección (select fetching): úsase un segundo SELECT para recuperar a entidade ou colección asociada.

- Exemplo: recupérase un departamento cun primeiro SELECT, máis tarde recupérase o seu director cunha nova SELECT.


Unidad 4: HIBERNATE-Herramienta ORM

### Recuperación por subselección (subselect fetching)

- Recuperación por subselección (subselect fetching): úsase un segundo SELECT para recuperar a entidade ou colección asociada dun conxunto de entidades recuperadas previamente.
- Exemplo: recupérase unha lista de departamentos cun primeiro SELECT, máis tarde recupéranse os seus directores cunha nova SELECT (única).
- Recuperación por lotes: as entidades ou coleccións asociadas vanse recuperando en bloques (a partir dunha lista de identificadores).
- Exemplo: un primeiro SELECT recupera a lista de departamentos, un segundo SELECT recupera os directores dos 15 primeiros departamentos, un terceiro SELECT recupera os 15 seguintes, etc..

### Estratexia de cando cargar os obxectos. Fetch type

- Recuperación inmediata: a entidade ou colección asociada cárgase inmediatamente cando se carga o obxecto "propietario".
- Exemplo: ao cargar o departamento, xa temos os seus directores cargados en memoria.
- Recuperación preguiceira de coleccións: a colección asociada non se carga ata que se invoca unha operación sobre a colección.
- Exemplo: cargamos o departamento, pero os seus membros non se traen a memoria ata que intentamos acceder ao primeiro, entón tráense todos.
- Recuperación aínda máis preguiceira de coleccións: cada membro da colección asociada cárgase por separado, cando se necesite.
- Exemplo: cargamos o departamento; os seus membros tráense a memoria un por un, a medida que os imos usando.
- Recuperación por proxy: a entidade asociada non se trae a memoria ata que non accedemos a unha propiedade súa, distinta do identificador.
- Exemplo: cargamos o departamento, o director non se carga ata que non pedimos o seu nome.
- Recuperación "non-proxy": a entidade asociada non se trae a memoria ata que non se usa a variable da instancia.
- Exemplo: cargamos o departamento, o director cárgase cando o asignamos como director doutro departamento.

### Estratexias por defecto

Por defecto, Hibernate usa:

- Para referencias a entidades (asociacións monovaluadas): recuperación por proxy de forma preguiceira.
- Exemplo: cando recuperemos un departamento, o seu director será un proxy. Cando pidamos o nome do director, o proxy lanzará unha SELECT para cargar o director en memoria.
- Para referencias a coleccións (e asociacións multivaluadas): recuperación preguiceira por selección.
- Exemplo: cando recuperemos un departamento, a súa colección de empregados non se carga. Cando usemos esa lista, lánzase unha SELECT para traela completa á memoria.

### Perigo de usar estratexia lazy

- Se accedemos a colección fóra da sesión, Hibernate xerará unha excepción.

### Perigo de usar estratexia non lazy

- Se accedemos a colección con moitos elementos, podemos ter problemas de memoria.

### Representación das asociacións

A asociación represéntase:

- Nas clases Java, mediante referencias a obxectos e poden ser coleccións.
- Na base de datos, mediante claves foráneas.
- Si a navegación é bidireccional, dúas propiedades de dúas clases diferentes están representadas pola mesma clave foránea na base de datos.

![imagen_29_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_29_1.png)

### Asociación One-to-One

A relación un a un en Hibernate consiste simplemente en que un obxecto teña unha referencia a outro obxecto de forma que ao persistirse o primeiro obxecto tamén se persista o segundo.

### Clave primaria compartida entre ambas

As asociacións de claves principais non necesitan unha columna extra na táboa. Se dúas filas están relacionadas pola asociación entón as dúas filas de táboas comparten o mesmo valor de clave principal.

### Asociación unidireccional un a un

A clase Persoa ten unha propiedade chamada enderezo da clase Enderezo, mentres que a clase Enderezo non posúe ningunha referencia a Persoa, xa que definimos unha direccionalidade desde Persoa cara a Enderezo pero non ao revés.

Para mapear a propiedade enderezo no ficheiro Persoa.hbm.xml engadimos:

![imagen_30_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_30_2.png)

O atributo cascade indica a Hibernate como debe actuar cando realicemos as operacións de persistencia de gardar, borrar, ler, etc. No exemplo o valor é all indicando que deberemos realizar a mesma operación en Persoa que en Enderezo.


# Unidad 4: HIBERNATE-Herramienta ORM

## Asociacións un a un de clave foránea única

Agora cada entidade ten a súa propia clave e necesítase unha columna extra nunha das táboas para establecer a clave foránea. As relacións vanse facer a través desta clave foránea.

![imagen_32_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_32_1.png)

Para mapear a propiedade `enderezo` no ficheiro `Persoa.hbm.xml` engadimos:

![imagen_32_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_32_2.png)

Para establecer a relación das entidades a través da clave foránea temos que utilizar `<many-to-one>` en lugar de `<one-to-one>`, por que temos unha entidade `Persoa` que ten unha clave foránea `IdEnderezo` apuntando a outra entidade `Enderezo`. Co atributo `unique="true"` impedimos que dúas instancias de `Persoa` compartan a mesma instancia `Enderezo`.

Finalmente, si queremos que a asociación sexa bidireccional, no ficheiro `Enderezo.hbm.xml` poñeriamos:

![imagen_32_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_32_3.png)

## Asociación One-to-Many ou Many-to-One

As relacións de un a moitos ou moitos a un destacan pola súa frecuencia de aparición. Nas relacións un a moitos, un obxecto da entidade "A" (lado un) está relacionado con moitos obxectos da entidade "B" (lado moitos) e moitos a un, moitos obxectos da entidade "B" (lado moitos) están relacionados cun obxecto da entidade "A" (lado un).

Impleméntase en Java, cunha propiedade (referencia a un obxecto) na clase do "lado moitos” e /ou unha colección na do "lado un”. Si a relación é bidireccional, a implementación é dos dous lados, en cambio si é unidireccional só se implementa nun dos lados.

Temos tres posibilidades de implementación, mediante:

- Unha asociación unidireccional moitos a un. A implementación da relación só se realiza na clase do”lado moitos” mediante unha propiedade que referencia ao “lado un”. Na outra clase do “lado un” non se implementa ningunha relación.

```java
<class name="Clase-lado-moitos">
  <id name="identificador" column="clave primaria">
    <generator class="estratexia de xeración da clave"/>
  </id>
  <propertry name=............/>
  <many-to-one name="clase-lado-un" column="clave foránea" not-null="true"/>
</class>
```

- Unha asociación unidireccional un-a-moitos nunha clave foránea: é un caso moi inusual e non se recomenda. A implementación da relación só se realiza na clase do ”lado un” mediante unha colección que referencia ao “lado moitos”. Na outra clase do “lado moitos” non se implementa ningunha relación.

```java
<class name="Clase-lado-moitos">
  <id name="identificador" column="clave primaria">
    <generator class="estratexia de xeración da clave"/>
  </id>
  <propertry name=............/>
</class>
<class name="clase-lado-un ">
  <id name="identificador" column="clave primaria">
    <generator class="estratexia de xeración da clave"/>
  </id>
  <propertry name=............/>
  <set|bag|map|list name="nome da propiedade de colección" table="táboa referenciada"………….>
    <key>
      <column name="clave foránea" />
    </key>
    <one-to-many class="clase-lado-moitos" />
  </set|bag|map|list>
</class>
```

- Unha asociación bidireccional: A implementación da relación realízase nos dous lados, na clase do “lado moitos” mediante unha propiedade que referencia ao “lado un” e na clase do” lado un” mediante unha colección que referencia ao “lado moitos”.

```java
<class name="clase-lado-moitos">
  <id name="identificador" column="clave primaria">
    <generator class="estratexia de xeración da clave"/>
  </id>
  <propertry name=............/>
  <many-to-one name="clase-lado-un" column="clave foránea" not-null="true"/>
</class>
<class name="clase-lado-un ">
  <id name="identificador" column="clave primaria">
    <generator class="estratexia de xeración da clave"/>
  </id>
  <propertry name=............/>
  <set|bag name="nome da propiedade de colección" table="táboa referenciada" inverse="true" ………….>
    <key>
      <column name="clave foránea" />
    </key>
    <one-to-many class="clase-lado-moitos" />
  </set|bag>
</class>
```

La etiqueta `inverse="true"`, hai que engadila sempre que implementemos unha asociación bidireccional e sempre no "lado un", é dicir na colección. Na asociación unidireccional non se engade.

A razón pola que sempre temos que engadir `inverse="true"` nas relacións bidireccionais, é porque agora temos dúas asociacións unidireccionais que mapean sobre a mesma columna (a clave foránea), entón: ¿Qué lado controla esta columna?. En tempo de execución hai dúas representacións en memoria do mesmo valor, a propiedade do lado moitos e un elemento da colección do lado un. Nun momento dado, pódese modificar ese valor e Hibernate detectaría dous cambios en memoria nas instancias persistentes. Hibernate non detecta o feito de que os dous cambios se refiren a mesma columna, xa que temos mapeada a clave foránea dúas veces e Hibernate necesita coñecer este feito.


Unidad 4: HIBERNATE-Herramienta ORM

Por medio del atributo inverse. En este caso, Hibernate ignora el cambio realizado en la colección cuando va actualizar en la base de datos.

En el ejemplo anterior se muestra una relación bidireccional y la cardinalidad es One to Many entre Departamento y Proyecto y Many to One entre Proyecto y Departamento. Se utilizó la interfaz Set para las colecciones pero otras opciones serían igualmente válidas.

### Mapeo de la propiedad del "lado muchos"

*   `<many-to-one` 
    `name="Nombre propiedad"` 
    `column="Nombre columna"` 
    `class="Nombre de la clase"` 
    `cascade="all|none|save-update|delete|all-delete-orphan|delete-orphan"` 
    `fetch="join|select"` 
    `update="true|false"` 
    `insert="true|false"` 
    `property-ref="propertyNameFromAssociatedClass"` 
    `access="field|property|ClassName"` 
    `unique="true|false"` 
    `not-null="true|false"` 
    `optimistic-lock="true|false"` 
    `lazy="proxy|no-proxy|false"` 
    `not-found="ignore|exception"` 
    `entity-name="Nombre de la entidad"` 
    `formula="Expresión SQL"` 
    `index="index_name"` 
    `unique_key="unique_key_id"` 
    `foreign-key="foreign_key_name "` 
/> 
*   `name: nombre de la propiedad.` 
*   `column (opcional): nombre de la columna de la clave foránea.` 
*   `class (opcional ): nombre de la clase asociada.` 
*   `cascade (opcional - por defecto none): especifica que operaciones deben ir en cascada desde el objeto padre hasta el objeto asociado.` 
*   `fetch (opcional - por defecto es select): elige entre hacer varias consultas Select para recuperación de los datos o hacer solo una utilizando una consulta de unión (outer-join).` 
*   `update, insert (opcional - por defecto es true): especifica que las columnas mapeadas deben ser incluidas en las declaraciones SQL UPDATE y/o INSERT. Al establecer ambas como false permite una asociación "derivada" donde su valor es inicializado desde alguna otra propiedad que mapea a la misma columna (o columnas), por un disparador o por otra aplicación.` 
*   `property-ref: (opcional): nombre de una propiedad de la clase asociada que se encuentra unida a su clave foránea. Si no se especifica, se utiliza la clave principal de la clase asociada.` 

Unidad 4: HIBERNATE-Herramienta ORM

### Mapeo de la propiedad del "lado uno"

*   `<one-to-many` 
    `class="Nombre clase asociada"` 
    `not-found="ignore|exception"` 
    `entity-name="nombre de la entidad"` 
/> 
*   `class (obligatorio ): nombre de la clase asociada.` 
*   `entity-name (opcional): nombre de entidad de la clase asociada.` 

Unidad 4: HIBERNATE-Herramienta ORM

### Asociación Many-to-Many

La relación muchos a muchos consiste en que una instancia de la clase A puede estar relacionada con varias instancias de la clase B y una instancia de la clase B puede estar relacionada con varias instancias de la clase A.


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_37_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_37_1.png)

As relacións moitos a moitos no modelo relacional impleméntanse cunha táboa intermedia. 
Exemplo: 

![imagen_37_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_37_2.png)

As asociacións moitos a moitos represéntanse mediante a etiqueta `<many-to-many>`.

*   No caso de que a relación sexa unidireccional:
    *   Só a entidade "A" ten unha referencia aos obxectos de tipo "B".
    *   Esta relación está representada por unha colección e a entidade "A" pode acceder a cada un dos obxectos de tipo "B" desa colección.

![imagen_37_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_37_3.png)

Para mapear a propiedade da colección, no ficheiro Persoa.hbm.xml engadimos:

![imagen_37_4.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_37_4.png)

*   No caso de que a relación sexa bidireccional:
    *   A entidade "A" ten unha referencia aos obxectos de tipo "B" e entidade “B" ten unha referencia aos obxectos de tipo "A".
    *   Esta relación está representada por unha colección tanto na entidade "A" como na entidade B.

Unidad 4: HIBERNATE-Herramienta ORM

*   Como sempre, nunha asociación bidireccional requírese que se estableza un dos extremos con `inverse="true"`.
    *   Como xa comentamos, que un lado dunha asociación bidireccional ten que mapearse como `inverse` porque temos nomeada a clave foránea dúas veces.
    *   O mesmo principio rexe nas asociacións moitos-a-moitos: cada fila da táboa intermedia (de enlace) está representada por dous elementos de colección.
    *   Unha asociación entre la entidade A e B está representada en memoria por unha instancia A da colección de B, pero tamén por unha instancia B na colección de A.

![imagen_38_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_38_1.png)

Para mapear a propiedade de colección Actividades, no ficheiro Persoa.hbm.xml engadimos:

![imagen_38_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_38_2.png)

Para mapear a propiedade de colección Persoas, no ficheiro Actividade.hbm.xml engadimos:

![imagen_38_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_38_3.png)

O `inverse="true"` na colección actividades do ficheiro persoa.hbm.xml, dille a Hibernate que ignore os cambios feitos na colección actividades e utilice o outro extremo da asociación, a colección persoas para a sincronización coa base de datos.

Nas asociacións moitos-a-moitos bidireccionais, non temos porque poñer o mesmo tipo de colección en ambos lados. Por exemplo, podemos poñer unha colección `<list>` no lado non inverso e un `<bag>` no lado inverso. Hai que ter en conta que as coleccións indexadas (listas e maps) non funcionan no lado inverso porque Hibernate non inicializará ou manterá a columna do índice destas coleccións.

Unidad 4: HIBERNATE-Herramienta ORM

2.5.7 Asociación Many-to-Many con atributos propios na relación

Supoñamos na relación anterior entre Actividades e Persoas, que queiramos rexistrar a nota obtida de cada persoa na realización da actividade.

![imagen_39_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_39_1.png)

Na base de datos, o atributo nota engadiríase á táboa intermedia (join), como se mostra a continuación:

![imagen_39_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_39_2.png)

Hai varias estratexias para implementar isto.

Mapeado da táboa join nunha entidade intermedia

Unha opción consiste en establecer entre as entidades Persoa e Actividade, unha entidade PersoaActividade. O identificador de esta entidade é a composición de IDActiv e IdPersoa. O diagrama de clases amósase a continuación:

![imagen_39_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_39_3.png)


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_40_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_40_1.png)

As dos asociacións `<many-to-one>` son só de lectura; insert e update están postos a false. Isto é necesario porque as columnas están mapeadas dúas veces, unha na clave composta (que é responsable da inserción dos valores) e outra nas asociacións many-to-many. As entidades Actividade e Persoa teñen unha asociación one-to-many coa entidade PersoaActividade.

No ficheiro Persoa.hbm.xml, engadimos:

![imagen_40_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_40_2.png)

No ficheiro Actividade.hbm.xml, engadimos:

![imagen_40_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_40_3.png)

Unha vantaxe desta estratexia é a posibilidade da navegación bidireccional. O inconvinte é que o código é máis complexo para xestionar as instancias de PersoaActividade, para crear e borrar as asociacións (teñen que gravarse e borrarse independentemente) e para a xestión da clave composta. Con todo, podemos permitir persistencia transitiva coas opcións de cascade nas coleccións de Persoa e actividade.

Mapeado da táboa join cunha colección de compoñentes

Outra alternativa é facer a clase PersoaActividade de tipo valor, sen un identificador. Esta clase compoñente ten que estar posuída por unha entidade. Por exemplo, imos facer que a propietaria sexa Persoa, entón esta identidade ten que ter unha colección de compoñentes.

Unidad 4: HIBERNATE-Herramienta ORM

![imagen_41_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_41_1.png)

No ficheiro Persoa.hbm.xml, engadimos o mapeo da clase compoñente.

![imagen_41_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_41_2.png)

O inconvinte é que non hai modo de permitir navegación bidireccional: un compoñente como PersoaActividade non pode por definición ter referencias compartidas. Non podemos navegar dende Actividade a PersoaActividade. Non obstante, podemos executar unha consulta para atopar os obxectos que necesitemos.

2.5.8 Persistencia transitiva

Por defecto Hibernate, non navega polas asociacións, co que operacións de inserción, borrado ou modificación non teñen efecto sobre as entidades asociadas. Pode chegar a ser bastante incómodo gardar, borrar, ou modificar obxectos individuais, especialmente si tratamos cun grafo de obxectos asociados.

As instancias das entidades asociadas teñen ciclos de vida independentes e soportan referencias compartidas. Eliminar unha entidade dunha colección non significa que se borre esta da base de datos. Estas instancias son transient e teñen que ser persistidas si as queremos gardar, borrar ou modificar na base de datos. Entón temos dúas opcións:

- Persistir cada unha das instancias de forma individual. Isto implica máis código.
- Usar a característica de persistencia transitiva, que permite aforrar liñas de código e manexar automaticamente o ciclo de vida das instancias de entidades asociadas.

Para usar a característica de persistencia transitiva, Hibernate permite a configuración de cada unha das asociacións. Para ello usamos o atributo cascade nas asociacións de entidades, que especifica que operacións deben ir en cascada dende o obxecto pai ata o obxecto asociado.

Para cada operación básica da sesión de Hibernate - incluíndo persist(), merge(), saveOrUpdate(), delete(), lock(), refresh(), evict(), replicate() - existe un estilo de cascada correspondente. Si se quere que unha operación sexa tratada en cascada ao longo dunha asociación, debemos indicalo no documento de mapeo.

A continuación, preséntanse as opcións que o atributo cascade pode aceptar:

- none -> Ignora a asociación e non se propaga ningunha acción. Opción por defecto.
- save-update -> Navega a asociación cando a sesión é sincronizada e cando o obxecto executa algún dos métodos save(), saveorupdate ou update(), propaga estás operacións ás entidades asociadas. Os obxectos das entides asociadas poden estar transient ou detached, e pasan a persistent.
- delete -> Borra as entidades asociadas en estado persistente.
- persist -> Hibernate persiste calquera instancia transient asociada cando se chama ao método persist() do obxecto.
- merge -> Navega a asociación e propaga a operación merge(). As instancias das entidades asociadas en estado detached, replicanse como persitent e as transient pasan a persistent.
- Lock -> Incorpora ao contexto de persistencia aquelas instancias de entidades asociadas que estean en estado detached. O modo de bloqueo (LockMode) non é propagado.
- evict() -> Borra da caché todas as instancias de entidades asociadas.
- refresh -> Recupérase o estado dos obxectos asociados da base de datos.
- all -> Todas as opcións mostradas anteriormente.
- delete-orphan -> Borra as entidades asociadas cando son eliminadas da asociación, é dicir, provoca o borrado dos obxectos con só sacalos da colección do pai. Úsase cando a entidade borrada non ten referencias compartidas. Aplícase só as asociacións un-a-moitos.

Recomendacións:

- Usualmente non ten sentido habilitar o tratamento en cascada nunha asociación `<many-to-one>` ou `<many-to-many>` e si se habilita, a opción saveupdate sería a que ten sentido. O tratamento en cascada é frecuentemente útil para as asociacións `<one-to-one>` e `<one-to-many>`.
- Se o período de vida dos obxectos fillos está ligado ao período de vida do obxecto pai, unha opción para aforrar código é especificar cascade="all,delete-orphan".

2.6
Mapeamento da herdanza (xerarquías)

As clases java que queremos facer persistentes con Hibernate poden ter herdanza, é dicir, unhas clases herdan doutras. Por exemplo:

![imagen_42_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_42_1.png)

A herdanza é un dos desaxustes estruturais entre a orientación a obxectos e as bases de datos relacionais. Os SXBD non soportan herdanza en forma nativa e polo tanto, é necesario mapear. Catro posibles estratexias de mapeo:


Unidad 4: HIBERNATE-Herramienta ORM

### Táboa por cada subclase concreta

* Créase unha táboa por cada subclase concreta, redundando todos os atributos.

![imagen_43_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_43_2.png)

Mapeamos cada subclase concreta á súa táboa correspondente, do xeito usual e por separado. A superclase Persoa non se mapea.

* Mapeamos a clase Empregado no ficheiro Empregado.hbm.xml:

![imagen_43_3.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_43_3.png)

* Mapeamos a clase Desempregado no ficheiro Desempregado.hbm.xml:

Mapeo

### Inconvintes

* Hai que repetir o mapeo das propiedades da subclase en todos os ficheiros de mapeo.
* Non soporta consultas polimórficas. Unha consulta contra a superclase debe executarse como varias SELECTs ou consultas HQL, unha por cada subclase concreta. A superclase non se pode consultar directamente.
* Ex: non podemos recuperar dunha vez todas as persoas.

![imagen_44_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_44_2.png)

* Non da soporte ás asociacións polimórficas. As asociacións na base de datos represéntanse habitualmente como claves foráneas. Na figura anterior, se mapeamos as subclases en diferentes táboas, unha asociación polimórfica coa súa superclase Persoa non se pode representar como unha relación de clave foránea. Isto sería problemático no noso modelo si a clase Persoa tivera unha relación con outra entidade, por exemplo, un a moitos con Vehículo, esta táboa Vehículo necesitaría unha columna cunha soa clave foránea que se tería que referenciar con ambas táboas das subclases e isto non é posible.
* Ex: A clase persistente Vehículo ten a súa propia táboa asociada.
* ¿A que táboa debe apuntar a clave foránea IDPersoa? Aquí o maior problema é que non podemos engadir unha restrición de clave foránea á columna IDPersoa, porque algunhas filas corresponden coa táboa Desempregado e outras coa táboa Empregados. Hai que implementar outra forma de asegurar a integridade (un trigger, por exemplo).

### Unidad 4: HIBERNATE-Herramienta ORM

![imagen_45_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_45_1.png)

* Un problema conceptual adicional con esta estratexia de mapeamento é que algunhas columnas distintas en distintas táboas comparten a mesma semántica. Isto fai o sistema máis complexo. Por exemplo, un cambio nunha propiedade da superclase implica cambios en múltiples columnas o que fai moito máis difícil implementar restricións de integridade na base de datos.
Recoméndase esta estratexia só no nivel superior da xerarquía onde o polimorfismo non é requirido e as modificacións das superclases non vai ser probable.

### Táboa por clase concreta con unións

Como a anterior, cada clase concreta asóciase a unha táboa con todos os atributos. Pero agora definimos un único ficheiro de mapeo, onde se especifica:

* Cal é a superclase abstracta, as súas propiedades e como se mapean.
* Cales son as subclases concretas, as súas propiedades e como se mapean nas táboas correspondentes.

![imagen_45_2.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_45_2.png)

Seguimos tendo dúas táboas con columnas da superclase duplicadas pero o que é novo e un mapeamento especial de Hibernate que agora se inclúe na superclase. As subclases indícanse coa etiqueta:

<union-subclass name="nome da subclase" table="nome táboa">
      <property name="nome propiedade " type="tipo de datos">
         <column name="nome da columna" />
      </property>
………………………………
</union-subclass>


# Unidad 4: HIBERNATE-Herramienta ORM

## Mapeo de la superclase

Como Persoa es una superclase abstracta, debe declararse como `abstract="true"`. De lo contrario, sería necesaria una tabla para las instancias de la superclase.

El mapeo del identificador está compartido para todas las subclases concretas de la jerarquía.

Las propiedades de la superclase se declaran en `property` y son heredadas por todas las clases concretas. Esto evita la duplicidad.

Cada subclase concreta se mapea a una tabla; la tabla hereda el identificador de la superclase y las propiedades.

## Ventajas

* Al usar un archivo de mapeo único, la definición de las propiedades comunes ya no se duplica.
* Las consultas polimórficas ya funcionan. Podemos recuperar instancias de Empregado y de Desempregado, pero también de Persoa. Ahora podemos realizar la siguiente consulta:
```java
List<Persoa> persoas = (List<Persoa>) sesion.createQuery("From Persoa").list();
for (Persoa i : persoas) {
    System.out.println(i.getNome()+" "+i.getApelidos());
}
```
* Pueden soportarse asociaciones polimórficas; por ejemplo, un mapeo de la asociación de Vehículo a Persoa es posible. Hibernate puede usar una consulta UNION para simular una única tabla como objetivo en el mapeo de la asociación.

## Táboa por jerarquía

Ahora tenemos una única tabla con todas las propiedades y toda la jerarquía mapeada en esta tabla.

En la tabla debemos incluir una columna para el discriminante, que permite determinar la subclase asociada a cada fila y usarla internamente Hibernate. Sirve para distinguir entre las clases, no es una propiedad.

## Mapeo de la subclase

Para definir la columna de la tabla que se va utilizar para el discriminante, se utiliza la etiqueta `<discriminator>`.

```xml
<discriminator column="nome da columna" type="tipo de datos"/>
```

Para mapear cada una de las subclases se utiliza la etiqueta `<subclass>`.

```xml
<subclass name="nome da subclase" discriminator-value="valor">
    <property name="nome da propiedade" type="tipo de datos">
        <column name="nome da columna" />
    </property>
    …………….
</subclass>
```

Cada subclase tiene su elemento `<subclass>`. Las propiedades de la superclase se mapean como siempre con un elemento `<property>`.

Un elemento `<subclass>` puede tener a su vez otros elementos `<subclass>` para mapear una jerarquía completa en una tabla.

## Ejemplo

La clase raíz Persoas de la jerarquía se mapea con la tabla Persoas. En la base de datos se ha agregado la columna Tipo que es el discriminante de la clase y los valores que puede tomar son “EMP” o “DESC”.

Nas columnas de la subclase no están permitidas las restricciones NOT NULL.

## Fórmula para calcular el discriminador

A veces, no tenemos la libertad para incluir una columna discriminante. En este caso, podemos aplicar una fórmula para calcular el discriminador en cada fila.

```xml
<discriminator
    formula="case when salario is not null then 'EMP' else 'DESC' end"
    type="string"/>
```

```xml
<subclass name="hbpersoa.Desempregado" discriminator-value="DES">
```

Esta estrategia es la mejor en términos de simplicidad y rendimiento. Presenta el mejor rendimiento para representar el polimorfismo y es más fácil de implementar. Es posible una consulta ad-hoc sin joins y uniones complejas. Facilita la evolución del esquema.

Pero presenta algunos problemas mayores:

* Puede ser un serio problema el hecho de que todas las columnas de las subclases deben admitir nulos y el modelo tiene subclases con propiedades con la restricción de que no puede ser nulo.
* Otro problema es la normalización. Tenemos dependencias entre columnas que no son clave violando la tercera forma normal.
* Complícase mantener la integridad de los datos, sobre todo en el caso de que se quiera impoñer una restricción solo a las ocurrencias de una subclase, por ejemplo, si se quixésemos que solo las personas que son empleados puedan ser propietarios de un coche.


Unidad 4: HIBERNATE-Herramienta ORM

### 2.6.4 Táboa por clase

Tanto a superclase como as subclases son persistentes e tienen su propia táboa. Las relaciones de herdanza se representan mediante claves foráneas. Todas comparten la clave primaria.

![imagen_49_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_49_1.png)

### Se unha instancia da subclase Empregado é feita persistente

- Los valores de las propiedades declaradas en la superclase Persoa son persistidos en una nueva fila de la táboa Persoa.
- Só los valores de las propiedades declaradas por la subclase son persistidos en una nueva fila de la táboa Empregado y sus filas quedan enlazadas por el valor de su clave primaria.

### En Hibernate, usamos el elemento <joined-subclass>

- Para crear una táboa por subclase:
 ```xml
  <joined-subclass name="nome da subclase" table="nome da táboa">
    <key column="clave foránea" />
    <property name="nome propiedade" type="tipo de datos">
      <column name="nome da columna" />
    </property>
    ...
  </joined-subclass>
  ```
- El elemento <joined-subclass> mapea una subclase a una táboa y todas las propiedades declaradas en la subclase son mapeadas en esta táboa.
- Una clave primaria es requerida para la táboa que mapea a la subclase. Esta columna también tiene una restricción de clave foránea con la clave primaria de la táboa que mapea a la superclase.

### Un elemento <joined-subclass> puede conter otros elementos <joined-subclass>

- Para mapear toda la xerarquía.

### Unidad 4: HIBERNATE-Herramienta ORM

![imagen_50_1.png](resources/Acceso a datos/UNIDAD3-Acceso a base de datos relacionales/images/imagen_50_1.png)

### Vantajas de esta estratexia

- El esquema SQL está normalizado.
- La evolución del esquema y la definición de restricciones es fácil.
- Una asociación polimórfica para una subclase particular se puede representar como una clave foránea referenciando a la táboa de esa subclase particular.

### Desventajas de esta estratexia

- El rendemento puede verse reducido considerablemente en una xerarquía compleja.
- Las consultas requieren joins entre muchas táboas y muchas lecturas secuenciales.
