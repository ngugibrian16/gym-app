import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { WorkoutCard, Card } from '../components/common/Card';
import { GradientButton, PrimaryButton, OutlineButton } from '../components/common/Button';
import { Workout, FitnessGoal } from '../types';

const sampleWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Beginner Full Body',
    description: 'Perfect for your first week! Build confidence with basic movements.',
    duration: 25,
    difficulty: 'easy',
    targetMuscles: ['Full Body'],
    exercises: [],
    caloriesBurned: 150,
  },
  {
    id: '2',
    name: 'Upper Body Strength',
    description: 'Tone your arms and build beautiful shoulder definition.',
    duration: 30,
    difficulty: 'easy',
    targetMuscles: ['Arms', 'Shoulders', 'Chest'],
    exercises: [],
    caloriesBurned: 180,
  },
  {
    id: '3',
    name: 'Lower Body Power',
    description: 'Sculpt strong, gorgeous legs and glutes that make you feel unstoppable.',
    duration: 35,
    difficulty: 'medium',
    targetMuscles: ['Glutes', 'Quadriceps', 'Hamstrings'],
    exercises: [],
    caloriesBurned: 220,
  },
  {
    id: '4',
    name: 'Core & Cardio Blast',
    description: 'Get your heart pumping while building a strong, confident core.',
    duration: 20,
    difficulty: 'easy',
    targetMuscles: ['Core', 'Cardio'],
    exercises: [],
    caloriesBurned: 160,
  },
  {
    id: '5',
    name: 'Flexibility & Recovery',
    description: 'Gentle stretches to help you feel amazing and prevent soreness.',
    duration: 15,
    difficulty: 'easy',
    targetMuscles: ['Full Body'],
    exercises: [],
    caloriesBurned: 80,
  },
];

const fitnessGoals: { key: FitnessGoal; label: string; emoji: string }[] = [
  { key: 'weight_loss', label: 'Weight Loss', emoji: '🔥' },
  { key: 'toning', label: 'Toning', emoji: '💪' },
  { key: 'muscle_gain', label: 'Muscle Gain', emoji: '🏋️‍♀️' },
  { key: 'strength', label: 'Strength', emoji: '⚡' },
  { key: 'general_fitness', label: 'General Fitness', emoji: '✨' },
];

export const WorkoutsScreen: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>('toning');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return colors.success;
      case 'medium': return colors.warning;
      case 'hard': return colors.error;
    }
  };

  const getMotivationalMessage = () => {
    const messages = [
      "You're stronger than you think! Every rep builds the confident, powerful you. 💪",
      "Each workout is a step toward the best version of yourself. You've got this! ✨",
      "Your body is capable of amazing things. Trust yourself and push forward! 🌟",
      "Every strong woman started with a single workout. Today is your day! 🔥",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const filteredWorkouts = sampleWorkouts.filter(workout => {
    if (selectedDifficulty !== 'all' && workout.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const renderWorkoutCard = ({ item }: { item: Workout }) => (
    <WorkoutCard 
      style={styles.workoutCard}
      onPress={() => {}}
    >
      <View style={styles.workoutHeader}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDescription}>{item.description}</Text>
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(item.difficulty) }
        ]}>
          <Text style={styles.difficultyText}>
            {item.difficulty.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.duration}</Text>
          <Text style={styles.statLabel}>min</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.caloriesBurned}</Text>
          <Text style={styles.statLabel}>cal</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.targetMuscles.length}</Text>
          <Text style={styles.statLabel}>muscles</Text>
        </View>
      </View>

      <View style={styles.workoutActions}>
        <OutlineButton
          title="Preview"
          onPress={() => {}}
          size="small"
          style={styles.previewButton}
        />
        <GradientButton
          title="Start Workout"
          onPress={() => {}}
          size="small"
          style={styles.startButton}
        />
      </View>
    </WorkoutCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Workouts</Text>
          <Text style={styles.subtitle}>
            Choose workouts that make you feel strong and confident
          </Text>
        </View>

        {/* Motivational Message */}
        <Card style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            {getMotivationalMessage()}
          </Text>
        </Card>

        {/* Fitness Goals Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>What's your focus today?</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.goalsScroll}
          >
            {fitnessGoals.map((goal) => (
              <TouchableOpacity
                key={goal.key}
                style={[
                  styles.goalChip,
                  selectedGoal === goal.key && styles.goalChipActive
                ]}
                onPress={() => setSelectedGoal(goal.key)}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <Text style={[
                  styles.goalLabel,
                  selectedGoal === goal.key && styles.goalLabelActive
                ]}>
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Difficulty Level</Text>
          <View style={styles.difficultyFilters}>
            {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyFilter,
                  selectedDifficulty === difficulty && styles.difficultyFilterActive
                ]}
                onPress={() => setSelectedDifficulty(difficulty as any)}
              >
                <Text style={[
                  styles.difficultyFilterText,
                  selectedDifficulty === difficulty && styles.difficultyFilterTextActive
                ]}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Start Section */}
        <Card style={styles.quickStartCard}>
          <Text style={styles.quickStartTitle}>Ready for a Quick Win? 🎯</Text>
          <Text style={styles.quickStartDescription}>
            Start with a 10-minute confidence booster
          </Text>
          <PrimaryButton
            title="10-Min Energy Boost"
            onPress={() => {}}
            size="large"
            style={styles.quickStartButton}
          />
        </Card>

        {/* Workouts List */}
        <View style={styles.workoutsSection}>
          <Text style={styles.sectionTitle}>
            Recommended for You ({filteredWorkouts.length})
          </Text>
          <FlatList
            data={filteredWorkouts}
            renderItem={renderWorkoutCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Progress Encouragement */}
        <Card style={styles.encouragementCard}>
          <Text style={styles.encouragementTitle}>You're Building Something Amazing! 🌟</Text>
          <Text style={styles.encouragementText}>
            Every workout is an investment in your strength, confidence, and wellbeing. 
            You're not just changing your body - you're transforming your entire life.
          </Text>
          <View style={styles.encouragementStats}>
            <View style={styles.encouragementStat}>
              <Text style={styles.encouragementNumber}>7</Text>
              <Text style={styles.encouragementLabel}>Day Streak</Text>
            </View>
            <View style={styles.encouragementStat}>
              <Text style={styles.encouragementNumber}>12</Text>
              <Text style={styles.encouragementLabel}>Workouts Done</Text>
            </View>
            <View style={styles.encouragementStat}>
              <Text style={styles.encouragementNumber}>1,680</Text>
              <Text style={styles.encouragementLabel}>Calories Burned</Text>
            </View>
          </View>
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  motivationText: {
    ...typography.quote,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  goalsScroll: {
    paddingLeft: 20,
  },
  goalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  goalChipActive: {
    backgroundColor: colors.primaryLight,
  },
  goalEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  goalLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  goalLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  difficultyFilters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  difficultyFilter: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  difficultyFilterActive: {
    backgroundColor: colors.primary,
  },
  difficultyFilterText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  difficultyFilterTextActive: {
    color: colors.textOnPrimary,
  },
  quickStartCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  quickStartTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  quickStartDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  quickStartButton: {
    width: '100%',
  },
  workoutsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  workoutCard: {
    marginBottom: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutName: {
    ...typography.workoutTitle,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  workoutDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    ...typography.caption,
    color: colors.textOnPrimary,
    fontWeight: '600',
    fontSize: 10,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.metric,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  workoutActions: {
    flexDirection: 'row',
    gap: 12,
  },
  previewButton: {
    flex: 1,
  },
  startButton: {
    flex: 2,
  },
  encouragementCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  encouragementTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  encouragementText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  encouragementStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  encouragementStat: {
    alignItems: 'center',
  },
  encouragementNumber: {
    ...typography.statNumber,
    color: colors.primary,
    fontSize: 24,
  },
  encouragementLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bottomSpacing: {
    height: 20,
  },
});