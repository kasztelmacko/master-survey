'use client';

import type { SingleChoiceQuestion } from '../types';

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion;
  onAnswer: (answer: string) => void;
}

export default function SingleChoiceQuestion({ question, onAnswer }: SingleChoiceQuestionProps) {
  const layout = question.layout || 'vertical';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <div className={layout === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'}>
        {question.options.map((option) => (
          <div
            key={option.id}
            className={layout === 'horizontal' ? 'flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50' : 'flex items-center gap-2'}
          >
            <input
              type="radio"
              id={option.id}
              name={question.id}
              value={option.id}
              onChange={() => onAnswer(option.id)}
              className="w-4 h-4"
            />
            <label htmlFor={option.id} className="flex items-center gap-2">
              {option.component ? option.component : option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}