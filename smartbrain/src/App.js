import React from 'react';
// import logo from './logo.svg';
import 'tachyons';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number:{
      value:80,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className='particles'  
       params={particlesOptions}
          />
           {/* <Particles/> */}
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      {
        // <FaceRecognition />
      }
    </div>
  );
}

export default App;
