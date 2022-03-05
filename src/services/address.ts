import { Base, db } from "./connect";
import { doc, collection, addDoc, updateDoc, onSnapshot, QuerySnapshot, DocumentData, query, where, deleteDoc } from "firebase/firestore";

export interface Address {
  id: string;
  uid: string;
  alias: string;
  street: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  addressReference: string;
}

export default class AddressService{
  collectionName = "address";

  getOb(uid: string, func: (value: QuerySnapshot<DocumentData>) => void) {
    const ref = collection(db, this.collectionName);
    const queryRef = query(ref, where('uid', '==', uid));
    return onSnapshot(queryRef, func);
  }

  async create(uid: string, data: Address) {
    try {
      if (!uid || !data) {
        return "missingValue";
      }

      const ref = collection(db, this.collectionName);
      const create = await addDoc(ref, data);
      return create.id;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateById(id: string, data: Address) {
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
