import React, {useEffect,  useState} from "react";
import ReactWordcloud from 'react-wordcloud';
import "./EmployeeStatistic.css"

const EmployeeStatistic = () =>{
    const [employeeData, setEmployeeData] = useState([]);

    const getEmployeeRate = () => {
        if (employeeData.length > 0){
            console.log(employeeData.reduce(function (acc, obj) { return acc + obj.value; }, 0));
        
            return (employeeData.reduce(function (acc, obj) { return acc + obj.value; }, 0) / 76 * 100).toFixed(2);
        }
     
        else {return 0;}

    }

      
    useEffect(()=>{

        fetch('https://api.recruitdsm.ga/api/employee', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            setEmployeeData(res.employees);

        });
    
        }, []);

        const options = {
            colors: ['#4356E0', '#36AEEB', '#8C1EE0', '#7A68E0', '#1B3B5C', '#83C9EE', '#4F18F0', '#5B27E7'],
            enableTooltip: true,
            deterministic: false,
            fontFamily: 'Do Hyeon, sans-serif',
            fontSizes: [30, 40],
            fontStyle: 'normal',
            fontWeight: 'normal',
            padding: 1,
            rotations: 3,
            rotationAngles: [0, 30],
            scale: 'sqrt',
            spiral: 'archimedean',
            transitionDuration: 500,
          };

    return (
        <div id="word-cloud-wrapper">
        <ReactWordcloud words={employeeData} options={options}/>
        <p id="rate-span">{getEmployeeRate()}%</p>
        <p id="date-span">{new Date().toLocaleString().slice(0,12)} 기준</p>
      </div>
        
    )
}

export default EmployeeStatistic;