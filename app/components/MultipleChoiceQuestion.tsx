'use client';

import type { MultipleChoiceQuestion } from '../types';

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
  };

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
              type="checkbox"
              id={option.id}
              name={question.id}
              value={option.id}
              checked={question.answers?.includes(option.id)}
              onChange={(e) => handleChange(option.id, e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}