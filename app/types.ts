// types.ts

export type QuestionType = 'single-choice' | 'multiple-choice' | 'input' | 'multiple-input' | 'input-multiple' | 'dce';
export type QuestionLayout = 'vertical' | 'horizontal';
export type DisplayMode = 'logo-only' | 'item-card';

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
  [key: string]: any;
}

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

export interface MultipleInputQuestion extends BaseQuestion {
  type: 'multiple-input';
  inputType: 'text' | 'number';
  items: Item[];
  displayMode: DisplayMode;
}

export interface InputMultipleQuestion extends BaseQuestion {
  type: 'input-multiple';
  inputType: 'text' | 'number';
  items?: Item[];
}

export interface DCEQuestion extends BaseQuestion {
  type: 'dce';
  questionId: string;
  respondentId: number;
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion
  | MultipleInputQuestion
  | InputMultipleQuestion
  | DCEQuestion;