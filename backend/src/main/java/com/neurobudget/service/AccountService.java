package com.neurobudget.service;

import com.neurobudget.dto.AccountDTO;
import com.neurobudget.entity.Account;
import com.neurobudget.repository.AccountRepository;
import com.neurobudget.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @SuppressWarnings("null")
    public AccountDTO.Response createAccount(Long userId, AccountDTO.CreateRequest request) {
        var user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();
        account.setUser(user);
        account.setName(request.getName());
        account.setType(request.getType());
        account.setBalance(request.getBalance());
        account.setCreditLimit(request.getCreditLimit());
        account.setMinimumPayment(request.getMinimumPayment());
        account.setCurrency(request.getCurrency());
        account.setActive(true);

        account = accountRepository.save(account);
        return mapToResponse(account);
    }

    public List<AccountDTO.Response> getUserAccounts(Long userId) {
        return accountRepository.findByUserId(userId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public AccountDTO.Response getAccount(Long accountId, Long userId) {
        Account account = accountRepository.findByIdAndUserId(accountId, userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        return mapToResponse(account);
    }

    @Transactional
    @SuppressWarnings("null")
    public AccountDTO.Response updateAccount(Long accountId, Long userId, AccountDTO.UpdateRequest request) {
        Account account = accountRepository.findByIdAndUserId(accountId, userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        if (request.getName() != null) account.setName(request.getName());
        if (request.getBalance() != null) account.setBalance(request.getBalance());
        if (request.getCreditLimit() != null) account.setCreditLimit(request.getCreditLimit());
        if (request.getMinimumPayment() != null) account.setMinimumPayment(request.getMinimumPayment());
        if (request.getActive() != null) account.setActive(request.getActive());

        account = accountRepository.save(account);
        return mapToResponse(account);
    }

    @Transactional
    @SuppressWarnings("null")
    public void deleteAccount(Long accountId, Long userId) {
        Account account = accountRepository.findByIdAndUserId(accountId, userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        accountRepository.delete(account);
    }

    public AccountDTO.CashflowSummary getCashflowSummary(Long userId) {
        List<Account> accounts = accountRepository.findByUserIdAndActiveTrue(userId);

        BigDecimal totalCash = BigDecimal.ZERO;
        BigDecimal totalCredit = BigDecimal.ZERO;
        BigDecimal totalDebt = BigDecimal.ZERO;
        BigDecimal totalInvestments = BigDecimal.ZERO;
        BigDecimal minimumPaymentsDue = BigDecimal.ZERO;

        for (Account account : accounts) {
            switch (account.getType()) {
                case CHECKING, SAVINGS -> totalCash = totalCash.add(account.getBalance());
                case CREDIT_CARD -> {
                    if (account.getCreditLimit() != null) {
                        BigDecimal used = account.getCreditLimit().subtract(account.getBalance());
                        totalCredit = totalCredit.add(account.getBalance());
                        totalDebt = totalDebt.add(used);
                        if (account.getMinimumPayment() != null) {
                            minimumPaymentsDue = minimumPaymentsDue.add(account.getMinimumPayment());
                        }
                    }
                }
                case LOAN -> {
                    totalDebt = totalDebt.add(account.getBalance().abs());
                    if (account.getMinimumPayment() != null) {
                        minimumPaymentsDue = minimumPaymentsDue.add(account.getMinimumPayment());
                    }
                }
                case INVESTMENT -> totalInvestments = totalInvestments.add(account.getBalance());
            }
        }

        BigDecimal availableToSpend = totalCash.add(totalCredit).subtract(minimumPaymentsDue);

        AccountDTO.CashflowSummary summary = new AccountDTO.CashflowSummary();
        summary.setTotalCash(totalCash);
        summary.setTotalCredit(totalCredit);
        summary.setTotalDebt(totalDebt);
        summary.setTotalInvestments(totalInvestments);
        summary.setAvailableToSpend(availableToSpend);
        summary.setUpcomingBills(BigDecimal.ZERO); // TODO: Implement recurring transactions
        summary.setMinimumPaymentsDue(minimumPaymentsDue);

        return summary;
    }

    private AccountDTO.Response mapToResponse(Account account) {
        AccountDTO.Response response = new AccountDTO.Response();
        response.setId(account.getId());
        response.setName(account.getName());
        response.setType(account.getType());
        response.setBalance(account.getBalance());
        response.setCreditLimit(account.getCreditLimit());
        response.setMinimumPayment(account.getMinimumPayment());
        response.setCurrency(account.getCurrency());
        response.setActive(account.getActive());
        response.setCreatedAt(account.getCreatedAt());
        response.setUpdatedAt(account.getUpdatedAt());
        response.setTransactionCount(account.getTransactions().size());

        if (account.getCreditLimit() != null) {
            response.setAvailableCredit(account.getBalance());
        }

        return response;
    }
}
