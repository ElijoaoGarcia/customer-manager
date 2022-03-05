import { Base, db } from "./connect";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";

export interface Customer {
  uid: string;
  name: string;
  lastName: string;
  phoneNumber: string;
}

export default class CustomerService {
  collectionName = "customers";

  getOb(func: (value: QuerySnapshot<DocumentData>) => void) {
    const ref = collection(db, this.collectionName);
    return onSnapshot(ref, func);
  }

  async create(data: Customer) {
    try {
      if (!data) {
        return "missingValue";
      }

      const ref = collection(db, this.collectionName);
      const create = await addDoc(ref, data);
      return create.id;
    } catch (error) {
      console.log(error);
      return "systemError";
    }
  }

  async updateById(id: string, data: Customer) {
    try {
      if (!id || !data) {
        return "missingValue";
      }

      const ref = doc(db, this.collectionName, id);
      return await updateDoc(ref, { ...data });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async isPhoneNumberAvailable(phoneNumber: string) {
    try {
      if (!phoneNumber) {
        return "missingValue";
      }

      const ref = collection(db, this.collectionName);
      const queryRef = query(ref, where("phoneNumber", "==", phoneNumber));
      const data = await getDocs(queryRef);
      if (data.empty) {
        return "ok";  
      }
      
      return "unavailable";
    } catch (error) {
      console.log(error);
      return error;
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
