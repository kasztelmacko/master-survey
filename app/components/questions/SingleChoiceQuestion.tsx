'use client';

import { useState } from 'react';
import type { SingleChoiceQuestion } from "@/app/types";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion;
  onAnswer: (answer: string) => void;
}

export default function SingleChoiceQuestion({ question, onAnswer }: SingleChoiceQuestionProps) {
  const layout = question.layout || 'vertical';
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>

      {/* Options */}
      <div className={layout === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'}>
        {question.options.map((option, index) => (
          <div
            key={option.id}
            className={
              layout === 'horizontal'
                ? `flex items-center gap-2 p-4 border rounded-lg hover:bg-background cursor-pointer ${
                    selectedAnswer === option.id ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
                : `flex items-center gap-2 p-4 border rounded-lg hover:bg-background cursor-pointer ${
                    selectedAnswer === option.id ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
            }
            onClick={() => handleAnswer(option.id)}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 border-2 rounded-lg font-semibold ${
                selectedAnswer === option.id
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 text-text'
              }`}
            >
              {getOptionLetter(index)}
            </div>

            {/* Option label */}
            <label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer text-text">
              {option.component ? option.component : option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}