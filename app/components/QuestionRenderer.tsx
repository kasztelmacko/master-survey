'use client';

import type { Question } from '../types';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import InputQuestion from './InputQuestion';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  layout?: 'vertical' | 'horizontal'; 
}

export default function QuestionRenderer({ question, onAnswer, layout = 'vertical' }: QuestionRendererProps) {
  switch (question.type) {
    case 'single-choice':
      return <SingleChoiceQuestion question={question} onAnswer={onAnswer} layout={layout} />;
    case 'multiple-choice':
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} layout={layout} />;
    case 'input':
      return <InputQuestion question={question} onAnswer={onAnswer} />;
    default:
      return null;
  }
}