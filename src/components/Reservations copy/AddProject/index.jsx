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
import moment from 'moment';
import { Check, CheckBox } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function AddProject(props) {
    const classes = useStyles();

    const {authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
    const CurrentTime = moment().format('hh:mm');

    // Set default project object
    const defaultProject = {
        projectName: '', 
        employee: '', 
        cost: 0, 
        instructions: '', 
        completed: false
    }

    const [project, setProject] = useState(defaultProject);



    const handleChange = e => {
        const { name, value } = e.target
        setProject({
            ...project, 
            date: queryDate,
            [name]: value});
    }

    const isValid = project.name === '';

    // Add the project to firebase via the API made in this app
    const handleSubmit = () => {
        if (authUser) {
            firebase.addProject(uid, project);
            setProject(defaultProject);
            // Show notification
            setOpenSnackbar(true);
            setSnackbarMsg('Added project');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        }
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
                    label="Project name"
                    value={project.name}
                    name="projectName"
                    onChange={handleChange}
                />

                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Employee Assigned"
                    value={project.employee}
                    name="employee"
                    onChange={handleChange}
                />
                {/* <TimePicker */}
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    label="Estimated Cost"
                    value={project.cost}
                    name="cost"
                    onChange={handleChange}
                />
                <TextField
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Instructions"
                    value={project.instructions}
                    name="instructions"
                    onChange={handleChange}
                />
                <CheckBox
                    style={{marginTop: '5px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Completed?"
                    value={project.completed}
                    name="completed"
                    onChange={handleChange}
                />
                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                </div>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isValid}
            >
            Add project
            </Button>
        </form>
    )
};

export default withFirebase(AddProject);