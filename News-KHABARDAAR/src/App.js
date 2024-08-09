import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News2 from './components/News2';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  // state={
  //   progress:0,
  // }

  // setProgress=(progress)=>{
  //   this.state.progress({progress: progress})useRef
  // }

  render() {
    return (
      <div>
         <Router>
        <Navbar/>
        {/* <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      /> */}
        <Routes>

        <Route exact path="/" element={<News2 key="general" country="in" category="general"/>}/>
        <Route exact path="/business" element={<News2 key="business" country="in" category="business"/>}/>
        <Route exact path="/entertainment" element={<News2 key="entertainment" country="in" category="entertainment"/>}/>
        <Route exact path="/general" element={<News2 country="in" key="general" category="general"/>}/>
        <Route exact path="/health" element={<News2 country="in" key="health" category="health"/>}/>
        <Route exact path="/science" element={<News2 country="in" key="science" category="science"/>}/>
        <Route exact path="/sports" element={<News2 country="in" key="sports" category="sports"/>}/>
        <Route exact path="/technology" element={<News2 country="in" key="technology" category="technology"/>}/>
        
        </Routes>
         </Router>
      </div>
    )
  }
}
