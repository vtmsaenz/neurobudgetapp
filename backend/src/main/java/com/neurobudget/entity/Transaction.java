package com.neurobudget.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String merchant;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    private EmotionTag emotion;

    @Enumerated(EnumType.STRING)
    private TriggerTag trigger;

    @Column(length = 500)
    private String notes;

    @Column(nullable = false)
    private Boolean isCreditSpend = false;

    @Column(nullable = false)
    private Boolean isRecurring = false;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum TransactionType {
        INCOME,
        EXPENSE,
        TRANSFER
    }

    public enum EmotionTag {
        HAPPY,
        STRESSED,
        BORED,
        EXCITED,
        ANXIOUS,
        TIRED,
        FRUSTRATED,
        CONTENT,
        SAD,
        NEUTRAL
    }

    public enum TriggerTag {
        SOCIAL_MEDIA,
        LATE_NIGHT,
        WORK_STRESS,
        SOCIAL_PRESSURE,
        REWARD,
        BOREDOM,
        HUNGER,
        PLANNED,
        EMERGENCY,
        IMPULSE
    }
}
