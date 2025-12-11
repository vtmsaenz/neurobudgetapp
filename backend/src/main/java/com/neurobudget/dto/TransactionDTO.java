package com.neurobudget.dto;

import com.neurobudget.entity.Transaction;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TransactionDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotNull(message = "Account ID is required")
        private Long accountId;

        @NotNull(message = "Transaction date is required")
        private LocalDate transactionDate;

        @NotBlank(message = "Description is required")
        private String description;

        @NotBlank(message = "Merchant is required")
        private String merchant;

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
        private BigDecimal amount;

        @NotNull(message = "Transaction type is required")
        private Transaction.TransactionType type;

        @NotBlank(message = "Category is required")
        private String category;

        private Transaction.EmotionTag emotion;
        private Transaction.TriggerTag trigger;

        @Size(max = 500, message = "Notes must be less than 500 characters")
        private String notes;

        private Boolean isCreditSpend = false;
        private Boolean isRecurring = false;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateRequest {
        private String description;
        private String merchant;
        private BigDecimal amount;
        private Transaction.TransactionType type;
        private String category;
        private Transaction.EmotionTag emotion;
        private Transaction.TriggerTag trigger;
        private String notes;
        private Boolean isCreditSpend;
        private Boolean isRecurring;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long accountId;
        private String accountName;
        private LocalDate transactionDate;
        private String description;
        private String merchant;
        private BigDecimal amount;
        private Transaction.TransactionType type;
        private String category;
        private Transaction.EmotionTag emotion;
        private Transaction.TriggerTag trigger;
        private String notes;
        private Boolean isCreditSpend;
        private Boolean isRecurring;
        private LocalDateTime createdAt;
    }
}
