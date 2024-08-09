import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
   return (
      <Grid
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justifyContent="center"
         sx={{minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 2}}
      >
         <Grid item xs={12}>
            <StarOutline sx={{fontSize: 100, color:'secondary.main'}}/>
         </Grid>
         <Grid item xs={12}>
            <Typography color="secondary.main" variant="h5">
               Create or Select an annotation
            </Typography>
         </Grid>
      </Grid>
   )
}
