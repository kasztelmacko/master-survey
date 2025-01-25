'use client';

import type { MultipleChoiceQuestion } from '@/app/types';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
  onAnswer: (answers: string[]) => void;
}

export default function MultipleChoiceQuestion({ question, onAnswer }: MultipleChoiceQuestionProps) {
  const layout = question.layout || 'vertical';

  const handleChange = (optionId: string, isChecked: boolean) => {
    const updatedAnswers = isChecked
      ? [...(question.answers || []), optionId]
      : (question.answers || []).filter((id) => id !== optionId);
    onAnswer(updatedAnswers);
  };

  return (
    <div className="space-y-4">
      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>

      {/* Options */}
      <div className={layout === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'}>
        {question.options.map((option) => (
          <div
            key={option.id}
            className={
              layout === 'horizontal'
                ? `flex items-center gap-2 p-4 border rounded-lg hover:bg-background cursor-pointer ${
                    question.answers?.includes(option.id) ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
                : `flex items-center gap-2 p-4 border rounded-lg hover:bg-background cursor-pointer ${
                    question.answers?.includes(option.id) ? 'bg-primary/10 border-primary' : 'border-gray-300'
                  }`
            }
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              id={option.id}
              name={question.id}
              value={option.id}
              checked={question.answers?.includes(option.id)}
              onChange={(e) => handleChange(option.id, e.target.checked)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />

            {/* Option Label */}
            <label htmlFor={option.id} className="text-text">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}