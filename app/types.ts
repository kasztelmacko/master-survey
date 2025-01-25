export type QuestionType = 'single-choice' | 'multiple-choice' | 'input' | 'multiple-input';
export type QuestionLayout = 'vertical' | 'horizontal';

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
}

export interface InputQuestion extends BaseQuestion {
  type: 'input';
  inputType: 'text' | 'number';
}

export interface MultipleInputQuestion extends BaseQuestion {
  type: 'multiple-input';
  inputType: 'text';
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | InputQuestion | MultipleInputQuestion;