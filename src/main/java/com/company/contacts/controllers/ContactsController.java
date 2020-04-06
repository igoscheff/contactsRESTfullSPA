package com.company.contacts.controllers;

import com.company.contacts.models.Contact;
import com.company.contacts.services.ContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ContactsController {

    public final ContactService contactService;

    public ContactsController(ContactService contactService) {
        this.contactService = contactService;
    }


    @GetMapping(value = "/api", consumes = "application/json", produces = "application/json")
    public List<Contact> getContacts() {
        return contactService.contactList;
    }

    @PostMapping(value = "/api", consumes = "application/json", produces = "application/json")
    public Contact createContact(@RequestBody Contact contact) {
        return contactService.createContact(contact);
    }

    @PatchMapping(value = "/api", consumes = "application/json", produces = "application/json")
    public Contact changeContact(@RequestBody Contact contact) {
        return contactService.changeContact(contact);
    }

    @DeleteMapping(value = "/api", consumes = "application/json", produces = "application/json")
    public Contact removeContact(@RequestBody Contact contact) {
        return contactService.removeContact(contact);
    }
}
