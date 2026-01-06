package com.yash.Interactive_Webspace.dto;

import com.yash.Interactive_Webspace.model.EventType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InteractionEventDto {
    private Long Id;
    private String sessionId;
    private EventType eventType;
    private String artworkId;
    private String fragmentId;
    private Integer xPos;
    private Integer yPos;
    private LocalDateTime timestamp;
}
