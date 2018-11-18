import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCK2UwSNrgj-9tH1D4mBJquBJ6n-wQ4uAw",
  authDomain: "project2-75a8d.firebaseapp.com",
  databaseURL: "https://project2-75a8d.firebaseio.com",
  projectId: "project2-75a8d",
  storageBucket: "project2-75a8d.appspot.com",
  messagingSenderId: "349612439619"
};

@Injectable()
export class EntryDataServiceProvider {
  private entries: Entry[] = [];
  private serviceObserver: any;
  private clientObservable: any;
  // private nextID: number = 0;
  private db: any;

  constructor(private storage: Storage) {
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.clientObservable = Observable.create(observer => {
      this.serviceObserver = observer;
    });

    let dataRef = this.db.ref('/entries');
    dataRef.on('value', snapshot => {
        this.entries = [];
        snapshot.forEach(childSnapshot => {
          let entry = {
            id: childSnapshot.key,
            // id: childSnapshot.val().id,
            title: childSnapshot.val().title,
            text: childSnapshot.val().text,
            timestamp: childSnapshot.val().timestamp,
            image: childSnapshot.val().image,
    };
      this.entries.push(entry); ///update local display
    });
      this.notifySubscribers();
  });
  }

    public getObservable(): Observable<Entry[]> {
      return this.clientObservable;
    }

    private notifySubscribers(): void {
      // console.log('arrive here');
      this.serviceObserver.next(true);
    }


    public getEntries():Entry[] {
      let entriesClone = JSON.parse(JSON.stringify(this.entries));
      return entriesClone.sort(function(a, b) {
        if (a.timestamp > b.timestamp) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    public getEntryByID(id: number): Entry {
      for (let e of this.entries) {
        if (e.id === id) {
          let clone = JSON.parse(JSON.stringify(e));
          return clone;
        }
      }
      return undefined;
    }

    public addEntry(entry:Entry) {
      let listEntry = this.db.ref('/entries');
      let entryRef = listEntry.push();
      let dataRecord = {
        id: entry.id,
        title: entry.title,
        text: entry.text,
        timestamp: new Date(entry.timestamp).toLocaleString(),
        image: entry.image
      }
      entryRef.set(dataRecord);
      this.notifySubscribers();
    }

    public updateEntry(key, newEntry: Entry): void {
      let parentRef = this.db.ref('/entries');
      let childRef = parentRef.child(key);
      let updateRecord = {
        id: newEntry.id,
        title: newEntry.title,
        text: newEntry.text,
        timestamp: new Date(newEntry.timestamp).toLocaleString(),
        image: newEntry.image
      }
      childRef.set(updateRecord);
      this.notifySubscribers();
    }

    public removeEntry(key): void {
      let parentRef = this.db.ref('/entries');
      let childRef = parentRef.child(key);
      childRef.remove();
      this.notifySubscribers();
    }
    

}
