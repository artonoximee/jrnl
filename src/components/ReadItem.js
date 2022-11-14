import React from "react";
import ReactTextFormat from "react-text-format";
import { Link } from "react-router-dom";

function ReadItem(props) {
  const { setOpenDeleteModal, setSelectedEntry } = props;
  const entry = props.entry;

  function handleClickDelete(e) {
    setSelectedEntry(entry.id);
    setOpenDeleteModal(true);
  }

  return (
    <div className="card border-secondary text-bg-dark mb-5">
      <div className="card-body">
        <ReactTextFormat>
          { entry.content }
        </ReactTextFormat>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item border-secondary text-bg-dark">
          <div className="row">
            <div className="col text-secondary">
              { entry.createdAt.substring(8,10) }-{ entry.createdAt.substring(5,7) }-{ entry.createdAt.substring(0,4) }
            </div>
            <div className="col text-end">
              <div className="dropdown">
                <Link className="dropdown-toggle text-secondary text-decoration-none" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ⚙️
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark border-secondary">
                  <li><Link className="dropdown-item">modify</Link></li>
                  <li><Link onClick={handleClickDelete} className="dropdown-item">destroy</Link></li>
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