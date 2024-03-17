import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/student/studentContext";
import { useParams } from "react-router-dom";
import ToCapitalizeWord from "../function/Capitalize";

const UpdateStudent = () => {
  const { id } = useParams();

  const { updatedStd, UpdateStudent } = useContext(StudentContext);
  const [fname, setfname] = useState("");
  const [mname, setmname] = useState("");
  const [lname, setlname] = useState("");
  const [contact, setcontact] = useState("");
  const [DOB, setDOB] = useState(updatedStd.dateOfBirth);
  const initialValue = () => {
    try {
      setfname(updatedStd.name.fname);
      setmname(updatedStd.name.mname);
      setlname(updatedStd.name.lname);
      setcontact(updatedStd.contact);
      setDOB(updatedStd.dateOfBirth);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initialValue();
  }, []);

  function handleSubmit() {
    const dateOfBirth = new Date(DOB);
    const currentDate = new Date();

    if (dateOfBirth > currentDate) {
      alert("This is an invalid date of birth");
      return -1;
    } 
    let newUpdatedStudent = {};
    newUpdatedStudent.name = {
      fname: ToCapitalizeWord(fname),
      mname: ToCapitalizeWord(mname),
      lname: ToCapitalizeWord(lname),
    };
    newUpdatedStudent.contact = contact.trim();
    newUpdatedStudent.dateOfBirth = DOB.trim();
    newUpdatedStudent.rollnumber = id.trim();
    console.log(newUpdatedStudent);
    UpdateStudent(newUpdatedStudent);
  }

  return (
    <>
      <div className="login-form">
        <form className="form" onChange={(e) => e.preventDefault()}>
          <h1 className="form__title">Update Student</h1>
          <div className="form__div">
            <input
              className="form__input"
              name="fname"
              type="text"
              placeholder=""
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
            />
            <label className="form__label" htmlFor="">
              First name
            </label>
          </div>
          {/*  */}
          <div className="form__div">
            <input
              className="form__input"
              name="mname"
              type="text"
              placeholder=""
              value={mname}
              onChange={(e) => setmname(e.target.value)}
              required
            />
            <label className="form__label" htmlFor="">
              Middle Name
            </label>
          </div>
          {/*  */}

          <div className="form__div">
            <input
              className="form__input"
              name="lname"
              type="text"
              placeholder=""
              required
              value={lname}
              onChange={(e) => setlname(e.target.value)}
            />
            <label className="form__label" htmlFor="">
              Last Name
            </label>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              name="contact"
              type="text"
              placeholder=""
              required
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
            />
            <label className="form__label" htmlFor="">
              Contact
            </label>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              name="DOB"
              type="date"
              placeholder=""
              required
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
            />
            <label className="form__label" htmlFor="">
              Date of Birth
            </label>
          </div>
          <div className="form-btn-container">
            <button
              className="form__button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </button>
            <button className="form__button" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateStudent;
