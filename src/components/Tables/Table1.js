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
        let body = [<Table.TextCell key={i}>{++i}</Table.TextCell>];
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
            <>
                <Pane flex="1" margin={16} padding={16} id="average">
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20}>
                            <Pane flex={1}>
                                <Heading size={600}>Purchase Price/ Average Pricing</Heading>
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

                <Pane flex="1" margin={16} padding={16} id="purchase-price">
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20}>
                            <Pane flex={1}>
                                <Heading size={600}>Purchase Pricing Price – Buy/ Sell</Heading>
                            </Pane>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>
                                    Current Price
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    H/L Average
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    Purchase Price
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    3 Year - H/L
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    3 Year Avg
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body height={120}>
                                    <Table.Row>
                                        <Table.TextCell>
                                        1946.7
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        -2.40%
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        ₹ 2,074.37
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    874
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    2320
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        1597
                                        </Table.TextCell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Pane>
                    </Card>
                </Pane>
            
                <Pane flex="1" margin={16} padding={16} id="intrinsic">
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20}>
                            <Pane flex={1}>
                                <Heading size={600}>Intrinsic Value</Heading>
                            </Pane>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>
                                    PV
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    NPV
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    AVG. PRICE
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    IRR
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body height={120}>
                                    <Table.Row>
                                        <Table.TextCell>
                                        1661.44279
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    ₹ 412.92
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    2074.365913
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        1994.582609
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        9%
                                        </Table.TextCell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Pane>
                    </Card>
                </Pane>

                <Pane flex="1" margin={16} padding={16} id="daily-equity-updates">
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20}>
                            <Pane flex={1}>
                                <Heading size={600}>Daily Equity Updates – H/L</Heading>
                            </Pane>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>
                                    DATE
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    PARTICULAR
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    Reliance
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body height={120}>
                                    <Table.Row>
                                        <Table.TextCell>
                                        Dec-20
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        Minimum
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    1940.3
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    -0.15%
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.TextCell>
                                        
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        Minimum
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    1972
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    -1.61%
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Pane>
                    </Card>
                </Pane>

                <Pane flex="1" margin={16} padding={16} id="purchase-price-comparison">
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20}>
                            <Pane flex={1}>
                                <Heading size={600}>Purchase Price Comparison H/L</Heading>
                            </Pane>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <Table>
                                <Table.Head>
                                    <Table.TextHeaderCell>
                                    DATE
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    PARTICULAR
                                    </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>
                                    Reliance
                                    </Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body height={120}>
                                    <Table.Row>
                                        <Table.TextCell>
                                        Dec-20
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        Minimum
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    1940.3
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    -1.13%
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.TextCell>
                                        
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        Minimum
                                        </Table.TextCell>
                                        <Table.TextCell>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.TextCell>
                                                    1972
                                                    </Table.TextCell>
                                                    <Table.TextCell>
                                                    -2.72%
                                                    </Table.TextCell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        </Table.TextCell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Pane>
                    </Card>
                </Pane>
            
            </>
        )
    }

}