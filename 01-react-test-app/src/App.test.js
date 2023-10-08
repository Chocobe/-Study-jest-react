import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  const counterElement = screen.getByTestId('counter');

  // id 가 counter 인 요소의 text가 0이다.
  expect(counterElement).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');

  expect(minusButtonElement).toHaveTextContent('-');
});

test('plus button has corrent text', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  
  expect(plusButtonElement).toHaveTextContent('+');
});

test('When the "+" button is pressed, the counter  changes to 1', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');

  fireEvent.click(plusButtonElement);

  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('1');
});

test('When the "-" button is pressed, the counter changes to -1', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');

  fireEvent.click(minusButtonElement);

  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('-1');
});

test('on/off button is exist', () => {
  render(<App />);
  const onOffButton = screen.getByTestId('on/off-button');

  expect(onOffButton).toHaveTextContent('on/off');
  expect(onOffButton).toBeVisible();
});

test('on/off button has blue color', () => {
  render(<App />);
  const buttonElement = screen.getByTestId('on/off-button');

  expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('Prevent the "+", "-" button from being pressed when the on/off button is clicked', () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId('on/off-button');

  fireEvent.click(onOffButtonElement);

  const plusButtonElement = screen.getByTestId('plus-button');
  const minusButtonElement = screen.getByTestId('minus-button');

  expect(plusButtonElement).toBeDisabled();
  expect(minusButtonElement).toBeDisabled();
});
