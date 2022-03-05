import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "../enviroment";

const fireApp = initializeApp(firebaseConfig);

const db = getFirestore(fireApp);

const phoneNumberPipe = (phoneNumber: string) => {
  if (phoneNumber.length === 10) {
    return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
      3,
      6
    )}-${phoneNumber.substring(6, 10)}`;
  }
  return `${phoneNumber.substring(0, 4)}-${phoneNumber.substring(
    4,
    7
  )}-${phoneNumber.substring(7, 11)}`;
};

const replaceSpecialChars = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

class Base {
  collectionName = "";

  async get() {
    try {
      const ref = collection(db, this.collectionName);
      const data = await getDocs(ref);
      if (data.empty) {
        return "noContent";
      }
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.log(err);
      return "systemError";
    }
  }

  async getById(id: string) {
    try {
      if (!id) {
        return "missingValue";
      }

      const ref = doc(db, this.collectionName, id);
      const data = await getDoc(ref);
      if (!data.exists) {
        return "notFound";
      }
      return { ...data.data(), id: data.id };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteById(id: string) {
    try {
      if (!id) {
        return "missingValue";
      }

      const ref = doc(db, this.collectionName, id);
      await deleteDoc(ref);
      return "ok";
    } catch (error) {
      console.log(error);
      return "systemError";
    }
  }
}

export { fireApp, db, Base, phoneNumberPipe, replaceSpecialChars };
