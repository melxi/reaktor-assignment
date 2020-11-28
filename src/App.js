import { Switch, Route } from 'react-router-dom';
import Products from './pages/Products';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path='/products/:category' component={Products} />
      </Switch>
    </>
  );
}

export default App;
