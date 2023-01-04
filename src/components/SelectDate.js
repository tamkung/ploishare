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

  const handleSubmit = (e) => {


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
            console.log('Date Stared : ', value.format('YYYY-MM-DD'));
            //console.log('Date Stared : ', dateString[0]);
            //console.log('Formatted Selected Time: ', dateString[1]+'/n'+dateString[1])
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
            console.log('Date Stared : ', value.format('YYYY-MM-DD'));
            //console.log('Date Stared : ', dateString[0]);
            //console.log('Formatted Selected Time: ', dateString[1]+'/n'+dateString[1])
          }}
          locale={locale}
          disabledDate={disabledDate}
          format={'DD-MM-YYYY'}
        />
      </Form.Item>
      <Form.Item label="Start Time">
        <TimePicker
          format="hh:mm"
          minuteStep={30}
          locale={locale}
          disabledMinutes={disabledMinutes}
          // hide={disabledHours}
          onChange={(value, dateString) => {
            console.log('Time Stared : ', value.format('hh:mm:00'));
            //console.log('Date Stared : ', dateString[0]);
            //console.log('Formatted Selected Time: ', dateString[1]+'/n'+dateString[1])
          }}
        />
      </Form.Item>
      <Form.Item label="End Time">
        <TimePicker
          format="hh:mm"
          minuteStep={30}
          locale={locale}
          onChange={onEndTimeChange}
        />
      </Form.Item>
      <Form.Item label="Disable End Date">
        <Switch
          checked={endDateDisabled}
          onClick={onEndDateSwitchChange}
        />
      </Form.Item>
      <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button>
    </Form>
  );
};
export default SelectDate;