import React from "react";
import App from "./App";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator";



export default {
    title: 'Todolist/App',
    component: App,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App demo={true} />;

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {

};