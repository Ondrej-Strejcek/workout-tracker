import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./style/Workouts.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/core/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const Workouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/workouts")
      .then((res) => {
        setLoading(false);
        setWorkouts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const add_button_handler = () => {
    axios
      .post("/api/workouts/create")
      .then((res) => {
        navigate(`/workouts/${res.data.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.workouts}>
      <div className="container">
        <h1>Last Workouts</h1>
        <Link to="/workouts/stats" className={style.tag}>
          My Stats
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <ul className={style.list}>
            {workouts.map((workout) => (
              <li key={workout.id} className={style.grid}>
                <p>{workout.date}</p>
                <div></div>
                <div>
                  <Link
                    to={`/workouts/${workout.id}`}
                    className={style.tag}
                  >
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        <FontAwesomeIcon className="fixed-btn" onClick={add_button_handler} icon={faPlus} />
      </div>
    </div>
  );
};

export default Workouts;
