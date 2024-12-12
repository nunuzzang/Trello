import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { FaRegTrashAlt } from "react-icons/fa";
import DroppableBoard from "./DroppableBoard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}


function Board({ toDos, boardId }: IBoardProps) {


    return (
        <Wrapper>
            <Title>{boardId}</Title>

            <DroppableBoard toDos={toDos} boardId={boardId} />
        </Wrapper>
    );
}
export default Board;