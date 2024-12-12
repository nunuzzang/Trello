import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Form = styled.form`
  width: 200px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface IForm {
    category: string;
}

function AddBoard() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const addBoard = (category: IForm) => {
        setToDos((prev) => {
            return {
                ...prev,
                [category["category"]]: [],
            }
        })
        setValue("category", "");
    }

    return (
        <Form onSubmit={handleSubmit(addBoard)}>
            <Input
                {...register("category", { required: false })}
                type="text"
                placeholder="보드 추가"
            />
            <Button type="submit">보드 추가</Button>
        </Form>
    );
}

export default AddBoard;
