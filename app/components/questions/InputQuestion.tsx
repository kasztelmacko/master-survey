'use client';

import type { InputQuestion } from '@/app/types';

interface InputQuestionProps {
  question: InputQuestion;
  onAnswer: (answer: string) => void;
}

export default function InputQuestion({ question, onAnswer }: InputQuestionProps) {
  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>

      <input
        type={question.inputType}
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full max-w-2xl px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Your answer"
      />
    </div>
  );
}