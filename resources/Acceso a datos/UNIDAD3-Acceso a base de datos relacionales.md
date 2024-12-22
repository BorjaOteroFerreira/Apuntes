Unidad 3: Acceso a bases de datos relacionales

C.S. de Desarrollo de Aplicaciones Multiplataforma

Índice
- Acceso a bases de datos relacionales utilizando JDBC
  - Protocolos de acceso a bases de datos relacionales
  - API's de acceso a bases de datos
  - APIS estándar para acceso a bases de datos
  - Base de Datos Independentes e Embebidas
    - Base de datos independientes
    - Bases de datos embebidas
  - Acceso a bases de datos relacionales desde Java: Conectividad JDBC
    - Modelos de acceso de API JDBC a la base de datos
    - Tipos de Conectadores JDBC
  - Paquetes de API JDBC
    - Clases e interfaces del paquete java.sql
    - Pasos para acceder a una base de datos utilizando API JDBC
  - Interface Connection
    - Crear y ejecutar instrucciones SQL
  - Execución de sentencias de consulta y modificación de datos y procedimientos almacenados
    - Execución de sentencias SQL simples: Interface Statement
    - Execución de sentencias precompiladas: Interface PreparedStatement
    - Executar procedimientos almacenados y funciones: Interface CallableStatement
  - Acceso a Metadatos
    - Interface DatabaseMetaData
    - Interface ResultSetMetaData
  - Xestión de Transaccións e procesamento por lotes
    - Xestión de transaccións
    - Procesamento por lotes e transaccións
1.1 Protocolos de acceso a base de datos relacionais

A maioría dos SXBD relacionais teñen unha interface interactiva para introducir e executar directamente as ordes SQL.
Exemplo: en ORACLE, a utilidade para este fin chámase SQL -Plus. En SQL Server 2008, ten unha ferramenta gráfica chama da SQL Management Studio.

A interface interactiva é conveniente para crear a base de datos e as táboas, restricións ou para realizar consultas ad hoc ocasionais.
Isto implica que o sistema permite ao usuario personalizar unha consulta en tempo real, sen ter que estar atado ás consultas prediseñadas das aplicações.

Con todo, a maior parte das interaccións coas bases de datos fanse a través de programas de aplicacións que presentan, introducen e actualizan datos na base de datos relacional.
Estes programas coñécense como aplicacións de base de datos.

Existen varias aproximacións para interactuar cunha base de datos dende un programa de aplicación:
- Embeber as ordes SQL dunha base de datos relacional nunha linguaxe de programación anfitrión (C, Pascal, etc.).
  - Conectar a unha base de datos: EXEC SQL CONNECT
  - Declarar variables: EXEC SQL BEGIN/END DECLARE SECTION
  - Executar sentenzas SQL: EXEC SQL Sentenza.

As consultas SQL, como linguaxe declarativa, poden devolver unha relación (un conxunto de rexistros).
As linguaxes procedimentais non conteñen habitualmente unha estrutura de datos adecuada para iso, xa que logo, SQL proporciona un mecanismo de adaptación coñecido como cursor para ir accedendo aos rexistros individuais.

Necesítase un precompilador que prové o vendedor do SGBD (en Oracle, por exemplo: Prol*C) que traduce as sentenzas SQL converténdolas en chamadas a unhas librerías específicas, polo tanto, é dependente dun SXBD relacional en particular.

Exemplo do proceso de compilación dun programa con sentenzas SQL embebidas na linguaxe C
Unidad 3: Acceso a bases de datos relacionales

Emprender el uso de precompiladores y posiblemente utilizar librerías de funciones de acceso a bases de datos. Esta aproximación proporciona lo que se conoce como API (Application Programming Interface) para acceder a bases de datos. La aplicación se comunica a través de la API con la base de datos.

Ejemplo de Acceso a bases de datos utilizando una biblioteca de funciones

1.2 API's de acceso a bases de datos

Una API de acceso a bases de datos es una biblioteca de funciones y interfaces para realizar la mayoría de acciones de manejo de bases de datos que los programas pueden requerir: conectar con una base de datos, ejecutar sentencias SQL, recuperar una fila individual del resultado de una consulta, etc.

Para poder acceder y manipular la información de una base de datos es necesario llevar a cabo la instalación de ciertas APIs, que son indispensables para efectuar la conectividad de los datos externos, y vincularlas a la aplicación para su correcta y adecuada utilización.

Existen varias API de acceso a bases de datos:

- APIs nativas: la mayoría de los fabricantes de SXBD ofrecen APIs nativas propias para acceder a sus bases de datos y que son únicas.

Estructura general de acceso a distintas bases de datos utilizando APIs Nativas de cada fabricante
Unidad 3: Acceso a bases de datos relacionales

- Seu SXBD propio, dando soporte a todas as funções de acesso à base de dados e melhora o rendimento,
pois a conexão entre a nossa aplicação e o motor de base de dados é directa e não necesita de intermediários.
- O inconveniente é que estas API nativas são diferentes para cada SXBD (tanto nos nomes das funções
que se utilizam para crear unha conexión á base de datos, para lanzar unha consulta, como no tratamento
de erros, resultados, etc...) ou que obriga aos programadores a adaptar cada programa ás características
de cada xestor de base de datos.

APIs nativas de acesso a base de datos:

- Oracle Call Interface (OCI): interface nativa que permite conectar e procesar sentencias SQL
nuna base de datos Oracle sem necesidade de ningún controlador externo. Para utilizar a API OCI,
se necesita instalar e configurar Oracle SQL*Net nas computadoras clientes para acceder ao servidor
Oracle.

APIs Standard de acceso a base de datos:

- Están compostas por un conxunto de bibliotecas de funcións que unifican e estandarizan o acceso
ás bases de datos. Grazas a isto, unha aplicación pode acceder a calquera base de datos sen necesidade
de modificar a aplicación.

Conectador ou driver:

- Conxunto de clases encargadas de implementar as interfaces do API e acceder ás bases de datos.
- Cada conectador é específico para un SXBD en particular, por exemplo, un conectador para Oracle
non pode acceder directamente aos datos do SXBD MySQL.

Os conectadores expoñen as capacidades do SXBD subxacente, pero non están obrigados a implementar
as funcións que non admita o SXBD. Por exemplo, si o SXBD suxacente non admite combinações externas,
tampouco o conectador.

As tarefas específicas realizadas polos conectadores són:

- Conexión e desconexión da base de datos.
- O envío das instrucións SQL para a súa execución ao SXBD. Ás veces implica co nverter as
instrucións SQL a instrucións SQL do SXBD específico.
- A recuperación dos datos proporcionados polo SXBD, incluíndo a conversión de tipos de datos
segundo o especificado pola aplicación.
Unidad 3: Acceso a bases de datos relacionais

- Para almacenar información, non hai que escribir un programa para acceder a Oracle, outro para MySQL, etc.
- Dado que a API Standard utiliza unha serie de clases e interfaces xenéricas que actúan sobre o conectador,
- non sobre a base de datos.

Como inconveniente sería a penalización no rendemento xa que a conexión entre a nosa aplicación e o motor de base de datos non é directa e necesita de intermediarios.

Algunas APIs de acceso a bases de datos standard máis populares son:

- OLE DB
- ODBC (Open Database Connectivity)
- JDBC (Java Data Base Connectivity)

1.3 APIs standard para acceso a bases de datos

ODBC (Open Data Base Connectivity):

- As sig las ODBC significan en inglés Open DataBase Connectivity (Conectividade Aberta de Bases de Datos)
- Foi creada por Microsoft en 1992 como un xeito de estandarizar a comunicación entre unha aplicación e unha base de datos relacional utilizando para iso a linguaxe SQL.
- Construída sobre a linguaxe C, é moi utilizada para acceder a bases de datos de diferentes provedores desde múltiples plataformas e por iso é probablemente unha das API máis estendidas para o acceso a bases de datos relacionais.
-Nota: ODBC é o único conxunto de API que están dispoñibles en todas as plataformas, incluíndo plataformas non Windows.
- ODBC converteuse nun estándar industrial de facto para o acceso ás bases de datos relacionais que utiliza SQL e permite manter a independencia entre as linguaxes de programación, os sistemas de bases de datos e os sistemas operativos.
- O OBDC é a capa intermedia entre a aplicación e o SXBD, que traduce as consultas de datos da aplicación en comandos que o SXBD entende.
- Para que isto funcione tanto a apl icación como o SXBD deben ser compatibles con ODBC.
- A aplicación debe ser capaz de producir comandos ODBC e o SXBD debe ser c apaz de responder a eles.
- A través de ODBC, unha aplicación pode conectar con calquera base de datos na que exista un conectador O DBC.
- Os creadores das distintas bases de datos son os responsables de crear un conectador ODBC para que a súa base de datos se poida conectar dende unha aplicación.
- Por exemplo: MySQL, Access (Microsoft Jet) e SQL Server de Microsoft, Oracle, PostgreSQL, e tc.. dispoñen dun Conectador ODBC que se pode descargar dende as súas respe tivas páxina web.

OLE DB (Object Linking and Embedding for Databases)

- OLE DB é a sigla de Object Linking and Embedding for Databases ("Enlace e incrust ación de obxectos para bases  de datos")
- É unha tecnoloxía desenvolvida por Microsoft que se creou como sucesora de ODBC para ter acceso a diferentes fontes de información, ou bases de datos, de xeito uniforme.
- OLE DB é un API de baixo nivel para o acceso a fontes de datos de difer entes formatos que inclúe non só o acceso a bases de datos relacionais utilizando SQL, senón que amplía o a cceso a outras fontes tales como bases de datos orientadas a obxectos e follas de cálculo, que non necesariamente se implementan con SQL.
Unidad 3: Acceso a bases de datos relacionales

El estándar para la conectividad entre la lengua Java y un amplio rango de sistemas gestores de bases de datos es JDBC.

JDBC forma parte del API de Java e se implementa como un paquete de clases de Java que contiene todos los elementos para gestionar bases de datos.

A partir de la versión 1.1 del JDK, estas clases se incluyen de serie dentro del paquete Java.sql.

Esta API proporciona acceso universal a un gran número de bases de datos relacionales, permitiendo al programador centrarse en el desarrollo de su aplicación en lugar de sobre la mecánica de comunicación con una base de datos específica.

Para acceder a la información de una base de datos desde Java utilizando JDBC, se necesitan los siguientes elementos:

- Una base de datos. Aunque no es imprescindible, ya que se podría crear desde código Java.
- Un SXBD (Sistema Xestor de Bases de Datos) como Oracle, SQLServer, MySQL, etc.
- Un conectador (o driver) JDBC proporcionado por el fabricante del SXBD.

1.4 Base de Datos Independientes y Embebidas

Á hora de elegir una base de datos para nuestra aplicación es importante conocer las diferencias opciones que tenemos.

1.4.1 Base de datos independientes

La mayoría de los SXBD más populares y utilizados soportan la arquitectura cliente/servidor.

En el servidor se instala y se configura el SXBD como un servicio independiente y se almacena la base de datos.

Los programas de los clientes deben establecer una conexión con el servidor para emitir instrucciones SQL de acceso a la base de datos y recibir los resultados.

Los programas de los clientes no tienen la responsabilidad del acceso a los datos y manejan solo la petición, el procesamiento y la presentación de los datos.

El servidor ejecuta y maneja las funciones relativas al acceso compartido a los datos, acepta sentencias SQL originadas por las aplicaciones de los clientes, procesa y devuelve los resultados a los clientes.

Entre las características de estos SXBD se pueden citar:

- Son multiusuario y proporcionan una alta taxa de concurrencia.
- Soportan transacciones.
- Tienen una gran estabilidad y son muy robustos.
- Presentan una gran escalabilidad.
- Manejan grandes volumes de datos.
- Contienen un subsistema de seguridad y autorización que se encarga de garantizar la seguridad de las bases de datos contra los accesos no autorizados.
- Estos SXBD tienen opciones que permiten manejar la seguridad, proteger los datos contra el acceso, la alteración o la destrucción no autorizada, conceder privilegios de acceso a los usuarios, proteger los datos frente a caídas o fallos en el software o en el equipo y realizar y restaurar copias de seguridad.

- También tienen herramientas de auditoría que permiten registrar y monitorizar los accesos a los datos, las operaciones efectuadas en los datos, la actividade del SXBD, etc.
Unidad 3: Acceso a bases de datos relacionales

Gran alternativa cuando se requieren los requisitos necesarios para almacenar información nos empuja a utilizar motores de bases de datos, donde el rendimiento, la concurrencia, la seguridad, la escalabilidad, la estabilidad y la integridad son factores muy importantes y determinantes.

Exemplos de bases de datos independientes: MSSQLSERVER, ORACLE, MySQL y PostgreSQL.

1.4.2 Bases de datos embebidas

Hai ocasións onde os requirimentos das aplicación son outros diferentes aos que aportan as base de datos independentes, como a portabilidade, utilización dunha memoria mínima, r apidez de acceso, e é aquí onde xurdiron pequenos motores denominados bases de datos embebidas ou incrustadas.

A diferencia dos sistemas de xestión de bases de datos independentes cliente-servidor, o SXBD non é un proceso independente co que a nosa aplicación se comunica, senón que adoita ser unha biblioteca que se enlaza co software mediante chamadas a funcións e subr utinas. Isto reduce a latencia no acceso á base de datos, debido a que as chamadas a funcións son máis eficientes que as comunicacións entre procesos.

As bases de datos embebidas son dependentes da aplicación, instálanse no cliente xunto á aplicación e o seu uso só é exclusivo para esta (só a aplicac ión que lanza a base de datos embebida pode acceder ás súas táboas). Estas bases inícianse cando se executa a aplicación, rematan cando se pecha esta e pódese acceder a elas directamente dende a aplicación, sen ter que facer unha conexión cun servidor de base de datos, como ocorría nas bases de datos independentes.

Normalmente as bases de datos embebidas comparten unha serie de características comúns: O seu pequeno tamaño e os poucos recursos que consumen . Isto implica unha maior veloc idade e unha mellor integración.

Exemplos: Sqlite, Apache Derby, Hypersonic e Db2 de IBM.

1.5 Acceso a bases de datos relacionais dende Java: Conectividade JDBC

Java proporciona acceso a base de datos relacionais, dende a versión 1.1, empregando o conxunto de clases e interfaces da API JDBC.

Versións do API JDBC

1.5.1 Modelos de acceso da API JDBC ás base de datos

A API JDBC soporta dous modelos distintos de acceso ás base de datos:

- Modelo de dúas capas.
- Modelo de tres capas.
# Unidad 3: Acceso a base de datos relacionales

## Conexión directa con SXBD

La aplicación Java se conecta directamente con SXBD. Se requiere que el coneccionador JDBC se almacene junto con la aplicación para que se pueda comunicar con el sistema de bases de datos.

## Requisitos

- La aplicación cliente y la base de datos pueden estar en máquinas diferentes.
- La comunicación entre el cliente y el servidor se realiza a través de la red (Internet o Intranet).

## Arquitectura típica cliente/servidor

- La máquina del usuario que contiene la aplicación es el cliente.
- La máquina que contiene la base de datos y el SXBD es el servidor.
- La aplicación cliente envía sentencias SQL a la base de datos y recibe los resultados de la ejecución de estas sentencias.

## Modelo de dos capas de conexión del conectador JDBC a base de datos

- La aplicación cliente envía las sentencias SQL a una capa intermedia de servicios que se encarga de enviarlas al SXBD.
- El SXBD procesa las sentencias y retorna los resultados a la capa intermedia que se encarga de enviarlos a la aplicación del usuario.

## Modelo de tres capas de conexión del conectador JDBC a base de datos

- La aplicación cliente envía las sentencias SQL a un nivel intermedio que se encarga de enviarlas al SXBD.
- El SXBD procesa las sentencias y retorna los resultados al nivel intermedio que se encarga de enviarlos a la aplicación del usuario.
- La ventaja de este modelo es que el nivel intermedio mantiene el control de las operaciones que se realizan en la base de datos y no se requiere la instalación de software adicional en la máquina cliente.

- **Ventajas**

  - El nivel intermedio mantiene el control de las operaciones que se realizan en la base de datos.
  - Los conectores JDBC no necesitan residir en la máquina cliente, lo que libera al usuario de la instalación de software adicional.
Unidad 3: Acceso a bases de datos relacionales

1. Unha das decisións importantes no deseño dunha aplicación de bases de datos Java, é decidir o tipo de conectador JDBC para a comunicación coa base de datos.
2. Os conectadores JDBC clasifícanse en catro tipos ou niveis:
   - Tipo 1: Ponte JDBC -ODBC
   - Tipo 2: Conectador API nativo/parte Java
   - Tipo 3: Conectador protocolo de rede/todo Java
   - Tipo 4: Conectador protocolo nativo/todo Java

3. Tipo 1: Ponte JDBC -ODBC (JDBC-ODBC bridge plus ODBC connector)
   Permite ao programador acceder a unha base de datos ODBC existente mediante JDBC.
   Este tipo de conectador proporciona acceso a algúns dos xestores de base de datos menos populares e non existen conectadores JDBC para eles.
   Existen controlador es ODBC para a maioría dos SXBD relacionais e para algúns deles representa o único modo de acceder as súas bases de datos desde Java, como por exemplo para as bases de datos Access, dBase ou Paradox.

4. O conectador ponte JDBC -ODBC implementa as operacións JDBC traducíndoas en oper acións ODBC.
   Atópase dentro do paquete sun.jdbc.odbc, incluído dentro do JDK a partir da versión 1.1 e contén as librerías nativas para acceder a ODBC.

5. Funcionamento do conectador tipo 1 ponte JDBC -ODBC.
   O conectador ODBC, ao utilizar código nativo, debe ser instalado e configurado en cada máquina cliente da base de datos.
   Isto pode representar un gran inconveniente para unha aplicación en produción, por iso, este conectador é máis adecuado en empresas onde a instalación dos clientes non supón gran problema, ou ben para un servidor de aplicacións n unha arquitectura de tres capas.
   Tampouco poden utilizarse nun applet, xa que os applets non poden cargar código nativo debido ás restricións de seguridade destes.
   Outra desvantaxe deste tipo de conectador é que a conexión se volve máis lenta porque se ten que realizar a conversión das chamadas de JDBC a ODBC.

6. Hai un conectador xenérico ponte JDBC -ODBC incluído no JDK: sun.jdbc.odbc.JdbcOdbcDriver
Unidad 3: Acceso a bases de datos relacionales

Este conectador convierte las llamadas JDBC en llamadas a métodos nativos del SXBD.
Necesita de una biblioteca específica proporcionada por el fabricante del SXBD para traducir las llamadas JDBC en código nativo del SXBD.
De la misma manera que la puente JDBC -ODBC, este tipo de conectador exige la instalación y configuración de la biblioteca nativa en cada cliente de la base de datos.

Funcionamiento del conectador tipo 2 JDBC API Nativo

Este tipo de conectador es mejor que la puente JDBC -ODBC, ya que las llamadas JDBC se convierten en llamadas a las bibliotecas nativas de forma directa.
Debido al código nativo, la portabilidad de estos controladores es limitada y tampoco se pueden utilizar dentro de los applets.
Este tipo de conectador no está disponible en todas las plataformas de bases de datos.

Exemplo: el conectador Oracle JDBC/OCI es un conectador tipo 2.

Tipo 3: Conectador JDBC -Net puro Java

El conectador de tipo JDBC -Net está escrito completamente en Java y comunica con un intermediario que se encuentra entre el cliente y la base de datos, utilizando un protocolo de red determinado por el intermediario (p. ej. TCP/IP).
El intermediario se encarga de recibir las solicitudes de los clientes y convertirlas en llamadas a funciones nativas de la base de datos utilizada.
Unidad 3: Acceso a bases de datos relacionales

Funcionamiento del conectador tipo 3 JDBC NET puro nativo

No es necesario instalar código nativo en las máquinas clientes, ya que es posible implementar este conectador utilizando solo tecnología Java.
El servidor intermediario puede proporcionar conexión con varias bases de datos distintas, pero solo será necesario un conectador JDBC.

Este tipo de conectador es muy flexible, portable y se puede utilizar en applets.
Su utilización es ideal para aplicaciones con arquitectura baseada en el modelo de tres capas.

Un ejemplo de utilización de este conectador puede ser un applet que se comunica con una aplicación intermediaria en el servidor, y esta aplicación intermediaria es la encargada de acceder a la base de datos.

Un inconveniente es que el uso del servidor intermedio hace necesaria la transmisión de datos más lenta que usando los conectores tipo 2 o 4.

Tipo 4: Conectador de Protocolo Nativo

El conectador de tipo Protocolo Nativo está escrito completamente en Java y se comunica directamente con el SXBD utilizando un protocolo nativo del servidor.
Estos conectores son propietarios y son proporcionados por los mismos proveedores de diferentes SXBD.
Unidad 3: Acceso a bases de datos relacionales

Este tipo de conectador obtiene mejor rendimiento, ya que puede funcionar directamente sin necesidad de un software intermediario. La eliminación de intermediarios hace que el rendimiento sea óptimo. Como es un conectador 100% Java puede funcionar en applets y es portable.

Com el inconveniente es que el conectador es dependiente del SXBD, por lo que se necesita un conectador distinto para cada SXBD.

1.6 Paquetes de la API JDBC

El API JDBC compone un conjunto de interfaces Java que se encuentran en los siguientes paquetes:

- **java.sql**: contiene las clases e interfaces que componen la funcionalidad básica de JDBC:
  - Conexión/desconexión a la base de datos.
  - Envío de peticiones.
  - Procesamiento del resultado de la ejecución de peticiones.
  - Lectura de los metadatos sobre la estructura de la base de datos.

Este paquete forma parte de la lengua Java desde la liberación del JDK 1.1. Incluye como parte de la Plataforma Java 2, Standard Edition.

- **javax.sql**: contiene funcionalidad extendida, introducida en el API JDBC 2.0. Las clases e interfaces en este paquete proporcionan una nueva funcionalidad, como la agrupación de conexiones y las transacciones distribuidas, que no entran dentro del ámbito de la API JDBC original. A través del agrupamiento de conexiones (pooling), permite que una conexión sea utilizada y reutilizada, reduciendo el número de conexiones que es necesario crear y mejorando el rendimiento. El manejo de transacciones distribuidas permite manejar información de distintas bases de datos en una sola transacción.

En la figura se muestra los paquetes que componen el API JDBC.

1.6.1 Clases e interfaces del paquete java.sql

Las clases e interfaces básicas de la API JDBC son las siguientes:
Unidad 3: Acceso a bases de datos relacionales

*   **Clase DriverManager**
    -   Esta clase gestiona los conectores de base de datos y da soporte a la creación de nuevas conexiones a base de datos. Encarga de conectar a la aplicación Java con el conectador JDBC correspondiente.
    -   Se puede utilizar DriverManager para cargar varios conectores de base de datos en memoria al mismo tiempo. Cada conectador puede apuntar a una base de datos distinta, o todos ellos pueden apuntar a la misma.
*   **Interface Driver**
    -   La interface Driver representa el punto de contacto entre una aplicación Java y el conectador establece una conexión con base de datos.
*   **Interface Connection**
    -   Esta interface representa una sesión con una base de datos específica. 
    -   Permite a los programadores crear objetos instrucción que ejecutan sentencias SQL en base de datos.
*   **Interface DatabaseMetaData**
    -   Además, es posible utilizar un objeto Connection para obtener información sobre la estructura de la base de datos y sobre las capacidades del conectador JDBC utilizando esta interface.
*   **Interfaces Statement, PreparedStatement, e CallableStatement**
    -   La interface Statement funciona como un contenedor para ejecutar instrucciones SQL en una conexión dada. Existen dos subtipos importantes de Statement: Prepared Statement y CallableStatement.
    -   La interface PreparedStatement almacena una instrucción SQL precompilada, de forma que puede ser ejecutada varias veces.
    -   La interface CallableStatement ejecuta procedimientos almacenados y funciones SQL.
*   **Interface ResultSet**
    -   La interface ResultSet representa un conjunto de datos devueltos al ejecutar una consulta SQL de tipo SELECT, es decir, es el resultado de ejecutar una instrucción. Dentro de cada fila es posible acceder a los valores de las columnas en cualquier orden. Un ResultSet mantiene un cursor que apunta a su fila de datos actual, inicialmente el cursor se sitúa antes de la primera fila. El método next se utiliza para mover el cursor a la siguiente fila.
*   **Interface ResultSetMetadata**
    -   Obtén información sobre el objeto ResultSet.

**Pasos para acceder a una base de datos utilizando API JDBC**

1.  **Instalar el conectador**
2.  **Cargar un conectador de base de datos**
3.  **Establecer conexiones con bases de datos**
4.  **Crear y ejecutar instrucciones SQL**
5.  **Liberar los recursos y cerrar la conexión**
Unidad 3: Acceso a bases de datos relacionales

Funcionamiento básico de un programa que accede a una base de datos utilizando un conectador JDBC

- Instalación del conectador
  - El conjunto de clases y interfaces del conectador JDBC está implementado en archivos con extensión jar
  - Para poder utilizarlos, deben estar cargados en el proyecto Java

- Cargar el conectador de la base de datos
  - La clase DriverManager lleva el control de los conectores JDBC cargados en memoria y se encarga de realizar las conexiones con la Base de Datos
  - Se deben cargar en memoria los conectores JDBC para que sean registrados por el DriverManager

- Cada conectador JDBC es una clase que implementa la interfaz Driver
- Hay varios métodos para cargar y registrar el conectador, pero el más recomendado es el siguiente:
  - Chamando al método estático forName() de la clase Class
  - Class.forName("jdbc.NomeClaseConectador");
  - Este método carga en memoria la clase del conectador y automaticamente es registrada por el DriverManager

- La clase Class representa las instancias de todas las clases e interfaces que existen en el programa actual
- No existe un constructor público para esta clase, los objetos Class son instanciados directamente por la Máquina Virtual de Java

- La función del método Class.forName es cargar una clase de forma dinámica a partir del nombre completo de la clase que se le pasa como parámetro
- Si el conectador jdbc NomeClaseConectador está implementado correctamente, al cargar su clase lanzará automaticamente una llamada al método DriverManager.registerDriver()
  - Y desde esta forma ya está disponible en la lista de conectores del DriverManager para que se pueda realizar una conexión con él

- El método forName puede lanzar la excepción ClassNotFoundException cuando se intenta cargar la clase del conectador especificada y no se encuentra
- Una vez cargado el conectador es posible realizar una conexión con la base de datos
- Unidade 3: Acesso a base de dados relacionais

try {
  Class.forName("com.mysql.jdbc.Driver");
} catch (ClassNotFoundException claseNoEncontrada) {
  System.out.println("No se encontró o conectador");
}

Para realizar una conexión con la base de datos, una vez que las clases de los conectores se han cargado en la memoria y se han registrado por el DriverManager, estas están disponibles para establecer una conexión con una base de datos.

Para establecer la conexión con la base de datos, se utiliza el método estático getConnection() de la clase DriverManager.

```java
public static Connection getConnection(String url, String usuario, String contrasinal) throws SQLException;
```

Donde:

- url: es el identificador de la Base de Datos.
- usuario: es el nombre del usuario con el que se abre la conexión (opcional).
- contrasinal: es el contrasinal del usuario (opcional) para acceder al gestor de la base de datos.

La conexión física con la base de datos se representa en Java a través del interfaz Connection.

Connection conexion = DriverManager.getConnection(url, usuario, contrasinal);

Un objeto de tipo Connection representa una sesión abierta con una base de datos. Provee un contexto en el que se pueden emitir sentencias SQL y obtener resultados. Una aplicación puede tener varias conexiones a la misma base de datos o varias conexiones a distintas bases de datos.

Cada vez que se realiza una petición de conexión con una llamada al método DriverManager.getConnection(), la clase DriverManager prueba cada uno de los conectores en la orden en que se han registrado para comprobar si puede establecer la conexión. El testeo se realiza llamando al método Driver.connect() de cada conectador, al que pasa la URL de JDBC del método DriverManager.getConnection(). El primer conectador que reconoce esta URL será el que realiza la conexión y devuelve un objeto Connection a la clase DriverManager, y que a su vez lo devuelve a la aplicación. Si no localiza ningún conectador que reconozca la URL, se lanza una excepción específica de JDBC mediante la clase SQLException.
Unidad 3: Acceso a bases de datos relacionales

- Selección del conectador JDBC adecuado
- Ejemplo de conexión a base de datos MySQL demodb

**Conexión a la base de datos MySQL demodb**

```java
Connection conexion;
try {
    Class.forName("com.mysql.jdbc.Driver"); // Importante: com.mysql.jdbc.conectador no existe
    conexion = DriverManager.getConnection("jdbc:mysql://localhost/demodb", 
        "root", "abc123.");
} catch (ClassNotFoundException claseNoEncontrada) {
    System.out.println("No se encontró el conectador");
} catch (SQLException ex) {
    System.out.println("Error al realizar la conexión");
}
```

**Identificación de una base de datos mediante una URL**

- La URL de JDBC proporciona la forma de identificar una base de datos.
- Cada proveedor de un conectador determina la URL que identifica al su conectador particular.
- La sintaxis estándar de las URLs de JDBC tiene tres partes, separadas por dos puntos (:)

**URL de JDBC estándar**

```java
jdbc:subprotocolo:subnome
```

- Identifica el protocolo, subprotocolo, y la base de datos específica.
- O protocolo  sempre é jdbc.  
- O subprotocolo  é o nome do conectador  ou o tipo de mecanismo de conexión á base de datos, que 
pode estar soportado por un ou máis conectadores.  Para que o DriverManager poida distinguir entre 
conectadores, estes deben ter identificadores de subprotocolos di stintos.  
- O subnome identifica a base de datos . O subnome pode variar, xa que pode identificar unha base de datos local, unha base de datos remota, un número de porto específico ou unha base de datos que 
requira identificador de usuario e contr asinal.  
Si a base de datos se atopa nun servidor remo to é probable que sexa necesario ter máis i nformación, por 
exemplo, pode ser necesario incluír como parte do subnome  a dirección de rede do servidor. Neste caso, 
adóitase seguir o estándar de nomenclatura de URLs de Inte rnet. 
jdbc:subprotocolo://servidor:p orto/subnome  
Por exemplo, supoñamos que dbnet é un protocolo para conectarse a un servidor en rede.  
jdbc:dbnet://miservidor:3560/mibase  
Exemplo dunha URL para conectarse á base de datos “sakila ” en MySQL. Sakila é unha 
base de datos de exemplo que se cre a ao instalar MySQL.  
"jdbc:mysql://localhost/sakila”;  

1.7 O interface  Connection  
Neste apartado imos comentar de forma breve algúns dos distintos métodos que ofrece o i nterface 
Connection  a modo de referencia rápida. A medida que vaiamos avanzando na unidade didáctica iremos 
retomando algúns deles para profundar máis na súa explicación.  

- Crear e executar sentenzas SQL ou procedementos almacenados  
- Statement createStatement()  
Crea unha sentenza SQL, representada mediante un obxecto Statement, para poder enviar 
sentenzas á base de datos .  
- PreparedStatement prepareStatement (String sql)  
Crea un obxecto PreparedStatement que vai permitir enviar e executar sentenzas SQL 
parametrizadas  á base de datos correspondente.  
- CallableStatement prepareCall (String sql)  
Crea un o bxecto CallableStatement que vai permitir chamar e executar procedementos almacenados ou 
funcións  da base de datos á que estamos conectados.  
- Transaccións  
- void setAutoCommit (boolean autoCommit)  
Establece o modo autocommit  da conexión para tratar as transac cións. Úsase para co ntrolar 
explicitamente as confirmacións das modificacións realizadas ou desfacer os ca mbios.  
- boolean getAutoCommit()  
Comproba si a conexión se atopa en estado de autocommit .
Unidade 3: Acesso a base de dados relacionais

Todas as modificações realizadas dentro de umha transacción e libera todos os bloques correspondentes.

- `void rollback()`: Desfai as modificacións realizadas nunha transacción e libera todos os bloqueos asociados.
- `int getTransactionIsolation()`: Devolve o grado de illamento que se estableceu para a conexión e que se utilizará á hora de realizar transaccións.
- `void setTransactionIsolation (int nivel)`: Establece o nivel de illamento dunha conexión á hora de executar e tratar transaccións.
- Pechar ou ver o estado da conexión
- `void close()`: Pecha unha conexión, l iberando todos os recursos asociados á mesma.
- `boolean isClosed()`: Devolve verdadeiro si a con exión está pechada.

Información da base de datos conectada (Metadatos)
- `DatabaseMetaData getMetaData()`: Devolve un obxecto DatabaseMetaData que contén información detallada sobre a base de datos á que nos atopamos conectados.

Ver ou establecer o modo de lectura ou escritura da conexión
- `void setReadOnly (boolean soloLectura)`: Establece si unha conexión posúe o modo de só lectura ou non, dependendo do argumento de tipo booleano.
- `boolean isReadOnly()`: Devolve true si a conexión é de só lectura.

1.7.1 Crear e executar instrucións SQL
Unha vez que se estableceu a conexión á base de datos, emprégase o obxecto  Connection para enviar sentenzas SQL ao xestor.

As sentenzas SQL pódense enviar ao xestor utilizando tres interfaces diferentes:

- `Statement`: creación e execución de sentenzas SQL de forma estática.
- `PreparedStatement`: creación e execución de sentenzas SQL de forma dinámica.
- `CallableStatement`: execución de procedementos almacenado s no xestor da base de datos.
Unidad 3: Acceso a bases de datos relacionales

Una vez que se establece una conexión a una base de datos determinada, esta conexión se puede utilizar para enviar sentencias SQL a la base de datos.

Un objeto Statement se crea con el método createStatement() de la clase Connection, como se puede observar en el fragmento de código siguiente:

```java
Connection conexion=DriverManager.getConnection(url,"pepa","abc123.");
Statement sentenza=conexion.createStatement();
```

La ejecución de objetos Statement

El interfaz Statement ofrece los métodos executeQuery() y executeUpdate() para ejecutar sentencias SQL.

*   Sentencias SELECT
    *   Se utiliza el método: executeQuery(String sql);
    *   Devuelve una instancia de java.sql.ResultSet
*   Sentencias INSERT, UPDATE y DELETE
    *   Se utiliza el método: executeUpdate(String sql);
    *   Devuelve un enteiro que indica el número de filas que fueron afectadas.
*   Sentencias CREATE TABLE y DROP TABLE
    *   Se utiliza el método: executeUpdate(String sql);
    *   Devuelve un enteiro que siempre vale 0, ya que no operan con filas.

Ejemplo de ejecutar una sentencia SELECT

```java
ResultSet rs=sentenza.executeQuery("SELECT nome, apelido1, apelido2 FROM empleado");
```

Ejemplo de ejecutar una sentencia INSERT

```java
int filas=sentenza.executeUpdate("INSERT INTO departamento VALUES(1,'Contabilidad','2001-2-2',11111111)");
```

Ejemplo de ejecutar una sentencia UPDATE

```java
int filas=sentenza.executeUpdate("UPDATE SET comision=comision*(1.20) FROM empregado WHERE codigo = 15");
```

Ejemplo de ejecutar una sentencia DELETE

```java
int filas=sentenza.executeUpdate("DELETE FROM alumno WHERE id = 15");
```

Ejemplo de ejecutar una sentencia CREATE TABLE

```java
int filas=sentenza.executeUpdate("CREATE TABLE categoria(id int primary key, descricion varchar(15) not null)");
```

Pechar las conexiones y liberar los recursos

Es recomendable que se pechen los objetos Connection y Statement creados cuando ya no se necesitan. Cuando se están utilizando recursos externos, como es el caso del acceso a una base de datos mediante la API JDBC, el recolector de lixo de Java (garbage collector) no tiene forma de conocer el estado de estos recursos, y por tanto, no es capaz de liberarlos en el caso de que se necesiten.
Unidad 3: Acceso a bases de datos relacionales

Recursos relacionados con la aplicación de bases de datos que se está ejecutando, para liberar estos recursos se recomienda pechar de manera explícita los objetos Connection e Statement.

Las interfaces Connection e Statement tienen un método close() que permite pecharlos de manera explícita y así liberar los recursos que están en uso, tanto en la aplicación Java como en el servidor de bases de datos.

Si se creó un objeto ResultSet, este también se debería pechar utilizando para ello o su método close(), igual que para el objeto Connection o Statement. Aunque el objeto ResultSet se pecha automáticamente al pechar el objeto Statement que lo creó, es mejor acostumarse a pecharlo.

Las sentencias se pechan mediante el método:

```java
public void close() throws java.sql.SQLException;
```

Xestión de erros

Cada vez que realicemos alguna acción en la base de datos, como abrir la conexión, pecharla, ejecutar una sentencia SQL, etc., pódese lanzar la excepción SQLException si acontece algún error, lo que debemos gestionar.

La clase java.sql.SQLException herda de la clase java.lang.Exception y particulariza el tratamiento de las excepciones producidas en el acceso a las bases de datos relacionales.

La clase SQLException posee algunas particularidades que a diferencia de las excepciones del resto se diferencian:

*   La excepción SQLException puede tener encadenados varios objetos SQLException, es decir, si se producen cuatro excepciones en un acceso a una base de datos, el objeto SQLException que se instancia tendrá en una lista con las cuatro excepciones.
*   Posee métodos que no tiene la clase java.lang.Exception. Los principales métodos de la clase SQLException son los siguientes:

    *   getErrorCode(): devuelve el código de error. Este código será específico de cada fabricante de SGBD.
    *   getSQLState(): devuelve el estado SQL que se corresponde con el estándar X/OPEN SQL.
    *   getNextException(): obtenemos la siguiente excepción producida, es decir, desplazamos a la siguiente SQLException dentro de la lista de excepciones producidas.
    *   getMessage(): devuelve un objeto String que describe la excepción que se produjo. Este método hereda de la clase Exception.

El siguiente ejemplo muestra información de las excepciones que pueden producirse.

```java
public static void mostraSQLException(SQLException ex){
    System.out.println("Se han dado excepciones SQLException \n");
    //Poden existir varias SQLException encadenadas
    while(ex!=null){
        System.out.println("Mensaxe :"+ex.getMessage() +"\n");
        System.out.println("estado SQL :"+ ex.getSQLState() +"\n");
        System.out.println("Código do erro :"+ ex.getErrorCode() +"\n");
        ex=ex.getNextException();
        System.out.println(" \n");
    }
}
```
# Unidad 3: Acesso a base de dados relacionais

## Acessar a base de dados MySQL

Para acessar a base de dados MySQL, chamada "empresa", podemos utilizar o seguinte código em Java:

```java
import java.sql.*;

public class ExemploAccesoBD {
    public static void main(String[] args) {
        Connection conexion = null;
        try {
            // Cargar o conectador
            Class.forName("com.mysql.jdbc.Driver");

            // Obtense unha conexión coa base de datos.
            // Neste caso, conectamos á base de datos empresa
            conexion = DriverManager.getConnection(
                    "jdbc:mysql://localhost/empresa", "root", "abc123.");

            // Créase un obxecto Statement, para realizar a consulta
            Statement sentenza = conexion.createStatement();

            // Realízase a inserción do novo departamento
            int filas = sentenza.executeUpdate("INSERT INTO departamento VALUES(8, 'Contabilidade', '2001-02-02', 11111111)");

            sentenza.close(); // péchase o Statement
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally {
            // Péchase a conexión coa base de datos.
            if (conexion != null) {
                conexion.close();
            }
        }
    }
}
```

## Execução de sentenzas de consulta e modificación de dados e procedementos

Una vez establecida a conexión coa base de datos, podemos enviar sentenzas SQL para realizar operacións contra ela. Existem tres tipos de obxectos que representan unha sentenza SQL:

*   Statement: é utilizada para crear un obxecto que executa unha sentenza SQL simple e sen parámetros.
*   PreparedStatement: é utilizada para crear un obxecto que executa sentenzas SQL precompiladas, normalmente, com parámetros de entrada.
*   CallableStatement: é utilizada para crear un obxecto que executa unha chamada a un procedemento almacenado ou a unha función.

Cada unha dessas interfaces está especializada para enviar un tipo específico de sentenza SQL:

*   Statement é utilizada para crear un obxecto que executa unha sentenza SQL simple e sen parámetros.
*   PreparedStatement é utilizada para crear un obxecto que executa sentenzas SQL precompiladas, normalmente, com parámetros de entrada.
*   CallableStatement é utilizada para crear un obxecto que executa unha chamada a un procedemento almacenado ou a unha función.
Unidad 3: Acceso a bases de datos relacionales

Herdanza de interfaces Statement, PreparedStatement y CallableStatement

2.1 Execução de sentenças SQL simples: A interface Statement

Creando un objeto Statement

Antes de poder ejecutar una sentencia SQL, es necesario obtener un objeto de tipo Statement. Una vez creado el objeto, puede ser utilizado para ejecutar cualquier operación contra la base de datos.

Sintaxis:
```java
Statement statement = connection.createStatement();
```

Métodos de la interface Statement

- `void addBatch(String sql)` throws SQLException
  - Agrega la sentencia SQL a un lote de sentencias.

- `void cancel()` throws SQLException
  - Cancela el objeto Statement, abortando la sentencia SQL correspondiente.

- `void clearBatch()` throws SQLError
  - Elimina todas las sentencias del lote.

- `void clearWarnings()` throws SQLException
  - Elimina todos los avisos ofrecidos por el objeto Statement.

- `void close()` throws SQLException
  - Cierra el objeto Statement.

- `ResultSet executeQuery(String sql)` throws SQLException
  - Ejecuta la sentencia SQL y devuelve un resultado como un conjunto de filas.

- `int executeUpdate(String sql)` throws SQLException
  - Ejecuta la sentencia SQL y devuelve el número de filas afectadas.

- `ResultSet getResultSet()` throws SQLException
  - Devuelve el resultado de la última ejecución de la sentencia SQL.

- `int getUpdateCount()` throws SQLException
  - Devuelve el número de filas afectadas por la última ejecución de la sentencia SQL.

- `void setAutoCommit(boolean autoCommit)` throws SQLException
  - Establece si la transacción debe ser automatizada o no.

- `void setMaxRows(int maxRows)` throws SQLError
  - Establece el número máximo de filas que se pueden devolver en un resultado.

- `void setMaxUpdateRows(int maxUpdateRows)` throws SQLError
  - Establece el número máximo de filas que se pueden actualizar en una transacción.

- `void setQueryTimeout(int queryTimeout)` throws SQLError
  - Establece el tiempo máximo que se puede esperar para que se ejecute una sentencia SQL.

- `void setRowFactory(ResultSetRowFactory rowFactory)` throws SQLError
  - Establece un fábrica de filas para crear filas de resultado.

- `void setRowLimit(int rowLimit)` throws SQLError
  - Establece el número máximo de filas que se pueden devolver en un resultado.

- `void setRowFactory(ResultSetRowFactory rowFactory)` throws SQLError
  - Establece un fábrica de filas para crear filas de resultado.

- `void setRowLimit(int rowLimit)` throws SQLError
  - Establece el número máximo de filas que se pueden devolver en un resultado.

- `void setRowFactory(ResultSetRowFactory rowFactory)` throws SQLError
  - Establece un fábrica de filas para crear filas de resultado.

- `void setRowLimit(int rowLimit)` throws SQLError
  - Establece el número máximo de filas que se pueden devolver en un resultado.

- `void setRowFactory(ResultSetRowFactory rowFactory)` throws SQLError
  - Establece un fábrica de filas para crear filas de resultado.

- `void setRowLimit(int rowLimit)` throws SQLError
  - Establece el número máximo de filas que se pueden devolver en un resultado.

- `void setRowFactory(ResultSetRowFactory rowFactory)` throws SQLError
  - Establece un fábrica de filas para crear filas de resultado.

- `void setRowLimit(int rowLimit)`
Unidad 3: Acceso a bases de datos relacionales

- **boolean execute(String sql) throws SQLException**
  - Executa la sentencia SQL.

- **int[] executeBatch() throws SQLException**
  - Envía un conjunto de sentencias SQL a base de datos para que se ejecuten como un lote.
  - Devuelve un array con el número de filas afectadas de cada sentencia SQL.

- **ResultSet executeQuery(String sql) throws SQLException**
  - Executa una sentencia SQL que devuelve un conjunto de resultados, representado por el objeto ResultSet.

- **int executeUpdate(String sql) throws SQLException**
  - Executa la sentencia SQL.
  - La sentencia SQL debe ser una sentencia DML como INSERT, UPDATE y DELETE o una sentencia DDL como CREATE TABLE, DROP TABLE y ALTER TABLE.

- **Connection getConnection() throws SQLException**
  - Devuelve el objeto Connection del que se creó el objeto Statement.

- **int getFetchDirection() throws SQLException**
  - Devuelve la dirección que se utiliza para ir recuperando registros.
  - Devuelve una constante definida en la interfaz ResultSet, que puede ser FETCH_FORWARD (cara a adelante), FETCH_REVERSE (cara a atrás) o FETCH_UNKNOWN (dirección desconocida).

- **int getFetchSize() throws SQLException**
  - Devuelve el número de registros que se recuperan de la base de datos cada vez que se necesitan más registros.

- **int getMaxFieldSize() throws SQLException**
  - Devuelve el número máximo de bytes que se permite para un campo.

- **int getMaxRows() throws SQLException**
  - Devuelve el número máximo de registros que un objeto ResultSet puede contener como resultado de la ejecución de un objeto Statement.

- **boolean getMoreResults() throws SQLException**
  - Despliega el siguiente resultado obtenido a partir de la ejecución de un objeto Statement.

- **int getQueryTimeout() throws SQLException**
  - Devuelve el número de segundos que el conectador va a esperar para que se ejecute un objeto Statement.

- **ResultSet getResultSet() throws SQLException**
  - Devuelve el resultado actual, en forma de un objeto ResultSet.

- **int getResultSetConcurrency() throws SQLException**
  - Devuelve el tipo de concurrencia aplicada a los objetos ResultSet, que se obtienen a partir del objeto Statement actual.
  - El valor devuelto corresponde a una serie de constantes definidas en la interfaz ResultSet.

- **int getResultSetType() throws SQLException**
  - Devuelve el tipo de ResultSet que se va a utilizar para un objeto Statement.

- **int getUpdateCount() throws SQLException**
  - Devuelve el resultado actual como un número de actualizaciones realizadas (finales afectadas). Si el resultado es un ResultSet o no hay más resultados, devuelve 1.
Unidad 3: Acceso a bases de datos relacionales

- El primer aviso (objeto SQLWarning) creado por las llamadas al objeto Statement es:
```
void setCursorName() throws SQLException
```
- Define un cursor SQL que va ser utilizado en las distintas llamadas al método execute() del objeto Statement.
```
void setFetchDirection(int dirección) throws SQLException
```
- Indica al conectador JDBC en qué dirección debe devolver los registros que se van necesitando.
```
void setFetchSize(int registros) throws SQLException
```
- Indica al conectador JDBC el número de registros que se deben obtener de la base de datos, cada vez que se van necesitando.

```
void setMaxFieldSize(int máximo) throws SQLException
```
- Establece el máximo número de bytes que puede tener un campo.

```
void setMaxRows(int máximo) throws SQLException
```
- Establece el número máximo de registros que puede contener un objeto ResultSet.

```
void setQueryTimeout(int segundo) throws SQLException
```
- Establece el número de segundos que el conectador JDBC esperará para que se ejecute un objeto Statement.

**Execución de sentencias mediante objetos Statement**

A finalidad de un objeto Statement es ejecutar una instrucción SQL. Al ejecutar la sentencia SQL puede o no devolver resultados.

La interfaz Statement dispone de los siguientes métodos:

```
executeQuery(String sql)
```
- Para ejecutar sentencias SELECT que recuperen datos de un único objeto ResultSet.

```
executeUpdate(String sql)
```
- Para realizar actualizaciones que no devuelvan un ResultSet.

  - Sentenzas DML como INSERT, UPDATE y DELETE.
  - Sentenzas DDL como CREATE TABLE, DROP TABLE y ALTER TABLE.

  - El valor que devuelve executeUpdate() es un entero.
  - Indica el número de filas que se vinieron afectadas.

  - Las sentenzas que no operan en filas, como CREATE TABLE o DROP TABLE, devuelven el valor cero.

**Execución de sentenzas de manipulación de datos**

Las sentenzas de manipulación de datos (DML) son las utilizadas para agregar, actualizar o eliminar datos de una base de datos.

Las sentenzas son las siguientes:

```
INSERT : Engade novas filas de datos á base de datos.
```

```
DELETE : Suprime filas de datos da base de datos.
```

```
UPDATE:  Modifica datos.
```

```
- Sentenzas SELECT : Recuperan datos de la base de datos.
```

```
- Sentenzas DDL : Crean, eliminan o modifican la estructura de la base de datos.
```
Unidad 3: Acceso a bases de datos relacionales

### Inserción

- **Sintaxe da sentença INSERT**: `INSERT INTO <nome táboa> [(<lista de columnas>)] VALUES (<lista de valores>)`
- **Inserción de varias filas**: `INSERT INTO <nome táboa> [(<lista de columnas>)] <sentença SELECT>`

Exemplo:
```java
String SQL = "INSERT INTO alumnos (alu_id, alu_nome, alu_apelido) VALUES (101, 'Manuel', 'Santos')";
Statement stmtInsercion = conexion.createStatement();
stmtInsercion.execute(SQL);
```

### Actualización

- **Sintaxe da sentença UPDATE**: `UPDATE <nome táboa> SET { <columna> = <expresión> [, ...] | {(<lista de columnas>) | *} = (<lista de expresións>) } [WHERE <condición>]`

Exemplo:
```java
String SQL = "UPDATE alumnos SET alu_apelido = 'Sergio' WHERE alu_id = 18";
Statement stmtActualizacion = conexion.createStatement();
int filas = stmtActualizacion.execute(SQL);
```

### Eliminación

- **Sintaxe da sentença DELETE**: `DELETE FROM <nome táboa> [WHERE <condición>]`

Exemplo:
```java
String SQL = "DELETE FROM alumnos WHERE alu_id = 101";
Statement stmtEliminacion = conexion.createStatement();
int filas = stmtEliminacion.execute(SQL);
```

### Consultas

- **Sintaxe da sentença SELECT**: `SELECT [ALL | DISTINCT] <lista de seleccións> FROM <nome táboa> [alias de táboa] [,...] [WHERE <condição>] [GROUP BY <lista de columnas>]`

Exemplo:
```java
String SQL = "SELECT * FROM alumnos WHERE alu_id = 18";
Statement stmtConsulta = conexion.createStatement();
ResultSet resultado = stmtConsulta.executeQuery(SQL);
```

- **Pecha o resultado da consulta**: `ResultSet resultado = stmtConsulta.executeQuery(SQL);`
Unidad 3: Acceso a bases de datos relacionales

- **Consulta SQL**
```java
String SQL = "SELECT * FROM alumnos";
Statement stmtConsulta = conexion.createStatement();
ResultSet rs = stmtConsulta.executeQuery(SQL);
```

- **Percurso de un ResultSet**
```java
while (rs.next()) {
    System.out.println("ID:" + rs.getInt("alu_id") + " " + "Nome:" + rs.getString("alu_nome") + " " + "Apelido:" + rs.getString("alu_apelido"));
}
```

- **Métodos de ResultSet**
```java
public boolean next() throws SQLException;
public int getInt(int columna) throws SQLException;
public String getString(int columna) throws SQLException;
```

- **Exemplo de uso**
```java
ResultSet rs = sentencia.executeQuery("SELECT nome, apellido1, apellido2 FROM empregado");
while (rs.next()) {
    System.out.println(rs.getString(1));
    System.out.println(rs.getString(2));
    System.out.println(rs.getString(3));
}
```

- **Cierre del Statement**
```java
stmtConsulta.close();
```
Unidad 3: Acceso a bases de datos relacionales

Cuando se lanza un método `getXXX()` determinado sobre un objeto `ResultSet`, para obtener el valor de un campo, o conectador JDBC convierte el dato que se quiere recuperar al tipo Java especificado y devuelve un valor Java adecuado.

Por ejemplo, si utilizamos el método `getString()` y el tipo del dato en la base de datos es `VARCHAR`, el conectador JDBC convierte el dato `VARCHAR` a un objeto `String` de Java, por lo tanto, el valor de retorno de `getString()` será un objeto de la clase `String`.

Esta conversión de tipos se puede realizar gracias a la clase `java.sql.Types`. En esta clase se definen los tipos de datos JDBC, que se corresponden con los tipos de datos SQL estándar.

Tenemos dos alternativas para acceder a las columnas del `ResultSet`:

*   Polo nombre del campo: `rs.getString("nome");`
*   Pola posición de la columna dentro del `ResultSet`: `rs.getString(1);`

Si en estos métodos se utiliza el índice de la columna, debe considerarse que los índices empiezan a partir de 1, y no en 0 (cero), como en los vectores y en algunas otras estructuras de datos de Java.

El mapeo o conversión que se realiza entre tipos JDBC y clases Java, se puede observar en la tabla que aparece a continuación:

Para determinar si un valor devuelto fue nulo, es decir, un JDBC NULL, primero debe leer la columna y luego lanzar el método `wasNull()` del interfaz `ResultSet`, que devolverá `true` o `false` según la situación. El método `wasNull()` devolverá `true` en los siguientes casos:

-   El valor de la columna es `NULL`.
-   El valor de la columna es un valor vacío (`""`).
-   El valor de la columna es `0` (cero) para números enteros.
-   El valor de la columna es `0.0` para números decimales.
-   El valor de la columna es `NULL` para caracteres.
# Unidad 3: Acceso a base de datos relacionales

## Métodos de acceso a base de datos

- Obtener valores de base de datos mediante métodos como: `getString()`, `getBigDecimal()`, `getBytes()`, `getDate()`, `getTime()`, `getTimestamp()`, `getAsciiStream()`, `getUnicodeStream()`, `getBinaryStream()`, `getObject()`.
- Obtenir cero devuelto por métodos como: `getByte()`, `getShort()`, `getInt()`, `getLong()`, `getFloat()`, `getDouble()`.
- Obtenir false por el método `getBoolean()`.
- Pechar objetos: Los objetos `Statement` se pechan automáticamente por el colector de lixo (garbage collector) de Java. Sin embargo, es recomendable pecharlos explicitamente una vez que ya no se necesitan más, ya que esto libera inmediatamente los recursos del SXBD y ayuda a evitar problemas potenciales de memoria.

## Pechar sentencias

Para pechar una sentencia, se debe utilizar el método `close()` del interfaz `Statement`.

## Ejecución de sentencias precompiladas

La interfaz `PreparedStatement` permite ejecutar sentencias SQL sobre una conexión establecida con una base de datos. Estas sentencias SQL se denominan sentencias SQL precompiladas y pueden contener parámetros de entrada.

### Heredad de la interfaz `PreparedStatement`

La interfaz `PreparedStatement` hereda del interfaz `Statement` y se diferencia de ella en dos aspectos:

- Las instancias de `PreparedStatement` contienen sentencias SQL que ya han sido compiladas. Esto hace que la sentencia sea "preparada".
- La sentencia SQL que contiene un objeto `PreparedStatement` puede contener un o más parámetros de entrada.
- Un parámetro de entrada es aquel que su valor no se especifica cuando la sentencia se crea, en su lugar la sentencia tiene un signo de interrogación (?) por cada parámetro de entrada.

Antes de ejecutarse la sentencia, se deben especificar valores para cada uno de los parámetros, a través de los métodos `setXXX` apropiados. Estos métodos `setXXX` agregan a la interfaz `PreparedStatement`.

```java
// Ejemplo de uso de PreparedStatement
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM tabla WHERE columna = ?");
pstmt.setString(1, "valor");
ResultSet rs = pstmt.executeQuery();
```
- Asigna o valor x de tipo boolean ao parámetro. O conectador convérteo a un tipo SQL BIT ou BOOLEAN cando se envía á base de datos.
- Asigna o valor x de tipo byte ao parámetro. O conectador convérteo a un tipo SQL TINYINT cando se envía á base de datos.
- Asigna o valor x de tipo short ao parámetro. O conectador convérteo a un tipo SQL SMALLINT cando se envía á base de datos.
- Asigna o valor x de tipo int ao parámetro. O conectador convérteo a un tipo SQL INTEGER cando se envía á base de datos.
- Asigna o valor x de tipo long ao parámetro. O conectador convérteo a un tipo SQL BIGINT cando se envía á base de datos.
- Asigna o valor x de tipo float ao parámetro. O conectador convérteo a un tipo SQL REAL cando se envía á base de datos.
- Asigna o valor x de tipo double ao parámetro. O conectador convérteo a un tipo SQL DOUBLE cando se envía á base de datos.
- Asigna o valor x de tipo java.math.BigDecimal ao parámetro. O conectador convérteo a un tipo SQL NUMERIC cando se envía á base de datos.
- Asigna o valor x de tipo String ao parámetro. O conectador convérteo a un tipo SQL VARCHAR o LONGVARCHAR (dependiendo del tamaño del argumento según los límites de los valores VARCHAR del conectador) cando se envía á base de datos.
- Asigna el array de bytes ao parámetro. O conectador convérteo a un tipo SQL VARBINARY o LONGVARCHAR (dependiendo del tamaño del argumento según los límites de los valores VARCHAR del conectador) cando se envía á base de datos.
- Asigna el valor x de tipo java.sql.Date ao parámetro usando la zona horaria por defecto de la máquina donde se executa la aplicación. O conectador convérteo a un tipo SQL DATE cando se envía á base de datos.
- Asigna el valor x de tipo java.sql.Time ao parámetro. O conectador convérteo a un tipo SQL TIME cando se envía á base de datos.
- Asigna el valor x de tipo java.sql.Timestamp ao parámetro. O conectador convérteo a un tipo SQL TIMESTAMP cando se envía á base de datos.
Unidad 3: Acceso a bases de datos relacionales

SQL TIMESTAMP cuando se envía a base de datos.

Envío de parámetros grandes.

Os métodos `setBytes` e `setString` son capaces de enviar cantidades grandes de datos.

A veces os programadores prefieren pasar os grandes bloques de datos, en pequeños aços.

Isto pode realizarse, asignando ao parámetro un fluxo de datos de entrada Java.

Cando se executa a sentença, o conectador JDBC realizará repetidas chamadas a este fluxo de entrada,

lendo os seus contidos e transmitindo-os á base de datos.

JDBC ten os seguintes métodos para asignar fluxos de entrada aos parámetros.

Algunhas bases de datos necesitan coñecer o tamaño total dos datos a transferir antes de envialos,

e ntón, débese especificar a lonxitude do fluxo de datos.

*   `void setAsciiStream (int posición, InputStream x, int lonxitude) throws SQLExcepti on`
*   `void setAsciiStream (int posición, InputStream  x, long lonxitude) thr ows SQLExce ption`
*   `void setAsciiStream (int  posición, InputStream  x) throws SQLExce ption`
*   `void setBinaryStream (int posición, InputStream x, int lonxitude) throws SQLExce ption`
*   `void setBinaryStream (int posición, InputStream x, long lonxitude) throws SQLExce ption`
*   `void setBinaryStream  (int posición, InputStream x, int lonxitude) throws SQLExce ption`
*   `void setCharacterStream (int posición, Reader x, int lonxitude) throws SQLExce ption`
*   `void setCharacterStream (int posición, Reader x, long lonxitude) throws SQLExce ption`
*   `void setCharacterStream (int posición, Reader x) throws SQLExce ption`

Úsase para fluxos de entrada que conteñen carácteres ASCII.

O conectador JDBC fará calquera conversión necesaria de ASCII ao formato de carácteres de base de datos.

O conectador convérteo a un tipo SQL LONGVARCHAR.

 Envío de parámetros grandes utilizando os métodos SetXXX que dan soporte ao tipos de datos SQL 3.

Estes métodos poden lanzar a excepción SQLFeatureNotSupportedException, si o controlador JDBC non soporta os tipos de datos SQL3.

*   `void setBytes (int posición, byte[] datos)`
*   `void setBytes (int posición, byte[] datos, int lonxitude)`
*   `void setBytes (int posición, byte[] datos)`
*   `void setCharacterStream (int posición, Reader datos)`
*   `void setCharacterStream (int posición, Reader datos, int lonxitude)`
*   `void setCharacterStream (int posición, Reader datos)`
*   `void setLongBinaryStream (int posición, long datos)`
*   `void setLongBinaryStream (int posición, long datos, int lonxitude)`
*   `void setLongBinaryStream (int posición, long datos)`
*   `void setLongCharacterStream (int posición, long datos)`
*   `void setLongCharacterStream (int posición, long datos, int lonxitude)`
*   `void setLongCharacterStream (int posición, long datos)`
*   `void setShortBinaryStream (int posición, short datos)`
*   `void setShortBinaryStream (int posición, short datos, int lonxitude)`
*   `void setShortBinaryStream (int posición, short datos)`
*   `void setShortCharacterStream (int posición, short datos)`
*   `void setShortCharacterStream (int posición, short datos, int lonxitude)`
*
- void setBlob(int posición, Blob x) throws SQLException
  Asigna o valor x de tipo java.sql.Blob ao parámetro. O conectador convérteo a un tipo SQL BLOB cando se envía á base de datos.

- void setBlob(int posición, InputStream x, long lonxitude) throws SQLException
  Asigna o valor x, o cal é un fluxo de bytes de entrada, ao parámetro. O conectador convérteo a un tipo SQL BLOB cando se envía á base de datos. Este método difire do setBinaryStream, xa que neste caso, o conectador ten que facer traballo extra para determinar  si os datos dos parámetros deben ser enviados como un LONGVARBINARY ou un BLOB.

- void setClob(int lonxitude, Clob x) throws SQLException
  Asigna o valor x de tipo java.sql.Clob ao parámetro. O conectador convérteo a un tipo SQL CLOB cando se envía á base de datos.

- void setClob(int posición, Reader x, long lonxitude) throws SQLException
  Asigna o valor x, o cal é un fluxo de carácteres de entrada, ao parámetro. O conectador convérteo a un t ipo SQL CL OB cando se envía á base de datos. Este método difire do setCharacterStream, xa que neste caso, o conectador ten que fazer traballo extra para determinar si os datos dos parámetros deben ser enviados como un LONGVARBINARY ou un CLOB.

2.3 Executar procedementos almacenados e funcións:

Interface CallableStatement

Outro tipo de sentenzas que podemos utilizar en JDBC son as sentenzas CallableStatement. Esta interface ofrece a posibilidade de manexar parámetros de saída e de realizar chamadas a procedementos almacenados e funcións da base de datos, dunha forma estándar para todos os SXBD.

Un procedemento almacenado atópase dentro dunha base de datos; a chamada a un proc edemento realízase mediante un obxecto CallableStatement. Antes de crear un obxecto CallableStatement, o programador deberá saber si o SXBD soporta procedementos almacenados.

A interface CallableStatement herda os métodos da interface Statement, que se enca rga de sentenzas SQL xerais, e tamén os métodos da interface PreparedStatement, que se encarga de manexar parámetros de entrada.
Unidad 3: Acceso a bases de datos relacionales

Heredad de la interfaz CallableStatement
Crear objetos CallableStatement
Sintaxis para realizar llamadas a un procedimiento almacenado
- Si tienen parámetros de entrada:
{call nombre_procedimiento[(?,?,...)]}
- Si devuelven un parámetro de resultado (sería una llamada a una función):
{?=call nombre_procedimiento [(?.?...)]}
- Sintaxis de una llamada a un procedimiento sin ningún tipo de parámetros:
{call nombre_procedimiento}

Objetos CallableStatement se crean con el método prepareCall de la interfaz Connection.

Ejemplo: crea una instancia de CallableStatement que contiene una llamada al procedimiento almacenado proc1, con dos argumentos y no devuelve resultados.
CallableStatement sentencia = conexion.prepareCall("{call proc1(?, ?)}");

Utilizar los parámetros de entrada, saída y de entrada/saída

Una sentencia CallableStatement puede tener parámetros de entrada, de saída y de entrada/saída.

- Para pasarle parámetros de entrada a un objeto CallableStatement, se utilizan los métodos setXXX que heredan del interfaz PreparedStatement.
- Si el procedimiento almacenado devuelve parámetros de saída, el tipo JDBC de cada parámetro de saída debe ser registrado antes de ejecutar el objeto CallableStatement correspondiente.

Para registrar los tipos JDBC de los parámetros de saída, se debe lanzar el método CallableStatement.registerOutParameter.

- posición: el primer parámetro es 1, el segundo es 2, y así sucesivamente.
- tipoSQL: es el tipo definido por java.sql.Types.

Logo de registrar los parámetros, se pueden recuperar los valores de estos parámetros llamando al método getXXX correspondiente. Estos métodos son heredados de la interfaz Statement, vistos anteriormente.

- registerOutParameter(int posición, int tipoSQL)
- getXXX(int posición)
# Unidad 3: Acceso a bases de datos relacionales

## CallableStatement

El CallableStatement soporta cualquier llamada a procedimientos almacenados (procedimientos invocados en el objeto CallableStatement que puede ser cualquier clase de sentencia SQL).

### execute()

El método más flexible es `execute()`, ya que no necesita saber de antemán si el procedimiento almacenado devuelve un conjunto de resultados o no.

*   `boolean execute() throws SQLException`: Executa el procedimiento invocado en el objeto CallableStatement que puede ser cualquier clase de sentencia SQL.
*   Devuelve un booleano para indicar la forma del resultado. `true` si devuelve un objeto ResultSet, o `false` si devuelve un contador de filas afectadas en una sentencia de actualización.
*   Después podemos invocar a los métodos `getResultSet()` o `getUpdateCount()` para mostrar los resultados.

### executeQuery()

*   `ResultSet executeQuery() throws SQLException`: Ejecuta el procedimiento invocado en el objeto CallableStatement cuando se ejecuta una sentencia SELECT dentro del procedimiento.
*   Devuelve un ResultSet.

### executeUpdate()

*   `int executeUpdate() throws SQLException`: Ejecuta el procedimiento invocado en el objeto CallableStatement cuando se ejecuta una sentencia INSERT, DELETE, UPDATE o una sentencia que no devuelve ningún resultado, como una sentencia DDL (CREATE).
*   Devuelve un entero: el número de columnas afectadas en la sentencia de actualización o 0 si no devuelve nada.

### Ejemplo

```java
Connection conexion = DriverManager.getConnection(url);
CallableStatement sentencia = conexion.prepareCall("{call Procedemento1(?,?)}");
sentencia.setInt(1, 7); // parámetro de entrada, le damos el valor 7
sentencia.registerOutParameter(2, java.sql.Types.DECIMAL); // el parámetro dos es de salida (OUT)
sentencia.execute(); // llamar al procedimiento
System.out.println("resultado" + sentencia.getBigDecimal(2));
```

## Xestión do ResultSet

En JDBC 1.0, el ResultSet sólo se puede percorrer de arriba abajo y además, son de solo lectura.

JDBC 2.0 permite que el ResultSet se pueda percorrer en ambos sentidos, es decir, permite situarse en un registro concreto y introduce posibilidades de actualización (concorrencia).

Los objetos ResultSet pueden tener distintas funcionalidades y características. Estas características son tipo, concorrencia y permanencia (holdability).

### Tipos de ResultSet

Un ResultSet puede ser de tres tipos que se configuran con las siguientes constantes:

*   `static int TYPE_FORWARD_ONLY`: El objeto cursor sólo se puede mover hacia adelante. Opción por defecto.
*   `static int TYPE_SCROLL_INSENSITIVE`: El objeto cursor se puede mover hacia adelante o hacia atrás, pero no se considera sensible a cambios en el conjunto de resultados.
*   `static int TYPE_SCROLL_SENSITIVE`: El objeto cursor se puede mover hacia adelante o hacia atrás y se considera sensible a cambios en el conjunto de resultados.

```java
// Tipos de ResultSet
static int TYPE_FORWARD_ONLY = 1;
static int TYPE_SCROLL_INSENSITIVE = 2;
static int TYPE_SCROLL_SENSITIVE = 3;
```
Unidad 3: Acceso a bases de datos relacionales

**Tipos de Resultados de Consulta**

Un resultado de consulta pode ser de diferentes tipos, dependiendo de cómo se utiliza. A partir de uma mesma transação, ou por outras transaccións finalizadas com sucesso (COMMIT).

*   `static int TYPE_SCROLL_SENSITIVE` - O cursor pode ser movido em qualquer direção e é sensible aos cambios nos dados do ResultSet.
*   Verifica os tipos de ResultSet através do método `DatabaseMetaData.supportsResultSetType(TipoResultSet)`. No exemplo seguinte, verifica se o conectador JDBC de MySQL suporta cada tipo de ResultSet.

```java
    Connection conexion = DriverManager.getConnection(
            "jdbc:MySQL://localhost:8888/Empresa","user1", "abc123.");
    DatabaseMetaData md = conexion.getMetaData(); // obtén os metadatos
    // Verifica os tipos de ResultSet
    System.out.println("Soporta cursor TYPE_FORWARD_ONLY: " +
            md.supportsResultSetType(ResultSet.TYPE_FORWARD_ONLY));
    System.out.println("Soporta cursor TYPE_SCROLL_INSENSITIVE: " +
            md.supportsResultSetType(ResultSet.TYPE_SCROLL_INSENSITIVE));
    System.out.println("Soporta cursor TYPE_SCROLL_SENSITIVE: " +
            md.supportsResultSetType(ResultSet.TYPE_SCROLL_SENSITIVE));
```

**Concorrencia**

A concorrencia determina se o ResultSet pode ser actualizado. Os valores de concorrencia disponíveis são:

*   `static int CONCUR_READ_ONLY` - Indica que se modifica uma columna do obxecto ResultSet, não se verá reflectido na base de datos. É o valor por defecto.
*   `static int CONCUR_UPDATABLE` - Indica que se modifica uma columna do obxecto ResultSet, ver-se-á reflectido na base de datos.

Nota: Não todos os conectadores JDBC e SXBD suportam concorrencia. Para comprobar isso, pode-se utilizar o método `supportsResultSetConcurrency()` da interface `DatabaseMetaData`.

Este método retorna `true` se suporta o tipo de concorrencia especificado e `false` em caso contrario. Também pode-se verificar através do método `DatabaseMetaData.supportsResultSetType(TipoResultSet)`.

Exemplo:

```java
    Connection conexion = DriverManager.getConnection(
            "jdbc:MySQL://localhost:8888/Empresa","user1", "abc123.");
    DatabaseMetaData md = conexion.getMetaData(); // obtén os metadatos
    // Verifica a concorrencia do ResultSet
    System.out.println("Soporta o cursor CONCUR_READ_ONLY: " +
            md.supportsResultSetType(ResultSet.CONCUR_READ_ONLY));
    System.out.println("Soporta o cursor CONCUR_UPDATABLE: " +
            md.supportsResultSetType(ResultSet.CONCUR_UPDATABLE));
```

**Permanencia do cursor (holdability)**

Permite controlar o comportamento dos obxectos ResultSet quando se chama o método `Connection.commit()`. Este método pode pechar ou não os obxectos ResultSet que se criaram durante a transação actual. A propriedade holdability do ResultSet dá control à aplicação sobre se os obxectos ResultSet se pecham ou não, quando é realizado um commit.

As seguintes constantes ResultSet podem ser subministradas aos métodos `createStatement`, `prepareStatement` e `prepareCall`:

*   `ResultSet.HOLD_NO_LOCKS` - O cursor não é bloqueado durante a transação.
*   `ResultSet.HOLD_CURSORS_OVER_COMMIT` - O cursor é bloqueado durante a transação.
*   `ResultSet.HOLD_CURSORS_OVER_COMMIT_NO_LOCKS` - O cursor não é bloqueado durante a transação, mas é bloqueado durante a transação.
Unidad 3: Acceso a base de datos relacionais

*   **Scroll Sensitivity**: Não se pode fazer scroll, não se pode chamar a outros métodos que não sejam `next()`.
*   Métodos para trabalhar dinamicamente com `ResultSet`:
    *   `void updateXXX(String columna, XXX valor)`: Modifica a columna com valor de tipo XXX especificado, sem parâmetro valor.
    *   `void updateRow()`: Modifica a fila da base de dados com os contidos da fila atual do `ResultSet`.
    *   `void moveToInsertRow()`: Móvese à fila especial que se utiliza para inserir uma fila de dados nova na tabela. Se mover o cursor para uma fila diferente antes de chamar `insertRow()`, a base de dados não será atualizada.
    *   `void insertRow()`: Insere na base de dados os contidos da fila atual do `ResultSet`.
    *   `void moveToCurrentRow()`: Move o cursor à posição que estava antes de que o método `moveToInsertRow()` fosse chamado.
    *   `void cancelRowUpdates()`: Cancela os cambios feitos na fila.
    *   `void deleteRow()`: Borra a fila atual do `ResultSet` e da base de dados.

Exemplo:
```java
Statement stmt = conexion.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
...
ResultSet rst = stmt.executeQuery("select * from empregados");
...
// Actualiza unha fila
rst.absolute(2); // move o cursor á fila 2
rst.updateString("NOME",  "Luis"); // cambio nome do empregado da fila 2
rst.updateRow(); // actualiza a base de dados
rst.moveToInsertRow(); // move o cursor á fila de inserción
// Crea unha fila nova
rst.updateInt("CODIGO", 9); // damos valores ás columnas
rst.updateString("NOME", "Pepe");
rst.updateString("APELIDO1", "García");
rst.updateString("APELIDO2", "Campos");
rst.insertRow(); // inserimos a fila na base de dados
rst.moveToCurrentRow();
```

3. Acceso aos Metadatos

Ás vezes é necessário obter informações sobre o provedor, conjunto de filas, tabela, colunas ou outra informação de bases de dados. Os dados sobre a estrutura de base de dados denominam-se metadatos. O acesso aos metadatos evita que o programador tenha que conhecer a fondo a organização da base de dados. Esta informação não é de interesse para o usuário, mas sim que é necessária para o programador para manusear os dados.**Unidad 3: Acceso a bases de datos relacionales**

**ResultSetMetaData**

* Proporciona información de tipo y propiedades de cada columna de un objeto ResultSet.

**DatabaseMetaData**

* Proporciona información de una base de datos o un SXBD particular.

**Interface DatabaseMetaData**

Esta interface ofrece información sobre la base de datos con la que se estableció una conexión.

Para obtener esta información, esta interface aporta un gran número de métodos diferentes. Muchos de estos métodos devuelven objetos ResultSet conteniendo la información correspondiente, por tanto, debemos usar los métodos getXXX para recuperar la información.

Si un conectador no soporta un método de la interface DatabaseMetaData, lanzará una excepción SQLException, y en el caso de que el método devuelva un objeto ResultSet, obtendrá un ResultSet vacío o lanzará una excepción SQLException.

Para obtener un objeto DatabaseMetaData sobre el que lanzar los métodos que nos darán la información sobre el SXBD, debe lanzar el método getMetaData() sobre el objeto Connection que se corresponde con la conexión a la base de datos de la que queremos obtener la información, como se puede observar en el código siguiente:

```java
Connection conexion = DriverManager.getConnection(url);
DatabaseMetaData datosdb = conexion.getMetaData();
```

Todos los métodos de la interface DatabaseMetaData lanzan excepciones SQLException. Implementa más de 150 métodos diferentes que nos ofrecen una información detallada sobre la base de datos.

**Métodos que mostran información sobre el SXBD, usuario actual conectado, conectador, URL y base de datos**

* String getDatabaseProductName() throws SQLException
  - Recupera el nombre del SXBD.
* String getDatabaseProductVersion() throws SQLException
  - Recupera el número de versión del SXBD.
* int getDatabaseMajorVersion()
  - Recupera el número de versión principal del SXBD.
* int getDatabaseMinorVersion()
  - Recupera el número de versión secundario del SXBD.
* String getDriverName() throws SQLException
  - Recupera el nombre del controlador JDBC utilizado.
* int getDriverMajorVersion()
  - Recupera el número de la versión principal del conectador JDBC.
* int getDriverMinorVersion()
  - Recupera el número de la versión secundaria del conectador JDBC.
Unidad 3: Acceso a bases de datos relacionales

### Métodos de conexión

- `String getDriverVersion() throws SQLException`: Recupera o número de versión do conectador JDBC utilizado.
- `String getURL() throws SQLException`: Devolve a URL da base de dados ou NULL se não pode atopar.
- `String getUserName() throws SQLException`: Devolve o nome do usuario actual conectado à base de datos.
- `booleano IsReadOnly() throws SQLException`: Devolve true se a base de datos é de só lectura.

### Patróns e carácteres comodíns

Nalgúns métodos que obteñen información das táboas, columnas, claves primarias, claves foráneas, etc., nos seus parámetros pódese utilizar un patrón, na cadea onde se especifica o esquema e as táboas.

- O carácter '_' representa calquera carácter individual.
- O carácter '%' representa calquera secuencia de cero ou máis carácteres.

Por exemplo: si na cadea que especifica unha táboa, poñemos "person%", obteriamos todas as táboas que o nome empeza por "person".

### Métodos para obter información sobre as táboas, columnas, claves primarias, foráneas,  ...

- `ResultSet getTables(String catálogo, String esquemaPatron, String táboaPatron, String [] tipoTáboas) throws SQLException`.
  - Recupera unha descrición das táboas dispoñibles no catálogo dado.
  - Os tipos de táboas son: "TABLE", "VIEW", "SYSTEM TABLE", "GLOBAL TEMPORARY", "LOCAL TEMPORARY", "ALIAS", "SYNONYM".
  - Ao poñer null, devolveranos todos os tipos de táboas.
  - No argumento catálogo ou esquema pódese poñer null. Neste caso referímonos ao actual.
  - As columnas do ResultSet devoltas de uso máis común son:
    - 1. `TABLE_CAT String => Catálogo da táboa (pode ser nulo).`
    - 2. `TABLE_SCHEM String => Esquema da táboa (pode ser nulo).`
    - 3. `TABLE_NAME String => Nome da táboa.`
    - 4. `TABLE_TYPE String => Tipo de táboa`
    - 5. `REMARKS String => Comentario sobre a táboa.`
  Exemplo:
```java
System.out.println(">>>Táboas existentes:");
String patron = "%";//listamos todas as táboas que comecen por C
String tipos[] = new String[2];
tipos[0] = "TABLE";//táboas de usuario
tipos[1] = "SYSTEM TABLE";//táboas do sistema
ResultSet taboas = me tadatos.getTables(null, null, patron, tipos);
while (taboas.next()) {
  //Por cada táboa obtemos o seu nome e tipo
  System.out.println(" Nome:" + taboas.getString("TABLE_NAME") + 
      " Tipo:" + taboas.getString("TABLE_TYPE") + " Esquema:" + 
      taboas.getString("TABLE_SCHEM") + 
      " Comentario:" + taboas.getString("REMARKS"));
}
```
Obtenemos a seguinte saída:

Táboas existentes:
 Nome: CUSTOMERS
 Tipo: TABLE
 Esquema: 
 Comentario: 
 Nome: EMPLOYEES
 Tipo: TABLE
 Esquema: 
 Comentario: 
 Nome: ORDERS
 Tipo: TABLE
 Esqu
Unidad 3: Acceso a bases de datos relacionales

- **getPrimaryKeys**
  - Recupera información de las columnas de clave principal de la tabla dada.
  - Los parámetros catálogo o esquema pueden tener el valor NULL, entonces el nombre del catálogo o del esquema no se utilizan para delimitar la búsqueda.
  - Las columnas devoltas del ResultSet son:
    - 1. `TABLE_CAT` String => Catálogo de la tabla (puede ser nulo).
    - 2. `TABLE_SCHEM` String => Esquema de la tabla (puede ser nulo).
    - 3. `TABLE_NAME` String => Nombre de la tabla.
    - 4. `COLUMN_NAME` String => Nombre de la columna.
    - 5. `KEY_SEQ` Short => Número de secuencia dentro de la clave principal (un valor de 1 representa la primera columna de la clave primaria, un valor de 2 representa la segunda columna en la clave principal y así sucesivamente).
    - 6. `PK_NAME` String => Nombre de la clave principal (puede ser nulo).

- **getColumns**
  - Recupera una descripción de las columnas de la tabla disponible en el catálogo.
  - Los parámetros catálogo o esquema pueden tener el valor NULL, entonces el nombre del catálogo o del esquema no se utilizan para delimitar la búsqueda.
  - Algunas columnas del ResultSet son:
    - 1. `TABLE_CAT` String => Catálogo de la tabla (puede ser nulo).
    - 2. `TABLE_SCHEM` String => Esquema de la tabla (puede ser nulo).
    - 3. `TABLE_NAME` String => Nombre de la tabla.
    - 4. `COLUMN_NAME` String => Nombre de la columna.
    - 5. `DATA_TYPE` int => Tipo de datos SQL (java.sql.Types).
    - 6. `TYPE_NAME` String => Nombre del tipo de datos.
    - 7. `COLUMN_SIZE` int => Tamaño de la columna.
    - 8. `DECIMAL_DIGITS` int => Número de dígitos decimales.
    - 9. `NULLABLE` int => Acepta valores NULL.
      - `columnNoNulls` - no puede permitir valores NULL.
      - `columnNullable` - permite valores NULL.
      - `columnNullableUnknown` - desconocida la nulabilidad.
    - 10. `REMARKS` String => Comentario que describe la columna (puede ser nulo).
    - 11. `COLUMN_DEF` String => Valor predeterminado de la columna (puede ser nulo).
    - 12. `IS_NULLABLE` String => Determinar si una columna acepta valores NULL utilizando las Normas ISO.
      - `YES` - Si la columna puede incluir valores NULL.
      - `NON` - Si la columna no puede conter valores NULL.
      - Cadena baleira - Si la aceptación de valores NULL para la columna se desconoce.
    - 13. `IS_AUTOINCREMENT` String => Indica si esta columna se incrementa de modo automático.
      - `YES` - Si la columna se incrementa de forma automática.
      - `NO` - Si la columna no es autoincrementada.
      - Cadena baleira - si no se puede determinar si la columna es autoincrementada.
- Si --- Si esta columna é xerada.
- NON --- Si non é unha columna xerada.
- Cadea baleira si non se pode determin ar si se trata dunha columna xer ada.

ResultSet getExportedKeys (String catálogo, String esquema, String táboa) throws SQLException.
Devolve unha lista de todas as claves foráneas que fan referencia á clave principal da táboa dada.

- PKTABLE_CAT String => Catálogo da táboa da clave principal que se refere ncia (pode ser nu lo).
- PKTABLE_SCHEM String => Esquema da táboa da clave principal que se ref erencia (pode ser nulo).
- PKTABLE_NAME String => Nome da táboa.
- PKCOLUMN_NAME String => Nome da columna da clave principal que se referencia.
- FKTABLE_CAT String => Catál ogo da táboa da clave externa (pode ser nulo).
- FKTABLE_SCHEM String => Esquema da táboa da clave externa (pode ser n ulo).
- FKTABLE_NAME String => Nome da táboa da clave externa.
- FKCOLUMN_NAME String => Nome da columna da clave externa.
- KEY_SEQ s hort => Número de secuencia dentro dunha clave externa (un valor de 1 representa a primeira columna da clave externa, un valor de 2 representaía a segunda columna na clave externa).
- UPDATE_RULE short => Acción que se leva a cabo na clave externa cando  se actualiza a clave primaria á que referencia.
  importedNoAction: non se permite a actualización da clave primaria.
  importedKeyCascade: cambio en cascada da clave externa.
  importedKeySetNull: cambia a clave externa a NULL.
  importedKeySetDefault: cambia a clave externa ao valor predeterminado.
  importedKeyRestrict:  igual que importedKeyNoAction (por compatibilidade ODBC 2.x).
- DELETE_RULE short => A acción que se leva a cabo na clave externa cando se elimina a clave primaria á que referencia.
  importedKey NoAction: non se permite borrar a clave primaria.
  importedKeyCascade:  borrado en cascada das filas da clave externa que ref erencia á clave primaria eliminada.
  importedKeySetNull: clave externa a NULL.
  importedKeyRestrict : igual que importedKeyNoAction (por compatibilidade ODBC 2.x).
  importedKeySetDefault:  Clave externa co valor por defecto.
- FK_NAME String => Nome da clave externa (pode ser nulo).
- PK_NAME String => Nome da clave principal (pode ser nulo).

ResultSet getImportedKeys (String catálogo , String esquema, String táboa) throws SQLException.
Devolve as claves externas na táboa dada.

- FKTABLE_CAT String => Catál ogo da táboa da clave externa (pode ser nulo).
- FKTABLE_SCHEM String => Esquema da táboa da clave externa (pode ser n ulo).
- FKTABLE_NAME String => Nome da táboa da clave externa.
- FKCOLUMN_NAME String => Nome da columna da clave externa.
- KEY_SEQ s hort => Número de secuencia dentro dunha clave externa (un valor de 1 representa a primeira columna da clave externa, un valor de 2 representaía a segunda columna na clave externa).
- UPDATE_RULE short => Acción que se leva a cabo na clave externa cando  se actualiza a clave primaria á que referencia.
  importedNoAction: non se permite a actualización da clave primaria.
  importedKeyCascade: cambio en cascada da clave externa.
  importedKeySetNull: cambia a clave externa a NULL.
  importedKey
- Referencia (pode ser nulo).
  - 2. PKTABLE_SCHEM String => Esquema da táboa que contén a clave principal á que se fai referencia (pode ser nulo).
  - 3. PKTABLE_NAME String => Nome da táboa que contén a clave principal á que se fai referencia.
  - 4. PKCOLUMN_NAME String => Nome da columna de clave principal que se referencia.
  - 5. FKTABLE_CAT String => Catálogo da táboa da clave externa (pode ser nulo).
  - 6. FK TABLE_SCHEM String => Esquema da táboa da clave externa  (pode ser nulo).
  - 7. FKTABLE_NAME String => Nome da táboa da clave externa.
  - 8. FKCOLUMN_NAME String => Nome de columna de clave externa.
  - 9. KEY_SEQ short => Número de secuencia dentro dunha clave exte rna (un valor de 1 representa a primeira columna da clave externa, un valor de 2 representa a s egunda 
    columna na clave externa).
  - 10. UPDATE_RULE short => A acción que se leva a cabo na clave externa cando se actualiza a clave primaria á que referencia.
    - importedNoAction: non se permite a actualización da clave primaria.
    - importedKeyCascade: cambio en cascada da clave externa.
    - importedKeySetNull: cambia a clave externa a NULL.
    - importedKeySetDefault: cambia a clave externa ao valor predeterminado.
    - importedKeyR estrict: igual que importedKeyNoAction (por compatibilidade ODBC 2.x).
  - 11. DELETE_RULE short => A acción que se leva a cabo na clave externa cando se elimina a clave primaria á que referencia.
    - importedKeyNoAction: non se permite borrar a clave primaria.
    - importedKeyCascade:  borrado en cascada das filas da clave externa que ref erencia á clave primaria eliminada.
    - importedKeySetNull: clave externa a NULL.
    - importedKeyRestrict : igual que importedKeyNoAction (por compatibilidade ODBC 2.x).
    - importedKeySetDefault:   clave externa co valor por defecto.
  - 12. FK_NAME String => Nome da clave externa (pode ser nulo).
  - 13. PK_NAME String => Nome da clave principal (pode ser nulo).

ResultSet getProcedures  (String catalogo, esquemaPatron, String  procedementoPatron) throws 
SQLException.

  - Recupera unha descrición dos procedementos almacenados dispoñibles no catálogo dado.
  - Os parámetros catálogo ou esquema poden ter o valor NULL, entón o nome do cat álogo ou do esquema non se utilizan para delimitar a procura.
  - As columnas do ResultSet  son:
  - 1. PROCEDURE_CAT String => Catálogo do procedemento (pode ser null).
  - 2. PROCEDURE_SCHEM String => Esquema do procedemento (pode ser null).
  - 3. PROCEDURE_NAME String => Nome do procedemento.
  - 4. Reservado para uso futuro.
  - 5. Reservado para uso futur o.
  - 6. Reservado para uso futuro.
  - 7. REMARKS String => Comentarios do procedemento.
  - 8. PROCEDURE_TYPE short => Clase de procedemento.
- ProcedureNoResult: non devolve un valor de retorno.
- ProcedureR eturnsResult: devolve un valor de retorno.
- ResultSet getProcedureColumns(String catalogo, String catalogo, esquemaPatron, String procedementoPatron, String columnaPatron)   throws SQLException.
  Devolve unha descrición dos parámetros de entrada e de saída dos procedementos d un 
  catálogo.

  A descrición dalgunhas columnas do ResultSet  é: 
  - 1. PROCEDURE_CAT String => Catálogo do procedemento (pode ser null).
  - 2. PROCEDURE_SCHEM String => Esquema do procedemento (pode ser null).
  - 3. PROCEDURE_NAME String => Nome do p rocedemento.
  - 4. COLUMN_NAME String => Nome do parámetro.
  - 5. COLUMN_TYPE Short => Tipo do parámetro: 
    - ProcedureColumnUnknown: non se pode determinar.
    - ProcedureColumnIn : parámetro de entrada.
    - ProcedureColumnInOut:  parámetro de entrada/saída.
    - ProcedureColumnOut:  parámetro de saída.
    - ProcedureColumnReturn:  o procedemento devolve un valor (función).
    - ProcedureColumnResult:  o procedemento devolve un ResultSet.
  - 6. DATA_TYPE int => tipo de datos SQL ( java.sql.Types ).
  - 8. PRECISION int => precisión.
  - 9. LENGTH int  => lonxitude en bytes dos datos.
  - 10. SCALE short => escala.  Devólvese NULL para tipos de datos onde a escala non é 
    aplicable.
  - 12. NULLABLE short => pode conter NULL.
    - ProcedureNoNulls - non permite valores NULL.
    - ProcedureNullable - permite valores NULL.
    - ProcedureNullableUnknown - nulabilidade descoñecida.
  - 13. REMARKS String = > Comentario do parámetro.
  - 14. COLUMN_DEF String => Valor predeterminado do parámetro (pode ser nulo).
  - 18. ORDINAL_POSITION int => A posición ordinal, a partir de 1, que ocupa a colum na 
    no conxunto do ResultSet . Si se trata dunha columna que almacena o v alor devolto 
    polo procedemento, o seu valor é 0.
  - 19. IS_NULLABLE String => Determinar si o parámetro acepta valores NULL 
    utilizando as normas ISO.
    - YES: si o parámetro pode incluír valo res NULL.
    - NO: si o parámetro non pode conter valores NULL.
    - Cadea baleira:  si a aceptación de valores NULL para a columna se descoñece.
  - 20. SPECIFIC_NAME String => o nome que identifica de xeito único este 
    procedemento de ntro do seu esquema.

- ResultSet getCatalogs()  throws SQLException.
  Devolve unha lista de catálogos de información na base de datos.
  O ResultSet  só ten unha columna: 
  - 1. TABLE_CATALOG String => Nome do catálogo.

- ResultSet getSchemas(String catalogo,  String esquemaPatron) throws SQLException
  ResultSet getSchemas  (String catalogo,  String esquemaPatron) throws SQLException
# Unidad 3: Acceso a bases de datos relacionales

## Columnas del ResultSet

*   **TABLE_SCHEM**: String => Nome do esquema.
*   **TABLE_CATALOG**: String => Nome do catálogo (pode ser nulo).

## Recuperar tipos de tablas disponibles

*   `ResultSet getTableTypes()` throws SQLException.
*   Los tipos de tablas son:
    *   "TABLE"
    *   "VIEW"
    *   "SYSTEM TABLE"
    *   "GLOBAL TEMPORARY"
    *   "LOCAL TEMPORARY"
    *   "ALIAS"
    *   "SYNONYM"

## Recuperar descripción de tipos de datos

*   `ResultSet getTypeInfo()`.
*   Recupera unha descrición de todos os tipos de datos soportados pola base de datos.

## Recuperar descripción de privilexios para acceder a una tabla

*   `ResultSet getTablePrivileges(String catálogo, String esquemaPatron, String tablaPatron)` throws SQLException.
*   Devolve unha de scrición dos privilexios para acceder á táboa en cuestión.
*   A descrición dalgunhas columnas do ResultSet é:
    *   **TABLE_CAT**: String => Catálogo da táboa (pode ser nulo).
    *   **TABLE_SCHEM**: String => Esquema da táboa (pode ser nulo).
    *   **TABLE_NAME**: String => Nome da táboa.
    *   **GRANTOR**: String => Otorgante do permiso (pode ser nulo).
    *   **GRANTEE**: String => Usuario que recibe o permiso.
    *   **PRIVILEGE**: String => Nome do permiso (SELECT, INSERT, UPDATE, ...).
    *   **IS_GRANTABLE**: String => Si o valor é "YES"  permítese ao usuario que recibe o permiso concedelo aos demais,  si é "NON"  non se permite e si é "NULL" non se coñece o privilexio.

## Métodos para obter información sobre as funcións, procedementos e características di spoñibles

*   `String getCatalogSeparator()` throws SQLException.
*   Recupera a cadea que se utiliza como separador entre o catálogo e o nome da táboa.
*   `String getSQLKeywords()` throws SQLException.
*   Recupera unha lista de todas as palabras reservadas de SQL.
*   `String getIdentifierQuoteString()` throws SQLException.
*   Recupera a cadea que se utiliza para delimitar os identificadores SQL.
*   `String getSearchStringEscape()` throws SQLException.
*   Recupera a cadea que se pode utilizar para escapar carácteres comodíns.
*   `String getNumericFunctions()` throws SQLException.
*   Recupera unha lista das funcións matemáticas dispoñibles.
*   `String getStringFunctions()` throws SQLException.
*   Recupera unha lista das funcións de cadeas dispoñibles.
*   `String getTimeDateFunctions()` throws SQLException.
*   Recupera unha lista das funcións de data e hora dispoñibles.
*   `String getSystemFunctions()` throws SQLException.
*   Recupera unha lista das funcións de sistema dispoñibles.
- `boolean allProceduresAreCallable()` throws SQLException
- `boolean allTablesAreSelectable()` throws SQLException

Métodos para obter información dos límites do conectador

- `int getMaxColumnNameLength()` throws SQLException
- `int getMaxColumnsInGroupBy()` throws SQLException
- `int getMaxColumnsInIndex()` throws SQLException
- `int getMaxColumnsInOrderBy()` throws SQLException
- `int getMaxColumnsInSelect()` throws SQLException
- `int getMaxColumnsInTable()` throws SQLException
- `int getMaxConnections()` throws SQLException
- `int getMaxCursorNameLength()` throws SQLException
- `int getMaxIndexLength()` throws SQLException
- `int getMaxSchemaNameLength()` throws SQLException
- `int getMaxProcedureNameLength()` throws SQLException
- `int getMaxCatalogNameLength()` throws SQLException
- `int getMaxRowSize()` throws SQLException
- `int getMaxStatementLength()` throws SQLException
- `int getMaxStatements()` throws SQLException
Unidad 3: Acceso a bases de datos relacionales

**Métodos para obtener información sobre tablas**

- `int getMaxTableNameLength()`  throws SQLException
  - Devolve a lonxitude máxima do nome dunha táboa.

- `int getMaxTableNamesInSelect()`  throws SQLException
  - Devolve o número máximo de táboas nunha consulta SELECT.

- `int getMaxUserNameLength()` throws SQLException
  - Devolve a lonxitude máxima do nome de usuario .

**Métodos para obtener información sobre transacciones**

Hai un p equeno grupo de métodos que proporcionan información sobre as características das 
transaccións soportadas polo conectador. Son exemplos desta categoría:

- `boolean supportsTransactions()`  throws SQLException
  - Devolve true si o sistema de bases de datos soporta as transaccións.

- `int getDefaultTransactionIsolation()`  throws SQLException
  - Devolve o nivel de illamento de transaccións predeterminado.

- `boolean supportsTransactionIsolationLevel ( int nivel)` throws SQLExce ption 
  - Devolve true si se soporta ese nivel de illamen to nas transaccións.

- `boolean supportsDataDefinitionAndDataManipulationTransactions()`  throws SQLE xception 
  - Devolve true si se soportan sentenzas de manipulación de datos e de definición de d atos 
          dentro das transaccións.

- `boolean supportsDataManipulationTransa ctionsOnly()`  throws SQLE xception 
  - Devolve true si só se soportan sentenzas de manipulación de datos dentro das transa ccións.

- `boolean dataDefinitionCausesTransactionCommit()`  throws SQLExce ption 
  - Devolve true si as sentenzas de definición de datos provocan que  se almacenen os r esultados 
          na base de datos (face un commit).

- `boolean dataDefinitionIgnoredInTransactions()`  throws SQLException 
  - Devolve true si se ignoran as sentenzas de definición de datos dentro das transa ccións.

**Métodos que determinan o soporte de características**

Hai un gran grupo de métodos de DatabaseMetaData  que permiten determinar si unha 
característica concreta (ou un conxunto concreto de características) está soportada polo 
conectador. 

Moitas destas características devolverán true ou false, dep endendo de si a função dada é 
compatible ou non. Algúns destes métodos son:

- `boolean supportsAlterTableWithAddColumn()`  throws SQLException 
  - Devolve true si está soportada a orde ALTER TABLE con ADD COLUMN.

- `boolean supportsAlterTableWithDropColumn()`  throws S QLException 
  - Devolve true si está soportada a orde ALTER TABLE con  DROP COLUMN.

- `boolean supportsColumnAliasing()`  throws SQLException 
  - Devolve true si se soportan os alias de columnas, podendo empregarse a palabra AS.

- `boolean nullPlusNonNullIsNull()`  throws S QLException
- boolean supportsConvert() throws SQLException  
- boolean supportsTableCorrelationNames() throws SQLException  
- boolean supportsExpressionsInOrder() throws SQLException  
- boolean supportsOrderByUnrelated() throws SQLException  
- boolean supportsGroupBy() throws SQLException  
- boolean supportsGroupByUnrelated() throws SQLException  
- boolean supportsGroupByBeyondSelect() throws SQLException  
- boolean supportsLikeEscapeClause() throws SQLException  
- boolean supportsMultipleResultSets() throws SQLException  
- boolean supportsMultipleTransactions() throws SQLException  
- boolean supportsOuterJoins() throws SQLException  
- boolean supportsFullOuterJoins() throws SQLException  
- boolean supportsLimitedOuterJoins() throws SQLException  
- boolean supportsGetGeneratedKeys() throws SQLException  
- boolean supportsStoredFunctionsUsingCallSyntax() throws SQLException  
- boolean supportsStoredProcedures() throws SQLException  
- boolean supportsSubqueriesInComparisons() throws SQLException
- boolean supportsSubqueriesInExists() throws SQLException
- boolean supportsSubqueriesInQuantifieds() throws SQLException
- boolean supportsSubqueriesInExpressions() throws SQLException

- String getCatalogName(int columnNumber)
- String getColumnClassName(int columnNumber)
- int getColumnCount()
- int getColumnDisplaySize(int columnNumber)
- String getColumnLabel(int columnNumber)
- String getColumnName(int columnNumber)
- int getColumnType(int columnNumber)
Unidad 3: Acceso a bases de datos relacionales

- **getColumnTypeName(int columna)**
  - Devuelve o tipo de datos JDBC que se corresponde ao tipo da columna.

- **getPrecision(int columna)**
  - Devuelve o número de dígitos decimais, nos dados de tipo numérico, ou número máximo de caracteres para columnas de tipo carácter, e o número máximo de bytes para columnas de tipo binário.

- **getScale(int columna)**
  - Obtén o número de dígitos á dereita do punto decimal da columna.

- **getSchemaName(int columna)**
  - Obtén esquema da táboa da columna.

- **getTableName(int columna)**
  - Obtén o nome da táboa da columna.

- **IsAutoIncrement(int columna)**
  - Devolve true se a columna se incrementa automaticamente.

- **IsCaseSensitive(int columna)**
  - Devolve true se na columna se distingue entre maiúsculas e minús culas.

- **isCurrency(int columna)**
  - Devolve true se a columna é un valor monetario.

- **isDefinitelyWritable(int columna)**
  - Devolve true se a escritura na columna se pode realizar con éxito.

- **isNullable(int columna)**
  - Indica se na columna se permi ten valores nulos.

- **IsReadOnly(int columna)**
  - Devolve true se a columna é de só lectura.

- **isSearchable(int columna)**
  - Indica se a columna designada pode ser utilizada nunha cláusula where.

- **IsSigned(int columna)**
  - Indica se o valor almac enado nunha columna é un número con signo.

- **isWritable(int columna)**
  - Indica se é posible escribir na columna.
# Unidad 3: Acceso a base de datos relacionales

## Actualización no saldo de cada cuenta

Deben ejecutarse, si unha delas falla, deben desfacerse os cambios realizados. Estas dúas sentenzas deben executar nunha mesma transacción.

### Transacciones

Una transacción é unha unidade lóxica de traballo, é unha serie de sentenzas de actualización que deben completarse con éxito, antes de que os seus resultados se fagan permanentes na base de datos.

### Propiedades ACID

As transaccións deberían garantir todas as propiedades ACID:

#### Atomicidade

*   É a propiedade que asegura que a operación se realizou ou non, e polo tanto ante un fallo do sistema non pode quedar a medias. Se esta operación consiste nunha serie de pasos, todos eles acontecen ou ningún.
*   Por exemplo, no caso dunha transacción bancaria, se executa tanto o depósito e a deducción, ou ningunha acción é realizada.

#### Consistencia

*   É a propiedade que asegura que só se empeza aquilo que se pode rematar, polo tanto  execútanse aquelas operacións que non van romper as regras de integridade da base de datos.
*   A propiedade de consistencia sostén que calquera transacción levará á base de datos desde un estado válido a outro tamén válido.
*   A Integridade da Base de Datos nos asegura que os datos son exactos e consistentes.

#### Isolamento

*   É a propiedade que asegura que unha operación non pode afectar a outras.
*   Isto asegura que a realización de dúas transaccións sobre a mesma información sean independentes e non xeren ningún tipo de erro.
*   Esta propiedade define como e cando os cambios producidos por unha operación se fan visibles para as demais operacións concorrentes.

#### Durabilidad (Persistencia)

*   É a propiedade que asegura que unha vez realizada a operación, esta persistirá e non se poderá desfacer aínda que falle o sistema.

### Estados de una transacción

Para garantir as propiedades ACID, as transaccións teñen que pasar por determinados estados:

*   **Activa (Active)**: é o estado inicial, a transacción permanece neste estado durante a súa execución.
*   **Parcialmente comprometida (Uncommited)**: a transacción pasa a este estado cando acaba de realizar a última instrucción.
*   **Errada (Failed)**: a transacción pasa a este estado tras descubrir que non se pode continuar a execución normal.
*   **Abortada (RollBack)**: a transacción pasa a este estado logo de retroceder a transacción e restablecer a base de datos ao estado que tiña cando comezou a transacción.
*   **Comprometida (Commited)**: a transacción pasa a este estado tras completarse con éxito.
Unidad 3: Acceso a bases de datos relacionales

O control das transações pelas aplicações supõe a confirmação ou retrocesso das operações para deixar a base de dados num estado consistente. Este control realízase mediante duas sentenças:

- **commit**: sinala o final com sucesso de uma transação. Os cambios fánse permanentes.
- **rollback**: sinala o final sem sucesso de uma transacción. O SXBD deve retroceder e desfacer os cambios realizados.

Modos de confirmação de transações

As transações em JDBC administranse nas conexões. Cando uma aplicação completa uma transação, ten que confirmar ou reverter todo o trabalho completado e realízalo através dos métodos que nos brinda dita con exión.

JDBC suporta dois modos de administración de transações:

- **Modo de confirmação automática**:
  - Se uma conexão está no modo de confirmação automática, todas as suas instruções SQL executanse e confírmanse como transacción individuais, é dicir, ca da sentenza SQL é tratada como unha transacción, e faise efectiva cando se co mplete a sentenza.
  - Por defecto, todas as conexões que obteñemos coa base de datos son "autocommit". Isto significa que cada instrução SQL individual é tratada como unha transac ción e será automaticamente confirmada e executada. Non se require ningunha outra función de administración de transaccións.

- **Modo de confirmação manual**:
  - Se uma conexão está no modo de confirmação manual, as suas instruções SQL agrúpanse en transacció ns que finalizan facendo unha chamada explícita ao método commit ou ao método rollback do obxecto Connection.
  - Cando múltiples instruções son executadas nunha única transacción, todas as oper acións son realizadas (convertidas en permanentes na base de dat os) ou descartadas (desfanse os cambios aplicados á base de datos).
  - É responsabilidade do programador confirmar ou reverter as transaccións. Si non se chama ao método commit(), os cambios non serán gardados na base de datos aínda cando se teñan executadas unha ou máis sentenzas SQL da transacción.

Cambiar o modo de confirmação da conexión

Para cambiar o modo de confirmação, utilízase o método setAutoCommit() da interface Connection. A sintaxe deste método é:

void setAutoCommit(boolean confirmación) throws SQLException

- Modo confirmação manual: conexión.setAutoCommit(false);
# Unidad 3: Acceso a base de datos relacionales

## Ver o estado do modo de confirmación da conexión

Para ver o actual modo de confirmación da conexión, utilízase o método `getAutoCommit()` da interface `Connection`. A sintaxe deste método é:

```java
Boolean getAutoCommit() throws SQLException
- true : modo de confirmación automática
- false : modo de confirmación manual
```

## Iniciar unha transacción

No procesamento de transaccións, en xeral, pódemos ter tres xeitos de controlar cando se inicia unha transacción:

*   Transaccións explícitas: Comezan explicitamente coa sentenza `BEGIN TRANSACTION`. Esta maneira non é soportada polas conexións JDBC.
*   Transaccións de confirmación automática: Cada instrución SQL comeza automaticamente unha transacción e confírmase cando termina. Non se ten que especificar ning unha sentenza adicional para controlar as transaccións. É a maneira por defecto das conexións JDBC.
*   Transaccións implícitas: Unha transacción SQL comez a automaticamente coa primeira sentenza SQL ata confirmar ou reverter esta transacción, o cal inicia automaticamente unha nova transacción. Todas as sentenzas SQL executadas tras a última chamada a un método `commit` están incluídas na transacción actual e són tratadas xuntas como unha unidade. Non se ten que realizar ningunha acción para delinear o inicio dunha transacción. O modo de transaccións implícitas xera unha cadea continua de transaccións, é dicir, cada sentenza comeza automaticamente unha nova transacción e só finalizan todas cando se executa unha sentenza `commit` (confirmar) ou `rollback` (reverter).

As conexións JDBC inician as transaccións implícitas cando se desactiva o modo de confirmación automática (`setAutoCommit(false)`).

## Confirmar o u desfacer os cambios da transacción

Nas transaccións implícitas, para facer permanentes os cambios realizados na base de datos pola transacción actual ou desfacelos, a API JDBC inclúe dous métodos como parte do interfaze `Connection`:

*   `void commit()` throws `SQLException`
*   `void rollback()` throws `SQLException`

-   `commit`: fai permanentes todos os cambios realizados desde o último `commit` ou `rollback` e libera calquera bloqueo de base de datos actualmente en poder da conexión.
-   `rollback`: desfai todos os cambios realizados na transacción actual e libera os bloqueos de base de datos actualmente en poder da conexión.

Estes métodos deben ser utilizados só cando o modo de confirmación automática se desactivou.

## Erros ao procesar a transacción

Nas transaccións implícitas, si un erro impide a terminación correcta dunha transacción, hai que reverter a transacción e liberar todos os recursos que mantén a transacción. No caso contrario, hai que facer permanentes os cambios.

Si ocorre algum erro na transacción, lánzase a excepción `SQLException`. O control de excepcións realízase envolvendo no `try...catch` os métodos `commit` e `rollback`. Na cadea de excepcións, pode-se capturar as exceções `SQLException` e reverter a transacción antes de liberar os recursos.

# Unidad 3: Acceso a bases de datos relacionales

## Control de transacciones para evitar errores y reverter operaciones

### Sin control de transacciones

```java
public void movimiento(Connection con, String contaDebito, String contaCredito, double importe) throws SQLException {
    PreparedStatement sentenza;
    try {
        sentenza = con.prepareStatement("update conta set saldo = saldo +?");
        sentenza.setDouble(1, importe * -1);
        sentenza.setString(2, contaDebito);
        sentenza.executeUpdate();
        imprimirInforme(contaDebito, importe);
        sentenza.setDouble(1, importe);
        sentenza.setString(2, contaCredito);
        sentenza.executeUpdate();
        imprimirInforme(contaCredito, importe);
    } catch (SQLException ex) {
        System.out.println("SQLException: " + ex.getMessage());
    } finally {
        if (sentenza != null) {
            sentenza.close();
        }
    }
}
```

En este código, la transacción es confirmada automáticamente, lo que significa que cada sentencia de actualización es una transacción que se confirma por separado cuando termina. Si ocurre un error en medio, por ejemplo, si el método imprimirInforme activa una excepción, la ejecución continúa por la instrucción que sigue al bloque catch. Las instrucciones que se ejecutan desde el punto donde ocurrió el error hasta el final del bloque try no se ejecutan. En este caso, se descontaría el dinero de la cuenta de débito, pero no se ingresaría en la cuenta de crédito.

### Con control de transacciones

```java
public void movimiento(Connection con, String contaDebito, String contaCredito, double importe) throws SQLException {
    PreparedStatement sentenza;
    try {
        // Iniciar una transacción
        con.setAutoCommit(false);
        
        // Actualizar la cuenta de débito
        sentenza = con.prepareStatement("update conta set saldo = saldo +?");
        sentenza.setDouble(1, importe * -1);
        sentencia.setString(2, contaDebito);
        sentencia.executeUpdate();
        
        // Imprimir informe de la cuenta de débito
        imprimirInforme(contaDebito, importe);
        
        // Actualizar la cuenta de crédito
        sentenza = con.prepareStatement("update conta set saldo = saldo +?");
        sentenza.setDouble(1, importe);
        sentenza.setString(2, contaCredito);
        sentencia.executeUpdate();
        
        // Imprimir informe de la cuenta de crédito
        imprimirInforme(contaCredito, importe);
        
        // Confirmar la transacción
        con.commit();
    } catch (SQLException ex) {
        // Si ocurre un error, reverter la transacción
        con.rollback();
        System.out.println("SQLException: " + ex.getMessage());
    } finally {
        // Cerrar la sentencia
        if (sentenza != null) {
            sentenza.close();
        }
    }
}
```

En este código, se controla manualmente la confirmación de las transacciones utilizando `con.setAutoCommit(false)` para desactivar la confirmación automática de las transacciones. Luego, se ejecutan las operaciones de actualización y se imprime el informe de cada cuenta. Si ocurre un error, se reverte la transacción utilizando `con.rollback()`. De esta manera, se asegura que las operaciones se ejecuten correctamente o no se ejecutan en absoluto.
- **Transferencia de dinero**
  - where numeroconta = ?
  - con.setAutoCommit(false)
  - sentenza.setDouble(1, importe* -1)
  - sentenza.setString(2,contaDebito)
  - sentenza.executeUpdate()
  - imprimirInfome(contaDebito, importe)
  - sentenza.setDouble(1, importe)
  - sentenza.setString(2,contaCredito)
  - sentenza.executeUpdate()
  - imprimirInfome(contaCredito, importe)
  - con.commit()

- **Excepción e rollback**
  - SQLException: 
    - if (con != null)
      - try
        - System.out.println("A transacción foi abortada ")
        - con.rollback()
      - catch(SQLException e)
        - System.out.print("Ocorreu un erro ")

- **Transacción e acceso concorrente**
  - En un contorno monousuario, as transaccións están illadas unhas das outras e son bastantes sinxel as de manexar.
  - En cambio, nun entorno multiusuario, as transaccións son máis complexas e poden producir problemas de simultaneidade.

- **Problemas no acceso concorrente**
  - **Actualización perdida (lost update)**
    - Unhas transaccións sobrescriben as actualizacións doutras.
    - Ocorre cando unha transacción T1 modifica datos que foron modificados por outra transacción T2, co cal, as mod ificacións de T2 pérdense.
# Unidad 3: Acceso a bases de datos relacionales

## Lecturas sucias (dirty reads)

- Lese un valor que está siendo modificado por otra transacción que no finalizou e que podría cancelarse ou fallar.
- Unha lectura sucia ocorre cando unha transacción T1 usa datos que foron modificados por outra transacción T2, e estes datos estão nun estado sen confirmar. Polo tanto, existe a posibilidade de que T2 desfaga os cambios. Neste caso, T1 estará utilizando uns datos que xa non existen (datos sucios).  T1 opera sobre unha suposición falsa.

## Lecturas non-repetibles ou difusas (non repeatable reads)

- Obtéñense lecturas diferentes do mesmo valor durante a mesma transacción.
- Unha lectura non-repetible prodúcese cando unha transacción T1 volve ler un elemento de datos que xa lera previamente, pero que foi modificado por outra transacción. Así, a transacción T1 estará lendo dous valores distintos para o mesmo elemento de datos.

## Lecturas pantasmas (phantom reads)

- Obtéñense lecturas diferentes dun conxunto de tuplas (filas) durante a mesma transacción.
Unidad 3: Acceso a bases de datos relacionales

**Consulta, otra transacción modifica algunos datos, e a transacción original recupera los datos una segunda vez. A primeira transacción agora terá um conjunto de resultados diferentes, que poderiam conter datos pantasmas.**

**Técnicas de control de concurrencia**

**Bloqueos**

Os SXBD multiusuarios têm mecanismos para o control da concorrencia e manter a co nsistencia da base de datos cando esta é actualizada por múltipl es usuarios.

**Un bloqueo**

- É uma informação associada a cada elemento de dados que describe o estado do el emento respecto as posíveis operacións (recuperación ou actualização) que se podem realizar sobre el en cada momento.
- O SXBD impón os bloqueos necessários em cada momento.

**Os elementos de dados**

- Son as unidades de dados para os que se controla o acesso.
- Hai varios niveis: táboa, fila, de rangos de filas, columna, campos,  clave,  base de d atos, etc.

**A granularidade**

- É o tamaño dos elementos. Así fálase de sistemas de gran fino ou de gran groso para denotar elementos pequenos ou grandes respectivamente.
- A maior granularidade, m enor concorrencia.
- Granularidade moi grosa implica xestionar menor números de bloqueos, pero atrasa a execución de moitas transaccións (os obxectos non se van liberando).
- Unha granularidade moi fina, permite maior concorrencia,  pero aparecen mais s ituacións de bloqueos mutuos(deadlock) que terá que ser resoltas.

**Bloqueos mutuos ou deadlock**

- Prodúcense por transaccións que acceden a múltiples táboas e se están b loqueando mutuamente entre elas.
- Por exemplo: a transacción 1 require inserir dato na táboa A e actualizar a táboa B. A transacción 2 require cambiar a táboa B e logo actualizar a táboa A. A transacción 1 non pode terminar porque a transacción 2 ten bloque ada a táboa B e a transacción 2 non pode terminar porque a transacción 1 ten bloqueada a táboa A.
Unidad 3: Acceso a bases de datos relacionales

- Bloqueo compartido (de lectura):
  - Si unha transacción ten un bloqueo compartido sobre un elemento de datos, pode ler o elemento, pero non actualizalo (escribir).
  - Varias transaccións poden manter á vez bloqueos compartidos sobre o mesmo elemento.
  - Este tipo utilízase cando non se require actualizar datos, pero deséxase impedir ca lquera modificación mentres os datos son consultados.

- Bloqueo e xclusivo (de escritura):
  - Si unha transacción ten un bloqueo exclusivo sobre un elemento de datos, pode ler e actualizar (escribir) o elemento.
  - Un bloqueo exclusivo proporciona acceso exclusivo ao elemento. Ningunha outra transacción pode acceder ao obxec to bloqueado, nin bloquealo ata que sexa liberado pola transacción que o bloquea.
  - Utilízase cando se quere actualizar datos.

O nivel de illamento (transaction isolation level)

En bases de datos, o illamento é unha propiedade ACID que define como e cando os cambios producidos por unha operación se fan visibles para as demais operacións concorre ntes.

O nivel de illamento resolve problemas asociados a múltiples transaccións de diferentes usuarios solicitando os mesmos datos.

Define o grado en que se illa u nha transacción das modificacións de recursos ou datos re alizadas por outras transaccións.

O nivel de illamento dunha transacción é unha característica de vital importancia  no desenvolvemento de aplicacións de base de datos, xa que afecta aos tipos e durac ión de bloqueos que se producen na base de datos, o que ten efectos directos no rendemento e tempo de re sposta das nossas consultas e transaccións.

Evidentemente, a elección do modo de illamento é máis importante canto maior é a concorrencia da base de dato s.

A maior nivel de illamento garante unha maior consistencia nos datos, pero a costa dunha  menor concorrencia e menor rendemento.

SQL -92 define catro niveles de illamento dentro dunha transacción:

- Serializable
  - Este é o nivel de illamento máis alto.  Especifica que todas as transaccións ocorran de modo illado, é dicir, coma se todas as transaccións se executasen en mode serie (unha tras outra).
  - Garante que unha transacción recuperará exactamente os mesmos datos cada vez que repita unha operación de l ectura. Por exemplo, a mesma sentenza SELECT coa me sma cláusula WHERE devolverá o mesmo número de filas, logo non se poderán inserir filas novas no rango cuberto pola WHERE, e evitaranse as lecturas panta sma.
  - O SXBD aplicará un nivel de bloqueo con granul aridade grosa, o que pode afectar aos demais usuarios, nos sistemas mu ltiusuario.
  - Ofrece unha maior consistencia na transacción utilizando máis recursos e bloqu eos.
  - Evita os problemas das lecturas sucias (dirty reads), das lecturas non repetibles (non repeatable reads), e das lecturas pantasma (phantom reads).
  - Vantaxes: consistencia de datos absoluta.
  - Contras: altísimo grado de bloqueo e moi baixo nivel de concorrencia, xa que as táb oas poden ser bloqueadas na súa totalidade mentres se realiza unha transac ción.
Unidad 3: Acceso a bases de datos relacionales

Consistencia de datos

* Lecturas repetibles (REPEATABLE READ)
  - Evita que entre dos lecturas de un mismo registro una transacción A pueda modificar el registro y otra transacción B pueda leer un resultado diferente.
  - Evita problemas de lecturas sucias y no repetibles.
  - No evita lecturas fantasma, es decir, una transacción puede leer un rango de filas y otra transacción puede insertar o modificar filas en el mismo rango.
  - Ventajas: alta consistencia en los datos.
  - Contras: mayor nivel de bloqueos y disminución del grado de concurrencia.
  - Uso habitual: en operaciones bancarias o financieras que requieren un grado de exactitud muy alto.

* Lecturas comprometidas (READ COMMITTED)
  - Só permite leer datos confirmados antes de que se ejecute una consulta.
  - Evita lecturas sucias, pero permite lecturas no repetibles y lecturas fantasma.
  - No hay bloqueos de rango.
  - Ventajas: buen equilibrio entre concurrencia y consistencia.
  - Contras: mayor nivel de bloqueo.
  - Uso habitual: es el nivel de aislamiento más común, se utiliza por defecto en muchos sistemas de bases de datos.

* Lecturas no comprometidas (READ UNCOMMITTED)
  - Este es el nivel de aislamiento más bajo. Permite leer datos no confirmados de otras transacciones.
  - Permite producir todos los efectos secundarios de simultaneidad (lecturas sucias, lecturas no repetibles y lecturas fantasma).
  - Ventajas: no se necesita hacer bloqueos para leer datos, aunque sí para modificarlos.
  - Ofrece grandes beneficios de rendimiento.
  - Contras: no se puede garantizar la consistencia de los datos leídos. Puede darse el caso de que se lea un dato que logo no existe más.
  - Uso habitual: en situaciones de alta concurrencia donde la potencial inconsistencia de datos no es un problema.

Nivel de aislamiento apropiado depende del equilibrio entre los requisitos de integridade de los datos de la aplicación y la sobrecarga de cada nivel de aislamiento.

* Nivel de aislamiento menor
  - Significa que muchos usuarios pueden tener acceso a los datos simultáneamente, pero también aumentan los efectos de simultaneidad que pueden experimentar, como lecturas no confirmadas o pérdida de actualizaciones.
* Nivel de aislamiento mayor
  - Reduce los tipos de efectos de simultaneidad, pero requiere más recursos del sistema y aumenta las posibilidades de que una transacción bloquee a otra.

Conector JDBC y nivel de aislamiento
Normalmente, no es necesario hacer nada sobre el nivel de aislamiento de la transacción, si se implementa el que tiene por defecto en el SXBD.
Unidad 3: Acceso a bases de datos relacionales

Permite establecerlo a otro nivel.

A interface Connection proporciona las siguientes constantes para los niveles de aislamiento:

- `TRANSACTION_NONE`: Indica que las transacciones no son compatibles.
- `TRANSACTION_READ_UNCOMMITTED`: Indica que las lecturas sucias, las lecturas no repetibles y las lecturas pantasma pueden ocurrir. Es el nivel 1.
- `TRANSACTION_READ_COMMITTED`: Indica que se impiden las lecturas sucias; las lecturas no repetibles y las lecturas pantasma pueden ocurrir. Es el nivel 2.
- `TRANSACTION_REPEATABLE_READ`: Indica que se impiden las lecturas sucias y las lecturas no repetibles; las lecturas pantasma pueden ocurrir. Es el nivel 3.
- `TRANSACTION_SERIALIZABLE`: Indica que se impiden las lecturas sucias, las lecturas no repetibles y las lecturas pantasma. Es el nivel 4.

Obtener el nivel de aislamiento actual de una conexión

Para obtener el nivel de aislamiento actual de una conexión, se utiliza el método de la interfaz Connection:

```java
int getTransactionIsolation() throws SQLException
```

Devuelve el nivel de aislamiento actual, que será una de las constantes de nivel de aislamiento.

Cambiar el nivel de aislamiento de una conexión

Para cambiar el nivel de aislamiento de una transacción, se utiliza el método de la interfaz Connection:

```java
void setTransactionIsolation(int nivel) throws SQLException
```

Las constantes definidas en la interfaz de conexión son los posibles niveles de aislamiento de transacción.

Un conectador JDBC puede no soportar todos los niveles de aislamiento de transacción. Si un conectador no soporta el nivel de aislamiento especificado en una invocación del método setTransactionIsolation, el conectador puede substituirlo por un superior, con un nivel de aislamiento más restritivo. Si un conectador no puede substituir un nivel de aislamiento más alto, lanza una excepción SQLException.

Determinar si un nivel de aislamiento es soportado por un conectador JDBC

Para determinar si un conectador soporta o no un determinado nivel, se utiliza el método supportsTransactionIsolationLevel de la interfaz DatabaseMetaData:

```java
Boolean supportsTransactionIsolationLevel(int nivel) throws SQLException
```

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOMMITTED`
- `TRANSACTION_READ_COMMITTED`
- `TRANSACTION_REPEATABLE_READ`
- `TRANSACTION_SERIALIZABLE`

- `TRANSACTION_NONE`
- `TRANSACTION_READ_UNCOM
Unidad 3: Acceso a bases de datos relacionales

Connection

Exemplo:
```java
DatabaseMetaData metadatos = conexion.getMetaData();
if(metadatos.supportsTransactionIsolationLevel(
        Conexion.TRANSACTION_READ_COMMITTED)) {
    System.out.println("Nivel de aislamiento: " + 
            "TRANSACTION_READ_COMMITTED é suportado.");
    conexion.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
}
```

4.1.1 Puntos de retorno (Savepoints)

Los puntos de retorno (savepoints) ofrecen un mecanismo para reverter partes de una transacción, es decir, permiten guardar estados de transacción válidos, para que en caso de fallos no se tenga que abortar toda la transacción, sino hasta ciertos puntos (savepoints).

Cuando creamos un punto de retorno, indicamos un punto dentro de una transacción al que se puede hacer rollback, sin afectar a cualquier trabajo realizado en la transacción antes de que el punto de retorno fuera creado. Pueden crearse varios puntos de retorno dentro de una transacción individual.

Los puntos de retorno pueden ser útiles para implementar la recuperación de errores complejos en aplicaciones de base de datos. Si ocurre un error en medio de una transacción de múltiples sentencias, la aplicación puede ser capaz de recuperarse del error (devolviendo rollback hasta un savepoint) sin necesidad de abortar la transacción completa.

Los puntos de retorno están definidos en el estándar SQL y soportan a la mayoría de los SGBD más utilizados, como: Oracle, PostgreSQL, Microsoft SQL Server, MySQL, DB2 y Firebird.

Cuando se establece un punto de retorno se define un punto de reversión lógico dentro de una transacción. Si ocurre un error más allá de un punto de retorno, puede utilizar el método rollback para deshacer o bien todos los cambios, o sólo los cambios realizados después del punto.

La siguiente figura muestra un ejemplo de utilización de puntos de retorno. Al iniciar la transacción las sentencias 1 y 2 están protegidas por el “savepoint1”, indicando que este bloque de instrucciones puede conservarse en caso de una cancelación parcial; no obstante, las sentencias 3, 4 y 5 son canceladas debido a la sentencia “rollback savepoint1”, que indica que se cancelen todas las operaciones realizadas después del savepoint1. En este caso, sólo se ejecutan las sentencias 1, 3 y 6 cuando se confirma la transacción.
Unidad 3: Acceso a bases de datos relacionales

- Objeto Connection dispone de dos nuevos métodos que ayudan a administrar los puntos de rescate.
- Establecer un punto de retorno
  Para establecer un punto de retorno y deshacer los cambios después de este punto de retorno, se utiliza el método `setSavepoint` de la interfaz `Connection`.
  La sintaxis es: `Savepoint setSavepoint(String punto_retorno)` throws SQLException
  Este método devuelve un objeto `Savepoint` que representa al punto de retorno.
  Si `setSavepoint` se invoca fuera de una transacción activa, se inicia una transacción en este punto de retorno.

- Eliminar un punto de retorno
  Para quitar un punto de retorno de la transacción actual, se utiliza el método `releaseSavepoint` de la interfaz `Connection`.
  La sintaxis es: `void releaseSavepoint(Savepoint punto_retorno)` throws SQLException
  Se liberan los recursos ocupados.
  Una referencia a un punto de retorno eliminado provoca una excepción `SQLException`.
  También se puede lanzar la excepción `SQLFeatureNotSupportedException`, si el controlador JDBC no es compatible con este método.

- Calquera punto de retorno creado en una transacción es automaticamente eliminado cuando la transacción se confirma o se reverte.

- Deshacer los cambios a partir de un punto de retorno
  Podemos pasar un punto de retorno como argumento, al método `rollback` de la interfaz `Connection`, para deshacer todas las sentencias hasta el punto de retorno especificado.
  La sintaxis es: `void rollback(Savepoint punto_retorno)` throws SQLException
  Al reverter una transacción a un punto de retorno, se imprimen automaticamente los puntos de retorno creados después de este punto de retorno.
Unidad 3: Acceso a bases de datos relacionales

Para determinar si un conectador soporta o no un determinado nivel, se utiliza el método `supportsSavepoints()` de la interfaz `DatabaseMetaData`.

Boolean supportsSavepoints() throws SQLException
Devuelve `true` si el conectador JDBC soporta puntos de retorno; `false` por lo contrario.

Ejemplo

El siguiente método utiliza una transacción para realizar varias inserciones en la tabla `Animal` y crea un punto de retorno para proteger la realización de las dos primeras instrucciones. Como resultado de la ejecución del método, solo se confirma en la base de datos las dos primeras instrucciones, ya que se deshacen todas las operaciones después del punto de retorno. En caso de que una instrucción viola alguna restricción, se lanza una excepción ejecutando la instrucción y restando, por lo que no se inserta ningún registro en la base de datos.

```java
public static void exTransaction(Connection con) {
    try {
        con.setAutoCommit(false);
        Statement stmt = con.createStatement();
        stmt.executeUpdate("INSERT INTO Animal(id, nome) VALUES(1, 'Rocky');");
        stmt.executeUpdate("INSERT INTO Animal(id, nome) VALUES(2, 'Miau');")
        Savepoint punto1 = con.setSavepoint();
        stmt.executeUpdate("INSERT INTO Animal(id, nome) VALUES(3, 'Sansón');")
        con.rollback(punto1);
        con.commit();
        stmt.close();
        System.out.println("Transacción realizada.");
    } catch (SQLException ex) {
        ex.printStackTrace();
        try {
            System.out.println("Transacción falida.");
            con.rollback();
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }
}
```

4.2 Procesamiento por lotes y transacciones

Para aumentar el rendimiento al realizar varias actualizaciones en una base de datos y reducir la cantidad de sobrecarga de comunicación, el conectador JDBC ofrece la posibilidad de enviar varias actualizaciones como una sola unidad de trabajo, denominada también lote. Esta operación es muy eficiente que realizar las actualizaciones de manera separada.

Las operaciones por lotes fueron introducidas en JDBC 2.0 y requieren que una transacción no esté en modo autocommit.

Las interfaces `Statement`, `PreparedStatement` y `CallableStatement` pueden usarse para enviar actualizaciones por lotes.

Engadir una sentencia a la lista del lote

La sintaxis del método para engadir una sentencia a la lista de comandos para ser ejecutadas como un lote es:

```java
con.createBatch();
stmt.executeUpdate("INSERT INTO Animal(id, nome) VALUES(1, 'Rocky');");
con.addBatch();
stmt.executeUpdate("INSERT INTO Animal(id, nome) VALUES(2, 'Miau');");
con.addBatch();
con.executeBatch();
```

Nota: Se han eliminado los puntos de los índices y el número de página, y se han transformado las listas con guiones (-). Se han añadido saltos de línea dobles después de cada punto.
- Unidade 3: Acesso a base de dados relacionais
- Procesamento por lotes só pode ser utilizado com sentenças que devolvam um valor numérico, mas não com sentenças que devolvam um conjunto de resultados. Isto quer dizer que só pode ser utilizado com sentenças do tipo: INSERT INTO, UPDATE, DELETE, CREATE TABLE, DROP TABLE e ALTER TABLE.
- Executar uma lista de sentenças para enviar um lote de sentenças à base de dados para que se execute, utilize o seguinte comando:
```java
int[] executeBatch() throws SQLException
```
- As sentenças do lote executam-se em série, na ordem em que se adicionarão ao lote.
- Se todas as sentenças forem executadas corretamente, devolve um array de inteiros que contém um contador de atualização para cada elemento no lote. Cada elemento do array é um contador de atualização (ou número de filas afetadas em cada atualização). As entradas do array ordemam-se de acordo com a ordem em que se processam as sentenças.
- Exemplo de execução de um lote:
```java
Statement stmt = null;
try {
  conexion.setAutoCommit(false);
  stmt = conexion.createStatement();
  stmt.addBatch("DELETE FROM Animal");
  stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(1, 'Martín)");
  stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(2, 'Alex')");
  stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(3, 'Norman')");
  int[] contador = stmt.executeBatch();
  conexion.commit();
} catch (BatchUpdateException be) {
  // Exceção de atualização por lotes
} catch (Exception e) {
  // Exceção geral
}
```
- Manutenção de exceções na atualização por lotes:
  - Existem duas exceções que podem ser lançadas durante uma atualização por lotes:
    - SQLException: Todos os métodos do API JDBC lançarão um objeto SQLException se houver algum problema de acesso à base de dados.
    - BatchUpdateException: Se uma sentença não for executada corretamente, este método produz uma BatchUpdateException.
  - Se chamar ao método executeBatch, uma das instruções que adicionar ao batch produz um ResultSet ou uma das instruções do batch não se execute satisfatoriamente por alguma outra razão, lançará uma exceção BatchUpdateException.
  - public class BatchUpdateException extends SQLException
    - Ademais da informação proporcionada por SQLException, que herda, proporciona os contadores de atualização para todas as sentenças que se executaram com sucesso durante a atualização (similar ao array retornado pelo método executeBatch).
- Unidade 3: Acesso a base de dados relacionais
- Controlador JDBC pode ou não continuar processando os comandos restantes do lote, dependendo de como processa o SXBD em particular estes lotes.

Se o controlador segue continuar processamento logo após um fallo, o array de contadores de atualização devolto pelo método `BatchUpdateException` contém tantos elementos como sentenças há no lote, e os valores podem ser os seguintes:

- Um número maior ou igual a zero: indica que o mandato se processou com sucesso, e o valor indica o número de filas que foram afetadas pela execução da sentença na base de dados.
- Um número igual a `Statement.SUCCESS_NO_INFO`: indica que a sentença se processou com sucesso, mas que o número de filas afetadas é desconhecido.
- Um valor de `Statement.EXECUTE_FAILED`: indica que o comando não se executou com sucesso.

Podemos utilizar o seguinte método para obter o array de contadores de atualização do objeto `BatchUpdateException`:

```java
int[] getUpdateCounts()
```

Exemplo: No seguinte fragmento de código executa-se um processo por lotes. Se ocorre um fallo, imprime-se os contadores de atualização contidos no objeto `BatchUpdateException`.

```java
Statement stmt = null;
try {
    conexion.setAutoCommit(false);
    stmt = conn.createStatement();
    stmt.addBatch("DELETE FROM Animal");
    stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(1, 'Martín)");
    stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(2, 'Alex')");
    stmt.addBatch("INSERT INTO Animal(id, nome) VALUES(3, 'Norman')");
    int[] contadorAct = stmt.executeBatch();
    conexion.commit();

} catch (BatchUpdateException e) {
    int[] contadorAct = e.getUpdateCounts();
    verificarContador(contadorAct);
    try {
        conexion.rollback();
    } catch (Exception e2) {
        e.printStackTrace();
    }
} catch (Exception e) {
    e.printStackTrace();
}
finally {
    stmt.close();
}
}

public static void verificarContador(int[] contador) {
    for (int i = 0; i < contador.length; i++) {
        if (contador[i] >= 0) {
            System.out.println("Sentença executada com sucesso; contador=" + contador[i]);
        } else if (contador[i] == Statement.SUCCESS_NO_INFO) {
            System.out.println("Sentença executada com sucesso; contador=" + Statement.SUCCESS_NO_INFO);
        } else if (contador[i] == Statement.EXECUTE_FAILED) {
            System.out.println("Sentença falida; contador=" + Statement.EXECUTE_FAILED);
        }
    }
}
```

- Unidade 3: Acesso a base de dados relacionais
- Controlador JDBC pode ou não continuar processando os comandos restantes do lote, dependendo de como processa o SXBD em particular estes lotes.

Se o controlador segue continuar processamento logo após um fallo, o array de contadores de atualização devolto pelo método `BatchUpdateException` contém tantos elementos como sentenças há no lote, e os valores podem ser os seguintes:

- Um número maior ou igual a zero: indica que o mandato se processou com sucesso, e o valor indica o número de filas que foram afetadas pela execução da sentença na base de dados.
- Um número igual a `Statement.SUCCESS_NO_INFO`: indica que a sentença se processou com sucesso, mas que o número de filas afetadas é desconhecido.
- Um valor de `Statement.EXECUTE_FAILED`: indica que o comando não se executou com sucesso.

Podemos utilizar o seguinte método para obter o array de contadores de
- Unidad 3: Acceso a base de datos relacionales
- Para eliminar todas las sentencias que se ejecutan con el método `addBatch`, se utiliza el comando:
  ```
  void clearBatch() throws SQLException
  ```
- No se puede eliminar selectivamente las sentencias. 
- Ver si el conectador JDBC es compatible con procesos por lotes. 
- No todos los conectores JDBC soportan el procesamiento por lotes. Podemos utilizar el método `supportsBatchUpdates` de la interfaz `DatabaseMetaData` para determinar si SXBD admite el proceso por lotes. 
- Sintaxis:
  ```
  boolean supportsBatchUpdates() throws SQLException
  ```
- El método devuelve `true` si el controlador JDBC es compatible con esta característica.
