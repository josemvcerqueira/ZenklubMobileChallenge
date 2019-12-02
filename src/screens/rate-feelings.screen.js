import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import SliderBar from '@react-native-community/slider';

import {FeelingObj} from '../constants/feelings';
import theme from '../constants/theme';
import {Layout, Paragraph} from '../components';
import {capitalizeFirstLetter} from '../utils/helper-functions';
import NavigationService from '../api/navigation-service';
import Screens from '../constants/screens';
import Context from '../store/context';
import FeelingActions from '../constants/action-types';

const LargeEmoji = props => <Paragraph style={styles.largeEmoji} {...props} />;

const Title = props => <Paragraph style={styles.title} {...props} />;

const captionString = capitalizeFirstLetter(
  'choose the intensity of your feeling',
);
const titleString = capitalizeFirstLetter("i'm feeling");

const Feeling = props => (
  <Paragraph style={[styles.title, styles.feeling]} {...props} />
);

const Button = ({handleNext}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
      <Paragraph style={styles.buttonText}>Next</Paragraph>
    </TouchableOpacity>
  </View>
);

const Caption = props => <Paragraph style={styles.caption} {...props} />;

const Description = props => (
  <Paragraph style={styles.sliderDescription} {...props} />
);

const Slider = ({feelingValue, setFeelingValue}) => (
  <View style={styles.sliderContainer}>
    <Description>
      {feelingValue}% | {FeelingObj[feelingValue]}
    </Description>
    <SliderBar
      style={styles.slider}
      minimumValue={0}
      maximumValue={100}
      step={25}
      value={feelingValue}
      onValueChange={setFeelingValue}
      thumbTintColor={theme.colors.primary}
      minimumTrackTintColor={theme.colors.primaryLight}
      maximumTrackTintColor={theme.colors.grayLight}
    />
  </View>
);

const Header = ({emoji, text, feelingValue}) => (
  <View style={styles.header}>
    <LargeEmoji>{emoji}</LargeEmoji>
    <Title>{titleString}</Title>
    <Feeling>
      {FeelingObj[feelingValue]} {text}
    </Feeling>
    <Caption>{captionString}</Caption>
  </View>
);

export default () => {
  const {
    state: {currentFeeling},
    dispatch,
  } = useContext(Context);
  const [feelingValue, setFeelingValue] = useState(0);

  useEffect(() => {
    setFeelingValue(parseInt(currentFeeling.value, 10));
  }, [currentFeeling.value]);

  const handleNext = () => {
    dispatch({
      type: FeelingActions.ADD_FEELING,
      payload: {...currentFeeling, value: feelingValue.toString(10)},
    });
    NavigationService.navigate(Screens.Feelings);
  };

  return (
    <Layout safeAreaStyles={styles.layout}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      <Header
        emoji={currentFeeling.emoji}
        feelingValue={feelingValue}
        text={currentFeeling.text}
      />
      <Slider feelingValue={feelingValue} setFeelingValue={setFeelingValue} />
      <Button handleNext={handleNext} />
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
  largeEmoji: {fontSize: theme.sizes.padding * 3},
  title: {
    fontSize: theme.sizes.padding * 1.2,
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
