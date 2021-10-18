//workout sumary
async function sumWorkout() {
    const lastWorkout = await API.getLastWorkout();

    if (lastWorkout) {
        document
            .querySelector("a[href='/exercise?']")
            .setAttribute("href", `/exercise?id=$(lastWorkout._id)`);
  
        const workoutSum = {
            date: formatDate(lastWorkout.day),
            totalDuration: lastWorkout.totalDuration,
            numExercise: lastWorkout.exercies.length,
            ...tallyExercises(lastWorkout.exercises)
        };

        renderWorkoutSum(workoutSum);
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

//converting time to readable format
function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(date).toLocaleDateString(options);
}

//renders the workout summary
function renderFinishedWorkoutSum(summary) {
    const container = document.querySelector(".workout-stats");

    const workoutKeyMap = {
        date: "Date",
        totalDuration: "Total Workout Duration",
        numExercises: "Exercises",
        totalWeight: "Total Weight Lifted",
        totalSets: "Sets",
        totalReps: "Reps",
        totalDistance: "Distance"
    };

    Object.keys(summary).forEach(key => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = workoutKeyMap[key];
        const textNode = document.createTextNode(`: ${summary[key]}`);

        p.appendChild(strong);
        p.appendChild(textNode);

        container.appendChild(p);
    });
    
}

function renderNoExercise() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement.createElement("strong");

    strong.textContent = "No Excercise Entered"

    p.appendChild(strong);
    container.appendChild(p);
}

sumWorkout();