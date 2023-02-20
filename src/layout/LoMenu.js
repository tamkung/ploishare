import React from 'react';
import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { menu, list, logOut, home } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import '../css/Booking.css';
import SignOut from '../service/SignOut';

const MenuButton = () => {
  const navigate = useNavigate();
  return (
    <div className='nav-btn' >
      <IonContent className="ion-padding" color="secondary">
        <IonFab slot="fixed" horizontal="end" >
          <IonFabButton>
            <IonIcon icon={menu}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton
              onClick={SignOut}>
              <IonIcon icon={logOut}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={() => navigate('/booking-list')}>
              <IonIcon icon={list}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={() => navigate('/home')}>
              <IonIcon icon={home} ></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </div >
  )
};
export default MenuButton;