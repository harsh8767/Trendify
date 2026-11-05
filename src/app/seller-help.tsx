
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';

const faqs = [
  {
    question: 'How do I add a new product?',
    answer:
      'Open Seller Products from your dashboard and tap Add Product. Enter the product name, description, category, price and available stock. Product saving will be connected when shared seller data storage is added.',
  },
  {
    question: 'How can I manage customer orders?',
    answer:
      'Open Seller Orders from your dashboard. You can review order information and update order statuses in the current demo interface.',
  },
  {
    question: 'How do I update my store profile?',
    answer:
      'Open Store Profile from Seller Settings. Profile editing is planned but is not connected to account storage yet.',
  },
  {
    question: 'Where can I view my sales?',
    answer:
      'Open Seller Analytics from your dashboard to see the demo revenue, order metrics and best-selling product information.',
  },
  {
    question: 'How do I receive low-stock alerts?',
    answer:
      'You can enable Low Stock Alerts in Seller Settings. The current switch is a local preference and does not yet send real notifications.',
  },
  {
    question: 'Can I sell products immediately after registration?',
    answer:
      'The seller registration and approval process is not connected yet. A real approval workflow will need to be implemented before sellers can be verified.',
  },
];

export default function SellerHelpScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const showSupportMessage = () => {
    Alert.alert(
      'Contact support',
      'Seller support messaging will be available when a support service is connected.'
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={17} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Help Centre</Text>
            <Text style={styles.subtitle}>
              Find answers and get seller support
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <FontAwesome name="question-circle" size={30} color="#FFFFFF" />
          </View>

          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroDescription}>
            Explore common seller questions or contact our support team.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={showSupportMessage}
          >
            <FontAwesome name="headphones" size={15} color={colors.primary} />
            <Text style={styles.heroButtonText}>Contact support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Frequently asked questions</Text>
          <Text style={styles.sectionSubtitle}>
            {faqs.length} helpful topics
          </Text>
        </View>

        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <View key={faq.question} style={styles.faqCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.questionRow}
                onPress={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
              >
                <View style={styles.questionIcon}>
                  <FontAwesome
                    name="question"
                    size={13}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.questionText}>{faq.question}</Text>

                <FontAwesome
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={12}
                  color={colors.muted}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.answerContainer}>
                  <View style={styles.answerDivider} />
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.supportCard}>
          <View style={styles.supportIcon}>
            <FontAwesome name="comments" size={21} color={colors.primary} />
          </View>

          <Text style={styles.supportTitle}>Still need help?</Text>
          <Text style={styles.supportDescription}>
            Our seller support service will help you with account and store
            questions once it is connected.
          </Text>

          <TouchableOpacity
            style={styles.supportButton}
            onPress={showSupportMessage}
          >
            <Text style={styles.supportButtonText}>Get support</Text>
            <FontAwesome name="arrow-right" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Trendify Seller Centre</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: 19,
      paddingTop: 13,
      paddingBottom: 35,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 21,
    },
    backButton: {
      width: 41,
      height: 41,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      flex: 1,
    },
    heading: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    heroCard: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      padding: 22,
      alignItems: 'center',
      marginBottom: 25,
    },
    heroIcon: {
      width: 58,
      height: 58,
      borderRadius: 19,
      backgroundColor: 'rgba(255,255,255,0.17)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 13,
    },
    heroTitle: {
      fontSize: 19,
      fontWeight: '900',
      color: '#FFFFFF',
    },
    heroDescription: {
      fontSize: 11,
      lineHeight: 17,
      color: '#FFFFFF',
      opacity: 0.9,
      textAlign: 'center',
      marginTop: 7,
      maxWidth: 260,
    },
    heroButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 17,
      paddingVertical: 11,
      borderRadius: 11,
      marginTop: 17,
    },
    heroButtonText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: '900',
    },
    sectionHeader: {
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.text,
    },
    sectionSubtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    faqCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      marginBottom: 10,
      overflow: 'hidden',
    },
    questionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
      padding: 14,
    },
    questionIcon: {
      width: 29,
      height: 29,
      borderRadius: 9,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    questionText: {
      flex: 1,
      fontSize: 11,
      lineHeight: 17,
      fontWeight: '800',
      color: colors.text,
    },
    answerContainer: {
      paddingHorizontal: 14,
      paddingBottom: 15,
    },
    answerDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 11,
    },
    answerText: {
      fontSize: 11,
      lineHeight: 18,
      color: colors.textSecondary,
      paddingLeft: 40,
    },
    supportCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 17,
      padding: 19,
      alignItems: 'center',
      marginTop: 15,
    },
    supportIcon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    supportTitle: {
      fontSize: 15,
      fontWeight: '900',
      color: colors.text,
    },
    supportDescription: {
      fontSize: 10,
      lineHeight: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 7,
    },
    supportButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 11,
      marginTop: 15,
    },
    supportButtonText: {
      fontSize: 11,
      fontWeight: '900',
      color: '#FFFFFF',
    },
    footer: {
      fontSize: 10,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 23,
    },
  });
}

