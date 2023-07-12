import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { fetchContacts, addContact, deleteContact } from './operations'


const initialState = {
    items: [],
    isLoading: false,
    error: null
}

const handlePending = (state) => {
  state.isLoading=true
}

const handleRejected = (state, action) => {
        state.isLoading = false;
        state.error=action.payload
}

const handleFulfilled = (state) => {
      state.isLoading = false;
      state.error=null
}

const handleFulfilledGet = (state, action) => {
        state.items = action.payload;
        handleFulfilled(state)
}
      
const handleFulfilledAdd=(state, action) => {
        state.items.push(action.payload)
        handleFulfilled(state)
}
    
const handleFulfilledDelete=(state, action) => {
        state.items=state.items.filter(({id})=>id!==action.payload.id)
        handleFulfilled(state)
    }

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: (builder) => {
    // функция extraReducers принимает объект builder, который предоставляет методы для добавления дополнительных редюсеров
    builder
      // .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
    //   .addCase(fetchContacts.rejected, handleRejected)
    // .addCase(addContact.pending, handlePending)
    .addCase(addContact.fulfilled, handleFulfilledAdd)
    // .addCase(addContact.rejected, handleRejected)
    // .addCase(deleteContact.pending, handlePending)
    .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      // .addCase(deleteContact.rejected, handleRejected)
      // функция isAnyOf используется для проверки, является ли текущее действие одним из указанных 
      .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), handlePending)
      .addMatcher(isAnyOf(fetchContacts.rejected,addContact.rejected, deleteContact.rejected), handleRejected)
  },
  
}
)

