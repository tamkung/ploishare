import React, { useState } from 'react'
import { Button, Form, DatePicker, TimePicker, Switch } from 'antd';
import Swal from "sweetalert2";
import axios from "axios";

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';
import '../css/Booking.css';
import '../css/style.css';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';

//react icon
import * as BsIcon5 from 'react-icons/bs'
import { Link } from 'react-router-dom';

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
      <div className='shd datapick' style={{ paddingLeft: "10px", paddingRight: "10px", background: "#ffffff" }}>
        <Form style={{ border: "solid gray 1px", padding: "10px", borderRadius: "15px", marginBottom: "15px" }}>
          <div className='mb-3'>
            <div>วันที่</div>
            <DatePicker className='width-booking'
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
            <DatePicker className='width-booking'
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

            <Switch
              checked={endDateDisabled}
              onClick={onEndDateSwitchChange}
              style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? '#3355ff' : 'gray' }}
            />

          </div>

          <div className='mb-3'>
            <div>เวลา</div>
            <TimePicker className='width-booking'
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
            <button>Reset</button>
          </div>
        </Form>
        <button type="button" onClick={() => handleSubmit()} class="btn buttonNext">Search</button>
      </div>

      <div className='container text-success'>รถว่าง {getCars.length} คัน</div>

      <div className='flexbox' >
        {getCars.map((cars, index) => (

          <div className='item'>
            {/* <div type="button" className='btnMenu content bg-success pl-3' key={index} onClick={() => {
              console.log(cars);
              Swal.fire({
                title: "เลือกรถ",
                text: cars.license + " " + cars.brand + " " + cars.color,
              })
            }}> {cars.license + " " + cars.brand + " " + cars.color}
            </div> */}
            <div className="bigcard" onClick={() => { window.location = '/booking/' + cars.license }}>
              <div className="colcard-left">
                <div className='container'>
                  <img src={cars.image !== null ? cars.image : NO_Img} />
                </div>
              </div>
              <div className="colcard-right">
                <div>{cars.license + " " + cars.license + " " + cars.brand }</div>
                <div>{cars.license}</div>
                <div>{cars.brand}</div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};
export default SelectDate;