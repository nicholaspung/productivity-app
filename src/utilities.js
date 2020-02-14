export const collectIdsAndDocsFirebase = doc => ({ id: doc.id, ...doc.data() });

export const getTodaysDate = date => date.toString().slice(0, 15);
export const getYesterdaysDate = date =>
  new Date(date - 1000 * 60 * 60 * 24).toString().slice(0, 15);
export const getSelectedMonth = date => date.toString().slice(4, 8);
export const getSpecificDate = date => date.toString().slice(8, 11);

export const changeDatesToHabitsArray = days => {
  if (!days) {
    return null;
  }
  let habits = [];
  days.forEach(day => {
    day.habits
      .filter(habit => habit.done)
      .forEach(habit => {
        let findHabit = habits.find(el => el.name === habit.name);
        if (findHabit) {
          findHabit.dates.push(day.date);
        } else {
          habits.push({
            name: habit.name,
            description: habit.description,
            dates: [day.date]
          });
        }
      });
  });

  return habits;
};
