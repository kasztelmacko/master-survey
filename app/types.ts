export type QuestionType = 'single-choice' | 'multiple-choice' | 'input' | 'multiple-input' | 'input-multiple' | 'dce' | 'vigniette';
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
  no_choice?: boolean;
  [key: string]: unknown;
}

export interface DCEAlternative {
  id: string;
  data: {
    name: string;
    description?: string;
    src: string;
    kcal?: number;
    gram?: number;
    main_color?: string;
    brand_logo?: string;
    price?: number;
  };
}

export interface BaseQuestion {
  id: string;
  name: string;
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
  questions: number[];
}

export interface VignietteQuestion extends BaseQuestion {
  type: 'vigniette';
  text: string;
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion
  | MultipleInputQuestion
  | InputMultipleQuestion
  | DCEQuestion
  | VignietteQuestion;