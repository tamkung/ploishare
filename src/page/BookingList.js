import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_USER, API_URL } from '../Constant';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/Booking.css';
import authCheck from '../service/Auth';
import Swal from 'sweetalert2';
import { Image, Modal, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
<<<<<<< Updated upstream
import { GoAlert, GoEye } from "react-icons/go";
import { BiImageAdd } from "react-icons/bi";

=======
import logoSolo from '../img/logo-solo.png'
>>>>>>> Stashed changes
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

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
          image: item.image,
          status: item.status, //0=รออนุมัติ, 1=อนุมัติ, 2=เปิดใช้งาน, 3=ปิดใช้งาน(สิ้นสุดการใช้งาน)
          startMile: item.startMile, //เลขไมล์เริ่มต้น
          endMile: item.endMile, //เลขไมล์สิ้นสุด
          distance: item.distance, //ระยะทาง
        });
      });
    });
    console.log('originData', originData);
    setGetBooking(originData);
    setLoading(false);
    console.log('getBooking', getBooking);
  }
  const [componentDisabled, setComponentDisabled] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const previewImage = (visible, image) => {
    console.log('image', image);
    setVisible(visible);
    setImage(image);
  }

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

  const uploadImage = (id) => {
    console.log('id', id);
    try {
      Swal.fire({
        title: 'อัพโหลดรูปภาพ',
        input: 'file',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (image) => {
          setLoading(true);
          const formData = new FormData();
          console.log('image', image);
          formData.append('img', image);
          formData.append('id', id);
          axios.post(API_URL + 'api/upload-file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
            console.log(response.data);
            axios.post(API_URL + 'api/updatebookingimage', {
              id: id,
              image: response.data,
            }).then((response) => {
              console.log(response.data);
              setLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'อัพโหลดรูปภาพสำเร็จ',
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
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <div className="app-bar" style={{ textAlign: "left" }}>
        <img
          type="button"
          className="ml-4 h-10 w-auto"
          src={logoSolo}
          alt="ปล่อย Share Logo"
          onClick={() => { window.location = "/" }}

        />
      </div>
      <div>
        <div className="ml-4 mt-4" style={{ fontSize: "2rem", color: "white", fontWeight: "bold" }}>รายการจองทั้งหมด <strong style={{ marginLeft: "10px", fontSize: "1.5rem" }} type="button" onClick={showModal} > <InfoCircleOutlined twoToneColor="#ffffff" /></strong></div>
        <Modal okButtonProps={{ style: { display: 'none' } }} title="รายละเอียดสถานะ" open={isModalOpen} onCancel={handleCancel}>
          <ul >
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <strong><p className='wait-lightdot mr-2' />รออนุมัติ คือ สถานะรออนุมัติคำสั่งจองรถจากผู้ดูแลระบบ</strong>
              <p>ทางผู้ดูแลระบบจะทำการตรวจสอบข้อมูล และอนุมัติคำสั่งจองของท่านให้ไวที่สุด</p>
            </il> <br />
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <strong><p className='turn-on-lightdot mr-2' />เปิดใช้งาน คือ สถานะรออนุมัติคำสั่งจองรถจากผู้ดูแลระบบ</strong>
              <p>เมื่อเปิดการใช้งานรถ ระบบจะแจ้งเตือนให้กรอกเลขไมล์รถยนต์ปัจจุบันก่อนใช้งานรถยนต์</p>
            </il> <br />
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <strong><p className='turn-off-lightdot mr-2' />ปิดใช้งาน คือ สถานะรออนุมัติคำสั่งจองรถจากผู้ดูแลระบบ</strong>
              <p>ทางผู้ดูแลระบบจะทำการตรวจสอบข้อมูล และอนุมัติคำสั่งจองของท่านให้ไวที่สุด</p>
            </il> <br />
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <strong><p className='success-lightdot mr-2' />เสร็จสิ้น คือ สถานะรออนุมัติคำสั่งจองรถจากผู้ดูแลระบบ</strong>
              <p>ทางผู้ดูแลระบบจะทำการตรวจสอบข้อมูล และอนุมัติคำสั่งจองของท่านให้ไวที่สุด</p>
            </il> <br />
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <p>* เมื่อเปิดใช้งานรถยนต์ทางผู้ยืมจะต้องเข้ามาปิดการใช้งานบนเว็บไซต์</p></il> <br />
            <il style={{ fontFamily: 'Noto Sans Thai' }} className="mr-4"> <p>** ทางเรามีบัตรให้บริการเติมน้ำมันโดยผู้จองไม่จำเป็นต้องจ่ายค่าน้ำมันขณะใช้งานรถ ทางระบบจะเรียกเก็บเงินภายหลัง โดยคำนวณค่าใช้จ่ายจากเลขไมล์รถยนต์</p></il> <br />
          </ul>
        </Modal>
        <hr className="my-4 ml-4 mr-4" style={{ border: "solid 1px white" }} />
      </div>
      {loading === true ? <div className='flex justify-center items-center '><Spin /></div>
        : <div className='flexbox pl-2 pr-2 mt-3'>
          {getBooking.map((item, index) => {
            return (
              <div className="item-list" key={index}>
                <Card className='min-card'>
                  <Card.Header style={{ textAlign: "center" }}>สถานะปัจจุบัน  : {
                    item.status === "0" ? "รออนุมัติ" :
                      item.status === "1" ? "อนุมัติ" :
                        item.status === "2" ? "กำลังใช้งาน" : "เสร็จสิ้น"}
                  </Card.Header>
                  <Card.Body style={{ minHeight: "160px" }}>
                    <Card.Title className='flex'>
                      ป้ายทะเบียน : {item.cLicense} {item.cName}

                    </Card.Title>
                    <Card.Text>
                      ใช้งานวันที่ : {item.startDateTime}<br />
                      <div className='flex items-center'>
                        รูปอนุมัติ : {item.image ?
                          <div className='flex items-center'>
                            <GoEye className='text-primary ml-2 cursor-pointer'
                              onClick={() => previewImage(true, item.image)} />
                            <Image
                              width={200}
                              style={{ display: 'none' }}
                              src={item.image}
                              alt="รูปอนุมัติ"
                              preview={{
                                visible,
                                src: image,
                                onVisibleChange: (value) => {
                                  console.log(item.image);
                                  setVisible(value);
                                },
                              }}
                            />
                          </div>
                          : <div className='flex items-center text-danger ml-2 '>
                            ไม่มีรูปภาพ
                            {/* <GoAlert className='text-danger' /> */}
                            <BiImageAdd className='text-success cursor-pointer ml-2'
                              size={20}
                              onClick={() => uploadImage(item.id)}
                            />
                          </div>}
                      </div>
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
      }
    </div>
  )
}

export default BookingList;
