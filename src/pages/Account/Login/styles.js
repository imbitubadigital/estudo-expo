import styled from 'styled-components/native';

import { Divider } from 'react-native-elements';

export const Container = styled.View`
  margin: 0 40px;
`;

export const Logo = styled.Image`
  height: 150px;
  width: 100%;
  margin-top: 20px;
`;
export const Line = styled(Divider)`
  background: #00a680;
  margin: 40px;
`;

export const Txt = styled.Text`
  margin: 15px 10px 0;
`;
export const BtnRegister = styled.Text`
  color: #00a680;
  font-weight: bold;
`;
