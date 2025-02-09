'use client';

import { useState, useCallback, useEffect  } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '../data/questions';
import QuestionRenderer from '../components/questions/QuestionRenderer';

export default function Survey() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | null>(null);
  const [allAnswersProvided, setAllAnswersProvided] = useState(false);
  const [responderId, setResponderId] = useState<number | null>(null);

  useEffect(() => {
    const storedResponderId = localStorage.getItem('responderId');
    if (storedResponderId) {
      setResponderId(Number(storedResponderId));
    } else {
      console.error('Responder ID not found in localStorage');
    }
  }, []);

  const handleAnswer = useCallback((questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setCurrentAnswer(answer);
  }, []);

  const handleAllAnswersProvided = useCallback((allAnswered: boolean) => {
    setAllAnswersProvided(allAnswered);
  }, []);

  const handleNext = async () => {
    if (responderId === null) {
      console.error('Responder ID is null');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      await logAnswer(questions[currentQuestionIndex].id, currentAnswer, responderId);
  
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(null);
      setAllAnswersProvided(false);
    } else {
      if (currentAnswer !== null) {
        await logAnswer(questions[currentQuestionIndex].id, currentAnswer, responderId);
      }
      await updateResponderStatus(responderId, 'finished');
      router.push('/end');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const isNextButtonDisabled =
  currentQuestion.type === 'multiple-input' || currentQuestion.type === 'dce'
    ? !allAnswersProvided
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
          onAllAnswered={handleAllAnswersProvided}
        />

        {/* Navigation Buttons */}
        <div className="flex w-full max-w-2xl mx-auto justify-end">
          {/* Show "Dalej" button for all questions except the last DCE question */}
          {!isLastQuestion && (
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
                isNextButtonDisabled ? 'invisible' : ''
              }`}
            >
              Dalej
            </button>
          )}

          {/* Show "Wyślij" button for the last question */}
          {isLastQuestion && (
            <button
              onClick={handleNext}
              className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
                isNextButtonDisabled ? 'invisible' : ''
              }`}
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

async function updateResponderStatus(responderId: number, status: string) {
  try {
    const response = await fetch('/api/updateResponderStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responderId, status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update responder status');
    }

    const data = await response.json();
    console.log('Responder status updated successfully:', data);
  } catch (error) {
    console.error('Error updating responder status:', error);
  }
}
