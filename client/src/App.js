import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import GameDetails from './components/GameDetails/GameDetails';
import Landing from './components/Landing/Landing';
import FormCreateGame from './components/FormCreateGame/FormCreateGame';


function App() {
  return (
    <div className="App">
      
      <Route exact path='/'>
        <Landing/>
      </Route>

      <Route exact path='/home'>
        <Home/>
      </Route>

      <Route exact path='/create'>
        <FormCreateGame/>
      </Route>

      <Route exact path='/game/:id'>
        <GameDetails/>
      </Route>

    </div>
  );
}

export default App;
