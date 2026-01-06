package com.yash.Interactive_Webspace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class InteractionEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String sessionId;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private String artworkId;
    private String fragmentId;
    private Integer xPos;
    private Integer yPos;
    private LocalDateTime timestamp;
}
