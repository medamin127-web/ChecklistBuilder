import React from "react";


const TagsInput =  props => {
    const [tags, setTags] = React.useState([]);
    
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="tags-input" style={{margin: 'auto',background: 'rgb(235, 235, 235)'}}>
        <ul id="tags">
            {tags.map((tag, index) => (
                <li key={index} className="tag">
                    <span className='tag-title'>{tag}</span>
                    <span className='tag-close-icon'
                        onClick={() => removeTags(index)}
                    >
                        x
                    </span>
                </li>
            ))}
        </ul>
        <input
            type="text"
            onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
            placeholder="Press enter to add tags"
            style={{fontFamily: 'Cairo',fontSize:'1.1em',background: 'rgb(235, 235, 235)'}}
        />
    </div>
    );
};
export default TagsInput;