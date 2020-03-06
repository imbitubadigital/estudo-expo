import React from 'react';
import ActionButton from 'react-native-action-button';
// import { Container } from './styles';

export default function ButtonAction({ navigation, url }) {
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate(url)}
    />
  );
}
