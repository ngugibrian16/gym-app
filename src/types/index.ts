// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  preferredWorkoutDays: number[];
  joinDate: Date;
  avatar?: string;
}

export type FitnessGoal = 'weight_loss' | 'toning' | 'muscle_gain' | 'strength' | 'general_fitness';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

// Workout Types
export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  targetMuscles: string[];
  exercises: Exercise[];
  caloriesBurned?: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps?: number;
  duration?: number; // for time-based exercises
  restTime: number; // in seconds
  equipment?: string[];
  instructions: string[];
  videoUrl?: string;
  gifUrl?: string;
  targetMuscles: string[];
}

// Progress Tracking Types
export interface WorkoutLog {
  id: string;
  workoutId: string;
  userId: string;
  date: Date;
  completedExercises: CompletedExercise[];
  totalDuration: number;
  caloriesBurned?: number;
  notes?: string;
  mood?: MoodRating;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
  notes?: string;
}

export interface CompletedSet {
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  restTime?: number;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    thighs?: number;
    arms?: number;
  };
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  date: Date;
  photoUri: string;
  type: 'front' | 'side' | 'back';
  isPrivate: boolean;
}

// Nutrition Types
export interface MealPlan {
  id: string;
  name: string;
  description: string;
  targetCalories: number;
  meals: Meal[];
  fitnessGoal: FitnessGoal;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  imageUrl?: string;
}

export interface DailyNutrition {
  id: string;
  userId: string;
  date: Date;
  meals: ConsumedMeal[];
  waterIntake: number; // in ml
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface ConsumedMeal {
  mealId: string;
  portion: number; // multiplier (1 = full portion)
  time: Date;
}

// Motivation & Habits Types
export interface Streak {
  id: string;
  userId: string;
  type: 'workout' | 'nutrition' | 'water';
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'workout' | 'nutrition' | 'streak' | 'progress';
  requirement: {
    type: string;
    value: number;
  };
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedDate: Date;
  isNew: boolean;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author?: string;
  category: 'workout' | 'nutrition' | 'general' | 'strength';
}

// Mood & Wellness Types
export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id: string;
  userId: string;
  date: Date;
  mood: MoodRating;
  energy: MoodRating;
  motivation: MoodRating;
  notes?: string;
  tags?: string[];
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  prompt: string;
  response: string;
  mood?: MoodRating;
}

// Notification Types
export interface NotificationSettings {
  workoutReminders: boolean;
  mealReminders: boolean;
  waterReminders: boolean;
  motivationalMessages: boolean;
  weeklyRecaps: boolean;
  achievementAlerts: boolean;
}

export interface PushNotification {
  id: string;
  userId: string;
  type: 'workout_reminder' | 'meal_reminder' | 'water_reminder' | 'motivational' | 'achievement';
  title: string;
  message: string;
  scheduledTime: Date;
  isRead: boolean;
}

// Community Types (Optional)
export interface CommunityChallenge {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  goal: {
    type: 'workouts' | 'days' | 'calories';
    target: number;
  };
  participants: string[]; // user IDs
  isActive: boolean;
}

export interface CommunityPost {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  type: 'progress' | 'motivation' | 'question' | 'achievement';
  likes: string[]; // user IDs
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// App State Types
export interface AppState {
  user: UserProfile | null;
  workouts: Workout[];
  workoutLogs: WorkoutLog[];
  measurements: BodyMeasurement[];
  progressPhotos: ProgressPhoto[];
  nutrition: DailyNutrition[];
  streaks: Streak[];
  achievements: UserAchievement[];
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  notificationSettings: NotificationSettings;
  isLoading: boolean;
  error: string | null;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  WorkoutDetail: { workoutId: string };
  ExerciseDetail: { exerciseId: string };
  ProgressPhotos: undefined;
  MealDetail: { mealId: string };
  Journal: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Nutrition: undefined;
  Wellness: undefined;
};