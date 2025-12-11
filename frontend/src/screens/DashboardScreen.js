import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { accountService } from '../services/accountService';
import { transactionService } from '../services/transactionService';

export default function DashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cashflowSummary, setCashflowSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [summary, transactions] = await Promise.all([
        accountService.getCashflowSummary(),
        transactionService.getTransactions(),
      ]);
      
      setCashflowSummary(summary);
      setRecentTransactions(transactions.slice(0, 5)); // Get 5 most recent
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Cashflow Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Available to Spend</Text>
        <Text style={styles.summaryAmount}>
          {cashflowSummary ? formatCurrency(cashflowSummary.availableToSpend) : '$0.00'}
        </Text>
        
        <View style={styles.summaryDetails}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Cash</Text>
            <Text style={styles.summaryValue}>
              {cashflowSummary ? formatCurrency(cashflowSummary.totalCash) : '$0.00'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Credit Available</Text>
            <Text style={styles.summaryValue}>
              {cashflowSummary ? formatCurrency(cashflowSummary.totalCredit) : '$0.00'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Debt</Text>
            <Text style={[styles.summaryValue, styles.debtValue]}>
              {cashflowSummary ? formatCurrency(cashflowSummary.totalDebt) : '$0.00'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Min Payments Due</Text>
            <Text style={[styles.summaryValue, styles.debtValue]}>
              {cashflowSummary ? formatCurrency(cashflowSummary.minimumPaymentsDue) : '$0.00'}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.actionButtonText}>+ Add Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Transactions')}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No transactions yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first transaction to get started
            </Text>
          </View>
        ) : (
          recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(transaction.category) }
                ]}>
                  <Text style={styles.categoryText}>
                    {transaction.category}
                  </Text>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionMerchant}>
                    {transaction.merchant}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {formatDate(transaction.transactionDate)}
                  </Text>
                  {transaction.emotion && (
                    <Text style={styles.emotionTag}>
                      😊 {transaction.emotion.toLowerCase()}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'EXPENSE' && styles.expenseAmount
              ]}>
                {transaction.type === 'EXPENSE' ? '-' : '+'}{formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const getCategoryColor = (category) => {
  const colors = {
    'Food': '#fbbf24',
    'Transport': '#60a5fa',
    'Shopping': '#f472b6',
    'Entertainment': '#a78bfa',
    'Bills': '#ef4444',
    'Healthcare': '#34d399',
    'Other': '#9ca3af',
  };
  return colors[category] || '#9ca3af';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  summaryCard: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  summaryDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  summaryItem: {
    width: '50%',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#c7d2fe',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  debtValue: {
    color: '#fca5a5',
  },
  actionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryBadge: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  emotionTag: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  expenseAmount: {
    color: '#ef4444',
  },
});
