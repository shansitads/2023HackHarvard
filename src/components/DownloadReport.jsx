import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Chart} from 'chart.js/auto';
import { useRef } from 'react';
import firebaseConfig from '../backend/firebase'
import { doc, collection, query, where, getDocs } from 'firebase/firestore';

function DownloadReport() {

    const userData = useRef([]);
    const chartRef = useRef([]);

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

    async function createChart (category) {
        await fetchData("Mood");

        new Chart(chartRef.current, {
            type: 'line', // Specify the chart type
            data: {
              labels: userData.current.map((row) => row.timestamp),
              datasets: [
                {
                  label: category,
                  data: userData.current.map((row) => row.val),
                },
              ],
            }
        })
    }
    
    const downloadReport = () => {
        html2canvas(chartRef.current).then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('Report.pdf');
        });
    };
    
    return (
        <div>
            <canvas ref={chartRef}/>
            <button onClick={() => createChart("Mood")}>Create Chart</button>
            <button onClick={downloadReport}>Download Chart</button>
        </div>
    );
};

export default DownloadReport
