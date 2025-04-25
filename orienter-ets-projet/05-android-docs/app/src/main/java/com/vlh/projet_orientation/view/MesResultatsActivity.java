package com.vlh.projet_orientation.view;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.model.ResultatResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MesResultatsActivity extends AppCompatActivity
{
    private ListView listeMesResultats;
    private Button btnRetourAccueil;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mes_resultats);

        listeMesResultats = findViewById(R.id.listeMesResultats);
        btnRetourAccueil = findViewById(R.id.btnRetourAccueil);

        // On récupère les résultats envoyés depuis l'écran précédent
        ResultatResponse resultat = (ResultatResponse) getIntent().getSerializableExtra("resultat");

        if (resultat == null)
        {
            Toast.makeText(this, "❌ Aucun résultat à afficher", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        Map<String, String> noms = new HashMap<>();
        noms.put("GOL", "Génie logiciel");
        noms.put("MEC", "Génie mécanique");
        noms.put("ELE", "Génie électrique");
        noms.put("GPA", "Production automatisée");
        noms.put("GTI", "Technologies de l'information");
        noms.put("CTN", "Génie de la construction");
        noms.put("AER", "Génie aérospatial");

        // Création de la liste à afficher dans la ListView
        ArrayList<String> liste = new ArrayList<>();
        liste.add("🧠 " + noms.get("GOL") + " : " + resultat.getResultatGOL() + " points");
        liste.add("🧠 " + noms.get("MEC") + " : " + resultat.getResultatMEC() + " points");
        liste.add("🧠 " + noms.get("ELE") + " : " + resultat.getResultatELE() + " points");
        liste.add("🧠 " + noms.get("GPA") + " : " + resultat.getResultatGPA() + " points");
        liste.add("🧠 " + noms.get("GTI") + " : " + resultat.getResultatGTI() + " points");
        liste.add("🧠 " + noms.get("CTN") + " : " + resultat.getResultatCTN() + " points");
        liste.add("🧠 " + noms.get("AER") + " : " + resultat.getResultatAER() + " points");

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, liste);
        listeMesResultats.setAdapter(adapter);

        btnRetourAccueil.setOnClickListener(v ->
        {
            startActivity(new Intent(this, MainActivity.class));
            finish();
        });
    }
}
