import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { SavingNote, startDeletingNote, startUploadingFiles } from "../../store/journal/thunks"

export const NoteView = () => {

   const dispatch = useDispatch();
   const { active:note, savedMessage, isSaving } = useSelector( state => state.journal);

   const { body, title, onInputChange, date, formState} = useForm( note );

   const dateString = useMemo(() => {
      const newDate = new Date( date );
      return newDate.toUTCString();
   }, [date]);

   const fileInputRef = useRef();

   useEffect(() => {
      dispatch( setActiveNote( formState ) );
   }, [formState]);

   useEffect(() => {
      if (savedMessage.length > 0) {
         Swal.fire('Note Updated', savedMessage, 'success');
      }
   }, [savedMessage]);

   const onSaveNote = () => {
      dispatch( SavingNote() );
   };

   const onFileInputChange = ({ target }) => {
      if ( target.files === 0) return;

      dispatch( startUploadingFiles( target.files ) );
   }

   const onDelete = () => {
      dispatch( startDeletingNote() );
   }

   return (
      <>
         <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center'
            sx={{mb: 1}}
         >
            <Grid item>
               <Typography fontSize={39} fontWeight='light'>
                  { dateString }
               </Typography>
            </Grid>
            <Grid item>

               <input 
                  type="file" 
                  multiple
                  ref={ fileInputRef }
                  onChange={ onFileInputChange }
                  style={{ display: 'none' }}
               />

               <IconButton
                  color='primary'
                  disabled={ isSaving }
                  onClick={ () => fileInputRef.current.click() }
               >
                  <UploadOutlined />
               </IconButton>

               <Button 
                  color="primary" 
                  sx={{padding: 2}}
                  onClick={ onSaveNote }
                  disabled={ isSaving }
               >
                  <SaveOutlined sx={{fontSize: 30, mr: 1}}
                  />
                  Save
               </Button>
            </Grid>

            <Grid container>
               <TextField 
                  type="text"
                  variant="filled"
                  fullWidth
                  placeholder="Your title"
                  label="Title"
                  sx={{border: 'none', mb: 1}}
                  name="title"
                  value={ title }
                  onChange={ onInputChange }
               />

               <TextField 
                  type="text"
                  variant="filled"
                  fullWidth
                  multiline
                  placeholder="What's up Today?"
                  minRows={5}
                  name="body"
                  value={ body }
                  onChange={ onInputChange }
               />
            </Grid>

            <Grid container justifyContent='end'>
               <Button
                  onClick={ onDelete }
                  sx={{ mt: 2 }}
                  color='error'
               >
                  <DeleteOutline />
                  Borrar
               </Button>
            </Grid>
            
            <ImageGallery images={ note.imageUrls } />

         </Grid>
      </>
   )
}
