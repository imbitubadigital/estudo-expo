import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

import { Container, Title } from './styles';

export default function Loading({ isVisible, text }) {
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={{
        height: 100,
        width: 200,
        backgroundColor: '#fff',
        borderColor: '#00a680',
        borderWidth: 2,
        borderRadius: 10,
      }}
    >
      <Container>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Title>{text}</Title>}
      </Container>
    </Overlay>
  );
}
