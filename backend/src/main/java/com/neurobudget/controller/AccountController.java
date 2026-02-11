package com.neurobudget.controller;

import com.neurobudget.dto.AccountDTO;
import com.neurobudget.entity.User;
import com.neurobudget.repository.UserRepository;
import com.neurobudget.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<AccountDTO.Response> createAccount(
            @Valid @RequestBody AccountDTO.CreateRequest request,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(accountService.createAccount(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO.Response>> getAccounts(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(accountService.getUserAccounts(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO.Response> getAccount(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(accountService.getAccount(id, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountDTO.Response> updateAccount(
            @PathVariable Long id,
            @Valid @RequestBody AccountDTO.UpdateRequest request,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(accountService.updateAccount(id, userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserId(authentication);
        accountService.deleteAccount(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cashflow")
    public ResponseEntity<AccountDTO.CashflowSummary> getCashflowSummary(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(accountService.getCashflowSummary(userId));
    }

    private Long getUserId(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
