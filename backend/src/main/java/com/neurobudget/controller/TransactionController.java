package com.neurobudget.controller;

import com.neurobudget.dto.TransactionDTO;
import com.neurobudget.entity.User;
import com.neurobudget.repository.UserRepository;
import com.neurobudget.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TransactionDTO.Response> createTransaction(
            @Valid @RequestBody TransactionDTO.CreateRequest request,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(transactionService.createTransaction(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO.Response>> getTransactions(
            @RequestParam(required = false) Long accountId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        
        if (accountId != null) {
            return ResponseEntity.ok(transactionService.getAccountTransactions(accountId, userId));
        } else if (startDate != null && endDate != null) {
            return ResponseEntity.ok(transactionService.getTransactionsByDateRange(userId, startDate, endDate));
        } else {
            return ResponseEntity.ok(transactionService.getUserTransactions(userId));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO.Response> getTransaction(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(transactionService.getTransaction(id, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO.Response> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionDTO.UpdateRequest request,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(transactionService.updateTransaction(id, userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        transactionService.deleteTransaction(id, userId);
        return ResponseEntity.noContent().build();
    }

    private Long getUserId(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
