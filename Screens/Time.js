import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export const GetDateAndTime = () => {
  const date = new Date().getDate();
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <Text style={styles.timeStampText}>
      {console.log('hi')}
      {weekDaySet(day)}, {date} {monthSet(month)} {year}{' '}
      {formatAMPM(new Date())}
      {/* {/ {timeDisplay} /} */}
    </Text>
  );
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function weekDaySet(weekDayNo) {
  switch (weekDayNo) {
    case 1:
      return 'MON';
    case 2:
      return 'TUE';
    case 3:
      return 'WED';
    case 4:
      return 'THU';
    case 5:
      return 'FRI';
    case 6:
      return 'SAT';
    case 7:
      return 'SUN';
    default:
      return 'DAY';
  }
}

function monthSet(monthNo) {
  switch (monthNo) {
    case 0:
      return 'JAN';
    case 1:
      return 'FEB';
    case 2:
      return 'MAR';
    case 3:
      return 'APR';
    case 4:
      return 'MAY';
    case 5:
      return 'JUN';
    case 6:
      return 'JUL';
    case 7:
      return 'AUG';
    case 8:
      return 'SEP';
    case 9:
      return 'OCT';
    case 10:
      return 'NOV';
    case 11:
      return 'DEC';
    default:
      return 'MONTH';
  }
}
const styles = StyleSheet.create({
  timeStampText: {
    top: 50,
    width: 220,
    height: 15,
    opacity: 0.6,
    //backgroundColor: '#000',
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 1.5,
    lineHeight: 15,
    textAlign: 'center',
  },
});
