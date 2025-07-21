import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'gradient' | 'outlined' | 'elevated';
  padding?: number;
  margin?: number;
  borderRadius?: number;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 16,
  margin = 0,
  borderRadius = 12,
  disabled = false,
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius,
      padding,
      margin,
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: colors.surface,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      gradient: {
        backgroundColor: 'transparent',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      },
      outlined: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      },
      elevated: {
        backgroundColor: colors.surface,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...(disabled && { opacity: 0.6 }),
    };
  };

  const CardContent = () => (
    <View style={[getCardStyle(), style]}>
      {variant === 'gradient' && (
        <LinearGradient
          colors={[colors.surface, colors.surfaceSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius },
          ]}
        />
      )}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
        style={{ borderRadius }}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

// Specialized card components
export const WorkoutCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card {...props} variant="elevated" />
);

export const ProgressCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card {...props} variant="gradient" />
);

export const StatsCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card {...props} variant="default" />
);

export const MotivationalCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card {...props} variant="gradient" />
);

const styles = StyleSheet.create({
  // Additional styles if needed
});