import React from 'react';
import { withFirebase } from  '../../Firebase';
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

function ProjectList(props) {
    const {loading, projects, editProject, setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteProject = (i) => {
        // Get key of project in firebase
       const projectKey = Object.keys(projects)[i];
       // Connect to our firebase API
       const emptyProject = {
            projectName: null, 
            employee: null, 
            cost: null, 
            instructions: null, 
            completed: null, 
       };

       props.firebase.updateProject(props.authUser.uid, emptyProject, projectKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted project');
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
                projects === 'not set' || projects === null
                    ? <p>No projects added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>Assigned Employee</TableCell>
                                    <TableCell>Estimated Cost</TableCell>
                                    <TableCell>Instructions</TableCell>
                                    <TableCell>Completed?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(projects).map((project, i) => {
                                    let {projectName, employee, cost, instructions, completed} = project;
                                    // switch(project.type) {
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
                                            <TableCell>{projectName}</TableCell>
                                            <TableCell>{employee}</TableCell>
                                            <TableCell>{cost}</TableCell>
                                            <TableCell>{instructions}</TableCell>
                                            <TableCell>{completed}</TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    onClick={e => deleteProject(i)}
                                                />
                                                <EditIcon
                                                    onClick={e => editProject(project, i)}
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

export default withFirebase(ProjectList);