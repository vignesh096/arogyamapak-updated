// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { StudentContext } from "../../context/student/studentContext";
// import Chart from "react-apexcharts";
// import { GrowthContext } from "../../context/growthChart/growthContext";
// import OverviewCard from "../card/OverviewCard";
// import Suggection from "../Suggection";
// const GTOverview = () => {
//   const gtContext = useContext(GrowthContext);
//   const { getAllDataByID } = gtContext;
//   const { id } = useParams();
//   const GTstdContext = useContext(StudentContext);
//   const { studentInfo } = GTstdContext;
//   const [student, setStudent] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [time, setTime] = useState([]);
//   const [weight, setWeight] = useState([]);
//   const [height, setHeight] = useState([]);
//   const [bmi, setBMI] = useState([]);
//   const [chWeight, setChWeight] = useState({});
//   const [chHeight, setChHeight] = useState({});
//   const [chBMI, setChBMI] = useState({});
//   const [vision, setvision] = useState({});
//   const [hearing, sethearing] = useState({});

//   const [chhearing, setchhearing] = useState({});
//   const [chvision, setchvision] = useState({});
//   const [GTreport, setGTreport] = useState([]);
// const [load,setload]=useState(true);
//   async function fetchAlldata() {
//     try {
//       let report = await getAllDataByID(id);
//       setGTreport(report);

//       const times = [];
//       const weights = [];
//       const heights = [];
//       const bmis = [];
//       const visions = [];
//       const hearings = [];

//       report.forEach((ele) => {
//         times.push(ele.time);
//         weights.push(ele.weight);
//         heights.push(ele.height);
//         bmis.push(ele.bmi);
//         visions.push(ele.vision);
//         hearings.push(ele.hearing);
//       });

//       setTime(times);
//       setWeight(weights);
//       setHeight(heights);
//       setBMI(bmis);
//       sethearing(hearings);
//       setvision(visions);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     setChHeight({
//       options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: time },
//       },
//       series: [{ name: "Height in cm", data: height }],
//     });
//     setChWeight({
//       options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: time },
//       },
//       series: [{ name: "Weight in KG", data: weight }],
//     });
//     setChBMI({
//       options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: time },
//       },
//       series: [{ name: "BMI", data: bmi }],
//     });
//     setchhearing({
//       options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: time },
//       },
//       series: [{ name: "Hearing", data: hearing }],
//     });
//     setchvision({
//       options: {
//         chart: { id: "basic-bar" },
//         xaxis: { categories: time },
//       },
//       series: [{ name: "Vision", data: vision }],
//     });
//     setload(false);
//   }, [time, weight, height, bmi, vision, hearing]);

//   const fetchStudent = async () => {
//     try {
//       let std = await studentInfo(id);
//       setStudent(std);
//     } catch (error) {
//       console.error("Error fetching student:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAlldata();
//     fetchStudent();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if(load)
// {
//   return <div>Loading...</div>;
// }
//   if (GTreport.length <= 0) {
//     return (
//       <>
//         <h1>No Data Found</h1>
//         <button className="btn-No-data-found">
//           <Link
//             className="Link btn-content"
//             to={`/growthtracker/add/${student.rollnumber}`}          >
//             Add Growth Info
//           </Link>
//         </button>
//       </>
//     );
//   }

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Link
//           className="Link btn-content"
//           to={`/growthtracker/add/${student.rollnumber}`}
//         >
//           Add Growth Info
//         </Link>
//       </div>
//       <div className="chart-container">
//         <div className="chart">
//           <p>Height</p>
//           <div className="mixed-chart ">
//             <Chart
//               options={chHeight.options}
//               series={chHeight.series}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//         <div className="chart">
//           <p>Weight</p>
//           <div className="mixed-chart ">
//             <Chart
//               options={chWeight.options}
//               series={chWeight.series}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//         <div className="chart">
//           <p>BMI</p>
//           <div className="mixed-chart ">
//             <Chart
//               options={chBMI.options}
//               series={chBMI.series}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//         <div className="chart">
//           <p>Vision</p>
//           <div className="mixed-chart ">
//             <Chart
//               options={chvision.options}
//               series={chvision.series}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//         <div className="chart">
//           <p>Hearing</p>
//           <div className="mixed-chart ">
//             <Chart
//               options={chhearing.options}
//               series={chhearing.series}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="card-flex">
//         <OverviewCard
//           title="Flexibility"
//           data={GTreport[GTreport.length - 1].flexibility}
//         />
//         <OverviewCard
//           title="Posture"
//           data={GTreport[GTreport.length - 1].posture}
//         />
//         <OverviewCard
//           title="Cavities"
//           data={GTreport[GTreport.length - 1].dentalHealth.cavities}
//         />
//         <OverviewCard
//           title="Gum Problems"
//           data={GTreport[GTreport.length - 1].dentalHealth.gumProblems}
//         />
//       </div>
//       {/* <div className="dental-health__container">
//         <section>
//           <h1 className="dental-health-title">Dental Health</h1>
//           <div className="dental-health__body">
//             <OverviewCard
//               title="Cavities"
//               data={
//                 GTreport[GTreport.length - 1].dentalHealth.cavities !== ""
//                   ? GTreport[GTreport.length - 1].dentalHealth.cavities
//                   : "Null"
//               }
//             />
//             <OverviewCard
//               title="Gum Problems"
//               data={
//                 GTreport[GTreport.length - 1].dentalHealth.gumProblems === ""
//                   ? "Null"
//                   : GTreport[GTreport.length - 1].dentalHealth.gumProblems
//               }
//             />
//           </div>
//         </section>
//       </div> */}
//       <Suggection/>
//     </>
//   );
// };

// export default GTOverview;

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StudentContext } from "../../context/student/studentContext";
import Chart from "react-apexcharts";
import { GrowthContext } from "../../context/growthChart/growthContext";
import OverviewCard from "../card/OverviewCard";
import Suggection from "../Suggection";
const GTOverview = () => {
  const gtContext = useContext(GrowthContext);
  const { getAllDataByID } = gtContext;
  const { id } = useParams();
  const GTstdContext = useContext(StudentContext);
  const { studentInfo } = GTstdContext;
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState([]);
  const [bmi, setBMI] = useState([]);
  const [vision, setvision] = useState({});
  const [hearing, sethearing] = useState({});

  // const [chWeight, setChWeight] = useState({});
  // const [chHeight, setChHeight] = useState({});
  // const [chBMI, setChBMI] = useState({});
  // const [chhearing, setchhearing] = useState({});
  // const [chvision, setchvision] = useState({});
  const [GTreport, setGTreport] = useState([]);
  const [load, setload] = useState(true);
  const [chartsData, setChartsData] = useState({
    height: {},
    weight: {},
    bmi: {},
    vision: {},
    hearing: {},
  });

  async function fetchAlldata() {
    try {
      let report = await getAllDataByID(id);
      setGTreport(report);

      const newData = {
        height: {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: time } },
          series: [{ name: "Height in cm", data: [] }],
        },
        weight: {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: time } },
          series: [{ name: "Weight in KG", data: [] }],
        },
        bmi: {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: time } },
          series: [{ name: "BMI", data: [] }],
        },
        vision: {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: time } },
          series: [{ name: "Vision", data: [] }],
        },
        hearing: {
          options: { chart: { id: "basic-bar" }, xaxis: { categories: time } },
          series: [{ name: "Hearing", data: [] }],
        },
      };

      report.forEach((ele) => {
        newData.height.series[0].data.push(ele.height);
        newData.weight.series[0].data.push(ele.weight);
        newData.bmi.series[0].data.push(ele.bmi);
        newData.vision.series[0].data.push(ele.vision);
        newData.hearing.series[0].data.push(ele.hearing);
      });

      setChartsData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    setChartsData((prevData) => ({
      ...prevData,
      height: {
        ...prevData.height,
        series: [{ name: "Height in cm", data: height }],
      },
      weight: {
        ...prevData.weight,
        series: [{ name: "Weight in KG", data: weight }],
      },
      bmi: { ...prevData.bmi, series: [{ name: "BMI", data: bmi }] },
      vision: {
        ...prevData.vision,
        series: [{ name: "Vision", data: vision }],
      },
      hearing: {
        ...prevData.hearing,
        series: [{ name: "Hearing", data: hearing }],
      },
    }));
    setload(false);
  }, [time, weight, height, bmi, vision, hearing]);

  const fetchStudent = async () => {
    try {
      let std = await studentInfo(id);
      setStudent(std);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlldata();
    fetchStudent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (load) {
    return <div>Loading...</div>;
  }
  if (GTreport.length <= 0) {
    return (
      <>
        <h1>No Data Found</h1>
        {localStorage.getItem("token") ? (
          <button className="btn-No-data-found">
            <Link
              className="Link btn-content"
              to={`/growthtracker/add/${student.rollnumber}`}
            >
              Add Growth Info
            </Link>
          </button>
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <>
      <div className="std-info__container">
        <div className="std-info-box">
          <span className="info-lable">Student Information</span>
          <div className="roll-num">
            <h1>
              {"Roll Number is "}
              <span className="show-different">
                {parseInt(student.rollnumber) < 10
                  ? "0" + student.rollnumber
                  : student.rollnumber}
              </span>
            </h1>
          </div>
          <div className="std-name">
            <h1>
              {"Name of Student "}
              <span className="show-different">
                {student.name.fname +
                  " " +
                  student.name.mname +
                  " " +
                  student.name.lname}
              </span>
            </h1>
          </div>
        </div>
      </div>
      {localStorage.getItem("token") ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            className="Link btn-content"
            to={`/growthtracker/add/${student.rollnumber}`}
          >
            Add Growth Info
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="chart-container">
        <div className="chart">
          <p>Height</p>
          <div className="mixed-chart ">
            <Chart
              options={chartsData.height.options}
              series={chartsData.height.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Weight</p>
          <div className="mixed-chart ">
            <Chart
              options={chartsData.weight.options}
              series={chartsData.weight.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>BMI</p>
          <div className="mixed-chart ">
            <Chart
              options={chartsData.bmi.options}
              series={chartsData.bmi.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Vision</p>
          <div className="mixed-chart ">
            <Chart
              options={chartsData.vision.options}
              series={chartsData.vision.series}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="chart">
          <p>Hearing</p>
          <div className="mixed-chart ">
            <Chart
              options={chartsData.hearing.options}
              series={chartsData.hearing.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
      <div className="card-flex">
        <OverviewCard
          title="Flexibility"
          data={GTreport[GTreport.length - 1].flexibility}
        />
        <OverviewCard
          title="Posture"
          data={GTreport[GTreport.length - 1].posture}
        />
        <OverviewCard
          title="Cavities"
          data={GTreport[GTreport.length - 1].dentalHealth.cavities}
        />
        <OverviewCard
          title="Gum Problems"
          data={GTreport[GTreport.length - 1].dentalHealth.gumProblems}
        />
      </div>
      {/* <div className="dental-health__container">
        <section>
          <h1 className="dental-health-title">Dental Health</h1>
          <div className="dental-health__body">
            <OverviewCard
              title="Cavities"
              data={
                GTreport[GTreport.length - 1].dentalHealth.cavities !== ""
                  ? GTreport[GTreport.length - 1].dentalHealth.cavities
                  : "Null"
              }
            />
            <OverviewCard
              title="Gum Problems"
              data={
                GTreport[GTreport.length - 1].dentalHealth.gumProblems === ""
                  ? "Null"
                  : GTreport[GTreport.length - 1].dentalHealth.gumProblems
              }
            />
          </div>
        </section>
      </div> */}
      <Suggection />
    </>
  );
};

export default GTOverview;
