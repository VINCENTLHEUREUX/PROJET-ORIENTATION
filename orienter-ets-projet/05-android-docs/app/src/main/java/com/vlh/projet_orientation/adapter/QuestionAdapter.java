package com.vlh.projet_orientation.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.vlh.projet_orientation.R;
import com.vlh.projet_orientation.model.Question;

import java.util.List;

public class QuestionAdapter extends BaseAdapter
{
    private Context context;
    private List<Question> questions;

    public QuestionAdapter(Context context, List<Question> questions)
    {
        this.context = context;
        this.questions = questions;
    }

    public int getCount()
    {
        return questions.size();
    }

    public Object getItem(int position)
    {
        return questions.get(position);
    }

    public long getItemId(int position)
    {
        return questions.get(position).getId();
    }

    public View getView(int position, View convertView, ViewGroup parent)
    {
        Question question = questions.get(position);
        View view;

        if (convertView == null)
        {
            LayoutInflater inflater = LayoutInflater.from(context);
            view = inflater.inflate(R.layout.item_question, parent, false);
        }
        else
        {
            view = convertView;
        }

        TextView txtQuestion = view.findViewById(R.id.txtQuestion);
        RadioGroup radioGroup = view.findViewById(R.id.radioGroup);

        txtQuestion.setText(question.getTexte());

        // Enlève l'ancien choix
        radioGroup.setOnCheckedChangeListener(null);
        radioGroup.clearCheck();

        int points = question.getPoints();
        if (points >= 1 && points <= 5)
        {
            int radioId = getRadioButtonIdForPoints(points);
            if (radioId != -1)
            {
                radioGroup.check(radioId);
            }
        }

        radioGroup.setOnCheckedChangeListener((group, checkedId) ->
        {
            int newPoints = getPointsForRadioButtonId(checkedId);
            question.setPoints(newPoints); // Met à jour la réponse
        });

        return view;
    }

    private int getPointsForRadioButtonId(int radioButtonId)
    {
        if (radioButtonId == R.id.option1) return 1;
        else if (radioButtonId == R.id.option2) return 2;
        else if (radioButtonId == R.id.option3) return 3;
        else if (radioButtonId == R.id.option4) return 4;
        else if (radioButtonId == R.id.option5) return 5;
        else return 0;
    }

    private int getRadioButtonIdForPoints(int points)
    {
        if (points == 1) return R.id.option1;
        else if (points == 2) return R.id.option2;
        else if (points == 3) return R.id.option3;
        else if (points == 4) return R.id.option4;
        else if (points == 5) return R.id.option5;
        else return -1;
    }
}
