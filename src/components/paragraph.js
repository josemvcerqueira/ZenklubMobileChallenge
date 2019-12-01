import React from 'react';
import {Text, StyleSheet} from 'react-native';
import theme from '../constants/theme';

export default ({style = styles.paragraph, ...otherProps}) => (
  <Text style={style} {...otherProps} />
);

const styles = StyleSheet.create({
  paragraph: {fontSize: theme.sizes.base},
});
