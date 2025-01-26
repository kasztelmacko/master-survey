'use client';

import { useState } from 'react';
import type { MultipleChoiceQuestion } from '@/app/types';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
  onAnswer: (answers: string[]) => void;
}

export default function MultipleChoiceQuestion({ question, onAnswer }: MultipleChoiceQuestionProps) {
  const layout = question.layout || 'vertical';
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(question.answers || []);

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  const handleChange = (optionId: string, isChecked: boolean) => {
    const updatedAnswers = isChecked
      ? [...selectedAnswers, optionId]
      : selectedAnswers.filter((id) => id !== optionId);

    setSelectedAnswers(updatedAnswers);
    onAnswer(updatedAnswers);
  };

  return (
    <div className="space-y-4">
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
                    selectedAnswers.includes(option.id) ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
                : `flex items-center gap-2 p-4 border rounded-lg hover:bg-background cursor-pointer ${
                    selectedAnswers.includes(option.id) ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
            }
            onClick={() => handleChange(option.id, !selectedAnswers.includes(option.id))}
          >
            {/* Option Letter */}
            <div
              className={`flex items-center justify-center w-8 h-8 border-2 rounded-lg font-semibold ${
                selectedAnswers.includes(option.id)
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 text-text'
              }`}
            >
              {getOptionLetter(index)}
            </div>

            {/* Option Label */}
            <label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer text-text">
              {option.label}
            </label>

            {/* Hidden Checkbox */}
            <input
              type="checkbox"
              id={option.id}
              name={question.id}
              value={option.id}
              checked={selectedAnswers.includes(option.id)}
              onChange={(e) => handleChange(option.id, e.target.checked)}
              className="hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
}