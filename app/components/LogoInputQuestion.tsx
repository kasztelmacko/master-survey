'use client';

import { useState, useEffect } from 'react';

interface LogoInputQuestionProps {
  question: { id: string; question: string; logos: { src: string; alt: string }[] };
  onAnswer: (answers: string[]) => void;
  onAllAnswered: (allAnswered: boolean) => void;
}

export default function LogoInputQuestion({ question, onAnswer, onAllAnswered }: LogoInputQuestionProps) {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(question.logos.length).fill(''));

  const handleInputChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentLogoIndex] = value;
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  const handleNext = () => {
    if (currentLogoIndex < question.logos.length - 1) {
      setCurrentLogoIndex((prev) => prev + 1);
    }
  };

  const currentLogo = question.logos[currentLogoIndex];
  const isLastLogo = currentLogoIndex === question.logos.length - 1;

  useEffect(() => {
    const allAnswered = answers.every((answer) => answer.trim() !== '');
    onAllAnswered(allAnswered);
  }, [answers, onAllAnswered]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <img
            src={currentLogo.src}
            alt={currentLogo.alt}
            className="w-32 h-32 object-contain mx-auto"
          />
          <div className="relative">
            <input
              type="text"
              value={answers[currentLogoIndex]}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-28"
              placeholder={`Wpisz nazwę dla ${currentLogo.alt}`}
            />
            {!isLastLogo && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 h-full w-24 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}