import React, { useContext, useState } from "react";
import { GrowthContext } from "../../context/growthChart/growthContext";
import { useParams } from "react-router-dom";
const GrowthTracker = () => {
  const { id } = useParams();
  const gtContext = useContext(GrowthContext);
  const { addGT } = gtContext;
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [vision, setvision] = useState("");
  const [hearing, sethearing] = useState("");
  const [flexibility, setflexibility] = useState("");
  const [posture, setposture] = useState("");
  
  const [cavities, setcavities] = useState("");
  const [gumProblems, setgumProblems] = useState("");

  async function handleGTForm() {
    let date = new Date();
    const newGT = {
      rollnumber: id,
      time: date.toLocaleDateString().toString(),
      height,
      weight,
      vision,
      hearing,
      flexibility,
      posture,      
      dentalHealth: {
        cavities,
        gumProblems,
      },
    };
    let rep = await addGT(newGT);

    if (rep.height && rep.weight) {
      alert("Data saved successfully...");
    } else {
      alert("Data not saved.\nPlease fill all fills");
    }
  }

  return (
    <>
      <div className="login-form">
        <form
          className="form"
          onClick={(e) => {
            e.preventDefault();
            // handleGTForm();
          }}
        >
          <h1 className="form__title">Child Growth Tracker</h1>

          <div className="form__div">
            <input
              className="form__input"
              name="hight"
              type="number"
              placeholder=""
              required
              value={height}
              onChange={(e) => {
                setheight(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Height
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="weight"
              type="number"
              placeholder=""
              required
              value={weight}
              onChange={(e) => {
                setweight(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              weight
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="vision"
              type="number"
              min="0"
              max="10"
              placeholder=""
              required
              value={vision}
              onChange={(e) => {
                setvision(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Vision
            </label>
          </div>
          <div className="form__div">
            <input
              className="form__input"
              name="hearing"
              type="number"
              placeholder=""
              min="0"
              max="10"
              required
              value={hearing}
              onChange={(e) => {
                sethearing(e.target.value);
              }}
            />
            <label className="form__label" htmlFor="">
              Hearing
            </label>
          </div>

          <div className="form__div">
            <select
              className="form__input"
              name="posture"
              value={posture}
              onChange={(e) => setposture(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Bad">Bad</option>
              <option value="Good">Good</option>
              <option value="Perfect">Perfect</option>

              {/* Add more grade options as needed */}
            </select>
            <label className="form__label" htmlFor="grade">
              Posture
            </label>
          </div>
          <div className="form__div">
            <select
              className="form__input"
              name="flexibilty"
              value={flexibility}
              onChange={(e) => setflexibility(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Bad">Bad</option>
              <option value="Good">Good</option>
              <option value="Perfect">Perfect</option>
            </select>
            <label className="form__label" htmlFor="grade">
              Body Flexibility
            </label>
          </div>
         

          <div className="form__div">
            <select
              className="form__input"
              name="flexibilty"
              value={cavities}
              onChange={(e) => setcavities(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Very bad">Very bad</option>
              <option value="Bad">Bad</option>
              <option value="Good">Good</option>
              <option value="Perfect">Perfect</option>
            </select>
            <label className="form__label" htmlFor="grade">
              Teath Cavities
            </label>
          </div>
          <div className="form__div">
            <select
              className="form__input"
              name="flexibilty"
              value={gumProblems}
              onChange={(e) => setgumProblems(e.target.value)}
              required
            >
              <option value="">Select</option>

              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label className="form__label" htmlFor="grade">
              Gum Problems
            </label>
          </div>

          {/*  */}
          <div className="form-btn-container">
            <button
              className="form__button"
              type="submit"
              onClick={handleGTForm}
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

export default GrowthTracker;
