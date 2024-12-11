import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragbbleCard";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div <IAreaProps>`
    background-color: ${(props) => props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
    flex-grow: 1;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

/* 
//Droppablestate snapshot
isDraggingOver: boolean
현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인

draggingOverWith: ?DraggableId
Droppable 위로 드래그하는 Draggable ID

draggingFromThisWith: ?DraggableId
현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID

isUsingPlaceholder: boolean
placeholder가 사용되고 있는지 여부 */

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard key={toDo} index={index} toDo={toDo} />
                        ))}
                        {magic.placeholder}
                    </Area>)}
            </Droppable>
        </Wrapper>
    );
}

export default Board;