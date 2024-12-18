import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Boards";
import AddBoard from "./Components/AddBoard";

/* const Wrapper = styled.div`
  display: flex;
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
 */

const Wrapper = styled.div`
  background-color: #87b7f5;
  display: flex;
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
  height: 90vh;
  align-items: flex-start;
  margin-top: 50px;
  padding-left: 50px;
  border-radius: 25px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 50px 0;
  gap: 10px;
`;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // 서로 같은 board에서 움직이기
      setToDos((allBoards) => {
        // 모든 board를 가져오고 source.droppableId 배열을 복사
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index];
        // 복사본을 변형
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        // 모든 board들을 return하고 추가로 변형된 복사본도 같이 return
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // 서로 다른 board에서 움직이기
      setToDos((allBoards) => {
        // 모든 board를 가져오고 source.droppableId 배열을 복사
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        // 모든 board를 가져오고 destination.droppableId 배열을 복사
        const destinationBoard = [...allBoards[destination.droppableId]];
        // 복사본을 변형
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        // 모든 board들을 return하고 추가로 변형된 복사본도 같이 return
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
          <AddBoard /> {/* 보드 추가 컴포넌트 */}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}


export default App;
