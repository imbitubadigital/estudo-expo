import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

export const Container = styled.ScrollView`
  margin: 0 30px;
`;

export const Logo = styled.Image`
  height: 300px;
  width: 100%;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
  text-align: center;
`;

export const Description = styled.Text`
  margin-bottom: 10px;
  text-align: center;
`;

export const BoxBtn = styled.View`
  flex: 1;
  align-items: center;
`;

export const Btn = styled(Button).attrs({
  containerStyle: {
    width: '70%',
  },
  buttonStyle: {
    backgroundColor: '#00a680',
  },
})``;
