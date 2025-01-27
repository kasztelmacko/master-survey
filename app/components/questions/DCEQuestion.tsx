'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemCard from '../items/ItemCard';
import { supabase } from '@/lib/supabaseClient';
import { brands } from '@/app/data/brands';

interface DCEQuestionProps {
  onAnswer: (answer: string) => void; // Callback for when an answer is selected
}

export default function DCEQuestion({ onAnswer }: DCEQuestionProps) {
  const [options, setOptions] = useState<any[]>([]); // State to store fetched options
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // State to track selected answer

  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');
  const respondentId = searchParams.get('respondentId');

  // Fetch options from Supabase based on respondent_id and question_id
  useEffect(() => {
    const fetchOptions = async () => {
      if (!questionId || !respondentId) return;

      try {
        const { data, error } = await supabase
          .from('CBCSurvey')
          .select('*')
          .eq('respondent_id', respondentId)
          .eq('question_id', questionId);

        if (error) {
          throw error;
        }

        if (data) {
          const mappedOptions = data.map((option) => {
            const brandKey = option.data.brand.toLowerCase().replace(/\s+/g, '');
            const brandData = brands[brandKey as keyof typeof brands];

            return {
              ...option,
              data: {
                ...option.data,
                main_color: brandData?.main_color || '#ffffff', // Default to white if brand not found
                brand_logo: brandData?.brand_logo || '', // Default to empty if brand not found
              },
            };
          });

          setOptions(mappedOptions); // Set the mapped options
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [questionId, respondentId]);

  // Handle answer selection
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div className="space-y-4">
      {/* Question Text */}
      <h2 className="text-2xl font-semibold text-text">Which product do you prefer?</h2>

      {/* Display options as ItemCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`cursor-pointer ${
              selectedAnswer === option.id ? 'ring-2 ring-primary' : ''
            }`}
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
    </div>
  );
}