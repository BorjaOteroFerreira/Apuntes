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
    private static final int DATABASE_VERSION = 1;
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
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Mariano', '33')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Maria', '44')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pepe', '55')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pepa', '66')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Juancho', '77')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pedrosa', '88')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Juanito', '99')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pedrito', '1010')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Juanito', '1111')");
        db.execSQL("INSERT INTO telefonos (nombre, telefono) VALUES ('Pedrito', '1212')");
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
        if (cursor != null && cursor.moveToFirst()) {
            do {
                String telefono = cursor.getString(cursor.getColumnIndexOrThrow("telefono"));
                listaTelefonos.add(new Telefono(telefono));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return listaTelefonos;
    }
}
```

## MainActivity.java

```java 
package com.example.fragmentotelefonos;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.FragmentContainerView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements onTelefonoFragmentListener {
    LinearLayout linearLayout;
    AsistenteBD asistenteBD;
    ArrayList<Telefono> telefonos = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        asistenteBD = asistenteBD.getInstance(this);

        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        linearLayout = findViewById(R.id.fragment_container);

        telefonos = asistenteBD.obtenerTelefonos(asistenteBD.getReadableDatabase());
        int num_telefonos = telefonos.size();
        Operadora operadora = new Operadora(telefonos);
        for (int i = 0; i < num_telefonos; i++) {
            FragmentContainerView container = new FragmentContainerView(this);
            container.setId(View.generateViewId());
            FragmentoTelefono fragment = new FragmentoTelefono();
            Telefono tel = telefonos.get(i);
            tel.setOperadora(operadora);
            tel.setListener(fragment);
            fragment.setListener(this , tel.getTelefono());
            getSupportFragmentManager().beginTransaction().add(container.getId(), fragment).commit();
            linearLayout.addView(container);
        }
    }

    @Override
    public Telefono obtenerTelefono(String numTelefono) {
        Telefono tel = new Telefono(numTelefono);
        int idx = telefonos.indexOf(tel);
        tel = telefonos.get(idx);
        return tel;

    }
}
```

## FragmentoTelefono.java 

```java
package com.example.fragmentotelefonos;

import android.graphics.Color;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import com.google.android.material.textfield.TextInputLayout;


public class FragmentoTelefono extends Fragment implements onTelefonoListener {

    private onTelefonoFragmentListener mListener;
    private onTelefonoAction mListenerAction;
    TextView textView ;
    Telefono telefono ;
    String numTelefono;
    ImageButton btnLlamar;
    ImageButton btnColgar;
    EditText etDestino;
    TextInputLayout textInputLayout ;

    public FragmentoTelefono() {}

    public void setListener(onTelefonoFragmentListener listener, String numTelefono) {
        mListener = listener;
        this.numTelefono = numTelefono;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        textView = view.findViewById(R.id.textView);
        btnLlamar = view.findViewById(R.id.btnLlamar);
        btnColgar = view.findViewById(R.id.btnColgar);
        etDestino = view.findViewById(R.id.etDestino);
        textInputLayout = view.findViewById(R.id.inputLayout);
        MyTextWatcher tw = new MyTextWatcher(textInputLayout);
        etDestino.addTextChangedListener(tw);
        btnLlamar.setOnClickListener(v -> {
                                            if(etDestino.getText().toString().isEmpty()){
                                                textInputLayout.setError(getString(R.string.campo_vacio));
                                                return;
                                            }
                                            telefono.llamar(etDestino.getText().toString());
                                            });
        btnColgar.setOnClickListener(v -> telefono.colgar());
        if (mListener != null) {
            this.telefono = mListener.obtenerTelefono(numTelefono);
            String telefono = this.telefono.getTelefono();
            textView.setText(telefono);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_telefono, container, false);
    }

    @Override
    public void recibirLlamada(String telefonoOrigen) {
        etDestino.setEnabled(false);
        btnLlamar.setEnabled(false);
    }

    @Override
    public void colgarIn() {
        etDestino.setEnabled(true);
        btnLlamar.setEnabled(true);
    }
}
```

## Operadora.java 

```java
package com.example.fragmentotelefonos;

import java.util.ArrayList;

public class Operadora {
     ArrayList<Telefono> telefonos;

    private  boolean comprobarTelefono(Telefono telefono){
        for (Telefono tel : telefonos) {
            if (tel.equals(telefono)) {
                return true;
            }
        }
        return false;
    }
    public Operadora(ArrayList<Telefono> telefonos) {
        this.telefonos = telefonos;
    }

    public void llamar(Telefono telefonoOrigen , String telDestino){
        Telefono telefonoDestino = new Telefono(telDestino);
        if (comprobarTelefono(telefonoDestino)) {
            int idx = telefonos.indexOf(telefonoDestino);
            telefonoDestino = telefonos.get(idx);
            if(!telefonoDestino.isOcupado()) {
                System.out.println(telefonoOrigen + " Llamando a " + telefonoDestino);
                telefonoDestino.llamadaEstablecida(telefonoOrigen.getTelefono());
                telefonoOrigen.llamadaEstablecida(null);
                telefonoOrigen.setOcupado();
                telefonoDestino.setOcupado();
            }
            else{
                System.out.println("El telefono destino esta ocupado");
            }
        } else {
            System.out.println("Llamando a numero externo");
            telefonoOrigen.setOcupado();
        }
    }

    public void colgar(String telfDestino){
        Telefono telefonoDestino = new Telefono(telfDestino);
        int idx = telefonos.indexOf(telefonoDestino);
        telefonoDestino = telefonos.get(idx);
        telefonoDestino.setLibre();
        telefonoDestino.recibirColgar();
        System.out.println("Colgando a " + telefonoDestino);
    }
}


```

## Telefono.java

```java
package com.example.fragmentotelefonos;

public class Telefono implements onTelefonoAction {
    private String telefono;
    boolean ocupado = false;
    Operadora operadora;
    String telefonoDestino;
    String telefonoOrigen;
    onTelefonoListener listener;

    public void setListener(onTelefonoListener listener) {
        this.listener = listener;
    }

    public void setOperadora(Operadora operadora) {
        this.operadora = operadora;
    }

    public Telefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTelefono() {
        return telefono;
    }

    public boolean isOcupado() {
        return ocupado;
    }

    public void setOcupado() {
        this.ocupado = true;
    }

    public void setLibre() {
        this.ocupado = false;
    }

    @Override
    public String toString() {
        return telefono;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Telefono) {
            Telefono tel = (Telefono) obj;
            return this.telefono.equals(tel.getTelefono());
        }
        return false;
    }

    @Override
    public void llamar(String telefonoDestino) {
        this.telefonoDestino = telefonoDestino;
        operadora.llamar(this, telefonoDestino);
    }

    @Override
    public void colgar() {
        if (telefonoDestino != null) {
            operadora.colgar(telefonoDestino);
            telefonoDestino = null;
        }
        else if (telefonoOrigen != null) {
            operadora.colgar(telefonoOrigen);
            telefonoOrigen = null;
        }
        listener.colgarIn();
    }

    public void llamadaEstablecida(String telefonoOrigen) {
        this.ocupado = true;
        if (listener != null) {
            listener.recibirLlamada(telefonoDestino);
        }
        this.telefonoOrigen = telefonoOrigen;
    }

    public void recibirColgar() {
        if (listener != null) {
            listener.colgarIn();
        }
    }
}


```

## OnTelefonoAction.java

**Escucha acciones del fragmento**

***Se implementa en el Telefono (modelo)  y se añade como variable de clase al fragmento para realizar el aviso a traves de la variable***
```java 
package com.example.fragmentotelefonos;

public interface onTelefonoAction {
    void llamar(String telefonoDestino);
    void colgar();

}
```

## OnTelefonoFragmentoListener.java

**Se implementa en el mainActivity y se crea una variable de clase en el fragmento para pasarle el telefono  al fragmento cuadno lo creas**

```java
package com.example.fragmentotelefonos;

public interface onTelefonoFragmentListener {
    Telefono  obtenerTelefono(String id);

}
```

## onTelefonoListener.java

**Escucha acciones del Telefono (modelo)**

***Se implementa en el fragmento y se añade como variable de clase al modelo para realizar el aviso a traves de la variable***

```java
package com.example.fragmentotelefonos;

public interface onTelefonoListener {
    void recibirLlamada(String telefonoOrigen);
    void colgarIn();
}
```