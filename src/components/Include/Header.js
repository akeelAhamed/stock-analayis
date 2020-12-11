import React from "react";
import { Pane, Heading, SearchInput, Tablist, Tab, Button } from 'evergreen-ui';
import {APP_NAME} from "../../config";

export default class Header extends React.Component
{
    constructor(){
        super();
        this.state = {
            search: '',
            selectedIndex: 0
        };

        this.scroll = this.scroll.bind(this);
    }

    scrollTo(element, to, duration) {
        to -= 100;
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;
        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            this.scrollTo(element, to, duration - 10);
        }, 10);
    }

    scroll(e, i){
        this.setState({ selectedIndex: i });
        this.scrollTo(document.body, document.getElementById(e).offsetTop, 600);
    }

    render(){
        return(
            <Pane zIndex={1} flexShrink={0} elevation={0} className="fixed-header">
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
                    {['Company', 'Analysis', 'Chart', 'Average', 'Purchase Price', 'Intrinsic', 'Daily Equity Updates', 'Purchase Price Comparison'].map(
                        (tab, index) => {
                            const id = tab.replace(/\s/g, '-').toLowerCase();
                            return(
                            <Tab
                                key={tab}
                                is="span"
                                href={"#"+id}
                                isSelected={this.state.selectedIndex === index}
                                onSelect={() => this.scroll(id, index)}
                            >
                            {tab}
                            </Tab>
                            )
                        }
                        )}
                        <Button style={{float: 'right'}} marginTop={-2.5}>Add purchase</Button>
                    </Tablist>
                </Pane>
            </Pane>
        )
    }
}