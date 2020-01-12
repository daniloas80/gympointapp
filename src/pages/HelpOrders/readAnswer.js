/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Container,
  ScrollContainer,
  List,
  ItemContainer,
  ItemContainerHeader,
  ItemContainerHeaderLeft,
  ItemContainerHeaderLeftText,
  ItemContainerHeaderRight,
  HelpOrderText,
} from './styles';

import Background from '../../components/Background';

function HelpOrders({ navigation }) {
  const id = useSelector(state => state.auth.student.id);

  const { hoId } = navigation.state.params;

  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${id}/help-orders/${hoId}`);
    const { data } = response;

    const read = {
      ...data,
      formattedCreatedAt: formatRelative(parseISO(data.createdAt), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
      formattedUpdateddAt: formatRelative(
        parseISO(data.createdAt),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      ),
    };

    setHelpOrders([read]);
    setLoading(false);
  }

  useEffect(() => {
    loadHelpOrders();
  }, [loading]);

  return (
    <Background>
      <Container>
        <ScrollContainer>
          <List
            answerPage
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ItemContainer answerPage>
                <ItemContainerHeader content={item.question}>
                  <ItemContainerHeaderLeft>
                    <ItemContainerHeaderLeftText>
                      PERGUNTA
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                  <ItemContainerHeaderRight>
                    {item.formattedCreatedAt}
                  </ItemContainerHeaderRight>
                </ItemContainerHeader>
                <HelpOrderText content>{item.question}</HelpOrderText>

                <ItemContainerHeader content={item.answer} answerText>
                  <ItemContainerHeaderLeft>
                    <ItemContainerHeaderLeftText>
                      RESPOSTA
                    </ItemContainerHeaderLeftText>
                  </ItemContainerHeaderLeft>
                </ItemContainerHeader>
                <HelpOrderText content={item.answer}>
                  {item.answer}
                </HelpOrderText>
              </ItemContainer>
            )}
          />
        </ScrollContainer>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
