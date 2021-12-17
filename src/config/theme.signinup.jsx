import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        // backgroundImage: 'url(https://source.unsplash.com/collection/8172461/1500xauto)',
        backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/farm-quotes-1580917869.jpg?crop=0.723xw:1.00xh;0.189xw,0&resize=640:*)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2em',
    },
    logoText: {
        fontWeight: 'bold'
    },
    error: {
        color: 'red'
    }
}));

export default useStyles;