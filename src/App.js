import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import './styles/styles.css'; // Ensure this file exists

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <ConversationList />
          <Routes> {/* Updated Switch to Routes */}
            <Route path="/chat/:id" element={<ChatWindow />} /> {/* Updated component to element */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;