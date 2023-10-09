import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('lintTest', () => {
//   render(<App />);
//   const lintTest = screen.getByRole('button', {
//     name: 'lintTest',
//   });

//   expect(lintTest).toHaveTextContent('lintTest');
// });
