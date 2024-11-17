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
  CFormSelect,
  CCol,
  CRow,
} from '@coreui/react';

const Books = () => {
  const [books, setBooks] = useState([
    {
      id_book: 1,
      title: 'Book Title 1',
      author: 'Author 1',
      category: 'Fiction',
      stock: 10,
      cover: null,
    },
    {
      id_book: 2,
      title: 'Book Title 2',
      author: 'Author 2',
      category: 'Science',
      stock: 5,
      cover: null,
    },
  ]);

  const [form, setForm] = useState({ id_book: '', title: '', author: '', category: '', stock: '', cover: null });
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  const categories = ['Fiction', 'Science', 'History', 'Technology'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'id_book' || name === 'stock' ? parseInt(value, 10) : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, cover: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (book = { id_book: '', title: '', author: '', category: '', stock: '', cover: null }, editing = false) => {
    setForm(book);
    setIsEditing(editing);
    setPreview(book.cover || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({ id_book: '', title: '', author: '', category: '', stock: '', cover: null });
    setPreview(null);
  };

  const getNewId = () => {
    return books.length > 0 ? Math.max(...books.map((book) => book.id_book)) + 1 : 1;
  };

  const addBook = () => {
    const newBook = { ...form, id_book: getNewId() };
    setBooks([...books, newBook]);
    closeModal();
  };

  const editBook = () => {
    const updatedBooks = books.map((book) =>
      book.id_book === form.id_book ? { ...book, ...form } : book
    );
    setBooks(updatedBooks);
    closeModal();
  };

  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setBookToDelete(null);
  };

  const deleteBook = () => {
    setBooks(books.filter((book) => book.id_book !== bookToDelete.id_book));
    closeDeleteModal();
  };

  const openImageModal = (book) => {
    setBookDetails(book);
    setImagePreview(book.cover);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setBookDetails(null);
    setImagePreview(null);
  };

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()} className="my-3">
        Add Book
      </CButton>

      <CTable className="table table-dark table-hover">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
            <CTableHeaderCell>Author</CTableHeaderCell>
            <CTableHeaderCell>Category</CTableHeaderCell>
            <CTableHeaderCell>Stock</CTableHeaderCell>
            <CTableHeaderCell>Cover</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {books.map((book) => (
            <CTableRow key={book.id_book}>
              <CTableDataCell>{book.id_book}</CTableDataCell>
              <CTableDataCell>{book.title}</CTableDataCell>
              <CTableDataCell>{book.author}</CTableDataCell>
              <CTableDataCell>{book.category}</CTableDataCell>
              <CTableDataCell>{book.stock}</CTableDataCell>
              <CTableDataCell>
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt="Cover"
                    width="50"
                    onClick={() => openImageModal(book)}  // Open image in larger view
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  'No cover'
                )}
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="me-2" onClick={() => openModal(book, true)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteModal(book)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Add/Edit Modal */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>{isEditing ? 'Edit Book' : 'Add Book'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Title" name="title" value={form.title} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Author" name="author" value={form.author} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput label="Cover" type="file" accept="image/*" onChange={handleImageChange} />
              </CCol>
            </CRow>
            {preview && (
              <CRow>
                <CCol>
                  <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />
                </CCol>
              </CRow>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={isEditing ? editBook : addBook}>
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
          Are you sure you want to delete the book <strong>{bookToDelete?.title}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteBook}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={closeDeleteModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Image Preview Modal */}
      <CModal visible={imageModalVisible} onClose={closeImageModal}>
        <CModalHeader closeButton>
          <CModalTitle>{bookDetails?.title} - {bookDetails?.category}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {imagePreview && <img src={imagePreview} alt="Large View" style={{ maxWidth: '100%' }} />}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeImageModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Books;
