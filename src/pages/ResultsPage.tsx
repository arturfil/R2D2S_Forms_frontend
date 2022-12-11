import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import { getPollResults } from "../features/polls/pollSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import ChartDataLables from 'chartjs-plugin-datalabels'; 
import { barOptions, formData, pieOptions } from "../helpers/chartDataResults";
import { Form } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);
ChartJS.register(
  ChartDataLables,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultsPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pollResults } = useAppSelector((state) => state.poll);
  const [data, setData] = useState<any>([]);
  const [chart, setChart] = useState(true);

  useEffect(() => {
    if (!id) return;
    dispatch(getPollResults(id));
  }, []);

  useEffect(() => {
    let obj = formData(pollResults?.results);
    if (!obj) return;
    setData(obj)
  }, [pollResults])

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h2>{pollResults?.content}</h2>
        <div>
        <h5>Pie Chart - Bar Chart</h5>
        <Form.Check
          onChange={() => setChart(!chart)}
          checked={chart}
          type="switch"
        />{" "}
      </div>
        </div>
      <div style={{maxWidth: "500px", display: "flex", margin: "40px auto"}}>
        {data.length > 0 && (
          <div style={{height: "50px!important"}}>
            {data.map((d:any) => (
              <div key={d.questionId}>
                <p style={{marginTop: "40px"}}>
                  {d.title}
                </p>
                {chart ? (
                  <Bar options={barOptions} data={d.data}/>
                ) : (
                  <Pie options={pieOptions} data={d.data}/>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
