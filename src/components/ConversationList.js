import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewConversationPopup from './NewConversationPopup';
import '../styles/ConversationPopup.css'; 

// Import images
import alicePic from '../data/dp/alice.jpg';
import bobPic from '../data/dp/bob.jpeg';
import charliePic from '../data/dp/charlie.jpeg';

const profilePictures = {
  1: alicePic,
  2: bobPic,
  3: charliePic,
};

function ConversationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const conversations = useSelector(state => state.conversations.conversations);
  const contacts = useSelector(state => state.conversations.contacts);

  const filteredConversations = conversations.filter(conv => {
    const contact = contacts.find(contact => contact.id === conv.contactId);
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="conversation-list">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setShowPopup(true)}>New Conversation</button>
      {filteredConversations.map(conv => {
        const contact = contacts.find(contact => contact.id === conv.contactId);
        const lastMessage = conv.messages[conv.messages.length - 1];
        return (
          <Link key={conv.id} to={`/chat/${conv.id}`}>
            <div className="conversation">
              <img src={profilePictures[contact.id]} alt={contact.name} className="profile-picture" />
              <div>
                <div className="contact-name">{contact.name}</div>
                <div className="last-message">{lastMessage?.text}</div>
              </div>
            </div>
          </Link>
        );
      })}
      {showPopup && (
        <div className="popup-overlay">
          <NewConversationPopup onClose={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
}

export default ConversationList;