import React,{Component} from 'react';
// import logo from './logo.svg';
import 'tachyons';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
  apiKey: 'a4fcf383dba74dbd9df3bdc7ea53269d'
 });

const particlesOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component{

  constructor(){
   super();
   this.state = {
     input: '',
     imageUrl:''
   } 
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }
  render(){

    return (
      <div className="App">
        <Particles className='particles'  
         params={particlesOptions}
            />
             {/* <Particles/> */}
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
        
      </div>
    );
    }
}


export default App;
