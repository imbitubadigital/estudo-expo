import React from 'react';
import { withNavigation } from 'react-navigation';
import { Buttom } from 'react-native-elements';
import img from '../../../../assets/images/user-guest.jpg';
// user-guest
import { Container, Logo, Title, Description, BoxBtn, Btn } from './styles';

function UserGuest({ navigation }) {
  return (
    <Container centerContent>
      <Logo source={img} resizeMode="contain" />
      <Title>Verifique seu Perfil!</Title>
      <Description>
        Como você descreveria o seu melhor restaurante? Pesquise e visualize os
        melhores restaurantes de uma maneira simples, vote no que você mais
        gostou e comente como tem sido sua experiência.
      </Description>
      <BoxBtn>
        <Btn title="Ver Perfil" onPress={() => navigation.navigate('Login')} />
      </BoxBtn>
    </Container>
  );
}

export default withNavigation(UserGuest);
