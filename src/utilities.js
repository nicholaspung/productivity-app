export const collectIdsAndDocsFirebase = doc => ({ id: doc.id, ...doc.data() });

export const getTodaysDate = date => date.toString().slice(0, 15);
