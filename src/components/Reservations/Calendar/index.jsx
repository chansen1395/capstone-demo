import React, { useState, useEffect } from "react";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";

import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";

import AddReservation from "../AddReservation";
import EditReservation from "../EditReservation";
import ReservationList from "../ReservationList";

function Calendar(props) {
  const { firebase, authUser } = props;

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };

  /*** HOOKS ***/
  const [dateObject, setdateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);
  // Later add hook for active days from database

  /*** CALENDAR HEAD ***/
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format("MMMM");
  const currentYear = () => dateObject.format("YYYY");

  const setMonth = (month) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(dateObject).set("month", monthNo);
    setdateObject(newDateObject);
    setShowMonthTable(false);
  };

  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

  /*** CALENDAR BODY ***/
  const setSelectedDay = (day) => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
    // Later refresh data
  };

  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format("D");
  const actualMonth = () => moment().format("MMMM");

  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

  /*** ADDING A RESERVATION ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  /*** RESERVATION LIST ***/
  const [reservations, setReservations] = useState(true);
  const [loading, setLoading] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  const retrieveData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = firebase.db.ref().child(`users/${authUser.uid}/reservations`);
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setReservations(data);
        setLoading(false);
        // setEditing(false); Add later
      });

    // Update active days
    retrieveActiveDays();
  };

  const retrieveActiveDays = () => {
    let ref = firebase.db.ref().child(`users/${authUser.uid}/reservations`);
    ref.on("value", (snapshot) => {
      let data = snapshot.val();
      const values = Object.values(data);
      // Store all active day/month combinations in array for calendar
      const arr = values.map((obj) => {
        return obj.date.length === 8
          ? obj.date.slice(0, 3)
          : obj.date.slice(0, 4);
      });
      console.log(arr);
      setActiveDays(arr);
    });
  };

  useEffect(() => retrieveData(), [selectedDay]);

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [reservationKey, setReservationKey] = useState(null);

  const editReservation = (reservation, i) => {
    setReservationKey(Object.keys(reservations)[i]);
    setEditing(true);
    setReservation(reservation);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <CalendarHead
          allMonths={allMonths}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
          activeDays={activeDays}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className="paper">
          {editing ? (
            <>
              <h3>
                Edit reservation on {selectedDay.month + 1} / {selectedDay.day}{" "}
              </h3>
              <EditReservation
                reservation={reservation}
                reservationKey={reservationKey}
                selectedDay={selectedDay}
                authUser={props.authUser}
                setEditing={setEditing}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          ) : (
            <>
              <h3>
                Add reservation on {selectedDay.month + 1} / {selectedDay.day}{" "}
              </h3>
              <AddReservation
                selectedDay={selectedDay}
                authUser={props.authUser}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper className="paper">
          <h3>
            Reservations on {selectedDay.month + 1} / {selectedDay.day}
          </h3>
          <ReservationList
            loading={loading}
            reservations={reservations}
            authUser={props.authUser}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMsg={setSnackbarMsg}
            editReservation={editReservation}
            setEditing={setEditing}
          />
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        message={snackbarMsg}
      />
    </Grid>
  );
}

export default Calendar;
