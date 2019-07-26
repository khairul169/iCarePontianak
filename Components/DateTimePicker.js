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
      const dateTime =
        moment(date).format("YYYY-MM-DD") +
        " " +
        moment(time).format("HH:mm:ss");

      onValueChange && onValueChange(dateTime);
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
