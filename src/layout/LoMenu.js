import React from 'react';

import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, logOut, home } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import '../css/Booking.css';
import SignOut from '../components/auth/SignOut';

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
          <IonFabButton>
            <Link to={"bookinglist"}><IonIcon icon={document}></IonIcon></Link>
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