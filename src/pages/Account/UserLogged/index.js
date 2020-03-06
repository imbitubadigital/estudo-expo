import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';

import InfoUser from '~/components/Account/InfoUser';
import Loading from '~/components/Loading';
import AccountOptions from '~/components/Account/AccountOptions';

import { Container } from './styles';

export default function UserLogged() {
  const toastRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState(' ');

  useEffect(() => {
    async function getUser() {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    }
    getUser();
    setReloadData(false);
  }, [reloadData]);
  return (
    <View>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Deslogar"
        buttonStyle={{
          marginTop: 30,
          borderRadius: 0,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e3e3e3',
          borderBottomWidth: 1,
          borderBottomColor: '#e3e3e3',
          paddingTop: 10,
          paddingBottom: 10,
        }}
        titleStyle={{ color: '#008a80' }}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}
