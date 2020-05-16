import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const onUserChange = functions.firestore
.document('users/{userID}')
.onUpdate(change => {
  const before = change.before.data();
  const after = change.after.data();
  const batch = db.batch();
  let addedTableIds = [];
  let removedTableIds = [];
  
  if(before && after){
    addedTableIds = after.table_ids.filter((tableID : string) => !before.table_ids.includes(tableID));
    removedTableIds = before.table_ids.filter((tableID : string) => !after.table_ids.includes(tableID));

    addedTableIds.forEach((tableID : string) => {
      const ref = db.collection('tables').doc(tableID);
      batch.update(ref, {user_id: change.after.id});
    });

    removedTableIds.forEach((tableID : string) => {
      const ref = db.collection('tables').doc(tableID);
      batch.update(ref, {user_id: ""});
    });
  }

  return batch.commit();
})

export const onUserDelete = functions.firestore
.document('users/{userID}')
.onDelete(snapshot => {
  const user = snapshot.data();
  const batch = db.batch();

  if(user){
    user.table_ids.forEach((tableID : string) => {
      const ref = db.collection('tables').doc(tableID);
      batch.update(ref, {user_id: ""});
    });
  }

  return batch.commit();
})

export const onRoundChange = functions.firestore
.document('rounds/{roundID}')
.onUpdate(async (change) => {
  const after = change.after.data();
  const before = change.before.data();
  console.log('before:', before);
  console.log('after:', after);

  let winners:{doc: string, user: string}[] = new Array();
  let status, tiedList;

  if(after && (after.status === 'active' || after.status === 'untie')){
    const plays: {[key: string] : number [][]} = {
      "Chorro": [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15], [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15], [0,5,10,15], [3,6,9,12]],
      "4 Esquinas": [[0,3,12,15]],
      "Centro": [[5,6,9,10]],
      "Llena": [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],
      "Escuadra": [[0,4,8,12,13,14,15], [12,13,14,15,11,7,3], [0,1,2,3,7,11,15], [0,1,2,3,4,8,12]],
      "Letra X": [[0,5,10,15,3,6,9,12]],
      "Letra O": [[0,1,2,3,4,7,8,11,12,13,14,15]],
      "Letra N": [[0,4,8,12,5,10,15,3,7,11]],
      "Cuadrito": [[0,1,4,5], [1,2,5,6], [2,3,6,7], [4,5,8,9], [5,6,9,10], [6,7,10,11], [8,9,12,13], [9,10,13,14], [10,11,14,15]],
      "Letra L": [[0,4,8,12,13,14,15]]
    };
    const selectedPlay = plays[after.winCondition];
  
    try {
      if(after.status === 'untie'){
        const docsID = after.tiedList.map((winner : {doc: string, user: string}) => winner.doc);
        const snapshot = await db.collection('tables').where(admin.firestore.FieldPath.documentId(), "in", docsID).get();

        let maxLength = 0;

        // Return documents ids with the ammount of cards in current cardList
        const docs = snapshot.docs.map(doc => {
          const length = (after.cardList.filter((card : number) => doc.data().cards.includes(card))).length;
          maxLength = length > maxLength ? length : maxLength;

          return {id: doc.id, length: length};
        })

        // Filter documents with highest ammount of cards in current cardList
        const initialValue : string[] = [];
        const filteredDocs = docs.reduce((filtered, doc) => {
          if(doc.length === maxLength) filtered.push(doc.id);
          return filtered;
        },initialValue);

        tiedList = after.tiedList.filter((tied : {doc: string, user: string}) => filteredDocs.includes(tied.doc));
        status = tiedList.length === 1 ? "finished" : after.status;
        winners = tiedList.length === 1 ? [tiedList[0]] : [];
      }
      else{
        const snapshot = await db.collection('tables').where('user_id', '>', '').get();
        await Promise.all(snapshot.docs.map(async doc => {
          const isWinner = selectedPlay.some(play => {
            const cards = play.map(index => doc.data().cards[index]);
            return cards.every((card : number) => after.cardList.includes(card));
          })
          
          if(isWinner) {
            const userDoc = await db.collection('users').doc(doc.data().user_id).get();
            let user = "Jugador";
            if(userDoc){
              const userData = userDoc.data();
              if(userData) user = userData.name;
            }
            winners.push({doc: doc.id, user: user});
          }
        }));
        status = winners.length > 1 ? "tie" : winners.length > 0 ? "finished" : after.status;
        tiedList = [];
      }
    } 
    catch (error) {
      console.log("couldn't search through table documents", error);
    }
    return db.collection('rounds').doc(change.after.id).update({winners: winners, status: status, tiedList: tiedList});
  }

  return Promise.resolve;
})

export const onRoundCreate = functions.firestore
.document('rounds/{roundID}')
.onCreate(snapshot => {
  const round = snapshot.id;
  const ref = db.collection('details').doc('currentInfo');

  return ref.update({round: round});
})