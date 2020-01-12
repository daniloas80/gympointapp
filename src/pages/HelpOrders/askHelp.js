/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// import { parseISO, formatRelative } from 'date-fns';
// import pt from 'date-fns/locale/pt';
// import api from '../../services/api';

import { questionHelpOrdersRequest } from '../../store/modules/helporders/actions';

import { Container, HelpOrderButton, Input } from './styles';

import Background from '../../components/Background';

export default function HelpOrders() {
  const buttonText = `Enviar pedido`;
  const id = useSelector(state => state.auth.student.id);
  const [myAskForHelp, setMyAskForHelp] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function handleNewHelp() {
    setLoading(true);
    if (myAskForHelp === '') {
      Alert.alert('Erro', 'Você deve digitar uma pergunta.');
    } else {
      await dispatch(questionHelpOrdersRequest(myAskForHelp, id));
    }
  }

  return (
    <Background>
      <Container>
        <Input
          multiline
          editable
          numberOfLines={8}
          textAlignVertical="top"
          placeholder="Inclua o seu pedido de ajuda."
          onChangeText={value => setMyAskForHelp(value)}
          value={myAskForHelp}
          style={{ height: 200, textAlignVertical: 'top' }}
        />
        <HelpOrderButton loading={loading} onPress={handleNewHelp}>
          {buttonText}
        </HelpOrderButton>
      </Container>
    </Background>
  );
}
