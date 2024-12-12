import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { CiSquarePlus } from "react-icons/ci";

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



interface IForm {
    category: string;
}

const IconStyle = styled(CiSquarePlus)`
    width: 100px;
    height: 100px;
    color: white;
    &:hover{
        color:#b0bdc2;
        transition: color 0.5s ease-in-out;
    }
`;
const AddBoardBTN = styled.button`
    background-color: inherit;
    border: none;
    margin-top: 50px;
`;

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
                {...register("category", { required: true })}
                type="text"
                placeholder="보드 추가"
            />
            <AddBoardBTN type="submit" ><IconStyle /></AddBoardBTN>
        </Form>
    );
}

export default AddBoard;
