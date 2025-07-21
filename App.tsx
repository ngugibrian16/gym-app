import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { colors } from './src/constants/colors';
import { typography } from './src/constants/typography';

// Import screens
import { HomeScreen } from './src/screens/HomeScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { NutritionScreen } from './src/screens/NutritionScreen';
import { WellnessScreen } from './src/screens/WellnessScreen';

const Tab = createBottomTabNavigator();

// Custom tab bar icon component
const TabIcon: React.FC<{ emoji: string; label: string; focused: boolean }> = ({
  emoji,
  label,
  focused,
}) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>
      {emoji}
    </Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
      {label}
    </Text>
  </View>
);

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.primary}
        translucent={false}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textLight,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon emoji="🏠" label="Home" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Workouts"
            component={WorkoutsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon emoji="💪" label="Workouts" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon emoji="📊" label="Progress" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Nutrition"
            component={NutritionScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon emoji="🍎" label="Nutrition" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Wellness"
            component={WellnessScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon emoji="🧘‍♀️" label="Wellness" focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.6,
  },
  tabEmojiActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    ...typography.tabLabel,
    color: colors.textLight,
    fontSize: 10,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});