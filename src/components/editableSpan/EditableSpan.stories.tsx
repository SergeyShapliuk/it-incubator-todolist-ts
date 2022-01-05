import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import EditableSpan from "./EditableSpan";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/AditableSpan',
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        onChange: {
            description: "Value EditableSpan changed"
        },
        title: {
            defaultValue: "HTML",
            description: "Start value EditableSpan"
        }
    }

} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    onChange: action("Value EditableSpan changed"),

};

