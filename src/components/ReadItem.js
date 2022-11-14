import React from "react";
import ReactTextFormat from "react-text-format";
import { Link } from "react-router-dom";

function ReadItem(props) {
  const { setOpenUpdateModal, setOpenDeleteModal, setSelectedEntry } = props;
  const entry = props.entry;

  function handleClickUpdate(e) {
    setSelectedEntry(entry);
    setOpenUpdateModal(true);
  }
  
  function handleClickDelete(e) {
    setSelectedEntry(entry.id);
    setOpenDeleteModal(true);
  }

  return (
    <div className="card border-secondary text-light mb-5">
      <div className="card-body">
        <ReactTextFormat>
          { entry.content }
        </ReactTextFormat>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item border-secondary">
          <div className="row">
            <div className="col text-secondary">
              { entry.createdAt.substring(8,10) }-{ entry.createdAt.substring(5,7) }-{ entry.createdAt.substring(0,4) }
            </div>
            <div className="col text-end">
              <div className="dropdown">
                <Link className="dropdown-toggle text-secondary text-decoration-none" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-gear"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark border-secondary">
                  <li><Link onClick={handleClickUpdate} className="dropdown-item">modify</Link></li>
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