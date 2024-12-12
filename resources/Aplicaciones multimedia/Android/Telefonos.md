## AsistenteBD.java 

```java
package com.example.fragmentotelefonos;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;

public class  AsistenteBD extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "telefonos.db";
    private static final int DATABASE_VERSION = 3;
    private static AsistenteBD instance;

    private AsistenteBD(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    public static synchronized AsistenteBD getInstance(Context context) {
        if (instance == null) {
            instance = new AsistenteBD(context);
        }
        return instance;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE telefonos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT)");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Juan', '11')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pedro', '22')");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS telefonos");
        db.execSQL("CREATE TABLE telefonos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT)");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Juan', '11')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pedro', '22')");
    }

    public ArrayList<Telefono> obtenerTelefonos(SQLiteDatabase db) {
        ArrayList<Telefono> listaTelefonos = new ArrayList<>();
        Cursor cursor = db.rawQuery("SELECT nombre, telefono FROM telefonos", null);
        if (cursor!= null && cursor.moveToFirst()) {
            do {
                String nombre = cursor.getString(cursor.getColumnIndexOrThrow("nombre"));
                String telefono = cursor.getString(cursor.getColumnIndexOrThrow("telefono"));
                listaTelefonos.add(new Telefono(nombre, telefono));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return listaTelefonos;
    }
}
```