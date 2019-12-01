import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {Layout} from '../components';
import EMOJI_ARR from '../constants/feelings';
import theme from '../constants/theme';
import NavigationService from '../api/navigation-service';
import Screens from '../constants/screens';

const Paragraph = ({style = styles.paragraph, ...otherProps}) => (
  <Text style={style} {...otherProps} />
);

const Emoji = props => <Paragraph style={styles.emoji} {...props} />;

const Description = props => (
  <Paragraph style={styles.description} {...props} />
);

const FeelingBubble = ({emoji, description, containerStyles}) => (
  <View style={containerStyles}>
    <Emoji>{emoji}</Emoji>
    <Description>{description}</Description>
  </View>
);

const FeelingBubbleContainer = ComponentToEnrich => props => {
  const {description} = props;
  const componentStyles =
    description.length <= 4 ? styles.mediumCircle : styles.largeCircle;
  return (
    <ComponentToEnrich
      {...props}
      containerStyles={[componentStyles, styles.feelingBubble]}
    />
  );
};

const Bubbles = FeelingBubbleContainer(FeelingBubble);

const Title = props => <Paragraph {...props} />;

const Content = ({data}) => (
  <ScrollView
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}>
    {data.map(({emoji, text}) => (
      <TouchableOpacity
        key={text}
        onPress={() => {
          NavigationService.navigate(Screens.RateFeelings);
        }}>
        <Bubbles emoji={emoji} description={text} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default () => {
  return (
    <Layout safeAreaStyles={styles.layout}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <Title style={styles.title}>How are you feeling?</Title>
      <Content data={EMOJI_ARR} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.sizes.base * 1.4,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: theme.sizes.padding,
    color: theme.colors.white,
  },
  feelingBubble: {
    backgroundColor: theme.colors.primaryLight,
    padding: theme.sizes.base / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.sizes.base / 1.5,
  },
  mediumCircle: {
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 4,
    borderRadius: theme.sizes.padding * 2,
  },
  largeCircle: {
    width: theme.sizes.padding * 5,
    height: theme.sizes.padding * 5,
    borderRadius: theme.sizes.padding * 2.5,
  },
  emoji: {fontSize: theme.sizes.padding * 1.5},
  description: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.sizes.base * 1.2,
    textTransform: 'capitalize',
  },
  paragraph: {fontSize: theme.sizes.base},
});
