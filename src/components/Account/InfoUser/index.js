import React from 'react';
import { View, YellowBox } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { Container, Name } from './styles';

export default function InfoUser({
  userInfo,
  setReloadData,
  toastRef,
  setIsLoading,
  setTextLoading,
}) {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const { uid, displayName, email, photoURL } = userInfo;

  async function uploadImage(uri, nameImage) {
    setTextLoading('Atualizando avatar!');
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`);
    return ref.put(blob);
  }

  function updatePhotoUrl(id) {
    firebase
      .storage()
      .ref(`avatar/${id}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show('Erro ao recuperar avatar do servidor!');
        setIsLoading(false);
      });
  }

  async function changeAvatar() {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermissionCamera === 'denied') {
      toastRef.current.show(
        'É necessário aceitar a permissão de acesso a câmera e a galeria!'
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show('Cancelado o acesso a galeria!');
      } else {
        uploadImage(result.uri, uid)
          .then(() => {
            updatePhotoUrl(uid);
          })
          .catch(() => {
            toastRef.current.show('Erro ao realizar upload!');
          });
      }
    }
  }

  return (
    <Container>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={{ marginRight: 20 }}
        source={{
          uri:
            photoURL ||
            'https://api.adorable.io/avatars/226/abott@adorable.png',
        }}
      />
      <View>
        <Name>{displayName || 'Anônimo'}</Name>
        <Name>{email || 'Social Login'}</Name>
      </View>
    </Container>
  );
}
