import React, {useState} from 'react';
import {StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import SliderBar from '@react-native-community/slider';

import {FeelingObj} from '../constants/feelings';
import theme from '../constants/theme';
import {Layout, Paragraph} from '../components';
import {capitalizeFirstLetter} from '../utils/helper-functions';
import NavigationService from '../api/navigation-service';
import Screens from '../constants/screens';
import set from '@babel/runtime/helpers/esm/set';

const LargeEmoji = props => <Paragraph style={styles.largeEmoji} {...props} />;

const Title = props => <Paragraph style={styles.title} {...props} />;

const captionString = capitalizeFirstLetter(
  'choose the intensity of your feeling',
);
const titleString = capitalizeFirstLetter("i'm feeling");

const Feeling = props => (
  <Paragraph style={[styles.title, styles.feeling]} {...props} />
);

const Button = props => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => NavigationService.navigate(Screens.Feelings)}>
      <Paragraph style={styles.buttonText}>Next</Paragraph>
    </TouchableOpacity>
  </View>
);

const Caption = props => <Paragraph style={styles.caption} {...props} />;

const Description = props => (
  <Paragraph style={styles.sliderDescription} {...props} />
);

const Slider = ({feeling, setFeeling}) => (
  <View style={styles.sliderContainer}>
    <Description>{feeling}% | Slighly</Description>
    <SliderBar
      style={styles.slider}
      minimumValue={0}
      maximumValue={100}
      step={25}
      value={feeling}
      onValueChange={setFeeling}
      thumbTintColor={theme.colors.primary}
      minimumTrackTintColor={theme.colors.primaryLight}
      maximumTrackTintColor={theme.colors.grayLight}
    />
  </View>
);

const Header = () => (
  <View style={styles.header}>
    <LargeEmoji>{FeelingObj.emoji}</LargeEmoji>
    <Title>{titleString}</Title>
    <Feeling>{FeelingObj.text}</Feeling>
    <Caption>{captionString}</Caption>
  </View>
);

export default () => {
  const [feeling, setFeeling] = useState(0);
  return (
    <Layout safeAreaStyles={styles.layout}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      <Header />
      <Slider feeling={feeling} setFeeling={setFeeling} />
      <Button />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {backgroundColor: theme.colors.white},
  header: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeEmoji: {fontSize: theme.sizes.padding * 3.5},
  title: {
    fontSize: theme.sizes.padding * 2,
    color: theme.colors.black,
    fontWeight: '600',
  },
  feeling: {
    color: theme.colors.primary,
    textTransform: 'capitalize',
  },
  caption: {
    marginTop: theme.sizes.padding,
    fontSize: theme.sizes.base,
    color: theme.colors.gray,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {width: '90%', height: theme.sizes.padding * 2},
  sliderDescription: {
    fontSize: theme.sizes.base * 2,
    color: theme.colors.black,
    marginVertical: theme.sizes.base,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.sizes.padding,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.sizes.padding * 2,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.sizes.padding,
  },
});
