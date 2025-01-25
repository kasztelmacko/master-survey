import { NextResponse } from 'next/server';

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