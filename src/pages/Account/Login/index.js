import React, { useRef } from 'react';
import { Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import img from '../../../../assets/images/logo.png';
import { Logo, Container, Line, Txt, BtnRegister } from './styles';
import LoginForm from '~/components/Account/LoginForm';
import LoginFacebook from '~/components/Account/LoginFacebook';

export default function Login({ navigation }) {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      /*  keyboardOpeningTime={0} */
      extraHeight={Platform.select({ android: 200 })}
    >
      <Logo source={img} resizeMode="contain" />
      <Container>
        <LoginForm toastRef={toastRef} />
        <CreateAcount navigation={navigation} />
      </Container>
      <Line />
      <Container>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </Container>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
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
