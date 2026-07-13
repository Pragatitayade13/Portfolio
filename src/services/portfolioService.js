import { 
  collection, 
  getDocs, 
  getDoc,
  setDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Collections names constants
export const COLLECTIONS = {
  PORTFOLIO_SETTINGS: 'portfolioSettings',
  PROFILE: 'profile',
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILL_CATEGORIES: 'skillCategories',
  EXPERIENCES: 'experiences',
  EDUCATION: 'education',
  CERTIFICATES: 'certificates',
  PUBLICATIONS: 'publications',
  RESUME: 'resume',
  SOCIAL_LINKS: 'socialLinks',
  CONTACT_SETTINGS: 'contactSettings',
  ADMIN_USERS: 'adminUsers',
  AUDIT_LOGS: 'auditLogs'
};

// Fixed documents mapping
export const FIXED_DOCUMENTS = {
  PROFILE: { col: COLLECTIONS.PROFILE, id: 'main' },
  ABOUT: { col: COLLECTIONS.ABOUT, id: 'main' },
  RESUME: { col: COLLECTIONS.RESUME, id: 'main' },
  PORTFOLIO_SETTINGS: { col: COLLECTIONS.PORTFOLIO_SETTINGS, id: 'main' },
  CONTACT_SETTINGS: { col: COLLECTIONS.CONTACT_SETTINGS, id: 'main' }
};

// ─── VALIDATION HELPERS ───────────────────────────────────────────

/**
 * Validates list record metadata fields.
 */
export const validateListRecord = (data, isUpdate = false) => {
  const errors = [];
  if (!isUpdate) {
    if (data.id === undefined || data.id === null) {
      errors.push("Missing required metadata field: 'id'");
    }
    if (data.published === undefined || data.published === null) {
      errors.push("Missing required metadata field: 'published'");
    }
    if (data.sortOrder === undefined || data.sortOrder === null) {
      errors.push("Missing required metadata field: 'sortOrder'");
    }
  }
  return errors;
};

/**
 * Checks project slug uniqueness in Firestore.
 */
export const validateProjectSlug = async (slug, excludeDocId = null) => {
  if (!slug) return { isValid: false, error: 'Slug is required' };
  
  try {
    const colRef = collection(db, COLLECTIONS.PROJECTS);
    const q = query(colRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    const duplicates = querySnapshot.docs.filter(d => d.id !== excludeDocId);
    if (duplicates.length > 0) {
      return { isValid: false, error: `Duplicate slug error: '${slug}' is already taken.` };
    }
    return { isValid: true };
  } catch (error) {
    console.error('Slug validation failed:', error.message);
    throw error;
  }
};

// ─── CORE PORTFOLIO API CRUD FUNCTIONS ─────────────────────────────

/**
 * Reads a single document from a collection.
 */
export const readDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { firebaseId: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error reading doc ${collectionName}/${docId}:`, error.message);
    throw error;
  }
};

/**
 * Reads all documents from a collection.
 */
export const readCollection = async (collectionName, orderField = 'sortOrder') => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy(orderField, 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(d => ({
      firebaseId: d.id,
      ...d.data()
    }));
  } catch (error) {
    console.error(`Error reading collection ${collectionName}:`, error.message);
    throw error;
  }
};

/**
 * Queries only published documents in a collection.
 */
export const getPublishedRecords = async (collectionName, orderField = 'sortOrder') => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(
      colRef, 
      where('published', '==', true), 
      orderBy(orderField, 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(d => ({
      firebaseId: d.id,
      ...d.data()
    }));
  } catch (error) {
    console.error(`Error querying published in ${collectionName}:`, error.message);
    throw error;
  }
};

/**
 * Creates a record. Generates a document ID or uses a specified one.
 */
export const createRecord = async (collectionName, itemData, docId = null) => {
  // Validate metadata fields for lists
  const isFixedDoc = Object.values(FIXED_DOCUMENTS).some(
    fd => fd.col === collectionName && fd.id === docId
  );
  
  if (!isFixedDoc) {
    const validationErrors = validateListRecord(itemData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation Error: ${validationErrors.join(', ')}`);
    }
  }

  // If project, check slug uniqueness
  if (collectionName === COLLECTIONS.PROJECTS && itemData.slug) {
    const slugCheck = await validateProjectSlug(itemData.slug, docId);
    if (!slugCheck.isValid) {
      throw new Error(slugCheck.error);
    }
  }

  try {
    const dataWithTimestamps = {
      ...itemData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (docId) {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, dataWithTimestamps);
      return { firebaseId: docId, ...dataWithTimestamps };
    } else {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, dataWithTimestamps);
      return { firebaseId: docRef.id, ...dataWithTimestamps };
    }
  } catch (error) {
    console.error(`Error creating record in ${collectionName}:`, error.message);
    throw error;
  }
};

/**
 * Updates an existing record.
 */
export const updateRecord = async (collectionName, docId, itemData) => {
  const isFixedDoc = Object.values(FIXED_DOCUMENTS).some(
    fd => fd.col === collectionName && fd.id === docId
  );

  if (!isFixedDoc) {
    const validationErrors = validateListRecord(itemData, true);
    if (validationErrors.length > 0) {
      throw new Error(`Validation Error: ${validationErrors.join(', ')}`);
    }
  }

  if (collectionName === COLLECTIONS.PROJECTS && itemData.slug) {
    const slugCheck = await validateProjectSlug(itemData.slug, docId);
    if (!slugCheck.isValid) {
      throw new Error(slugCheck.error);
    }
  }

  try {
    const dataWithTimestamp = {
      ...itemData,
      updatedAt: serverTimestamp()
    };
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, dataWithTimestamp);
  } catch (error) {
    console.error(`Error updating record ${collectionName}/${docId}:`, error.message);
    throw error;
  }
};

/**
 * Deletes a record.
 */
export const deleteRecord = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting record ${collectionName}/${docId}:`, error.message);
    throw error;
  }
};

/**
 * Batch imports documents to avoid multiple round-trips.
 */
export const batchImport = async (collectionName, itemsList, docIdSelector = null) => {
  try {
    const batch = writeBatch(db);
    
    itemsList.forEach((item) => {
      const docId = docIdSelector ? docIdSelector(item) : null;
      const docRef = docId 
        ? doc(db, collectionName, docId) 
        : doc(collection(db, collectionName));
      
      const payload = {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      batch.set(docRef, payload);
    });
    
    await batch.commit();
  } catch (error) {
    console.error(`Error committing batch import for ${collectionName}:`, error.message);
    throw error;
  }
};
