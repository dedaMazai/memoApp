import { useEffect, useState, memo, useCallback, useRef } from 'react';
import './App.css';

const TextBlock = memo(() => {
  useEffect(() => {console.log('Render TextBlock')})

  return (
    <div className="TextBlock" style={{ background: 'grey'}}>
      <p>
        TextBlock
      </p>
    </div>
  );
})

const CounterBlock = memo(({ addCountParent }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  useEffect(() => {console.log('Render CounterBlock')})

  return (
    <div className="CounterBlock" style={{ background: 'red'}}>
      <p>
        CHILDREN block: {count}
      </p>
      {countRef.current % 2 === 0 && (
        <TextBlock />
      )}
      <button onClick={() => {setCount(prev => ++prev)}}>Add count CHILDREN</button>
      <button onClick={() => {countRef.current = countRef.current + 1 }}>Add count REF</button>
      <button onClick={addCountParent}>Add count PARENT</button>
    </div>
  );
})

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {console.log('Render App')})

  const setParentFromChildren = useCallback(() => {
    setCount(prev => ++prev)
  }, [setCount])

  return (
    <div className="App" style={{ background: 'violet', display: 'flex', flexDirection: 'column' }}>
      <p>
        App PARENT block: {count}
      </p>
      <div>
        <button onClick={() => setCount(prev => ++prev)}>Add count PARENT</button>
      </div>
      <CounterBlock addCountParent={setParentFromChildren} />
    </div>
  );
}

export default App;
