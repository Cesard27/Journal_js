import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving    : false,
      savedMessage: '',
      notes       : [],
      // date        : Date,
      active      : null
   },
   reducers: {
      addNewEmptyNote: (state, action) => {
         state.notes.push( action.payload );
         state.isSaving = false;
      },
      setActiveNote: (state, action) => {
         state.active = action.payload;
         state.savedMessage = '';
      },
      setNotes: (state, action) => {
         state.notes = action.payload
      },
      setSaving: (state) => {
         state.isSaving = true;
         state.savedMessage = '';
      },
      updateNote: (state, action) => {
         state.isSaving = false;
         state.notes = state.notes.map( note => {
            if( note.id == action.payload.id){
               return action.payload;
            }
            return note;
         })

         state.savedMessage = `${ action.payload.title}, changes saved`;
      },
      deleteNoteById: (state, action) => {
         state.active = null;
         state.notes = state.notes.filter( note => note.id !== action.payload);
      },
      savingNewNote: (state) => {
         state.isSaving = true
      },
      setPhotosToActiveNote: ( state, action ) => {
         state.active.imageUrls = [ ...(state.active.imageUrls?.length ? state.active.imageUrls :   []), ...action.payload]
         state.isSaving = false;
      },
      clearNotesWhenLogout: ( state ) => {
         state.isSaving = false;
         state.savedMessage = '';
         state.notes = [];
         state.active = null;
      }
   },
})

export const { 
   addNewEmptyNote, 
   clearNotesWhenLogout,
   deleteNoteById,
   savingNewNote,
   setActiveNote, 
   setNotes, 
   setPhotosToActiveNote,
   setSaving,  
   updateNote,
} = journalSlice.actions;