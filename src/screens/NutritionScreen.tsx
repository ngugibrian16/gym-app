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
import { Card, ProgressCard, StatsCard } from '../components/common/Card';
import { GradientButton, PrimaryButton, OutlineButton } from '../components/common/Button';
import { Meal } from '../types';

const sampleMeals: Meal[] = [
  {
    id: '1',
    name: 'Power Smoothie Bowl',
    type: 'breakfast',
    calories: 320,
    protein: 15,
    carbs: 45,
    fat: 12,
    ingredients: ['Banana', 'Berries', 'Greek yogurt', 'Oats', 'Almond butter'],
    instructions: ['Blend ingredients', 'Top with granola', 'Enjoy mindfully'],
    prepTime: 10,
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Quinoa Buddha Bowl',
    type: 'lunch',
    calories: 450,
    protein: 18,
    carbs: 55,
    fat: 16,
    ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Sweet potato', 'Spinach'],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Assemble bowl'],
    prepTime: 25,
  },
  {
    id: '3',
    name: 'Grilled Salmon & Veggies',
    type: 'dinner',
    calories: 380,
    protein: 32,
    carbs: 20,
    fat: 18,
    ingredients: ['Salmon fillet', 'Broccoli', 'Sweet potato', 'Olive oil'],
    instructions: ['Season salmon', 'Grill with vegetables', 'Serve hot'],
    prepTime: 20,
  },
];

interface NutritionStats {
  caloriesGoal: number;
  caloriesConsumed: number;
  proteinGoal: number;
  proteinConsumed: number;
  waterGoal: number;
  waterConsumed: number;
  mealsLogged: number;
}

const dailyStats: NutritionStats = {
  caloriesGoal: 1800,
  caloriesConsumed: 1320,
  proteinGoal: 120,
  proteinConsumed: 85,
  waterGoal: 2000,
  waterConsumed: 1400,
  mealsLogged: 2,
};

export const NutritionScreen: React.FC = () => {
  const [selectedMealType, setSelectedMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [waterGlasses, setWaterGlasses] = useState(7); // 200ml per glass

  const getMotivationalMessage = () => {
    const messages = [
      "Nourish your body like the temple it is. You deserve the best fuel! 🌟",
      "Every healthy choice is an act of self-love. You're doing amazing! 💖",
      "Food is medicine, energy, and joy. Choose what makes you feel powerful! ⚡",
      "Your body will thank you for every nutritious bite. Keep shining! ✨",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const caloriePercentage = (dailyStats.caloriesConsumed / dailyStats.caloriesGoal) * 100;
  const proteinPercentage = (dailyStats.proteinConsumed / dailyStats.proteinGoal) * 100;
  const waterPercentage = (dailyStats.waterConsumed / dailyStats.waterGoal) * 100;

  const filteredMeals = selectedMealType === 'all' 
    ? sampleMeals 
    : sampleMeals.filter(meal => meal.type === selectedMealType);

  const renderMealCard = ({ item }: { item: Meal }) => (
    <Card style={styles.mealCard} onPress={() => {}}>
      <View style={styles.mealHeader}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealType}>{item.type.toUpperCase()}</Text>
        </View>
        <View style={styles.mealCalories}>
          <Text style={styles.calorieNumber}>{item.calories}</Text>
          <Text style={styles.calorieLabel}>cal</Text>
        </View>
      </View>

      <View style={styles.macroGrid}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{item.prepTime}min</Text>
          <Text style={styles.macroLabel}>Prep</Text>
        </View>
      </View>

      <View style={styles.mealActions}>
        <OutlineButton
          title="View Recipe"
          onPress={() => {}}
          size="small"
          style={styles.viewButton}
        />
        <PrimaryButton
          title="Log Meal"
          onPress={() => {}}
          size="small"
          style={styles.logButton}
        />
      </View>
    </Card>
  );

  const addWaterGlass = () => {
    setWaterGlasses(prev => Math.min(prev + 1, 10));
  };

  const removeWaterGlass = () => {
    setWaterGlasses(prev => Math.max(prev - 1, 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>
            Fuel your body with love and intention
          </Text>
        </View>

        {/* Motivational Message */}
        <ProgressCard style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            {getMotivationalMessage()}
          </Text>
        </ProgressCard>

        {/* Daily Overview */}
        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Today's Nutrition 🍎</Text>
          
          {/* Calories */}
          <View style={styles.macroProgress}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroTitle}>Calories</Text>
              <Text style={styles.macroNumbers}>
                {dailyStats.caloriesConsumed} / {dailyStats.caloriesGoal}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(caloriePercentage, 100)}%`,
                    backgroundColor: colors.primary 
                  }
                ]} 
              />
            </View>
          </View>

          {/* Protein */}
          <View style={styles.macroProgress}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroTitle}>Protein</Text>
              <Text style={styles.macroNumbers}>
                {dailyStats.proteinConsumed}g / {dailyStats.proteinGoal}g
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(proteinPercentage, 100)}%`,
                    backgroundColor: colors.success 
                  }
                ]} 
              />
            </View>
          </View>
        </Card>

        {/* Water Tracking */}
        <Card style={styles.waterCard}>
          <Text style={styles.waterTitle}>Hydration Station 💧</Text>
          <Text style={styles.waterSubtitle}>
            {dailyStats.waterConsumed}ml / {dailyStats.waterGoal}ml
          </Text>
          
          <View style={styles.waterProgress}>
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
          </View>

          <View style={styles.waterGlasses}>
            {Array.from({ length: 10 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.waterGlass,
                  i < waterGlasses && styles.waterGlassFilled
                ]}
                onPress={i < waterGlasses ? removeWaterGlass : addWaterGlass}
              >
                <Text style={styles.waterGlassText}>💧</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.waterActions}>
            <OutlineButton
              title="- Glass"
              onPress={removeWaterGlass}
              size="small"
              style={styles.waterButton}
            />
            <PrimaryButton
              title="+ Glass"
              onPress={addWaterGlass}
              size="small"
              style={styles.waterButton}
            />
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>🍽️</Text>
            <Text style={styles.statNumber}>{dailyStats.mealsLogged}</Text>
            <Text style={styles.statLabel}>Meals Logged</Text>
          </StatsCard>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{dailyStats.caloriesConsumed}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </StatsCard>
          <StatsCard style={styles.statCard}>
            <Text style={styles.statEmoji}>💪</Text>
            <Text style={styles.statNumber}>{dailyStats.proteinConsumed}g</Text>
            <Text style={styles.statLabel}>Protein</Text>
          </StatsCard>
        </View>

        {/* Meal Type Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Meal Ideas</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  selectedMealType === type && styles.filterChipActive
                ]}
                onPress={() => setSelectedMealType(type as any)}
              >
                <Text style={[
                  styles.filterText,
                  selectedMealType === type && styles.filterTextActive
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* AI Meal Suggestion */}
        <Card style={styles.aiCard}>
          <Text style={styles.aiTitle}>Smart Suggestion 🤖</Text>
          <Text style={styles.aiText}>
            Based on your goals and today's intake, try a protein-rich snack like Greek yogurt with berries!
          </Text>
          <GradientButton
            title="Get More Suggestions"
            onPress={() => {}}
            style={styles.aiButton}
          />
        </Card>

        {/* Meal Recommendations */}
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>
            Recommended Meals ({filteredMeals.length})
          </Text>
          <FlatList
            data={filteredMeals}
            renderItem={renderMealCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Nutrition Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Today's Nutrition Tip 💡</Text>
          <Text style={styles.tipsText}>
            Eating protein within 30 minutes after your workout helps your muscles recover faster and grow stronger. 
            Your body is amazing at using what you give it! 🌟
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
  motivationCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  motivationText: {
    ...typography.quote,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  overviewCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  overviewTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  macroProgress: {
    marginBottom: 16,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  macroNumbers: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  waterCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  waterTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  waterSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  waterProgress: {
    width: '100%',
    marginBottom: 20,
  },
  waterGlasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  waterGlass: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  waterGlassFilled: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  waterGlassText: {
    fontSize: 16,
  },
  waterActions: {
    flexDirection: 'row',
    gap: 12,
  },
  waterButton: {
    minWidth: 80,
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
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  filterScroll: {
    paddingLeft: 20,
  },
  filterChip: {
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: colors.primaryLight,
  },
  filterText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  aiCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  aiTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  aiText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  aiButton: {
    width: '100%',
  },
  mealsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  mealCard: {
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  mealType: {
    ...typography.overline,
    color: colors.textSecondary,
  },
  mealCalories: {
    alignItems: 'center',
  },
  calorieNumber: {
    ...typography.metric,
    color: colors.primary,
  },
  calorieLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  macroLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  mealActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
  },
  logButton: {
    flex: 1,
  },
  tipsCard: {
    marginHorizontal: 20,
    marginTop: 20,
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