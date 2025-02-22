'use client';

import React, { useEffect } from 'react';
import { VignietteQuestion } from '../../types';

interface DCEVignietteProps {
  question: VignietteQuestion;
  onAnswer: (answer: string) => void;
}

export default function DCEVigniette({ question, onAnswer }: DCEVignietteProps) {
  useEffect(() => {
    onAnswer("read");
  }, []);

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>
      <div className="text-center sm:text-left">
        <p>{question.text}</p>
      </div>
    </div>
  );
};
