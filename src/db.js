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
        // .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
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
    apiKey: "AIzaSyDSgYz1ChHLO6weyxK1oShAu2WYydm9hZs",
    authDomain: "chatapp2020-a4a27.firebaseapp.com",
    databaseURL: "https://chatapp2020-a4a27.firebaseio.com",
    projectId: "chatapp2020-a4a27",
    storageBucket: "chatapp2020-a4a27.appspot.com",
    messagingSenderId: "589577009354",
    appId: "1:589577009354:web:753b36f63b74463a0a1c33",
    measurementId: "G-G527XLD67M"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()