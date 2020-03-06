import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Input, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Container } from './styles';
import { validateEmail } from '~/utils/Validator';

import Loading from '~/components/Loading';

function RegisterForm({ toastRef, navigation }) {
  const [hidePassord, setHidePassord] = useState(true);
  const [hideRepeatPassord, setHideRepeatPassord] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  async function register() {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show('Todos os campos são obrigatórios!');
    } else if (!validateEmail(email)) {
      toastRef.current.show('Atenção! Email inválido!');
    } else if (password !== repeatPassword) {
      toastRef.current.show('A senha e repetição da senha não conferem!');
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setIsVisibleLoading(false);
          navigation.navigate('AcountUser');
        })
        .catch(() => {
          setIsVisibleLoading(false);
          toastRef.current.show('Erro ao criar conta!');
        });
    }
    setIsVisibleLoading(false);
  }
  return (
    <Container>
      <Input
        placeholder="Seu e-mail"
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={{
              color: '#c1c1c1',
            }}
          />
        }
      />
      <Input
        placeholder="Seu senha"
        password
        secureTextEntry={hidePassord}
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassord ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={{
              color: '#c1c1c1',
            }}
          />
        }
      />
      <Input
        placeholder="Repetir senha"
        password
        secureTextEntry={hidePassord}
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassord ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={{
              color: '#c1c1c1',
            }}
          />
        }
      />
      <Button
        title="Cadastrar"
        containerStyle={{ width: '100%', marginTop: 30 }}
        buttonStyle={{ backgroundColor: '#00a680' }}
        onPress={register}
      />
      <Loading text="Criando conta!" isVisible={isVisibleLoading} />
    </Container>
  );
}
export default withNavigation(RegisterForm);
