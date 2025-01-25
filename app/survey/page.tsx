'use client';

import { useState } from 'react';
import { questions } from '../data/questions';
import QuestionRenderer from '../components/QuestionRenderer';

export default function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | null>(null);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setCurrentAnswer(answer);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer);

      // Move to the next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(null);
    } else {
      // If it's the last question, submit the survey
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer);
      alert('Survey completed!');
      console.log('Survey Answers:', answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress Indicator */}
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {/* Current Question */}
        <QuestionRenderer
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
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