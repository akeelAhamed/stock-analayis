import React from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import moment from 'moment'

export default class StockChart extends React.Component {

    render() {
        const options = {style: 'currency', currency: 'INR'};
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const configVolume = {
            yAxis: [{
                offset: 20,

                labels: {
                formatter: function () {
                    return numberFormat.format(this.value) 
                }
                ,
                x: -15,
                style: {
                    "color": "#000", "position": "absolute"

                },
                align: 'left'
                },
            },
                
            ],
            tooltip: {
                shared: true,
                formatter: function () {
                return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                }
            },
            plotOptions: {
                series: {
                showInNavigator: true,
                gapSize: 6,

                }
            },
            title: {
                text: `Reliance stock Volume`
            },
            chart: {
                height: 600,
                width : 1000
            },
        
            credits: {
                enabled: false
            },
        
            legend: {
                enabled: true
            },
            xAxis: {
                type: 'date',
            },
            rangeSelector: {
                buttons: [{
                type: 'day',
                count: 1,
                text: '1d',
                }, {
                type: 'day',
                count: 7,
                text: '7d'
                }, {
                type: 'month',
                count: 1,
                text: '1m'
                }, {
                type: 'month',
                count: 3,
                text: '3m'
                },
                {
                type: 'all',
                text: 'All'
                }],
                selected: 4
            },
            
            series: [{
                name: 'RC',
                type: 'spline',
        
                data: this.props.data,
                tooltip: {
                    valueDecimals: 2
                },
        
            }
            ]
        };

        return (
            <div style={{overflow: 'auto',marginBottom: '2em'}}>
                <ReactHighcharts config = {configVolume}></ReactHighcharts>
            </div>
        )
    }
}
