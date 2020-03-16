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
        let findHabit = habits.find(el => el.id === habit.id);
        if (findHabit) {
          findHabit.dates.push(day.date);
        } else {
          habits.push({
            id: habit.id,
            name: habit.name,
            description: habit.description,
            dates: [day.date],
            createdAt: habit.createdAt
          });
        }
      });
  });

  return sortOldToNewHabitTodo(habits);
};
export const sortOldToNewHabitTodo = arr => {
  return arr.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
};
export const sortOrderHabitTodo = arr => {
  return arr.sort((a, b) => a.order - b.order);
};
