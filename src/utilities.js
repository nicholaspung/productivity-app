export const collectIdsAndDocsFirebase = doc => ({ id: doc.id, ...doc.data() });

export const getTodaysDate = date => date.toString().slice(0, 15);
export const getYesterdaysDate = date =>
  new Date(date - 1000 * 60 * 60 * 24).toString().slice(0, 15);
