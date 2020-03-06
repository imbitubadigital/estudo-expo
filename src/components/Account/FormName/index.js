import React, { useState } from 'react';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';
import { Container } from './styles';

export default function FormName({
  displayName,
  setIsVisibleModal,
  setReloadData,
  toastRef,
}) {
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function updateDisplayName() {
    setError(null);
    if (!newDisplayName) {
      setError('O nome não foi alterado!');
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show('Nome atualizado com sucesso!');
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError('Erro ao atualizar nome!');
          setIsLoading(false);
        });
    }
  }
  return (
    <Container>
      <Input
        placeholder="Seu nome"
        containerStyle={{ marginBottom: 10 }}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#c2c2c2',
        }}
        errorMessage={error}
      />
      <Button
        title="Atualizar nome"
        containerStyle={{ marginTop: 20, width: '100%' }}
        buttonStyle={{ backgroundColor: '#00a680' }}
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </Container>
  );
}
