import React from "react";
import { Spinner } from "evergreen-ui";
import Axios from "axios";
import Utill from "../Helper/Utill";
import StockChart from "./Include/StockChart";

export default class Chart extends React.Component
{
  constructor(){
    super();
    this.state = {
        symbole : 'RS',
        data    : null,
        ranges  : {
            today : 'Today',
            _1w   : 'This week',
            _1m   : 'This Month',
            _3m   : '3M',
            _6m   : '6M',
            _1y   : '1Yr',
            _2y   : '2Yr',
            _3y   : '3Yr',
            _5y   : '5Yr',
            _10y  : '10Yr',
            _max  : 'Max'
        },
        range   : '_1y', // 1m
        rangeD  : '_1y', // 1m
        metrics : ['Price', 'SMA50', 'SMA200', 'Volume'],
        rawDatasets: []
    };

    //Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    Axios.defaults.baseURL = 'https://cloud.iexapis.com/stable/';
  }

  getRange(){
    if(this.state.ranges.hasOwnProperty(this.state.range)){
        return this.state.range.replace('_', '');
    }
    this.setState({
        range: this.state.rangeD
    })
    return this.state.rangeD.replace('_', '');
  }

  chart(callback){
    if(Utill.hasChart()){
      Axios.get(Utill.getUrl('stock/'+this.state.symbole+'/batch', 'types=quote,chart&range='+this.getRange()))
      .then((response) => {
        let date = new Date();
        Utill.lsSet('chart', JSON.stringify({
          date: date.getTime(),
          data: response.data
        }));
        callback(response.data);
      })
    }else{
      return callback(Utill.getChart());
    }
  }

  componentDidMount(){
    this.chart((arg) => {
      this.setState({data: arg.data});
    })
  }

  render(){
    if (this.state.data === null) {
        return(<Spinner/>);
    }
    
    return(
      <StockChart style={{height:'100%', width:'100%'}} data={Utill.chartData(this.state.data.chart)} />
    );
  }

}