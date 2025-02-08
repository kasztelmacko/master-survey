import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const { responderId, status } = await request.json();

  if (!responderId || !status) {
    return NextResponse.json(
      { success: false, error: 'Missing responderId or status' },
      { status: 400 }
    );
  }

  const changeTimestamp = new Date().toISOString();
  console.log('Updating responder status:', { responderId, status, changeTimestamp });

  try {
    const { error } = await supabase
      .from('respondent_ids')
      .update({ status, change_timestampz: changeTimestamp })
      .eq('respondent_id', responderId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating responder status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update responder status' },
      { status: 500 }
    );
  }
}