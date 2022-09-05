import React, {  useRef, useState } from "react";
import axios from "axios";

const AddExerciseForm = (props) => {
  const reps = useRef();
  const weight = useRef();
  const rpe = useRef();


  const on_click_handler = () => {
    axios
      .put(`/api/exercises/${props.record.id}`, {
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

  const on_delete_handler = () => {
    axios
      .delete(`/api/exercises/${props.record.id}`)
      .then(() => {
        props.fetch();
        props.dismiss();
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h2>Edit Excercise</h2>
      <div className="form">
        <div>
         <h3>{props.record.exercise.title}</h3> 
        </div>

        <div>
          <label htmlFor="reps">Number of Reps</label>
          <input ref={reps} type="number" name="reps" id="reps" defaultValue={props.record.reps}/>
        </div>

        <div>
          <label htmlFor="weight">Weight</label>
          <input ref={weight} type="number" name="weight" id="weight" defaultValue={props.record.weight} />
        </div>

        <div>
          <label htmlFor="rpe">RPE</label>
          <input ref={rpe} type="number" name="rpe" id="rpe" defaultValue={props.record.rpe} />
        </div>

        <button onClick={on_click_handler} className="btn">
          Edit
        </button>
        <button onClick={on_delete_handler} className="btn">
          Delete 
        </button>

      </div>
    </div>
  );
};

export default AddExerciseForm;
