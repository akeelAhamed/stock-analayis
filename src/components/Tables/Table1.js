import React from "react";
import { Pane, Heading, Card, Table} from 'evergreen-ui';

export default class Table1 extends React.Component
{
    constructor(){
        super();
        this.head = {
            "FIELD1": "Date",
            "FIELD2": "No. Of Shares",
            "AVG": "Price per share",
            "price": "Total Price for share",
            "FIELD5": "Cost of Brokerage",
            "FIELD6": "Total Buying Cost"
        };

        this.data = [
 {
   "Date": "20/10/20",
   "No. Of Shares": 4,
   "Price per share": 2164.95,
   "Total Price for share": 8659.8,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 9006.192
 },
 {
   "Date": "29/10/20",
   "No. Of Shares": 1,
   "Price per share": 1996.35,
   "Total Price for share": 1996.35,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 2076.204
 },
 {
   "Date": "29/10/20",
   "No. Of Shares": 2,
   "Price per share": 1996.35,
   "Total Price for share": 3992.7,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 4152.408
 },
 {
   "Date": "20/10/20",
   "No. Of Shares": 1,
   "Price per share": 2164.95,
   "Total Price for share": 2164.95,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 2251.548
 },
 {
   "Date": "20/10/20",
   "No. Of Shares": 3,
   "Price per share": 2164.95,
   "Total Price for share": 6494.85,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 6754.644
 },
 {
   "Date": "29/10/20",
   "No. Of Shares": 3,
   "Price per share": 1993.8,
   "Total Price for share": 5981.4,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 6220.656
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 3,
   "Price per share": 1971.95,
   "Total Price for share": 5915.85,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 6152.484
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 3,
   "Price per share": 1965,
   "Total Price for share": 5895,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 6130.8
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 3,
   "Price per share": 1964.75,
   "Total Price for share": 5894.25,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 6130.02
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 5,
   "Price per share": 1946,
   "Total Price for share": 9730,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 10119.2
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 5,
   "Price per share": 1940,
   "Total Price for share": 9700,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 10088
 },
 {
   "Date": "2/11/2020",
   "No. Of Shares": 3,
   "Price per share": 1873.55,
   "Total Price for share": 5620.65,
   "Cost of Brokerage": 0.04,
   "Total Buying Cost": 5845.476
 }
        ]
    }

    getHead(){
        let head = [];
        for (const key in this.head) {
            const element = this.head[key];
            head.push(
                (<Table.TextHeaderCell key={key}>
                {element}
                </Table.TextHeaderCell>)
            )
        }
        return head;
    }

    getRow(data, i){
        console.log(data, i);
        let body = [<Table.TextCell>{++i}</Table.TextCell>];
        for (const key in data) {
            const element = data[key];
            body.push(
                (<Table.TextCell key={key}>
                {element}
                </Table.TextCell>)
            )
        }
        return body;
    }

    render(){
        return(
            <div className="content">
                <Pane flex="1" margin={16} padding={16}>
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20} paddingBottom={0}>
                            <Pane flex={1}>
                                <Heading size={900}>Purchase Price/ Average Pricing</Heading>
                            </Pane>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>
                                        S.no
                                    </Table.TextHeaderCell>
                                    {this.getHead()}
                                </Table.Head>
                                <Table.Body height={240}>
                                    {this.data.map((data, i) => {
                                        return(
                                            <Table.Row key={i}>
                                                {this.getRow(data, i)}
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Pane>
                    </Card>
                </Pane>    
            </div>
        )
    }

}