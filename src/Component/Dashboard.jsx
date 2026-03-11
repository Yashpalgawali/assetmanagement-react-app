import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Dashboard(){

return(

<div>

<Typography variant="h4" mb={3}>Dashboard</Typography>

<Grid container spacing={3}>

<Grid item xs={12} md={4}>
<Paper sx={{p:3}}>
<Typography variant="h6">Total Assets</Typography>
<Typography variant="h4">125</Typography>
</Paper>
</Grid>

<Grid item xs={12} md={4}>
<Paper sx={{p:3}}>
<Typography variant="h6">Companies</Typography>
<Typography variant="h4">12</Typography>
</Paper>
</Grid>

<Grid item xs={12} md={4}>
<Paper sx={{p:3}}>
<Typography variant="h6">Assigned Assets</Typography>
<Typography variant="h4">78</Typography>
</Paper>
</Grid>

</Grid>

</div>

)
}