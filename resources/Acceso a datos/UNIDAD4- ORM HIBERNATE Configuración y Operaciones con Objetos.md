Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: Hibernate - Herramienta ORM

C.S. de Desenvolveento de Aplicaciones Multiplataforma

Unidad 4: Hibernate - Configuración e operación con objetos

- 1. Mapeo objeto relacional
  - 1.1 Desajuste estructural entre el modelo OO y el modelo relacional
  - 1.2 Concepto de mapeo objeto relacional
  - 1.3 Ferramentas ORM. Ventajas e inconvenientes

- 2. Hibernate
  - 2.1 Arquitectura Hibernate
  - 2.2 Como trabaja Hibernate
  - 2.3 Descargar Hibernate
  - 2.4 Configuración
    - 2.4.1 Configuración del servicio Hibernate

- 3. Inicio de Hibernate
  - 3.1 Creación de una instancia SessionFactory
  - 3.2 Creación de objetos Session

- 4. Traballando con objetos
  - 4.1 Comezando una unidad de trabajo
  - 4.2 Ciclo de vida de objetos persistentes
  - 4.3 Persistindo un objeto
  - 4.4 Recuperando un objeto persistente por id
  - 4.5 Modificando un objeto persistente
  - 4.6 Borrando un objeto persistente
  - 4.7 Arquitectura de caché en Hibernate
    - 4.7.1 Caché de primer nivel (Caché del contexto de persistencia)
    - 4.7.2 Caché de segundo nivel
  - 4.8 Transacciones
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

1.1 Desajuste estructural entre el modelo OO y el modelo relacional

La mayoría de las aplicaciones que se utilizan están diseñadas para usar la Programación Orientada a Objetos (POO) basada en objetos. Los objetos son entidades que tienen un determinado estado, comportamiento (método) e identidad:

- El estado se compone de datos o información. Estos datos son representados por uno o varios atributos que almacenan valores concretos, o cada uno define la condición actual del objeto. Ejemplo:
  Objetos "Empleado":
    - Id: 1
    - Nombre: "María"
    - Apellido: "García"
    - Edad: 28 años
    - Departamento: "Finanzas"
    - Cargo: "Analista Financiero"
    - Salario: 2500 euros

- El comportamiento está definido por los métodos o mensajes a los que sabe responder el objeto, es decir, que operaciones se pueden realizar con él. Ejemplos:
  - Método ascender(int id, String nuevoCargo): Actualiza el cargo del empleado.
  - Método aumentarSalario(int id, double porcentajeAumento): Ajusta el salario del empleado.
  - Método cambiarDepartamento(int id, String nuevoDepartamento): Modifica el departamento del empleado.

- La identidad es una propiedad del objeto que lo diferencia del resto.
  El atributo "id" actúa como identificador único para cada objeto "Empleado". Aunque dos empleados pueden compartir el mismo nombre o apellido, su identificador único (id) será diferente, lo que les proporciona su propia identidad dentro del sistema.

El estado de los objetos debe persistir, es decir, preservarlo de forma permanente (guardarlo), para que, posteriormente, se pueda recuperar la información de este (leerlo) para su utilización de nuevo.

Para la persistencia de los objetos existen varias técnicas. Una de las más extendidas es la utilización de una base de datos relacional.

Estas bases de datos almacenan la información mediante tablas, filas y columnas y no se pueden guardar de forma directa los objetos en las tablas.

Para almacenar un objeto hay que realizar una correlación entre el sistema orientado a objetos de la lengua y el sistema relacional de nuestra base de datos.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Objetos que vamos creando en nuestra aplicación, sino que lo que hacemos es convertir los datos del objeto en datos primitivos para poderlos almacenar en las tablas correspondientes de nuestras bases de datos. Si luego necesitamos ese objeto en alguna parte de nuestra aplicación, debemos de recuperar los datos primitivos de la base de datos y volver a construir el objeto.

Otra diferencia está en el establecimiento de las relaciones. En el modelo OO, las relaciones entre clases se representan mediante referencias a objetos o colecciones de referencias a objetos y pueden ser bidireccionales. Estas referencias direccionales se utilizan para navegar desde un objeto a otro. En el modelo relacional, las relaciones se representan mediante claves foráneas (FK), y copias de valores en diferentes tablas. Las claves foráneas no son inherentemente direccionales.

Otro problema es el que se refiere a la navegación. Traballando con objetos, saltamos de un objeto a otro "paseando" (invocando métodos) por el grafo de las asociaciones (referencias). Para obtener datos de diferentes tablas en una base de datos relacional implica realizar un o más (custosos) joins.

Ejemplo: En programación OO, para visualizar el nombre del empleado que dirige el departamento 1:

        Departamento dept= (Departamento)sesion.get(Departamento.class,1);
        String nombre=dept.getEmpregado().getNombreCompleto();

No modelo relacional, habría que hacer una consulta join:

SELECT Nombre+' '+Apelido_1+' '+Apelido_2 FROM EMPREGADO INNER JOIN DEPARTAMENTO ON NSS_dirixe=NSS WHERE Num_departamento=1;

Además, cuando se invoca la lengua de consulta SQL desde una lengua de programación es necesario un mecanismo de vinculación que permita percorrer las filas de una consulta a la base de datos y acceder de forma individual a cada una de ellas.

No modelo relacional no se puede modelar la herencia que aparece en el modelo orientado a objetos. El paradigma OO da soporte a la herencia, normalmente en forma de superclases y subclases y los objetos heredan atributos y comportamientos de sus objetos padres, por contra, los SGBD no soportan herencia en forma nativa y, por tanto, es necesario utilizar alguna estrategia para implementar la herencia. Las técnicas que se utilizan son: una tabla por cada subclase, una tabla por jerarquía o una tabla por clase.

Nota: He eliminado los puntos de los índices y el número de página, y he transformado la lista a una lista markdown con guiones. He mantenido los saltos de línea dobles y he eliminado los bloques de código del tipo ```markdown```.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Existen también desajustes en los tipos de datos, ya que los tipos de datos almacenados en la base de datos difieren de los utilizados en las lenguas de programación.

Tipos de datos JAVA  Tipos de datos SQL

- boolean  En SQL, no hay un tipo de datos boolean directo en todas las bases de datos.
  - Algunos sistemas de bases de datos, como PostgreSQL o MySQL, proporcionan tipos como BOOLEAN o BOOL, pero otros sistemas pueden usar tipos numéricos o de cadena de texto para representar valores booleanos o bit (0,1) como Sql Server

- String  En SQL, se utiliza el tipo de datos VARCHAR, CHAR o TEXT para almacenar cadenas de texto.
  - La longitud máxima de una cadena en SQL se especifica generalmente al definir la columna (por ejemplo, VARCHAR(255)).

- int  El tipo de datos INT en SQL se utiliza para almacenar números enteros.
  - También hay variaciones en tamaños, como TINYINT, SMALL INT, INTEGER o BIGINT, que representan diferentes tamaños de enteros según la precisión necesaria.

- double o float  En SQL, se utilizan tipos como FLOAT o DOUBLE para representar números en punto flotante.
  - La precisión y el almacenamiento de estos tipos pueden variar según la base de datos.

- Date, Calendar, LocalDate, LocalDate, LocalTime, (para Java 8 y posteriores)  En SQL, se utilizan tipos con DATE, TIME, DATETIME, TIMESTAMP.
  - Los detalles de la representación y la precisión pueden variar entre diferentes sistemas de bases de datos.

Estos desajustes en los tipos de datos entre Java y SQL pueden necesitar conversión o gestión especial al interactuar entre la capa de aplicación en Java y la base de datos relacional. Se emplean técnicas como mapeo objeto-relacional (ORM) o consultas parametrizadas para gestionar estas diferencias y asegurar la coherencia en el intercambio de datos entre la aplicación y la base de datos.
Aquí está el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Para atenuar los efectos del desajuste entre los dos modelos existen varias técnicas y una de las más usada es el mapeo Objetos/Relaciones.

ORM (Object Relational Mapping - Mapeo Relacional de Objetos) es una técnica de programación para convertir datos entre la lengua de programación orientada a objetos y el sistema de gestión de base de datos relacional utilizado en el desarrollo de aplicaciones.

A importancia de la utilización de las técnicas de mapeo objeto-relacional es que convierte, de forma automática, los objetos en los datos primitivos almacenados en las tablas de la base de datos relacional, simulando así el acceso a un sistema de base de datos orientado a objetos. Esto posibilita el uso de características propias de la orientación a objetos como herencia y polimorfismo.  En la práctica, el mapeo objeto-relacional crea una base de datos virtual orientada a objetos sobre la base de datos relacional.

- Técnicas de mapeo objeto-relacional
- Mapeo Relacional de Objetos (ORM)
- Base de datos virtual orientada a objetos
- Herencia y polimorfismo


Aquí te dejo el contenido del PDF en formato Markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Entre las características de una herramienta ORM, podemos citar:

- Permite trabajar directamente con las clases diseñadas en nuestro modelo de dominio, sin tener que trabajar con filas de las tablas de la base de datos.
- Permite trabajar con diferentes bases de datos (SQLServer, Oracle, MySQL, PostgreSQL...) y para cambiar de una base de datos a otra solo hay que realizar el cambio en el fichero de configuración.
- Xera automaticamente el código SQL necesario para el acceso a la base de datos, usando un mapeo objeto relacional, que se especifica mediante un documento XML o por anotaciones.
- Permite crear, modificar, recuperar y eliminar objetos persistentes y además permite navegar por las asociaciones entre los objetos y actuarlos al final de una transacción.

Vantajas

- Rapidez en el desarrollo. La mayoría de las herramientas actuales permiten la creación del modelo por medio del esquema de la base de datos, leyendo el esquema, creándonos el modelo adecuado.
- Abstracción de la base de datos. Al utilizar una herramienta ORM, evitamos la inclusión de sentencias SQL embebidas en el código de la aplicación, separándonos totalmente del sistema de Base de datos que utilicemos. Esto facilita la migración hacia otro sistema gestor de bases de datos siendo el cambio más sencillo.
- Reutilización. Nos permite utilizar los métodos de un objeto de datos desde distintas zonas de la aplicación, incluso desde aplicaciones distintas.
- Seguridad. Los ORM suelen implementar sistemas para evitar tipos de ataques como pueden ser los SQL injections.
- Mantenimiento del código. Facilita el mantenimiento del código debido a la correcta ordenación de la capa de datos, haciendo que el mantenimiento del código sea mucho más sencillo.
- Lenguaje propio para realizar las consultas. Estos sistemas de mapeo traen su propia lenguaje para hacer las consultas, lo que hace que los usuarios dejen de utilizar las sentencias SQL y pasen a utilizar el lenguaje propio de cada herramienta.

Desventajas

- Tiempo utilizado en la aprendizaje. Este tipo de herramientas suelen ser complejas por lo que su correcta utilización lleva un tiempo que hay que emplear en ver el funcionamiento correcto y ver todo el partido que se le puede sacar.
- Aplicaciones algo más lentas. Esto es debido a que todas las consultas que se hagan sobre la base de datos, el sistema primero deberá transformarlas a la lenguaje propia de la herramienta ORM, después leer los registros y por último crear los objetos.
- Posible pérdida de rendimiento: Aunque las herramientas ORM ofrecen flexibilidad y abstracción, a veces pueden generar consultas menos eficientes que las escritas manualmente. Esto puede causar un rendimiento inferior, especialmente en sistemas que manejan grandes cantidades de datos o consultas muy específicas y complejas.
- Dependencia de la calidad del mapeo: La eficacia de una herramienta ORM depende mucho de la calidad del mapeo definido entre los objetos de la aplicación y las tablas de la base de datos.
Aquí está el contenido del PDF convertido a markdown:


Unidad 4: HIBERNATE - Herramienta ORM


consultas ineficientes o incluso pérdida de datos.

- Actualizaciones automáticas y operaciones complejas: En ciertas situaciones, las actualizaciones automáticas de la base de datos pueden ser más complicadas de gestionar. Por ejemplo, durante actualizaciones masivas, el mecanismo automático del ORM puede ser menos eficiente o necesitar configuraciones especiales para optimizar el proceso.

- Costo de recursos: Las herramientas ORM pueden requerir más recursos de hardware y memoria debido a las operaciones adicionales para mapear objetos a tablas y viceversa, lo que puede resultar en un mayor consumo de recursos en comparación con operaciones directas con la base de datos.

Estas desventajas no son universales y pueden variar dependiendo del contexto de la aplicación y de la forma en que se utiliza la herramienta ORM en particular. Es importante evaluar cuidadosamente las necesidades del proyecto antes de decidir si la utilización de una herramienta ORM es la mejor opción.

Resumen:

El uso de una herramienta ORM es beneficioso en muchos casos, especialmente cuando se trabaja con una estructura de datos compleja o cuando se requiere portabilidad entre diferentes bases de datos. También es útil cuando se busca acelerar el desarrollo, evitar la escritura manual de sentencias SQL y abstraerse de la base de datos.

Puede no ser adecuado en situaciones donde el rendimiento es una prioridad crítica o cuando se requiere una optimización fina de consultas para volúmenes enormes de datos. Además, para proyectos pequeños o simples, el uso de Hibernate puede ser excesivo y engorroso, resultando en un gasto de recursos innecesario.

Hibernate es ventajoso para aplicaciones complejas, cuando la abstracción de la base de datos es esencial y cuando la portabilidad y la velocidad en el desarrollo son prioritarias. No obstante, debe valorarse caso por caso para determinar si es la mejor elección, especialmente si la prioridad es el rendimiento o para proyectos más pequeños y sencilos donde la complejidad del ORM no se justifica.

En la actualidad hay muchos tipos de framework que nos devuelven el mapeo objeto-relacional, según la lengua que estemos utilizando. Imos nombrar algunos de los más utilizados:

Hibernate

Es una de las herramientas ORM más utilizadas en el mundo Java y está disponible como software libre bajo la licencia GNU LGPL (Lesser General Public License).

Proporciona un marco de trabajo que simplifica el mapeamiento de objetos Java a tablas de bases de datos. Utiliza archivos de configuración XML o anotaciones para definir el mapeamiento entre las clases Java y las tablas de la base de datos. Hibernate genera consultas SQL automáticamente, facilitando la interacción entre las clases de Java y la base de datos relacional.

Hibernate también ofrece una opción de consulta llamada HQL, que es similar a SQL pero está orientada a objetos. HQL permite a los desarrolladores escribir consultas orientadas a objetos y luego Hibernate las traduce a consultas SQL para interactuar con la base de datos. Esto proporciona un nivel adicional de abstracción y flexibilidad al escribir consultas.

NHibernate es un framework similar e influenciado por Hibernate, pero está diseñado específicamente para la plataforma .NET. NHibernate sigue muchos de los mismos principios y conceptos de Hibernate, permitiendo a los desarrolladores trabajar con el mapeo objeto-relacional en un estilo similar al de Hibernate, pero en la plataforma .NET.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Entity Framework (EF) Core:
É unha ferramenta ORM de Microsoft utilizada na plataforma .NET.
Permite aos desenvolvedores traballar con datos relacionais usando obxectos .NET e abstrae a interacción coa base de datos.
Ofrece soporte para diferentes provedores de bases de datos e permite a creación de aplicacións de .NET que poden traballar con SQL Server, MySQL, PostgreSQL, entre outros.

Django ORM:
É un framework de desenvolvemento web en Python, e o seu ORM é unha parte integral do mesmo.
Django ORM facilita a creación, manipulación e consulta de datos relacionais utilizando obxectos Python.
Proporciona unha abstracción sobre a base de datos relacional, o que permite aos desenvolvedores interactuar coa base de datos utilizando modelos de Python, simplificando así as operacións de base de datos.

Sequelize:
É unha ferramenta ORM para Node.js, compatible con varios dialectos de bases de datos SQL como MySQL, PostgreSQL, SQLite e MSSQL.
Ofrece unha forma fácil e flexible de traballar con bases de datos relacionais utilizando JavaScript.
Sequelize permite definir modelos e relacións entre eles, e xera consultas SQL automaticamente.

Nota: Node.js é un entorno de execución de JavaScript baseado no motor V8 de Google Chrome.
Á diferenza de outros entornos de JavaScript que se executan no lado do cliente (como nun navegador web), Node.js está deseñado para executarse no lado do servidor.

Doctrine:
É un framework ORM para PHP 5.2 e versións posteriores.
Un dos seus puntos fortes é a súa linguaxe DQL (Doctrine Query Language), inspirada no HQL de Hibernate.
Ofrece funcionalidades avanzadas de mapeamento objeto-relacional e simplifica a interacción con bases de datos relacionais en aplicacións PHP.

Propel:
É outro framework ORM para PHP 5 e superior, amplamente utilizado no marco do framework Symfony, o cal é un completo framework deseñado para optimizar o desenvolvemento de aplicacións web segundo o patrón Modelo Vista Controlador (MVC).
Propel facilita o acceso e manipulación de datos nunha base de datos relacional den de aplicativos PHP.

SQLAlchemy:
É un toolkit de código aberto SQL e unha ferramenta ORM para a linguaxe de programación Python.
Publicada baixo a licenza MIT, é unha das ferramentas máis utilizadas xunto con Django para acceder a bases de datos relacionais dende aplicacións Python.
Ofrece funcionalidades potentes para xerar consultas SQL e interactuar coa base de datos.
Aquí está el contenido del PDF en formato Markdown:

Unidad 4: HIBERNATE - Herramienta ORM

É unha especificación de Java que describe un estándar para o mapeamento obxecto -relacional en aplicativos Java. Non é propiamente un framework, senón un estándar defini do pola comunidade de desenvolvedores.

A pesar de non ser un framework en si mesmo, JPA define un conxunto de interfaces e especificacións que as implementacións ORM poden seguir para proporcionar unha capa de abstracción entre a base de datos relacional e as clases de obxectos Java.

Existen varias implementacións de JPA, siendo Hibernate unha das máis coñecidas e utilizadas. Hibernate, a pesar de ser unha implementación de JPA, ofrece funcionalidades adicionais máis alá do estándar JPA, o que o fai unha fer ramenta poderosa e amplamente empregada no mundo Java.

Outras implementacións de JPA inclúen EclipseLink, Apache OpenJPA, DataNucleus, entre outras. Estas implementacións seguen as especificacións definidas por JPA e ofrecen funcionalidades comúns para o mapeamento obxecto-relacional en aplicativos Java, permitindo aos desenvolvedores traballar con obxectos Java e interactuar coa base de datos de forma sinxela e estándar.

Nesta unidade, imos traballar con Hibernate que é unha ferramenta ORM das máis utilizadas. Hibernte e o estándar JPA (Java Persistence API)

Hibernate segue o estándar JPA (Java Persistence API) en varios aspectos importantes:

* Permite o uso das anotacións JPA estándar para o mapeamento obxecto-relacional. Estas anotacións, como @Entity, @Table, @Id, @Column, entre outras, usanse para definir entidades, relacións e atributos das entidades. Isto facilita a creación do modelo de datos e a definición da asignación entre as clases de Java e as táboas da base de datos.
* Proporciona unha implementación de EntityManager, que é a interface estándar de JPA utilizada para realizar operacións CRUD (Crear, Ler, Actualizar, Eliminar) nas entidades. Esta interface permite aos desenvolvedores realizar accións como persistir, buscar, actualizar e eliminar entidades, seguindo o estándar JPA.
* Permite o uso de JPQL (Java Persistence Query Language), que é a linguaxe de consulta estándar de JPA. JPQL é unha linguaxe de consultas orientada a obxectos que permi te realizar consultas independentes do motor da base de datos específico, facilitando a portabilidade do código entre diferentes provedores de bases de datos.
* HQL (Hibernate Query Language) é o lenguaxe de consulta propio de Hibernate que se basa en JPQL en canto á sintaxe e funcionalidade. HQL é específico de Hibernate e úsase dentro do entorno de desenvolvemento de Hibernate para facer consultas en obxectos gardados.
* Segue o ciclo de vida estándar das entidades definido por JPA. As entidades pasan por diferentes estados como transient, persistent, detached e removed, e Hibernate xestiona estes estados segundo as operacións realizadas no contexto de persistencia.
* Admite a xestión de transaccións utilizando o estándar JPA. Permite a xestión de transaccións a través de EntityManager, o que inclúe o inicio, confirmación e reversión de transaccións.

Aínda que Hibernate ofrece funcionalidades adicionais máis alá do estándar JPA, segue a especificación JPA en moitos aspectos fundamentais. Isto significa que as ap licacións desenvolvidas utilizando Hibernate poden ser compatibles con outras implementacións de JPA e ofrecen certo grado de portabilidade entre diferentes provedores de persistencia JPA.
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

Hibernate es una herramienta ORM completa que consiguió, en un tiempo record, una excelente reputación en la comunidad de desarrollo, posicionándose, claramente, como uno de los productos OpenSource líder en este campo, gracias a sus prestaciones, buena documentación y estabilidad.

Empezó a desarrollarse hace algunos años por Gavin King, siendo hoy en día Gavin y Christian Bauer los principales gestores de su desarrollo.

Hibernate parte de una filosofía de mapear objetos Java "normales", conocidos en la comunidad como "POJOS" (Plain Old Java Objects). Para almacenar y recuperar estos objetos, el programador debe mantener una conversación con el motor de Hibernate, mediante un objeto especial que es la sesión.

Nota: POJO es un acrónimo para Plain Old Java Objects. El nombre se utiliza para resaltar que, el objeto en cuestión, es un objeto Java normal, no es un objeto especial, y no es en particular un Enterprise JavaBean (EJB3).

Un POJO es un objeto serializable, tiene un constructor sin argumentos, y permite el acceso a las propiedades utilizando los métodos getter y setter.

2.1 Arquitectura Hibernate

La API de Hibernate es una arquitectura de dos capas (Capa de persistencia y Capa de dominio (o negocio).

- Capa de persistencia:
- Capa de dominio (o negocio):

Nota: He eliminado los puntos de los índices y el número de página, y transformado la lista a una lista markdown con guiones. He añadido un salto de línea tras un punto final en los párrafos y en las listas.
Aquí está el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Capa, Hibernate facilita la interacción con la base de datos. Es aquí donde los objetos de nuestra aplicación se mapean a las tablas de la base de datos.

Hibernate utiliza la API JDBC para interactuar directamente con la base de datos, enviando consultas SQL y recuperando datos.

Capa de Dominio o de Negocio: Esta capa contiene la lógica de negocio de la aplicación. Es donde se definen las reglas de negocio y los procesos que la aplicación debe ejecutar.

Estos objetos representan las entidades y sus relaciones en el sistema, como los usuarios, productos, pedidos, etc. Aquí, los desarrolladores definen las clases de objetos y sus relaciones sin preocuparse directamente por la forma en que estos objetos se almacenan en la base de datos.

Hibernate juega un papel crucial para asegurarse de que los objetos del dominio se mapeen correctamente a la base de datos en la Capa de persistencia.

Esta arquitectura de dos capas en Hibernate permite separar claramente las responsabilidades entre el trabajo directo con la base de datos (Capa de persistencia) y la lógica de negocio de la aplicación (Capa de dominio), facilitando así un desarrollo más estructurado y mantenible de la aplicación.

Nota:

JNDI (Java Naming and Directory Interface): Es una API de Java utilizada para acceder a servicios de directorio y objetos a través de nombres. Permite que los aplicativos localicen y accedan a recursos distribuídos, como ordeadores, servidores de correo, bases de datos, etc. A través de nombres lóxicos, JNDI facilita la gestión de recursos distribuídos y su conexión desde los aplicativos Java.

JTA (Java Transaction API): Es una API de Java que proporciona un modelo de programación estándar para controlar transacciones en aplicativos Java. Ayuda a coordinar transacciones distribuídas a través de varios recursos o bases de datos. Juntos con la API JDBC, JTA permite realizar operaciones atómicas, consistentes, illadas y duradeiras (conocidas como propiedades ACID) en transacciones, asegurando la integridad de los datos y su consistencia a través de diferentes fuentes de datos dentro de una aplicación distribuída.

As Interfaces mostradas clasifícanse da seguinte forma:

Interfaces llamadas por la aplicación para realizar operaciones básicas:

- Session: Interface primaria utilizada en cualquier aplicación Hibernate para establecer una conversación con Hibernate. La interface SessionFactory permite obtener instancias Session.
- Transaction: Permite controlar las transacciones.
- Query: Permite realizar petición a la base de datos y controla cómo se ejecuta la devandita petición (query). Las petición se escriben en HQL o en el dialecto SQL nativo de la base de datos que estamos utilizando. Una instancia Query utiliza para enlazar los parámetros de la petición, limitar el número de resultados devueltos por la petición y para ejecutar la devandita petición.

Interfaces llamadas por el código de la infraestructura de la aplicación para configurar Hibernate.

La más importante es la clase Configuration: se utiliza para configurar y arrancar Hibernate. La aplicación utiliza una instancia de Configuration para especificar la situación de los documentos que indican el mapeado de los objetos y propiedades específicas de Hibernate, y a continuación, crea un objeto SessionFactory.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Java Naming Directory Interface (JNDI) - se utiliza por Java RMI e las APIs de Java EE para buscar objetos en una red.

Hibernate está disponible mediante una serie de librerías jar. Por tanto, para poder realizar una aplicación con Hibernate, tenemos que agregar estas librerías a nuestro proyecto.

2.2 Como trabaja Hibernate

- Todas las consultas e operaciones de inserción, actualización e supresión de datos en la base de datos de la aplicación, se realizan utilizando objetos. Todas estas interacciones se realizan en las instancias de las clases mapeadas por Hibernate, es decir, en nuestro código no habrá referencias directas a las tablas y columnas de la base de datos.

- En el corazón de cada interacción, entre el código y la base de datos, se encuentra la sesión de Hibernate. La sesión de Hibernate es un objeto Session, que encarna el concepto de un servicio de persistencia (o gestor de persistencia) y sirve de puente durante una conversación entre la aplicación y la base de datos. Todas las operaciones en la base de datos, se realizan en el contexto de una sesión.

- Imos tener métodos para guardar un objeto -save(objeto)-, para actualizarlo -update(objeto)-, para borrarlo -delete(objeto)-, etc., sin necesidad de especificar una sentencia SQL.

- Cada sesión envuelve la conexión JDBC subyacente y sirve como un primer nivel caché para objetos persistentes ligados a ella. La sesión es un objeto muy ligero y no consume mucha memoria, por lo que su creación y destrucción no cuesta mucho. Esto es muy importante, ya que nuestra aplicación necesitará crear y destruir sesiones todo el tiempo. Para crear sesiones, se utiliza un objeto SessionFactory.

- Hibernate guarda en los archivos de configuración cfg.xml, toda la información necesaria para conectarse a cada base de datos.

- Hai que establecer la correspondencia entre las clases de la aplicación y las tablas de la base de datos (como los campos y propiedades de las clases Java se mapean en las columnas de la base de datos): se puede hacer con ficheros de mapeo (hbm.xml) o anotaciones en las clases.

- No caso de utilizar ficheros de mapeo (hbm.xml), en estos se deben declarar la ubicación de estos ficheros en el fichero de configuración cfg.xml.

- Tamén permite el uso de anotaciones para realizar este mapeamiento sin la necesidad de archivos de configuración XML separados. Las anotaciones, como @Entity, @Table, @Column, entre otras, pueden ser utilizadas directamente en el código de las clases Java.
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

pode simplificar a configuración, especialmente en aplicaciones con múltiples entidades, e 
facilita a lectura e comprensión do mapeamento ao ter todo o código relacionado nun único 
lugar.

Si Hibernate accede a máis dunha base de datos, necesit arase un arquivo de configuración 
para  cada unha delas .

- Cada un destes arquivos específicos de configuración de cada base de datos, xunto cos ficheiros 
de mapeo  (se o caso de mapeo) , compílanse e almacénanse nunha caché polo objeto 
SessionFactory .
- Para crear o objeto SessiónFactory , utilízase a interface  Configuration .
- Cada SessiónFactory  está configurada  para traballar cunha determinada plataforma de base de 
datos.

- SessionFactory  é un obxecto pesado que , idealmente , debe ser creado só unha vez (xa que é 
moi custoso de crear e implica unha operación lenta).
- O obxecto SessionFactory  está posto a disposición do código da aplicación para realizar as operacións de persistencia previstas.
- Cada vez que se queira realizar estas operacións, créase un obxecto Session e realízanse baixo o 
conteúdo da sesión.
Aquí está el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

Ata a versión do IDE NetBeans 8.2, xa inclúe as bibliotecas de Hibernate preinstaladas e ven con asistentes ou ferramentas integradas que facilitan a creación e configuración do Hibernate. Estas ferramentas poden axudar na creación dos arquivos de configuración, mapeamento e clases necesarias para traballar con Hibernate.

- Na versión do IDE NetBeans 12 con jdk13, pódese configurar asistentes ou ferramentas integradas para facilitar a creación e configuración de Hibernate mediante un plugin chamado "Hibernate Support"
- Por exemplo, instalando o IDE Netbeans 7.4 temos dispoñible Hibernate 4.

Se non dispoñemos das librarías de Hibernate no noso IDE de programación, o primeiro que temos que facer é descargalas. Podémolo facer do sitio de descarga oficial de Hibernate:
Unidad 4: HIBERNATE - Herramienta ORM

Descargamos la última versión estable disponible.
Neste caso, se puede descargar Hibernate 6.4 que es la última versión disponible.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Para hacer funcionar Hibernate, los archivos más importantes son los siguientes:

- hibernate-core-6.4.0.Final.jar: Este es el archivo JAR principal que contiene las clases y bibliotecas necesarias para ejecutar Hibernate.

- hibernate-core-6.4.0.Final-sources.jar: Este archivo contiene el código fuente de Hibernate, que puede ser útil para la depuración y el entendimiento del funcionamiento interno de Hibernate.

- hibernate-core-6.4.0.Final-javadoc.jar: Este archivo contiene la documentación de JavaDoc para Hibernate, que puede ser útil para entender el propósito y uso de las clases y métodos individuales en Hibernate.

Para utilizar Hibernate, se debe agregar el archivo hibernate-core-6.4.0.Final.jar a las bibliotecas del proyecto, también se necesita agregar el controlador JDBC correspondiente a la base de datos. Este controlador es el que permite a Hibernate comunicarse con la base de datos.

Por ejemplo, si se está utilizando MySQL como base de datos, se necesita el archivo mysql-connector-java.jar. Si se está utilizando PostgreSQL, se necesita el archivo postgresql.jar.

Una vez que se agregan estos archivos JAR a las bibliotecas del proyecto, se debería poder usar Hibernate para mapear las clases de Java a las tablas de la base de datos y realizar operaciones de base de datos.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Debido a que Hibernate fue diseñado para que se pueda trabajar en distintos ámbitos, existen una gran cantidad de parámetros de configuración. Hibernate es un sistema altamente configurable para adaptarse a esto.

Para poder trabajar con Hibernate, debese realizar:

- La configuración del servicio Hibernate.
- Proporcionar a Hibernate toda la información asociada a las clases que se quieren hacer persistentes. Esto puede hacerse mediante el uso de ficheros de mapeo o anotaciones en las clases.

Los ficheros de mapeo son ficheros XML que definen cómo se mapean las clases de Java a las tablas de la base de datos. Cada clase persistente tiene un fichero de mapeo correspondiente que especifica sus propiedades y cómo se mapean a columnas específicas en la tabla de la base de datos.

Las anotaciones son una alternativa a los ficheros de mapeo. Proporcionan la misma información que los ficheros de mapeo, pero están integradas directamente en el código de la clase. Esto puede hacer que el código sea más fácil de entender y mantener, ya que la información de mapeo está localizada junto a la clase que afecta.

2.4.1 Configuración del servicio Hibernate

Hibernate proporciona dos posibles ficheros de configuración:

- Fichero XML normalmente llamado hibernate.cfg.xml.
- Fichero de propiedades estándar de Java (hibernate.properties).

Ambos ficheros llevan a cabo la misma tarea (configuración del servicio Hibernate). Si ambos ficheros se encuentran en el classpath de la aplicación, el primero sobrescribe al segundo.

Estos ficheros se utilizan para configurar el tipo de conexión que se va a generar contra la base de datos y las clases que se van a asociar a las tablas.

Fichero hibernate.cfg.xml

Este archivo es leído por Hibernate cuando arranca. La estructura general de un fichero XML de configuración es algo como esto:

```java
// Configuración del servicio Hibernate
// Fichero XML de configuración
// Estructura general
// ...
```

Nota: He eliminado los puntos de los índices y el número de página, y he transformado la lista a lista markdown con guiones. He también agregado un salto de línea tras un punto final en los párrafos y en las listas.
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

Fichero de mapeo hbm.xml:

A continuación, se muestra un ejemplo de configuración hibernate.cfg.xml utilizando anotaciones:

Aquí observamos a gran importancia del fichero de configuración, pues es aquí donde se especifica que base de datos usamos, por lo que si cambiásemos de base de datos, bastaría con cambiar este fichero de configuración, manteniendo nuestra aplicación intacta.

A estrutura del fichero hibernate.cfg.xml viene marcada por un fichero de validación hibernate-configuration-3.0.dtd.

- Contiene los datos de conexión con la base de datos
- Sinala la situación de los ficheros de mapeo de las clases persistentes.

La etiqueta <SessionFactory> consta de las etiquetas <Property> y <Mapping resource>. Si se dispone de varias bases de datos, hay que tener un SessionFactory por cada una de ellas.
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

Todos los nombres de las propiedades que soporta Hibernate, están definidos en `org.hibernate.cfg.Environment`

### Mapeo entre la clase Java y la tabla de la base de datos

- En la etiqueta `Mapping` se indica donde está el archivo XML con el mapeo entre la clase Java y la tabla de la base de datos enlazada o los pojos con las anotaciones.

Algunas de estas propiedades son:

- **Datos de conexión**: datos para conectar con la Base de datos.

  - `hibernate.connection.driver_class`: Esta propiedad especifica el controlador JDBC que se usará para conectar con la base de datos. En este caso, se está usando el controlador JDBC de MySQL, que es `com.mysql.jdbc.Driver`.
  - `hibernate.connection.url`: Esta propiedad especifica la URL de la base de datos. En este caso, la URL es `jdbc:mysql://localhost:3306/Agenda`, lo que significa que se está conectando a una base de datos MySQL llamada Agenda en el servidor local.
  - `hibernate.connection.username` y `hibernate.connection.password`: Estas propiedades especifican el nombre de usuario y la contraseña que se usarán para conectar con la base de datos. En este caso, el nombre de usuario es `root` y la contraseña es `abc123`.
  - `hibernate.dialect`: Esta propiedad especifica el dialecto de SQL que Hibernate debe usar, lo que nos permite generar un SQL optimizado para una base de datos relacional en particular. El dialecto es un tipo de "traductor" que permite que Hibernate genere SQL que sea compatible con tu sistema de gestión de bases de datos. En este caso, se está usando el dialecto de MySQL 5, que es `org.hibernate.dialect.MySQL5Dialect`.

### Dialecto de Hibernate

- Si no se especifica, en la mayoría de los casos, Hibernate podrá seleccionar la implementación `org.hibernate.dialect.Dialect` correcta, en base a los metadatos que el controlador JDBC retorna.

Imágenes de la página https://docs.jboss.org/hibernate/orm/4.2/manual/en-US/html_single/#configuration-optional-dialects
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

### Propiedades para la configuración de Hibernate

#### Propiedades para la configuración de la conexión a la base de datos

*   `hibernate.show_sql`: Habilita mostrar por consola todas las sentencias SQL ejecutadas por Hibernate. Valores: false o true. El valor por defecto para esta propiedad es false, lo que significa que Hibernate no mostrará las consultas SQL que genera.
*   `hibernate.format_sql`: Imprime el SQL en el registro y en la consola. Valores: false o true. El valor por defecto para esta propiedad es false, lo que significa que Hibernate no formateará el SQL generado para que sea más legible.
*   `hibernate.use_sql_comments`: Hibernate agrega comentarios a todas las sentencias SQL generadas para explicar su origen. Valores: false o true. El valor por defecto para esta propiedad es false, lo que significa que Hibernate no agregará comentarios al SQL generado.

#### Propiedades para la gestión de transacciones

*   `hibernate.connection.autocommit`: Esta propiedad especifica si las transacciones deben confirmarse automáticamente. Valores: false o true. El valor por defecto para esta propiedad es false, lo que significa que las transacciones no se confirman automáticamente.

#### Propiedades para la gestión de esquemas

*   `hibernate.hbm2ddl.auto`: Esta propiedad permite controlar el comportamiento del esquema de la base de datos, con las operaciones crear, eliminar, actualizar o validar las tablas basándose en tus clases de entidad. Los valores posibles son create, create-drop, update y validate. No hay un valor por defecto para esta propiedad.
    *   `create`: Se utiliza durante el desarrollo inicial, cuando estás creando tus entidades y quieres que Hibernate genere las tablas correspondientes.
    *   `create-drop`: Borra las tablas al finalizar.
    *   `update`: Se utiliza una vez que las entidades están bastante estables y quieres que Hibernate realice cambios incrementales en la base de datos a medida que modificas tus entidades.
    *   `validate`: Se utiliza en producción, donde no quieres que Hibernate realice cambios en la base de datos. En su lugar, Hibernate comprobará que las entidades y las tablas coinciden.

#### Propiedades para la gestión de rendimiento

*   `hibernate.jdbc.batch_size`: Esta propiedad especifica el número de actualizaciones que Hibernate agrupará juntas antes de enviar al servidor de la base de datos

### Fichero Hibernate.properties

Los ficheros .properties son simples ficheros de texto que se utilizan para guardar parámetros de configuración, en forma de pares clave-valor.

Ejemplo de un fichero de configuración de propiedad es:


```java
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.use_sql_comments=true
hibernate.connection.autocommit=true
hibernate.hbm2ddl.auto=create
hibernate.jdbc.batch_size=10
```
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

No Anexo explícase como crear o fichero .properties e os métodos principais para traballar con este fichero.

A continuación, mostrase algunhas páxinas onde podes aprender sobre as propiedades de configuración de Hibernate para establecer conexións JDBC:

### 3. Inicio de Hibernate

#### 3.1 Creación dunha instancia SessionFactory

O primeiro paso para traballar con Hibernate é crear un SessionFactory. É necesario un SessionFactory por cada base de datos coa que se vaia traballar.

A interface SessionFactory representa á base de datos e proporciona instancias de objetos Session. Estas son compartidas por toda a aplicación, en cambio as instancias de sesión deben ser usadas só por unha única transacción ou unidade de traballo.

Primeiro temos que crear un obxecto Configuration para indicarlle a Hibernate onde está o arquivo de configuración. Isto podémolo facer con:

```java
Configuration cfg = new Configuration();
```

Métodos para indicarlle cal é o arquivo de configuración:

*   `cfg.configure("ruta/al/arquivo.properties");`
*   `cfg.configure("ruta/al/arquivo.xml");`

Nota: Deberías agregar un salto de línea tras el punto final en el párrafo y en las listas.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Exemplo para indicarle el archivo de configuración hibernate.cfg.xml. Este archivo debe estar en la raíz de la aplicación.

```java
Configuration cfg = new Configuration().configure();
```

A continuación debemos crear un objeto SessionFactory. Para esto se utiliza el método buildSessionFactory() de la clase Configuration. La sintaxis de este método es:

Exemplo de creación de un objeto SessionFactory:

```java
Configuration cfg = new Configuration().configure();
SessionFactory sessionFactory = cfg.buildSessionFactory();
```

La interfaz SessionFactory es compartida por toda la aplicación y vamos a proporcionar instancias de objetos Session (objetos para comunicarnos con Hibernate), entonces es recomendable tener una clase especializada para crear las sesiones.

Un buen hábito de desarrollo es construir una clase llamada HibernateUtil que se apoye en el patrón Singleton. El objetivo de emplear este patrón es garantizar que una clase sólo tenga una instancia en la aplicación, y proporcionar un único punto de acceso global a ella. Hibernate trabaja con sesiones y es lógico crear esta clase que proporciona un único punto de acceso a la instancia, evitando crear una sesión distinta desde distintos puntos de la aplicación que finalmente nos puede llevar a la generación de errores e consumo innecesario de memoria.

El patrón Singleton garantiza que una clase sólo tenga una instancia y proporciona un punto de acceso global a esta instancia. Este patrón se utiliza comúnmente cuando una clase controla el acceso a un recurso físico único o cuando hay datos que deben estar disponibles para todos los objetos de la aplicación y varios clientes distintos precisan referenciar a un mismo elemento y queremos asegurarnos de que no haya más de una instancia de ese elemento.

Para esto, se desarrolla la clase HibernateUtil en la que declaramos un atributo estático del tipo SessionFactory, asegurándonos de que sólo existe una instancia. Además, este atributo se define como final para que no pueda ser modificado ni alterado por ningún cliente que lo referencie.

Grazas al patrón Singleton obtenemos un acceso controlado a la sesión, las clases que deseen una referencia a la sesión única obtenida pueden llamar al método estático getSessionFactory() de la clase.

Exemplo:

```java
public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
```
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

### 3.2 Creación de objetos Session

A responsabilidad principal de una SessionFactory de Hibernate es crear y gestionar los objetos Session.

A responsabilidad principal de una Session de Hibernate es proporcionar una interfaz CRUD para las clases asignadas.

Nota: El acrónimo CRUD se refiere a las 4 funciones principales que se ejecutan en las aplicaciones de bases de datos relacionales para el almacenamiento persistente. Cada letra se asigna a cada una de las operaciones:

- Create (crear - INSERTAR)
- Read (ler, SELECT)
- Update (cambiar, UPDATE)
- Delete (eliminar - DELETE)

Los objetos Session proporcionan tres formas de hacer consultas:

- Utilizando la lenguaige HQL (Hibernate Query Language). Esta lenguaige es la lenguaige de consulta orientada a objetos de Hibernate. Permite realizar consultas similares a SQL, pero en términos de clases persistentes y sus propiedades.
- Mediante la API de Programación para QBC (Query By Criteria). Dentro de Hibernate podemos encontrar la interfaz Criteria, que nos permite especificar consultas sobre las clases persistentes definiendo un conjunto de restricciones. QBC es una alternativa a HQL, pero a diferencia de ella, no es una lenguaige de consulta, sino una API de programación.
- Utilizando sentencias SQL nativas para expresar consultas de base de datos. Só debe de utilizarse cuando las otras opciones no son válidas (por ejemplo, cuando se necesite utilizar una característica propia del SQL nativo de la base de datos).

Para abrir una conexión (sesión) utilízase el siguiente método de la clase SessionFactory.

### Ejemplo

```java
public static void main(String[] args) {
    Session sesion = HibernateUtil.getSessionFactory().openSession();
}
```

La Session proporciona una caché (contexto de persistencia) donde se almacena los estados de los objetos con los que se van manejar en la sesión, objetos que provienen de la base de datos o se crean en la aplicación.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Operaciones como: find(), update(), save(), saveOrUpdate(), get(), delete() o cualquier otra operación de la interfaz Session, estamos interactuando de manera transparente con la caché de Hibernate.

Las operaciones no se realizan directamente sobre la base de datos, se almacenan en la caché.

Cada vez que abrimos una sesión, obtenemos una conexión a base de datos mediante el pool de conexiones de Hibernate. Esta conexión se libera cuando se cierra la sesión con el método close(). Cuantas más sesiones mantengamos abiertas, más conexiones estaremos consumiendo del pool, lo que podría llevar a su esgotamiento. Para solucionar esto, Hibernate permite desconectar una sesión momentáneamente utilizando el método disconnect(). Esta operación libera la conexión con la base de datos, aumentando efectivamente la escalabilidad de nuestro sistema al evitar el esgotamiento del pool de conexiones. Para volver a obtener otra conexión a base de datos mediante el pool de conexiones, se puede utilizar el método reconnect().

4. Traballando con objetos

4.1 Comezando una unidad de trabajo

Para comenzar una unidad de trabajo, se ejecutan las siguientes instrucciones:

Session sesion = sessionFactory.openSession();
Transaction tx = sesion.beginTransaction();

▪ En este punto, el contexto de persistencia es inicializado.
▪ La aplicación puede tener varios objetos SessionFactory, cada uno conectado a una Base de Datos. La creación de SessionFactory es costosa, por lo que se aconseja inicializar el SessionFactory en el arranque de la aplicación una única vez.
▪ La obtención de un objeto Session es muy ligera, de hecho, una sesión no obtiene la conexión JDBC hasta que no es necesario, igual que su destrucción. Esto es importante, ya que nuestra aplicación necesitará crear y destruir sesiones todo el tiempo, quizás en cada petición.
▪ En la última línea, se abre una transacción, y todas las operaciones que se ejecuten dentro de la unidad de trabajo se realizarán en la misma transacción.
▪ Proporciona un único hilo que determina la conversación entre la aplicación y la base de datos en una unidad atómica de trabajo.

4.2 Ciclo de vida de objetos persistentes

Los objetos persistentes van pasar por varios estados manejados por Hibernate, haciendo este proceso transparente. Hibernate define 4 estados, ocultando la complejidad de su implementación al usuario.

-
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

### Transitorio (temporais)

Un objeto es transitorio si se ha instanciado recientemente utilizando el operador new, y no está asociado a una sesión de Hibernate. Estos objetos no son transaccionales, no tienen una representación persistente en la base de datos, no se les ha asignado un valor identificador, no están asociados a ningún registro de la tabla en la base de datos, por lo que su estado se pierde tan pronto como dejan de estar referenciados por algún otro objeto. Al perder la referencia a un objeto transitorio, este se destruirá por el recolector de basura.

### Persistente

Un objeto con estado persistente tiene una representación en la base de datos y un valor identificador. Un objeto pasa a estado persistente porque se guarda, se obtiene de la ejecución de una consulta o porque se navega por el grafo de asociaciones de un objeto persistente.

Los objetos persistentes se encuentran en el ámbito de una sesión. Están asociados a un objeto Session y son transaccionales. Su estado se actualiza en la BD al final de la transacción.

### Utilización de la sesión de Hibernate

Se utiliza la sesión de Hibernate para hacer un objeto persistente. Hibernate se encarga de las declaraciones SQL que necesitan ejecutarse para esta transición.

### Estado de los objetos

- Un objeto es transitorio si se ha instanciado recientemente utilizando el operador new.
- Un objeto pasa a estado persistente porque se guarda, se obtiene de la ejecución de una consulta o porque se navega por el grafo de asociaciones de un objeto persistente.
- Los objetos persistentes se encuentran en el ámbito de una sesión.
- Los objetos persistentes están asociados a un objeto Session y son transaccionales.
- El estado de los objetos persistentes se actualiza en la BD al final de la transacción.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Só se escriban as columnas modificadas, poniendo 'dynamic-update=true' en el fichero de mapeo no elemento `<class>`.

Hibernate detectará cualquier cambio realizado a un objeto en estado persistente e sincronizará el estado con la base de datos cuando se complete la unidad de trabajo.

Descónectados (separados o desenlazados)

Una instancia separada es un objeto que se hizo persistente, pero su sesión fue cerrada.

Para entender los objetos desconectados, debemos considerar una transición típica de una instancia:

1. Primero es temporal, dado que acaba de ser creado en la aplicación.
2. Posteriormente vuelve a ser persistente, al llamar a una operación del administrador de persistencia (la sesión).
3. Todo esto acontece dentro de una sola unidad de trabajo, y el contexto de persistencia para esta unidad de trabajo está sincronizado con la base de datos en algún punto.

La unidad de trabajo se completa y el contexto de persistencia se cierra. No obstante, la aplicación aún tiene una referencia a la instancia que fue guardada.

Sempre y cuando el contexto de persistencia esté activo, el estado de esta instancia es persistente, pero al cerrarse su estado cambia a desconectado.

Los objetos desconectados indican que su estado no garantiza que estén sincronizados con el estado de la base de datos, no obstante es posible guiarlos y modificarlos.

Obxectos borrados (removidos)

Un objeto en estado borrado es planificado a ser borrado una vez finalice la unidad de trabajo (transacción). Por tanto, deberíase descartar cualquier referencia a este objeto.

4.3 Persistindo un obxecto

1. Instánciase un objeto nuevo (estado transient).
2. Obtense una sesión y comézase a transacción, inicializando el contexto de persistencia.
3. Una vez obtida la sesión, chámase al método `save()`, que introduce el objeto en el contexto de persistencia. Este método devuelve el identificador del objeto persistido.
4. Para que los cambios sean sincronizados en la base de datos, es necesario realizar el `commit()` de la transacción o dentro del objeto sesión, chamar al método `flush()`. Neste momento, obtense la conexión JDBC a la base de datos para poder ejecutar la sentencia.
5. Finalmente, la sesión se cierra, libérase el contexto de persistencia, y ya que así, la referencia del objeto creado devólvese al estado detached.
Aquí te dejo el contenido del PDF en formato markdown:


Unidad 4: HIBERNATE - Herramienta ORM

4.4 Recuperando un objeto persistente por id
Existen dos métodos que se encargan de recuperar un objeto persistente por identificador:
load() e get().
El objeto recuperado queda automáticamente ligado a la sesión.
A diferencia entre ellos radica en la forma de indicar que un objeto no se encuentra en la base de datos:
- get() devuelve un nulo.
- load() lanza una excepción ObjectNotFoundException.

Por ejemplo, para recuperar el objeto de la tabla Persona a través de su identificador:


4.5 Modificando un objeto persistente
Para actualizar un objeto se invoca al método update del objeto Session. Ejemplo:


Como dijimos que los objetos persistentes se encuentran en el ámbito de una Session, y Hibernate detectará cualquier cambio realizado a un objeto en estado persistente, y sincronizará con la base de datos.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Entonces, en el caso anterior, no hace falta especificar explícitamente el método o update.

### 4.6 Borrando un objeto persistente

Para poder borrar un objeto es necesario obtenerlo previamente.

Para borrar un objeto se invoca al método `delete` del objeto `Session`. Ejemplo:

- Obtener el objeto
- Invocar el método `delete` del objeto `Session`

### 4.7 Arquitectura de caché en Hibernate

Hibernate divide la estructura de caché en dos niveles: La caché de primer nivel y la caché de segundo nivel.

  - Caché de primer nivel
  - Caché de segundo nivel
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

A caché de primer nivel está siempre asociada al objeto Session, no puede desactivarse y no necesita configuración alguna.

Cada sesión abierta tendrá su propia caché de primer nivel, proporcionando así un contexto de persistencia. En esta caché se almacenan los objetos que se recuperan de la base de datos, de manera que, si vuelven solicitarse, ya están en la caché y no se hará una nueva consulta a la base de datos.

Na nuestra aplicación podemos abrir tantas sesiones como necesitemos y cada una tendrá su propia caché de primer nivel.

Esta caché de primer nivel es el punto de acceso a los objetos. Cuando se realizan operaciones de consulta y actualización ofrecidas por la interfaz Session, interactúase de forma transparente con la caché de primer nivel. Las operaciones de actualización no se ejecutan directamente, se almacenan primero en la caché de primer nivel y para que el cambio sea persistido es necesario realizar una llamada al método flush() de la interfaz Session o al método commit() de la transacción abierta para la sesión.

Como la caché de primer nivel es el contexto de persistencia de los objetos en estado persistente, puede ocurrir que se realice un uso excesivo de esta caché, llegando a provocar una falta de memoria, por ejemplo, en las operaciones masivas de actualización o en el caso de que las asociaciones entre los objetos sean no preguiciosas (en este caso, puede llenarse la caché con elementos innecesarios).

Podemos eliminar objetos de la caché, llamando:

▪ Al método evict(object) que elimina el objeto pasado como parámetro de la caché. Este objeto pasa a estado detached.
▪ Al método session.clear() que elimina todos los objetos que se encuentran alojados en la caché, pasando todos estos objetos a estado detached.

Caché de segundo nivel

La caché de segundo nivel permite mejorar el rendimiento y el acceso concorrente por varios usuarios a los datos de la base de datos. Esta caché evita los problemas que pueden ocurrir en las operaciones de actualización de datos concorrentes realizados en diferentes sesiones.

Esta caché de segundo nivel está asociada con el objeto SessionFactory y se trabaja con todos los objetos recuperados y manejados por todas las sesiones. La podríamos considerar como una caché global. Ahora, cuando un objeto no se encuentra en la caché de primer nivel (la sesión), Hibernate lo buscará en la caché de segundo nivel. Esto nos permite que todo el objeto persistente de una sesión pueda ser obtenido, a veces que sean necesarias, en cualquier lugar de la aplicación y por cualquier usuario.
Aquí está el contenido del PDF convertido a markdown:

Unidad 4: HIBERNATE - Herramienta ORM

### Seleccionamos un provedor de caché

* Seleccionamos un provedor de caché.
* Hibernate soporta 4 provedores de caché opensource:
  - EhCache (Easy Hibernate Cache) e a clase é org.hibernate.cache.EhCacheProvider
  - OSCache (Open Symphony Cache) e a clase é org.hibernate.cache.OSCacheProvider
  - Swarm Cache e a clase é org.hibernate.cache.SwarmCacheProvider
  - JBoss Tree Cache e a clase é org.hibernate.cache.TreeCacheProvider

### Agregamos no ficheiro hibernate.cfg.xml as seguintes propiedades

* <property name="hibernate.cache.provider_class">
  Clase do provedor da caché
</property>
* <property name="hibernate.cache.use_structured_entries">true</property>

### Indicamos no classpath, o arquivo de configuración xml do provedor da caché

* (consultar instrucións do provedor da caché)

### Para cada clase que se queira utilizar a caché de segundo nivel para persistir os seus objetos

* agregamos a seguinte entrada:
  <class name="">
    <cache usage="estratexia de concorrencia"/>
    ....
  </class>

### Estratexias de concorren cia

* Resulta necesario establecer unha estratexia de concorrencia que permita sincronizar a caché de primeiro nivel coa caché de segundo nivel e esta última coa base de datos.
* Existen catro estratexias de concorrencia predefinidas. A continuación aparecen listadas por orde de restricións en termos do nivel de illamento transaccional.
* - transactional: Garante un nivel de illamento ata lecturas repetitibles (repeatable read), se se necesita. É o nivel máis estrito. É conveniente o seu uso cando non poidamos permitirnos datos que queden desfasados. Esta estratexia só se pode utilizar en clusters, é dicir, con caches distribuídas.
* - read-write: Mantén un illamento ata o nivel de commited, utilizando un sistema de marcas de tempo (timestamps). A súa maior utilidade dáse no mesmo caso que para a estratexia transactional pero coa diferenza de en que esta estratexia non se pode util izar en clusters.
* - nonstrict read-write: Non ofrece ningunha garantía de consistencia entre a caché e a base de datos. Para sincronizar os obxectos da caché coa base de datos utilízanse timeouts, de modo que cando caduca o timeout se recargan os datos. Con esta estratexia, temos un intervalo no cal temos o risco de obter obxectos desfasados. Cando Hibernate realiza unha operación flush() nunha sesión, invalídanse os obxectos da caché de segundo nivel. Esta operación é asíncrona e non temos nunca garantía de que o outro usuario non poida ler datos erróneos. A pesar de todo isto, esta estratexia é ideal para almacenar datos que non se cambian demasiado críticos.
* - read-only: É a estratexia de concorrencia menos estrita. Ideal para datos que nunca cambian.
Aquí te dejo el contenido del PDF en formato markdown:

Unidad 4: HIBERNATE - Herramienta ORM

Un objeto Transaction representa una transacción física realizada contra la base de datos.

- La transacción se inicia explícitamente con beginTransaction.
- Se finaliza con commit o rollback.

- Cuando la transacción se confirma (commit), el estado de los objetos persistentes se sincroniza con la base de datos.
- Si se hace un rollback, Hibernate deshace todos los cambios realizados hasta ese momento en la base de datos, dentro de la transacción.
- Los cambios en memoria no se deshacen.
- Recordemos: una vez recuperados los objetos desde la base de datos, mantener su consistencia en memoria es tarea nuestra, no de Hibernate.

Es conveniente cerrar una transacción dentro de un bloque try-catch-finally.

En el control de concurrencia, Hibernate usa directamente conexiones JDBC y recursos JTA sin agregar ningún comportamiento de bloqueo adicional.

Hibernate no bloquea objetos en memoria. Su aplicación puede esperar al comportamiento definido por el nivel de aislamiento de las transacciones en el motor de la base de datos.

Una SessionFactory es un objeto costoso de crear, pensado para que todos los hilos de la aplicación lo compartan. Se crea una sola vez, usualmente al inicio de la aplicación, a partir de una instancia Configuration.

Una Session es un objeto de bajo costo, que se debe utilizar una sola vez y luego debe cerrarse para una sola unidad de trabajo. Una Session no obtendrá una conexión JDBC a menos que sea necesario. No consumirá recursos hasta que se utilice.

Una transacción de la base de datos debe ser tan corta como sea posible, para reducir la contención de bloqueos en la base de datos. Por lo tanto, no se recomienda que se mantenga una transacción de la base de datos abierta durante el tiempo de pensamiento del usuario (cuando tenga que introducir datos), hasta que la unidad de trabajo esté completa.
