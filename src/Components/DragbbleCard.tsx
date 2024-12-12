import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  display:  flex;
  justify-content: space-between;
  background-color: ${(props) =>
        props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};

`;

const BTN = styled.button`
    border: none;
    background-color: inherit;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color:#e4f2ff;
    }
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
    const setTodoState = useSetRecoilState(toDoState);
    const onDelete = () => {
        setTodoState((prevTodos) => {
            const updatedTodos = { ...prevTodos };
            const categories = Object.keys(updatedTodos);
            for (let i = 0; i < (categories.length); i++) {
                // "To Do", "Doing", "Done" 중 해당 ID를 찾아서 삭제
                updatedTodos[categories[i]] = updatedTodos[categories[i]].filter((todo) => todo.id !== toDoId);
            }
            return updatedTodos;
        });
    };
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDoText}
                    <BTN onClick={onDelete}><FaRegTrashAlt /></BTN>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard); //react에게 prop이 변하지 않았다면 DragabbleCard를 다시 렌더링하지말라고 맗함.(불필요한 재렌더링을 없애줌, 최적화용)