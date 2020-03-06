import React, { userRef, useRef } from 'react';
import Toast from 'react-native-easy-toast';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Logo, Form, Title } from './styles';

import RegisterForm from '~/components/Account/RegisterForm';

import img from '../../../../assets/images/logo.png';

export default function Register() {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      /*  keyboardOpeningTime={0} */
      extraHeight={Platform.select({ android: 200 })}
    >
      <Logo source={img} resizeMode="contain" />
      <Form>
        <Title>Formulário de Cadastro</Title>
        <RegisterForm toastRef={toastRef} />
      </Form>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}
