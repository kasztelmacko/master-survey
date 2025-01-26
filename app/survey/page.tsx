'use client';

import { useState } from 'react';
import { questions } from '../data/questions';
import QuestionRenderer from '../components/questions/QuestionRenderer';

export default function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | null>(null);
  const [allLogosAnswered, setAllLogosAnswered] = useState(false);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setCurrentAnswer(answer);
  };

  const handleAllLogosAnswered = (allAnswered: boolean) => {
    setAllLogosAnswered(allAnswered);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer);

      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(null);
      setAllLogosAnswered(false);
    } else {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer);
      alert('Survey completed!');
      console.log('Survey Answers:', answers);
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
            disabled={isNextButtonDisabled}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Wyślij' : 'Dalej'}
          </button>
        </div>
      </div>
    </div>
  );
}

async function logAnswer(question_id: string, answer: string | string[] | null) {
  try {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_id, answer }),
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