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
  onAnswer: (answers: Record<number, string>) => void;  // Updated to handle answers for all questions
}

export default function DCEQuestion({ onAnswer }: DCEQuestionProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});  // Track answers for all questions
  const [options, setOptions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);  // Track the current question

  const typeKeyMap: Record<string, keyof typeof items['mcdonalds']> = {
    type_burger_classic: 'burger_classic',
    type_burger_premium: 'burger_premium',
    type_bundle_classic: 'bundle_classic',
    type_bundle_premium: 'bundle_premium',
  };

  // Load observations from localStorage
  useEffect(() => {
    const storedObservations = localStorage.getItem('surveyObservations');
    if (storedObservations) {
      setObservations(JSON.parse(storedObservations));
    }
  }, []);

  // Filter options and group them by question_id
  useEffect(() => {
    if (!observations) return;

    const groupedOptions: Record<number, any[]> = {};

    observations.forEach((observation) => {
      // Handle 'no_choice' case first
      if (observation.no_choice === 1) {
        const option = {
          id: observation.alternative_id,
          question_id: observation.question_id,
          noChoice: true,
        };
        if (!groupedOptions[observation.question_id]) {
          groupedOptions[observation.question_id] = [];
        }
        groupedOptions[observation.question_id].push(option);
        return; // Skip further processing for this observation
      }

      // Handle other types for non 'no_choice' cases
      const brandKey = observation.brand.toLowerCase().replace(/\s+/g, '') as keyof typeof items;
      const brandData = brands[brandKey];

      if (!brandData) {
        console.warn(`No brand data found for key: ${brandKey}`);
        return;
      }

      const itemTypeKey = Object.keys(typeKeyMap).find((key) => observation[key as keyof Observation]);
      if (!itemTypeKey) {
        console.warn('No matching item type key found for observation:', observation);
        return;
      }

      const itemData = items[brandKey]?.[typeKeyMap[itemTypeKey]];

      if (!itemData) {
        console.warn(`No item data found for type: ${typeKeyMap[itemTypeKey]} under brand: ${brandKey}`);
      }

      const option = {
        id: observation.alternative_id,
        question_id: observation.question_id,
        data: {
          name: itemData?.name || 'Unknown Item',
          description: itemData?.description || '',
          src: itemData?.img_url || '',
          kcal: observation.kcal,
          gram: observation.gram,
          main_color: brandData?.main_color || '#ffffff',
          brand_logo: brandData?.brand_logo || '',
          price: observation.price,
        },
        noChoice: false,
      };

      if (!groupedOptions[observation.question_id]) {
        groupedOptions[observation.question_id] = [];
      }

      groupedOptions[observation.question_id].push(option);
    });

    const finalOptions = Object.values(groupedOptions).map((options) => options);
    setOptions(finalOptions);
  }, [observations]);

  const handleAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < options.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const currentOptions = options[currentQuestionIndex] || [];

  return (
    <div className="space-y-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-text">Which product do you prefer?</h2>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentOptions.map((option: any) => (
            <div
              key={option.id}
              className={`cursor-pointer ${selectedAnswers[option.question_id] === option.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleAnswer(option.question_id, option.id)}
            >
              {option.noChoice ? (
                <NoChoice />
              ) : (
                <ItemCard
                  src={option.data.src}
                  alt={option.data.name}
                  name={option.data.name}
                  description={option.data.description}
                  kcal={option.data.kcal}
                  gram={option.data.gram}
                  main_color={option.data.main_color}
                  brand_logo={option.data.brand_logo}
                  price={option.data.price}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {/* Show next button */}
        {selectedAnswers[currentOptions[0]?.question_id] && (
          <button className="btn btn-primary" onClick={handleNext}>
            Dalej
          </button>
        )}
      </div>

      {/* Submit button when all questions are answered */}
      {Object.keys(selectedAnswers).length === options.length && (
        <div className="pt-4">
          <button
            className="btn btn-primary"
            onClick={() => console.log('Survey submitted with answers:', selectedAnswers)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
