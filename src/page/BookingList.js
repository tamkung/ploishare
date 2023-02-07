import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_USER, API_URL } from '../Constant';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/Booking.css';
import authCheck from '../service/Auth';
import Swal from 'sweetalert2';

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",  // 24-hour format
  locale: "th"  // Thai language
};

function BookingList() {
  useEffect(() => {
    authCheck();
  }, []);

  const [getBooking, setGetBooking] = useState([]);
  const email = GET_USER.email;
  const originData = [];

  const fetchData = async () => {
    originData.length = 0;
    await axios.get(API_URL + 'api/getbookingbyemail/' + email).then((response) => {
      //console.log('response', response.data);
      response.data.map((item, index) => {
        console.log('item', item);
        originData.push({
          key: index + 1,
          id: item.id,
          province: item.province,
          uName: item.uName,
          empoyeeNo: item.empoyeeNo,
          uEmail: item.uEmail,
          uPhone: item.uPhone,
          uSect: item.uSect,
          uPart: item.uPart,
          note: item.note,
          startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
          endDateTime: new Date(item.startDateTime).toLocaleString('th', options),
          bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
          cLicense: item.cLicense,
          cName: item.cName, //ชื่อรถ
          day: item.day,
          status: item.status, //0=รออนุมัติ, 1=อนุมัติ, 2=เปิดใช้งาน, 3=ปิดใช้งาน(สิ้นสุดการใช้งาน)
          startMile: item.startMile, //เลขไมล์เริ่มต้น
          endMile: item.endMile, //เลขไมล์สิ้นสุด
          distance: item.distance, //ระยะทาง
        });
      });
    });
    console.log('originData', originData);
    setGetBooking(originData);
    console.log('getBooking', getBooking);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = (id, status) => {
    console.log('id', id);
    try {
      if (status === 2) {
        Swal.fire({
          title: 'กรอกเลขไมล์เริ่มต้น',
          input: 'number',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (startMile) => {
            axios.post(API_URL + 'api/updatebookingstartmile', {
              id: id,
              startMile: startMile,
            }).then((response) => {
              console.log(response.data);
              axios.post(API_URL + 'api/updatebookingstatus', {
                id: id,
                status: status,
              }).then((response) => {
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'เปิดใช้งานสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  fetchData();
                });
              });
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {

          }
        })
      } else {
        Swal.fire({
          title: 'กรอกเลขไมล์สิ้นสุด',
          input: 'number',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (endMile) => {
            axios.post(API_URL + 'api/updatebookingendmile', {
              id: id,
              endMile: endMile,
            }).then((response) => {
              console.log(response.data);
              axios.post(API_URL + 'api/updatebookingstatus', {
                id: id,
                status: status,
              }).then((response) => {
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'เปิดใช้งานสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  fetchData();
                });
              });
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {

          }
        })
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="app-bar" />
      <div>
        <div className="jumbotron w-100" style={{ borderRadius: "0px" }}>
          <strong>รายการจองทั้งหมด</strong>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4" />
        </div>
      </div>
      <div className='flexbox pl-2 pr-2 mt-3'>
        {getBooking.map((item, index) => {
          return (
            <div className="item-list" key={index}>
              <Card className='min-card'>
                <Card.Header style={{ textAlign: "center" }}>สถานะปัจจุบัน  : {
                  item.status === "0" ? "รออนุมัติ" :
                    item.status === "1" ? "อนุมัติ" :
                      item.status === "2" ? "เปิดใช้งาน" : "เสร็จสิ้น"}
                </Card.Header>
                <Card.Body style={{ minHeight: "160px" }}>
                  <Card.Title>{item.cLicense} {item.cName}</Card.Title>
                  <Card.Text>
                    {item.startDateTime}
                  </Card.Text>
                  {item.status === "2" ? <Card.Text>
                    ไมล์เริ่มต้น : {item.startMile}</Card.Text> :
                    item.status === "3" ? <Card.Text>
                      ไมล์เริ่มต้น : {item.startMile}<br />
                      ไมล์สิ้นสุด : {item.endMile} <br />
                      ระยะทางที่ใช้ : {item.distance} กม.
                    </Card.Text> : null}
                </Card.Body>
                <Card.Footer className="text-muted"><div className='text-center'>
                  <div className={
                    item.status === "0" ? "btn wait-cardlist" :
                      item.status === "1" ? "btn turn-on-cardlist" :
                        item.status === "2" ? "btn turn-off-cardlist" : "btn success-cardlist"}
                    onClick={
                      item.status === "0" ? () => { alert('รออนุมัติ') } :
                        item.status === "1" ? () => { updateStatus(item.id, 2) } :
                          item.status === "2" ? () => { updateStatus(item.id, 3) } : () => { alert('สิ้นสุดการใช้งาน') }}
                  >
                    {item.status === "0" ? "รออนุมัติ" :
                      item.status === "1" ? "เปิดใช้งาน" :
                        item.status === "2" ? "ปิดใช้งาน" : "สิ้นสุดการใช้งาน"}
                  </div>
                </div></Card.Footer>
                <Card.Footer className="text-muted">จำนวนวัน : {item.day} วัน</Card.Footer>
              </Card>
            </div>
            // <div className='card text-center'>
            //   <p>เลขที่การจอง : {item.id}</p>
            //   <p>จังหวัด : {item.province}</p>
            //   <p>ชื่อ : {item.uName}</p>
            //   <p>เลขที่พนักงาน : {item.empoyeeNo}</p>
            //   <p>อีเมล : {item.uEmail}</p>
            //   <p>เบอร์โทร : {item.uPhone}</p>
            //   <p>แผนก : {item.uSect}</p>
            //   <p>ฝ่าย : {item.uPart}</p>
            //   <p>หมายเหตุ : {item.note}</p>
            //   <p>วันที่เริ่ม : {item.startDateTime}</p>
            //   <p>วันที่สิ้นสุด : {item.endDateTime}</p>
            //   <p>ป้ายทะเบียน : {item.cLicense}</p>
            //   <p>จำนวนวัน : {item.day}</p>
            //   <p>สถานะ : {item.status}</p>
            // </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingList;
