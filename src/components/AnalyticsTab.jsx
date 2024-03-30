import { React, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

export default function AnalyticsTab({ itemsByTag }) {

  const [data, setData] = useState();

  useEffect(() => {
    if(itemsByTag){
      setData({
        labels: itemsByTag.tags,
        datasets: [
          {
            data: itemsByTag.nums,
          }
        ]
      });

    }
  }, [itemsByTag]);
  
  return (
    <div className='d-flex justify-content-center'>
      <div style={{height:400, width:400}}>
        {data && 
        <Pie data={data} 
          options={{
            plugins:{
              title:{
                display: true,
                text: "Distribution of Items by Tags",
                font: {
                  size: 20
                }
              }}}}
        />}
            
      </div>

    </div>
  );
}

AnalyticsTab.propTypes = {
  itemsByTag: PropTypes.object,
};