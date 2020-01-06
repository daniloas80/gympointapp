import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  // const id = useSelector(state => state.auth.id);
  const [loading, setLoading] = useState(false);

  const buttonText = `Novo check-in`;

  return (
    <Background>
      <Container>
        <CheckinButton loading={loading}>{buttonText}</CheckinButton>

        <List>
          <ItemContainer>
            <CheckinNumber>{/* <Text>Check-in #1</Text> */}</CheckinNumber>
            <CheckinDate>{/* <Text>Hoje às 14h</Text> */}</CheckinDate>
          </ItemContainer>
        </List>
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
