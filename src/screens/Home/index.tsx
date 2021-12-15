import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Baseboard } from '~/components/Baseboard';
import { NewText } from '~/components/Text';

import type { AplicationState } from '~/@types/Entity/AplicationState';
import { QUESTION_SCREEN } from '~/constants/routes';

import { listQuestions } from './mock';

import * as S from './styles';

export function Home() {
  const { currentUser } = useSelector((state: AplicationState) => state.user);

  const navigation = useNavigation();
  const [numbColumns, setNumbColumns] = useState(2);
  const [categorySelected, setCategorySelected] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: `Bem-vindo(a) ${currentUser.username}`,
    });
  }, [navigation, currentUser.username]);

  const handleSelectCategory = useCallback(
    (category: string) => {
      setCategorySelected(category);
      navigation.navigate(QUESTION_SCREEN);
    },
    [navigation],
  );

  function renderCategory({ item }: any) {
    return (
      <S.ButtonCategory onPress={() => handleSelectCategory(item.name)}>
        <S.ContainerCategory>
          <NewText>{item.name}</NewText>
        </S.ContainerCategory>
      </S.ButtonCategory>
    );
  }

  return (
    <S.Container>
      <S.FlatCategoryList
        data={listQuestions}
        extraData={listQuestions}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderCategory}
        numColumns={numbColumns}
      />

      <S.ContainerBase>
        <Baseboard />
      </S.ContainerBase>
    </S.Container>
  );
}
