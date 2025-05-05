import React, { Fragment, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { TypographyStyles } from '../theme/typography';
import { useTypography } from '@/hooks/useTypography';
import { CommonStyles } from '@/theme/common.styles';

interface HighlightedText {
  text: string;
  callback: () => void;
}

interface TextLinkProps {
  content: string;
  highlighted: HighlightedText[];
  center?: boolean;
  fontColor?: string;
  style?: StyleProp<TextStyle>;
}

export const TextLink: React.FC<TextLinkProps> = ({
  content,
  highlighted,
  fontColor = colors.black,
  center,
  style,
}: TextLinkProps) => {
  const fontsLoaded = useTypography();
  const createHighlightedText = useCallback(
    (text: string, callback?: () => void, index?: number) => {
      const key = callback ? `${text}-${index}-highlighted` : 'remaining';

      return (
        <Pressable key={key} onPress={callback}>
          <Text style={TypographyStyles.robotoRegular14} disabled={!callback}>
            {text}
          </Text>
        </Pressable>
      );
    },
    [fontColor]
  );

  const renderElements = useMemo(() => {
    let lastIndex = 0;
    const elements = highlighted.map(({ text, callback }, index) => {
      const startIndex = content.indexOf(text);
      const endIndex = startIndex + text.length;
      const normalText = content.slice(lastIndex, startIndex);
      lastIndex = endIndex;

      return (
        <Fragment key={`${text}-${index}`}>
          {createHighlightedText(normalText)}
          {createHighlightedText(text, callback, index)}
        </Fragment>
      );
    });

    elements.push(createHighlightedText(content.slice(lastIndex)));
    return elements;
  }, [content, createHighlightedText, highlighted]);
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.blue} />;
  }
  return (
    <View style={[center && CommonStyles.alignJustifyCenter]}>
      {renderElements}
    </View>
  );
};
