import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    };

    // Size variations
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        minHeight: 48,
      },
      large: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        minHeight: 56,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      success: {
        backgroundColor: colors.success,
      },
      warning: {
        backgroundColor: colors.warning,
      },
      gradient: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && {
        opacity: 0.6,
        shadowOpacity: 0,
        elevation: 0,
      }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeTextStyles: Record<string, TextStyle> = {
      small: typography.buttonSmall,
      medium: typography.button,
      large: typography.buttonLarge,
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: { color: colors.textOnPrimary },
      secondary: { color: colors.textOnPrimary },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
      success: { color: colors.textOnPrimary },
      warning: { color: colors.textOnPrimary },
      gradient: { color: colors.textOnPrimary },
    };

    return {
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
      ...(disabled && { opacity: 0.7 }),
    };
  };

  const renderContent = () => (
    <>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textOnPrimary}
          style={{ marginRight: icon || title ? 8 : 0 }}
        />
      )}
      {icon && !loading && <>{icon}</>}
      {title && (
        <Text style={[getTextStyle(), textStyle, icon && { marginLeft: 8 }]}>
          {title}
        </Text>
      )}
    </>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: 12 },
          ]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

// Specialized button components for common use cases
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="primary" />
);

export const GradientButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="gradient" />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="outline" />
);

export const SuccessButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button {...props} variant="success" />
);

// Motivational button with encouraging messages
interface MotivationalButtonProps extends Omit<ButtonProps, 'title'> {
  motivationalText?: string;
  defaultText: string;
  isMotivational?: boolean;
}

export const MotivationalButton: React.FC<MotivationalButtonProps> = ({
  motivationalText = "You've got this! 💪",
  defaultText,
  isMotivational = false,
  ...props
}) => {
  return (
    <GradientButton
      {...props}
      title={isMotivational ? motivationalText : defaultText}
    />
  );
};

const styles = StyleSheet.create({
  // Additional styles if needed
});