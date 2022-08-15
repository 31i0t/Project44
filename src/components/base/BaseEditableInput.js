import { useEffect, useState, useRef, cloneElement } from "react";
import BaseIcon from "./BaseIcon";
import BaseHover from "./BaseHover";
import useClickOutside from "../../hooks/useClickOutside";
import useInput from "../../hooks/useInput";
import { validateInput } from "../../utils";

export default function BaseEditableInput(props) {
    const {
        onChange = () => '',
        input,
        content,
        validationValues = [],
    } = props;

    const [localInput, setLocalInput] = useInput();
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null);
    const titleRef = useRef(null);

    useClickOutside([inputRef, titleRef], () => {
        setEditMode(false);
    });

    // init localInput
    useEffect(() => {
        setLocalInput({ value: input.props.value, error: ''});
    }, [input.props.value]);

    // commit changes
    useEffect(() => {
        if (localInput.value !== '' && localInput.value !== input.props.value && !localInput.error) {
          onChange(localInput.value);
        }
    }, [editMode]);


    const handleInputKeyDown = (evt) => {
        if ((input.props.multiline && evt.keyCode === 13 && !evt.shiftKey) || (!input.props.multiline && evt.keyCode === 13)) {
            setEditMode(false);
        }
    }

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleInputChange = (evt) => {
        setLocalInput(validateInput(evt.target.value, validationValues));
    }

    return <div className="flex flex-col">
        <div ref={titleRef} className="flex">
            { !editMode &&
                <BaseHover className="flex items-center gap-2 cursor-pointer" onClick={handleEditMode}>
                    { cloneElement(content, { children: localInput.value }) }<BaseIcon name="edit" />
                </BaseHover>
            }
        </div>
        <div ref={inputRef}>
            { editMode && cloneElement(input, {
                value: localInput.value,
                error: localInput.error,
                onChange: handleInputChange,
                onKeyDown: handleInputKeyDown,
            }) }
        </div>
    </div>;
}
