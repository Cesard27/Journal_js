import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
   palette: {
      primary:{
         main: '#0E440D'
      },
      secondary:{
         main: '#FFFFE8'
      },
      error: {
         main: red.A400
      }
   }
})