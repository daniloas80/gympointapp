/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  HelpOrderButton,
  List,
  ButtonContainer,
  ItemContainer,
  ItemContainerHeader,
  ItemContainerHeaderLeft,
  ItemContainerHeaderLeftText,
  ItemContainerHeaderRight,
  HelpOrderText,
} from './styles';

import Background from '../../components/Background';

function HelpOrders({ isFocused, navigation }) {
  const buttonText = `Novo pedido de auxílio`;
  const id = useSelector(state => state.auth.student.id);
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${id}/help-orders/`);
    const { data } = response;

    setHelpOrders(
      data.map(helpOrder => ({
        ...helpOrder,
        formattedCreatedAt: formatRelative(
          parseISO(helpOrder.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(id);
    }
  }, [id, isFocused]);

  return (
    <Background>
      <Container>
        <HelpOrderButton onPress={() => navigation.navigate('askHelp')}>
          {buttonText}
        </HelpOrderButton>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ButtonContainer
              onPress={() =>
                navigation.navigate('readAnswer', { hoId: item.id })
              }
            >
              <ItemContainer>
                <ItemContainerHeader content>
                  <ItemContainerHeaderLeft>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={item.answer ? '#42cb59' : '#777'}
                    />
                    <ItemContainerHeaderLeftText content={item.answer}>
                      {item.answer ? 'Respondido' : 'Sem resposta'}
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                  <ItemContainerHeaderRight>
                    {item.formattedCreatedAt}
                  </ItemContainerHeaderRight>
                </ItemContainerHeader>
                <HelpOrderText content numberOfLines={4}>
                  {item.question}
                </HelpOrderText>
              </ItemContainer>
            </ButtonContainer>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
