import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { accountService } from '../services/accountService';
import RNPickerSelect from 'react-native-picker-select';

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'CHECKING',
    balance: '',
    creditLimit: '',
    minimumPayment: '',
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await accountService.getAccounts();
      setAccounts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load accounts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAccounts();
  };

  const handleCreateAccount = async () => {
    if (!formData.name || !formData.balance) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    try {
      const accountData = {
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance),
        currency: 'USD',
      };

      if (formData.creditLimit) {
        accountData.creditLimit = parseFloat(formData.creditLimit);
      }
      if (formData.minimumPayment) {
        accountData.minimumPayment = parseFloat(formData.minimumPayment);
      }

      await accountService.createAccount(accountData);
      setModalVisible(false);
      resetForm();
      loadAccounts();
      Alert.alert('Success', 'Account created successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'CHECKING',
      balance: '',
      creditLimit: '',
      minimumPayment: '',
    });
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getAccountIcon = (type) => {
    const icons = {
      CHECKING: '💳',
      SAVINGS: '🏦',
      CREDIT_CARD: '💎',
      LOAN: '📋',
      INVESTMENT: '📈',
    };
    return icons[type] || '💰';
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      CHECKING: '#3b82f6',
      SAVINGS: '#10b981',
      CREDIT_CARD: '#8b5cf6',
      LOAN: '#ef4444',
      INVESTMENT: '#f59e0b',
    };
    return colors[type] || '#6b7280';
  };

  const accountTypes = [
    { label: 'Checking', value: 'CHECKING' },
    { label: 'Savings', value: 'SAVINGS' },
    { label: 'Credit Card', value: 'CREDIT_CARD' },
    { label: 'Loan', value: 'LOAN' },
    { label: 'Investment', value: 'INVESTMENT' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Accounts</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Account</Text>
          </TouchableOpacity>
        </View>

        {accounts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏦</Text>
            <Text style={styles.emptyStateText}>No accounts yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first account to start tracking
            </Text>
          </View>
        ) : (
          <View style={styles.accountsList}>
            {accounts.map((account) => (
              <View
                key={account.id}
                style={[
                  styles.accountCard,
                  { borderLeftColor: getAccountTypeColor(account.type) }
                ]}
              >
                <View style={styles.accountHeader}>
                  <View style={styles.accountTitleRow}>
                    <Text style={styles.accountIcon}>
                      {getAccountIcon(account.type)}
                    </Text>
                    <View>
                      <Text style={styles.accountName}>{account.name}</Text>
                      <Text style={styles.accountType}>
                        {account.type.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>
                  {!account.active && (
                    <View style={styles.inactiveBadge}>
                      <Text style={styles.inactiveBadgeText}>Inactive</Text>
                    </View>
                  )}
                </View>

                <View style={styles.accountBalance}>
                  <Text style={styles.balanceLabel}>
                    {account.type === 'CREDIT_CARD' ? 'Available Credit' : 'Balance'}
                  </Text>
                  <Text style={[
                    styles.balanceAmount,
                    account.type === 'LOAN' && styles.loanAmount
                  ]}>
                    {formatCurrency(account.balance)}
                  </Text>
                </View>

                {account.creditLimit && (
                  <View style={styles.accountDetail}>
                    <Text style={styles.detailLabel}>Credit Limit</Text>
                    <Text style={styles.detailValue}>
                      {formatCurrency(account.creditLimit)}
                    </Text>
                  </View>
                )}

                {account.minimumPayment && (
                  <View style={styles.accountDetail}>
                    <Text style={styles.detailLabel}>Minimum Payment</Text>
                    <Text style={styles.detailValue}>
                      {formatCurrency(account.minimumPayment)}
                    </Text>
                  </View>
                )}

                {account.transactionCount > 0 && (
                  <Text style={styles.transactionCount}>
                    {account.transactionCount} transaction{account.transactionCount !== 1 ? 's' : ''}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Account Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Account</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Account Name *"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />

              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  items={accountTypes}
                  style={pickerSelectStyles}
                  placeholder={{}}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Balance *"
                value={formData.balance}
                onChangeText={(text) => setFormData({ ...formData, balance: text })}
                keyboardType="decimal-pad"
              />

              {(formData.type === 'CREDIT_CARD') && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Credit Limit"
                    value={formData.creditLimit}
                    onChangeText={(text) => setFormData({ ...formData, creditLimit: text })}
                    keyboardType="decimal-pad"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Minimum Payment"
                    value={formData.minimumPayment}
                    onChangeText={(text) => setFormData({ ...formData, minimumPayment: text })}
                    keyboardType="decimal-pad"
                  />
                </>
              )}

              {(formData.type === 'LOAN') && (
                <TextInput
                  style={styles.input}
                  placeholder="Minimum Payment"
                  value={formData.minimumPayment}
                  onChangeText={(text) => setFormData({ ...formData, minimumPayment: text })}
                  keyboardType="decimal-pad"
                />
              )}

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateAccount}
              >
                <Text style={styles.createButtonText}>Create Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  emptyState: {
    alignItems: 'center',
    padding: 48,
    marginTop: 60,
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
  },
  accountsList: {
    padding: 16,
  },
  accountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  accountTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  accountType: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inactiveBadgeText: {
    fontSize: 10,
    color: '#dc2626',
    fontWeight: '600',
  },
  accountBalance: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981',
  },
  loanAmount: {
    color: '#ef4444',
  },
  accountDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionCount: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalClose: {
    fontSize: 24,
    color: '#6b7280',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#1f2937',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#1f2937',
  },
});
