'use client';

import type { InputQuestion } from '../types';

interface InputQuestionProps {
  question: InputQuestion;
  onAnswer: (answer: string) => void;
}

export default function InputQuestion({ question, onAnswer }: InputQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <input
        type={question.inputType}
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Your answer"
      />
    </div>
  );
}