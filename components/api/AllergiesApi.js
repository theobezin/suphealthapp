import React from 'react'
import firebase from 'firebase'

export function addAllergy(allergy, addComplete) {
    
    firebase.firestore()
    .collection('allergies')
    .doc(firebase.auth().currentUser.uid)
    .collection('userAllergies')
    .add({
        name: allergy.name,
        color: allergy.color,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userid: firebase.auth().currentUser.uid
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getAllergies(allergiesRetreived){

    var allergyList = [];
    
    var snapshot = await firebase.firestore()
    .collection('allergies')
    .doc(firebase.auth().currentUser.uid)
    .collection('userAllergies')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        
        allergyList.push(doc.data());
    });
    

     

    allergiesRetreived(allergyList);


}


