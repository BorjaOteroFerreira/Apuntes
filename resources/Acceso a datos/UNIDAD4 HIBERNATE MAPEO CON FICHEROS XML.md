:

C.S. de Desenvolveento de Aplicaciones Multiplataforma

Índice
- 1. Estrutura de ficheiros de Hibernate para el mapeo objeto-relacional. Clases persistentes y mapeo
  - 1.1 Clases persistentes
  - 1.2 Ficheiro de mapeo
- 2. Estrategias de mapeo. Entidades y Tipos Valor
  - 2.1 Entidades
  - 2.2 Tipo Valor
  - 2.3 Mapeo de colecciones
    - 2.3.1 Atributos comunes de los elementos de colección
    - 2.3.2 Etiqueta Key. Mapeo de la clave foránea
    - 2.3.3 Mapeo de los elementos de la colección
    - 2.3.4 Mapeo de un Set
    - 2.3.5 Mapeo de una lista
    - 2.3.6 Mapeo de un Map
    - 2.3.7 Mapeo de un bag e ibag
    - 2.3.8 Colección ordenada (Ordered collection)
    - 2.3.9 Colección de componentes
    - 2.3.10 Navegación bidireccional en las colecciones de componentes
  - 2.4 Mapeo de clase componente: Composición
  - 2.5 Relaciones entre entidades: Asociaciones
    - 2.5.1 Características de las relaciones
    - 2.5.2 Estrategias de carga de los objetos
    - 2.5.3 Representación de las asociaciones
    - 2.5.4 Asociación One-to-One
    - 2.5.5 Asociación One-to-Many o Many-to-One
    - 2.5.6 Asociación Many-to-Many
    - 2.5.7 Asociación Many-to-Many con atributos propios en la relación
    - 2.5.8 Persistencia transitiva
  - 2.6 Mapeo de la herencia (xerarquías)
    - 2.6.1 Táboa por cada suclase concreta
    - 2.6.2 Táboa por clase concreta con uniones
    - 2.6.3 Táboa por xerarquía
    - 2.6.4 Táboa por clase

Para el mapeo objeto-relacional. Clases persistentes y mapeo

Hibernate tiene dos ficheiros importantes que permiten el mapeo entre los objetos Java y las tablas del SXBD relacional y son:

- Las clases Java (a estas clases Hibernate se refiere como POJOS), que representan los objetos que tienen una correspondencia con las tablas de la base de datos relacional.
- El ficheiro de mapeo (.hbm.xml), que indica el mapeo entre los atributos de una clase y los campos de la tabla relacional con la que está relacionado.

Nota: Hay otra alternativa para especificar el mapeo entre los objetos Java y las tablas, que es utilizar Anotaciones JPA sobre las clases persistentes, en vez del ficheiro xml de mapeo. En esta actividad se utilizarán los ficheiros de mapeo XML.

1.1 Clases persistentes

Las clases persistentes son clases que en una aplicación implementan las entidades del problema empresarial (por ejemplo: Cliente, Pedido, etc). Representan los objetos en una aplicación que use Hibernate y corresponden con la información almacenada en un SXBD relacional.

Hibernate trabaja con estas clases, siempre y cuando sean POJOS (Plain Old Java Object. - Objetos Simples). Estas clases deben cumplir las especificaciones JavaBeans:

- Implementar un constructor sin argumentos.
- Proporcionar una propiedad identificadora (opcional).
- Métodos getter y setter para cada atributo.
- Implementar la interfaz Serializable. No es obligatorio implementar esta interfaz, pero sí recomendable.

Exemplo simple de POJO:
:

Todas las clases de entidades persistentes deben tener una propiedad que sirva como identificador, si queremos usar el conjunto completo de funcionalidades que nos ofrece Hibernate.

Na tarefa 3 faremos ejercicios de creación de las clases persistentes para poder representar los objetos que tienen una correspondencia con las tablas de la base de datos relacional.

### 1.2 Ficheiro de mapeo

Establece la correspondencia entre los objetos Java y las tablas de la base de datos. Asignarás el nombre de la clase, seguido de la extensión .hbm.xml.

Os ficheiros de mapeo que se utilizan en la aplicación, defínense en hibernate.cfg.xml, indicando la ruta donde se encuentran estos.

Para cada clase que se quiere hacer persistente (por ejemplo, la clase Persoa) en la base de datos, se creará un ficheiro XML, con la información que permitirá mapear esta clase a una tabla de la base de datos relacional.

### Ejemplo simple de ficheiro Persoa.hbm.xml

```java
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">

<hibernate-mapping>
    <class name="Persoa" table="Persoa">
        <!-- Mapeo de la clase Persoa a la tabla Persoa -->
    </class>
</hibernate-mapping>
```

### Mapeo de Hibernate

Todos los mapeos XML deben declarar el tipo de documento DTD.

Mapeo de Hibernate: <Hibernate-mapping>

É el elemento raíz que contiene todos los elementos <class>. Dentro del decláranse las clases de los objetos persistentes.

Este elemento tiene varios atributos opcionales que especifican los valores que por defecto tendrán los demás elementos.

- schema (opcional): Nombre de un esquema de la base de datos. Si se especifica, los nombres de las tablas cualifican con el nombre del esquema dado. Si se omite, los nombres de las tablas no se cualifican.
- catalog (opcional): Nombre de un catálogo de la base de datos. Si se especifica, los nombres de las tablas cualifican con el nombre del catálogo dado.
- default-cascade (opcional, el valor por defecto es none): Estilo de cascada por defecto. Define cómo los cambios en el objeto afectan a los objetos relacionados con él. Esto es especialmente relevante cuando se trabaja con objetos que tienen relaciones con otros objetos, como las relaciones uno-a-muchos, muchos-a-uno, etc.
- default-access (opcional, el valor por defecto es property): Estrategia que Hibernate debe utilizar para acceder a los datos de la clase. Hay dos estrategias principales:

  - property: Accede a los datos de la clase mediante propiedades.
  - field: Accede a los datos de la clase mediante campos.

### Ejemplo de configuración de default-cascade

```java
<hibernate-mapping default-cascade="all-delete-orphan">
    <!-- Mapeo de la clase Persoa a la tabla Persoa -->
</hibernate-mapping>
```

En este ejemplo, se configura que los cambios en la clase Persoa se propaguen a los objetos relacionados con ella, y que si un objeto relacionado es eliminado de la colección en la clase Persoa, también se elimine de la base de datos.



dunha clase a través dos métodos getter e setter. Por exemplo, se tes unha clase Usuario con 
un campo nome, Hibernate usará os métodos getNome() e setNome(String nome) para ler e 
escribir o valor do campo nome.  

o field : Cando se usa field, Hibernate accede directamente aos campos dunha clase, ignorando 
os métodos getter e setter. No exemplo anterior, Hibernate accedería directamente ao campo 
nome da clase Usuario.  

A estratexia property é máis común porque permite encapsular a lóxica adicional nos métodos 
getter e setter. Por outro lado, a estratexia f ield pode ser útil se queres que Hibernate ignore 
esa lóxica adicional.  

- default -lazy (opcional, o valor por defecto é true): Ao especificar unha relación nun mapeo de 
Hibernate, usamos o atributo “lazy” para definir cando Hibernate trae a información da táboa 
relacionada. Por defecto, lazy é igual a true (carga diferida), o que significa que a información da 
táboa relacionada non se recupera da base de datos ata que se realiza algunha operación sobre 
ela.  

- auto -import : Cando esta opción está activada (o valo r por defecto é true), p ódese usar nomes de 
clases non cualificados na linguaxe de consulta. Por exemplo, unha clase chamada Usuario no 
código, p ódese facer unha consulta como FROM Usuario en lugar de FROM 
com.mipaquete.Usuario.  

- package : Esta opción permite especificar un prefixo de paquete que se debe usar para os nomes 
de clase non cualificados no documento de mapeo. Por exemplo, unha clase chamada Usuario no 
paquete com.mipaquete, p ódese usar só Usuario no teu documento de mapeo se especificas 
package="c om.mipaquete" na túa configuración de Hibernate.  

Aínda que o elemento hibernate -mapping  permite aniñar varios mapeos <class>  persi stentes, é 
unha boa prác tica que se mapee somentes unha clase persistente, ou  unha soa x erarquía de clases, 
nun arquivo de mapeo e nomealo como a superclase persistente. Por exemplo: Rectángulo.hbm.xml, 
Circulo.hbm.xml, ou se utiliza herdanza, Figura.hbm.xml.  

Clase < class name>  
O elemento class declara unha clase persistente que se vai almacenar na base de datos, os seus 
atribu tos e a súa relación coa táboa da base de datos.  

Algúns atributos (non están todos) que se poden declarar son os seguintes:   

- table  (opcional ).  É o nome da táboa na base de datos á que estás mapeando a túa clase. Se non 
se especifica, Hibernate usará o nome da clase.  
- mutable  (opcional - true por defecto): Especifica se ás instancias son mutables ou non. Ás clases 
inmutables non se poden modificar nin eliminar.  Por exemplo, unha clase HistorialUsuario que 
se quere  que sexa inmutable, p dese configurar mutable a false  
- schema e catalog : son opci óns que se usan para especificar o esquema e o catálogo da base de 
datos, respectivamente  
- proxy (opcional): Especifica unha interface ou clase a utili zar para o s proxies de pregu iceira 
(lazy). Pódese especificar o nome mesmo da clase. É moi útil cando se produce unha asociación 
entre dous obxectos (non é necesario traerse os dous), ou cando se carga un obxecto que ten 
coleccións (non me traio todos os datos da asociación). O obxecto proxy, o único que contén é o 
identificador.   

Cando se solicita  un obxecto dunha base de datos , non necesariamente se obterá o obxecto real 
de inmediato. En cambio, podes obter un obxecto “proxy” que parece e se comporta como o 
obxecto real, pero que non carga os datos reais da base de datos ata que realmente necesites usar 
eses datos (isto é o que chamamos “carga preguiceira” ou “lazy loading”).  

Por exemplo, imaxina que tes un obxecto Usuario que ten unha relación one -to-many con 
obxectos Pedido. Cando cargas un Usuario da base de datos, Hibernate pode crear proxies para 
os Pedid os relacionados en lugar de cargar todos os Pedidos de inmediato. Estes proxies dos 
Pedidos non cargarán os seus datos reais da base de datos ata que intentes acceder a algún dato 
dun Pedido (por exemplo, chamando a un método getter nun Pedido).  

- lazy (opcional): Permite deshabilitar a recuperación preguiceira. Se é false, Hibernate cargará 
todos os datos relacionados cando cargues o obxecto principal.  
- dynamic -update  (opcional - false por defecto): A sentenza SQL UPDATE xérase  en tempo de 
execución, e se é false somentes contén as columnas con valores que cambi asen. 
- dynamic -insert  (opcional - false por defecto): A sentenza SQL INSERT xérase en tempo de 
execución, e se é false somentes contén as columnas con valores distintos a null.  
- select -before -update (opcional - false por defecto): Prodúcese unha sentenza SELECT antes de 
actualizar para comprobar se un obxecto foi modificado e a actualización é n ecesaria. Se non, 
non se produce a devandita actualización.  
- entity -name  (opcional  - por def ecto o nome da clase): Nome que se usa en lugar do n ome de 
clase. Hibernate permit e mapear unha mesma clase distintas veces (con distintas táboas), e este 
nome será o utilizado.  
- optimistic -lock (opcional - versión por defecto): O bloqueo optimista é unha estratexia qu e 
Hibernate usa para manexar o problema de concorrencia na base de datos. A concorrencia ocorre 
cando múltiples transaccións tentan acceder e modificar os mesmos datos ao mesmo tempo.  
Na estratexia de bloqueo optimista, Hibernate permite que múltiples transaccións lean os 
mesmos datos sen bloqueos. Cando unha transacción quere modificar os datos, Hibernate 
comproba se algún outro modificou os datos desde que a transacción os leu. Se os datos foron 
modificados, Hibernate aborta a transacción e lanza unha exc epción de concorrencia.  
- rowid  (opcional): Indica que identificador de columna debe ser usado.  A opción rowid en 
Hibernate permite especificar un identificador de columna que debe ser usado.  
O rowid é un tipo de dato que moitas bases de datos usan para almacenar un valor único para 
cada fila nunha táboa. Este valor é xerado automaticamente pola base de datos e non pode ser 
modificado.
 convertido a formato markdown:

uso de rowid es bastante específico de la base de datos y no es portátil entre diferentes sistemas de gestión de bases de datos.

- subselect (opcional): Permite mapear una entidad a una subconsulta de la base de datos. Esto es especialmente útil cuando quieres mapear tu clase a una vista en lugar de una tabla.
```java
<class name="com.mipaquete.Usuario" entity-name="UsuarioSubselect">
    <subselect>
        SELECT * FROM USUARIO WHERE ID > 100
    </subselect>
    <!-- más configuraciones aquí -->
</class>
```
La clase Usuario está mapeada a una subconsulta que selecciona todos los usuarios cuyo ID es mayor que 100. Esto significa que cuando cargues instancias de la clase Usuario, Hibernate ejecutará esa subconsulta y solo obtendrás los usuarios cuyo ID es mayor que 100.

Un uso común para esto sería cuando quieres trabajar con un subconjunto de los datos que cumplen ciertas condiciones, pero no quieres o no puedes crear una vista en la base de datos para eso. En este caso, puedes usar Subselect para definir la subconsulta directamente en tu clase de entidad.

Declaración de columna de clave primaria: <id>

Las clases mapeadas deben declarar la columna de clave primaria de la tabla de la base de datos.

Hibernate necesita conocer qué estrategia se ha elegido para la generación de claves primarias. Muchas bases de datos usan claves primarias naturales, claves que tienen un significado en el mundo real (CIF, NSS, ...). En algunos casos, las claves naturales están compuestas de varias columnas, lo que hace que el mantenimiento, consultas y la evolución del sistema sean más difíciles. Una recomendación es utilizar claves artificiales (o suplentes), que no tienen significado para la aplicación y que se generan automáticamente por el sistema, y definir restricciones de unicidad en las claves naturales.

El elemento que define el mapeo de la columna de clave primaria es la etiqueta <id>. Sintaxe:

- name (opcional): Nombre del atributo de la clase persistente que va a ser un identificador. Si se omite name, se asume que la clase no tiene propiedad identificadora.
- type (opcional): Nombre que indica el tipo de datos de Hibernate.
- column (opcional - por defecto es el nombre del atributo): Nombre de la columna de clave primaria en la base de datos.
- access (opcional - property por defecto): Estrategia de acceso al valor de la propiedad.
- generator (opcional): Al establecer una clave primaria, debe especificarse la forma en que esta se genera. Hibernate tiene implementada varias formas de generar la clave primaria, pero no todas las formas son portables a todos los SXBD. Todos los generadores implementan la interfaz org.hibernate.id.IdentifierGenerator.

Estrategias de generación de claves primarias:

- assigned: Aplicación asigna un identificador al objeto antes de que se llame al método save(). Esta es la estrategia por defecto si no se especifica un elemento <generator>. Esto es útil cuando los identificadores tienen un significado en el dominio del problema.
- increment: Esta estrategia genera identificadores incrementales. Cada vez que necesitas un nuevo identificador, Hibernate incrementa el valor máximo actual en la columna del identificador. Esta estrategia es simple y eficiente, pero solo debe usarse cuando la aplicación tiene acceso exclusivo a la base de datos.
- identity: Esta estrategia usa columnas de identidad proporcionadas por la base de datos. Muchas bases de datos soportan columnas de identidad que generan automáticamente un valor único cada vez que se inserta una nueva fila. Esta estrategia es muy eficiente y permite a la base de datos encargarse de la generación del identificador.
- sequence: Esta estrategia usa secuencias de base de datos para generar identificadores. Una secuencia es un objeto de base de datos que genera una secuencia de números únicos. Cuando necesitas un nuevo identificador, solicitas el siguiente valor de la secuencia.
- hilo y seqhilo: Estas estrategias usan un algoritmo “high/low” para generar identificadores de forma eficiente. El algoritmo high/low genera identificadores que son únicos para la base de datos. Los valores high se obtienen de una fuente global y se hacen únicos agregando un valor low. La estrategia seqhilo es similar, pero usa una secuencia de base de datos para generar los valores high.
- uuid y guid: Estas estrategias generan identificadores únicos a nivel global. uuid usa un algoritmo UUID para generar un identificador de 128 bits, mientras que guid usa una cadena GUID generada por la base de datos.
- native: Esta estrategia permite a Hibernate elegir la mejor estrategia basándose en las capacidades de la base de datos.
- select y foreign: Estas estrategias son un poco diferentes. select recupera un identificador asignado por un disparador de la base de datos, mientras que foreign usa el identificador de un objeto asociado.

Claves compuestas: <Composite-id>

Define claves compuestas por varios campos. Hay varias alternativas para definir un identificador compuesto y la más recomendada es la de implementarlo como una clase componente aparte. Los atributos descritos a continuación se aplican solo a este enfoque alternativo:

- name (obligatorio para esta alternativa): Nombre de la propiedad que contiene el identificador compuesto.
- class (opcional): La forma de implementar una clave compuesta en Hibernate es a través de una clase. Esta propiedad indica el nombre de la devanita clase que contendrá atributos para cada una de las columnas que componen la clave.



valor das propiedades

- key-property: Dentro da etiqueta composite -id, indica cada un dos campos que forman a clave e que corresponden ás claves foráneas do utras táboas.
- name: Nome da propiedade da clase que implementa o identificador.
- type (opcional): Tipo Hibernate da propiedade.
- column  (opcional - nome da propiedade por defecto): Nome da columna.

Exemplo: A clave de EmpregadoProxecto  é composta por nssEmpregado  e numProxecto , creamos unha clase a parte para implementar este identificador composto.

No ficheiro EmpregadoProxecto.hbm.xml , a clave sería declarada como:

Non se pode utilizar un xerador de claves para xerar claves compostas. En cambio, a aplicación debe asignar os seus propios identificadores.

Propiedade. - <Property>

O elemento <property> declara unha propiedade dunha clase persistente, estilo JavaBean da clase.

Algúns dos seus atributos son:

- column  (opcional - por defecto é o  nome da propiedade): Nome da columna da táboa de base de datos mapeada.
- type (opcional): Nome que indica o tipo de datos de Hibernate.
- update, insert  (opcional - por defecto é true): Especifica que as columnas mapeadas deben ser incluídas nas declaracións SQL UPDATE e/ou INSERT.
- formula  (opcional) : Expresión SQL que define o valor para unha propiedade calculada. As propiedades calculadas non teñen unha columna mapeada propia.
- lazy (opcional - por defecto é false): Especifica que se debe recuperar preguiceiramente  esta propiedade cando se acceda por primeira vez á variable de instancia.
- unique (opcional): Restricción de unicidade para a columna.
- not-null (opcional): Restricción de nulabilidade para a columna.
- generated  (opcional - por defecto é never): Especifica que o valor da propiedade é xerado pola base de datos.

Tipos de datos Hibernate

El mapeo implica a conversión entre tipos de datos de JAVA e tipos de datos SQL. Hibern ate xestiona esta conversión por medio dos seus propios tipos de datos para mapeo. Cada tipo Hibernate ten un equivalente en JAVA e en ANSI SQL.

Mediante o “dia lecto SQL” do SXBD, Hibernate adaptará os seus tipos de nativos aos tipos de datos SQL.  Así consíguese independencia fronte a un S XBD específico.  Tamén se p oden usar tipos Java, ou mesmo non indicalos, pero é menos convinte.
:

Tipos Valor

Un objetivo principal de Hibernate es el apoyo a los modelos de objetos de gran fino, como uno de los requisitos más importantes para los mapeos de datos. Es una razón por la que se trabaja con POJOS. El término de gran fino significa “más clases que tablas”. Esto significa que en las filas de una tabla de la base de datos se puede representar más de un único objeto y que no todas las clases que tenemos en un proyecto van a tener correspondencia unívoca con una tabla en la base de datos.

Exemplo: una clase Cliente con propiedades para el enderezo de facturación (rua, ciudad, código postal, localidad) y para el envío. Puede que esta información esté en la base de datos en una única tabla Cliente pero que desde el punto de vista de la codificación en Java, puede ser conveniente tener una clase Enderezo con estos datos, o tener la propiedad dirección de correo electrónico, en vez de una propiedad de tipo cadena, como una propiedad de una clase Email, lo que puede agregar un comportamiento más sofisticado, al poder definirlo mediante métodos, por ejemplo, puede ofrecer un método sendEmail().

No siguiente ejemplo, se amosan dos clases que se mapean en una única tabla de la base de datos:

Este problema de granularidad nos lleva a hacer una distinción importante dentro de Hibernate. Si pensamos en un diseño de gran fino (“más clases que tablas”), una fila representa a múltiples instancias de diferentes clases. Dado que la identidad de una tabla de la base de datos es implementada mediante la clave primaria, entonces algunos objetos persistentes no tienen su propia identidad, es decir, un de los objetos representados en la fila tiene su propia identidad (exemplo anterior sería empleado), y otros dependen de este y no tienen un valor identificador (exemplo enderezo).

Hibernate hace la distinción esencial siguiente:

- Entidades.
- Tipo Valor (compoñente).

2.1 Entidades

- Un objeto de tipo de entidad tiene una identidad propia en la base de datos (valor de clave principal).
- Una referencia de objeto a una instancia de entidad es persistido como una referencia en la base de datos (un valor de clave externa).
- La entidad tiene su propio ciclo de vida, y puede existir independientemente de cualquier otra entidad.

que en Hibernate se denomina "value types" (tipos "valor").

Exemplo: Departamento, Empregado, Proxecto.

2.2 Tipo Valor

- Un objeto de tipo valor no tiene una identidad de base de datos, sino que pertenece a una instancia de entidad y su estado persistente se incrusta en la fila de la tabla a la que pertenece.
- Objetos persistentes sin identidad propia (ni tabla propia).
- Los tipos de valor no tienen identificadores o propiedades identificadoras.
- La vida útil de una instancia de tipo de valor está limitada por la vida útil de la pertenencia a instancias de entidad.
- Un tipo de valor no es compatible con referencias compartidas.
Exemplo: Enderezo.

2.3 Mapeamiento de colecciones

Hibernate ofrece distintas formas para almacenar colecciones. Cuando Hibernate almacena una colección, almacena también toda la semántica asociada a su interfaz. Por ejemplo, cuando una lista (interfaz List) es almacenada, el índice que identifica la orden también es almacenado. De esta forma, cuando esta sea recuperada de la base de datos, su comportamiento será idéntico al inicial.

Hibernate soporta las colecciones que se amosan en la siguiente tabla:

Los arrays están soportados por Hibernate con <primitive-array> (para tipos primitivos Java) y <array> (para otros) pero úsanse raramente.



# Mapeo de colecciones

## Procedimiento recomendado

*   Usar una interfaz para declarar el tipo de la colección (ex: Set).
*   Crear una clase que implemente la interfaz (ex: HashSet) y inicializarla en la declaración sin esperar a hacerlo en el constructor o en algún método setter. Este es el método recomendado.

## Sintaxis para declarar una propiedad de colección

```
privada <Interface> nombreColeccion = new <Implementación>();
```

## Atributos comunes de los elementos de colección

*   `name`: Nombre de la propiedad colección.
*   `table`: Nombre de la tabla de la base de datos que contiene la relación.
*   `schema`: Nombre del esquema de la base de datos.
*   `lazy` (opcional - por defecto es false): Especifica que se debe recuperar previamente esta propiedad cuando se acceda por primera vez a la variable de instancia.
*   `inverse` (defecto false): Declárase en las relaciones uno a muchos o muchos a muchos. Sirve para decidir qué de las dos relaciones es la propietaria para manejar la relación y hacer las operaciones de inserción y actualización en la columna foránea. En el caso de las relaciones muchos a muchos es necesario poner un lado de la relación con el valor true y el otro con el valor false.

## Atributos de la etiqueta Key

*   `column`: Nombre de la columna de la clave foránea.
*   `on-delete` (opcional - por defecto es no action): Con el valor a true se especifica que la restricción de clave foránea tiene el borrado en “cascade” activado a nivel de base de datos.
*   `property-ref` (opcional): Especifica que la clave foránea referencia columnas que no son la clave principal de la tabla original. Proporciónase para los datos herdados.
*   `not-null` (opcional): Con el valor a true se especifica que las columnas de la clave foránea son no nulables. Esto aplica cuando la clave foránea también es parte de la clave principal. También hay que declararlo a true en una relación uno a muchos unidireccional si la clave foránea no admite valores nulos.
*   `update` (opcional): Con el valor a false se especifica que la clave foránea nunca se debe actualizar. Esto aplica cuando la clave foránea también es parte de la clave principal.
*   `unique` (opcional): Con el valor a true se especifica que la clave foránea debe tener una restricción de unicidad.

## Mapeo de los elementos de la colección

Las colecciones pueden contener: tipos básicos, compoñentes y referencias a otras entidades. Un elemento en una colección puede ser manejado como:


Tipos básicos, os personalizados e os compoñentes mapéanse como este tipo.

Estes elementos son mapeados por `<element>` para os tipos básicos ou `<composite-element>` para os compoñentes.

- Referencia a outra entidade: teñen o seu propio ciclo de vida. Son as asociacións entre obxectos.
Son mapeados con `<one-to-many>` ou `<many-to-many>`.

### 2.3.4 Mapeo dun Set

Unha colección de entidades Set mapéase co elemento `<set>`. Esta colección non permite elementos duplicados e non é necesario un índice xa que os elementos están sen ordenar.

- Na base de datos temos a seguintes relaciós:
  - O diagrama de clases UML é:
  - As relacións entre clase, na programación OO, represéntanse mediante referencias a obxectos e coleccións de referencias a obxectos.

### 2.3.5 Mapeo dunha lista

As listas poden conter elementos duplicados e están indexadas, utilízase un índice para acceder e buscar elementos na lista a través da súa posición.

- Unha propiedade dunha colección de tipo lista mapéase con `<list>` e a propiedade ten que ser inicializada con ArrayList.
- O índice da lista tense que manter nunha columna adicional, por tanto hai que engadir esta columna a extra á táboa.
- Esta columna de índice define a posición do elemento na colección e mediante ela, Hibernate é capaz de preservar a orde dos elementos da colección.

### Exemplo

- Amósase unha clase que se mapea con dúas táboas.
- Na clase defínese unha lista de strings para almacenar os nomes das imaxes que se corresponden cun determinado produto.
- Neste caso os elementos da lista son de Tipo Valor, xa que o seu ciclo de vida depende completamente dun determinado produto propietario da colección e os elementos da lista non teñen referencias a outros obxectos e ntidades.
- Por tanto, o elemento nomeImaxe da lista será mapeado coa etiqueta `<element>`.



O ficheiro de mapeo Produto.hbm.xml quedará:

A continuación detállase a etiqueta <list> que corresponde ao mapeamento da propiedade imaxes da clase produto.

- private List<String> imaxes = new ArrayList<>();

O índice da lista comeza en cero. Utilizando <list index="base"1".../ > podemos facer que empece por un.

Un <map> almacena as súas entradas como parellas clave/valor, non pode almacenar claves duplicadas, pero si almacenar datos idénticos no seu campo valor, non ten unha orde establecida.

Aos elementos valor do map accédese especificando a clave.

A propiedade dun <map> ten que ser inicializada coa interface HashMap(). A interface Map proporciona entre outros os seguintes métodos:

- Object Map.get(Object clave)
- Retorna o obxecto que actúa como valor e que está asociado coa clave que se pasa como parámetro (se esa clave ten un obxecto na colección).
- Map.put(Object clave, Object valor)
- Insire un parell a clave/obxecto na colección.

Unha colección Map mapéase coa etiqueta <map>. Para definir a columna que almacena a clave utilízase a etiqueta <map-key>

<Map-key
  column="nome_columna"
  formula="expresión SQL"
  type="Tipo de datos"
/ >

- column (opcional): Nome da columna que ten os valores da clave da colección.
- formula (opcional): Fórmula SQL que se usa para avaliar a clave do map.
- type (requirido): Tipo de datos da clave do map.

Exemplo: supoñamos que agora, as imaxes dun produto teñen un índice non numérico, mediante unha cadea: “Imaxe1”, “Imaxe2”, etc..., e tamén se garda o nome do arquivo asociado á imaxe.

Unha forma de modelar isto é cun map que ten o nome da imaxe como a clave e o nome do ficheiro como o valor.

Mapeamento do map no fichero de mapeo Produto.hbm.xml que corresponde ao mapeamento da propiedade imaxes da clase produto.

- private Map<String,String> imaxes = new HashMap<>(0)
:

2.3.7 Mapeamento dun bag e ibag

Unha colección `<bag>` é unha colección que permite elementos d'uplicados e sen orden.

Non está implementada na API de coleccións de Java pero pódense utilizar as interfaces `java.util.List` ou `java.util.Collection` para mapear os `<bag>`. Recoméndase utilizar mellor a interface `Collection`. As dúas interfaces inicialízanse con `ArrayList`.

Unha colección `<idbag>` é similar a un `<bag>`, pero no mapeo engade unha columna clave "artificial" na táboa da colección, que se xerará automaticamente por Hibernate. O xerador asigna unha clave "artificial" diferente a cada fila da colección. Hibernate pode localizar filas individuais eficientemente e actualizalas ou borralas individualmente, do mesmo xeito que si fose unha lista, mapa ou conxunto.

Para definir a columna que almacena a clave primaria xerada, utilízase a etiqueta `<collection-id>`:

<collection-id
  column="nome_columna"
  type="Tipo de datos"
>
  <generator class="clase_xeradora"/>
</collection-id>

- column: Nome da columna que ten a clave primaria xerada da colección.
- type: Tipo de datos da clave principal.
- generator (opcional): Forma en que a clave primaria se xera. Na implementación actual, a estratexia de xeración de identificador native non se atopa soportada para identificadores de coleccións.

No seguinte exemplo, engadimos na táboa Imaxe unha clave primaria "artificial", IDImaxe, que será xerada automaticamente por Hibernate e así permítense valores duplicados na colección, é dicir, dous produtos poden ter a mesma imaxe.

da propiedade imaxes da clase produto.

```java
private Collection<String> imaxes = new ArrayList<>(0);
```

Coleccións ordenadas

Hai dúas formas de ordenar unha colección ao mapealas:

- Colección clasificada (Sorted collection): Utilizando as funcións de ordenación proporcionadas polas coleccións de Java. Os datos lense dende a base de datos e realízase a clasificación na memoria da máquina virtual Java (JVM). Este tipo de ordenación non é eficiente para grandes coleccións. Só as coleccións `<set>` e `<map>` apoian este tipo de ordenación.

- Colección ordenada (Ordered collection): Ordenar unha colección a nivel de consulta mediante a cláusula `order-by`. Os datos cárganse na colección xa ordenados. Este é o xeito máis eficaz se a colección é moi grande.

Colección clasificada (Sorted collection)

Utilizan o atributo `sort` para definir a clasificación nas coleccións `<map>` ou `<set>`.

<set|map
  name="nome propiedade"
  table="nome da táboa"
  sort="unsorted|natural|nome clase"
>
.....................
</set|map>

Os valores permitidos do atributo `sort` son `unsorted`, `natural` e o nome dunha clase que implementar `java.util.Comparator`.

Si se especifica `sort="natural"`, a ordenación realízase usando o método `compareTo()` definido na interface `java.lang.Comparable` do tipo de datos correspondente. Moitos tipos de datos básicos, como `String`, `Integer` e `Double` implementan esta interface. Se queremos outros algoritmos (por exemplo, orde alfabética inversa), temos que especificar unha clase que implemente `java.util.Comparator`.

Hibernate soporta ás coleccións clasificadas implementando:

- Para as coleccións `<map>`: `java.util.SortedMap` e inicialízanse con `TreeMap`.
- Para as coleccións `<set>`: `java.util.SortedSet` e inicialízanse con `TreeSet`.



Clasificada <map>, utilizando el campo clave `nomeImaxe` para establecer la ordenación de forma alfabética. El mismo proceso sería válido para una colección <set>.

Como la ordenación se va realizar por orden alfabético por el campo clave `nomeImaxe`, en el atributo `sort` se especifica la opción "natural". En este caso, la ordenación se realizaría usando el método `compareTo()` definido en la interfaz `java.lang.Comparable` del tipo de datos String, y que para estos tipos de datos es la orden alfabética si no se sobrescribe este método.

Al recuperar un producto de la base de datos, su colección de imágenes estaría ordenada alfabéticamente por el campo `nomeImaxe`.

```java
Session sesion = HibernateUtil.getSessionFactory().openSession();          
Produto p = (Produto) sesion.get(Produto.class, 1);                         
for (String i : p.getImaxes().keySet()) {  
    System.out.println(i);  
}
```

Si quisieramos otra ordenación diferente, tendríamos que especificar una clase que implemente `java.util.Comparator` y sobrescriba el método `CompareTo`. Por ejemplo, para obtener los nombres de las imágenes en orden alfabética inversa, implementamos la siguiente clase:

```java
public class ComparadorInverso implements Comparator<String> {  
    @Override  
    public int compare(String o1, String o2) {           
        return (o2.compareTo(o1));  
    }     
}
```

En el atributo `sort` de la colección tendríamos que indicar que utilice ahora este comparador.

### Colección ordenada (Ordered collection)

Si queremos que la misma base de datos ordene los elementos de la colección, se utiliza el atributo `order-by` en los mapeos `set`, `bag`, `idbag` o `map`. La ordenación se realiza mediante la lengua SQL. Esta solución está disponible solo bajo el JDK 1.4 o superior.

```xml
<set|map|bag|idbag>  
    name="nome propiedade"  
    table="nome dá táboa"  
    order-by="columna1 [,columna2..] [asc|desc]">  
    .........................  
</set|map|bag|idbag>
```

El atributo `order-by` debe ser una columna de la base de datos (o columnas), no una propiedad y podemos especificar la orden (asc o desc). Podemos ordenar por cualquier columna de la tabla de colección.

En los ficheiros de las clases, las colecciones implementantes y de la forma habitual según el tipo de colección (Set / HashSet, Map/HashMap o Collection|List/ArrayList), pero internamente, Hibernate utiliza variaciones de estas colecciones (LinkedHashSet o LinkedHashMap) que conservan la orden de inserción de los elementos clave.

Ejemplo:

En el mapeo del `<ibag>` en el fichero de mapeo `Produto.hbm.xml` que corresponde al mapeo de la propiedad `imaxes` de la clase producto, se agrega el atributo `order-by` para ordenar por el campo `nomeImaxe` en orden descendente cuando se recupere la colección.

- En el fichero `produto.java`:
   ```java
    private Collection<String> imaxes = new ArrayList<>(0);
    ```
- En el fichero `produto.hbm.xml`:
    ```xml
    <ibag name="imaxes" table="imagenes" order-by="nomeImaxe desc">
    ```



2.3.9 Colección de compoñentes  
Ata agora mapeamos coleccións dun único dato. Podemos ter varios datos como propiedades nunha 
clase compoñente e ter unha colección delas. A clase compoñente impleméntase como un POJO 
sen identificador.  

Imaxinemos por exemplo que temos o seguinte modelo de datos.  

Hibernate proporciona <composite-element> para o mapeo dunha colección de compoñentes. 
Nas coleccións <set>, <list>, <map>, <bag> e <idbag> pódese empregar esta etiqueta.  
<set|list|map|bag|idbag>  
  name="nome da propiedade" table="nome da táboa" >  
  <key column="columna clave foránea"/>  
  <composite-element class="nome clase compoñente">  
    <property name="nome da propiedade"/>  
   .............................  
  </composite-element>  
</set|list|map|bag|idbag  

Si definimos unha colección de compoñentes, e sobre todo nos Set, é moi importante implementar 
os métodos equals() e hashCode(), de xeito correcto na clase compoñente. Hibernates necesita 
estes métodos para comparar e chequear instancias en caso de modificacions.  

public int hashCode() {  
   int hash = 7;  
   hash = 31 * hash + Objects.hashCode(this.nomeImaxe);  
   hash = 31 * hash + Objects.hashCode(this.nomeFicheiro);  
   hash = 31 * hash + Float.floatToIntBits(this.tamaño);  
   return hash;  
} 

@Override  
public boolean equals(Object obj) {  
    if (obj == null) {  
            return false;  
    } 
    if (getClass() != obj.getClass()) {  
            return false;  
    } 
    final Imaxe other = (Imaxe) obj;  
    if (!Objects.equals(this.nomeImaxe, other.nomeImaxe)) {  
            return false;  

    if (!Objects.equals(this.nomeFicheiro, other.nomeFicheiro)) {  
            return false;  
    } 
    if (Float.floatToIntBits(this.tamaño) != Float.floatToIntBits(other.tamaño))         
      { 
            return false;  
    } 
    return true;  
} 

O mapeamento do ficheiro Produto.hbm.xml é similar ao visto antes pero usamos <composite-element>  
en lugar de <element>.  

2.3.10 Navegación bidireccional nas coleccións de compoñentes  
O elemento <composite-element> permite un subelemento <parent> que mapea unha propiedade 
da clase do compoñente como unha referencia á entidade propietaria.  
<parent name="nome da propiedade propietaria"/>  

No exemplo anterior, a navegación de Produto a Imaxe é unidireccional, é dicir podemos obter as 
imaxes dun produto mediante imaxes.getImaxes.iterator. Si quixeramos obter a partir dunha 
imaxe o seu produto co método prod.getProduto, teriamos que engadir no XML o subelemento 
<parent>.  

Na tarefa 7 faremos exercicios de como mapear os elementos dunha colección utilizando diferentes 
interfaces de coleccións soportadas por Hibernate.  
2.4 Mapeo de clase compoñente: Composición.


Propietaria
------------

A clase "compoñente" persiste como un tipo valor, non como unha referencia de entidade.

En programación orientada a obxectos, o termo "compoñente" fai referencia ao concepto de composición.

A clase compoñente non necesita un atributo identificador e tampouco o seu propio ficheiro hbm.xml. Mapéase no mesmo ficheiro de mapeo da súa clase propietaria utilizando a etiqueta <component>:

Tamén se permite a navegación bidireccional, igual que no mapeo das coleccións de compoñentes vistas anteriormente e segue a mesma lóxica. O elemento <component>, igual que o elemento <composite-element> para o mapeo das coleccións de compoñentes, permite un subelemento <parent> que mapea unha propiedade da clase do compoñente como unha referencia á entidade propietaria.

<component name="nome da propiedade propietaria">
  <parent name="nome da propiedade propietaria"/>
  <property name="..."/>
</component>

Na tarefa 8 faremos exercicios de como mapear as clases compoñente que non teñen unha táboa na base de datos asociadas.

As clases, ao igual que os obxectos, non existen de modo illado. Por esta razón existirán relacións entre clases e entre obxectos. Unha relación representa o vínculo entre dúas clases e represéntase cunha referencia aos obxectos.

Ante un deseño orientado a obxectos, é importante coñecer as diferentes relacións que se poden establecer entre as clases.

Imos considerar só as relacións entre "clases entidades", chamada asociacións.

O mapeo de asociacións entre clases é unha das partes fundamentais de calquera ferramenta ORM.

- Todas as clases participantes deben ter unha clave primaria na base de datos e polo tanto, unha táboa propia.

- Cada instancia das clases entidades ten un completo ciclo de vida independente. Os novos obxectos son transitorios e ten que facerse persistentes cada un, se queremos almacenalos na base de datos. A súa relación non inflúe no seu ciclo de vida, son independentes un do outro.

2.5.1 Características das relacións
-----------------------------------

A relación entre clases ten as seguintes características:

- Cardinalidade: indica cantas instancias poden existir en cada lado da relación. Por tanto, limita o número de obxectos relacionados.

Hibernate define catro tipos de relacións segundo a súa cardinalidade:

- Un a Un
- Un a Moitos / Moitos a Un
- Moitos a Moitos

Hibernate non ten en conta a cardinalidade mínima, é irrelevante.

- Direccionalidad e (multiplicidade): define a forma en que se navega entre a s entidades que manteñen unha relación:

- Unidireccional: se só unha entidade referencia á outra, é dicir sabe con que obxectos está relacionado, pero os devanditos obxectos non coñecen o obxecto orixinal.
:

Extremos de relación saben de objeto no extremo contrario. Hibernate soporta dos tipos de asociaciones bidireccionales: one-to-many y many-to-many.

### 2.5.2 Estrategias de carga de objetos

Hibernate permite utilizar diferentes estrategias de carga para recuperar o cargar un objeto en memoria, con sus colecciones y asociaciones.

Por ejemplo, si la clase Persona mantiene una colección de Actividades que realiza, cuando carguemos una Persona en memoria, Hibernate podría cargar ya los objetos correspondientes a sus Actividades: estrategia "inmediata" (o temperá). Una única consulta (con join) permitiría a Hibernate traer la información de la persona y de sus actividades y crear los objetos.

Pero también podemos cargar solo a la Persona en memoria, y cargar más tarde las Actividades: estrategia "preguiceira". En ese caso, Hibernate necesitaría por lo menos dos consultas (una para la persona y otra para sus actividades).

- La estrategia temperá (EAGER), indica que en el momento de obtener la entidad maestra se deben obtener las entidades hijas que estén asociadas, mientras que la estrategia preguiceira (LAZY) solo obtiene la entidad maestra y los datos de las entidades hijas se obtienen al forzar su consulta.
- Si usamos la estrategia lazy, podemos tener problemas al acceso de la colección fuera de la sesión. Hibernate xerará una excepción.
- En la estrategia eager, si accedemos a colección con muchos elementos, podemos tener problemas de memoria.

Hibernate soporta diferentes estrategias para decidir CÓMO cargar los datos (una consulta, varias...) y CUÁNDO hacerlo (todo, al mismo tiempo, por partes...).

### Estrategias de cómo cargar los objetos. Fetch mode

Cuatro tipos de estrategias definen CÓMO se cargan los datos:

- Recuperación por unión (join fetching): se recupera la instancia asociada a colección con un solo SELECT, usando join.
- Recuperación por selección (select fetching): se usa un segundo SELECT para recuperar la entidad o colección asociada.
- Recuperación por lotes: las entidades o colecciones asociadas vanse recuperando en bloques (a partir de una lista de identificadores).
- Recuperación por proxy: la entidad asociada no se trae a memoria hasta que no se accede a una propiedad suya, distinta del identificador.

### Estrategias de cuándo cargar los objetos. Fetch type

- Recuperación inmediata: la entidad o colección asociada se carga inmediatamente cuando se carga el objeto "propietario".
- Recuperación preguiceira de colecciones: la colección asociada no se carga hasta que se invoca una operación sobre la colección.
- Recuperación aínda más preguiceira de colecciones: cada miembro de la colección asociada se carga por separado, cuando se necesite.
- Recuperación por proxy: la entidad asociada no se trae a memoria hasta que no se accede a una propiedad suya, distinta del identificador.
- Recuperación "no-proxy": la entidad asociada no se trae a memoria hasta que no se usa la variable de la instancia.

Podemos cambiar esas estrategias en el mapeo para una propiedad o colección concreta.

### Estrategias por defecto

Por defecto, Hibernate usa:

- Para referencias a entidades (asociaciones monovaluadas): recuperación por proxy de forma preguiceira.
- Para referencias a colecciones (y asociaciones multivaluadas): recuperación preguiceira por selección.

Perigo de usar estrategia lazy: si accedemos a colección fuera de la sesión, Hibernate xerará una excepción.
:

Problemas de memoria.

2.5.3 Representación de asociaciones

- En las clases Java, mediante referencias a objetos y pueden ser colecciones.
- En la base de datos, mediante claves foráneas.
- Si la navegación es bidireccional, dos propiedades de dos clases diferentes están representadas por la misma clave foránea en la base de datos.

2.5.4 Asociación One-to-One

La relación uno a uno en Hibernate consiste simplemente en que un objeto tenga una referencia a otro objeto de forma que al persistirse el primer objeto también se persista el segundo.

Estas relaciones pueden ser expresadas en la base de datos utilizando la misma clave primaria (y/o mismo valor) para las dos tablas o bien mediante una clave alénea de una tabla a otra.

Una asociación de uno a uno a otra clase persistente se declara usando el elemento one-to-one.

<one-to-one
  name="nombre de la propiedad"
  class="nombre de la clase"
  cascade="estilo de cascada"
  constrained="true|false"
  fetch="join|select"
  property-ref="nombre de la propiedad referenciada"
  access="field|property|ClassName"
  formula="expresión SQL"
  lazy="proxy|no-proxy|false"
  entity-name="Nombre de la entidad"
  foreign-key="nombre de la clave foránea"
/>

- name: nombre de la propiedad.
- class (opcional): nombre de la clase asociada.
- cascade (opcional): especifica que operaciones deben ir en cascada desde el objeto padre hasta el objeto asociado.
- constrained (opcional): especifica que una restricción de clave foránea en la clave principal de la tabla mapeada referencia a la tabla de la clase asociada.

Ou a recuperación por selección secuencial.

- property-ref (opcional): nombre de una propiedad de la clase asociada que esté unida a la clave principal de esta clase. Si no se especifica, se utiliza la clave principal de la clase asociada.
- access (opcional - por defecto es property): estrategia que Hibernate utiliza para acceder al valor de la propiedad.
- formula (opcional): caso todas las asociaciones uno-a-uno mapean a la clave principal de la entidad propietaria. Si este no es el caso, puede especificar otra/s columna/s, o una expresión para unir utilizando una fórmula SQL.
- lazy (opcional - por defecto es proxy): por defecto, las asociaciones se recuperan preguicemente cuando se llama al método get. Al especificar lazy="no-proxy", indicamos que esta propiedad debe ser recuperada cuando se acceda por primera vez a la variable de instancia. Con lazy="false", se especifica que la asociación siempre será recuperada de forma temprana. Si constrained="false", la aplicación de proxies es imposible y Hibernate recuperará de forma temprana la asociación.
- entity-name (opcional): nombre de la entidad de la clase asociada.
- foreign-key (opcional): nombre de la clave foránea.

Clave primaria compartida entre ambas

Las asociaciones de claves principales no necesitan una columna extra en la tabla. Si dos filas están relacionadas por la asociación, entonces las dos filas de tablas comparten el mismo valor de clave principal.

En una asociación unidireccional uno a uno, sólo una entidad referencia a otra.

La clase Persona tiene una propiedad llamada dirección de la clase Dirección, mientras que la clase Dirección no posee ninguna referencia a Persona, ya que definimos una direccionalidad desde Persona hacia Dirección pero no al revés.

Para mapear la propiedad dirección en el archivo Persoa.hbm.xml, agregamos:

El atributo cascade indica a Hibernate cómo debe actuar cuando realicemos las operaciones de persistencia de guardar, borrar, leer, etc. En el ejemplo, el valor es all, indicando que deberemos realizar la misma operación en Persona que en Dirección.


**Asociación unidireccionalidad un a un entre Persoa e Enderezo**

Posto que no exemplo a relación un a un ten unha direccionalidade e desde Persoa ata Enderezo,  
por tanto Enderezo non sabe nada sobre Persoa.

O seguinte exemplo mostra o código para inserir unha nova Persoa. Como podemos ver, só  
persistimos a clase Persoa e debido á relación one-to-one e a operación en cascade="all",  
creáronse as filas tanto na táboa Persoa coma na táboa Enderezo.

```java
Persoa pers = new Persoa(7, "Ana", "Sanchez", "ana@gmail.com");
Enderezo enderezo = new Enderezo(7, "Paz", 3, "4A", "36008", "Poio");
pers.setEnderezo(enderezo);
sesion.save(pers);
tx.commit();
```

Nesta asociación unidireccionalidad un a un entre Persoa e Enderezo, non podemos asegurar que o  
obxecto Enderezo teña a mesma clave primaria que Persoa.

Podemos facer que a clave de Enderezo sexa a mesma que a clave de Persoa, facendo a asociación  
bidireccional e xerando automaticamente o valor da clave de Enderezo a partir do valor introducido  
na clave de Persoa.

Agora na clase Enderezo temos que inserir un campo que faga referencia á clase Persoa, para poder  
utilizar a bidireccionalidade.

O arquivo Persoa.hbm.xml queda como o exemplo anterior. Agora te mos que modificar o arquivo  
Enderezo.hbm.xml e engadir:

```xml
<Generator class="foreign">
  <Param name="property">persoa</Param>
</Generator>
```

Asígnaselle o mesmo valor de clave primaria que á instancia de Persoa.

No seguinte código créase unha instancia de Persoa e outra de Enderezo e posteriormente  
enlázanse de xeito bidireccional utilizando os métodos setXXX de ambas clases. Na táboa da base  
de datos, insírese unha fila na táboa Persoa e outra fila na táboa dirección e nesta tamén se insire  
a clave primaria da táboa Persoa.

```java
Persoa pers = new Persoa(7, "Ana", "Sánchez", "ana@gmail.com");
Enderezo enderezo = new Enderezo("Paz", 3, "4A", "36008", "Poio");
pers.setEnderezo(enderezo);
enderezo.setPersoa(pers); // por ser bidireccional
sesion.save(pers);
tx.commit();
```

Agora cada entidade ten a súa propia clave e necesítase unha columna extra nunha das táboas para  
establecer a clave foránea. As relacións vanse facer a través desta clave foránea.

Para mapear a propiedade enderezo no ficheiro Persoa.hbm.xml engadimos:

```xml
<many-to-one name="enderezo" column="clave foránea" not-null="true"/>
```

Para establecer a relación das entidades a través da clave foránea temos que utilizar <many-to-one>  
en lugar de <one-to-one>, por que temos unha entidade Persoa que ten unha clave foránea  
IdEnderezo apuntando a outra entidade Enderezo. Co atributo unique="true" impedimos que  
dúas instancias de Persoa compartan a mesma instancia Enderezo.

Finalmente, si queremos que a asociación sexa bidireccional, no ficheiro Enderezo.hbm.xml  
ponerimos:

```xml
<many-to-one name="persoa" column="clave foránea" not-null="true" unique="true"/>
```

**Asociación One-to-Many ou Many-to-One**

As relacións de un a moitos ou moitos a un destacan pola súa frecuencia de aparición. Nas relacións  
un a moitos, un obxecto da entidade "A" (lado un) está relacionado con moitos obxectos da entidade e  
"B" (lado moitos) e moitos a un, moitos obxectos da entidade "B" (lado moitos) están relacionados  
cun obxecto da entidade "A" (lado un).

Impleméntase en Java, cunha propiedade (referencia a un obxecto) na clase do "lado moitos” e /ou  
unha colección na do "lado un”. Si a relación é bidireccional, a impleme ntación é dos dous lados,  
en cambio si é unidireccional só se implementa nun dos lados.

Temos tres posibilidades de implementación, mediant e:

- Unha asociación unidireccional moitos a un. A implementación da relación só se realiza na  
clase do”lado moitos” mediante unha propiedade que referencia ao “lado un”. Na outra clase  
do “lado un” non se implementa ningunha relación.

```xml
<class name="Clase-lado-moitos">
  <id name="identificador" column="clave primaria">
    <generator class="estrategia de xeración da clave"/>
  </id>
  <property name="clase-lado-un" column="clave foránea" not-null="true"/>
</class>
<class name="clase-lado-un">
  <id name="identificador" column="clave primaria">
    <generator class="estrategia de xeración da clave"/>
  </id>
</class>
```

Espero que esto te sea útil. ¡Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar!
:

- Unha asociación unidireccional un -a-moitos  nunha clave foránea: é un c aso moi in usual e non 
se recomenda. A implementación da relación só se realiza na clase do ”lado un” mediante unha 
colección que referencia ao “lado moitos ”. Na outra clase do “la do moitos” non se implementa 
ningunha rel ación.

- Unha asociación bidireccional:  A implementación da relación realízase nos dous lados, na 
clase do “lado moitos” mediante unha propiedade que referencia ao “lado un” e na clase do” 
lado un”  mediante unha colección que referencia ao “lado moitos”.   

- A etiqueta inverse="true" , hai que engadila sempre que implementemos unha asociación 
bidireccional e sempre no "lado un" , é dicir  na colección. Na asociación unidire ccional non se 
engade.

- A razón po la que sempre temos  que enga dir inverse=”true” nas relacións bidireccionais, é porque 
agora temos dúas asociacións unidireccionais que mapean sobre a mesma columna (a clave 
foránea), entón: ¿Qué lad o controla esta columna?. En tempo de execución hai d úas representa cións 
en memoria do mesmo valor,  a propiedade do lado moitos e un elemento da colección do lado un. 
Nun momento dado, pódese modificar ese valor e Hibernate detectaría dous cambios en memoria 
nas instancias persistentes. Hibernate non detecta o feito de que os dous cambios se re firen a mesma 
columna, xa que temos mapeada a clave foránea dúas veces e Hibernate necesita coñecer este feito 

- No exemplo anterior amósase  unha relación bidireccional e a cardinalidade é  One to Many  entre 
Departamento e Proxecto e Many to One  entre Proxecto e Departamento. Utilizouse a interface Set 
para as coleccións pero outras opcións serían igualmente válidas.

- Mapeo da propiedade do "lado moitos".  
- name: nome da p ropiedade.  
- column (opci onal): nome da columna da clave foránea .  
- class (opcional ): nome da clase asociada.  
- cascade (opcional - por defecto none) : especifica que operacións deben ir en cascada desde o 
obxecto pai ata o obxecto asociado.  
- fetch (opc ional - por defecto é select): e scolle entre facer varias consultas Select para 
recuperación dos datos o u facer só unha utilizando unha consulta de unión (outer -join).  
- update, insert (opcional - por defecto é true) : especifica que as columnas mapeadas deben ser 
incluídas nas declar acións SQL UPDATE e/ou INSERT. Ao  establecer ambas como false 
permite unha asociación  "derivada" onde o seu  valor é inicializado desde algunha outra 
propiedade que mapea á mesma columna (ou columnas), por un disparador ou por o utra 
aplicación . 
- property -ref: (opcional): nome dunha propiedade da clase asociada que se encont ra unida á sú a 
clave foránea. Si  non se especifica, utilízase a clave principal da clase as ociada.



valor da propiedade.  
- unique (opcional): a ctiva a xeración DDL dunha restrición de unicidade e para a columna de clave foránea. Amais permite que este sexa o obxectivo dunha property -ref. Pode f acer que a asociación sexa de multiplicidade e un-a-un.  
- not-null (opcional): a ctiva a xeración DDL dunha restrición de nulabilidad e para as c olumnas de clave foránea.  
- optimistic -lock (o pcional - por defecto é true): e specifica que as actualizacións a esta propiedade requiren ou non da obtención d un bloqueo optimista.  
- lazy (opcional - por defecto é proxy ): por defecto  as asociacións recupéranse preguice ira mente cando se chama o método get. lazy="non -proxy"  especifica que esta propi edade debe ser recuperada cando se acceda por primeira vez á variable de instancia. lazy="false"  especifica que a asociación sempre será recuperada de xeito temperán . 
- not-found (opcional - por defecto é exception ): especifica como se manexarán as claves foráneas que referencian as filas que faltan. ignore tratará unha fi la perdida como unha asociación nula.  
- entity -name (opcional): nome de entidade da clase asociada.  
- formula (opcional): unha expresión SQL que define o valor para unha clave foránea computada.  
Exemplo: p ara mapear o exemplo anterior, no ficheiro Proxecto.hbm.xml engadimos:  

- Usamos <many-to-one>  en lugar de <property> para que Hi bernate saiba que a propiedade non contén un valor, senón unha referencia a unha entidade  (instancia doutra clase).  
- A columna Num_departamento_controla  é a columna da táboa Departamento  que actúa como clave foránea.  
- Mapeo da propiedade do "lado un”.  
<one-to-many 
   class="Nome clase asociada"  
   not-found="ignore|exception"  
   entity-name="nome da entidade"  
/> 
- class (obrigatorio ): nome da clase asociada.  
- entity -name (opcional): nome de entidade da clase asociada.  

foráneas que referencian as filas que faltan. ignore tratará unha fila perdida como unha asociación nula.  
Exemplo:  

- No "lado un " temos unha colección e mapeá mola utilizando a etiqueta <set>  porque se trata dunha colección que utiliza a interface Set.  
- Coa etiqueta <one-to-many>  indicamos que a colección non contén valores, senón r eferencias a entidades doutra clase (Proxecto).  
- Coa etiqueta  <key>  indicamos que a lista de elementos da colección débese obter r evisando a columna Num_departamento_controla  da táboa da clase Proxecto e que ademais é a clave foránea nesta táboa.  
- A etiqueta inverse="true",  hai que engadi la sempre que implemente mos unha asociación bidireccional e sempre no "lado un",  é dicir  na colección. Na asociación un idireccional non se engade.  
- Hibernate manexa por defecto as relacións en modo " lazy ", é dicir non fai a consulta sobre a táboa Proxecto ata que non pedimos os proxectos que controla o departame nto. En modo lazy as consultas SQL lazy son disparadas polos métodos get. Si  se acc ede aos atributos directamente obterase null xa que desta forma non se dispara a co nsulta SQL.  
Conclusión: recomé ndase poñer os atributos pr ivate para evitar accesos directos que non disparen as consultas SQL en modo lazy.  
- Se o atributo fetch toma o valor select  (valor por defecto), fará unha consulta par a obter os datos do departamento e outra consulta para obter os proxectos relacionados. Se polo contrario fetch toma o valor join, hibernate obtén cunha soa consulta ( left o uter join) os datos do departamento e os seus proxectos.  
2.5.6  Asociación Many -to-Many  
A relación moitos a moitos consiste en que unha instancia da clase A pode estar relacionada  con varias instancias da clase B e unha instancia da clase B pode estar relacionada con varias instancias da clase A .


As relaciones muchos a muchos no modelo relacional se implementan con una tabla intermedia.

Ejemplo:

Las asociaciones muchos a muchos representan se media ante la etiqueta `<many-to-many>`.

`<many-to-many`
  `column="nombre de la columna"`
  `formula="expresión SQL"`
  `class="nombre de la clase"`
  `fetch="select|join"`
  `unique="true|false"`
  `not-found="ignore|exception"`
  `entity-name="nombre de la entidad e"`
  `property-ref="nombre de la clase referencia"`
/> 

- En el caso de que la relación sea unidireccional:
- Sólo la entidad "A" tiene una referencia a los objetos de tipo "B".
- Esta relación está representada por una colección y la entidad "A" puede acceder a cada uno de los objetos de tipo "B" de esa colección.

Para mapear la propiedad de la colección, en el archivo Persoa.hbm.xml se agrega:

- En el caso de que la relación sea bidireccional:
- La entidad "A" tiene una referencia a los objetos de tipo "B" y la entidad "B" tiene una referencia a los objetos de tipo "A".

- Como siempre, en una asociación bidireccional se requiere que se establezca uno de los extremos con `inverse="true"`.
- Como ya comentamos, que un lado de una asociación bidireccional tiene que mapearse como `inverse` porque tenemos nombrada la clave foránea dos veces.
- El mismo principio se aplica en las asociaciones muchos a muchos: cada fila de la tabla intermedia (de enlace) está representada por dos elementos de colección.
- Una asociación entre la entidad A y B está representada en memoria por una instancia A de la colección de B, pero también por una instancia B en la colección de A.

Para mapear la propiedad de colección `Actividades`, en el archivo `Persoa.hbm.xml` se agrega:

Para mapear la propiedad de colección `Persoas`, en el archivo `Actividade.hbm.xml` se agrega:

El `inverse="true"` en la colección `actividades` del archivo `persoa.hbm.xml`, dice a Hibernate que ignore los cambios hechos en la colección `actividades` y utilice el otro extremo de la asociación, la colección `persoas`, para la sincronización con la base de datos.
En las asociaciones muchos a muchos bidireccionales, no tenemos porque poner el mismo tipo de colección en ambos lados.
Por ejemplo, podemos poner una colección `<list>` en el lado no inverso y un `<bag>` en el lado inverso.
Hay que tener en cuenta que las colecciones indexadas (listas y maps) no funcionan en el lado inverso porque Hibernate no inicializará o mantendrá la columna del índice de estas colecciones.
:

Supongamos la relación anterior entre Actividades e Personas, que queremos registrar la nota obtenida de cada persona en la realización de la actividad.

En la base de datos, el atributo nota se agregaría a la tabla intermedia (join), como se muestra a continuación:

Hay varias estrategias para implementar esto.

Mapeado de la tabla join en una entidad intermedia
Una opción consiste en establecer entre las entidades Persona y Actividad, una entidad PersonaActividad. El identificador de esta entidad es la composición de IDActiv e IdPersona. El diagrama de clases se muestra a continuación:

Las dos asociaciones many-to-one son solo de lectura; insert e update están puestos a false. Esto es necesario porque las columnas están mapeadas dos veces, una en la clave compuesta (que es responsable de la inserción de los valores) y otra en las asociaciones many-to-many.

Las entidades Actividad y Persona tienen una asociación one-to-many con la entidad PersonaActividad.

En el archivo Persoa.hbm.xml, se agrega:

En el archivo Actividade.hbm.xml, se agrega:

Una ventaja de esta estrategia es la posibilidad de navegación bidireccional. El inconveniente es que el código es más complejo para gestionar las instancias de PersonaActividad, para crear y borrar las asociaciones (tienen que registrarse y borrarse independientemente) y para gestionar la clave compuesta.

Con todo, podemos permitir persistencia transitiva con las opciones de cascade en las colecciones de Persona y Actividad.

Mapeado de la tabla join con una colección de componentes
Otra alternativa es hacer que la clase PersonaActividad sea de tipo valor, sin un identificador. Y esta clase componente tiene que estar poseída por una entidad. Por ejemplo, vamos a hacer que la propietaria sea Persona, entonces esta identidad tiene que tener una colección de componentes.


No ficheiro Persoa.hbm.xml, engadimos o mapeo da clase compoñente.

O inconvi nte é que non hai modo de permitir navegación bidireccional: un compoñente como PersoaActividade non pode por definición ter referencias compartidas. Non podemos navegar dende Actividade a PersoaActividade. Non obstante, podemos executar unha consulta para atopar os obxectos que necesitemos.

2.5.8 Persistencia transitiva

Por defecto Hibernate, non navega polas asociacións, co que operacións de inserción, borrado ou modificación non teñen efecto sobre as entidades asociadas. Pode chegar a ser bastante incómodo gardar, borrar, ou modificar obxectos individuais, especialmente si tratamos cun grafo de obxectos asociados.

As instancias das entidades asociadas teñen ciclos de vida independentes e soporan referencias compartidas. Eliminar unha entidade dunha colección non significa que se borre esta da base de datos. Estas instancias son transient e teñen que ser persistidas si as queremos gardar, borrar ou modificar na base de datos.

Entón temos dúas opcións:

- Persistir cada unha das instancias de forma individual. Isto implica máis código.
- Usar a característica de persistencia transitiva, que permite aforrar liñas de código e manexar automaticamente o ciclo de vida das instancias de entidades asociadas.

Para usar a característica de persistencia transitiva, Hibernate permite a configuración de cada unha das asociacións. Para ello usamos o atributo cascade nas asociacións de entidades, que especifica que operacións deben ir en cascada dende o obxecto pai ata o obxecto asociado.

A continuación, preséntanse as opcións que o atributo cascade pode aceptar:

- save-update -> Navega a asociación cando a sesión é sincronizada e cando o obxecto executa algún dos métodos save(), saveorupdate ou update(), propaga estás operacións ás entidades asociadas. Os obxectos das entidades asociadas poden estar transient ou detached, e pasan a persistent.
- delete -> Borra as entidades asociadas en estado persistente.
- persist -> Hibernate persiste calquera instancia transient asociada cando se chama ao método persist() do obxecto.
- merge -> Navega a asociación e propaga a operación merge(). As instancias das entidades asociadas en estado detached, replicanse como persistent e as transient pasan a persistent.
- Lock -> Incorpora ao contexto de persistencia aquelas instancias de entidades asociadas que estean en estado detached. O modo de bloqueo (Lock Mode) non é propagado.
- evict() -> Borra da caché todas as instancias de entidades asociadas.
- refresh -> Recupérase o estado dos obxectos asociados da base de datos.
- all -> Todas as opcións mostradas anteriormente.
- delete-orphan -> Borra as entidades asociadas cando son eliminadas da asociación, é dicir, provoca o borrado dos obxectos con só sacalos da colección do pai. Úsase cando a entidade borrada non ten referencias compartidas. Aplícase só a s asociacións un-a-moitos.

Recomendacións:

- Usualmente non ten sentido habilitar o tratamiento en cascada nunha asociación <many-to-one> ou <many-to-many> e si se habilita, a opción saveupdate sería a que ten sentido. O tratamiento en cascada é frecuentemente útil para as asociacións <one-to-one> e <one-to-many>.
- Se o período de vida dos obxectos fillos está ligado ao período de vida do obxecto pai, unha opción para aforrar código é especificar cascade="all,delete-orphan".

2.6 Mapeamento da herdanza (xerarquías)

As clases java que queremos facer persistentes con Hibernate poden ter herdanza, é dicir, unhas clases herdan doutras. Por exemplo:

A herdanza é un dos desaxustes estruturais entre a orientación a obxectos e as bases de datos relacionais. Os SXBD non soportan herdanza en forma nativa e polo tanto, é necesario mapear.

Catro posibles estratexias de mapeo:


- Táboa por subclase concreta con unións.
- Táboa por xerarquía.
- Táboa por clase.

2.6.1 Táboa por cada suclase concreta

Créase unha táboa por cada subclase concreta, redundando todos os atributos.

Mapeamos cada subclase concreta á súa táboa correspondente, do xeito usual e por separado. A superclase Persoa non se mapea.

- Mapeamos a clase Empregado no ficheiro Empregado.hbm.xml:
- Mapeamos a clase Desempregado no ficheiro Desempregado.hbm.xml: Mapeo

Inconvenientes:

- Hai que repetir o mapeo das propiedades da subclase en todos os ficheiros de mapeo.
- Non soporta consultas polimórficas. Unha consulta contra a superclase debe executarse como varias SELECTs ou consultas HQL, unha por cada subclase concreta. A superclase non se pode consultar directamente.
- Ex: non podemos recuperar dunha vez todas as persoas.
- Non da soporte ás asociacións polimórficas. As asociacións na base de datos represéntanse habitualmente como claves foráneas. Na figura anterior, se mapeamos as subclases en diferentes táboas, unha asociación polimórfica coa súa superclase Persoa non se pode represe ntar como unha relación de clave foránea. Isto sería problemático no noso modelo si a clase Persoa tivera unha relació n con outra entidade, por exemplo, un a moitos con Vehículo, esta táboa Vehículo necesitaría unha columna cunha soa clave foránea que se tería que referenciar con ambas táboas das subclases e isto non é posible.
- Ex: A clase persistente Vehículo ten a súa propia táboa asociada.
- ¿A que táboa debe apuntar a clave foránea IDPersoa? Aquí o maior problema é que non podemos engadir unha restrición de clave foránea á columna IDPersoa, porque algunhas filas corresponden coa táboa Desempregado e outras coa táboa Empregados. Hai que implementar outra forma de asegurar a integridade (un trigger, por exemplo).



- Un problema conceptual adicional con esta estrategia de mapeo es que algunas columnas distintas en distintas tablas comparten la misma semántica. Esto hace que el sistema sea más complejo. Por ejemplo, un cambio en una propiedad de la superclase implica cambios en múltiples columnas o que hace mucho más difícil implementar restricciones de integridad en la base de datos.  
Recoméndase esta estrategia solo en el nivel superior de la jerarquía donde el polimorfismo no es requerido y las modificaciones de las superclases no va a ser probable.  

2.6.2 Tabla por clase concreta con uniones  
Como la anterior, cada clase concreta se asocia a una tabla con todos los atributos. Pero ahora definimos un único archivo de mapeo, donde se especifica:  
- Cal es la superclase abstracta, sus propiedades y como se mapean.  
- Cales son las subclases concretas, sus propiedades y como se mapean en las tablas correspondientes.  

Seguimos teniendo dos tablas con columnas de la superclase duplicadas pero lo que es nuevo y un mapeo especial de Hibernate que ahora se incluye en la superclase.  
Las subclases indican con la etiqueta:  
<union-subclass name="nombre de la subclase" table="nombre tabla">  
      <property name="nombre propiedad" type="tipo de datos">  
         <column name="nombre de la columna" />  
      </property>  
……………………… ………  
 </union-subclass>  

Como Persona es una superclase abstracta, tiene que declararse como abstract="true"; en otro caso sería necesaria una tabla para las instancias de la superclase.  
El mapeo del identificador está compartido para todas las subclases concretas de la jerarquía.  
Las propiedades de la superclase declaranse en property y son herdadas por todas las clases concretas. Esto evita la duplicidad.  
Cada subclase concreta se mapea a una tabla; la tabla hereda el identificador de la superclase y las propiedades.  
Vantajas:  
- Ao usar un archivo de mapeo único, la definición de las propiedades comunes ya no se duplica.  
- Las consultas polimórficas ya funcionan. Podemos recuperar instancias de Empleado y de Desempleado, pero también de Persona. Ahora si podríamos realizar la siguiente consulta:  
List<Persona> personas = (List<Persona>) sesion.createQuery("From Persona").list();  
for (Persona i : personas) {  
            System.out.println(i.getNombre()+" "+i.getApellidos());  
} 
- Pódense chegar a soportar asociaciones polimórficas; por ejemplo, un mapeo de la asociación de Vehículo a Persona es posible. Hibernate puede usar una consulta UNION para simular una única tabla como objetivo en el mapeo de la asociación.



Agora temos una única tabla con todas las propiedades y toda la jerarquía mapeada en esta tabla.

**Tabla de propiedades y jerarquía**

| Propiedad | Tipo de dato | Discriminante | Valor |
| --- | --- | --- | --- |
|  |  |  |  |

**Definición de la columna de discriminante**

<discriminator column="nombre de la columna" type="tipo de datos"/>

**Mapeo de cada subclase**

<subclass name="nombre de la subclase" discriminator-value="valor">
  <property name="nombre de la propiedad" type="tipo de datos">
    <column name="nombre de la columna" />
  </property>
  ...
</subclass>

**Clase raíz Persoas**

La clase raíz Persoas de la jerarquía se mapea con la tabla Persoas. En la base de datos se agregó la columna Tipo que es el discriminante de la clase y los valores que puede tomar son “EMP” o “DESC”.

**Restricciones NOT NULL**

No se permiten restricciones NOT NULL en las columnas de la subclase.

**Fórmula para calcular el discriminador**

<discriminator formula="case when salario is not null then 'EMP' else 'DES' end" type="string"/>

**Estrategia de mapeo**

Esta estrategia es la mejor en términos de simplicidad y rendimiento. Presenta el mejor rendimiento para representar el polimorfismo y es más fácil de implementar. Es posible una consulta ad-hoc sin joins y uniones complejas. Facilita la evolución del esquema.

**Problemas de la estrategia**

- Puede ser un serio problema el hecho de que todas las columnas de las subclases deben admitir nulos y el modelo tiene subclases con propiedades con la restricción de que no puede ser nulo.
- Otro problema es la normalización. Tenemos dependencias entre columnas que no son clave violando la tercera forma normal.
- Complícase mantener la integridad de los datos, sobre todo en el caso de que se queira imponer una restricción solo a las ocurrencias de una subclase, por ejemplo, si se quisiere que solo las personas que son empleados puedan ser propietarios de un coche.


Tanto a superclase como as subclases son persistentes e tienen a su tabla. As relaciones de herencia 
representanse mediante claves foráneas. Todas comparten a clave primaria.

Cada tabla que representa a las subclases só tiene columnas para las propiedades no heredadas (cada 
clase, sus) junto con la clave primaria que es una clave foránea de la tabla de la superclase.

Se una instancia de la subclase Empregado es hecha persistente, los valores de las propiedades declaradas 
en la superclase Persoa son persistidos en una nueva fila de la tabla Persoa. Só los valores de las 
propiedades declaradas por la subclase son persistidos en una nueva fila de la tabla Empregado y sus 
filas quedan enlazadas por el valor de su clave primaria. Después, la instancia de subclase se puede 
obtener de la base de datos haciendo join con la tabla de la superclase.

En Hibernate, usamos el elemento <joined-subclass> para crear una tabla por subclase: 
   <joined-subclass name="nombre de la subclase" table="nombre de la tabla">  
            <key column="clave foránea" />  
            <property name="nombre propiedad" type="tipo de datos">  
                <column name="nombre de la columna" />  
            </property>  
              ……………….  
    </joined-subclass>  
El elemento <joined-subclass> mapea una subclase a una tabla y todas las propiedades declaradas en la 
subclase son mapeadas en esta tabla. Una clave primaria se requiere para la tabla que mapea a la 
superclase. Esta columna también tiene una restricción de clave foránea con la clave primaria de la 
tabla que mapea a la superclase.

Un elemento <joined-subclass> puede contener otros elementos <joined-subclass> para mapear toda la 
jerarquía.

Una ventaja de esta estrategia es que el esquema SQL está normalizado y la evolución del esquema y la 
definición de restricciones es fácil. Una asociación polimórfica para una subclase particular se puede 
representar como una clave foránea referenciando a la tabla de esa subclase particular.

Cuando hacemos una consulta en la superclase, internamente Hibernate tiene que realizar una consulta 
más compleja, basada en outer join. El rendimiento puede verse reducido considerablemente en una 
jerarquía compleja. Las consultas requieren joins entre muchas tablas y muchas lecturas secuenciales.
