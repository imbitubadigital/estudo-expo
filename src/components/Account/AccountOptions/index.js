import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '~/components/Modal';
import { Container } from './styles';
import FormName from '~/components/Account/FormName';
import FormEmail from '~/components/Account/FormEmail';
import FormPassword from '~/components/Account/FormPassword';

export default function AccountOptions({ userInfo, setReloadData, toastRef }) {
  const { displayName, email } = userInfo;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  function selectedComponent(formDisplay) {
    switch (formDisplay) {
      case 'displayName':
        setRenderComponent(
          <FormName
            email={email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case 'displayEmail':
        setRenderComponent(
          <FormEmail
            email={email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case 'displayPassword':
        setRenderComponent(
          <FormPassword
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        setRenderComponent(null);
        break;
    }
  }
  const menuOptions = [
    {
      id: 1,
      title: 'Editar Nome',
      iconType: 'material-community',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('displayName'),
    },
    {
      id: 2,
      title: 'Editar Email',
      iconType: 'material-community',
      iconNameLeft: 'at',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('displayEmail'),
    },
    {
      id: 3,
      title: 'Trocar Senha',
      iconType: 'material-community',
      iconNameLeft: 'lock-reset',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('displayPassword'),
    },
  ];

  return (
    <Container>
      {menuOptions.map(menu => (
        <ListItem
          key={menu.id}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3',
          }}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </Container>
  );
}
