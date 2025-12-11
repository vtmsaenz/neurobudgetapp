package com.neurobudget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NeuroBudgetApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeuroBudgetApplication.class, args);
    }
}
