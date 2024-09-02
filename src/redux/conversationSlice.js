import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../data/dummyData.json'; // Ensure this file exists

const initialState = {
  contacts: dummyData.contacts,
  conversations: dummyData.conversations,
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    addConversation: (state, action) => {
      const { contactId } = action.payload;
      const existingConversation = state.conversations.find(conv => conv.contactId === contactId);
      if (!existingConversation) {
        state.conversations.push({
          id: state.conversations.length + 1,
          contactId,
          messages: [],
        });
      }
    },
  },
});

export const { addMessage, addConversation } = conversationSlice.actions;
export default conversationSlice.reducer;