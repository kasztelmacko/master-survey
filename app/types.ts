export type QuestionType = 'single-choice' | 'multiple-choice' | 'input';
export type QuestionLayout = 'vertical' | 'horizontal'; // New type for layout

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  layout?: QuestionLayout;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  options: { id: string; label: string; component?: React.ReactNode }[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: { id: string; label: string }[];
  answers?: string[];
}

export interface InputQuestion extends BaseQuestion {
  type: 'input';
  inputType: 'text' | 'number';
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | InputQuestion;