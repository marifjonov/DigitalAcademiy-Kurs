import React, { useState } from "react";
import './App.css';  // Import the CSS file

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="form-structor">
      {isLogin ? (
        <div className="login">
          <div className="center">
            <h2 className="form-title" id="login" onClick={toggleForm}>
              <span>or</span>Log in press on me
            </h2>
            <div className="form-holder">
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn">Log in</button>
          </div>
        </div>
      ) : (
        <div className="signup">
          <h2 className="form-title" id="signup" onClick={toggleForm}>
            <span>or</span>Sign up press on me
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="Name" />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <button className="submit-btn">Sign up</button>
        </div>
      )}
    </div>
  );
}

export default App;
