import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from './models/Navigation';
import Routers from './models/Routers';
import {AsideDelivered} from './models/Models';
import Footer from './models/Footer';
import { useEffect, useState } from 'react';
import { unSubscriber } from './stores/FirebaseConfig';
import NotFoundPage from './NotFoundPage';

function App() {

  //get data from firebase, store them into _courses and load page
  const [loading, setLoading] = useState(true);
  const [_courses, setDataCourses] = useState([])
  useEffect(() => {
      return unSubscriber(setDataCourses, setLoading, 'Courses', ['videos']);
  }, []);


  //loading success if _courses store all of the data from firebase.
  //Otherwise, loading page
  if(loading){
      return <NotFoundPage loadingPage ={true}/>
  }
  return (    
    <div>
        {
          _courses.length <= 0 ? <h1>Data is empty</h1> : 
          <div className="App">
            <Router>
              <header className="App-header">
                <Navigation  _courses_ = {_courses}/> {/* tranfer all data courses to Navigation */}
              </header>
              <main>
                <Routers  _courses_ = {_courses}/>  {/* tranfer all data courses to Home */}
              </main>
              <footer>
                <AsideDelivered/>
              </footer>
              <Footer/>
            </Router>
          </div>
        }
    </div> 
  );
}

export default App;
