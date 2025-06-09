import { keyframes, css } from 'styled-components';

// 1. Описуємо саму анімацію
const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 2. Створюємо і експортуємо "міксин" з повним правилом анімації
export const fadeInAnimation = css`
  animation: ${fadeInKeyframes} 0.3s ease-in-out;
`;