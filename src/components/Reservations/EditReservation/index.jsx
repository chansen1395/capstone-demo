import React, { useState } from 'react';
import { withFirebase } from '../../Firebase';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { TimePicker } from '@mui/lab';


const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function EditReservation(props) {
    const classes = useStyles();

    const {authUser, firebase, reservation, reservationKey, setEditing, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    // Set default reservation object
    const defaultReservation = {
        organizer: reservation.organizer, 
        groupName: reservation.groupName, 
        visitTime: reservation.visitTime, 
        groupSize: reservation.groupSize, 
        activities: reservation.activities, 
        notes: reservation.notes, 
        email: reservation.email
    }

    const [newReservation, setNewReservation] = useState(defaultReservation);

    const handleChange = e => {
        const { name, value } = e.target
        setNewReservation({
            ...newReservation, 
            [name]: value});
    }
    // const handleOrganizerChange = e => {
    //     const { organizer, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [organizer]: value});
    // }
    // const handleGroupNameChange = e => {
    //     const { groupName, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [groupName]: value});
    // }
    // const handleVisitTimeChange = e => {
    //     const { visitTime, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [visitTime]: value});
    // }
    // const handleGroupSizeChange = e => {
    //     const { groupSize, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [groupSize]: value});
    // }
    // const handleActivitiesChange = e => {
    //     const { activities, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [activities]: value});
    // }
    // const handleNotesChange = e => {
    //     const { notes, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [notes]: value});
    // }
    // const handleEmailChange = e => {
    //     const { email, value } = e.target
    //     setNewReservation({
    //         ...newReservation, 
    //         [email]: value});
    // }

    const isValid = newReservation.name === '';

    // Add the reservation to firebase via the API made in this app
    const handleSubmit = action => {
        if (authUser) {
            firebase.updateReservation(uid, newReservation, reservationKey);
            setEditing(false);
            // Show alert and hide after 3sec
            setOpenSnackbar(true);
            setSnackbarMsg('Updated reservation');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        };
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
            <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Reservation organizer"
                    value={newReservation.organizer}
                    organizer="organizer"
                    onChange={handleChange}
                />

                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Reservation groupName"
                    value={newReservation.groupName}
                    groupName="groupName"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Reservation Visit Time"
                    value={newReservation.visitTime}
                    visitTime="visitTime"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    margin="normal"
                    required
                    fullWidth
                    label="Reservation Group Size"
                    value={newReservation.groupSize}
                    groupSize="groupSize"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Activities"
                    value={newReservation.activities}
                    activities="activities"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Misc. Notes"
                    value={newReservation.notes}
                    notes="notes"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    label="Contact E-mail"
                    value={newReservation.email}
                    email="email"
                    onChange={handleChange}
                />
                
                {/* <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={newReservation.name}
                    label="Reservation name"
                    name="name"
                    onChange={handleChange}
                />
                
                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newReservation.type}
                        style={{minWidth: '100%'}}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Lifting Weights</MenuItem>
                        <MenuItem value={2}>Running</MenuItem>
                        <MenuItem value={3}>Cycling</MenuItem>
                    </Select>
                </div>
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider
                    defaultValue={parseInt(newReservation.duration)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={120}
                    name="duration"
                    onChange={handleSlider}
                    style={{marginBottom: '20px'}}
                /> */}
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSubmit('add')}
                disabled={isValid}
            >
            Save reservation
            </Button>
        </form>
    )
};

export default withFirebase(EditReservation);