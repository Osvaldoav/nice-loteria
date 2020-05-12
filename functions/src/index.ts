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
  console.log(user);

  const batch = db.batch();

  if(user){
    user.table_ids.forEach((tableID : string) => {
      const ref = db.collection('tables').doc(tableID);
      batch.update(ref, {user_id: ""});
    });
  }

  return batch.commit();
})