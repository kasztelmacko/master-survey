'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ItemCard from '../items/ItemCard';
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
}

interface DCEQuestionProps {
  onAnswer: (answer: string) => void;
}

export default function DCEQuestion({ onAnswer }: DCEQuestionProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const questionIdParam = searchParams.get('questionId');
  const questionId = questionIdParam ? parseInt(questionIdParam) : 1;

  const typeKeyMap: Record<string, keyof typeof items['mcdonalds']> = {
    type_burger_classic: 'burger_classic',
    type_burger_premium: 'burger_premium',
    type_bundle_classic: 'bundle_classic',
    type_bundle_premium: 'bundle_premium',
  };

  useEffect(() => {
    // Retrieve the observations from localStorage
    const storedObservations = localStorage.getItem('surveyObservations');
    if (storedObservations) {
      setObservations(JSON.parse(storedObservations));
    }
  }, []);

  useEffect(() => {
    if (!observations) return;

    console.log('Current Observations:', observations);
    console.log('Filtering by Question ID:', questionId);

    const filteredOptions = observations
      .filter((observation) => observation.question_id === questionId)
      .map((observation) => {
        const brandKey = observation.brand.toLowerCase().replace(/\s+/g, '') as keyof typeof items;
        const brandData = brands[brandKey];

        if (!brandData) {
          console.warn(`No brand data found for key: ${brandKey}`);
          return null;
        }

        const itemTypeKey = Object.keys(typeKeyMap).find((key) => observation[key as keyof Observation]);
        if (!itemTypeKey) {
          console.warn('No matching item type key found for observation:', observation);
          return null;
        }

        const itemData = items[brandKey]?.[typeKeyMap[itemTypeKey]];

        if (!itemData) {
          console.warn(`No item data found for type: ${typeKeyMap[itemTypeKey]} under brand: ${brandKey}`);
        }

        return {
          id: observation.alternative_id,
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
        };
      })
      .filter(Boolean);

    console.log('Filtered Options:', filteredOptions);
    setOptions(filteredOptions);
  }, [observations, questionId]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    console.log('Selected Answer:', answer);
    onAnswer(answer);
  };

  const handleNextQuestion = () => {
    console.log('Navigating to next question:', questionId + 1);
    router.push(`?questionId=${questionId + 1}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-text">Which product do you prefer?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer ${selectedAnswer === option.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleAnswer(option.id)}
          >
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
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {options.length > 0 && (
          <button className="btn btn-primary" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
