import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Card = styled.div`
border-radius: 5px;
margin-bottom: 5px;
padding: 10px 10px;
background-color: ${(props) => props.theme.cardColor};
`;


interface IDragabbleCardProps {
    toDo: string;
    index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic) => (
                <Card
                    ref={magic.innerRef}
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