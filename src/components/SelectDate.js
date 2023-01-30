import React, { useState } from 'react'
import { Button, Form, DatePicker, TimePicker, Switch, Select, Space } from 'antd';
import Swal from "sweetalert2";
import axios from "axios";

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';
import '../css/Booking.css';
import '../css/style.css';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';
import wallpaper from '../img/wallpaper-car.jpg'
//react icon
import * as BsIcon5 from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { Opacity } from '@mui/icons-material';

const SelectDate = () => {
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [getCars, setGetCars] = useState([]);

  const hourData = ['7.00', '7.30', '8.00', '8.30', '9.00', '9.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30', '17.00', '17.30', '18.00'];

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    console.log('Start Time : ', value);
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
    console.log('Start Time : ', value);
  };
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
      {/*--------------------------------------------------------------- Desktop --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-none d-xl-block' src={wallpaper} style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "0 40%" }} />
        <Form className='datapick d-none d-xl-block' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px" }}>
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


            {/* <TimePicker className='width-booking'
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
            /> */}

            <Space wrap>
              <Select
                placeholder='เลือกเวลาเริ่มต้น'
                style={{
                  width: 350,
                }}
                onChange={handleStartTimeChange}
                options={hourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>

            <BsIcon5.BsArrowRightShort className='inline-flex mr-2 ml-2' />

            <Space wrap>
              <Select
                placeholder='เลือกเวลาเริ่มต้น'
                style={{
                  width: 350,
                }}
                onChange={handleEndTimeChange}
                options={hourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>

            {/* <TimePicker style={{ width: "45%" }}
              format="HH:mm"
              minuteStep={30}
              locale={locale}
              disabledMinutes={disabledMinutes}
              placeholder="เลือกเวลาคืนรถ"
              onChange={(value, dateString) => {
                setEndTime(value.format('HH:mm:00'));
                console.log('Time Stared : ', value.format('HH:mm:00'));
              }}
            /> */}
          </div>
          <button type="button" onClick={() => handleSubmit()} class="btn buttonNext">Search</button>
        </Form>
      </div>

      {/*--------------------------------------------------------------- Mobile --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-block d-sm-none' src={wallpaper} style={{ width: "100%", height: "300px", objectFit: "cover", objectPosition: "0 40%" }} />
        <Form className='datapick d-block d-sm-none' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px", width: "90%", top: "15%" }}>
          <div className='mb-3'>
            <DatePicker className='width-booking' style={{ width: "35%" }}
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
            <DatePicker className='width-booking' style={{ width: "35%" }}
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
            <Space wrap>
              <Select
                placeholder='เลือกเวลาเริ่มต้น'
                style={{
                  width: 120,
                }}
                onChange={handleStartTimeChange}
                options={hourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>

            <BsIcon5.BsArrowRightShort className='inline-flex mr-2 ml-2' />

            <Space wrap>
              <Select
                placeholder='เลือกเวลาเริ่มต้น'
                style={{
                  width: 120,
                }}
                onChange={handleEndTimeChange}
                options={hourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>

            {/* <TimePicker style={{ width: "45%" }}
              format="HH:mm"
              minuteStep={30}
              locale={locale}
              disabledMinutes={disabledMinutes}
              placeholder="เลือกเวลาคืนรถ"
              onChange={(value, dateString) => {
                setEndTime(value.format('HH:mm:00'));
                console.log('Time Stared : ', value.format('HH:mm:00'));
              }}
            /> */}
          </div>
          <button type="button" onClick={() => handleSubmit()} class="btn buttonNext">Search</button>
        </Form>



      </div>

      <div className='container text-success'>รถว่าง {getCars.length} คัน</div>

      <div className='flexbox' >
        {getCars.map((cars, index) => (

          <div className='item mb-3'>
            <div type="button" className='card-item'>
              <div className="bigcard textover" onClick={() => { window.location = '/booking/' + cars.license }} >
                <div className="colcard-left" >

                  <img style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "15px 0px 0px 15px" }} src={cars.image !== null ? cars.image : NO_Img} />

                </div>
                <div className="colcard-right pl-3 pt-3 pb-3 pr-3  textover">
                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{cars.license}</div>
                  <div>{cars.brand}</div>
                  <div>
                    <p className='textover mt-3 d-none d-sm-block' >{cars.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};
export default SelectDate;