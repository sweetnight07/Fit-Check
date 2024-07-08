import Typewriter from "./components/Typewriter";
import "./assets/styles/App.css";
import face from "../src/assets/images/ai_face.png";

function App() {
  return (
    <div className="App">
      <div className="typewriter-text-container">
        <Typewriter
          text="Hello! Welcome to Fit Check. This is a website that helps you save and assess different types of outfit. TO START SIGN UP OR LOGIN"
          speed={70}
          pause={1000}
        />
      </div>
      <img src={face} className="model_image"></img>

      <button className="button signup">Sign Up</button>
      <button className="button login">Login</button>
    </div>
  );
}

export default App;
