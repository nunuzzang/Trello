import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Card = styled.div<{ isDragging: boolean }>`
border-radius: 5px;
margin-bottom: 5px;
padding: 10px 10px;
background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
box-shadow: ${(props) => props.isDragging ? "0px 0px 5px rgba(0,0,0,0.05)" : "none"};
`;


interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}        //reference란 우리의 react 코드를 이용해 HTML 요소를 지정하고 가져올 수 있는 방법
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard); //react에게 prop이 변하지 않았다면 DragabbleCard를 다시 렌더링하지말라고 맗함.(불필요한 재렌더링을 없애줌, 최적화용)