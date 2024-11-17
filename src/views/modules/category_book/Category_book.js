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

const CategoryBook = () => {
  const [categories, setCategories] = useState([
    { id_category_book: 1, category_name: 'Fiction', description_category: 'Fictional books' },
    { id_category_book: 2, category_name: 'Science', description_category: 'Scientific resources' },
  ]);

  const [form, setForm] = useState({ id_category_book: '', category_name: '', description_category: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (category = { id_category_book: '', category_name: '', description_category: '' }, editing = false) => {
    setForm(category);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id_category_book: '', category_name: '', description_category: '' });
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setCategoryToDelete(null);
  };

  const getNewId = () => {
    return categories.length > 0 ? Math.max(...categories.map((cat) => cat.id_category_book)) + 1 : 1;
  };

  const addCategory = () => {
    const newCategory = { ...form, id_category_book: getNewId() };
    setCategories([...categories, newCategory]);
    closeModal();
  };

  const editCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat.id_category_book === form.id_category_book ? { ...cat, ...form } : cat
    );
    setCategories(updatedCategories);
    closeModal();
  };

  const deleteCategory = () => {
    setCategories(categories.filter((cat) => cat.id_category_book !== categoryToDelete.id_category_book));
    closeDeleteModal();
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Category
      </CButton>

      <CTable className="table table-dark table-hover">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Category Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categories.map((category) => (
            <CTableRow key={category.id_category_book}>
              <CTableDataCell>{category.id_category_book}</CTableDataCell>
              <CTableDataCell>{category.category_name}</CTableDataCell>
              <CTableDataCell>{category.description_category}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(category, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(category)}>
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
          <CModalTitle>{isEditing ? 'Edit Category' : 'Add Category'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Category Name"
                  name="category_name"
                  value={form.category_name}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  label="Description"
                  name="description_category"
                  value={form.description_category}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editCategory : addCategory}>
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
          Are you sure you want to delete the category <strong>{categoryToDelete?.category_name}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteCategory}>
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

export default CategoryBook;
