import React, { useState } from 'react';
import {
  CButton,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CCol,
  CRow,
  CFormCheck,  // Importamos el componente de CoreUI para el checkbox
} from '@coreui/react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Leon', lastname: 'Pineda', id_card: 28168315, email: 'leonpineda@gmail.com', birthdate: '2000-06-15', is_active: true },
    { id: 2, name: 'Diana', lastname: 'Pineda', id_card: 28168314, email: 'dianapineda@gmail.com', birthdate: '2001-11-22', is_active: true },
    { id: 3, name: 'Roaxi', lastname: 'Gamboa', id_card: 30152152, email: 'roaxig@gmail.com', birthdate: '2003-10-20', is_active: true },
    { id: 4, name: 'Carlos', lastname: 'Mora', id_card: 28168316, email: 'carlosmora@gmail.com', birthdate: '2000-08-16', is_active: true },
  ]);

  const [form, setForm] = useState({ id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckChange = () => {
    setForm({ ...form, is_active: !form.is_active });
  };

  const openModal = (user = { id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true }, editing = false) => {
    setForm(user);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id: '', name: '', lastname: '', id_card: '', email: '', birthdate: '', is_active: true });
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const getNewId = () => {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  };

  const addUser = () => {
    const newUser = { ...form, id: getNewId() };
    setUsers([...users, newUser]);
    closeModal();
  };

  const editUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === form.id ? { ...user, ...form } : user
    );
    setUsers(updatedUsers);
    closeModal();
  };

  const deleteUser = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    closeDeleteModal();
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add User
      </CButton>

      <CTable className="table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>ID Number</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Birthdate</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableDataCell>{user.id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.lastname}</CTableDataCell>
              <CTableDataCell>{user.id_card}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.birthdate}</CTableDataCell>
              <CTableDataCell>
                <CFormCheck
                  checked={user.is_active}
                  onChange={() => {}}
                  disabled
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(user, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(user)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for Add or Edit */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Name" name="name" value={form.name} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Last Name" name="lastname" value={form.lastname} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="ID Number" name="id_card" value={form.id_card} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Birthdate" name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormCheck
                  label="Active"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleCheckChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editUser : addUser}>
            {isEditing ? 'Save Changes' : 'Add'}
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={closeDeleteModal}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete user <strong>{userToDelete?.name}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteUser}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={closeDeleteModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default UserManagement;
