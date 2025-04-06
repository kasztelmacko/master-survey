import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const randomId = Math.floor(Math.random() * 200) + 1;

    const { data: responders, error: fetchError } = await supabase
      .from('respondent_ids')
      .select('respondent_id')
      .eq('status', 'free')
      .eq('respondent_id', randomId)
      .limit(1);

    if (fetchError) {
      throw fetchError;
    }

    if (!responders || responders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No free responder IDs available' },
        { status: 404 }
      );
    }

    const responderId = responders[0].respondent_id;

    return NextResponse.json({ success: true, responderId });
  } catch (error) {
    console.error('Error fetching responder ID:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}