'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ItemCard from '../items/ItemCard';
import NoChoice from '../items/NoChoice';
import { brands } from '@/app/data/brands';
import { items } from '@/app/data/items';

interface Observation {
  alternative_id: number;
  kcal: number;
  gram: number;
  price: number;
  question_id: number;
  brand_mcdonalds?: boolean;
  brand_burger_king?: boolean;
  brand_max_burger?: boolean;
  brand_wendys?: boolean;
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

const typeKeyMap: Record<string, string> = {
  type_burger_classic: 'burger_classic',
  type_burger_premium: 'burger_premium',
  type_bundle_classic: 'bundle_classic',
  type_bundle_premium: 'bundle_premium',
};

const brandKeyMap: Record<string, string> = {
  brand_mcdonalds: 'mcdonalds',
  brand_burger_king: 'burger_king',
  brand_max_burger: 'max_burger',
  brand_wendys: 'wendys',
};

interface OptionData {
  name: string;
  description: string;
  src: string;
  kcal: number;
  gram: number;
  main_color: string;
  brand_logo: string;
  price: number;
}

interface Option {
  id: number;
  question_id: number;
  noChoice: boolean;
  data?: OptionData;
}

export default function DCEQuestion({ question, onAnswer, onAllAnswered }: DCEQuestionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [observations, setObservations] = useState<Observation[]>([]);
  const [options, setOptions] = useState<Record<number, Option[]>>({});

  const hasSubmittedAnswersRef = useRef(false);

  const currentQuestionId = question.questions[currentQuestionIndex];

  const getObservationData = useCallback((observation: Observation): OptionData => {
    const brandKey = Object.keys(brandKeyMap).find(
      (key) => observation[key as keyof Observation] === 1
    );
    const itemTypeKey = Object.keys(typeKeyMap).find(
      (key) => observation[key as keyof Observation] === 1
    );

    const brandData = brandKey
      ? brands[brandKeyMap[brandKey] as keyof typeof brands]
      : undefined;
    const itemData =
      brandKey && itemTypeKey
        ? items[brandKeyMap[brandKey] as keyof typeof items]?.[typeKeyMap[itemTypeKey] as keyof typeof items[keyof typeof items]]
        : undefined;

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
  }, []);

  useEffect(() => {
    const storedObservations = localStorage.getItem('surveyObservations');
    if (storedObservations) {
      setObservations(JSON.parse(storedObservations));
    }
  }, []);

  useEffect(() => {
    if (!observations.length) return;

    const groupedOptions: Record<number, Option[]> = {};
    observations.forEach((observation) => {
      const option: Option = {
        id: observation.alternative_id,
        question_id: observation.question_id,
        noChoice: observation.no_choice === 1,
        data: observation.no_choice === 1 ? undefined : getObservationData(observation),
      };

      if (!groupedOptions[observation.question_id]) {
        groupedOptions[observation.question_id] = [];
      }
      groupedOptions[observation.question_id].push(option);
    });

    setOptions(groupedOptions);
  }, [observations, getObservationData]);

  const currentOptions: Option[] = options[currentQuestionId] || [];

  const allAnswered = question.questions.every((qid) => selectedAnswers[qid]);

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
    if (allAnswered && !hasSubmittedAnswersRef.current) {
      const formattedAnswers = Object.values(selectedAnswers);
      onAnswer(formattedAnswers);
      hasSubmittedAnswersRef.current = true;
    }
  }, [allAnswered, selectedAnswers, onAnswer]);

  return (
    <div className="space-y-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold flex w-full max-w-2xl mx-auto text-text">
        {question.question} ({currentQuestionIndex + 1} / {question.questions.length})
      </h2>

      <div className="mb-8">
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentOptions.map((option: Option) => (
            <div
              key={option.id}
              className={`cursor-pointer ${
                selectedAnswers[currentQuestionId] === option.id.toString() ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleAnswer(currentQuestionId, option.id.toString())}
            >
              {option.noChoice ? (
                <NoChoice />
              ) : (
                <ItemCard
                  src={option.data?.src || ''}
                  alt={option.data?.name || 'Unknown Item'}
                  name={option.data?.name || 'Unknown Item'}
                  description={option.data?.description || ''}
                  kcal={option.data?.kcal || 0}
                  gram={option.data?.gram || 0}
                  main_color={option.data?.main_color || '#ffffff'}
                  brand_logo={option.data?.brand_logo || ''}
                  price={option.data?.price || 0}
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
