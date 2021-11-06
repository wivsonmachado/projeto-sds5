import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'Utlis/format';
import { BASE_URL } from 'Utlis/requests';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[]
    };
    series: SeriesData[]
}


function Barchart() {
    
    const [charData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "% Sucesso",
                data: []                   
            }
        ]
    });
    

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then((res) => {
                const data = res.data as SaleSuccess[]
                const myLabels = data.map(x => x.sellerName)
                const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1))

                setChartData({
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Sucesso",
                            data: mySeries                   
                        }
                    ]
                })
            })
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
    /*const mockData = {
        labels: {
            categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
        },
        series: [
            {
                name: "% Sucesso",
                data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
            }
        ]
    };*/


    return (
        <Chart 
            options={{ ...options, xaxis: charData.labels}}
            series={charData.series}
            type='bar'
            height='240'
        />
    );
}

export default Barchart;