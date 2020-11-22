import React from "react";
import { Pane, Heading, SearchInput, Tablist, Tab } from 'evergreen-ui';
import {APP_NAME} from "../../config";

export default class Header extends React.Component
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
            <Pane zIndex={1} flexShrink={0} elevation={0}>
                <Pane className="border-bottom" display="flex" padding={16} backgroundColor="white">
                    <Pane flex={1} alignItems="center" display="flex">
                        <Heading size={600}>{APP_NAME}</Heading>
                    </Pane>
                    <SearchInput 
                        onChange={e => this.setState({ search: e.target.value })}
                        value={this.state.search}
                        placeholder="Search for a company"
                    />
                </Pane>
                <Pane paddingY={4} paddingX={40} backgroundColor="rgb(248 248 252)">
                    <Tablist>
                    {['Chart', 'Analysis', 'Peer', 'Quarters', 'Profit & Loss', 'Balance Sheet', ''].map(
                        (tab, index) => (
                            <Tab
                                key={tab}
                                is="a"
                                href={"#"+index}
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
        )
    }
}