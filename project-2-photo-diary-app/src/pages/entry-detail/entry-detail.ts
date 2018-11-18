import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from '../../models/entry'
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service'
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";


@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html'
})

export class EntryDetailPage {

  private entry: Entry;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private entryDataService: EntryDataServiceProvider, public alertController: AlertController) {
    let entryID = this.navParams.get("entryID");

    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.id = -1; // placeholder for 'temporary' entry
      this.entry.image = PLACEHOLDER_IMAGE;
      this.entry.timestamp = new Date();/////change type
    }else {
        this.entry = this.entryDataService.getEntryByID(entryID);
    }

    console.log("retrieved entry:", this.entry);
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      title: 'Update timestamp?',
      message: 'Do you want to keep the timestamp, or update to the current time?',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Keep (' + new Date(this.entry.timestamp).toLocaleString() + ')',
          value: 'keep'
          // checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Update (' + new Date().toLocaleString() + ')',
          value: 'update'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelled');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
            if (data === 'update') {
              this.entry.timestamp = new Date();//////change type
              //console.log(new Date(this.entry.timestamp).toLocaleString());
            }
            console.log('this.entry is', this.entry);
            this.entryDataService.updateEntry(this.entry.id, this.entry);
            this.navCtrl.pop();
          }
        }
      ]
    });

    await alert.present();
  }

  private saveEntry() {
    if (this.entry.id === -1) {
      //this.entry.timestamp = new Date();
      console.log('saveEntry:', this.entry);
      this.entryDataService.addEntry(this.entry);
      this.navCtrl.pop();
    } else {
      this.presentAlertRadio();
    }

  }

  private cancel() {
    this.navCtrl.pop();
  }

  private takePic() {
    let currentImage = this.entry.image;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.entry.image = 'data:image/jpeg;base64,' + imageData;
      } else {
        this.entry.image = currentImage;
      }
    }, (err) => {
      this.entry.image = currentImage;
    });
    this.entry.image = SPINNER_IMAGE;
  }

 

}
