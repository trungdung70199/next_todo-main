// "use client"

// import { useState } from "react";
// import ClickButton from "@/app/components/ClickButton";
// import Input from "@/app/components/Input";
// import TagsInput from "@/app/components/tag/TagsInput";

// interface TodoFormProps {
//     onSaveTodo: (value: string, tags: string[]) => void;
//     autoCompleteTags: string[]
// }

// const TodoForm = ({
//     onSaveTodo,
//     autoCompleteTags = []
// }: TodoFormProps) => {
//     const [inputValue, setInputValue] = useState('');
//     const [tags, setTags] = useState<string[]>([]);

//     const addClickHandler = () => {
//         onSaveTodo(inputValue, tags);
//         setInputValue("");
//         setTags([]);
//     }

//     return (
//         <div>
//             <Input
//                 value={inputValue}
//                 onChange={setInputValue}
//                 placeholder="Enter Todo..." />

//             <ClickButton
//                 label="Add"
//                 onClick={addClickHandler}
//                 disabled={!inputValue} />
//         </div>
//     );
// }

// export default TodoForm;

import { useState } from "react";
import ClickButton from "@/app/components/ClickButton";
import Input from "@/app/components/Input";
import TagsInput from "@/app/components/tag/TagsInput";

interface TodoFormProps {
    onSaveTodo: (value: string, tags: string[]) => void;
    autoCompleteTags: string[];
}

const TodoForm = ({ onSaveTodo, autoCompleteTags = [] }: TodoFormProps) => {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [todos, setTodos] = useState<string[]>([]);

    const addClickHandler = () => {
        onSaveTodo(inputValue, tags);
        setTodos([...todos, inputValue]); 
        setInputValue("");
        setTags([]);
    };

    const handleDeleteClick = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div>
            <Input
                value={inputValue}
                onChange={setInputValue}
                placeholder="Enter Todo..."
            />
            <TagsInput
                tags={tags}
                autoCompleteTags={autoCompleteTags}
                onChange={setTags}
            />
            <ClickButton
                label="Add"
                onClick={addClickHandler}
                disabled={!inputValue}
            />

            <div>
                <h2>Added Todos:</h2>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>
                            {todo}
                            <button onClick={() => handleDeleteClick(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoForm;
