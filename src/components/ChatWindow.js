import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessage } from '../redux/conversationSlice';

// Import images
import alicePic from '../data/dp/alice.jpg';
import bobPic from '../data/dp/bob.jpeg';
import charliePic from '../data/dp/charlie.jpeg';

const profilePictures = {
  1: alicePic,
  2: bobPic,
  3: charliePic,
};

function ChatWindow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const conversation = useSelector(state =>
    state.conversations.conversations.find(conv => conv.id === parseInt(id))
  );
  const contact = useSelector(state =>
    state.conversations.contacts.find(contact => contact.id === conversation.contactId)
  );
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(addMessage({ conversationId: conversation.id, message: { text: message, sender: 'me' } }));
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={profilePictures[contact.id]} alt={contact.name} className="profile-picture" />
        {contact.name}
      </div>
      <div className="chat-messages">
        {conversation.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;