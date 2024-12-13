import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DroppableBoard from "./DroppableBoard";
import { useSetRecoilState } from "recoil";
import { TiDeleteOutline } from "react-icons/ti";

const Wrapper = styled.div`
  width: 200px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  width: 80%;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  position: relative;
  right: -33px;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}



interface IToDoState {
  [key: string]: IToDo[];
}

const HeadWrap = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
`;

const DeleteBTN = styled.button`
  background-color: inherit;
  border: none;
`;

const ICone = styled(TiDeleteOutline)`
  width: 20px;
  height: 20px;
  color: white;
  &:hover{
    color:#b2bec3;
    transition: color 0.3s ease-in-out;
  }
`;
function Board({ toDos, boardId }: IBoardProps) {
  const setTodoState = useSetRecoilState(toDoState);
  const onDelte = () => {
    setTodoState((prevCategories) => {
      // 이전 상태의 키를 가져옴
      const categories = Object.keys(prevCategories);
      // boardId와 일치하지 않는 카테고리 필터링
      const updatedCategories = categories.filter((category) => category !== boardId);
      // 새로운 객체를 생성
      const newTodos: IToDoState = {};
      updatedCategories.forEach((category) => {
        newTodos[category] = prevCategories[category]; // 필터링된 카테고리로 새로운 객체 생성
      });
      return newTodos; // 새 상태 반환
    });
  };
  return (
    <Wrapper>
      <HeadWrap>
        <Title>{boardId}</Title>
        <DeleteBTN onClick={onDelte}><ICone /></DeleteBTN>
      </HeadWrap>
      <DroppableBoard toDos={toDos} boardId={boardId} />
    </Wrapper>
  );
}
export default Board;