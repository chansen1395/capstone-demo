import React, { useState } from "react";
import { withFirebase } from "../../Firebase";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddReservation(props) {
  const classes = useStyles();

  const { authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg } =
    props;
  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
  const CurrentTime = moment().format("hh:mm");

  // Set default reservation object
  const defaultReservation = {
    organizer: "",
    groupName: "",
    visitTime: CurrentTime,
    groupSize: 0,
    activities: "",
    notes: "",
    email: "",
    date: queryDate,
  };

  const [reservation, setReservation] = useState(defaultReservation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      date: queryDate,
      [name]: value,
    });
  };

  const isValid = reservation.name === "";

  // Add the reservation to firebase via the API made in this app
  const handleSubmit = () => {
    if (authUser) {
      firebase.addReservation(uid, reservation);
      setReservation(defaultReservation);
      // Show notification
      setOpenSnackbar(true);
      setSnackbarMsg("Added reservation");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Reservation organizer"
          value={reservation.organizer}
          name="organizer"
          onChange={handleChange}
        />

        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Reservation Group Name"
          value={reservation.groupName}
          name="groupName"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Reservation Visit Time"
          value={reservation.visitTime}
          name="visitTime"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          margin="normal"
          required
          fullWidth
          label="Reservation Group Size"
          value={reservation.groupSize}
          name="groupSize"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Activities"
          value={reservation.activities}
          name="activities"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Misc. Notes"
          value={reservation.notes}
          name="notes"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          type="email"
          margin="normal"
          required
          fullWidth
          label="Contact E-mail"
          value={reservation.email}
          name="email"
          onChange={handleChange}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add reservation
      </Button>
    </form>
  );
}

export default withFirebase(AddReservation);
