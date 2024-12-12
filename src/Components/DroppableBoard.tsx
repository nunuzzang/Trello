import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import DragabbleCard from "./DragbbleCard";

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
                ? "#b2bec3"
                : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;


function DroppableBoard({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);

    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [...toDos, newToDo],
            }
        });
        setValue("toDo", "");
    };
    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add task on ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>

                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                key={toDo.id}
                                index={index}
                                toDoId={toDo.id}
                                toDoText={toDo.text}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}

            </Droppable>
        </>
    )
}

export default DroppableBoard;