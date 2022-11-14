import React from "react";

function ReadItem(props) {
  const entry = props.entry;
  return (
    <div className="card border-secondary text-bg-dark mb-5">
      <div className="card-body">
        { entry.content }
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item border-secondary text-bg-dark">
          <div className="row">
            <div className="col">
              2022-11-10
            </div>
            <div className="col text-end">
              <div className="dropdown">
                <a className="dropdown-toggle text-light text-decoration-none" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ⚙️
                </a>
                <ul className="dropdown-menu dropdown-menu-dark border-secondary">
                  <li><a className="dropdown-item" href="#">modify</a></li>
                  <li><a className="dropdown-item" href="#">destroy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default ReadItem;