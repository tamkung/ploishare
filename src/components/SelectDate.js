import React, { useState } from 'react'
import { Button, Form, DatePicker, TimePicker, Switch } from 'antd';

const SelectDate = () => {
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };

  const onStartTimeChange = (time) => {
    setStartTime(time);
  };

  const onEndTimeChange = (time) => {
    setEndTime(time);
  };

  const onEndDateSwitchChange = (value) => {
    setEndDateDisabled(value);
  };
  const disabledMinutes = (selectedHour) => {
    return [0].filter((item) => item > selectedHour % 30);
  };

  // Disable hours outside of the 7:00 AM to 7:00 PM range
  // const disabledHours = () => {
  //   return [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23];
  // };
  return (
    <Form>
      <Form.Item label="Start Date">
        <DatePicker onChange={onStartDateChange} />
      </Form.Item>
      <Form.Item label="End Date">
        <DatePicker
          disabled={endDateDisabled}
          onChange={onEndDateChange}
        />
      </Form.Item>
      <Form.Item label="Start Time">
        <TimePicker
          format="h:mm"
          minuteStep={30}
          disabledMinutes={disabledMinutes}
          // hide={disabledHours}
          onChange={onStartTimeChange} />
      </Form.Item>
      <Form.Item label="End Time">
        <TimePicker onChange={onEndTimeChange} />
      </Form.Item>
      <Form.Item label="Disable End Date">
        <Switch
          checked={endDateDisabled}
          onClick={onEndDateSwitchChange}
        />
      </Form.Item>
    </Form>
  );
};
export default SelectDate;