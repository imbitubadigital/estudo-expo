import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
// import { Container } from './styles';
const vars = {
  name: '{{NOME_DO_CLIENTE}}',
};

export default function Search() {
  const [frase, setFrase] = useState('');
  const [positions, setPositions] = useState({ end: 0, start: 0 });

  function clone() {
    const { end, start } = positions;
    const sentenceStart = frase.substring(0, start);
    const sentenceEnd = frase.slice(end, frase.length);
    const newStence = sentenceStart + vars.name + sentenceEnd;
    setFrase(newStence);
    /*  console.log('sentenceStart', sentenceStart);
    console.log('sentenceEnd', sentenceEnd); */
  }

  return (
    <View>
      <Text>{frase}</Text>
      <Button title="Variavel" onPress={clone} />
      <Input
        placeholder="Testando"
        value={frase}
        onSelectionChange={e => setPositions(e.nativeEvent.selection)}
        onChange={e => setFrase(e.nativeEvent.text)}
      />
    </View>
  );
}
