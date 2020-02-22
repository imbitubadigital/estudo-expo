import React from 'react';
import { Text, ScrollView } from 'react-native';

import img from '../../../../assets/images/logo.png';
import { Logo, Container, Line, Txt, BtnRegister } from './styles';

export default function Login({ navigation }) {
  return (
    <ScrollView>
      <Logo source={img} resizeMode="contain" />
      <Container>
        <Text>Form Login</Text>
        <CreateAcount navigation={navigation} />
      </Container>
      <Line />
      <Container>
        <Text>Login Facebook</Text>
        <Text>Criar conta</Text>
      </Container>
    </ScrollView>
  );
}

function CreateAcount({ navigation }) {
  return (
    <Txt>
      Ainda não tem conta?{' '}
      <BtnRegister onPress={() => navigation.navigate('Register')}>
        Cadastre-se
      </BtnRegister>
    </Txt>
  );
}
