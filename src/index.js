import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import{
  getAuth, createUserWithEmailAndPassword
} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6pAQqXVpUQo3hE21MSaNsVuVMHQoAXcQ",
    authDomain: "fir-web-testing-aea18.firebaseapp.com",
    projectId: "fir-web-testing-aea18",
    storageBucket: "fir-web-testing-aea18.appspot.com",
    messagingSenderId: "617028484076",
    appId: "1:617028484076:web:b70496c44153a829685ec9",
    measurementId: "G-BW6MGJ8R49"
  };

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

//collection ref
const colRef = collection(db, 'books')

//queries
const q = query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(q, (snapshot)=> {
  let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})  
       })
       console.log(books)
   }) 
  

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, 'books', '6qWewc4SEEQme7YnH6bN')

onSnapshot(docRef, (doc)=> {
  console.log(doc.data(), doc.id)
})

// updating a document 
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: updateForm.newTitle.value,
    author: updateForm.newAuthor.value
  })
    .then(() => {
      updateForm.reset()
    })
})

//signing up new users
function signup(){
  const signupForm = document.querySelector(".signup")
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset
    })
    .catch((err) => {
      console.log(err.message)
    })
  })
}
