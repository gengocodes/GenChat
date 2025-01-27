import React from 'react';
import './App.css';
import ChatRoom from './ChatRoom/ChatRoom';
import SignIn from './SignIn/SignIn';

import { auth } from './FirebaseConfig/FirebaseConfig';
// Hooks
import { useAuthState} from 'react-firebase-hooks/auth';

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <header>
      </header>

      <section>
        
        {user ? <ChatRoom /> : <SignIn />}
   
      </section>

    </div>
  );
}

export default App;




