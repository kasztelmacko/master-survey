import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question_id, answer, responderId } = body;

    if (!question_id || answer === undefined || responderId === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing question_id, answer, or responderId' },
        { status: 400 }
      );
    }

    console.log('Received answer:', { question_id, answer, responderId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging answer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log answer' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const respondentId = searchParams.get('respondentId');

    if (!respondentId) {
      return NextResponse.json(
        { success: false, error: 'Missing or respondentId' },
        { status: 400 }
      );
    }

    const { data: observations, error } = await supabase
      .from('DCESurvey')
      .select(
        `
        alternative_id,
        gram,
        kcal,
        no_choice,
        price,
        question_id,
        respondent_id,
        brand_mcdonalds,
        brand_burger_king,
        brand_max_burger,
        brand_wendys,
        type_bundle_classic,
        type_bundle_premium,
        type_burger_classic,
        type_burger_premium
        `
      )
      .eq('respondent_id', respondentId);

    if (error) {
      throw error;
    }

    console.log('Fetched observations:', observations);

    if (!observations || observations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No observations found for the given respondentId and questionId' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: observations });
  } catch (error) {
    console.error('Error fetching observations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch observations' },
      { status: 500 }
    );
  }
}