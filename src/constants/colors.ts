// FitBlossom Color Palette - Empowering & Feminine
export const colors = {
  // Primary Colors - Soft & Empowering
  primary: '#FF6B9D', // Warm pink - confidence & femininity
  primaryLight: '#FFB3D1', // Light pink - gentle motivation
  primaryDark: '#E91E63', // Deep pink - strength & determination
  
  // Secondary Colors - Growth & Wellness
  secondary: '#9C27B0', // Purple - wisdom & transformation
  secondaryLight: '#E1BEE7', // Light purple - calm confidence
  secondaryDark: '#7B1FA2', // Deep purple - inner strength
  
  // Accent Colors - Energy & Motivation
  accent: '#FF9800', // Orange - energy & enthusiasm
  accentLight: '#FFE0B2', // Light orange - warmth
  success: '#4CAF50', // Green - achievement & growth
  successLight: '#C8E6C9', // Light green - progress
  
  // Warning & Error - Gentle but Clear
  warning: '#FFC107', // Amber - gentle caution
  warningLight: '#FFF8E1',
  error: '#F06292', // Soft pink-red - kind but firm
  errorLight: '#FCE4EC',
  
  // Neutral Colors - Soft & Clean
  background: '#FAFAFA', // Off-white - clean & fresh
  surface: '#FFFFFF', // Pure white - clarity
  surfaceSecondary: '#F5F5F5', // Light gray - subtle depth
  
  // Text Colors - Readable & Friendly
  textPrimary: '#2D2D2D', // Dark gray - readable but not harsh
  textSecondary: '#757575', // Medium gray - supportive info
  textLight: '#BDBDBD', // Light gray - subtle text
  textOnPrimary: '#FFFFFF', // White on colored backgrounds
  
  // Gradient Colors - Motivational & Uplifting
  gradients: {
    primary: ['#FF6B9D', '#9C27B0'], // Pink to purple - empowerment
    success: ['#4CAF50', '#81C784'], // Green gradient - growth
    energy: ['#FF9800', '#FFB74D'], // Orange gradient - motivation
    calm: ['#E1BEE7', '#F3E5F5'], // Light purple - wellness
    sunset: ['#FF6B9D', '#FF9800'], // Pink to orange - inspiration
  },
  
  // Special UI Colors
  border: '#E0E0E0', // Light border
  borderLight: '#F0F0F0', // Very light border
  shadow: 'rgba(0, 0, 0, 0.1)', // Soft shadow
  overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
  
  // Status Colors - Encouraging
  active: '#4CAF50', // Green - you're doing great!
  inactive: '#BDBDBD', // Gray - gentle nudge
  streak: '#FF9800', // Orange - fire/energy
  achievement: '#FFD700', // Gold - celebration
  
  // Chart Colors - Data Visualization
  chart: {
    primary: '#FF6B9D',
    secondary: '#9C27B0',
    tertiary: '#FF9800',
    quaternary: '#4CAF50',
    background: '#FAFAFA',
    grid: '#E0E0E0',
  },
  
  // Mood Colors - Emotional Tracking
  mood: {
    excellent: '#4CAF50', // Bright green
    good: '#8BC34A', // Light green
    okay: '#FFC107', // Amber
    low: '#FF9800', // Orange
    poor: '#F06292', // Soft pink-red
  },
  
  // Workout Difficulty Colors
  difficulty: {
    easy: '#4CAF50', // Green - you got this!
    medium: '#FF9800', // Orange - challenge yourself
    hard: '#F06292', // Pink-red - push your limits
  },
  
  // Tab Bar Colors
  tabBar: {
    active: '#FF6B9D',
    inactive: '#BDBDBD',
    background: '#FFFFFF',
    border: '#E0E0E0',
  },
};

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

export const getMoodColor = (mood: number): string => {
  switch (mood) {
    case 5: return colors.mood.excellent;
    case 4: return colors.mood.good;
    case 3: return colors.mood.okay;
    case 2: return colors.mood.low;
    case 1: return colors.mood.poor;
    default: return colors.textSecondary;
  }
};

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  return colors.difficulty[difficulty];
};