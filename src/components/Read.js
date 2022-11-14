/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./../contexts/AuthContext";

import ReadItem from "./ReadItem";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import sortByCreationDate from "./../helpers/sortByCreationDate";

function List() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getEntries()
  }, [reload])

  async function getEntries() {
    const q = query(collection(db, "jrnls"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByCreationDate(arr);
    setEntries(arr);
  }

  async function handleLogOut() {
    try {
      await logOut();
      navigate("/");
    } catch {
    }
  }

  return (
    <>
      <div className="row align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="col-lg-6 col-md-10">
          <div className="row mb-5">
            <div className="col-9">
              <Link to="/create" className="btn btn-outline-secondary mt-5 w-100"><i className="fa-solid fa-pen"></i></Link>
            </div>
            <div className="col-3">
              <button onClick={ handleLogOut } className="btn btn-outline-secondary mt-5 w-100"><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
          </div>
          {
            entries &&
            entries.map((entry) => <ReadItem key={ entry.id } entry={ entry } setOpenUpdateModal={ setOpenUpdateModal } setOpenDeleteModal={ setOpenDeleteModal } setSelectedEntry={ setSelectedEntry } />)
          }
        </div>
      </div>

      { openUpdateModal && (
        <UpdateModal setOpenUpdateModal={ setOpenUpdateModal } selectedEntry={ selectedEntry } setReload={ setReload } />
      )}

      { openDeleteModal && (
        <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedEntry={ selectedEntry } setReload={ setReload } />
      )}
    </>
  )
}

export default List;