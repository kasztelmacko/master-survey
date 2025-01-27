'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '../data/questions';
import QuestionRenderer from '../components/questions/QuestionRenderer';

export default function Survey() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | null>(null);
  const [allLogosAnswered, setAllLogosAnswered] = useState(false);

  const responderId = 1;

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setCurrentAnswer(answer);
  };

  const handleAllLogosAnswered = (allAnswered: boolean) => {
    setAllLogosAnswered(allAnswered);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer, responderId);

      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(null);
      setAllLogosAnswered(false);
    } else {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer, responderId);
      router.push('/end');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const isNextButtonDisabled =
    currentQuestion.type === 'multiple-input' ? !allLogosAnswered : !currentAnswer;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress Indicator */}
        <div className="text-sm text-text/80">
          Pytanie {currentQuestionIndex + 1} na {questions.length}
        </div>

        {/* Current Question */}
        <QuestionRenderer
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
          onAllAnswered={handleAllLogosAnswered}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
              isNextButtonDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            disabled={isNextButtonDisabled}
          >
            {isLastQuestion ? 'Wyślij' : 'Dalej'}
          </button>
        </div>
      </div>
    </div>
  );
}

async function logAnswer(question_id: string, answer: string | string[] | null, responderId: number) {
  try {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_id, answer, responderId }),
    });

    if (!response.ok) {
      throw new Error('Failed to log answer');
    }

    const data = await response.json();
    console.log('Answer logged successfully:', data);
  } catch (error) {
    console.error('Error logging answer:', error);
  }
}