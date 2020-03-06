import * as firebase from 'firebase';

export const reautenticate = password => {
  const user = firebase.auth().currentUser;
  const credentiais = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credentiais);
};
