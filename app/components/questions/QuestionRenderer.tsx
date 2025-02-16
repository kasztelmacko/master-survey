'use client';

import type { Question } from '../../types';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import InputQuestion from './InputQuestion';
import MultipleInputQuestion from './MultipleInputQuestion';
import InputMultipleQuestion from './InputMultipleQuestion';
import DCEQuestion from './DCEQuestion';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: string | string[]) => void;
  onAllAnswered?: (allAnswered: boolean) => void;
}

export default function QuestionRenderer({ 
  question, 
  onAnswer, 
  onAllAnswered, 
}: QuestionRendererProps) {
  switch (question.type) {
    case 'single-choice':
      return <SingleChoiceQuestion question={question} onAnswer={onAnswer} />;
    case 'multiple-choice':
      return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
    case 'input':
      return <InputQuestion question={question} onAnswer={onAnswer} />;
    case 'input-multiple':
      return <InputMultipleQuestion question={question} onAnswer={onAnswer} />;
    case 'multiple-input':
      return <MultipleInputQuestion question={question} onAnswer={onAnswer} onAllAnswered={onAllAnswered!} />;
    case 'dce':
      return <DCEQuestion question={question} onAnswer={onAnswer} onAllAnswered={onAllAnswered!}/>;
    default:
      return null;
  }
}