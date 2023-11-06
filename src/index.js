import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoQnHLMFSNLkCehUgqz1WGAoPqCGHfUXM",
  authDomain: "hello-world-1e5b3.firebaseapp.com",
  projectId: "hello-world-1e5b3",
  storageBucket: "hello-world-1e5b3.appspot.com",
  messagingSenderId: "341059410805",
  appId: "1:341059410805:web:988135577c2ccde72c113c",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "books");

const q = query(colRef, orderBy("createdAt", "asc"));

// getDocs(colRef)
//   .then((snapshot) => {
//     //   console.log(snapshot.docs);
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((e) => console.log(e));

onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});
// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
