import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';

import Loading from '~/components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

// import { Container } from './styles';

export default function Account() {
  const [login, setLogin] = useState(null);
  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => (!user ? setLogin(false) : setLogin(true)));
  }, []);

  if (login === null) {
    return <Loading isVisible text="carregando..." />;
  }

  return login ? <UserLogged /> : <UserGuest />;
}
