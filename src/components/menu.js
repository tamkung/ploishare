import React from 'react';

import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, logOut } from 'ionicons/icons';
import '../css/Booking.css';
const logout = () => {
  // Clear the user's session
  localStorage.removeItem('user');
  localStorage.removeItem('type');
  sessionStorage.clear();
  window.location.replace('/');
};

const MenuButton = () => (
  <div className='nav-btn'>
    <IonContent className="ion-padding">
      <IonFab slot="fixed" horizontal="end">
        <IonFabButton>
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton
            onClick={logout}>
            <IonIcon icon={logOut}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={colorPalette}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={document}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </div>
);
export default MenuButton;