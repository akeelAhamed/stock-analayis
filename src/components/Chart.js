import React from "react";
import { Spinner } from "evergreen-ui";
import Axios from "axios";

export default class Chart extends React.Component
{
  constructor(){
    super();
    this.state = {
        symbole : 'RS',
        data    : null,
        ranges  : {
            today: 'Today',
            _7w  : 'This week',
            _m   : 'This Month',
            _3m  : '3M',
            _6m  : '6M',
            _y   : '1Yr',
            _2   : '2Yr',
            _3   : '3Yr',
            _5   : '5Yr',
            _10  : '10Yr',
        },
        range   : '_y', // 1m
        rangeD  : '_y', // 1m
        metrics : ['Price', 'SMA50', 'SMA200', 'Volume'],
        rawDatasets: []
    };

    //Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    Axios.defaults.baseURL = 'https://cloud.iexapis.com/stable/';
  }

  getUrl(path, query=''){
    query = query === ''?'':'&'+query;
    return '/'+path+'?token=pk_ad3873aa037a47e796cd3ffa97e38ce0'+query;
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
      Axios.get(this.getUrl('stock/'+this.state.symbole+'/batch', 'types=chart&range='+this.getRange()))
      .then((response) => {
        callback(response);
      })
  }

  componentDidMount(){
    this.chart((arg) => {
        this.setState({data: arg});
    })
  }

  render(){
      if (this.state.data === null) {
          return(<Spinner/>);
      }
    return(
      "loading"
    );
  }

}