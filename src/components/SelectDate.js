import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, DatePicker, TimePicker, Switch, Select, Space, Tag } from 'antd';
import Swal from "sweetalert2";
import axios from "axios";
import { LikeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/es/date-picker/locale/th_TH';
import '../css/Booking.css';
import '../css/style.css';
import * as BsIcon5 from 'react-icons/bs'

import { API_URL } from "../Constant";
import LineIcon from '../img/line.png';
import HeartIcon from '../img/heart.png';
import NO_Img from '../img/no_img.jpg';
import wallpaper from '../img/wallpaper-car.jpg'

const SelectDate = () => {
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [getCars, setGetCars] = useState([]);

  const hourData = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:.00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
  //const hourData2 = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:.00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
  const [endHourData, setEndHourData] = useState(hourData);

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    if (startDate === endDate) {
      const newHour = hourData.splice(0, hourData.indexOf(value));
      setEndHourData(hourData);
      console.log(newHour)
      console.log('Start Time : ', value);
    } else {
      setEndHourData(hourData);
    }
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
    console.log('End Time : ', value);
  };

  const onEndDateSwitchChange = (value) => {
    setEndDateDisabled(value);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  const availableCar = () => {
    //axios.get(API_URL + `api/getavailablecars?startDateTime=${startDate + " " + startTime}&endDateTime=${endDate + " " + endTime} `)
    axios.post(API_URL + 'api/getavailablecars', {
      startDateTime: startDate + " " + startTime,
      endDateTime: endDate + " " + endTime
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'ไม่มีรถว่างในช่วงเวลาที่เลือก',
          })
        } else {
          setGetCars(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    console.log('StartDateTime : ', startDate, startTime);
    console.log('EndDateTime : ', endDate, endTime);
    if (startDate === null || endDate === null || startTime === "" || endTime === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      })
    } else {
      availableCar();
    }


  };

  return (
    <div>
      {/*--------------------------------------------------------------- Desktop --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-none d-xl-block filter-low ' src={wallpaper} style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "0 40%" }} alt={"Background"} />
        <Form className='datapick d-none d-xl-block shd w-auto' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px", fontFamily: 'Noto Sans Thai' }}>
          <div className='mb-3'>
            <div style={{ fontWeight:"bolder" }} >วันที่</div>
            <DatePicker className='width-booking' style={{ width: "40%" }}
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
            <DatePicker className='width-booking' style={{ width: "40%" }}
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
              style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? 'rgba(249, 210, 12, 1' : 'gray' }}
            />

          </div>

          <div className='mb-3' style={{ fontFamily: 'Noto Sans Thai' }}>
            <div style={{ fontWeight:"bolder" }}>เวลา</div>

            <Space wrap >
              <Select
                style={{
                  width: 250,
                }}
                disabled={!startDate}
                placeholder='เลือกเวลาเริ่มต้น'
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
                placeholder='เลือกเวลาคืนรถ'
                style={{
                  width: 250,
                }}
                disabled={!startTime}
                onChange={handleEndTimeChange}
                options={endHourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>
          </div>
          <button type="button" onClick={() => handleSubmit()} class="btn buttonNext">Search</button>
        </Form>
      </div>

      {/*--------------------------------------------------------------- Mobile --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-block d-sm-none filter-low' src={wallpaper} style={{ width: "100%", height: "300px", objectFit: "cover", objectPosition: "0 40%" }} alt={"Background"} />
        <Form className='datapick d-block d-sm-none shd' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px", width: "90%", top: "15%" }}>
          <div className='mb-3'>
            <DatePicker className='width-booking' style={{ width: "33%" }}
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
            <DatePicker className='width-booking' style={{ width: "33%" }}
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
              style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? 'rgba(249, 210, 12, 1' : 'gray' }}
            />

          </div>

          <div className='mb-3'>
            <Space wrap >
              <Select
                style={{
                  width: 130
                }}
                disabled={!startDate}
                placeholder='เลือกเวลาเริ่มต้น'
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
                placeholder='เลือกเวลาคืนรถ'
                style={{
                  width: 130
                }}
                disabled={!startTime}
                onChange={handleEndTimeChange}
                options={endHourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>
          </div>
          <button type="button" onClick={() => handleSubmit()} class="btn buttonNext mt-3">Search</button>
        </Form>
      </div>

      {/*--------------------------------------------------------------- Tablet --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-none d-md-block d-lg-none filter-low' src={wallpaper} style={{ width: "100%", height: "400px", objectFit: "cover", objectPosition: "0 40%" }} alt={"Background"} />
        <Form className='datapick d-none d-md-block d-lg-none shd' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px", fontFamily: 'Noto Sans Thai' }}>
          <div className='mb-3'>
            <div style={{ fontWeight:"bolder" }}>วันที่</div>
            <DatePicker className='width-booking' style={{ width: "38%", fontFamily: 'Noto Sans Thai' }}
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
            <DatePicker className='width-booking' style={{ width: "38%", fontFamily: 'Noto Sans Thai' }}
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
              style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? 'rgba(249, 210, 12, 1' : 'gray' }}
            />

          </div>

          <div className='mb-3' style={{ fontFamily: 'Noto Sans Thai' }}>
            <div style={{ fontWeight:"bolder" }}>เวลา</div>

            <Space wrap >
              <Select
                style={{
                  width: 200
                }}
                disabled={!startDate}
                placeholder='เลือกเวลาเริ่มต้น'
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
                placeholder='เลือกเวลาคืนรถ'
                style={{
                  width: 200
                }}
                disabled={!startTime}
                onChange={handleEndTimeChange}
                options={endHourData.map((hour) => ({
                  label: hour,
                  value: hour,
                }))}
              />
            </Space>
          </div>
          <button type="button" onClick={() => handleSubmit()} class="btn buttonNext">Search</button>
        </Form>
      </div>

      {/*--------------------------------------------------------------- Bigger --------------------------------------------------------------- */}
      <div className='shd' style={{ position: "relative" }} >
        <img className='d-none d-lg-block d-xl-none filter-low ' src={wallpaper} style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "0 40%" }} alt={"Background"} />
        <Form className='datapick d-none d-lg-block d-xl-none shd' style={{ position: "absolute", borderRadius: "15px", marginBottom: "15px", fontFamily: 'Noto Sans Thai' }}>
          <div className='mb-3'>
            <div style={{ fontWeight:"bolder" }}>วันที่</div>
            <DatePicker className='width-booking' style={{ width: "40%" }}
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
            <DatePicker className='width-booking' style={{ width: "40%" }}
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
              style={{ textAlign: "right", marginLeft: "15px", backgroundColor: endDateDisabled ? 'rgba(249, 210, 12, 1' : 'gray' }}
            />

          </div>

          <div className='mb-3' style={{ fontFamily: 'Noto Sans Thai' }}>
            <div style={{ fontWeight:"bolder" }}>เวลา</div>


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

            <Space wrap >
              <Select
                style={{
                  width: '300px'
                }}
                placeholder='เลือกเวลาเริ่มต้น'
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
                placeholder='เลือกเวลาคืนรถ'
                style={{
                  width: '390px'
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

      {/* <marquee className="mt-3 bg-white inline-block" direction="right" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="3" scrolldelay="10" style={{ color: "white" }}><a className="mr-5" type="button" href="https:/forms.gle/4wTbRgUZUbkNMJGF7" target="_blank"><img className="inline-block" src={HeartIcon} alt={"Background"} /> โปรดประเมินความพึงพอใจเพื่อนำไปปรับปรุง : forms.gle/4wTbRgUZUbkNMJGF7</a>  หากต้องการจองรถด่วน หรือติดปัญหาโปรดติดต่อผู้ดูแล <img className="inline-block" src={LineIcon} alt={"Background"} /> : @ploishared หรือ โทร 02-555-5555</marquee> */}
      <div className='flexbox mt-3' >
        {/* <Space className="mb-3" size={[0, 8]} wrap style={{ width: "100%" }}>
          <div style={{ color: "#0058cc", opacity: "90%", fontFamily: 'Noto Sans Thai', fontWeight: "bolder", fontSize: "4rem" }}>
            รถว่าง {getCars.length} คัน
          </div>
        </Space> */}

        {getCars.map((cars, index) => {
          const images = JSON.parse(cars.image);
          return (
            <div div className='item mb-3' key={index} >
              <div className='card-item' data-toggle="tooltip" data-placement="top" title={cars.detail} >
                <Link className="bigcard textover" to={"/booking"} state={{ value: { startDate, endDate, startTime, endTime }, car: cars.license }} >
                  <div className="colcard-left" >
                    <img style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "15px 0px 0px 15px" }} src={cars.image !== null ? images[0] : NO_Img} alt={cars.license} />

                  </div>
                  <div className="colcard-right pl-3 pt-3 pb-3 pr-3  textover">
                    <div className='textover' style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{cars.model}</div>
                    <div>{cars.brand}</div>
                    <div>จำนวน {cars.seat} ที่นั่ง</div>
                    <div>{cars.license}</div>
                    <div>{cars.province}</div>
                  </div>
                </Link>
              </div>
            </div>

          )
        })}
      </div>
    </div >
  );
};
export default SelectDate;