import React, { useRef } from "react";
import emailjs from "emailjs-com";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MuiImageSlider from "mui-image-slider";

import icestorm from "../img/icestorm.jpg";
import wildfires from "../img/wildfires.jpg";
import rainbow from "../img/rainbow.jpg";

import useStyles from "../config/theme.signinup";

export const ContactUs = () => {
  const classes = useStyles();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fp25jfp",
        "contact_template_satg",
        form.current,
        "user_pR7qUbAWiWbrbBKSdeVhS"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const images = [
    icestorm,
    wildfires,
    rainbow
  ];
  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="name" required/>
    //   <label>Email</label>
    //   <input type="email" name="email" required/>
    //   <label>Name of Group</label>
    //   <input type="text" name="group_name"/>
    //   <label>How many visitors?</label>
    //   <input type="number" name="group_size" step/>
    //   <label>Planned date of visit</label>
    //   <input type="date" name="visit_date"/>
    //   <label>Describe any planned activities or anything else you'd like to share.</label>
    //   <textarea name="notes" />
    //   <input type="submit" value="Send" />
    // </form>

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} container alignItems="center">
        <MuiImageSlider images={images} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Contact Us - Request a visit
          </Typography>
          <form
            // className={classes.form}
            // noValidate
            ref={form}
            onSubmit={sendEmail}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Group Name"
              name="group_name"
              autoFocus
            />
            <TextField
              type="number"
              step={1}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Group Size"
              name="group_size"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="date"
              fullWidth
              label="Planned date of visit"
              name="visit_date"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={5}
              fullWidth
              name="notes"
              label="Describe any planned activities or anything else you'd like to share."
              type="textarea"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
