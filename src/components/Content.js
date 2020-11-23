import React from "react";
import { Pane, Heading, Card, TextInput, Button} from 'evergreen-ui';
import { ExportIcon, PlusIcon, DocumentShareIcon, EditIcon } from "evergreen-ui";
import Chart from "./Chart";

export default class Content extends React.Component
{
    constructor(){
        super();
        this.state = {
            search: '',
            selectedIndex: 0
        };
    }

    render(){
        return(
            <div className="content">
                <Pane flex="1" margin={16} padding={16}>
                    <Card elevation={3} backgroundColor="white">
                        <Pane display="flex" padding={20} paddingBottom={0}>
                            <Pane flex={1}>
                                <Heading size={900}>Reliance Industries Ltd</Heading>
                                <Pane>
                                    <Button is="a" href="https://www.ril.com/" target="_blank" appearance="minimal" iconBefore={DocumentShareIcon}>ril.com</Button>
                                    <Button is="a" href="https://www.bseindia.com/stock-share-price/reliance-industries-ltd/RELIANCE/500325/" target="_blank" appearance="minimal" iconBefore={DocumentShareIcon}>BSE</Button>
                                    <Button is="a" href="https://www.nseindia.com/get-quotes/equity?symbol=RELIANCE" target="_blank" appearance="minimal" iconBefore={DocumentShareIcon}>NSE</Button>
                                </Pane>
                            </Pane>
                            
                            <Button marginRight={8} iconBefore={ExportIcon}>Export to Excel</Button>
                            <Button marginRight={8} appearance="primary" iconBefore={PlusIcon}>Follow</Button>
                        </Pane>

                        <Pane paddingX={20} paddingBottom={20}>
                            <div className="company-info">
                                <div className="company-profile">
                                    <div className="company-profile-about">
                                        <div className="title">About</div>
                                        <p>Reliance Industries is engaged in activities spanning across hydrocarbon exploration and production,
                                            petroleum refining and marketing, petrochemicals, retail, digital services and financial services.</p>
                                    </div>
                                </div>

                                <div className="company-ratios">
                                    <ul id="top-ratios">

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Market Cap

                                            </span>



                                            <span className="nowrap value">

                                                ₹

                                                <span className="number">1,247,649</span>

                                                Cr.

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Current Price

                                            </span>



                                            <span className="nowrap value">

                                                ₹

                                                <span className="number">1,900</span>

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                High / Low

                                            </span>



                                            <span className="nowrap value">₹ <span className="number">2,369</span> / <span
                                                    className="number">867</span></span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Stock P/E

                                            </span>



                                            <span className="nowrap value">

                                                <span className="number">30.6</span>

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Book Value

                                            </span>



                                            <span className="nowrap value">

                                                ₹

                                                <span className="number">968</span>

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Dividend Yield

                                            </span>



                                            <span className="nowrap value">

                                                <span className="number">0.34</span>

                                                %

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                ROCE

                                            </span>



                                            <span className="nowrap value">

                                                <span className="number">10.7</span>

                                                %

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                ROE

                                            </span>



                                            <span className="nowrap value">

                                                <span className="number">10.3</span>

                                                %

                                            </span>

                                        </li>

                                        <li className="flex flex-space-between" data-source="default">
                                            <span className="name">

                                                Face Value

                                            </span>



                                            <span className="nowrap value">

                                                ₹

                                                <span className="number">10.0</span>

                                            </span>

                                        </li>


                                    </ul>

                                    <div style={{marginTop: "32px"}}>
                                        <label htmlFor="quick-ratio-search">Add ratio to table</label>

                                        <Pane display="flex">
                                            <div className="dropdown-typeahead flex-grow" style={{maxWidth: 480}}>
                                                <TextInput
                                                    name="text-input-name"
                                                    placeholder="Text input placeholder..."
                                                />
                                            </div>

                                            <Button appearance="minimal" iconBefore={EditIcon}>Edit ratios</Button>
                                        </Pane>
                                    </div>
                                </div>
                            </div>
                        </Pane>
                    </Card>
                </Pane>

                <Pane flex="1" marginX={16} padding={16}>
                    <Card
                        backgroundColor="white"
                        elevation={3}
                        height={600}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Chart/>
                    </Card>
                </Pane>
            </div>
        )
    }

}