import React from 'react';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
function SelectDate() {
  return (
    <>
      <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
      
      <IonModal keepContentsMounted={true}>
        <IonDatetime id="datetime"></IonDatetime>
      </IonModal>
    </>
  );
}
export default SelectDate;