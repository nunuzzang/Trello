import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { CiSquarePlus } from "react-icons/ci";

const Form = styled.form`
  width: 200px;
  padding-top: 10px;
  background-color: #DADFE9;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items:center;
  overflow: hidden;
  opacity: 0.8;
`;

const Input = styled.input`
  width: 80%;
  height: 50px;
  padding: 10px;
  margin-top: 30px;
  border-radius: 10px;
  border: none;
  &:focus{
        outline: none;
    }
`;


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
    margin-top: 20px;
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
                {...register("category", { required: true, maxLength: 14 })}
                type="text"
                placeholder="보드 추가"
            />
            <AddBoardBTN type="submit" ><IconStyle /></AddBoardBTN>
        </Form>
    );
}

export default AddBoard;
