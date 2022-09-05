import React from "react";
import { Link, useParams } from "react-router-dom";
import style from "./style/Workouts.module.css";
import { useState, useEffect, useRef } from "react";
import PopUp from "../../components/core/PopUp";
import axios from "axios";
import Loading from "../../components/core/Loading";
import AddExerciseForm from "../../components/core/AddExerciseForm";
import EditExerciseForm from "../../components/core/EditExerciseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Workout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [edit, setEdit] = useState({show:false});
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState();
  const { id } = useParams();

  useEffect(() => fetch(), []);

  const fetch = () => {
    axios
      .get(`/api/exercises/${id}`)
      .then((res) => {
        setExercises(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const add_button_handler = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={style.workouts}>
      <div className="container">
        <h1>Excercises</h1>
        <Link to="/workouts">
          <FontAwesomeIcon className={style.arrow} icon={faArrowLeft} />
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <ul className={style.list}>
            <li className={`${style.grid} ${style.f_col}`}>
              <p>Exercise</p>
              <p>Weight KG</p>
              <p>Reps</p>
              <p>Rpe</p>
            </li>
            {exercises.map((exercise) => (
              <li onClick={() => {setEdit({show: true, exercise: exercise})}} key={exercise.id} className={`${style.grid} ${style.f_col}`}>
                <p>{exercise.exercise.title}</p>
                <p>{exercise.weight} KG</p>
                <p>{exercise.reps}</p>
                <p>{exercise.rpe}</p>
              </li>
            ))}
          </ul>
        )}

        {showPopup ? (
          <PopUp hide={add_button_handler}>
            <AddExerciseForm
              id={id}
              fetch={fetch}
              dismiss={add_button_handler}
            />
          </PopUp>
        ) : (
          <></>
        )}
        {edit.show ? (
          <PopUp hide={() => {setEdit({show: false})}}>
            <EditExerciseForm
              fetch={fetch}
              record={edit.exercise}
              dismiss={() => {setEdit({show: false})}}
            />
          </PopUp>
        ) : (
          <></>
        )}
        <button onClick={add_button_handler} className="fixed-btn">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Workout;
