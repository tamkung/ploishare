import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../Constant';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/Booking.css';

function BookingList() {
  const [getBooking, setGetBooking] = useState([]);
  const email = localStorage.getItem("email");
  const originData = [];

  useEffect(() => {
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
            startDateTime: item.startDateTime,
            endDateTime: item.endDateTime,
            cLicense: item.cLicense,
            cName: item.cName, //ชื่อรถ
            day: item.day,
            status: item.status,
          });
        });
      });
      console.log('originData', originData);
      setGetBooking(originData);
      console.log('getBooking', getBooking);
    }
    fetchData();

  }, []);

  return (
    <div>
      <div className="app-bar" />
      <div className='flexbox pl-3 pr-3 mt-3'>
        {getBooking.map((item, index) => {
          return (
            <Card className="itembook mr-2 ml-2">
              <Card.Header style={{ textAlign: "center" }}><div onChange={()=>{if(item.status === 0 ){return(<span className='wait-lightdot' />)}}}></div> สถานะปัจจุบัน  : {item.status} </Card.Header>
              <Card.Body>
                <Card.Title>{item.cLicense} {item.cName}</Card.Title>

                <Card.Text>
                  {item.startDateTime}
                </Card.Text>
                <button className='buttonNext mt-5'>Go somewhere</button>
              </Card.Body>
              <Card.Footer className="text-muted">จำนวนวัน : {item.day} วัน</Card.Footer>
            </Card>
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
