import {
  render,
  screen,
} from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  const counterElement = screen.getByTestId('counter');

  // id 가 counter 인 요소의 text가 0이다.
  expect(counterElement).toHaveTextContent(0);
});
