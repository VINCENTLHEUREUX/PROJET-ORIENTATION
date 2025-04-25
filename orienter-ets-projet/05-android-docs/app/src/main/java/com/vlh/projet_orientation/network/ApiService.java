package com.vlh.projet_orientation.network;

import com.vlh.projet_orientation.model.InscriptionUser;
import com.vlh.projet_orientation.model.LoginResponse;
import com.vlh.projet_orientation.model.QuestionsResponse;
import com.vlh.projet_orientation.model.ResultatRequest;
import com.vlh.projet_orientation.model.ResultatResponse;
import com.vlh.projet_orientation.model.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
public interface ApiService
{
    @POST("user/login")
    Call<LoginResponse> loginUser(@Body User user);

    @GET("questions")
    Call<QuestionsResponse> getQuestions();

    // Envoie les scores après le quiz
    @POST("/nextgen/result")
    Call<Void> envoyerResultat(@Body ResultatRequest request);

    // Récupère les scores précédents pour un utilisateur
    @POST("/nextgen/results")
    Call<ResultatResponse> getResultat(@Body ResultatRequest request);

    @POST("/nextgen/user")
    Call<Void> createUser(@Body InscriptionUser user);
}
