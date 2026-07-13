import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage } from './firebase';

export const uploadAsset = async (filePath, fileBlob) => {
  try {
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, fileBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error(`Upload failed for ${filePath}:`, error.message);
    throw error;
  }
};

export const deleteAsset = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error(`Deletion failed for ${filePath}:`, error.message);
    throw error;
  }
};
