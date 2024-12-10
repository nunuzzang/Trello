import { atom, selector } from "recoil"

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        to_do: ["c", "d",],
        doing: ["a", "b"],
        done: ["e", "f"],
    },
})