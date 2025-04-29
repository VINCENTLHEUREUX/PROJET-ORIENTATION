package com.vlh.projet_orientation.view;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;


import com.google.gson.Gson;
import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.model.ResultatRequest;
import com.vlh.projet_orientation.model.ResultatResponse;
import com.vlh.projet_orientation.network.ApiService;
import com.vlh.projet_orientation.network.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity
{
    private Button btnCommencerQuiz;
    private Button btnVoirResultats;

    private Button btnDeconnexion;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnDeconnexion = findViewById(R.id.btnDeconnexion);
        btnCommencerQuiz = findViewById(R.id.btnCommencerQuiz);
        btnVoirResultats = findViewById(R.id.btnVoirResultats);

        btnDeconnexion.setOnClickListener(v -> {
            // Efface le token enregistré
            SharedPreferences prefs = getSharedPreferences("APP_PREFS", MODE_PRIVATE);
            prefs.edit().remove("authToken").apply();

            // Redirige vers l'écran de connexion
            Intent intent = new Intent(MainActivity.this, ConnexionActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK); // supprime l'historique
            startActivity(intent);
        });

        btnCommencerQuiz.setOnClickListener(view ->
        {
            Intent intent = new Intent(MainActivity.this, QuizActivity.class);
            startActivity(intent);
        });

        btnVoirResultats.setOnClickListener(view ->
        {
            // Récupère le token sauvegardé
            SharedPreferences prefs = getSharedPreferences("APP_PREFS", MODE_PRIVATE);
            String token = prefs.getString("authToken", null);

            if (token == null)
            {
                Toast.makeText(this, "Utilisateur non connecté", Toast.LENGTH_SHORT).show();
                return;
            }

            ApiService api = RetrofitClient.getClient(getApplicationContext()).create(ApiService.class);
            ResultatRequest request = new ResultatRequest(token);

            api.getResultat(request).enqueue(new Callback<ResultatResponse>()
            {
                @Override
                public void onResponse(Call<ResultatResponse> call, Response<ResultatResponse> response)
                {
                    if (response.isSuccessful() && response.body() != null)
                    {
                        Intent intent = new Intent(MainActivity.this, MesResultatsActivity.class);
                        intent.putExtra("resultat", response.body());

                        // Pour voir les données reçues dans le logcat
                        Log.d("DEBUG", "Résultat brut reçu : " + new Gson().toJson(response.body()));

                        startActivity(intent);
                    }
                    else
                    {
                        Toast.makeText(MainActivity.this, "Aucun résultat trouvé", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<ResultatResponse> call, Throwable t)
                {
                    Toast.makeText(MainActivity.this, "Erreur réseau", Toast.LENGTH_SHORT).show();
                }
            });
        });
    }
}
