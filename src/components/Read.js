/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { db } from "./../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./../contexts/AuthContext";

// import ListItem from "./ListItem";
// import UpdateModal from "./UpdateModal";
// import DeleteModal from "./DeleteModal";
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
      {
        entries &&
        entries.map((entry) => <p>{ entry.content }</p>)
      }

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