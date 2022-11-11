/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { db } from "./../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./../contexts/AuthContext";

// import ListItem from "./ListItem";
// import UpdateModal from "./UpdateModal";
// import DeleteModal from "./DeleteModal";
import ReadItem from "./ReadItem";
import sortByCreationDate from "./../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
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

  // function handleClickCreate() {
  //   setOpenCreateModal(true);
  // }

  return (
    <>
      <div className="row align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="col-lg-6 col-md-10">
          {
            entries &&
            entries.map((entry) => <ReadItem key={ entry.id } entry={ entry } />)
          }
        </div>
      </div>
      

      {/* { openUpdateModal && (
        <UpdateModal setOpenUpdateModal={ setOpenUpdateModal } selectedProject={ selectedProject } setReload={ setReload } />
      )}

      { openDeleteModal && (
        <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedProject={ selectedProject } setReload={ setReload } />
      )} */}
    </>
  )
}

export default List;