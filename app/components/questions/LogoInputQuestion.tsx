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
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <figure className="w-32 h-32 flex items-center justify-center mx-auto">
            <img
              src={currentLogo.src}
              alt={currentLogo.alt}
              className="max-w-full max-h-full object-contain"
            />
          </figure>

          <div className="relative">
            <input
              type="text"
              value={answers[currentLogoIndex]}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-28"
              placeholder={`Co to za logo? Wpisz nazwe i kliknij Dalej`}
            />
            {!isLastLogo && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 h-full w-24 bg-primary text-white rounded-r-lg hover:bg-primary/90 focus:outline-none"
              >
                Dalej
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}