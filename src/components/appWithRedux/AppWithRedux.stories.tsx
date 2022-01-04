import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator";



export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {

};