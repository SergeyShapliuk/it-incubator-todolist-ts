import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../../../../api/todolist-task-api";

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
    task: {id: '1', status:TaskStatuses.Completed, title: 'JS',todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    todolistId: '2222',
    task: {id: '2', status:TaskStatuses.New, title: 'JS',todoListId:"todolistId1",description:"",startDate:"",deadline:"",addedDate:"",order:0, priority:TaskPriorities.Low,completed:false},
};

