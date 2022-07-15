import { makeStyles } from "@mui/styles"

export default makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: 5,
    },
  },
  paper: {
    padding: 10,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 1,
  },
  galleries: {
    fontWeight: 600,
    background: '-webkit-linear-gradient(#04fffb, #0284fe)',
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
});