import React from "react";

function ReadItem(props) {
  const entry = props.entry;
  return (
    <div className="card border-secondary text-bg-dark mt-5">
      <div className="card-body">
        { entry.content }
      </div>
    </div>
  )
}

export default ReadItem;