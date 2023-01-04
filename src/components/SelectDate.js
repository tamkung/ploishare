import React, { useState } from 'react'
import { Button, Form, DatePicker, TimePicker, Switch } from 'antd';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';

const SelectDate = () => {
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const onStartDateChange = (date) => {
    setStartDate(date);
    console.log(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
    console.log(date);
  };

  const onStartTimeChange = (time) => {
    setStartTime(time);
    console.log(time);
  };

  const onEndTimeChange = (time) => {
    setEndTime(time);
    console.log(time);
  };

  const onEndDateSwitchChange = (value) => {
    setEndDateDisabled(value);
  };
  const disabledMinutes = (selectedHour) => {
    return [0].filter((item) => item > selectedHour % 30);
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const handleSubmit = async (e) => {

    console.log('StartDateTime : ', startDate, startTime);
    console.log('EndDateTime : ', endDate, endTime);

  };

  // Disable hours outside of the 7:00 AM to 7:00 PM range
  // const disabledHours = () => {
  //   return [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23];
  // };
  return (
    <Form>
      <Form.Item label="Start Date">
        <DatePicker
          onChange={(value, dateString) => {
            setStartDate(value.format('YYYY-MM-DD'));
            setEndDate(value.format('YYYY-MM-DD'));
            console.log('Date Start : ', value.format('YYYY-MM-DD'));
            console.log('Date End : ', value.format('YYYY-MM-DD'));
          }}
          locale={locale}
          disabledDate={disabledDate}
          format={'DD-MM-YYYY'}
        />
      </Form.Item>
      <Form.Item label="End Date">
        <DatePicker
          disabled={!endDateDisabled}
          onChange={(value, dateString) => {
            setEndDate(value.format('YYYY-MM-DD'));
            console.log('Date Stared : ', value.format('YYYY-MM-DD'));
          }}
          locale={locale}
          disabledDate={disabledDate}
          format={'DD-MM-YYYY'}
        />
      </Form.Item>
      <Form.Item label="Start Time">
        <TimePicker
          format="HH:mm"
          minuteStep={30}
          locale={locale}
          disabledMinutes={disabledMinutes}
          // hide={disabledHours}
          onChange={(value, dateString) => {
            setStartTime(value.format('HH:mm:00'));
            console.log('Time Stared : ', value.format('HH:mm:00'));
          }}
        />
      </Form.Item>
      <Form.Item label="End Time">
        <TimePicker
          format="HH:mm"
          minuteStep={30}
          locale={locale}
          disabledMinutes={disabledMinutes}
          onChange={(value, dateString) => {
            setEndTime(value.format('HH:mm:00'));
            console.log('Time Stared : ', value.format('HH:mm:00'));
          }}
        />
      </Form.Item>
      <Form.Item label="Disable End Date">
        <Switch
          checked={endDateDisabled}
          onClick={onEndDateSwitchChange}
          style={{ backgroundColor: endDateDisabled ? '#3355ff' : 'gray' }}
        />
      </Form.Item>
      <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button>
    </Form>
  );
};
export default SelectDate;