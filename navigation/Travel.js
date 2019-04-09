import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation";

import List from '../screens/List';
import Article from '../screens/Article';

export default createStackNavigator(
    {
        List,
        Article,
    },
    {
        initialRouteName: "List"
    }
);

