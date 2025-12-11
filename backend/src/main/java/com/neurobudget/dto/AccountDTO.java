package com.neurobudget.dto;

import com.neurobudget.entity.Account;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AccountDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotBlank(message = "Account name is required")
        private String name;

        @NotNull(message = "Account type is required")
        private Account.AccountType type;

        @NotNull(message = "Initial balance is required")
        @DecimalMin(value = "0.00", message = "Balance cannot be negative")
        private BigDecimal balance;

        private BigDecimal creditLimit;
        private BigDecimal minimumPayment;

        @NotBlank(message = "Currency is required")
        private String currency = "USD";
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateRequest {
        private String name;
        private BigDecimal balance;
        private BigDecimal creditLimit;
        private BigDecimal minimumPayment;
        private Boolean active;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private Account.AccountType type;
        private BigDecimal balance;
        private BigDecimal creditLimit;
        private BigDecimal minimumPayment;
        private BigDecimal availableCredit;
        private String currency;
        private Boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Integer transactionCount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CashflowSummary {
        private BigDecimal totalCash;
        private BigDecimal totalCredit;
        private BigDecimal totalDebt;
        private BigDecimal totalInvestments;
        private BigDecimal availableToSpend;
        private BigDecimal upcomingBills;
        private BigDecimal minimumPaymentsDue;
    }
}
