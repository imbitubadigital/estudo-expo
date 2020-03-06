import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';
import { Container } from './styles';
import { reautenticate } from '~/services/Api';

export default function FormEmail({
  email,
  setIsVisibleModal,
  setReloadData,
  toastRef,
}) {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  function updateEmail() {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({
        email:
          'O email não pode estar vazio e deve ser diferente do email atual!',
      });
    } else {
      setIsLoading(true);
      reautenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show('Email atualizado com sucesso!');
              setIsVisibleModal(false);
            })
            .catch(() => {
              setError({ email: 'Erro ao atualizar email!' });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError({
            password: 'A senha informada é incorreta!',
          });
          setIsLoading(false);
        });
    }
  }
  return (
    <Container>
      <Input
        placeholder="Seu e-mail"
        containerStyle={{ marginBottom: 10, marginTop: 10 }}
        defaultValue={email && email}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Sua senha atual!"
        containerStyle={{ marginBottom: 10, marginTop: 10 }}
        password
        secureTextEntry={hidePassword}
        // defaultValue={password && password}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHidePassword(false),
        }}
        errorMessage={error.password}
      />

      <Button
        title="Atualizar nome"
        containerStyle={{ marginTop: 20, width: '100%' }}
        buttonStyle={{ backgroundColor: '#00a680' }}
        onPress={updateEmail}
        loading={isLoading}
      />
    </Container>
  );
}
