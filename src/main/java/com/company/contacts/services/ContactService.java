package com.company.contacts.services;

import com.company.contacts.models.Contact;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ContactService {

    public List<Contact> contactList = new ArrayList();

    public Contact createContact(Contact contact) {
        contactList.add(contact);
        return contact;
    }

    public Contact changeContact(Contact contact) {
        Iterator<Contact> contactIterator = contactList.iterator();
        while(contactIterator.hasNext()) {

            Contact nextContact = contactIterator.next();
            if (nextContact.getId() == contact.getId()) {
                contactList.set(contact.getId(), contact);
            }
        }
        return contact;
    }

    public Contact removeContact(Contact contact) {
        Iterator<Contact> contactIterator = contactList.iterator();
        while(contactIterator.hasNext()) {

            Contact nextContact = contactIterator.next();
            if (nextContact.getId() == contact.getId()) {
                contactIterator.remove();
            }
        }
        return contact;
    }

}
