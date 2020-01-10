/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { checkinRequest } from '../../store/modules/checkins/actions';

import api from '../../services/api';
import {
  Container,
  CheckinButton,
  List,
  ItemContainer,
  CheckinNumber,
  CheckinDate,
} from './sytles';

import Background from '../../components/Background';

export default function CheckIn() {
  const id = useSelector(state => state.auth.student.id);
  const name = useSelector(state => state.auth.student.name);
  const [loading, setLoading] = useState(false);
  const [checkIns, setCheckIns] = useState([]);

  const dispatch = useDispatch();

  const buttonText = `Novo check-in`;

  async function loadCheckIns() {
    const response = await api.get(`/students/${id}/checkins`);
    const day = response.data;
    // console.tron.log(response);

    setCheckIns(
      day.map(checkin => ({
        ...checkin,
        formattedCreatedAt: formatRelative(
          parseISO(checkin.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
        numberOfCheckin: day.indexOf(checkin) + 1,
      }))
    );
    setLoading(false);
  }

  // const callback = () => loadCheckIns();

  useEffect(() => {
    loadCheckIns();
  }, [loading]);

  async function handleNewCheckIn() {
    setLoading(true);
    await dispatch(checkinRequest(id, name));

    // deixarei comentando o código abaixo porque é uma outra forma de fazer
    // para o caso do checkin há condicional que o usuário não pode fazer
    // mais de 5 checkins na semana. Para usar o código abaixo será necessário
    // alterar na api para quando for maior do que 5 checkins o status do
    // retorno do json precisa ser 400 para que a condicional abaixo possa
    // exibir a mensagem correta.

    // const response = api.post(`students/${id}/checkins`);
    // if (response.status === 200) {
    //   Alert.alert('Sucesso', `Olá ${name}, acesso liberado`);
    // } else {
    //   Alert.alert(
    //     'Error',
    //     `Olá ${name}, acesso boqueado! Você já fez mais de 5 checkins esta semana`
    //   );
    // }
    //  callback();
  }

  return (
    <Background>
      <Container>
        <CheckinButton loading={loading} onPress={handleNewCheckIn}>
          {buttonText}
        </CheckinButton>

        <List
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ItemContainer>
              <CheckinNumber>Check-in #{item.numberOfCheckin}</CheckinNumber>
              <CheckinDate>{item.formattedCreatedAt}</CheckinDate>
            </ItemContainer>
          )}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-Ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="room" size={20} color={tintColor} />
  ),
};
