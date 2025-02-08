'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
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
  question: {
    id: string;
    type: 'dce';
    question: string;
    questions: number[];
  };
  onAnswer: (answers: string[]) => void;
  onAllAnswered: (allAnswered: boolean) => void;
}

export default function DCEQuestion({ question, onAnswer, onAllAnswered }: DCEQuestionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [observations, setObservations] = useState<Observation[]>([]);
  const [options, setOptions] = useState<Record<number, any[]>>({});

  const currentQuestionId = question.questions[currentQuestionIndex];

  const typeKeyMap: Record<string, string> = {
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

    setOptions(groupedOptions);
  }, [observations]);

  const currentOptions = useMemo(() => options[currentQuestionId] || [], [options, currentQuestionId]);

  const allAnswered = useMemo(
    () => question.questions.every((qid) => selectedAnswers[qid]),
    [question.questions, selectedAnswers]
  );

  const handleAnswer = useCallback((questionId: number, alternativeId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: alternativeId,
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < question.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, question.questions.length]);

  useEffect(() => {
    onAllAnswered(allAnswered);
  }, [allAnswered, onAllAnswered]);

  useEffect(() => {
    if (allAnswered) {
      const formattedAnswers = Object.values(selectedAnswers);
      onAnswer(formattedAnswers);
    }
  }, [allAnswered, selectedAnswers, onAnswer]);

  const getObservationData = useCallback((observation: Observation) => {
    const brandKey = observation.brand.toLowerCase().replace(/\s+/g, '') as keyof typeof items;
    const brandData = brands[brandKey];
    const itemTypeKey = Object.keys(typeKeyMap).find((key) => observation[key as keyof Observation]);

    if (!brandData || !itemTypeKey) return null;

    const itemData = items[brandKey]?.[typeKeyMap[itemTypeKey] as keyof typeof items[keyof typeof items]];
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
  }, [typeKeyMap]);

  return (
    <div className="space-y-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold flex w-full max-w-2xl mx-auto text-text">
        {question.question}
      </h2>

      <div className="mb-8">
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentOptions.map((option: any) => (
            <div
              key={option.id}
              className={`cursor-pointer ${
                selectedAnswers[currentQuestionId] === option.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleAnswer(currentQuestionId, option.id)}
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
      </div>

      {currentQuestionIndex < question.questions.length - 1 && (
        <div className="flex w-full max-w-2xl mx-auto justify-end">
          <button
            onClick={handleNext}
            className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-opacity ${
              !selectedAnswers[currentQuestionId] ? 'opacity-50 pointer-events-none' : ''
            }`}
            disabled={!selectedAnswers[currentQuestionId]}
          >
            Dalej
          </button>
        </div>
      )}
    </div>
  );
}