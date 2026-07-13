import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

// Collections names constants
const COLLECTIONS = {
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  PUBLICATIONS: 'publications'
};

// Generic read
export const getPortfolioCollection = async (collectionName, orderField = 'id') => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy(orderField, 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error.message);
    throw error;
  }
};

// Generic create
export const addPortfolioItem = async (collectionName, itemData) => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, itemData);
    return { firebaseId: docRef.id, ...itemData };
  } catch (error) {
    console.error(`Error adding item to ${collectionName}:`, error.message);
    throw error;
  }
};

// Generic update
export const updatePortfolioItem = async (collectionName, firebaseId, itemData) => {
  try {
    const docRef = doc(db, collectionName, firebaseId);
    await updateDoc(docRef, itemData);
  } catch (error) {
    console.error(`Error updating item in ${collectionName}:`, error.message);
    throw error;
  }
};

// Generic delete
export const deletePortfolioItem = async (collectionName, firebaseId) => {
  try {
    const docRef = doc(db, collectionName, firebaseId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting item from ${collectionName}:`, error.message);
    throw error;
  }
};

export { COLLECTIONS };
