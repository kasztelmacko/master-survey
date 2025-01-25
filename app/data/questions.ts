import { Question } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    type: 'input',
    question: 'Ile masz lat?',
    inputType: 'number',
    layout: 'vertical',
  },
  {
    id: '2',
    type: 'single-choice',
    question: 'Jaka jest twoja płeć?',
    options: [
      { id: 'mezczyzna', label: 'Mężczyzna' },
      { id: 'kobieta', label: 'Kobieta' },
      { id: 'inne', label: 'Inne' },
    ],
    layout: 'vertical',
  },
  {
    id: '3',
    type: 'single-choice',
    question: 'Jaki jest twój miesięczny dochód?',
    options: [
      { id: 'ponizej-1000', label: 'Poniżej 1000 zł / msc' },
      { id: '1000-5000', label: 'Między 1000 a 5000 zł / msc' },
      { id: '5000-10000', label: 'Między 5000 a 10000 zł / msc' },
      { id: 'powyzej-10000', label: 'Ponad 10000 zł / msc' },
    ],
    layout: 'vertical',
  },
  {
    id: '4',
    type: 'single-choice',
    question: 'Gdzie mieszkasz?',
    options: [
      { id: 'wies', label: 'Wieś' },
      { id: 'male-miasto', label: 'Małe miasto' },
      { id: 'duze-miasto', label: 'Duże miasto' },
    ],
    layout: 'vertical',
  },
  {
    id: '5',
    type: 'single-choice',
    question: 'Jak często jadasz w restauracjach typu fast-food?',
    options: [
      { id: 'rzadziej-niz-raz-w-miesiacu', label: 'Rzadziej niż raz w miesiącu' },
      { id: 'raz-w-miesiacu', label: 'Raz w miesiącu' },
      { id: 'raz-w-tygodniu', label: 'Raz w tygodniu' },
      { id: 'czesciej-niz-raz-w-tygodniu', label: 'Częściej niż raz w tygodniu' },
    ],
    layout: 'vertical',
  },
  {
    id: '6',
    type: 'single-choice',
    question: 'Jaki jest twój poziom wykształcenia?',
    options: [
      { id: 'podstawowe', label: 'Podstawowe' },
      { id: 'srednie', label: 'Średnie' },
      { id: 'w-trakcie-studiow', label: 'W trakcie studiów' },
      { id: 'wyzsze', label: 'Wykształcenie wyższe' },
    ],
    layout: 'vertical',
  },
  {
    id: '7',
    type: 'multiple-input',
    question: 'Jakie marki fast-food znasz z całego świata? Wymień.',
    inputType: 'text',
  },
];