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

public class MainActivity extends AppCompatActivity {
    LinearLayout linearLayout;
    AsistenteBD asistenteBD;
    onTelefonoFragmentListener telefonoListener;
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
        telefonoListener = new onTelefonoFragmentListener() {
            @Override
            public Telefono obtenerTelefono(String numTelefono) {
                Telefono tel = new Telefono(numTelefono);
                int idx = telefonos.indexOf(tel);
                tel = telefonos.get(idx);
                return tel;
            }
        };
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
            fragment.setListener(telefonoListener , tel.getTelefono());
            getSupportFragmentManager().beginTransaction().add(container.getId(), fragment).commit();
            linearLayout.addView(container);
        }
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