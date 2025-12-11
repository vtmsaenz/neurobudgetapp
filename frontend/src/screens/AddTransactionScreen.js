import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { transactionService } from '../services/transactionService';
import { accountService } from '../services/accountService';

export default function AddTransactionScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountId: null,
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    merchant: '',
    amount: '',
    type: 'EXPENSE',
    category: 'Other',
    emotion: null,
    trigger: null,
    notes: '',
    isCreditSpend: false,
    isRecurring: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await accountService.getAccounts();
      setAccounts(data);
      if (data.length > 0) {
        setFormData({ ...formData, accountId: data[0].id });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load accounts');
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.accountId || !formData.merchant || !formData.amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.description) {
      formData.description = formData.merchant;
    }

    setLoading(true);
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await transactionService.createTransaction(transactionData);
      Alert.alert('Success', 'Transaction added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const accountItems = accounts.map(account => ({
    label: `${account.name} (${account.type.replace('_', ' ')})`,
    value: account.id,
  }));

  const transactionTypes = [
    { label: 'Expense', value: 'EXPENSE' },
    { label: 'Income', value: 'INCOME' },
    { label: 'Transfer', value: 'TRANSFER' },
  ];

  const categories = [
    { label: 'Food & Dining', value: 'Food' },
    { label: 'Transportation', value: 'Transport' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Bills & Utilities', value: 'Bills' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Income', value: 'Income' },
    { label: 'Other', value: 'Other' },
  ];

  const emotions = [
    { label: 'None', value: null },
    { label: '😊 Happy', value: 'HAPPY' },
    { label: '😰 Stressed', value: 'STRESSED' },
    { label: '😐 Bored', value: 'BORED' },
    { label: '🤩 Excited', value: 'EXCITED' },
    { label: '😟 Anxious', value: 'ANXIOUS' },
    { label: '😴 Tired', value: 'TIRED' },
    { label: '😤 Frustrated', value: 'FRUSTRATED' },
    { label: '😌 Content', value: 'CONTENT' },
    { label: '😢 Sad', value: 'SAD' },
    { label: '😶 Neutral', value: 'NEUTRAL' },
  ];

  const triggers = [
    { label: 'None', value: null },
    { label: '📱 Social Media', value: 'SOCIAL_MEDIA' },
    { label: '🌙 Late Night', value: 'LATE_NIGHT' },
    { label: '💼 Work Stress', value: 'WORK_STRESS' },
    { label: '👥 Social Pressure', value: 'SOCIAL_PRESSURE' },
    { label: '🎁 Reward', value: 'REWARD' },
    { label: '😐 Boredom', value: 'BOREDOM' },
    { label: '🍔 Hunger', value: 'HUNGER' },
    { label: '📝 Planned', value: 'PLANNED' },
    { label: '🚨 Emergency', value: 'EMERGENCY' },
    { label: '⚡ Impulse', value: 'IMPULSE' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Transaction</Text>

        {/* Account Selection */}
        <Text style={styles.label}>Account *</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={formData.accountId}
            onValueChange={(value) => setFormData({ ...formData, accountId: value })}
            items={accountItems}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select an account...', value: null }}
          />
        </View>

        {/* Transaction Type */}
        <Text style={styles.label}>Type *</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
            items={transactionTypes}
            style={pickerSelectStyles}
          />
        </View>

        {/* Merchant */}
        <Text style={styles.label}>Merchant *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Starbucks, Amazon, Target"
          value={formData.merchant}
          onChangeText={(text) => setFormData({ ...formData, merchant: text })}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What was this for?"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={formData.amount}
          onChangeText={(text) => setFormData({ ...formData, amount: text })}
          keyboardType="decimal-pad"
        />

        {/* Category */}
        <Text style={styles.label}>Category *</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            items={categories}
            style={pickerSelectStyles}
          />
        </View>

        {/* EMOTION SECTION - The key differentiator! */}
        <View style={styles.emotionSection}>
          <Text style={styles.sectionTitle}>💭 How were you feeling?</Text>
          <Text style={styles.sectionSubtitle}>
            Track the emotion behind this purchase
          </Text>
          
          <Text style={styles.label}>Emotion</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={formData.emotion}
              onValueChange={(value) => setFormData({ ...formData, emotion: value })}
              items={emotions}
              style={pickerSelectStyles}
              placeholder={{ label: 'How did you feel?', value: null }}
            />
          </View>

          <Text style={styles.label}>Trigger</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={formData.trigger}
              onValueChange={(value) => setFormData({ ...formData, trigger: value })}
              items={triggers}
              style={pickerSelectStyles}
              placeholder={{ label: 'What prompted this?', value: null }}
            />
          </View>
        </View>

        {/* Notes */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Any additional thoughts..."
          value={formData.notes}
          onChangeText={(text) => setFormData({ ...formData, notes: text })}
          multiline
          numberOfLines={3}
        />

        {/* Flags */}
        <View style={styles.flagsContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFormData({ ...formData, isCreditSpend: !formData.isCreditSpend })}
          >
            <View style={[styles.checkbox, formData.isCreditSpend && styles.checkboxChecked]}>
              {formData.isCreditSpend && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Paid with credit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFormData({ ...formData, isRecurring: !formData.isRecurring })}
          >
            <View style={[styles.checkbox, formData.isRecurring && styles.checkboxChecked]}>
              {formData.isRecurring && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Recurring transaction</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding...' : 'Add Transaction'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  emotionSection: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 8,
  },
  flagsContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
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
  placeholder: {
    color: '#9ca3af',
  },
});
