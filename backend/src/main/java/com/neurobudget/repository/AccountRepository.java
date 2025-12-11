package com.neurobudget.repository;

import com.neurobudget.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserIdAndActiveTrue(Long userId);
    List<Account> findByUserId(Long userId);
    
    @Query("SELECT a FROM Account a WHERE a.id = :id AND a.user.id = :userId")
    Optional<Account> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
}
