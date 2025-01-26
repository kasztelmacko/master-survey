import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question_id, answer } = body;

    if (!question_id || answer === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing question_id or answer' },
        { status: 400 }
      );
    }

    console.log('Received answer:', { question_id, answer });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging answer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log answer' },
      { status: 500 }
    );
  }
}

// export async function GET(request: Request) {
//   try {
//     // Extract query parameters
//     const { searchParams } = new URL(request.url);
//     const questionId = searchParams.get('questionId');
//     const respondentId = searchParams.get('respondentId');

//     // Validate input
//     if (!questionId || !respondentId) {
//       return NextResponse.json(
//         { success: false, error: 'Missing questionId or respondentId' },
//         { status: 400 }
//       );
//     }

//     // Fetch rows from Supabase based on respondentId and questionId
//     const { data: observations, error } = await supabase
//       .from('CBCSurvey') // Replace with your table name
//       .select('*') // Fetch all columns
//       .eq('respondent_id', respondentId) // Filter by respondent_id
//       .eq('question_id', questionId); // Filter by question_id

//     if (error) {
//       throw error;
//     }

//     console.log('Fetched observations:', observations);

//     // Check if observations were found
//     if (!observations || observations.length === 0) {
//       return NextResponse.json(
//         { success: false, error: 'No observations found for the given respondentId and questionId' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: observations });
//   } catch (error) {
//     console.error('Error fetching observations:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch observations' },
//       { status: 500 }
//     );
//   }
// }