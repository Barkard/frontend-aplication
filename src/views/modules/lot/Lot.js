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
} from '@coreui/react';

const Lot = () => {
  const [lots, setLots] = useState([
    { id_lot: 1, library_name: 'Main Library', location: 'Floor 1', current_quantity: 150, last_updated: '2024-11-01 12:00:00' },
    { id_lot: 2, library_name: 'Science Section', location: 'Floor 2', current_quantity: 100, last_updated: '2024-11-02 14:00:00' },
  ]);

  const [form, setForm] = useState({ id_lot: '', library_name: '', location: '', current_quantity: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (lot = { id_lot: '', library_name: '', location: '', current_quantity: '' }, editing = false) => {
    setForm(lot);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id_lot: '', library_name: '', location: '', current_quantity: '' });
  };

  const getNewId = () => {
    return lots.length > 0 ? Math.max(...lots.map((lot) => lot.id_lot)) + 1 : 1;
  };

  const addLot = () => {
    const newLot = { ...form, id_lot: getNewId(), last_updated: new Date().toISOString() };
    setLots([...lots, newLot]);
    closeModal();
  };

  const editLot = () => {
    const updatedLots = lots.map((lot) =>
      lot.id_lot === form.id_lot ? { ...lot, ...form, last_updated: new Date().toISOString() } : lot
    );
    setLots(updatedLots);
    closeModal();
  };

  const deleteLot = (id) => {
    if (window.confirm('Are you sure you want to delete this lot?')) {
      setLots(lots.filter((lot) => lot.id_lot !== id));
    }
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Lot
      </CButton>

      <CTable className="table table-dark table-hover">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Library Name</CTableHeaderCell>
            <CTableHeaderCell>Location</CTableHeaderCell>
            <CTableHeaderCell>Current Quantity</CTableHeaderCell>
            <CTableHeaderCell>Last Updated</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {lots.map((lot) => (
            <CTableRow key={lot.id_lot}>
              <CTableDataCell>{lot.id_lot}</CTableDataCell>
              <CTableDataCell>{lot.library_name}</CTableDataCell>
              <CTableDataCell>{lot.location}</CTableDataCell>
              <CTableDataCell>{lot.current_quantity}</CTableDataCell>
              <CTableDataCell>{lot.last_updated}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(lot, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => deleteLot(lot.id_lot)}>
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
          <CModalTitle>{isEditing ? 'Edit Lot' : 'Add Lot'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Library Name"
                  name="library_name"
                  value={form.library_name}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Current Quantity"
                  name="current_quantity"
                  type="number"
                  value={form.current_quantity}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editLot : addLot}>
            {isEditing ? 'Save Changes' : 'Add'}
          </CButton>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Lot;
