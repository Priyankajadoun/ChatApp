import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addConversation } from '../redux/conversationSlice';


function NewConversationPopup({ onClose }) {
  const contacts = useSelector(state => state.conversations.contacts);
  const dispatch = useDispatch();

  const handleStartConversation = (contactId) => {
    dispatch(addConversation({ contactId }));
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Select a contact to start a conversation</h3>
        {contacts.map(contact => (
          <div key={contact.id} onClick={() => handleStartConversation(contact.id)}>
            {contact.name}
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NewConversationPopup;