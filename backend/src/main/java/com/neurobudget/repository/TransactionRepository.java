package com.neurobudget.repository;

import com.neurobudget.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    @Query("SELECT t FROM Transaction t WHERE t.account.user.id = :userId ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT t FROM Transaction t WHERE t.account.id = :accountId ORDER BY t.transactionDate DESC")
    List<Transaction> findByAccountId(@Param("accountId") Long accountId);
    
    @Query("SELECT t FROM Transaction t WHERE t.id = :id AND t.account.user.id = :userId")
    Optional<Transaction> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
    
    @Query("SELECT t FROM Transaction t WHERE t.account.user.id = :userId " +
           "AND t.transactionDate BETWEEN :startDate AND :endDate " +
           "ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    @Query("SELECT t FROM Transaction t WHERE t.account.user.id = :userId " +
           "AND t.emotion = :emotion ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserIdAndEmotion(
        @Param("userId") Long userId,
        @Param("emotion") Transaction.EmotionTag emotion
    );
    
    @Query("SELECT t FROM Transaction t WHERE t.account.user.id = :userId " +
           "AND t.trigger = :trigger ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserIdAndTrigger(
        @Param("userId") Long userId,
        @Param("trigger") Transaction.TriggerTag trigger
    );
}
