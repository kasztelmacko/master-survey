import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { questions } from '@/app/data/questions';

export async function POST(req: NextRequest) {
  const { responderId, answers } = await req.json();

  console.log('Received payload:', { responderId, answers });

  try {
    const questionNameMap = Object.fromEntries(questions.map(q => [q.id, q.name]));

    const insertData = {
      respondent_id: responderId,
      ...Object.fromEntries(
        Object.entries(answers).map(([questionId, answer]) => [
          questionNameMap[questionId],
          Array.isArray(answer) ? JSON.stringify(answer) : answer,
        ])
      ),
    };

    console.log('Data to be inserted:', insertData);

    const { error } = await supabase
      .from('SurveyResults')
      .insert([insertData]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Survey submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Failed to submit survey' }, { status: 500 });
  }
}