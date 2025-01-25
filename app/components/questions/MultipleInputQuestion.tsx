'use client';

import { useState } from 'react';

interface MultipleInputQuestionProps {
  question: { id: string; question: string };
  onAnswer: (answers: string[]) => void;
}

export default function MultipleInputQuestion({ question, onAnswer }: MultipleInputQuestionProps) {
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newAnswers = [...answers, inputValue.trim()];
      setAnswers(newAnswers);
      setInputValue('');
      onAnswer(newAnswers);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-32"
            placeholder="Wpisz markę fast-food i kliknij Dodaj"
          />
          <button
            onClick={handleAdd}
            className="absolute right-0 top-0 h-full w-32 bg-primary text-white rounded-r-lg hover:bg-primary/90 focus:outline-none"
          >
            Dodaj
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 border rounded-lg bg-background"
            >
              <span className="text-text">{answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}