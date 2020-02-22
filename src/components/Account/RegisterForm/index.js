import React from 'react';
import { ScrollView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Content } from './styles';

export default function RegisterForm() {
  function register() {}
  return (
    <Container>
      <Input
        placeholder="Seu e-mail"
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={() => {}}
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
        secureTextEntry
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={() => {}}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={{
              color: '#c1c1c1',
            }}
          />
        }
      />
      <Input
        placeholder="Repetir senha"
        password
        secureTextEntry
        containerStyle={{
          width: '100%',
          marginTop: 20,
        }}
        onChange={() => {}}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
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
        onPress={() => register}
      />
    </Container>
  );
}
