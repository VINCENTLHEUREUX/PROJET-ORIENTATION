package com.vlh.projet_orientation.view;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.model.LoginResponse;
import com.vlh.projet_orientation.model.User;
import com.vlh.projet_orientation.network.ApiService;
import com.vlh.projet_orientation.network.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ConnexionActivity extends AppCompatActivity
{
    private EditText inputEmail, inputPassword;
    private Button btnConnexion;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connexion);

        inputEmail = findViewById(R.id.inputEmail);
        inputPassword = findViewById(R.id.inputPassword);
        btnConnexion = findViewById(R.id.btnConnexion);
        Button btnVersInscription = findViewById(R.id.btnVersInscription);

        btnVersInscription.setOnClickListener(v ->
        {
            Intent intent = new Intent(ConnexionActivity.this, InscriptionActivity.class);
            startActivity(intent);
        });

        btnConnexion.setOnClickListener(view ->
        {
            String email = inputEmail.getText().toString().trim();
            String password = inputPassword.getText().toString().trim();

            if (email.isEmpty() || password.isEmpty())
            {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show();
                return;
            }

            // Création de l'utilisateur à partir des champs
            User user = new User(email, password);
            ApiService apiService = RetrofitClient.getClient(getApplicationContext()).create(ApiService.class);
            Call<LoginResponse> call = apiService.loginUser(user);

            call.enqueue(new Callback<LoginResponse>()
            {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response)
                {
                    Log.d("LOGIN", "Code HTTP : " + response.code());

                    if (response.isSuccessful() && response.body() != null)
                    {
                        String token = response.body().getAuthToken();

                        if (token != null && !token.isEmpty())
                        {
                            // Sauvegarde du token pour les prochaines requêtes
                            SharedPreferences prefs = getSharedPreferences("APP_PREFS", MODE_PRIVATE);
                            prefs.edit().putString("authToken", token).apply();

                            Toast.makeText(ConnexionActivity.this, "Connexion réussie", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(ConnexionActivity.this, MainActivity.class));
                            finish();
                        }
                        else
                        {
                            Toast.makeText(ConnexionActivity.this, "Token manquant", Toast.LENGTH_SHORT).show();
                        }
                    }
                    else
                    {
                        Toast.makeText(ConnexionActivity.this, "Échec de la connexion (" + response.code() + ")", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t)
                {
                    Toast.makeText(ConnexionActivity.this, "Erreur réseau : " + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        });
    }
}
