import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import theme from '../constants/theme';

export default ({children, safeAreaStyles = {}}) => (
  <SafeAreaView style={[styles.safeArea, safeAreaStyles]}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    padding: theme.sizes.padding,
    flex: 1,
    flexShrink: 1,
  },
});
