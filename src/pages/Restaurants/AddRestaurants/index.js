import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '~/components/Loading';
import AddRestForm from '~/components/Restaurants/AddRestForm';
// import { Container } from './styles';

export default function AddRestaurants({ navigation }) {
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      <AddRestForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Loading text="Cadastrando restaurante!" isVisible={isLoading} />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>
  );
}
