'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '../data/questions';
import QuestionRenderer from '../components/questions/QuestionRenderer';

export default function Survey() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [dceAnswers, setDceAnswers] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | null>(null);
  const [dceCompleted, setDceCompleted] = useState(false);
  const [allLogosAnswered, setAllLogosAnswered] = useState(false);

  const responderId = 1;

  useEffect(() => {
    if (currentAnswer && questions[currentQuestionIndex].type === 'dce') {
      setDceCompleted(true);
    }
  }, [currentAnswer, currentQuestionIndex]);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (questionId.startsWith('dce')) {
      setDceAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }

    setCurrentAnswer(answer);
  };

  const handleAllLogosAnswered = (allAnswered: boolean) => {
    setAllLogosAnswered(allAnswered);
  };

  const handleDCECompleted = (completed: boolean) => {
    if (currentQuestion.type === 'dce' && completed) {
      setDceCompleted(true);
    }
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
    currentQuestion.type === 'multiple-input'
      ? !allLogosAnswered
      : currentQuestion.type === 'dce'
      ? currentQuestionIndex !== questions.length - 1 && !dceCompleted
      : !currentAnswer;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full space-y-8">
        {/* Progress Indicator */}
        <div className="text-sm text-text/80 max-w-2xl mx-auto">
          Pytanie {currentQuestionIndex + 1} na {questions.length}
        </div>

        {/* Current Question */}
        <QuestionRenderer
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
          onAllAnswered={handleAllLogosAnswered}
          onDCECompleted={handleDCECompleted}
        />

        {/* Navigation Buttons */}
        <div className="flex w-full max-w-2xl mx-auto justify-end">
          {(!isLastQuestion && currentQuestion.type !== 'dce') && (
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
                isNextButtonDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              disabled={isNextButtonDisabled}
            >
              Dalej
            </button>
          )}

          {/* Show only when it's the final DCE question */}
          {currentQuestion.type === 'dce' && isLastQuestion && dceCompleted && (
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity`}
            >
              Dalej
            </button>
          )}

          {isLastQuestion && currentQuestion.type !== 'dce' && (
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
                isNextButtonDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              disabled={isNextButtonDisabled}
            >
              Wyślij
            </button>
          )}
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
