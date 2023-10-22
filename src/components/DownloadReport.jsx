import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Chart} from 'chart.js/auto';
import { useRef } from 'react';
import firebaseConfig from '../backend/firebase'
import { doc, collection, query, where, getDocs } from 'firebase/firestore';

function DownloadReport() {

    const userData = useRef([]);
    const moodRef = useRef([]);
    const sleepyRef = useRef([]);
    const imageDifferenceRef = useRef([]);
    const containerRef = useRef([]);

    const charts = [
        {
          category: 'Mood',
          ref: moodRef
        },
        { 
          category: 'Sleepy',
          ref: sleepyRef
        },
        {
            category: 'ImageDifference',
            ref: imageDifferenceRef
        }
      ];

      function getCharts() {
        charts.forEach(async chart => {

            // Fetch data
            await fetchData(chart.category);
          
            // const ctx = chart.ref.current.getContext('2d');
            
            new Chart(chart.ref.current, {
                type: 'line', // Specify the chart type
                data: {
                  labels: userData.current.map((row) => row.timestamp),
                  datasets: [
                    {
                      label: chart.category,
                      data: userData.current.map((row) => row.val),
                    },
                  ],
                }
            })

            containerRef.current.appendChild(chart.ref.current);
        });
      }

      
      

    const fetchData = async (category) => {
        try {
            const subcollectionRef = collection(firebaseConfig.db, 'users', firebaseConfig.auth.currentUser.uid, 'data');
            const q = query(subcollectionRef, where(category, '!=', null));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userData.current.push({
                    timestamp: doc.data().timestamp,
                    val: doc.data()[category]
                });
            });
            console.log(userData.current);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
    };

    // async function createChart (category, ref) {
    //     await fetchData("Mood");

    //     new Chart(ref.current, {
    //         type: 'line', // Specify the chart type
    //         data: {
    //           labels: userData.current.map((row) => row.timestamp),
    //           datasets: [
    //             {
    //               label: category,
    //               data: userData.current.map((row) => row.val),
    //             },
    //           ],
    //         }
    //     })
    // }
    
    // const downloadReport = (ref) => {
    //     html2canvas(ref.current).then(canvas => {
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const imgData = canvas.toDataURL('image/png');
    //         pdf.addImage(imgData, 'PNG', 10, 10);
    //         pdf.save('Report.pdf');
    //     });
    // };

    function downloadReport() {

        getCharts();
    
        html2canvas(containerRef.current).then(canvas => {
          
          const pdf = new jsPDF('p', 'mm', 'a4'); 
    
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 10, 10);  
          pdf.save('Report.pdf');
    
        });
    }


    return (
        <div>
            <div ref={containerRef}>
                <canvas ref={moodRef}/>
                <canvas ref={sleepyRef}/>
                <canvas ref={imageDifferenceRef}/>
                {/* <button onClick={getCharts}>Create Chart</button> */}
                
            </div>
        <button onClick={downloadReport}>Download Chart</button>
        </div>
    );
};

export default DownloadReport
