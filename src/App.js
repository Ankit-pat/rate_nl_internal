import { useEffect } from 'react';
import ListAudio from "./components/listaudio";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAudioList } from "./reducers/usersreducer";
import './App.css';

const App = () => {
  const userUid = useSelector((state) => state.users.userUid)
  const dispatch = useDispatch()
  console.log(userUid);

  // set user unique id onmount for the first time only
  // if not already set
  useEffect(() => {
    dispatch(fetchAudioList(userUid));
    console.log('I executed ...')
  }, []);

  return (
    <div className="App">
      <ListAudio />
    </div>
  );
}

export default App;
