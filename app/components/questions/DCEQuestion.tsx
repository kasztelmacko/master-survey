'use client';

import { useState, useEffect } from 'react';
import ItemCard from '../items/ItemCard';
import NoChoice from '../items/NoChoice';
import { brands } from '@/app/data/brands';
import { items } from '@/app/data/items';

interface Observation {
  alternative_id: string;
  brand: string;
  kcal: number;
  gram: number;
  price: number;
  question_id: number;
  type_burger_classic?: boolean;
  type_burger_premium?: boolean;
  type_bundle_classic?: boolean;
  type_bundle_premium?: boolean;
  no_choice?: number;
}

interface DCEQuestionProps {
  responderId: number;
  onAnswer: (answers: Record<number, string[]>) => void;
  onDCECompleted: (completed: boolean) => void;
}

export default function DCEQuestion({ onAnswer, responderId, onDCECompleted }: DCEQuestionProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [options, setOptions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const typeKeyMap: Record<string, keyof typeof items['mcdonalds']> = {
    type_burger_classic: 'burger_classic',
    type_burger_premium: 'burger_premium',
    type_bundle_classic: 'bundle_classic',
    type_bundle_premium: 'bundle_premium',
  };

  useEffect(() => {
    const storedObservations = localStorage.getItem('surveyObservations');
    if (storedObservations) {
      setObservations(JSON.parse(storedObservations));
    }
  }, []);

  useEffect(() => {
    if (!observations) return;

    const groupedOptions: Record<number, any[]> = {};
    observations.forEach((observation) => {
      const option = {
        id: observation.alternative_id,
        question_id: observation.question_id,
        noChoice: observation.no_choice === 1,
        data: !observation.no_choice ? getObservationData(observation) : undefined,
      };

      if (!groupedOptions[observation.question_id]) {
        groupedOptions[observation.question_id] = [];
      }
      groupedOptions[observation.question_id].push(option);
    });

    setOptions(Object.values(groupedOptions));
  }, [observations]);

  const getObservationData = (observation: Observation) => {
    const brandKey = observation.brand.toLowerCase().replace(/\s+/g, '') as keyof typeof items;
    const brandData = brands[brandKey];
    const itemTypeKey = Object.keys(typeKeyMap).find((key) => observation[key as keyof Observation]);

    if (!brandData || !itemTypeKey) return null;

    const itemData = items[brandKey]?.[typeKeyMap[itemTypeKey]];
    return {
      name: itemData?.name || 'Unknown Item',
      description: itemData?.description || '',
      src: itemData?.img_url || '',
      kcal: observation.kcal,
      gram: observation.gram,
      main_color: brandData?.main_color || '#ffffff',
      brand_logo: brandData?.brand_logo || '',
      price: observation.price,
    };
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: [answerId],
    }));
  };

  const handleNext = async () => {
    const currentQuestion = options[currentQuestionIndex];
    if (currentQuestion) {
      const questionId = String(currentQuestion[0].question_id);
      const answerIds = selectedAnswers[currentQuestion[0].question_id] || [];

      if (answerIds.length > 0) {
        onAnswer(selectedAnswers);
      }
    }

    if (currentQuestionIndex < options.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onDCECompleted(true);
    }
  };

  const currentOptions = options[currentQuestionIndex] || [];
  const isAnswered = selectedAnswers[currentOptions[0]?.question_id]?.length > 0;
  const isLastQuestion = currentQuestionIndex === options.length - 1;

  useEffect(() => {
    const allAnswered = currentOptions.every(
      (option: any) => selectedAnswers[option.question_id]?.length > 0
    );
    onDCECompleted(allAnswered);
  }, [selectedAnswers, currentOptions, onDCECompleted]);

  return (
    <div className="space-y-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold flex w-full max-w-2xl mx-auto text-text">
        Which product do you prefer?
      </h2>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentOptions.map((option: any) => (
          <div
            key={option.id}
            className={`cursor-pointer ${selectedAnswers[option.question_id]?.includes(option.id) ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleAnswer(option.question_id, option.id)}
          >
            {option.noChoice ? (
              <NoChoice />
            ) : (
              <ItemCard
                src={option.data?.src}
                alt={option.data?.name}
                name={option.data?.name}
                description={option.data?.description}
                kcal={option.data?.kcal}
                gram={option.data?.gram}
                main_color={option.data?.main_color}
                brand_logo={option.data?.brand_logo}
                price={option.data?.price}
              />
            )}
          </div>
        ))}
      </div>

      {!isLastQuestion && (
        <div className="flex w-full max-w-2xl mx-auto justify-end">
          <button
            onClick={handleNext}
            className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${!isAnswered ? 'opacity-50 pointer-events-none' : ''}`}
            disabled={!isAnswered}
          >
            Dalej
          </button>
        </div>
      )}
    </div>
  );
}
