import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  contactList: FirebaseListObservable<any>;
  contact = {
    id: '',
    name: '',
    address: '',
    phone: '',
    city: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase
  ) {
    this.contactList = afDB.list('/contacts');
    this.contact.id = this.navParams.get('key');
    this.contact.name = this.navParams.get('name');
    this.contact.address = this.navParams.get('address');
    this.contact.phone = this.navParams.get('phone');
    this.contact.city = this.navParams.get('city');
  }

  addContact(id, name, address, phone, city) {
    if(id) {
      this.contactList.update(id, {
        name: name,
        address: address,
        phone: phone,
        city: city
      }).then( newContact => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    } else {
      this.contactList.push({
        name: name,
        address: address,
        phone: phone,
        city: city
      }).then( newContact => {
        this.navCtrl.pop();
      }, error => {
          console.log(error);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

}
