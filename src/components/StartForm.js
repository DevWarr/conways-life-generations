import React from "react";

export default function StartForm({ sizeChange, startLife }) {
  const [form, setForm] = React.useState({ generations: 5, speed: 2 });

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = e => {
      e.preventDefault();
      startLife(form.generations, form.speed);
  }

  return (
    <div className="bottom-form">

      <div className="column-buttons button-panel">
        <button id="ADD_COLUMN" onClick={sizeChange}>
          Add a column
        </button>
        <button id="SUBTRACT_COLUMN" onClick={sizeChange}>
          Remove a column
        </button>
      </div>

      <div className="row-buttons button-panel">
        <button id="ADD_ROW" onClick={sizeChange}>
          Add a row
        </button>
        <button id="SUBTRACT_ROW" onClick={sizeChange}>
          Remove a row
        </button>
      </div>
      
      <form onSubmit={submit}>
        <label htmlFor="generations" > Number of Generations</label>
        <input
          type="number"
          id="generations"
          name="generations"
          value={form.generations}
          onChange={changeHandler}
        />
        <label htmlFor="speed">Speed of animation</label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={form.speed}
          onChange={changeHandler}
        />
        <button type="submit">Start the Path of Life!</button>
      </form>
    </div>
  );
}
