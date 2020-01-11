
/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  LoadingController,
  ToastController,
  ModalController
} from '@ionic/angular';
import * as firebase from 'firebase';
declare var google;

@Injectable({
  providedIn: 'root'
})
export class IoncabServicesService {
  zoom = 15;
  showbutton = true;
  logIn = false;
  distance;
  path = '';
  flag = true;
  showpickup = '';
  showdestination = '';
  carname = '';
  pickup = '';
  street = '';
  building = '';
  lat_lng = [];
  latarr = [];
  lanarr = [];
  tripDistance: number;
  mylatlng;
  locatedCountry: string = 'IN';

  pickupLocation = 'pickup'; // default location when app starts
  originlatitude: any;
  originlongititude: any;
  destinationlatitude: any;
  destinationlongititude: any;
  destination = '';
  directionlat: any;
  directionlng: any;
  farePerKm: number = 1;
  baseFare: number = 2;
  loggedInUser: any = {
    id: '',
    name: '',
    email: '',
    profileImg: '',
    location: ''
  };
  driverInfo: any // driver information from firebase function
  customerLocation: any // store location of customer
  country = [
    {
      name: 'Indonesia',
      dial_code: '+62',
      code: 'ID'
    },
    {
      name: 'Malaysia',
      dial_code: '+60',
      code: 'MY'
    },
    {
      name: 'Singapore',
      dial_code: '+65',
      code: 'SG'
    },
  ];

  icons = [
    { title: 'Report an issue with your last trip' },
    {
      title: 'Trips and fare review'
    },
    {
      title: 'Account and ppayment option'
    },
    {
      title: 'A guide to IonCab'
    },
    {
      title: 'Accessibility'
    },
    {
      title: 'Report an issue with your last trip'
    },
    {
      title: 'Trips and fare review'
    },
    {
      title: 'Account and ppayment option'
    },
    {
      title: 'A guide to IonCab'
    },
    { title: 'Accessibility' }
  ];

  cards = [
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    },
    {
      iconName: 'arrow-dropdown-circle',
      iconName2: 'pin',
      label: 'Near Delhi To Ajmer Bypass',
      image: '../../assets/image/mini.png',
      label2: 'Benar Road, Dadi Ka Phatak,',
      text: '10/13/17 at 20:26',
      text2: '325 Rs.',
      head: 'Maruti Suzuki alto(Sedan)'
    }
  ];
  constructor(
    private __loader: MapsAPILoader,
    private __zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) { }

  getLatLan(address: string) {
    const geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({ err: true });
          observer.complete();
        }
      });
    });
  }

  setLoggedInUser(res, user) {
    this.loggedInUser.id = res.uid;
    this.loggedInUser.phone = res.phone ? res.phone : '';
    this.loggedInUser.name = user.name;
    this.loggedInUser.email = user.email;
    this.loggedInUser.profileImg = user.profileImg ? user.profileImg : 'assets/image/images.jpg'
  }

  async loading(message) {
    const loader = await this.loadingCtrl.create({
      message
      // duration: 3000
    });
    return loader;
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    return toast;
  }

  async cabModal(component, cssClass) {
    const profileModal = await this.modalCtrl.create({
      component,
      cssClass,
    });
    return profileModal;
  }

  checkStatus(uid) {
    const observable = Observable.create(observer => {
      firebase
        .firestore()
        .collection('customers')
        .doc(uid)
        .onSnapshot(doc => {
          observer.next(doc.data());
        });
    });
    return observable;
  }
}
