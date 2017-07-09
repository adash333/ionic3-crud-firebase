import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddContactPage } from '../add-contact/add-contact';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
    this.contactList = afDB.list('/contacts');
  }

  addContact(){
    this.navCtrl.push(AddContactPage);
  }

  editContact(contact){
    console.log(contact);
    this.navCtrl.push(AddContactPage, {
      key: contact.$key,
      name: contact.name,
      address: contact.address,
      phone: contact.phone,
      city: contact.city
    });
  }

  deleteContact(contact) {
    this.contactList.remove(contact);
  }


}
