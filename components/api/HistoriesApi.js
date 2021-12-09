import React from 'react'
import firebase from 'firebase'

export function addHistory(history, addComplete) {
    
    firebase.firestore()
    .collection('histories')
    .doc(firebase.auth().currentUser.uid)
    .collection('userHistories')
    .add({
        name: history.name,
        color: history.color,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userid: firebase.auth().currentUser.uid
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getHistories(historiesRetreived){

    var historyList = [];
    
    var snapshot = await firebase.firestore()
    .collection('histories')
    .doc(firebase.auth().currentUser.uid)
    .collection('userHistories')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        
        historyList.push(doc.data());
    });
    

    console.log("history list: ", historyList); 

    historiesRetreived(historyList);


}


