import React from 'react';
import { withFirebase } from  '../Firebase';
import loader from './loader.gif';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ReservationList(props) {
    const {loading, reservations, editReservation,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteReservation = (i) => {
        // Get key of reservation in firebase
       const reservationKey = Object.keys(reservations)[i];
       // Connect to our firebase API
       const emptyReservation = {
            organizer: null, 
            groupName: null, 
            visitTime: null, 
            groupSize: null, 
            activities: null, 
            notes: null, 
            email: null,
       };

       props.firebase.updateReservation(props.authUser.uid, emptyReservation, reservationKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted reservation');
       setTimeout(() => {
        setOpenSnackbar(false)
       }, 3000)

       // stop editing
       setEditing(false);
    }

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
                reservations === 'not set' || reservations === null
                    ? <p>No reservations added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Organizer</TableCell>
                                    <TableCell>Group Name</TableCell>
                                    <TableCell>Visit Time</TableCell>
                                    <TableCell>Group Size</TableCell>
                                    <TableCell>Activities</TableCell>
                                    <TableCell>Misc Notes</TableCell>
                                    <TableCell>E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(reservations).map((reservation, i) => {
                                    let {organizer, groupName, visitTime, groupSize, activities, notes, email} = reservation;
                                    // switch(reservation.type) {
                                    //     case 1:
                                    //         type = "Lifting weights";
                                    //         break;
                                    //     case 2:
                                    //         type = "Running";
                                    //         break;
                                    //     case 3:
                                    //         type = "Cycling";
                                    //         break;
                                    //     default:
                                    //         type = "Not set";
                                    // };
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{organizer}</TableCell>
                                            <TableCell>{groupName}</TableCell>
                                            <TableCell>{visitTime}</TableCell>
                                            <TableCell>{groupSize}</TableCell>
                                            <TableCell>{activities}</TableCell>
                                            <TableCell>{notes}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    onClick={e => deleteReservation(i)}
                                                />
                                                <EditIcon
                                                    onClick={e => editReservation(reservation, i)}
                                                    style={{marginLeft:"20px"}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ReservationList);