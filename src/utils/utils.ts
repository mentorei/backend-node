import { MentorEvaluationInput } from 'src/dto/mentor/mentor-evaluation/mentor-evaluation.input';

export const isNotEmpty = (object: any) => {
  return Object.keys(object).length > 0;
};

export const cpfValidator = (cpf: string): boolean => {
  cpf = cpf.replace(/[\.\-\/]+/g, '');

  if (cpf == '') return false;

  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false;

  let add = 0;

  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);

  let rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) rev = 0;

  if (rev != parseInt(cpf.charAt(9))) return false;

  add = 0;

  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) rev = 0;

  if (rev != parseInt(cpf.charAt(10))) return false;

  return true;
};

export const shortenName = (fullName: string): string => {
  const names = fullName.split(' ');
  const firstName = names[0];
  const lastName = names[names.length - 1];
  let shortenedName = firstName;

  names.slice(1, -1).forEach((name) => {
    const initialLetter = name[0];
    shortenedName += ` ${initialLetter}.`;
  });

  shortenedName += ` ${lastName}`;

  return shortenedName;
};

export function getTranslatedDays(weekDay: string): string {
  const days: any = {
    sunday: 'domingo',
    monday: 'segunda-feira',
    tuesday: 'terça-feira',
    wednesday: 'quarta-feira',
    thursday: 'quinta-feira',
    friday: 'sexta-feira',
    saturday: 'sábado',
  };

  return days[weekDay];
}

export function calculateTotalAvaliationsAndRating(avaliations: Array<MentorEvaluationInput>): {
  totalAvaliations: number;
  averageRating: string;
} {
  const totalAvaliations = avaliations.length;
  const sumRatings = avaliations.reduce((sum, avaliation) => sum + avaliation.rating, 0);
  const averageRating = totalAvaliations ? (sumRatings / totalAvaliations).toFixed(2) : '0.0';

  return { totalAvaliations, averageRating };
}
