import { initializeApp } from 'firebase/app';
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDt7hYjTsAZVV-5xNoJOoSxNwf4eW0eaW4",
    authDomain: "educlong-react.firebaseapp.com",
    projectId: "educlong-react",
    storageBucket: "educlong-react.appspot.com",
    messagingSenderId: "874603796019",
    appId: "1:874603796019:web:368fad36770741eecf3546"
  };

const dbFirebase = getFirestore(initializeApp(firebaseConfig));
const _query = (data) => query(collection(dbFirebase, data));

export const unSubscriber = (setDataParents, setLoading, parentData, arrChildData) => onSnapshot(_query(parentData), (querySnapshot) => {
  let data = [];
  querySnapshot.forEach((doc) => {
      if(arrChildData.length !== 0)
          arrChildData.forEach(dataChild => {
          let queryChild = query(collection(dbFirebase, parentData + '/' + doc.id + '/' + dataChild));
          onSnapshot(queryChild, (querySnapshotChild) => {
              let _dataChild = [];
              querySnapshotChild.forEach(docChild => {
              _dataChild.push({...docChild.data(), id: docChild.id});
              });
              data.push({ ...doc.data(), dataChildrent: _dataChild, id: doc.id });
              setDataParents(data);
              if(data.length === querySnapshot._snapshot.docChanges.length) setLoading(false);
          })
      });
      else {
          data.push({ ...doc.data(), id: doc.id });
          setDataParents(data);
          if(data.length === querySnapshot._snapshot.docChanges.length) setLoading(false);
      }
  });
});