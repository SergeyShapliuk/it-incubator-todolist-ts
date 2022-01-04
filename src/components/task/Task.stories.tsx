import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Task',
    component: Task,
    args:{
        removeTask: action('removeTask'),
        changeTitle: action('changeTitle'),
        changeStatus: action('changeStatus')
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    todolistId: '1111',
    task: {id: '1', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    todolistId: '2222',
    task: {id: '2', isDone: true, title: 'JS'},
};

