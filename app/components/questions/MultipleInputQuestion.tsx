'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ItemCard from '../items/ItemCard';

interface Item {
  src: string;
  alt: string;
  name?: string;
  description?: string;
  kcal?: number;
  gram?: number;
  main_color?: string;
  brand_logo?: string;
  price?: number;
}

interface MultipleInputQuestionProps {
  question: {
    id: string;
    type: 'multiple-input';
    inputType: 'text' | 'number';
    question: string;
    items: Item[];
    displayMode: 'logo-only' | 'item-card';
  };
  onAnswer: (answers: string[]) => void;
  onAllAnswered: (allAnswered: boolean) => void;
}

export default function MultipleInputQuestion({
  question,
  onAnswer,
  onAllAnswered,
}: MultipleInputQuestionProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(question.items.length).fill(''));

  const handleInputChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentItemIndex] = value;
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  const handleNext = () => {
    if (currentItemIndex < question.items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
    }
  };

  const currentItem = question.items[currentItemIndex];
  const isLastItem = currentItemIndex === question.items.length - 1;

  useEffect(() => {
    const allAnswered = answers.every((answer) => answer.trim() !== '');
    onAllAnswered(allAnswered);
  }, [answers, onAllAnswered]);

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-text">{question.question}</h2>
      {question.displayMode === 'logo-only' && (
        <p>Jeżeli nie umiesz nazwać tej marki wpisz <b>nie wiem</b></p>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          {/* Render logo-only or item card based on displayMode */}
          {question.displayMode === 'logo-only' ? (
            <figure className="w-32 h-32 flex items-center justify-center mx-auto relative">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="128px"
                className="object-contain"
              />
            </figure>
          ) : (
            <ItemCard
              src={currentItem.src}
              alt={currentItem.alt}
              name={currentItem.name}
              description={currentItem.description}
              kcal={currentItem.kcal}
              gram={currentItem.gram}
              main_color={currentItem.main_color}
              brand_logo={currentItem.brand_logo}
              price={currentItem.price}
            />
          )}

          <div className="relative">
            <input
              type={question.inputType}
              value={answers[currentItemIndex]}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-28"
              placeholder={
                question.displayMode === 'logo-only'
                  ? 'Co to za logo? Wpisz nazwę i kliknij Dalej'
                  : 'Wpisz odpowiedź i kliknij Dalej'
              }
            />
            {!isLastItem && (
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