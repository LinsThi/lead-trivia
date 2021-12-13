import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import { Baseboard } from '~/components/Baseboard';
import { NewText } from '~/components/Text';

import * as S from './styles';

export function Result() {
  const navigation = useNavigation();
  const { Colors } = useContext(ThemeContext);

  const [quantityQuestion, setQuantityQuestion] = useState(7);
  const [textCongrats, setTextCongrats] = useState('');

  useEffect(() => {
    navigation.setOptions({
      iconLeftType: 'antDesign',
      iconLeftName: 'arrowleft',
      title: 'Resultado final',
    });
  }, [navigation]);

  useEffect(() => {
    if (quantityQuestion >= 7) {
      setTextCongrats('PARABÉNS');
    } else {
      setTextCongrats('Poxa...');
    }
  }, [quantityQuestion]);

  return (
    <S.Container>
      <S.ContainerResult style={S.styles.shadow}>
        <S.TextScreen>Quiz resultado</S.TextScreen>
        <S.ContainerResultInfo>
          <S.Image
            source={{
              uri:
                quantityQuestion >= 7
                  ? 'https://emoji.gg/assets/emoji/1238_Trophy.png'
                  : 'https://images.emojiterra.com/google/android-nougat/512px/1f3c5.png',
            }}
          />
        </S.ContainerResultInfo>

        <S.ContainerResultQuantity>
          <NewText
            fontColor={
              quantityQuestion > 6 ? Colors.CONGRATS_COLOR : Colors.FAILED_COLOR
            }
            fontSize={40}
          >
            {textCongrats}
          </NewText>

          <NewText fontSize={20} fontColor={Colors.FONT_RESULT_COLOR}>
            Você conseguiu fazer uma pontuação total de
          </NewText>

          <S.ContainerQuantity>
            <S.Icons iconType="feather" name="check" correct />
            <Text>{quantityQuestion} Corretas</Text>

            <S.Icons iconType="evilIcons" name="close" />
            <Text>{10 - quantityQuestion} Incorretas</Text>
          </S.ContainerQuantity>
        </S.ContainerResultQuantity>
      </S.ContainerResult>
      <S.ContainerBase>
        <Baseboard />
      </S.ContainerBase>
    </S.Container>
  );
}