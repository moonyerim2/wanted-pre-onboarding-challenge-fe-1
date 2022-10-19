import { useContext } from "react";
import { TodoContext } from "../context";
import { TextFieldData } from "../type";

function TextField({
  id,
  label,
  text,
  type,
  placeholder,
  required,
}: TextFieldData) {
  const { todoTexts, setTodoTexts } = useContext(TodoContext);

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    const newTodoTexts = { ...todoTexts, [id]: value };
    setTodoTexts(newTodoTexts);
  };

  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        defaultValue={text}
        placeholder={placeholder}
        required={required}
        onBlur={onBlur}
      />
    </label>
  );
}

export default TextField;
