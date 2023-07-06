import { useEffect, useState, memo, useCallback, useMemo } from 'react';
import './App.css';

const TextBlock = memo(({ stateParent }) => {
  useEffect(() => {console.log('Render TextBlock')})
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(stateParent / 2)
  }, [stateParent])

  const countda = useMemo(() =>{
    return stateParent / 2
  }, [stateParent])

  return (
    <div className="TextBlock" style={{ background: 'grey'}}>
      <p>
        TextBlock
      </p>
      <p>ИТОГ: {count}</p>
    </div>
  );
})

const CounterBlock = memo(({ addCountParent }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {console.log('Render CounterBlock')})

  return (
    <div className="CounterBlock" style={{ background: 'red'}}>
      <p>
        CHILDREN block: {count}
      </p>
      <button onClick={() => {setCount(prev => ++prev)}}>Add count CHILDREN</button>
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
      <TextBlock stateParent={count} />
      <CounterBlock addCountParent={setParentFromChildren} />
    </div>
  );
}

export default App;
