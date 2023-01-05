import React from 'react';

import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, logOut } from 'ionicons/icons';

const logout = () => {
  // Clear the user's session
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  sessionStorage.clear();

  // Redirect the user to the login page
  window.location.replace('/');
};

const MenuButton = () => (
  <div>
    <IonContent className="ion-padding">
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
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