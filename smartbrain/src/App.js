import React,{Component} from 'react';
// import logo from './logo.svg';
import 'tachyons';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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

const initialState = {
    input: '',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn: false,
    user:{
     id:'',
     name:'',
     email:'',
     entries:0,
     joined:''
  }
}

class App extends Component{

  constructor(){
   super();
   this.state = initialState;
   
  }

  // componentDidMount(){
  //   fetch('https://facedetectsmartness.herokuapp.com')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  loadUser = (data) =>{
     this.setState({user:{
       id:data.id,
       name:data.name,
       email:data.email,
       entries:data.entries,
       joined:data.joined
     }

     })
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box:box})
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    
        fetch('https://facedetectsmartness.herokuapp.com/imageurl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              input:this.state.input
            })
          })
          .then(response => response.json())
      .then(response =>{
        if(response){
          fetch('https://facedetectsmartness.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count =>{
            this.setState(
              this.setState(Object.assign(this.state.user,{entries:count}))
            )
          })
          .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
      // there was an error
  }

  onRouteChange = (route) =>{
    if(route === 'home'){
      this.setState({isSignedIn:true})
    }else{
      this.setState(initialState)
    }
    this.setState({route:route})
  }

  render(){
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'  
         params={particlesOptions}
            />
        <Navigation 
        onRouteChange={this.onRouteChange}
        isSignedIn={isSignedIn}
        />
             {/* <Particles/> */}
        
        { route === 'home'
           ?<div>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm 
                    onInputChange={ this.onInputChange }
                    onButtonSubmit={this.onButtonSubmit}/>
                  
                  <FaceRecognition box={ box }
                   imageUrl={imageUrl}/>
            </div> 
           :(
             route === 'signin'? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
           )
        }
      </div>
    );
    }
}


export default App;
