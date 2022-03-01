import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchAudioList } from './asyncActions/audios';
import Dashboard from './containers/Dashboard';

const App = () => {
  const userUid = useSelector((state) => state.audio.userUid)
  const dispatch = useDispatch()

  // set user unique id onmount for the first time only
  // if not already set
  useEffect(() => {
    dispatch(fetchAudioList(userUid));
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
