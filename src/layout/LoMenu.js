import React from 'react';

import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { chevronUpCircle, list, logOut, home } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import '../css/Booking.css';
import SignOut from '../service/SignOut';

const MenuButton = () => (
  <div className='nav-btn' >
    <IonContent className="ion-padding" color="secondary">
      <IonFab slot="fixed" horizontal="end" >
        <IonFabButton>
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton
            onClick={SignOut}>
            <IonIcon icon={logOut}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => window.location = "/booking-list"}>
            <IonIcon icon={list}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => window.location = "/"}>
            <IonIcon icon={home} ></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </div >
);
export default MenuButton;