import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { FacebookApi } from '~/services/Social';
import Loading from '~/components/Loading';
// import { Container } from './styles';

export default function LoginFacebook({ toastRef, navigation }) {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  async function login() {
    await Facebook.initializeAsync(FacebookApi.application_id);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions,
    });

    if (type === 'success') {
      setIsLoadingVisible(true);
      const credentiais = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentiais)
        .then(() => {
          navigation.navigate('AcountUser');
        })
        .catch(() => {
          toastRef.current.show('Erro ao logar com facebook');
        });
    } else if (type === 'cancel') {
      toastRef.current.show('Login cancelado');
    } else {
      toastRef.current.show('Erro ao logar com facebook, tente mais tarde!');
    }
    setIsLoadingVisible(false);
  }
  return (
    <>
      <SocialIcon
        title="Logar com Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading text="Logando com Facebook" isVisible={isLoadingVisible} />
    </>
  );
}
