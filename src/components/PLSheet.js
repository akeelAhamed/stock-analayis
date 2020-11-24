import React from "react";
import { TextInput, Pane, Heading, Card, SideSheet, CornerDialog, Paragraph, Tablist, Tab, Button} from 'evergreen-ui';

export default class PLSheet extends React.Component
{
    constructor(){
        super();
        this.state = {
            isShown: false,
            isAlertShown: false,
            selectedIndex: 0,
            tabs: ['Profit', 'Loss'],
            isProfit: true,
            profit: 5,
            loss: 5
        };
        this.alert = this.alert.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    alert(e){
        this.setState({ isShown: false, isAlertShown: true, isProfit:Math.random()>0.5 });
    }
    
    onChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <React.Fragment>
                <SideSheet
                    isShown={this.state.isShown}
                    containerProps={{
                        display: 'flex',
                        flex: '1',
                        flexDirection: 'column',
                    }}
                    onCloseComplete={this.alert}
                >
                    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane padding={16} borderBottom="muted">
                        <Heading size={600}>Update P & L</Heading>
                        <Paragraph size={400} color="muted">
                        __________________________
                        </Paragraph>
                    </Pane>
                    <Pane display="flex" padding={8}>
                        <Tablist>
                        {this.state.tabs.map(
                            (tab, index) => (
                                <Tab
                                    key={tab}
                                    isSelected={this.state.selectedIndex === index}
                                    onSelect={() => this.setState({ selectedIndex: index })}
                                >
                                    {tab}
                                </Tab>
                            )
                        )}
                        </Tablist>
                    </Pane>
                    </Pane>
                    {
                        this.state.tabs.map((tab, index) => (
                            <Pane
                                key={tab}
                                id={`panel-${tab}`}
                                role="tabpanel"
                                aria-labelledby={tab}
                                aria-hidden={index !== this.state.selectedIndex}
                                display={index === this.state.selectedIndex ? 'block' : 'none'}
                                overflowY="scroll" background="tint1" padding={16}
                            >
                                <Card
                                    backgroundColor="white"
                                    elevation={0}
                                    height={240}
                                    padding={20}
                                >
                                    <Heading>Edit {tab} percentage</Heading>
                                    <hr/>
                                    <TextInput
                                        label={"Update "+tab+" percentage"}
                                        type="number"
                                        name={tab.toLowerCase()}
                                        onChange={this.onChange}
                                        value={this.state[tab.toLowerCase()]}
                                    />
                                </Card>
                            </Pane>
                        ))
                    }   
                </SideSheet>
                
                <Button className="absolute top-right" appearance="primary" onClick={() => this.setState({ isShown: true })}>
                    Edit Profit/Loss
                </Button>

                <CornerDialog
                    title="Stock has changed"
                    isShown={this.state.isAlertShown}
                    hasCancel={false}
                    onCloseComplete={() => this.setState({ isAlertShown: false })}
                    position="bottom-left"
                    intent={this.state.isProfit?'success':'warning'}
                    style={{minHeight: 200}}
                    confirmLabel={this.state.isProfit?'Save':'Close'}
                >
                    {
                        this.state.isProfit
                        ?<Heading color="#23C277" size={400}>Stock reached to the profit of {this.state.profit}%</Heading>
                        :<Heading color='#EE9913' size={400}>Stock dropped to the loss of {this.state.loss}%</Heading>
                    }
                </CornerDialog>
            </React.Fragment>
        )
    }

}