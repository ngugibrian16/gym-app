import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { colors, getMoodColor } from '../constants/colors';
import { typography } from '../constants/typography';
import { Card, ProgressCard, StatsCard } from '../components/common/Card';
import { GradientButton, PrimaryButton, OutlineButton } from '../components/common/Button';
import { MoodRating } from '../types';

interface WellnessData {
  todaysMood: MoodRating;
  energy: MoodRating;
  motivation: MoodRating;
  weeklyMoodAverage: number;
  journalStreak: number;
  meditationMinutes: number;
  sleepHours: number;
}

const wellnessData: WellnessData = {
  todaysMood: 4,
  energy: 4,
  motivation: 5,
  weeklyMoodAverage: 4.2,
  journalStreak: 5,
  meditationMinutes: 15,
  sleepHours: 7.5,
};

const journalPrompts = [
  "What made you feel strong today?",
  "Describe a moment when you felt proud of your body.",
  "What are three things you're grateful for right now?",
  "How did your workout make you feel emotionally?",
  "What would you tell your past self about this journey?",
  "What positive changes have you noticed in yourself?",
  "How do you want to feel after your next workout?",
  "What does self-care mean to you today?",
];

const affirmations = [
  "I am becoming stronger every day, inside and out.",
  "My body is capable of amazing things.",
  "I choose to nourish my body with love and respect.",
  "Every step I take is progress worth celebrating.",
  "I am worthy of feeling confident and powerful.",
  "My wellness journey is unique and beautiful.",
  "I trust my body's wisdom and strength.",
  "I deserve to feel energized and vibrant.",
];

export const WellnessScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodRating>(wellnessData.todaysMood);
  const [selectedEnergy, setSelectedEnergy] = useState<MoodRating>(wellnessData.energy);
  const [selectedMotivation, setSelectedMotivation] = useState<MoodRating>(wellnessData.motivation);
  const [journalEntry, setJournalEntry] = useState('');
  const [currentPrompt] = useState(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);
  const [currentAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);

  const getMoodEmoji = (mood: MoodRating): string => {
    const emojis = ['😔', '😐', '🙂', '😊', '🤩'];
    return emojis[mood - 1];
  };

  const getMoodLabel = (mood: MoodRating): string => {
    const labels = ['Low', 'Okay', 'Good', 'Great', 'Amazing'];
    return labels[mood - 1];
  };

  const getWellnessInsight = () => {
    const insights = [
      "Your mood tends to be highest after morning workouts. Consider scheduling more AM sessions! ☀️",
      "You've journaled 5 days in a row! This consistency is building emotional strength. 📝",
      "Your energy levels have improved 20% since starting your fitness journey. Keep going! ⚡",
      "Taking time for wellness is an act of self-love. You're investing in your best self. 💖",
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const renderMoodSelector = (
    title: string,
    value: MoodRating,
    onChange: (mood: MoodRating) => void
  ) => (
    <View style={styles.moodSelector}>
      <Text style={styles.moodSelectorTitle}>{title}</Text>
      <View style={styles.moodOptions}>
        {[1, 2, 3, 4, 5].map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodOption,
              value === mood && styles.moodOptionActive,
              { borderColor: getMoodColor(mood) }
            ]}
            onPress={() => onChange(mood as MoodRating)}
          >
            <Text style={styles.moodEmoji}>{getMoodEmoji(mood as MoodRating)}</Text>
            <Text style={[
              styles.moodLabel,
              value === mood && { color: getMoodColor(mood) }
            ]}>
              {getMoodLabel(mood as MoodRating)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Wellness</Text>
          <Text style={styles.subtitle}>
            Nurture your mind, body, and soul with gentle care
          </Text>
        </View>

        {/* Daily Affirmation */}
        <ProgressCard style={styles.affirmationCard}>
          <Text style={styles.affirmationTitle}>Today's Affirmation ✨</Text>
          <Text style={styles.affirmationText}>"{currentAffirmation}"</Text>
          <Text style={styles.affirmationNote}>
            Take a deep breath and let this truth fill your heart
          </Text>
        </ProgressCard>

        {/* Wellness Overview */}
        <View style={styles.statsRow}>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>😊</Text>
            <Text style={styles.statNumber}>{wellnessData.weeklyMoodAverage.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </StatsCard>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>📝</Text>
            <Text style={styles.statNumber}>{wellnessData.journalStreak}</Text>
            <Text style={styles.statLabel}>Journal Streak</Text>
          </StatsCard>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>🧘‍♀️</Text>
            <Text style={styles.statNumber}>{wellnessData.meditationMinutes}</Text>
            <Text style={styles.statLabel}>Mindful Min</Text>
          </StatsCard>
        </View>

        {/* Mood Check-In */}
        <Card style={styles.moodCard}>
          <Text style={styles.moodCardTitle}>How are you feeling today? 💭</Text>
          <Text style={styles.moodCardSubtitle}>
            Your emotions are valid and important. Let's check in together.
          </Text>

          {renderMoodSelector('Mood', selectedMood, setSelectedMood)}
          {renderMoodSelector('Energy', selectedEnergy, setSelectedEnergy)}
          {renderMoodSelector('Motivation', selectedMotivation, setSelectedMotivation)}

          <GradientButton
            title="Save Check-In"
            onPress={() => {}}
            style={styles.saveButton}
          />
        </Card>

        {/* Wellness Insight */}
        <Card style={styles.insightCard}>
          <Text style={styles.insightTitle}>Your Wellness Journey 🌱</Text>
          <Text style={styles.insightText}>{getWellnessInsight()}</Text>
        </Card>

        {/* Journal Section */}
        <Card style={styles.journalCard}>
          <Text style={styles.journalTitle}>Mindful Journaling 📖</Text>
          <Text style={styles.journalPrompt}>Today's Prompt:</Text>
          <Text style={styles.journalPromptText}>"{currentPrompt}"</Text>
          
          <TextInput
            style={styles.journalInput}
            placeholder="Share your thoughts here... There's no wrong answer. 💭"
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={4}
            value={journalEntry}
            onChangeText={setJournalEntry}
            textAlignVertical="top"
          />

          <View style={styles.journalActions}>
            <OutlineButton
              title="Skip Today"
              onPress={() => {}}
              size="small"
              style={styles.journalButton}
            />
            <PrimaryButton
              title="Save Entry"
              onPress={() => {}}
              size="small"
              style={styles.journalButton}
            />
          </View>
        </Card>

        {/* Mindfulness Activities */}
        <Card style={styles.mindfulnessCard}>
          <Text style={styles.mindfulnessTitle}>Mindful Moments 🧘‍♀️</Text>
          <Text style={styles.mindfulnessSubtitle}>
            Take a few minutes to center yourself
          </Text>

          <View style={styles.activitiesList}>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityEmoji}>🌬️</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>Breathing Exercise</Text>
                <Text style={styles.activityDuration}>5 minutes</Text>
              </View>
              <Text style={styles.activityArrow}>▶️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityEmoji}>🧘‍♀️</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>Body Scan Meditation</Text>
                <Text style={styles.activityDuration}>10 minutes</Text>
              </View>
              <Text style={styles.activityArrow}>▶️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityEmoji}>🙏</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>Gratitude Practice</Text>
                <Text style={styles.activityDuration}>3 minutes</Text>
              </View>
              <Text style={styles.activityArrow}>▶️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityEmoji}>🌙</Text>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>Evening Wind Down</Text>
                <Text style={styles.activityDuration}>15 minutes</Text>
              </View>
              <Text style={styles.activityArrow}>▶️</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Sleep & Recovery */}
        <Card style={styles.sleepCard}>
          <Text style={styles.sleepTitle}>Rest & Recovery 😴</Text>
          <Text style={styles.sleepSubtitle}>
            Quality sleep is essential for your wellness journey
          </Text>

          <View style={styles.sleepStats}>
            <View style={styles.sleepStat}>
              <Text style={styles.sleepStatNumber}>{wellnessData.sleepHours}</Text>
              <Text style={styles.sleepStatLabel}>Hours Last Night</Text>
            </View>
            <View style={styles.sleepStat}>
              <Text style={styles.sleepStatNumber}>85%</Text>
              <Text style={styles.sleepStatLabel}>Sleep Quality</Text>
            </View>
          </View>

          <View style={styles.sleepActions}>
            <OutlineButton
              title="Log Sleep"
              onPress={() => {}}
              size="small"
              style={styles.sleepButton}
            />
            <PrimaryButton
              title="Sleep Tips"
              onPress={() => {}}
              size="small"
              style={styles.sleepButton}
            />
          </View>
        </Card>

        {/* Wellness Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Wellness Wisdom 💡</Text>
          <Text style={styles.tipsText}>
            Remember: Your mental health is just as important as your physical health. 
            Be patient and kind with yourself as you grow. Every small step toward wellness 
            is a victory worth celebrating. You're doing better than you think! 🌟
          </Text>
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
  affirmationCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  affirmationTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  affirmationText: {
    ...typography.quote,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  affirmationNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    ...typography.metric,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  moodCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  moodCardTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  moodCardSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  moodSelector: {
    marginBottom: 20,
  },
  moodSelectorTitle: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
    flex: 1,
    marginHorizontal: 2,
  },
  moodOptionActive: {
    backgroundColor: colors.primaryLight,
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  moodLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 8,
  },
  insightCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  insightTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  insightText: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  journalCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  journalTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  journalPrompt: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  journalPromptText: {
    ...typography.body1,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 22,
  },
  journalInput: {
    ...typography.body1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    minHeight: 100,
    marginBottom: 16,
  },
  journalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  journalButton: {
    flex: 1,
  },
  mindfulnessCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  mindfulnessTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  mindfulnessSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 12,
  },
  activityEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDuration: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  activityArrow: {
    fontSize: 16,
    color: colors.primary,
  },
  sleepCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sleepTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sleepSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  sleepStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sleepStat: {
    alignItems: 'center',
  },
  sleepStatNumber: {
    ...typography.statNumber,
    color: colors.primary,
    fontSize: 24,
  },
  sleepStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sleepActions: {
    flexDirection: 'row',
    gap: 12,
  },
  sleepButton: {
    flex: 1,
  },
  tipsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  tipsText: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 20,
  },
});