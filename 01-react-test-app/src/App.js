import {
  useState,
} from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">
          {counter}
        </h3>
      </header>
    </div>
  )
}
