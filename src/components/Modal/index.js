import React from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
// import { Container } from './styles';

export default function Modal({ isVisible, setIsVisible, children }) {
  function closeModal() {
    setIsVisible(false);
  }
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={{ height: 'auto', width: '90%', backgroundColor: '#fff' }}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}
