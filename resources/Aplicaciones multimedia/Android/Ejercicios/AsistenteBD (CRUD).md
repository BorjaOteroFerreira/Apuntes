### ClientesBD (CRUD)

**Ejemplo de un asistente bd para recuperar , actualizar , insertar y eliminar datos** 

```java 
package com.example.clientesbd.modelo;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;

public class AsistenteBD extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "clientes.db";
    private static final int DATABASE_VERSION = 2;
    private static AsistenteBD instance;

    private AsistenteBD(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    public static synchronized AsistenteBD getInstance(Context context) {
        if (instance == null) {
            instance = new AsistenteBD(context.getApplicationContext());
        }
        return instance;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        crearTablas(db);
    }

    private void crearTablas(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE clientes (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "nombre TEXT UNIQUE," +
                "apellido TEXT," +
                "provincia INTEGER," +
                "vip INTEGER," +
                "longitud TEXT," +
                "latitud TEXT," +
                "provincia_id INTEGER," +
                "FOREIGN KEY (provincia_id) REFERENCES provincias(id) )");

        db.execSQL("CREATE TABLE PROVINCIAS (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "nombre TEXT UNIQUE" +
                ")");

    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS clientes");
        onCreate(db);
    }

    public void insertarProvinciasIniciales() {
        SQLiteDatabase db = getWritableDatabase();
        String countQuery = "SELECT COUNT(*) FROM provincias";
        Cursor cursor = db.rawQuery(countQuery, null);
        cursor.moveToFirst();
        int count = cursor.getInt(0);
        cursor.close();
        if (count == 0) {
            db.execSQL("INSERT INTO provincias (nombre) VALUES ('Coruña')");
            db.execSQL("INSERT INTO provincias (nombre) VALUES ('Lugo')");
            db.execSQL("INSERT INTO provincias (nombre) VALUES ('Orense')");
            db.execSQL("INSERT INTO provincias (nombre) VALUES ('Pontevedra')");
        }
    }

    public ArrayList<Provincia> getProvincias() {
        SQLiteDatabase db = getReadableDatabase();
        String sql = "SELECT id, nombre FROM provincias"; // Ahora selecciona ambas columnas
        Cursor cursor = db.rawQuery(sql, null);
        ArrayList<Provincia> provincias = new ArrayList<>();
        if (cursor.moveToFirst()) {
            do {
                int id = cursor.getInt(0); // Columna id
                String nombre = cursor.getString(1); // Columna nombre
                provincias.add(new Provincia(id, nombre));
            } while (cursor.moveToNext());
        }
        cursor.close();
        return provincias;
    }

    public ArrayList<Cliente> getClientes() {
        SQLiteDatabase db = getReadableDatabase();
        String sql = "SELECT id, nombre, apellido, provincia, vip, longitud, latitud FROM clientes";
        Cursor cursor = db.rawQuery(sql, null);
        ArrayList<Cliente> clientes = new ArrayList<>();
        ArrayList<Integer> idProvincias = new ArrayList<>(); 
        if(cursor.moveToNext()){
         do{
             int id = cursor.getInt(0);
             String nombre = cursor.getString(1);
             String apellido = cursor.getString(2);
             int idProvincia = cursor.getInt(3);
             idProvincias.add(idProvincia);
             boolean vip = cursor.getInt(4) == 1;
             String longitud = cursor.getString(5);
             String latitud = cursor.getString(6);
             Cliente cliente = new Cliente(id, nombre, apellido, vip, longitud, latitud);
             clientes.add(cliente);
         }while(cursor.moveToNext());
         cursor.close();
         for (int i= 0 ; i < idProvincias.size(); i++)  {
             Provincia provincia = getProvinciaPorId(idProvincias.get(i));
             clientes.get(i).setProvincia(provincia);
         }
        }
        else{ System.out.println("No hay clientes"); }
        return clientes;
    }

    public Cliente getClientePorId( int idCliente) {
        SQLiteDatabase db = getReadableDatabase();
        String query = "SELECT * FROM clientes WHERE id = " + idCliente;
        Cursor cursor = db.rawQuery(query, null);
        cursor.moveToFirst();
        int id = cursor.getInt(0);
        String nombre = cursor.getString(1);
        String apellido = cursor.getString(2);
        int idProvincia = cursor.getInt(3);
        boolean vip = cursor.getInt(4) == 1;
        String longitud = cursor.getString(5);
        String latitud = cursor.getString(6);
        Provincia provincia = getProvinciaPorId(idProvincia);
        Cliente cliente = new Cliente(id, nombre, apellido, provincia, vip, longitud, latitud);
        cursor.close();
        return cliente;
    }

    public Provincia getProvinciaPorId(int idProvincia) {
        SQLiteDatabase db = getReadableDatabase();
        String query = "SELECT * FROM provincias WHERE id = " + idProvincia;
        Cursor cursor = db.rawQuery(query, null);
        cursor.moveToFirst();
        int id = cursor.getInt(0);
        String nombre = cursor.getString(1);
        Provincia provincia = new Provincia(id, nombre);
        cursor.close();
        return provincia;
    }

    public void addCliente(Cliente cliente) {
        this.getWritableDatabase().execSQL("INSERT INTO clientes " +
                "(nombre, apellido, provincia, vip, longitud, latitud) " +
                "VALUES ('" + cliente.getNombre() + "', '" +
                cliente.getApellido() + "', '" +
                cliente.getProvincia().getId() + "', " +
                cliente.isVip() + ", '" +
                cliente.getLongitud() + "', '" +
                cliente.getLatitud() + "')");
    }

    public void updateCliente(Cliente cliente) {
        SQLiteDatabase db = getWritableDatabase();
        db.execSQL("UPDATE clientes SET nombre = '" +
                cliente.getNombre() + "', " +
                "apellido = '" + cliente.getApellido() + "', " +
                "provincia = '" + cliente.getProvincia().getId() + "', " +
                "vip = " + cliente.isVip() + ", " +
                "longitud = '" + cliente.getLongitud() + "', " +
                "latitud = '" + cliente.getLatitud() + "' " +
                "WHERE id = " + cliente.getId());
    }

    public void deleteCliente(Cliente cliente) {
        SQLiteDatabase db = getWritableDatabase();
        db.execSQL("DELETE FROM clientes WHERE id = " + cliente.getId());
    }
}
```

# COMPILADAS 

**compilando parametros y argumentos** 

```java 
package com.example.login.modelo;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;

public class AsistenteBD extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "usaurios.db";
    private static final int DATABASE_VERSION = 4;
    private static  AsistenteBD instance = null;

    public AsistenteBD(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    public static synchronized AsistenteBD getInstance(Context context) {
        if (instance == null) {
            instance = new AsistenteBD(context);
        }
        return instance;
    }

    public ArrayList<String> getUsuarioYPass(String usuario) {
        SQLiteDatabase db = getWritableDatabase();
        ArrayList<String> datos = new ArrayList<>();
        String[] campos = new String[]{"nombre", "password","salt"};
        String where = "nombre = ? ";
        String[] args = new String[]{usuario};
        Cursor cursor = db.query("usuarios", campos, where, args, null, null,
                                                                        null, null);
        if (cursor.moveToFirst()) {
            do {
                datos.add(cursor.getString(0));
                datos.add(cursor.getString(1));
                datos.add(cursor.getString(2));
            } while (cursor.moveToNext());
        }
        cursor.close();
        return datos;
    }

    public void registrarUsuario(String nombre, String apellido, String email, String password) {
        SQLiteDatabase db = getWritableDatabase();
        // Generar un salt único para el usuario
        String salt = PasswordHasher.generarSalt();  // Método para generar un salt aleatorio
        // Hashear la contraseña con el salt
        String hashedPassword = PasswordHasher.hashPassword(password, salt);
        // Guardar el usuario en la base de datos (nombre, apellido, email, hashedPassword y salt)
        db.execSQL("INSERT INTO usuarios (nombre, apellido, email, password, salt) VALUES ('"
                + nombre + "', '"
                + apellido + "', '"
                + email + "', '"
                + hashedPassword + "', '"
                + salt + "')");
    }

    public void insertarUsuarioInicial() {
        SQLiteDatabase db = getWritableDatabase();
        String countQuery = "SELECT COUNT(*) FROM usuarios";
        Cursor cursor = db.rawQuery(countQuery, null);
        cursor.moveToFirst();
        int count = cursor.getInt(0);
        cursor.close();
        if (count == 0) {
            String salt = PasswordHasher.generarSalt();
            String pass = PasswordHasher.hashPassword("admin123",salt);

            db.execSQL("INSERT INTO usuarios (nombre, " +
                    "apellido, " +
                    "email, " +
                    "password) VALUES ('admin', " +
                    "'adminApellido', " +
                    "'admin@admin', '" + pass + "',  + '"+ salt + "'+)");
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE usuarios (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "nombre TEXT UNIQUE NOT NULL," +
                "apellido TEXT," +
                "email TEXT UNIQUE NOT NULL," +
                "password TEXT NOT NULL," +
                "salt TEXT NOT NULL" +
                ")");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS usuarios");
        onCreate(db);
    }
}

```
