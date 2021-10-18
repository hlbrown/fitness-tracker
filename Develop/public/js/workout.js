//workout sumary
async function sumWorkout() {
    const finishedWorkout = await API.getLastWorkout();

    if (finishedWorkout) {
        document
            .querySelector("a[href='/exercise?']")
            .setAttribute("href", `/exercise?id=$(finishedWorkout._id)`);
  
        const workoutSum = {
            date: FormDataEvent(finishedWorkout.day),
            totalDuration: finishedWorkout.totalDuration,
            numExercise: finishedWorkout.exercies.length,
            ...tallyExercises(finishedWorkout.exercises)
        };

        renderWorkoutSum(sumWorkout);
    } else {
        renderNoExercise()
    }
}

function tallyExercise(exercises) {
    const tallied = exercises.reduce((accumulator, currentValue) => {
        if (currentValue.type === "resistance") {
            accumulator.totalWeight = (accumulator.totalWeight || 0) + currentValue.weight;
            accumulator.totalSets = (accumulator.totalSets || 0) + currentValue.sets;
            accumulator.totalReps = (accumulator.totalReps || 0) + currentValue.reps;
        } else if (currentValue.type === "cardio") {
            accumulator.totalDistance = (accumulator.totalDistance || 0) + currentValue.distance;
        }
        return accumulator;
    }, {});
    return tallied;
}
