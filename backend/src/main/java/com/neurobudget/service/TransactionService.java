package com.neurobudget.service;

import com.neurobudget.dto.TransactionDTO;
import com.neurobudget.entity.Account;
import com.neurobudget.entity.Transaction;
import com.neurobudget.repository.AccountRepository;
import com.neurobudget.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public TransactionDTO.Response createTransaction(Long userId, TransactionDTO.CreateRequest request) {
        Account account = accountRepository.findByIdAndUserId(request.getAccountId(), userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setDescription(request.getDescription());
        transaction.setMerchant(request.getMerchant());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setEmotion(request.getEmotion());
        transaction.setTrigger(request.getTrigger());
        transaction.setNotes(request.getNotes());
        transaction.setIsCreditSpend(request.getIsCreditSpend());
        transaction.setIsRecurring(request.getIsRecurring());

        transaction = transactionRepository.save(transaction);
        return mapToResponse(transaction);
    }

    public List<TransactionDTO.Response> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public List<TransactionDTO.Response> getAccountTransactions(Long accountId, Long userId) {
        // Verify account belongs to user
        accountRepository.findByIdAndUserId(accountId, userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        return transactionRepository.findByAccountId(accountId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public TransactionDTO.Response getTransaction(Long transactionId, Long userId) {
        Transaction transaction = transactionRepository.findByIdAndUserId(transactionId, userId)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return mapToResponse(transaction);
    }

    @Transactional
    public TransactionDTO.Response updateTransaction(Long transactionId, Long userId, 
                                                     TransactionDTO.UpdateRequest request) {
        Transaction transaction = transactionRepository.findByIdAndUserId(transactionId, userId)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (request.getDescription() != null) transaction.setDescription(request.getDescription());
        if (request.getMerchant() != null) transaction.setMerchant(request.getMerchant());
        if (request.getAmount() != null) transaction.setAmount(request.getAmount());
        if (request.getType() != null) transaction.setType(request.getType());
        if (request.getCategory() != null) transaction.setCategory(request.getCategory());
        if (request.getEmotion() != null) transaction.setEmotion(request.getEmotion());
        if (request.getTrigger() != null) transaction.setTrigger(request.getTrigger());
        if (request.getNotes() != null) transaction.setNotes(request.getNotes());
        if (request.getIsCreditSpend() != null) transaction.setIsCreditSpend(request.getIsCreditSpend());
        if (request.getIsRecurring() != null) transaction.setIsRecurring(request.getIsRecurring());

        transaction = transactionRepository.save(transaction);
        return mapToResponse(transaction);
    }

    @Transactional
    public void deleteTransaction(Long transactionId, Long userId) {
        Transaction transaction = transactionRepository.findByIdAndUserId(transactionId, userId)
            .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transactionRepository.delete(transaction);
    }

    public List<TransactionDTO.Response> getTransactionsByDateRange(Long userId, LocalDate startDate, 
                                                                     LocalDate endDate) {
        return transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    private TransactionDTO.Response mapToResponse(Transaction transaction) {
        TransactionDTO.Response response = new TransactionDTO.Response();
        response.setId(transaction.getId());
        response.setAccountId(transaction.getAccount().getId());
        response.setAccountName(transaction.getAccount().getName());
        response.setTransactionDate(transaction.getTransactionDate());
        response.setDescription(transaction.getDescription());
        response.setMerchant(transaction.getMerchant());
        response.setAmount(transaction.getAmount());
        response.setType(transaction.getType());
        response.setCategory(transaction.getCategory());
        response.setEmotion(transaction.getEmotion());
        response.setTrigger(transaction.getTrigger());
        response.setNotes(transaction.getNotes());
        response.setIsCreditSpend(transaction.getIsCreditSpend());
        response.setIsRecurring(transaction.getIsRecurring());
        response.setCreatedAt(transaction.getCreatedAt());
        return response;
    }
}
