import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/app';
import { firebaseApp } from '~/services/Firebase';
import ButtonAction from '~/components/ButtonAction';
import ListRestaurants from '~/components/Restaurants/ListRestaurants';
import { Container } from './styles';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [stardRestaurants, setStardRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const limitRestaurants = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfor => {
      setUser(userInfor);
    });
  }, []);

  useEffect(() => {
    db.collection('restaurants')
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    async function loadRest() {
      const resultRestaurants = [];
      const restaurants = db
        .collection('restaurants')
        .orderBy('creatAt', 'desc')
        .limit(limitRestaurants);
      await restaurants.get().then(response => {
        setStardRestaurants(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });
        setRestaurants(resultRestaurants);
      });
    }
    loadRest();
  }, []);

  return (
    <Container>
      <ListRestaurants restaurants={restaurants} />
      {user && <ButtonAction navigation={navigation} url="AddRestaurant" />}
    </Container>
  );
}
