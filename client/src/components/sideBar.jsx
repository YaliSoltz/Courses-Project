import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../helpers/userContext";

const SideBar = () => {
  const { user, deleteCourse, setCourse } = useContext(UserContext);
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>
        {user.courses ? "course" : "you dont registred to any course"}{" "}
      </h2>
      {user.courses ? (
        <div
          style={{
            gap: 15,
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            height: "32rem",
            paddingLeft: 50,
          }}
        >
          {user.courses.map((course, index) => (
            <div key={index} className="card" style={{ width: "14rem" }}>
              <Link to="/myCourses">
                <img
                  onClick={() => setCourse(course)}
                  style={{ width: "100%", height: 120 }}
                  src={course.img}
                  className="card-img-top"
                  alt="..."
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{course.subject}</h5>
                <p className="card-text">rating: {course.rating}</p>
                <p className="card-text">level: {course.level}</p>
                <Link
                  to="/myCourses"
                  onClick={() => {
                    deleteCourse(course.subject_id);
                    setCourse();
                  }}
                >
                  <button type="button" class="btn btn-secondary">
                    <span class="badge text-bg-danger">&#x2715;</span>
                    Exit course
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
