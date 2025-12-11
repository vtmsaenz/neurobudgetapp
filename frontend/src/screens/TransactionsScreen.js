import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { transactionService } from '../services/transactionService';

export default function TransactionsScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTransactions();
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#fbbf24',
      'Transport': '#60a5fa',
      'Shopping': '#f472b6',
      'Entertainment': '#a78bfa',
      'Bills': '#ef4444',
      'Healthcare': '#34d399',
      'Income': '#10b981',
      'Other': '#9ca3af',
    };
    return colors[category] || '#9ca3af';
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      'HAPPY': '😊',
      'STRESSED': '😰',
      'BORED': '😐',
      'EXCITED': '🤩',
      'ANXIOUS': '😟',
      'TIRED': '😴',
      'FRUSTRATED': '😤',
      'CONTENT': '😌',
      'SAD': '😢',
      'NEUTRAL': '😶',
    };
    return emojis[emotion] || '😶';
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={() => {
        // Could navigate to transaction detail screen
        Alert.alert(
          item.merchant,
          `${item.description}\n${item.notes || 'No notes'}`,
          [{ text: 'OK' }]
        );
      }}
    >
      <View style={styles.transactionLeft}>
        <View style={[
          styles.categoryBadge,
          { backgroundColor: getCategoryColor(item.category) }
        ]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionMerchant}>{item.merchant}</Text>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          
          <View style={styles.transactionMeta}>
            <Text style={styles.transactionDate}>
              {formatDate(item.transactionDate)}
            </Text>
            <Text style={styles.transactionAccount}>• {item.accountName}</Text>
          </View>
          
          {item.emotion && (
            <View style={styles.emotionContainer}>
              <Text style={styles.emotionTag}>
                {getEmotionEmoji(item.emotion)} {item.emotion.toLowerCase()}
              </Text>
              {item.trigger && (
                <Text style={styles.triggerTag}>
                  via {item.trigger.toLowerCase().replace('_', ' ')}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          item.type === 'EXPENSE' && styles.expenseAmount,
          item.type === 'INCOME' && styles.incomeAmount
        ]}>
          {item.type === 'EXPENSE' ? '-' : '+'}
          {formatCurrency(item.amount)}
        </Text>
        {item.isCreditSpend && (
          <View style={styles.creditBadge}>
            <Text style={styles.creditBadgeText}>Credit</Text>
          </View>
        )}
        {item.isRecurring && (
          <View style={styles.recurringBadge}>
            <Text style={styles.recurringBadgeText}>🔄</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💸</Text>
          <Text style={styles.emptyStateText}>No transactions yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first transaction to get started
          </Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => navigation.navigate('AddTransaction')}
          >
            <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryBadge: {
    width: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 0,
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
  transactionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  transactionAccount: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  emotionTag: {
    fontSize: 12,
    color: '#6366f1',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  triggerTag: {
    fontSize: 12,
    color: '#7c3aed',
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  expenseAmount: {
    color: '#ef4444',
  },
  incomeAmount: {
    color: '#10b981',
  },
  creditBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  creditBadgeText: {
    fontSize: 10,
    color: '#1e40af',
    fontWeight: '600',
  },
  recurringBadge: {
    marginTop: 4,
  },
  recurringBadgeText: {
    fontSize: 14,
  },
});
