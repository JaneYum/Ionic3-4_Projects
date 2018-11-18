import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../models/entry';
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private entries: Entry[];

  constructor(public navCtrl: NavController,
              private entryService: EntryDataServiceProvider) {
    this.entryService.getObservable().subscribe(
      (update) => {
          this.entries = this.entryService.getEntries();
          console.log(this.entries);
      },
      (err) => {
        console.log('this.entryService.getObservable().subscribe :', err);
      });

    this.entries = this.entryService.getEntries();
  }

  private addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }

  private editEntry(entryID: number) {
    // console.log("editing entry ", entryID);
    this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
  }

  private deleteEntry(entryID: number) {
    this.entryService.removeEntry(entryID);
    // console.log("deleting entry", entryID);
  }




}
