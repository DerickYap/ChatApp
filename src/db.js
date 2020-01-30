import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [room])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyC9RtshYqMBoMUT-Nz-fwq_6zf5glQ0OtY",
    authDomain: "talkie-2e6be.firebaseapp.com",
    databaseURL: "https://talkie-2e6be.firebaseio.com",
    projectId: "talkie-2e6be",
    storageBucket: "talkie-2e6be.appspot.com",
    messagingSenderId: "170527470492",
    appId: "1:170527470492:web:f8954e3b20709aeb0f0e59",
    measurementId: "G-RHD49LEQDS"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()