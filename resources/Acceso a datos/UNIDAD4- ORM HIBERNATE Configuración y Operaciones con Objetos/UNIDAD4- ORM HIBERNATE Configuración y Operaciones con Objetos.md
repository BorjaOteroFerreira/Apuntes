

Unidad 4: HIBERNATE - Herramienta ORM

C.S. de Desenvolveento de Aplicacions Multiplataforma

UNIDAD 4: HIBERNATE - Configuración e operación con obxectos

Índice
1. Mapeo obxecto relacional
1.1 Desaxuste estrutural entre o modelo OO e o modelo relacional
1.2 Concepto de mapeo obxecto relacional
1.3 Ferramentas ORM. Vantaxes e inconvenientes
2. Hibernate
2.1 Arquitectura Hibernate
2.2 Como traballa Hibernate
2.3 Descargar Hibernate
2.4 Configuración
2.4.1 Configuración do servizo Hibernate
3. Inicio de Hibernate
3.1 Creación dunha instancia SessionFactory
3.2 Creación de obxectos Session
4. Traballando con obxectos
4.1 Comezando unha unidade de traballo
4.2 Ciclo de vida de obxectos persistentes
4.3 Persistindo un obxecto
4.4 Recuperando un obxecto persistente por id
4.5 Modificando un obxecto persistente
4.6 Borrando un obxecto persistente
4.7 Arquitectura da caché en Hibernate
4.7.1 Caché de primeiro nivel (Caché do contexto de persistencia)
4.7.2 Caché de segundo nivel
4.8 Transaccións

Unidad 4: HIBERNATE-Herramienta ORM

1. Mapeo obxecto relacional
1.1 Desaxuste estrutural entre o modelo OO e o modelo relacional

A maioría das aplicacións que se utilizan están deseñadas para usar a Programación Orientadas a obxectos (POO) baseada en obxectos. Os obxectos son entidades que teñen un determinado estado, comportamento (método) e identidade:

- O estado compóñese de datos ou información. Estes datos son representados por un ou varios atributos que almacenan valores concretos, o cal define a condición actual do obxecto. Exemplo Obxecto "Empregado":

  Id: 1
  Nome: "María"
  Apelido: "García"
  Edade: 28 anos
  Departamento: "Finanzas"
  Cargo: "Analista Financeiro"
  Salario: 2500 euros

- O comportamento está definido polos métodos ou mensaxes ás que sabe responder o devandito obxecto, é dicir, que operacións se poden realizar con el. Exemplos

  Método ascender(int id, String novoCargo): Actualiza o cargo do empregado.
  Método aumentarSalario(int id, double porcentaxeAumento): Ajusta o salario do empregado.
  Método cambiarDepartamento(int id, String novoDepartamento): Modifica o departamento do empregado.

- A identidade é unha propiedade dun obxecto que o diferenza do resto. O atributo "id" actúa como identificador único para cada obxecto "Empregado". Aínda que dous empregados poden compartir o mesmo nome ou apelido, o seu identificador único (id) será diferente, o que lles proporciona a súa propia identidade dentro do sistema.

El estado dos obxectos débese persistir, é dicir, preservalo de forma permanente (gardalo), para que, posteriormente, se poida recuperar a información deste (lelo) para a súa utilización de novo. Para a persistencia dos obxectos existen varias técnicas. Unha das máis estendida é a utilización dunha base de datos relacional.

Estas base de datos almacenan a información mediante táboas, filas e columnas e non se poden gardar de forma directa os obxectos nas táboas.


![imagen_2_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_2_1.png)

Para almacenar un obxecto hai que realizar unha correlación entre o sistema orientado a obxectos da linguaxe e o sistema relacional da nosa base de datos.

Unidad 4: HIBERNATE-Herramienta ORM

As bases de datos relacionais só poden gardar datos primitivos, polo que non podemos gardar obxectos que vaiamos creando na nosa aplicación, senón que o que facemos é converter os datos do obxecto en datos primitivos para podelos almacenar nas táboas correspondentes das nosas bases de datos. Se logo necesitamos ese obxecto nalgunha parte da nosa aplicación, debemos de recuperar os datos primitivos da base de datos e volver construír o obxecto.

![imagen_3_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_3_1.png)

Outra diferenza está no establecemento das relacións. No modelo OO, as relacións entre clase represéntanse mediante referencias a obxectos ou coleccións de referencias a obxectos e poden ser bidireccionais. Estas referencias direccionais úsanse para navegar dende un obxecto a outro. No modelo relacional, as relacións represéntanse mediante claves foráneas (FK), e copias de valores en diferentes táboas. As claves foráneas non son inherentemente direccionais.

Outro problema é o que se refire á navegación. Traballando con obxectos, saltamos dun obxecto a outro "paseando" (invocando métodos) polo grafo das asociacións (referencias). Para obter datos de diferentes táboas nunha base de datos relacional implica realizar un ou máis (custosos) joins.

Exemplo: En programación OO, para visualizar o nome do empregado que dirixe o departamento 1:

  Departamento dept = (Departamento) sesion.get(Departamento.class, 1);
  String nome = dept.getEmpregado().getNomeCompleto();

No modelo relacional, habería que facer unha consulta join:

  SELECT Nome + ' ' + Apelido_1 + ' ' + Apelido_2 FROM EMPREGADO INNER JOIN DEPARTAMENTO ON NSS_dirixe = NSS WHERE Num_departamento = 1;

Ademais, cando se invoca a linguaxe de consulta SQL dende unha linguaxe de programación é necesario un mecanismo de vinculación que permita percorrer as filas dunha consulta á base de datos e acceder de forma individual a cada unha delas.

No modelo relacional non se pode modelar a herdanza que aparece no modelo orientado a obxectos. O paradigma OO dá soporte á herdanza, normalmente en forma de superclases e subclases e os obxectos herdan atributos e comportamentos dos seus obxectos pais, pola contra, os SXBDs non soportan herdanza en forma nativa e, polo tanto, é necesario utilizar algunha estratexia para implementar a herdanza. As técnicas que se utilizan son: unha táboa por cada subclase, unha táboa por xerarquía ou unha táboa por clase.


Unidad 4: HIBERNATE-Herramienta ORM

# Exemplo: Implementación da herdanza do modelo OO cunha táboa por clase no modelo relacional.

![imagen_4_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_4_1.png)

Existen tamén desaxustes nos tipos de datos, xa que os tipos de datos almacenados na base de datos difiren dos utilizados nas linguaxes de programación.

## Tipos de datos JAVA

## Tipos de datos SQL

| Tipo de dato JAVA | Tipo de dato SQL |
| --- | --- |
| boolean | BOOLEAN ou BOOL (alguns sistemas de bases de datos) |
| String | VARCHAR, CHAR ou TEXT |
| int | INT |
| double ou float | FLOAT ou DOUBLE |
| Date, Calendar, LocalDate, LocalDateTime, LocalTime (para Java 8 y posteriores) | DATE, TIME, DATETIME, TIMESTAMP |

Estes desaxustes nos tipos de datos entre Java e SQL poden necesitar conversión ou xestión especial ao interactuar entre a capa de aplicación en Java e a base de datos relacional. Empregan técnicas como mapeo obxecto-relacional (ORM) ou consultas parametrizadas para xestionar estas diferenzas e asegurar a coherencia no intercambio de datos entre a aplicación e a base de datos.

# Unidad 4: HIBERNATE-Herramienta ORM

## 1.2 Concepto de mapeo obxecto relacional

Para atenuar os efectos do desaxuste entre os dous modelos existen varias técnicas e unha das máis usada é o mapeo Obxecto/Relacional.

ORM (Object Relational Mapping - Mapeo Relacional de Obxectos) é unha técnica de programación para converter datos entre a linguaxe de programación orientada a obxectos e o sistema de xestión de base de datos relacional utilizado no desenvolvemento de aplicacións.

![imagen_5_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_5_1.png)

A importancia da utilización das técnicas de mapeo obxecto_relacional é que converten, de forma automática, os obxectos nos datos primitivos almacenados nas táboas da base de datos relacional, simulando así o acceso a un sistema de base de datos orientados a obxectos. Isto posibilita o uso de características propias da orientación a obxectos como herdanza e polimorfismo. Na práctica, o mapeo obxecto-relacional crea unha base de datos virtual orientada a obxectos sobre a base de datos relacional.

![imagen_5_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_5_2.png)

# Unidad 4: HIBERNATE-Herramienta ORM

## 1.3 Ferramentas ORM. Vantaxes e inconvenientes

Entre as características dunha ferramenta ORM, podemos citar:

* Permítenos traballar directamente coas clases deseñadas no noso modelo de dominio, sen ter que traballar con filas das táboas da base de datos.
* Permite traballar con diferentes base de datos (SQLServer, Oracle, MySQL, PostgreSQL...) e para cambiar dunha base de datos a outra só habería que realizar o cambio no ficheiro de configuración.
* Xera automaticamente o código SQL necesario para o acceso á base de datos, usando un mapeo obxecto relacional, que se especifica mediante un documento XML ou por anotacións.
* Permite crear, modificar, recuperar e eliminar obxectos persistentes e ademais permite navegar polas asociacións entre os obxectos e actualizalos ao final dunha transacción.

## Vantaxes

* Rapidez no desenvolvemento. A maioría das ferramentas actuais permiten a creación do modelo por medio do esquema da base de datos, lendo o esquema, créanos o modelo axeitado.
* Abstracción da base de datos. Ao utilizar unha ferramenta ORM, evitamos a inclusión de sentenzas SQL embebidas no código da aplicación, separandonos totalmente do sistema de Base de datos que utilicemos. Isto facilita a migración cara a outro sistema xestor de bases de datos sendo o cambio máis sinxelo.
* Reutilización. Permítenos utilizar os métodos dun obxecto de datos dende distintas zonas da aplicación, mesmo dende aplicacións distintas.
* Seguridade. Os ORM adoitan implementar sistemas para evitar tipos de ataques como poden ser os SQL injections.
* Mantemento do código. Facilítanos o mantemento do código debido á correcta ordenación da capa de datos, facendo que o mantemento do código sexa moito mais sinxelo.
* Linguaxe propia para realizar as consultas. Estes sistemas de mapeo traen a súa propia linguaxe para facer as consultas, o que fai que os usuarios deixen de utilizar as sentenzas SQL e pasen a utilizar a linguaxe propia de cada ferramenta.

## Desvantaxes

* Tempo utilizado na aprendizaxe. Este tipo de ferramentas adoitan ser complexas polo que a súa correcta utilización leva un tempo que hai que empregar en ver o funcionamento correcto e ver todo o partido que se lle pode sacar.
* Aplicacións algo mais lentas. Isto é debido a que todas as consultas que se fagan sobre a base de datos, o sistema primeiro deberá transformalas á linguaxe propia da ferramenta ORM, despois ler os rexistros e por último crear os obxectos.
* Posíbel pérdida de rendemento: Aínda que as ferramentas ORM ofrecen flexibilidade e abstracción, ás veces poden xerar consultas menos eficientes que as escritas manualmente. Isto pode causar un rendemento inferior, especialmente en sistemas que manexan grandes cantidades de datos ou consultas moi específicas e complexas.
* Dependencia da calidade do mapeamento: A eficacia dunha ferramenta ORM depende moito da calidade do mapeamento definido entre os obxectos da aplicación e as táboas da base de datos.


Unidad 4: HIBERNATE-Herramienta ORM

### Desventajas del uso de herramientas ORM

- **Actualizacións automáticas e operacións complexas**: En certas situacións, as actualizacións automáticas da base de datos poden ser máis complicadas de xestionar.
- **Costo de recursos**: As ferramentas ORM poden precisar máis recursos de hardware e memoria debido ás operacións adicionais para mapear obxectos a táboas e viceversa, o que pode resultar nun maior consumo de recursos en comparación con operacións directas coa base de datos.

### Resumo

O uso dunha ferramenta ORM, é beneficioso en moitos casos, especialmente cando se traballa cunha estrutura de datos complexa ou cando se require portabilidade entre diferentes bases de datos. Tamén é útil cando se busca acelerar o desenvolvemento, evitar a escrita manual de sentenzas SQL e abstraerse da base de datos.

### Herramientas ORM

#### Hibernate

* É unha das ferramentas ORM máis utilizadas no mundo Java e está dispoñible como software libre baixo a licenza GNU LGPL (Lesser General Public License).
* Proporciona un marco de traballo que simplifica o mapeamento de obxectos Java a táboas de bases de datos.
* Utiliza arquivos de configuración XML ou anotacións para definir o mapeamento entre as clases Java e as táboas da base de datos.
* Hibernate xera consultas SQL automaticamente, facilitando a interacción entre as clases de Java e a base de datos relacional.

#### NHibernate

* É un framework similar e influenciado por Hibernate, pero está deseñado específicamente para a plataforma .NET.
* NHibernate segue moitos dos mesmos principios e conceptos de Hibernate, permitindo aos desenvolvedores traballar co mapeamento obxecto-relacional nun estilo semellante ao de Hibernate, pero na plataforma .NET.

#### Entity Framework (EF) Core

* É unha ferramenta ORM de Microsoft utilizada na plataforma .NET.
* Permite aos desenvolvedores traballar con datos relacionais usando obxectos .NET e abstrae a interacción coa base de datos.
* Ofrece soporte para diferentes provedores de bases de datos e permite a creación de aplicacións de .NET que poden traballar con SQL Server, MySQL, PostgreSQL, entre outros.

#### Django ORM

* É un framework de desenvolvemento web en Python, e o seu ORM é unha parte integral do mesmo.
* Django ORM facilita a creación, manipulación e consulta de datos relacionais utilizando obxectos Python.
* Proporciona unha abstracción sobre a base de datos relacional, o que permite aos desenvolvedores interactuar coa base de datos utilizando modelos de Python, simplificando así as operacións de base de datos.

#### Sequelize

* É unha ferramenta ORM para Node.js, compatible con varios dialectos de bases de datos SQL como MySQL, PostgreSQL, SQLite e MSSQL.
* Ofrece unha forma fácil e flexible de traballar con bases de datos relacionais utilizando JavaScript.
* Sequelize permite definir modelos e relacións entre eles, e xera consultas SQL automaticamente.

#### Doctrine

* É un framework ORM para PHP 5.2 e versións posteriores.
* Un dos seus puntos fortes é a súa linguaxe DQL (Doctrine Query Language), inspirada no HQL de Hibernate.
* Ofrece funcionalidades avanzadas de mapeamento objeto-relacional e simplifica a interacción con bases de datos relacionais en aplicaciones PHP.

#### Propel

* É outro framework ORM para PHP 5 e superior, amplamente utilizado no marco do framework Symfony, o cal é un completo framework deseñado para optimizar o desenvolvemento de aplicacións web segundo o patrón Modelo Vista Controlador (MVC).
* Propel facilita o acceso e manipulación de datos nunha base de datos relacional dende aplicativos PHP.

#### SQLAlchemy

* É un toolkit de código aberto SQL e unha ferramenta ORM para a linguaxe de programación Python.
* Publicada baixo a licenza MIT, é unha das ferramentas máis utilizadas xunto con Django para acceder a bases de datos relacionais dende aplicaciones Python.
* Ofrece funcionalidades potentes para xerar consultas SQL e interactuar coa base de datos.

#### JPA (Java Persistence API)

* É unha especificación de Java que describe un estándar para o mapeamento obxecto-relacional en aplicativos Java.
* Non é propiamente un framework, senón un estándar definido pola comunidade de desenvolvedores.
* A pesar de non ser un framework en si mesmo, JPA define un conxunto de interfaces e especificacións que as implementacións ORM poden seguir para proporcionar unha capa de abstracción entre a base de datos relacional e as clases de obxectos Java.

#### Hibernate e JPA

* Hibernate segue o estándar JPA (Java Persistence API) en varios aspectos importantes.
* Permite o uso das anotacións JPA estándar para o mapeamento obxecto-relacional.
* Proporciona unha implementación de EntityManager, que é a interface estándar de JPA utilizada para realizar operacións CRUD (Crear, Ler, Actualizar, Eliminar) nas entidades.
* Permite o uso de JPQL (Java Persistence Query Language), que é a linguaxe de consulta estándar de JPA.
* Segue o ciclo de vida estándar das entidades definido por JPA.
* Admite a xestión de transaccións utilizando o estándar JPA.


Unidad 4: HIBERNATE-Herramienta ORM

2. Hibernate
Hibernate é unha ferramenta ORM completa que conseguiu, nun tempo record, unha excelente reputación na comunidade de desenvolvemento, posicionándose, claramente, como un dos produtos OpenSource líder neste campo, grazas ás súas prestacións, boa documentación e estabilidade. Empezouse a desenvolverse fai algúns anos por Gavin King, sendo hoxe Gavin e Christian Bauer os principais xestores do seu desenvolvemento.

Hibernate parte dunha filosofía de mapear obxectos Java "normais", coñecidos na comunidade como "POJOS" (Plain Old Java Objects). Para almacenar e recuperar estes obxectos, o programador debe manter unha conversación co motor de Hibernate, mediante un obxecto especial que é a sesión.

Nota: POJO é un acrónimo para Plain Old Java Objects. O nome utilízase para resaltar que, o obxecto en cuestión, é un obxecto Java normal, non é un obxecto especial, e non é en particular un Enterprise JavaBean (EJB3 -Non é unha soa clase, senón un modelo completo de compoñente). O termo foi acuñado por Martin Fowler, Rebecca Parsons e Josh MacKenzie, en setembro de 2000. Un POJO é un obxecto serializable, ten un constructor sin argumentos, e permite o acceso ás propiedades utilizando os métodos getter e setter.

2.1 Arquitectura Hibernate
O API de Hibernate é unha arquitectura de dúas capas (Capa de persistencia e Capa de dominio (ou negocio).

![imagen_10_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_10_1.png)

Unidad 4: HIBERNATE-Herramienta ORM

- Capa de Persistencia: Esta capa é onde Hibernate xoga un papel importante. A través desta capa, Hibernate facilita a interacción coa base de datos. É aquí onde os obxectos da nosa aplicación se mapean ás táboas da base de datos.
- Capa de Dominio ou de Negocio: Esta capa contén a lóxica de negocio da aplicación. É onde se definen as regras de negocio e os procesos que a aplicación debe executar.

Esta arquitectura de dúas capas en Hibernate permite separar claramente as responsabilidades entre o traballo directo coa base de datos (Capa de persistencia) e a lóxica de negocio da aplicación (Capa de dominio), facilitando así un desenvolvemento máis estruturado e mantíbel da aplicación.

Nota:
JNDI (Java Naming and Directory Interface): É unha API de Java utilizada para acceder a servizos de directorio e obxectos a través de nomes. Permite que os aplicativos localicen e accedan a recursos distribuídos, como ordeadores, servidores de correo, bases de datos, etc.
JTA (Java Transaction API): É unha API de Java que proporciona un modelo de programación estándar para controlar transaccións en aplicativos Java.

2.2 Como traballa Hibernate
- Todas as consultas e operacións de inserción, actualización e supresión de datos na base de datos da aplicación, ímolas a realizar utilizando obxectos.
- No corazón de cada interacción, entre o código e a base de datos, atópase a sesión de Hibernate. A sesión de Hibernate é un obxecto Session, que encarna o concepto dun servizo de persistencia (ou xestor de persistencia ) e serve de ponte durante unha conversación entre a aplicación e a base de datos.
- Cada sesión envolve a conexión JDBC subxacente e serve como un primeiro nivel caché para obxectos persistentes ligados a ela.
- Hibernate garda nos arquivos de configuración cfg.xml, toda a información necesaria para conectarse a cada base de datos
- Hai que establecer a correspondencia entre as clases da aplicación e as táboas da base de datos (como os campos e propiedades das clases Java se mapean nas columnas da base de datos): se puede hacer con ficheros de mapeo  (hbm.xml) o anotacións nas clases.

![imagen_12_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_12_1.png)

Nota: As anotacións, como @Entity, @Table, @Column, entre outras, poden ser utilizadas directamente no código das clases Java.


# Unidad 4: HIBERNATE-Herramienta ORM

O uso de anotaciones en Hibernate permite definir o mapeamento directamente nas clases, o que puede simplificar a configuración, especialmente en aplicaciones con múltiples entidades, e facilita a lectura e comprensión do mapeamento ao ter todo o código relacionado nun único lugar.

Si Hibernate accede a máis dunha base de datos, necesitarase un arquivo de configuración para cada unha delas.

## Configuración de Hibernate

- Cada un destes arquivos específicos de configuración de cada base de datos, xunto cos ficheiros de mapeo (se o caso de mapeo), compílanse e almacénanse nunha caché polo obxecto SessionFactory.
- Para crear o obxecto SessiónFactory, utilízase a interface Configuration.
- Cada SessionFactory está configurada para traballar cunha determinada plataforma de base de datos.
- SessionFactory é un obxecto pesado que, idealmente, debe ser creado só unha vez (xa que é moi custoso de crear e implica unha operación lenta).
- O obxecto SessionFactory está posto a disposición do código da aplicación para realizar as operacións de persistencia previstas.
- Cada vez que se queira realizar estas operacións, créase un obxecto Session e realízanse baixo o contexto da sesión.

![imagen_13_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_13_1.png)

## Descargar Hibernate

2.3 
Descargar Hibernate 
Ata a versión do IDE NetBeans 8.2, xa inclúe as bibliotecas de Hibernate preinstaladas e ven con asistentes ou ferramentas integradas que facilitan a creación e configuración do Hibernate. Estas ferramentas poden axudar na creación dos arquivos de configuración, mapeamento e clases necesarias para traballar con Hibernate.
Na versión do IDE NetBeans 12 con jdk13, pódese configurar asistentes ou ferramentas integradas para facilitar a creación e configuración de Hibernate mediante un plugin chamado "Hibernate Support" 
Por exemplo, instalando o IDE Netbeans 7.4 temos dispoñible Hibernate 4.

Se non dispoñemos das librarías de Hibernate no noso IDE de programación, o primeiro que temos que facer é descargalas. Podémolo facer do sitio de descarga oficial de Hibernate: 

Unidad 4: HIBERNATE-Herramienta ORM 

![imagen_14_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_14_2.png)

https://hibernate.org/orm/releases/ 
Descargamos a última versión estable dispoñible. 

![imagen_15_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_15_2.png)

Neste caso, pódese descargar Hibernate 6.4 que a última. 

![imagen_15_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_15_1.png)


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_16_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_16_1.png)

Para hacer funcionar Hibernate, los archivos más importantes son los siguientes:
- hibernate-core-6.4.0.Final.jar: Este es el archivo JAR principal que contiene las clases y bibliotecas necesarias para ejecutar Hibernate.
- hibernate-core-6.4.0.Final-sources.jar: Este archivo contiene el código fuente de Hibernate, que puede ser útil para la depuración y el entendimiento del funcionamiento interno de Hibernate.
- hibernate-core-6.4.0.Final-javadoc.jar: Este archivo contiene la documentación de JavaDoc para Hibernate, que puede ser útil para entender el propósito y uso de las clases y métodos individuales en Hibernate.

Para utilizar Hibernate, se debe agregar el archivo hibernate-core-6.4.0.Final.jar a las bibliotecas del proyecto, también se necesita agregar el controlador JDBC correspondiente a la base de datos. Este controlador es el que permite a Hibernate comunicarse con la base de datos.

Por ejemplo, si se está utilizando MySQL como base de datos, se necesita el archivo mysql-connector-java.jar. Si se está utilizando PostgreSQL, se necesita el archivo postgresql.jar.

Una vez que se agregan estos archivos JAR a las bibliotecas del proyecto, se debería poder usar Hibernate para mapear las clases de Java a las tablas de la base de datos y realizar operaciones de base de datos.

Unidad 4: HIBERNATE-Herramienta ORM

2.4
Configuración
Debido a que Hibernate fue diseñado para que se pueda trabajar en distintos ámbitos, existen una gran cantidad de parámetros de configuración. Hibernate es un sistema altamente configurable para adaptarse a esto.

Para poder trabajar con Hibernate, se debe realizar:
- La configuración del servicio Hibernate.
- Proporcionar a Hibernate toda la información asociada a las clases que se quieren hacer persistentes es un paso crucial en el uso de Hibernate. Esto se puede hacer mediante el uso de archivos de mapeo o anotaciones en las clases.

Los archivos de mapeo son archivos XML que definen cómo se mapean las clases de Java a las tablas de la base de datos. Cada clase persistente tiene un archivo de mapeo correspondiente que especifica sus propiedades y cómo se mapean a columnas específicas en la tabla de la base de datos.

Las anotaciones son una alternativa a los archivos de mapeo. Proporcionan la misma información que los archivos de mapeo, pero están integradas directamente en el código de la clase. Esto puede hacer que el código sea más fácil de entender y mantener, ya que la información de mapeo está localizada junto con la clase que afecta.

2.4.1 Configuración del servicio Hibernate
Hibernate proporciona dos posibles archivos de configuración:
- Fichero XML normalmente llamado hibernate.cfg.xml.
- Fichero de propiedades estándar de Java (hibernate.properties).

Ambos archivos llevan a cabo la misma tarea (configuración del servicio Hibernate). Si ambos archivos se encuentran en el classpath de la aplicación, el primero sobrescribe al segundo.

Estos archivos se utilizan para configurar el tipo de conexión que se va a generar contra la base de datos y las clases que se van a asociar a las tablas.

Fichero hibernate.cfg.xml
Este archivo es leído por Hibernate cuando arranca. La estructura general de un archivo XML de configuración es algo como esto:

Unidad 4: HIBERNATE-Herramienta ORM

A continuación, se muestra un ejemplo de configuración hibernate.cfg.xml utilizando archivo de mapeo hbm.xml:

![imagen_18_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_18_1.png)

A continuación, se muestra un ejemplo de configuración hibernate.cfg.xml utilizando anotaciones:

![imagen_18_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_18_2.png)

Aquí observamos la gran importancia del archivo de configuración, ya que es aquí donde se especifica qué base de datos se utiliza, por lo que si se cambiara de base de datos, bastaría con cambiar este archivo de configuración, manteniendo la aplicación intacta.

La estructura del archivo hibernate.cfg.xml está marcada por un archivo de validación hibernate-configuration-3.0.dtd.

- Contiene los datos de conexión con la base de datos
- Sinala la situación de los archivos de mapeo de las clases persistentes.

La etiqueta <SessionFactory> consta de las etiquetas <Property> y <Mapping resource>. Si se dispone de varias bases de datos, hay que tener un SessionFactory por cada una de ellas.


Unidad 4: HIBERNATE-Herramienta ORM

### Propiedades (Property)

- Se definen los elementos necesarios para establecer las conexiones.
- Todos los nombres de las propiedades que soporta Hibernate, están definidos en org.hibernate.cfg.Environment
- En la etiqueta Mapping se indica donde está el archivo XML con el mapeo entre la clase Java y la tabla de la base de datos enlazada o los pojos con las anotaciones.

Algunas de estas propiedades son:

✓ Datos de la conexión: datos para conectar con la Base de datos.

- `hibernate.connection.driver_class`: Esta propiedad especifica el controlador JDBC que se usará para conectar con la base de datos. En este caso, se está usando el controlador JDBC de MySQL, que es `com.mysql.jdbc.Driver`.
- `hibernate.connection.url`: Esta propiedad especifica la URL de la base de datos. En este caso, la URL es `jdbc:mysql://localhost:3306/Agenda`, lo que significa que se está conectando a una base de datos MySQL llamada Agenda en el servidor local.
- `hibernate.connection.username` y `hibernate.connection.password`: Estas propiedades especifican el nombre de usuario y la contraseña que se usarán para conectar con la base de datos. En este caso, el nombre de usuario es `root` y la contraseña es `abc123`.
- `hibernate.dialect`: Esta propiedad especifica el dialecto de SQL que Hibernate debe usar, lo que nos permite generar un SQL optimizado para una base de datos relacional en particular. El dialecto es un tipo de "traductor" que permite que Hibernate genere SQL que sea compatible con tu sistema de gestión de bases de datos. En este caso, se está usando el dialecto de MySQL 5, que es `org.hibernate.dialect.MySQL5Dialect`.

![imagen_19_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_19_1.png)

Imágen de la página https://docs.jboss.org/hibernate/orm/4.2/manual/en-US/html_single/#configuration-optional-dialects

### Propiedades para habilitar información de log

✓ Propiedades para habilitar información de log (mejor deshabilitarlo en un ámbito en producción).

- `hibernate.show_sql`: Habilita mostrar por consola todas las sentencias SQL ejecutadas por Hibernate. Valores: `false` o `true`. El valor por defecto para esta propiedad es `false`, lo que significa que Hibernate no mostrará las consultas SQL que genere.
- `hibernate.format_sql`: Imprime el SQL en el registro y en la consola. Valores: `false` o `true`. El valor por defecto para esta propiedad es `false`, lo que significa que Hibernate no formateará el SQL generado para que sea más legible.
- `hibernate.use_sql_comments`: Hibernate agrega comentarios a todas las sentencias SQL generadas para explicar su origen. Valores: `false` o `true`. El valor por defecto para esta propiedad es `false`, lo que significa que Hibernate no agregará comentarios al SQL generado.

### Propiedades para la gestión de transacciones

✓ Propiedades para la gestión de transacciones: Estas propiedades ayudan a controlar el comportamiento de las transacciones en Hibernate.

- `hibernate.connection.autocommit`: Esta propiedad especifica si las transacciones deben confirmarse automáticamente. Valores: `false` o `true`. El valor por defecto para esta propiedad es `false`, lo que significa que las transacciones no se confirman automáticamente.

### Propiedades para la gestión de esquemas

✓ Propiedades para la gestión de esquemas: Estas propiedades ayudan a Hibernate a interactuar con el esquema de la base de datos.

- `hibernate.hbm2ddl.auto`: Esta propiedad permite controlar el comportamiento del esquema de la base de datos, con las operaciones crear, eliminar, actualizar o validar las tablas basándose en tus clases de entidad. Los valores posibles son `create`, `create-drop`, `update` y `validate`. No hay un valor por defecto para esta propiedad.
  - `create`: Se utiliza durante el desarrollo inicial, cuando estás creando tus entidades y quieres que Hibernate genere las tablas correspondientes.
  - `create-drop`: Borra las tablas al finalizar.
  - `update`: Se utiliza una vez que las entidades están bastante estables y quieres que Hibernate realice cambios incrementales en la base de datos a medida que modificas tus entidades.
  - `validate`: Se utiliza en producción, donde no quieres que Hibernate realice cambios en la base de datos. En su lugar, Hibernate comprobará que las entidades y las tablas coinciden. Si no se especifica la propiedad `hibernate.hbm2ddl.auto`, Hibernate no realizará ninguna operación automática en la base de datos. Esto significa que se tendrá que gestionar el esquema de la base de datos manualmente.

### Propiedades para la gestión de rendimiento

✓ Propiedades para la gestión de rendimiento: Estas propiedades ayudan a mejorar el rendimiento de Hibernate.

- `hibernate.jdbc.batch_size`: Esta propiedad especifica el número de actualizaciones que Hibernate agrupará juntas antes de enviar al servidor de la base de datos.

### Ficheiro Hibernate.properties

Los ficheiros `.properties` son simples ficheiros de texto que se adoitan utilizar para guardar parámetros de configuración, en forma de pares clave-valor.

Ejemplo de un ficheiro de configuración de propiedades:

Unidad 4: HIBERNATE-Herramienta ORM

![imagen_21_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_21_1.png)

En el Anexo se explica cómo crear el ficheiro `.properties` y los métodos principales para trabajar con este ficheiro.

A continuación, se muestra algunas páginas donde puedes aprender sobre las propiedades de configuración de Hibernate para establecer conexiones JDBC:

![imagen_21_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_21_2.png)

### Inicio de Hibernate

#### Creación de una instancia SessionFactory

El primer paso para trabajar con Hibernate es crear un SessionFactory. Es necesario un SessionFactory por cada base de datos con la que se vaya a trabajar.

La interface SessionFactory representa a la base de datos y proporciona instancias de objetos Session. Estas son compartidas por toda la aplicación, en cambio las instancias de sesión deben ser usadas solo por una única transacción o unidad de trabajo.

Primero tenemos que crear un objeto Configuration para indicarle a Hibernate dónde está el archivo de configuración. Esto podemos hacerlo con:

```java
Configuration cfg = new Configuration();
```

Métodos para indicarle qué es el archivo de configuración:

```java
cfg.configure("hibernate.cfg.xml");
```


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_22_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_22_1.png)

Ejemplo para indicarle el archivo de configuración hibernate.cfg.xml. Este archivo debe estar en la raíz de la aplicación.

```java
Configuration cfg = new Configuration().configure();
```

A continuación debemos crear un objeto SessionFactory. Para esto utilizamos el método `buildSessionFactory()` de la clase Configuration. La sintaxis de este método es:

```java
SessionFactory sessionFactory = cfg.buildSessionFactory();
```

Ejemplo de creación de un objeto SessionFactory:

```java
Configuration cfg = new Configuration().configure();
SessionFactory sessionFactory = cfg.buildSessionFactory();
```

La interfaz SessionFactory es compartida por toda la aplicación y nos proporciona instancias de objetos Session (objetos para comunicarnos con Hibernate), por lo que es recomendable tener una clase especializada para crear sesiones.

Un buen hábito de desarrollo es construir una clase llamada HibernateUtil que se apoye en el patrón Singleton. El objetivo de emplear este patrón es garantizar que una clase sólo tenga una instancia en la aplicación, y proporcionar un único punto de acceso global a ella.

El patrón Singleton garantiza que una clase sólo tenga una instancia y proporciona un punto de acceso global a esta instancia. Este patrón se utiliza cuando una clase controla el acceso a un recurso físico único o cuando hay datos que deben estar disponibles para todos los objetos de la aplicación y varios clientes distintos necesitan referenciar a un mismo elemento y queremos asegurarnos de que no haya más de una instancia de ese elemento.

Para esto, se desarrolla la clase HibernateUtil en la que declaramos un atributo static del tipo SessionFactory, asegurándonos de que sólo existe una instancia. Además, este atributo se define como final para que no pueda ser modificado ni alterado por ningún cliente que lo referencie.

Gracias al patrón Singleton obtenemos un acceso controlado a la sesión, y las clases que deseen una referencia a la sesión única obtenida llaman al método estático getSessionFactory() de la clase.

Unidad 4: HIBERNATE-Herramienta ORM

![imagen_23_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_23_1.png)

3.2 Creación de objetos Session

La responsabilidad principal de una SessionFactory de Hibernate es crear y gestionar objetos Session.

La responsabilidad principal de una Session de Hibernate es proporcionar una interfaz CRUD para las clases asignadas.

Nota: El acrónimo CRUD se refiere a las 4 funciones principales que se ejecutan en las aplicaciones de bases de datos relacionales para el almacenamiento persistente. Cada letra se asigna a cada una de las operaciones: Create (crear-INSERTAR), Read (leer, SELECT), Update (cambiar, UPDATE) y Delete (eliminar-DELETE)

Los objetos Session proporcionan tres formas de hacer consultas:

*   Utilizando la lengua de consulta HQL (Hibernate Query Language). Esta lengua de consulta es la lengua de consulta orientada a objetos de Hibernate. Permite realizar consultas similares a SQL, pero en términos de clases persistentes y sus propiedades.
*   Mediante la API de Programación para QBC (Query By Criteria). Dentro de Hibernate podemos encontrar la interfaz Criteria, que nos permite especificar consultas sobre las clases persistentes definiendo un conjunto de restricciones. QBC es una alternativa a HQL, pero a diferencia de ella, no es una lengua de consulta, sino una API de programación.
*   Utilizando sentencias SQL nativas para expresar consultas de base de datos. Sólo debe de utilizarse cuando las otras opciones no son válidas (por ejemplo, cuando se necesite utilizar una característica propia del SQL nativo de la base de datos).

Para abrir una conexión (sesión) utilizamos el siguiente método de la clase SessionFactory.

![imagen_23_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_23_2.png)

Ejemplo:

```java
public static void main(String[] args) {
    Session sesion = HibernateUtil.getSessionFactory().openSession();
}
```

La Session proporciona una caché (contexto de persistencia) donde se almacenan los estados de los objetos con los que se van manejar en la sesión, objetos que provienen de la base de datos o que se almacenarán en ella. Esto evita interacciones innecesarias con la base de datos. Cuando ejecutamos operaciones como: find(), update(), save(), saveOrUpdate(), get(), delete() o cualquier otra operación de la interfaz Session, estamos interactuando de manera transparente con la caché de Hibernate.

Las operaciones no se realizan directamente sobre la base de datos, se almacenan en la caché.

Cada vez que abrimos una sesión, obtenemos una conexión a base de datos mediante el pool de conexiones de Hibernate. Esta conexión se libera cuando se cierra la sesión con el método close(). Cuantas más sesiones mantengamos abiertas, más conexiones estaremos consumiendo del pool y podemos llegar a esgotarlo. Para solucionar esto, Hibernate permite desconectar una sesión momentáneamente utilizando el método disconnect(). Esta operación, libera la conexión con la base de datos, aumentando efectivamente la escalabilidad de nuestro sistema al evitar el esgotamiento del pool de conexiones. Para volver a obtener otra conexión a base de datos mediante el pool de conexiones, podemos utilizar el método reconnect().

4. Traballando con objetos

4.1 Comenzando una unidad de trabajo

Para comenzar una unidad de trabajo, se ejecutan las siguientes instrucciones:

```java
Session sesion = sessionFactory.openSession();
Transaction tx = sesion.beginTransaction();
```

*   En este punto, el contexto de persistencia es inicializado.
*   La aplicación puede tener varios objetos SessionFactory, cada uno conectado a una Base de Datos. La creación de SessionFactory es costosa, por lo que se aconseja inicializar el SessionFactory en el arranque de la aplicación una única vez.
*   La obtención de un objeto Session es muy ligera, de hecho una sesión no obtiene la conexión JDBC hasta que no es necesario, igual que su destrucción. Esto es importante, ya que nuestra aplicación necesitará crear y destruir sesiones todo el tiempo, quizás en cada petición.
*   En la última línea se abre una transacción, y todas las operaciones que se ejecuten dentro de la unidad de trabajo se realizarán en la misma transacción.
*   Proporciona un único hilo que determina la conversación entre la aplicación y la base de datos en una unidad atómica de trabajo.

4.2 Ciclo de vida de objetos persistentes

Los objetos persistentes van pasar por varios estados manejados por Hibernate, haciendo este proceso transparente. Hibernate define 4 estados, ocultando la complejidad de su implementación al usuario.


Unidad 4: HIBERNATE-Herramienta ORM

![imagen_25_2.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_25_2.png)

![imagen_25_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_25_1.png)

### Transitorio (temporais)

Un obxecto é transitorio se foi recen instanciado utilizando o operador new, e non está asociado a unha sesión de Hibernate. Estes obxectos non son transaccionais, non teñen unha representación persistente na base de datos, non se lle asignou un valor identificador, non están asociados a ningún rexistro da táboa na base de datos, polo que o seu estado pérdese tan pronto como deixan de estar referenciados por algún outro obxecto. Ao perder a referencia a un obxecto transitorio, este será destruído polo colleiteiro de lixo.

Utilízase a sesión de Hibernate para facer un obxecto persistente. Hibernate ocúpase das declaracións SQL que necesitan executarse para esta transición.

### Persistente

Un obxecto con estado persistente ten unha representación na base de datos e un valor identificador. Un obxecto pasa a estado persistente porque se garda, se obtén da execución dunha consulta ou porque se navegue polo grafo de asociacións dun obxecto persistente. Os obxectos persistentes encóntranse no ámbito dunha sesión. Están asociados a un obxecto Session e son transaccionais. O seu estado é actualizado na BD ao final da transacción.

### Unidad 4: HIBERNATE-Herramienta ORM

Por defecto escríbense todos os campos dunha táboa nunha actualización, pero pódese indicar que só se escriban as columnas modificadas, poñendo 'dynamic-update=true' no ficheiro de mapeo no elemento <class>.

Hibernate detectará calquera cambio realizado a un obxecto en estado persistente e sincronizará o estado coa base de datos cando se complete a unidade de traballo.

### Desconectados (separados ou desenlazados)

Unha instancia separada é un obxecto que se fixo persistente, pero a súa sesión foi pechada. Para entender os obxectos desconectados, débese considerar unha transición típica dunha instancia: Primeiro é temporal, dado que acaba de ser creado na aplicación. Posteriormente vólvese persistente, ao chamar a unha operación do administrador de persistencia (a sesión). Todo isto acontece dentro dunha soa unidade de traballo, e o contexto de persistencia para esta unidade de traballo está sincronizado coa base de datos nalgún punto.

A unidade de traballo complétase e o contexto de persistencia péchase. Non obstante, a aplicación aínda ten unha referencia á instancia que foi gardada. Sempre e cando o contexto de persistencia estea activo, o estado desta instancia é persistente, pero ao pecharse o seu estado cámbiase a desconectado.

Os obxectos desconectados indican que o seu estado non garante que estean sincronizados co estado da base de datos, non obstante é posible seguir empregándoos e modificalos.

### Obxectos borrados (removidos)

Un obxecto en estado borrado é planificado a ser borrado unha vez finalice a unidade de traballo (transacción). Por tanto, deberíase descartar calquera referencia a este obxecto.

### 4.3 Persistindo un obxecto

1. Instánciase un obxecto novo (estado transient).
2. Obtense unha sesión e comézase a transacción, inicializando o contexto de persistencia.
3. Unha vez obtida a sesión, chámase ao método save(), que introduce o obxecto no contexto de persistencia. Este método devolve o identificador do obxecto persistido.
4. Para que os cambios sexan sincronizados na base de datos, é necesario realizar o commit() da transacción ou dentro do obxecto sesión, chamar ao método flush(). Neste momento, obtense a conexión JDBC á base de datos para poder executar a oportuna sentenza.
5. Finalmente, a sesión péchase, libérase o contexto de persistencia, e xa que logo, a referencia do obxecto creado devólvese ao estado detached.

### Unidad 4: HIBERNATE-Herramienta ORM

### Exemplo:

![imagen_27_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_27_1.png)

### 4.4 Recuperando un obxecto persistente por id

Existen dous métodos que se encargan de recuperar un obxecto persistente por identificador: load() e get(). O obxecto recuperado queda automaticamente ligado á sesión. A diferenza entre eles radica na forma de indicar que un obxecto non se encontra na base de datos:

- get() devolve un nulo.
- load() lanza unha excepción ObjectNotFoundException.

### Por exemplo para recuperar o obxecto da táboa Persoa a través do seu identificador:

![imagen_27_3.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_27_3.png)

### 4.5 Modificando un obxecto persistente

Para actualizar un obxecto invócase ao método update do obxecto Session.

![imagen_27_4.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_27_4.png)


Unidad 4: HIBERNATE-Herramienta ORM

### 4.6 Borrando un objeto persistente

Para poder borrar un objeto es necesario obtenerlo previamente. Para borrar un objeto se invoca al método `delete` del objeto `Session`.

![imagen_28_3.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_28_3.png)

![imagen_28_4.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_28_4.png)

### 4.7.1 Caché de primer nivel (Caché del contexto de persistencia)

La caché de primer nivel está siempre asociada al objeto `Session`, no puede desactivarse y no necesita configuración alguna. Cada sesión abierta tendrá su propia caché de primer nivel proporcionando así un contexto de persistencia. En esta caché se almacenan los objetos que se recuperan de la base de datos, de manera que, si vuelven solicitarse, ya están en la caché y no se hará una nueva consulta a la base de datos.

- Para eliminar objetos de la caché, se puede llamar al método `evict(object)` que elimina el objeto pasado como parámetro de la caché. Este objeto pasa a estado detached.
- Para eliminar todos los objetos que se encuentran en la caché, se puede llamar al método `session.clear()` que elimina todos los objetos que se encuentran en la caché, pasando todos estos objetos a estado detached.

### 4.7.2 Caché de segundo nivel

La caché de segundo nivel permite mejorar el rendimiento y el acceso concorrente por varios usuarios a los datos de la base de datos. Esta caché evita los problemas que pueden ocurrir en las operaciones de actualización de datos concorrentes realizados en diferentes sesiones.

Esta caché de segundo nivel está asociada al objeto `SessionFactory` y se trabaja con todos los objetos recuperados y manejados por todas las sesiones. La caché de segundo nivel es global y se puede considerar como un contexto de persistencia.

### 4.7.2.1 Configuración de la caché de segundo nivel

Para que funcione la caché de segundo nivel, debemos habilitarla. Para ello, debemos hacer lo siguiente:

- Seleccionar un proveedor de caché.
- Agregar en el archivo `hibernate.cfg.xml` las siguientes propiedades:
  - `<property name="hibernate.cache.provider_class">Clase del proveedor de caché</property>`
  - `<property name="hibernate.cache.use_structured_entries">true</property>`
- Indicar en el classpath, el archivo de configuración xml del proveedor de caché (consultar instrucciones del proveedor de caché).
- Para cada clase que se quiera utilizar la caché de segundo nivel para persistir sus objetos, agregar la siguiente entrada:
  - `<class name=" ">`
    - `<cache usage="estrategia de concurrencia"/>`
    - `...`
  - `</class>`

### 4.7.2.2 Estrategias de concurrencia

Resulta necesario establecer una estrategia de concurrencia que permita sincronizar la caché de primer nivel con la caché de segundo nivel y esta última con la base de datos. Existen cuatro estrategias de concurrencia predefinidas. A continuación aparecen listadas por orden de restricciones en términos del nivel de aislamiento transaccional.

- `transactional`: Garante un nivel de aislamiento hasta lecturas repetibles (repeatable read), si se necesita. Es el nivel más estricto. Es conveniente su uso cuando no podemos permitirnos datos que queden desfasados. Esta estrategia sólo se puede utilizar en clusters, es decir, con caches distribuidas.
- `read-write`: Mantén un aislamiento hasta el nivel de commited, utilizando un sistema de marcas de tiempo (timestamps). Su mayor utilidad se da en el mismo caso que para la estrategia `transactional` pero con la diferencia de que esta estrategia no se puede utilizar en clusters.
- `nonstrict read-write`: No ofrece ninguna garantía de consistencia entre la caché y la base de datos. Para sincronizar los objetos de la caché con la base de datos se utilizan timeouts, de modo que cuando caduca el timeout se recargan los datos. Con esta estrategia, tenemos un intervalo en el que tenemos el riesgo de obtener objetos desfasados. Cuando Hibernate realiza una operación `flush()` en una sesión, se invalidan los objetos de la caché de segundo nivel. Esta operación es asíncrona y no tenemos nunca garantía de que otro usuario no pueda leer datos erróneos. A pesar de todo esto, esta estrategia es ideal para almacenar datos que no sean demasiado críticos.
- `read-only`: Es la estrategia de concurrencia menos estricta. Ideal para datos que nunca cambian.


Unidad 4: HIBERNATE-Herramienta ORM

### 4.8 Transacciones

Un objeto `Transaction` representa una transacción física realizada contra la base de datos.

#### Inicio y finalización de transacciones

*   La transacción se inicia explícitamente con `beginTransaction`.
*   Se finaliza con `commit` o `rollback`.

#### Comportamiento de transacciones

*   Cuando la transacción se confirma (`commit`), el estado de los objetos persistentes se sincroniza con la base de datos.
*   Si se hace un `rollback`, Hibernate deshace todos los cambios realizados hasta ese momento en la base de datos, dentro de la transacción.
*   Los cambios en memoria no se deshacen.
*   Recordemos: una vez recuperados los objetos desde la base de datos, mantener su consistencia en memoria es tarea nuestra, no de Hibernate.

#### Uso de transacciones en control de concurrencia

*   Hibernate usa directamente conexiones JDBC y recursos JTA sin agregar ningún comportamiento de bloqueo adicional.
*   Hibernate no bloquea objetos en memoria. La aplicación puede esperar al comportamiento definido por el nivel de aislamiento de las transacciones en el motor de la base de datos.

#### Sesiones y SessionFactory

*   Una `SessionFactory` es un objeto costoso de crear, pensado para que todos los hilos de la aplicación lo compartan. Se crea una sola vez, usualmente al inicio de la aplicación, a partir de una instancia `Configuration`.
*   Una `Session` es un objeto de bajo costo, que se debe utilizar una sola vez y luego cerrar para una sola unidad de trabajo. Una `Session` no obtendrá una conexión JDBC a menos que sea necesario. No consumirá recursos hasta que se utilice.

#### Duración de las transacciones

*   Una transacción de la base de datos debe ser tan corta como sea posible, para reducir la contención de bloqueos en la base de datos.
*   No se recomienda mantener una transacción de la base de datos abierta durante el tiempo de pensamiento del usuario (cuando tenga que introducir datos), hasta que la unidad de trabajo se encuentre completa.

![imagen_31_1.png](resources/Acceso%20a%20datos/UNIDAD4-%20ORM%20HIBERNATE%20Configuración%20y%20Operaciones%20con%20Objetos/images/imagen_31_1.png)
