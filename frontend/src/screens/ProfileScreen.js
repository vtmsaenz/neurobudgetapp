import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About NeuroBudget</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💭 Emotion-Aware Tracking</Text>
          <Text style={styles.infoText}>
            Track not just what you spend, but why you spend. Tag purchases with 
            emotions and triggers to understand your spending patterns.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💰 True Cashflow</Text>
          <Text style={styles.infoText}>
            See your real available spending across all accounts, factoring in 
            credit limits, minimum payments, and upcoming bills.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🎯 ADHD-Friendly</Text>
          <Text style={styles.infoText}>
            Designed with ADHD in mind - quick entry, visual feedback, and 
            pattern recognition to help you make better financial decisions.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Info</Text>
        
        <View style={styles.menuItem}>
          <Text style={styles.menuLabel}>Version</Text>
          <Text style={styles.menuValue}>1.0.0</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuLabel}>Backend</Text>
          <Text style={styles.menuValue}>Java Spring Boot</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuLabel}>Database</Text>
          <Text style={styles.menuValue}>PostgreSQL</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuLabel}>Mobile</Text>
          <Text style={styles.menuValue}>React Native + Expo</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>Multi-account tracking</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>Emotion & trigger tagging</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>Cashflow calculations</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>✅</Text>
          <Text style={styles.featureText}>JWT authentication</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🚧</Text>
          <Text style={styles.featureText}>Spending insights (coming soon)</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🚧</Text>
          <Text style={styles.featureText}>CSV import (coming soon)</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Built with ❤️ for people with ADHD
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 16,
    color: '#374151',
  },
  menuValue: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9ca3af',
    paddingVertical: 24,
  },
});
