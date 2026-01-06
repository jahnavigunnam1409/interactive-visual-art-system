package com.yash.Interactive_Webspace.controller;

import com.yash.Interactive_Webspace.dto.InteractionEventDto;
import com.yash.Interactive_Webspace.service.InteractionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/interaction")
@CrossOrigin()
public class InteractionController {
    private final InteractionService interactionService;

    public InteractionController(InteractionService service){
        this.interactionService = service;
    }

    @GetMapping("/")
    public String hello(){
        return "hello";
    }

    @PostMapping("log")
    public ResponseEntity<Void> logEvent(@RequestBody InteractionEventDto interactionEventDto){
        interactionService.save(interactionEventDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
