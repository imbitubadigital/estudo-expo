import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Input, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { validateEmail } from '~/utils/Validator';
import Loading from '~/components/Loading';
import { Container } from './styles';

function LoginForm({ toastRef, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  async function login() {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show('Preencha o e-mail e senha para fazer o login!');
    } else if (!validateEmail(email)) {
      toastRef.current.show('O e-mail é inválido. Verifique!');
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('AcountUser');
        })
        .catch(() => {
          toastRef.current.show('E-mail e/ou senha não conferem!');
        });
    }
    setIsVisibleLoading(false);
  }
  return (
    <Container>
      <Input
        placeholder="Seu e-mail"
        containerStyle={{ width: '100%', marginTop: 20 }}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={{ color: '#c1c1c1' }}
          />
        }
      />
      <Input
        placeholder="Seu senha"
        containerStyle={{ width: '100%', marginTop: 20 }}
        password
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={{ color: '#c1c1c1' }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Logar"
        containerStyle={{ marginTop: 20, width: '100%' }}
        buttonStyle={{ backgroundColor: '#00a680' }}
        onPress={login}
      />
      <Loading text="Realizando login!" isVisible={isVisibleLoading} />
    </Container>
  );
}

export default withNavigation(LoginForm);
