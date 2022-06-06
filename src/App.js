import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {
  return (
    <div className="App">
        {/* <p style ="background-image: url('../public/park.jpg');"></p> */}


        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}

        {/* <Widgets /> */}
    </div>
  );
}

export default App;
