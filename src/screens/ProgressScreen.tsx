import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { Card, ProgressCard, StatsCard } from '../components/common/Card';
import { GradientButton, PrimaryButton } from '../components/common/Button';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

interface ProgressData {
  weight: number[];
  workouts: number[];
  measurements: {
    waist: number;
    hips: number;
    arms: number;
  };
  weeklyStats: {
    workoutsCompleted: number;
    totalMinutes: number;
    caloriesBurned: number;
    averageMood: number;
  };
}

const sampleProgressData: ProgressData = {
  weight: [68.5, 68.2, 67.8, 67.5, 67.2, 66.9, 66.7],
  workouts: [2, 3, 4, 3, 5, 4, 6],
  measurements: {
    waist: 75,
    hips: 95,
    arms: 28,
  },
  weeklyStats: {
    workoutsCompleted: 6,
    totalMinutes: 180,
    caloriesBurned: 1240,
    averageMood: 4.2,
  },
};

export const ProgressScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | '3months'>('week');
  const [activeTab, setActiveTab] = useState<'overview' | 'body' | 'workouts' | 'mood'>('overview');

  const getMotivationalInsight = () => {
    const insights = [
      "You've lost 1.8kg this month! Your dedication is paying off beautifully. 🌟",
      "6 workouts this week - you're absolutely crushing your goals! 💪",
      "Your consistency is incredible. You've worked out 85% of planned days! ✨",
      "Your mood has improved 15% since starting. Fitness truly is self-care! 😊",
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const weightChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: sampleProgressData.weight,
        color: (opacity = 1) => colors.primary,
        strokeWidth: 3,
      },
    ],
  };

  const workoutChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: sampleProgressData.workouts,
        color: (opacity = 1) => colors.success,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 2,
    barPercentage: 0.7,
    decimalPlaces: 1,
    style: {
      borderRadius: 12,
    },
    propsForLabels: {
      fontSize: 12,
      fontFamily: typography.body2.fontFamily,
    },
  };

  const renderOverviewTab = () => (
    <>
      {/* Weekly Summary */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>This Week's Wins! 🎉</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{sampleProgressData.weeklyStats.workoutsCompleted}</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{sampleProgressData.weeklyStats.totalMinutes}</Text>
            <Text style={styles.summaryLabel}>Minutes</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{sampleProgressData.weeklyStats.caloriesBurned}</Text>
            <Text style={styles.summaryLabel}>Calories</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{sampleProgressData.weeklyStats.averageMood.toFixed(1)}</Text>
            <Text style={styles.summaryLabel}>Avg Mood</Text>
          </View>
        </View>
      </Card>

      {/* Motivational Insight */}
      <ProgressCard style={styles.insightCard}>
        <Text style={styles.insightTitle}>Your Progress Story ✨</Text>
        <Text style={styles.insightText}>{getMotivationalInsight()}</Text>
      </ProgressCard>

      {/* Weight Progress Chart */}
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Weight Progress</Text>
        <Text style={styles.chartSubtitle}>You're on an amazing journey! 📈</Text>
        <LineChart
          data={weightChartData}
          width={chartWidth - 32}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.chartNote}>
          -1.8kg this month • You're doing incredible! 💪
        </Text>
      </Card>

      {/* Workout Frequency */}
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Workout Consistency</Text>
        <Text style={styles.chartSubtitle}>Look at that beautiful consistency! 🔥</Text>
        <BarChart
          data={workoutChartData}
          width={chartWidth - 32}
          height={200}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => colors.success,
          }}
          style={styles.chart}
        />
        <Text style={styles.chartNote}>
          6 workouts this week • You're unstoppable! ⚡
        </Text>
      </Card>
    </>
  );

  const renderBodyTab = () => (
    <>
      {/* Body Measurements */}
      <Card style={styles.measurementsCard}>
        <Text style={styles.measurementsTitle}>Body Measurements 📏</Text>
        <Text style={styles.measurementsSubtitle}>
          Every measurement tells a story of your strength
        </Text>
        
        <View style={styles.measurementsList}>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Waist</Text>
            <Text style={styles.measurementValue}>{sampleProgressData.measurements.waist}cm</Text>
            <Text style={styles.measurementChange}>-2cm this month</Text>
          </View>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Hips</Text>
            <Text style={styles.measurementValue}>{sampleProgressData.measurements.hips}cm</Text>
            <Text style={styles.measurementChange}>-1.5cm this month</Text>
          </View>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Arms</Text>
            <Text style={styles.measurementValue}>{sampleProgressData.measurements.arms}cm</Text>
            <Text style={styles.measurementChange}>+0.5cm this month</Text>
          </View>
        </View>

        <GradientButton
          title="Update Measurements"
          onPress={() => {}}
          style={styles.updateButton}
        />
      </Card>

      {/* Progress Photos */}
      <Card style={styles.photosCard}>
        <Text style={styles.photosTitle}>Progress Photos 📸</Text>
        <Text style={styles.photosSubtitle}>
          Capture your transformation journey
        </Text>
        
        <View style={styles.photoGrid}>
          <TouchableOpacity style={styles.photoSlot}>
            <Text style={styles.photoEmoji}>📷</Text>
            <Text style={styles.photoLabel}>Front</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoSlot}>
            <Text style={styles.photoEmoji}>📷</Text>
            <Text style={styles.photoLabel}>Side</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoSlot}>
            <Text style={styles.photoEmoji}>📷</Text>
            <Text style={styles.photoLabel}>Back</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Add Progress Photo"
          onPress={() => {}}
          variant="outline"
          style={styles.addPhotoButton}
        />
      </Card>
    </>
  );

  const renderWorkoutsTab = () => (
    <>
      {/* Workout Stats */}
      <View style={styles.statsGrid}>
        <StatsCard style={styles.statCard}>
          <Text style={styles.statEmoji}>🏋️‍♀️</Text>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </StatsCard>
        <StatsCard style={styles.statCard}>
          <Text style={styles.statEmoji}>⏱️</Text>
          <Text style={styles.statNumber}>720</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </StatsCard>
        <StatsCard style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>4,850</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </StatsCard>
        <StatsCard style={styles.statCard}>
          <Text style={styles.statEmoji}>💪</Text>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Strength Gains</Text>
        </StatsCard>
      </View>

      {/* Favorite Workouts */}
      <Card style={styles.favoritesCard}>
        <Text style={styles.favoritesTitle}>Your Favorite Workouts 💖</Text>
        <View style={styles.favoritesList}>
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteName}>Upper Body Strength</Text>
            <Text style={styles.favoriteCount}>8 times</Text>
          </View>
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteName}>Core & Cardio Blast</Text>
            <Text style={styles.favoriteCount}>6 times</Text>
          </View>
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteName}>Lower Body Power</Text>
            <Text style={styles.favoriteCount}>5 times</Text>
          </View>
        </View>
      </Card>
    </>
  );

  const renderMoodTab = () => (
    <>
      {/* Mood Overview */}
      <ProgressCard style={styles.moodCard}>
        <Text style={styles.moodTitle}>Mood & Energy Tracking 😊</Text>
        <Text style={styles.moodSubtitle}>
          See how fitness boosts your mental wellbeing
        </Text>
        
        <View style={styles.moodStats}>
          <View style={styles.moodStat}>
            <Text style={styles.moodStatNumber}>4.2</Text>
            <Text style={styles.moodStatLabel}>Average Mood</Text>
          </View>
          <View style={styles.moodStat}>
            <Text style={styles.moodStatNumber}>4.5</Text>
            <Text style={styles.moodStatLabel}>Energy Level</Text>
          </View>
          <View style={styles.moodStat}>
            <Text style={styles.moodStatNumber}>15%</Text>
            <Text style={styles.moodStatLabel}>Improvement</Text>
          </View>
        </View>
      </ProgressCard>

      {/* Mood Insights */}
      <Card style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Wellness Insights 💡</Text>
        <View style={styles.insightsList}>
          <Text style={styles.insightItem}>
            • Your mood is highest after morning workouts
          </Text>
          <Text style={styles.insightItem}>
            • Strength training days boost your confidence most
          </Text>
          <Text style={styles.insightItem}>
            • You feel most energized on workout days
          </Text>
          <Text style={styles.insightItem}>
            • Your sleep quality improves on active days
          </Text>
        </View>
      </Card>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>
            Celebrating every step of your amazing journey
          </Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', '3months'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period as any)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {period === '3months' ? '3 Months' : period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          {[
            { key: 'overview', label: 'Overview', emoji: '📊' },
            { key: 'body', label: 'Body', emoji: '📏' },
            { key: 'workouts', label: 'Workouts', emoji: '💪' },
            { key: 'mood', label: 'Mood', emoji: '😊' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.tabActive
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'body' && renderBodyTab()}
          {activeTab === 'workouts' && renderWorkoutsTab()}
          {activeTab === 'mood' && renderMoodTab()}
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
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  periodTextActive: {
    color: colors.textOnPrimary,
  },
  tabNavigation: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderLight,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  summaryCard: {
    marginBottom: 20,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    ...typography.statNumber,
    color: colors.primary,
    fontSize: 24,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  insightCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  insightTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  insightText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  chartCard: {
    marginBottom: 20,
  },
  chartTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  chartSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
  chartNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  measurementsCard: {
    marginBottom: 20,
  },
  measurementsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  measurementsSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  measurementsList: {
    marginBottom: 20,
  },
  measurementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  measurementLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    flex: 1,
  },
  measurementValue: {
    ...typography.metric,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  measurementChange: {
    ...typography.caption,
    color: colors.success,
    flex: 1,
    textAlign: 'right',
  },
  updateButton: {
    marginTop: 8,
  },
  photosCard: {
    marginBottom: 20,
  },
  photosTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  photosSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  photoSlot: {
    width: 80,
    height: 100,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  photoEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  photoLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  addPhotoButton: {
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 56) / 2,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    ...typography.statNumber,
    color: colors.primary,
    fontSize: 24,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  favoritesCard: {
    marginBottom: 20,
  },
  favoritesTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  favoritesList: {
    gap: 12,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  favoriteName: {
    ...typography.body1,
    color: colors.textPrimary,
  },
  favoriteCount: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  moodCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  moodTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  moodSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  moodStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  moodStat: {
    alignItems: 'center',
  },
  moodStatNumber: {
    ...typography.statNumber,
    color: colors.primary,
    fontSize: 24,
  },
  moodStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  insightsCard: {
    marginBottom: 20,
  },
  insightsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});