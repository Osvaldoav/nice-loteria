import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const onUserChange = functions.firestore
  .document('users/{user}')
  .onUpdate(change => {
    const before = change.before.data();
    const after = change.after.data();
    const batch = db.batch();
    let addedTableIds = [];
    let removedTableIds = [];
    
    if(before && after){
      addedTableIds = after.table_ids.filter((tableId : string) => !before.table_ids.includes(tableId));
      removedTableIds = before.table_ids.filter((tableId : string) => !after.table_ids.includes(tableId));

      addedTableIds.forEach((tableId : string) => {
        const ref = db.collection('tables').doc(tableId);
        batch.update(ref, {user_id: change.after.id});
      });
  
      removedTableIds.forEach((tableId : string) => {
        const ref = db.collection('tables').doc(tableId);
        batch.update(ref, {user_id: ""});
      });
    }

    return batch.commit();
  })


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
