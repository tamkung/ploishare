import React, { useState } from 'react'
import { Button, Modal, Form, DatePicker, TimePicker, Switch } from 'antd';
import Swal from "sweetalert2";
import axios from "axios";
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';
import '../css/Booking.css';
import '../css/style.css';
import { API_URL } from "../Constant";

//react icon
import * as BsIcon5 from 'react-icons/bs'
const { confirm } = Modal;

const showPromiseConfirm = () => {
  confirm({
    title: 'Do you want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    title: "เลือกรถ",
    text: cars.license + " " + cars.brand + " " + cars.color,
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 5000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() { },
  });
};

const SelectDate = () => {
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [getCars, setGetCars] = useState([]);

  // const onStartDateChange = (date) => {
  //   setStartDate(date);
  //   console.log(date);
  // };

  // const onEndDateChange = (date) => {
  //   setEndDate(date);
  //   console.log(date);
  // };

  // const onStartTimeChange = (time) => {
  //   setStartTime(time);
  //   console.log(time);
  // };

  // const onEndTimeChange = (time) => {
  //   setEndTime(time);
  //   console.log(time);
  // };

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

  const availableCar = () => {

    axios
      .get(API_URL + `/api/getavailablecars?startDateTime=${startDate + " " + startTime}&endDateTime=${endDate + " " + endTime} `)
      .then((response) => {
        console.log(response.data);
        setGetCars(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {

    console.log('StartDateTime : ', startDate + startTime);
    console.log('EndDateTime : ', endDate, endTime);
    availableCar();

  };

  // Disable hours outside of the 7:00 AM to 7:00 PM range
  // const disabledHours = () => {
  //   return [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23];
  // };
  return (
    <div>
      <div className='container'>
        <Form>
          <Form.Item label="เลือกวันที่">
            <DatePicker style={{ width: "45%" }}
              onChange={(value, dateString) => {
                setStartDate(value.format('YYYY-MM-DD'));
                setEndDate(value.format('YYYY-MM-DD'));
                console.log('Date Start : ', value.format('YYYY-MM-DD'));
                console.log('Date End : ', value.format('YYYY-MM-DD'));
              }}
              locale={locale}
              disabledDate={disabledDate}
              format={'DD-MM-YYYY'}
              placeholder="เลือกวันที่เริ่มต้น"
            />
            <BsIcon5.BsArrowRightShort className='inline-flex mr-2 ml-2' />
            <DatePicker style={{ width: "45%" }}
              disabled={!endDateDisabled}
              onChange={(value, dateString) => {
                setEndDate(value.format('YYYY-MM-DD'));
                console.log('Date Stared : ', value.format('YYYY-MM-DD'));
              }}
              locale={locale}
              disabledDate={disabledDate}
              format={'DD-MM-YYYY'}
              placeholder="เลือกวันที่คืน"
            />
            <div className='mt-3' style={{ textAlign: "right", color: "gray" }}>
              <p className='inline-flex'> เลือกมากกว่า 1 วัน </p>
              <Switch
                checked={endDateDisabled}
                onClick={onEndDateSwitchChange}
                style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? '#3355ff' : 'gray' }}
              />
            </div>
          </Form.Item>
          <Form.Item label="เลือกเวลา">
            <TimePicker style={{ width: "45%" }}
              format="HH:mm"
              minuteStep={30}
              locale={locale}
              disabledMinutes={disabledMinutes}
              placeholder="เลือกเวลาเริ่มต้น"
              // hide={disabledHours}
              onChange={(value, dateString) => {
                setStartTime(value.format('HH:mm:00'));
                console.log('Time Stared : ', value.format('HH:mm:00'));
              }}
            />
            <BsIcon5.BsArrowRightShort className='inline-flex mr-2 ml-2' />
            <TimePicker style={{ width: "45%" }}
              format="HH:mm"
              minuteStep={30}
              locale={locale}
              disabledMinutes={disabledMinutes}
              placeholder="เลือกเวลาคืนรถ"
              onChange={(value, dateString) => {
                setEndTime(value.format('HH:mm:00'));
                console.log('Time Stared : ', value.format('HH:mm:00'));
              }}
            />
          </Form.Item>

          <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Search</button>
        </Form>
      </div>
      <br />

      <h3 className='text-success'>รถว่าง {getCars.length} คัน</h3>
      <br />
      <div className='text-center flexbox'>
        {getCars.map((cars, index) => (
          <div className='item' onClick={showPromiseConfirm}>
            <div type="button" className='btnMenu content mt-1' key={index}> {cars.license + " " + cars.brand + " " + cars.color} <div className='container' style={{ height: "10vw", background: "red" }}></div></div>
          </div>

        ))}
      </div>
    </div>
  );
};
export default SelectDate;


// console.log(cars);
// Swal.fire({
//   title: "เลือกรถ",
//   text: cars.license + " " + cars.brand + " " + cars.color,
// })
