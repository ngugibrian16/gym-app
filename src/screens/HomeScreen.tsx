import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { Card, ProgressCard, StatsCard, MotivationalCard } from '../components/common/Card';
import { GradientButton, PrimaryButton } from '../components/common/Button';

const { width } = Dimensions.get('window');

interface DailyStats {
  workoutStreak: number;
  todaysWorkout: boolean;
  waterIntake: number;
  waterGoal: number;
  caloriesGoal: number;
  caloriesConsumed: number;
  mood: number;
}

export const HomeScreen: React.FC = () => {
  const [userName] = useState('Sarah'); // This would come from user context
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    workoutStreak: 7,
    todaysWorkout: false,
    waterIntake: 1200,
    waterGoal: 2000,
    caloriesGoal: 1800,
    caloriesConsumed: 1200,
    mood: 4,
  });

  const [motivationalQuote] = useState({
    text: "Every workout brings you closer to your strongest self",
    author: "FitBlossom",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    if (!dailyStats.todaysWorkout) {
      return "Ready to crush today's workout? Your body is waiting! 💪";
    }
    return "Amazing! You've already worked out today. Keep that momentum going! ✨";
  };

  const waterPercentage = (dailyStats.waterIntake / dailyStats.waterGoal) * 100;
  const caloriesPercentage = (dailyStats.caloriesConsumed / dailyStats.caloriesGoal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {userName}! ☀️</Text>
            <Text style={styles.date}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileInitial}>{userName[0]}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Motivational Quote Card */}
        <MotivationalCard style={styles.quoteCard}>
          <Text style={styles.quote}>"{motivationalQuote.text}"</Text>
          <Text style={styles.quoteAuthor}>- {motivationalQuote.author}</Text>
        </MotivationalCard>

        {/* Streak & Motivation */}
        <View style={styles.streakSection}>
          <ProgressCard style={styles.streakCard}>
            <View style={styles.streakContent}>
              <Text style={styles.streakNumber}>{dailyStats.workoutStreak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
              <Text style={styles.streakEmoji}>🔥</Text>
            </View>
          </ProgressCard>
          
          <Card style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              {getMotivationalMessage()}
            </Text>
          </Card>
        </View>

        {/* Today's Action */}
        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Today's Workout</Text>
          {!dailyStats.todaysWorkout ? (
            <>
              <Text style={styles.actionDescription}>
                Upper Body Strength • 30 min
              </Text>
              <GradientButton
                title="Start Workout"
                onPress={() => {}}
                size="large"
                style={styles.actionButton}
              />
            </>
          ) : (
            <>
              <Text style={styles.completedText}>✅ Workout Complete!</Text>
              <Text style={styles.completedDescription}>
                Great job! You burned 280 calories today.
              </Text>
              <PrimaryButton
                title="View Progress"
                onPress={() => {}}
                variant="outline"
                style={styles.actionButton}
              />
            </>
          )}
        </Card>

        {/* Daily Progress */}
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressGrid}>
          {/* Water Intake */}
          <StatsCard style={styles.progressCard}>
            <Text style={styles.progressEmoji}>💧</Text>
            <Text style={styles.progressValue}>
              {dailyStats.waterIntake}ml
            </Text>
            <Text style={styles.progressLabel}>Water</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(waterPercentage, 100)}%`,
                    backgroundColor: colors.primary 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressTarget}>
              Goal: {dailyStats.waterGoal}ml
            </Text>
          </StatsCard>

          {/* Nutrition */}
          <StatsCard style={styles.progressCard}>
            <Text style={styles.progressEmoji}>🥗</Text>
            <Text style={styles.progressValue}>
              {dailyStats.caloriesConsumed}
            </Text>
            <Text style={styles.progressLabel}>Calories</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(caloriesPercentage, 100)}%`,
                    backgroundColor: colors.success 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressTarget}>
              Goal: {dailyStats.caloriesGoal}
            </Text>
          </StatsCard>
        </View>

        {/* Mood Check */}
        <Card style={styles.moodCard}>
          <Text style={styles.moodTitle}>How are you feeling today?</Text>
          <View style={styles.moodButtons}>
            {[1, 2, 3, 4, 5].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  dailyStats.mood === mood && styles.moodButtonActive
                ]}
                onPress={() => setDailyStats(prev => ({ ...prev, mood }))}
              >
                <Text style={styles.moodEmoji}>
                  {mood === 1 ? '😔' : mood === 2 ? '😐' : mood === 3 ? '🙂' : mood === 4 ? '😊' : '🤩'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionEmoji}>📊</Text>
            <Text style={styles.quickActionText}>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionEmoji}>🍎</Text>
            <Text style={styles.quickActionText}>Nutrition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionEmoji}>📝</Text>
            <Text style={styles.quickActionText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionEmoji}>⚙️</Text>
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
        </View>

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
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...typography.h3,
    color: colors.textOnPrimary,
    marginBottom: 4,
  },
  date: {
    ...typography.body2,
    color: colors.textOnPrimary,
    opacity: 0.9,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.textOnPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    ...typography.h4,
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quoteCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  quote: {
    ...typography.quote,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  streakSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  streakCard: {
    flex: 1,
    alignItems: 'center',
  },
  streakContent: {
    alignItems: 'center',
  },
  streakNumber: {
    ...typography.statNumber,
    color: colors.primary,
  },
  streakLabel: {
    ...typography.statLabel,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  streakEmoji: {
    fontSize: 24,
  },
  motivationCard: {
    flex: 2,
    justifyContent: 'center',
  },
  motivationText: {
    ...typography.body1,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionCard: {
    marginBottom: 24,
  },
  actionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  actionDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  actionButton: {
    marginTop: 8,
  },
  completedText: {
    ...typography.h5,
    color: colors.success,
    marginBottom: 4,
  },
  completedDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  progressCard: {
    flex: 1,
    alignItems: 'center',
  },
  progressEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  progressValue: {
    ...typography.metric,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressTarget: {
    ...typography.caption,
    color: colors.textLight,
    fontSize: 10,
  },
  moodCard: {
    marginBottom: 24,
  },
  moodTitle: {
    ...typography.h5,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  moodEmoji: {
    fontSize: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
  },
  quickActionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  bottomSpacing: {
    height: 20,
  },
});