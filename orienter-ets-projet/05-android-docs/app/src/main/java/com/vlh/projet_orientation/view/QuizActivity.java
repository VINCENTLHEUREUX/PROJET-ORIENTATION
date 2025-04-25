package com.vlh.projet_orientation.view;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;



import com.google.gson.Gson;
import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.adapter.QuestionAdapter;
import com.vlh.projet_orientation.model.Question;
import com.vlh.projet_orientation.model.ResultatRequest;
import com.vlh.projet_orientation.network.ApiService;
import com.vlh.projet_orientation.network.RetrofitClient;
import com.vlh.projet_orientation.utils.QuestionBank;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class QuizActivity extends AppCompatActivity
{
    private ListView listView;
    private Button btnSuivant, btnPrecedent;

    private List<Question> allQuestions;
    private List<Question> currentBatch;
    private int currentIndex = 0;
    private QuestionAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);

        listView = findViewById(R.id.listQuestions);
        btnSuivant = findViewById(R.id.btnSuivant);
        btnPrecedent = findViewById(R.id.btnPrecedent);

        allQuestions = QuestionBank.getQuestions();
        currentBatch = new ArrayList<>();

        adapter = new QuestionAdapter(this, currentBatch);
        listView.setAdapter(adapter);

        loadNextFiveQuestions();

        btnPrecedent.setOnClickListener(v ->
        {
            if (currentIndex > 5)
            {
                currentIndex = Math.max(0, currentIndex - 10);
                loadNextFiveQuestions();
            }
            else
            {
                Toast.makeText(this, "Vous êtes au début du quiz.", Toast.LENGTH_SHORT).show();
            }
        });

        btnSuivant.setOnClickListener(v ->
        {
            if (currentIndex < allQuestions.size())
            {
                loadNextFiveQuestions();
            }
            else
            {
                Toast.makeText(this, "🎉 Toutes les questions ont été répondues !", Toast.LENGTH_LONG).show();
                envoyerResultatAuServeur();
            }
        });
    }

    private void loadNextFiveQuestions()
    {
        currentBatch.clear();

        int endIndex = Math.min(currentIndex + 5, allQuestions.size());
        for (int i = currentIndex; i < endIndex; i++)
        {
            currentBatch.add(allQuestions.get(i));
        }

        adapter.notifyDataSetChanged();
        currentIndex = endIndex;

        // Affiche ou cache le bouton précédent
        btnPrecedent.setVisibility(currentIndex <= 5 ? View.GONE : View.VISIBLE);

        btnSuivant.setText(currentIndex >= allQuestions.size() ? "Terminer" : "Suivant");
    }

    private void envoyerResultatAuServeur()
    {
        SharedPreferences prefs = getSharedPreferences("APP_PREFS", MODE_PRIVATE);
        String token = prefs.getString("authToken", null);

        if (token == null)
        {
            Toast.makeText(this, "Erreur : token non trouvé", Toast.LENGTH_SHORT).show();
            return;
        }

        // Calcul des scores par catégorie
        int resultatLOG = 0, resultatELE = 0, resultatMEC = 0, resultatGPA = 0;
        int resultatGTI = 0, resultatAER = 0, resultatCTN = 0, resultatGOL = 0;

        for (Question question : allQuestions)
        {
            int points = question.getPoints();
            String cat = question.getCategorie().toLowerCase();

            switch (cat)
            {
                case "ctn":
                case "genie_construction": resultatCTN += points; break;

                case "ele":
                case "genie_electrique": resultatELE += points; break;

                case "gol":
                case "genie_operations_logistique":
                case "logi": resultatGOL += points; break;

                case "gpa":
                case "genie_production_automatisee": resultatGPA += points; break;

                case "gti":
                case "genie_technologies_information": resultatGTI += points; break;

                case "log":
                case "genie_logiciel": resultatLOG += points; break;

                case "mec":
                case "genie_mecanique": resultatMEC += points; break;

                case "aer":
                case "genie_aerospatial": resultatAER += points; break;

                default:
                    Log.w("UNKNOWN_CAT", "Catégorie inconnue : " + cat);
            }
        }

        ResultatRequest request = new ResultatRequest();
        request.setToken(token);
        request.setResultatGOL(resultatGOL);
        request.setResultatELE(resultatELE);
        request.setResultatMEC(resultatMEC);
        request.setResultatLOG(resultatLOG);
        request.setResultatAER(resultatAER);
        request.setResultatCTN(resultatCTN);
        request.setResultatGPA(resultatGPA);
        request.setResultatGTI(resultatGTI);

        ApiService api = RetrofitClient.getClient(getApplicationContext()).create(ApiService.class);

        api.envoyerResultat(request).enqueue(new Callback<Void>()
        {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response)
            {
                if (response.isSuccessful())
                {
                    ResultatRequest getRequest = new ResultatRequest();
                    getRequest.setToken(token);

                    Log.d("RESULTS", "📤 JSON envoyé : " + new Gson().toJson(request));

                    api.getResultat(getRequest).enqueue(new Callback<com.vlh.projet_orientation.model.ResultatResponse>()
                    {
                        @Override
                        public void onResponse(Call<com.vlh.projet_orientation.model.ResultatResponse> call, Response<com.vlh.projet_orientation.model.ResultatResponse> response2)
                        {
                            if (response2.isSuccessful() && response2.body() != null)
                            {
                                Intent intent = new Intent(QuizActivity.this, MesResultatsActivity.class);
                                intent.putExtra("resultat", response2.body());
                                startActivity(intent);
                                finish();
                            }
                            else
                            {
                                Toast.makeText(QuizActivity.this, "Erreur de récupération des résultats", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<com.vlh.projet_orientation.model.ResultatResponse> call, Throwable t)
                        {
                            Toast.makeText(QuizActivity.this, "Erreur réseau lors de la récupération", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
                else
                {
                    Toast.makeText(QuizActivity.this, "❌ Erreur lors de l'envoi : " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t)
            {
                Toast.makeText(QuizActivity.this, "Erreur réseau : " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
