package com.yash.Interactive_Webspace.service;

import com.yash.Interactive_Webspace.dto.InteractionEventDto;
import com.yash.Interactive_Webspace.model.InteractionEvent;
import com.yash.Interactive_Webspace.repository.InteractionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class InteractionService{
    private final InteractionRepository interactionRepository;
//    private final ModelMapper modelMapper = new ModelMapper();

    public InteractionService(InteractionRepository repository){
        this.interactionRepository = repository;
    }

    public void save(InteractionEventDto interactionEventDto){
        InteractionEvent interactionEvent = new InteractionEvent();
        interactionEvent.setSessionId(interactionEventDto.getSessionId());
        interactionEvent.setArtworkId(interactionEventDto.getArtworkId());
        interactionEvent.setFragmentId(interactionEventDto.getFragmentId());
        interactionEvent.setEventType(interactionEventDto.getEventType());
        interactionEvent.setTimestamp(interactionEventDto.getTimestamp());
        interactionEvent.setXPos(interactionEventDto.getXPos());
        interactionEvent.setYPos(interactionEventDto.getYPos());
        interactionRepository.save(interactionEvent);
    }
}
