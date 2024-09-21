import React from 'react';

function Global_Button1({ text, onClick }) {
    return (
        <button onClick={onClick} className="bg-blue-600 text-white px-4 py-2 rounded">
            {text}
        </button>
    );
}

export default Global_Button1;
