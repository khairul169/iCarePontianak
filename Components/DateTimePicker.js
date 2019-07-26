import React, { Component } from "react";
import DTPicker from "@react-native-community/datetimepicker";
import moment from "moment";
import PropTypes from "prop-types";

class DateTimePicker extends Component {
  static propTypes = {
    onValueChange: PropTypes.func
  };

  state = {
    date: new Date(),
    time: new Date(),
    mode: null
  };

  _dateTimeUnix = (date, time) => {
    // Convert to string
    const dateString = moment(date).format("DD-MM-YYYY");
    const timeString = moment(time).format("HH:mm:ss");

    // Concatenated date and time
    const dateTime = moment(
      dateString + " " + timeString,
      "DD-MM-YYYY HH:mm:ss"
    );

    // Returns time in unix miliseconds
    return dateTime.valueOf();
  };

  _dateChanged = (event, value) => {
    const { mode } = this.state;
    const { onValueChange } = this.props;

    let date = this.state.date;
    let time = this.state.time;

    switch (mode) {
      case "date":
        date = value || date;
        break;

      case "time":
        time = value || time;
        break;
    }

    this.setState({
      date,
      time,
      mode: mode === "date" ? "time" : null
    });

    if (mode === "time") {
      // Get unix time
      const unixTime = this._dateTimeUnix(date, time);

      // Value changed callback
      onValueChange && onValueChange(unixTime);
    }
  };

  show() {
    this.setState({
      mode: "date"
    });
  }

  hide() {
    this.setState({
      mode: null
    });
  }

  render() {
    const { mode, date, time } = this.state;

    return mode ? (
      <DTPicker
        value={mode === "date" ? date : time}
        mode={mode}
        is24Hour={true}
        onChange={this._dateChanged}
      />
    ) : null;
  }
}

export default DateTimePicker;
