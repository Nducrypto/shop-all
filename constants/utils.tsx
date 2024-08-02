import {Dimensions, StatusBar} from 'react-native';
import * as firebase from '../components/config/firebase';

export const createInDatabase = async (url: string, requestData: any) => {
  try {
    const productCollections = firebase.collection(firebase.firestore, url);
    const newDocument = await firebase.addDoc(productCollections, requestData);

    return newDocument.id;
  } catch (error) {
    throw error;
  }
};

export const removeInDatabase = async (url: string, docId: string) => {
  try {
    const productDocumentRef = firebase.doc(firebase.firestore, url, docId);
    await firebase.deleteDoc(productDocumentRef);
    return true;
  } catch (error) {
    throw error;
  }
};

export function mergeSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number,
): T[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(
    mergeSort(left, compareFn),
    mergeSort(right, compareFn),
    compareFn,
  );
}

function merge<T>(
  left: T[],
  right: T[],
  compareFn: (a: T, b: T) => number,
): T[] {
  const result: T[] = [];
  let leftIndex: number = 0;
  let rightIndex: number = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) < 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = 16 * 3.5 + (StatusHeight || 0);
export const {width, height} = Dimensions.get('screen');
