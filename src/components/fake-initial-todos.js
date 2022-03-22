import { getFullDate } from "./DOM";
const todo1 = {
    name: 'Meeting',
    id:0,
    date: getFullDate(),
    description:'A meeting will be in the main building at 4 am',
    processStatus:"waiting"
};
const todo2 = {
    name: 'Learning React.JS',
    id:1,
    date: getFullDate(),
    description:'Learning React.JS to build SPA',
    processStatus:"completed"
};
const todo3 = {
    name: 'English',
    id:2,
    date: getFullDate(),
    description:'Learn, and practice English everyday',
    processStatus:"in-process"
};
export const fakeToDoNotes = [todo1, todo2, todo3];