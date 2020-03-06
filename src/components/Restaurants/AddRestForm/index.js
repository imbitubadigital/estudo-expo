import React, { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ScrollView, Alert, Dimensions, Platform } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView from 'react-native-maps';
import * as Random from 'expo-random';
// import { v4 as uuidv4 } from 'uuid';
// import uuid from 'react-native-uuid';
// import uuid from 'uuid-random';
import firebase from 'firebase/app';
import { firebaseApp } from '~/services/Firebase';
import 'firebase/firestore';
import Modal from '~/components/Modal';
import { ContainerMap, ViewImage, ViewPhoto, Form, MapBtn } from './styles';
import noImage from '../../../../assets/images/no-image.png';

const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get('window').width;

export default function AddRestForm({ navigation, toastRef, setIsLoading }) {
  const [imagesSelected, setImagesSelected] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  async function uploadImagesRestaurantes(imageArray) {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const randomBytes = await Random.getRandomBytesAsync(16);
        const customId = randomBytes
          .toString('base64')
          .replace(/[^a-zA-Z0-9]/g, '');
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref('restaurant-images')
          .child(customId);

        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  }

  function addRestaurante() {
    if (!restaurantName || !restaurantAddress || !restaurantDescription) {
      toastRef.current.show('Todos os campos do foumlário são obrigatórios!');
    } else if (imagesSelected.length < 1) {
      toastRef.current.show('Selecione ao menos uma imagem do resutarante!');
    } else if (!locationRestaurant) {
      toastRef.current.show('Selecione a localização do restaurante!');
    } else {
      setIsLoading(true);
      uploadImagesRestaurantes(imagesSelected).then(arrayImages => {
        const data = {
          name: restaurantName,
          address: restaurantAddress,
          description: restaurantDescription,
          location: locationRestaurant,
          images: arrayImages,
          rating: 0,
          ratingTotal: 0,
          quantityVoting: 0,
          creatAt: new Date(),
          createBy: firebaseApp.auth().currentUser.uid,
        };

        db.collection('restaurants')
          .add(data)
          .then(() => {
            setIsLoading(false);
            navigation.navigate('Restaurants');
          })
          .catch(err => {
            console.log('erro final', err);
            setIsLoading(false);
            toastRef.current.show('Erro ao salvar restaurante!');
          });
      });
    }
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      /*  keyboardOpeningTime={0} */
      extraHeight={Platform.select({ android: 200 })}
    >
      <ImageRestaurant imgRest={imagesSelected[0]} />
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Button
        title="Salvar Restaurante"
        onPress={addRestaurante}
        containerStyle={{ paddingRight: 5 }}
        buttonStyle={{ backgroundColor: '#00a680', margin: 20 }}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </KeyboardAwareScrollView>
  );
}

function Map({
  isVisibleMap,
  setIsVisibleMap,
  setLocationRestaurant,
  toastRef,
}) {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    async function getLocation() {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== 'granted') {
        toastRef.current.show(
          'Acesse as configurações do seu dispositivo e libere o acesso de localização para nosso app!'
        );
      } else {
        let options = {};
        if (Platform.OS === 'android') {
          options = { accuracy: Location.Accuracy.High };
        }
        const loc = await Location.getCurrentPositionAsync(options);
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    }
    getLocation();
  }, [toastRef]);

  function confirmLocation() {
    setLocationRestaurant(location);
    toastRef.current.show('Localização configurada!');
    setIsVisibleMap(false);
  }
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <ContainerMap>
        {location && (
          <MapView
            style={{ width: '100%', height: 450 }}
            initialRegion={location}
            showsUserLocation
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <MapBtn>
          <Button
            title="Salvar Localização"
            onPress={confirmLocation}
            containerStyle={{ paddingRight: 5 }}
            buttonStyle={{ backgroundColor: '#00a680' }}
          />
          <Button
            title="Cancelar"
            onPress={() => {}}
            containerStyle={{ paddingLeft: 5 }}
            buttonStyle={{ backgroundColor: '#a60d0d' }}
          />
        </MapBtn>
      </ContainerMap>
    </Modal>
  );
}

function FormAdd({
  setRestaurantName,
  setRestaurantAddress,
  setRestaurantDescription,
  setIsVisibleMap,
  locationRestaurant,
}) {
  return (
    <Form>
      <Input
        placeholder="Nome do restaurante"
        containerStyle={{ marginBottom: 10 }}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Direção"
        containerStyle={{ marginBottom: 10 }}
        rightIcon={{
          type: 'material-community',
          name: 'google-maps',
          color: locationRestaurant ? '#00a680' : '#c2c2c2',
          onPress: () => setIsVisibleMap(true),
        }}
        onChange={e => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descrição do restaurante"
        multiline
        containerStyle={{
          margin: 0,
          height: 100,
          width: '100%',
          padding: 0,
        }}
        onChange={e => setRestaurantDescription(e.nativeEvent.text)}
      />
    </Form>
  );
}

function ImageRestaurant({ imgRest }) {
  return (
    <ViewPhoto>
      {imgRest ? (
        <Image
          source={{ uri: imgRest }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image source={noImage} style={{ width: widthScreen, height: 200 }} />
      )}
    </ViewPhoto>
  );
}

function UploadImage({ imagesSelected, setImagesSelected, toastRef }) {
  async function imageSelect() {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera = resultPermission.permissions.status;
    if (resultPermissionCamera === 'denied') {
      toastRef.current.show(
        'O acesso a galeria deve estar ativado em seu dispositivo!'
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result === 'canceled') {
        toastRef.current.show('O acesso a galeria cancelado!');
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  }

  function removeImage(img) {
    const arrImg = imagesSelected;
    Alert.alert(
      'Deletar imagem?',
      'Tem certeza que deseja removar a imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => setImagesSelected(arrImg.filter(i => i !== img)),
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <ViewImage>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            height: 70,
            width: 70,
            backgroundColor: '#e3e3e3',
          }}
          onPress={imageSelect}
        />
      )}

      {imagesSelected.map((img, index) => (
        <Avatar
          key={index}
          onPress={() => removeImage(img)}
          style={{ height: 70, width: 70, marginRight: 10 }}
          source={{ uri: img }}
        />
      ))}
    </ViewImage>
  );
}
