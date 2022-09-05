import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const AddExerciseForm = (props) => {
  const exercise = useRef();
  const reps = useRef();
  const weight = useRef();
  const rpe = useRef();
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("/api/exercises/")
      .then((res) => {
        setExercises(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const on_click_handler = () => {
    console.log(exercise.current.value);
    axios
      .post("/api/exercises/create", {
        workout: props.id,
        exercise: exercise.current.value,
        reps: reps.current.value,
        rpe: rpe.current.value,
        weight: weight.current.value,
      })
      .then((res) => {
        reps.current.value = 0;
        weight.current.value = 0;
        rpe.current.value = 0;
        props.fetch();
        props.dismiss();
      })
      .catch((err) => console.error(err.response.data));
  };

  return (
    <div>
      <h2>Add Excercise</h2>
      <div className="form">
        <div>
          <label htmlFor="excercise">Choose Excercise</label>
          {loading ? (
            <Loading />
          ) : (
            <select ref={exercise} name="excercise" id="excercise">
              {exercises.map(exercise => (
              <option key={exercise.id} value={exercise.id}>{exercise.title}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label htmlFor="reps">Number of Reps</label>
          <input ref={reps} type="number" name="reps" id="reps" />
        </div>

        <div>
          <label htmlFor="weight">Weight</label>
          <input ref={weight} type="number" name="weight" id="weight" />
        </div>

        <div>
          <label htmlFor="rpe">RPE</label>
          <input ref={rpe} type="number" name="rpe" id="rpe" />
        </div>

        <button onClick={on_click_handler} className="btn">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExerciseForm;
