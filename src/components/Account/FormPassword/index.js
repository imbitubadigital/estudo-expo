import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';
import { Container, TxtError } from './styles';
import { reautenticate } from '~/services/Api';

export default function FormPassword({ setIsVisibleModal, toastRef }) {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hidePasswordRepeat, setHidePasswordRepeat] = useState(true);

  function updatePassword() {
    setError({});
    if (!password || !newPassword || !newPasswordRepeat) {
      const objError = {};
      !password && (objError.password = 'Informe sua senha atual!');
      !newPassword && (objError.newPassword = 'Informe sua nova senha!');
      !newPasswordRepeat &&
        (objError.newPasswordRepeat = 'Informe a repetição da nova senha!');
      setError(objError);
    } else if (newPassword !== newPasswordRepeat) {
      setError({
        newPassword: 'A nova senha e a repetição de senha não conferem!',
        newPasswordRepeat: 'A repetição de senha e a nova senha não conferem!',
      });
    } else {
      setIsLoading(true);
      reautenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(() => {
              setIsLoading(false);
              toastRef.current.show('Senha atualizada com sucesso!');
              setIsVisibleModal(false);
              // firebase.auth().signOut();
            })
            .catch(() => {
              setError({ general: 'Erro ao atualizar senha!' });
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
        placeholder="Sua senha atual!"
        containerStyle={{ marginBottom: 10, marginTop: 10 }}
        password
        secureTextEntry={hidePassword}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHidePassword(false),
        }}
        errorMessage={error.password}
      />
      <Input
        placeholder="Sua nova senha!"
        containerStyle={{ marginBottom: 10, marginTop: 10 }}
        password
        secureTextEntry={hideNewPassword}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHideNewPassword(false),
        }}
        errorMessage={error.newPassword}
      />

      <Input
        placeholder="Repita sua nova senha!"
        containerStyle={{ marginBottom: 10, marginTop: 10 }}
        password
        secureTextEntry={hidePasswordRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hidePasswordRepeat ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHidePasswordRepeat(false),
        }}
        errorMessage={error.newPasswordRepeat}
      />

      <Button
        title="Atualizar senha"
        containerStyle={{ marginTop: 20, width: '100%' }}
        buttonStyle={{ backgroundColor: '#00a680' }}
        onPress={updatePassword}
        loading={isLoading}
      />
      <TxtError>{error.general}</TxtError>
    </Container>
  );
}
