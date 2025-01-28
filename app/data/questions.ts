import { Question, DCEAlternative } from '../types';
import { brands } from './brands';

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
    type: 'input-multiple',
    inputType: 'text',
    question: 'Jakie marki fast-food znasz z całego świata?',
  },
  {
    id: '8',
    type: 'multiple-input',
    inputType: 'text',
    question: 'Czy rozpoznasz te marki po logo?',
    displayMode: 'logo-only',
    items: [
      { src: '/logos/mcdonald_logo.png', alt: 'McDonald\'s' },
      { src: '/logos/kfc_logo.png', alt: 'KFC' },
    ],
  },
  {
    id: '9',
    type: 'multiple-input',
    inputType: 'number',
    question: 'Jak myślisz, ile kosztują te produkty na rynku?',
    displayMode: 'item-card',
    items: [
      {
        src: 'https://cdn.mcdonalds.pl/uploads/20220922161306/wies-mac.png',
        alt: 'McDonald\'s',
        name: 'WieśMac',
        description: 'A delicious classic burger with lettuce, tomato, and cheese',
        kcal: 524,
        gram: 280,
        main_color: brands.mcdonalds.main_color,
        brand_logo: brands.mcdonalds.brand_logo,
      },
      {
        src: 'https://cdn.prod.website-files.com/631b4b4e277091ef01450237/65947cd2a2c28c35b5ca6fb1_Whopper%20w%20Cheese.png',
        alt: 'Burger King',
        name: 'Whooper',
        description: 'A flame-grilled beef patty topped with weggies, creamy mayonnaise, ketchup',
        kcal: 480,
        gram: 250,
        main_color: brands.burgerking.main_color,
        brand_logo: brands.burgerking.brand_logo,
      },
    ],
  },
  {
    id: '10',
    type: 'dce',
    question: 'Który produkt wybierasz?',
    questionId: 1,
    totalQuestions: 8,
    alternatives: [] as DCEAlternative[],
  },
  {
    id: "11",
    type: "multiple-choice",
    question: "W których z wymienionych restauracji fast-food miałeś/miałaś okazję zjeść?",
    options: [
      { id: "mcdonalds", "label": "McDonald's" },
      { id: "burger-king", "label": "Burger King" },
      { id: "wendys", "label": "Wendy's" },
      { id: "kfc", "label": "KFC" },
      { id: "subway", "label": "Subway" },
      { id: "max-burgers" , "label": "Max Burgers" },
      { id: "north-fish", "label": "North Fish" },
      { id: "popeyes", "label": "Popeyes" },
      { id: "five-guys", "label": "Five Guys" },
    ],
    layout: "vertical"
  }
];