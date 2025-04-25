package com.vlh.projet_orientation.view;

import android.content.Intent;
import android.os.Bundle;
import android.util.Patterns;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.vlh.projet_orientation.model.InscriptionUser;
import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.network.ApiService;
import com.vlh.projet_orientation.network.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class InscriptionActivity extends AppCompatActivity
{
    private EditText inputPrenom, inputNom, inputEmail, inputPassword;
    private Button btnInscription, btnConnexion;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inscription);

        inputPrenom = findViewById(R.id.inputPrenom);
        inputNom = findViewById(R.id.inputNom);
        inputEmail = findViewById(R.id.inputEmail);
        inputPassword = findViewById(R.id.inputPassword);
        btnInscription = findViewById(R.id.btnInscription);
        btnConnexion = findViewById(R.id.btnVersConnexion);

        btnConnexion.setOnClickListener(v ->
        {
            startActivity(new Intent(this, ConnexionActivity.class));
            finish();
        });

        btnInscription.setOnClickListener(v ->
        {
            String prenom = inputPrenom.getText().toString().trim();
            String nom = inputNom.getText().toString().trim();
            String email = inputEmail.getText().toString().trim();
            String password = inputPassword.getText().toString();

            if (prenom.isEmpty() || nom.isEmpty() || email.isEmpty() || password.isEmpty())
            {
                Toast.makeText(this, "Tous les champs sont requis", Toast.LENGTH_SHORT).show();
                return;
            }

            if (!Patterns.EMAIL_ADDRESS.matcher(email).matches())
            {
                Toast.makeText(this, "Email invalide", Toast.LENGTH_SHORT).show();
                return;
            }

            // Création de l'utilisateur à envoyer au serveur
            InscriptionUser newUser = new InscriptionUser(prenom, nom, email, password);

            ApiService api = RetrofitClient.getClient(getApplicationContext()).create(ApiService.class);
            api.createUser(newUser).enqueue(new Callback<Void>()
            {
                @Override
                public void onResponse(Call<Void> call, Response<Void> response)
                {
                    if (response.isSuccessful())
                    {
                        Toast.makeText(InscriptionActivity.this, "Compte créé avec succès", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(InscriptionActivity.this, ConnexionActivity.class));
                        finish();
                    }
                    else if (response.code() == 409)
                    {
                        Toast.makeText(InscriptionActivity.this, "Un compte avec cet email existe déjà", Toast.LENGTH_SHORT).show();
                    }
                    else if (response.code() == 400)
                    {
                        Toast.makeText(InscriptionActivity.this, "Mot de passe trop faible ou email invalide", Toast.LENGTH_SHORT).show();
                    }
                    else
                    {
                        Toast.makeText(InscriptionActivity.this, "Erreur serveur : " + response.code(), Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t)
                {
                    Toast.makeText(InscriptionActivity.this, "Erreur réseau : " + t.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        });
    }
}
