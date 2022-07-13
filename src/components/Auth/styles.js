import { makeStyles } from "@mui/styles";

export default makeStyles({
    paper: {
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
    },
    root: {
      '& .MuiTextField-root': {
        margin: 5,
      },
    },
    avatar: {
      margin: 10,
    //   backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '30px',
    },
    submit: {
      marginTop: '100px',
    },
    googleButton: {
    //   marginBottom: theme.spacing(2),
    },
  });