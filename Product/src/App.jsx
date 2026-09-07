import { useState } from 'react'
import Images from './assets/Images.jpg'
import ImagesS26 from './assets/ImagesS26.jpg'
import refrigeratorImg from './assets/refri.jpg'
import watch from './assets/watch.jpg'
import fold8Img from './assets/fold.jpg'
import './App.css'

function App() {

  const [products, setProducts] = useState([
    {
      id: 1,
      image: Images,
      name: 'Samsung Galaxy S26 Ultra',
      description: 'Latest flagship smartphone with advanced features from Samsung.',
      price: '₹1,29,999'
    },
    {
      id: 2,
      image: ImagesS26,
      name: 'Samsung Galaxy S26',
      description: 'Entry-level smartphone with essential features.',
      price: '₹87,999'
    },
    {
      id: 3,
      image: refrigeratorImg,
      name: 'Samsung Family Hub Refrigerator',
      description: 'Smart refrigerator with a large display and advanced features.',
      price: '₹2,80,000'
    },
    {
      id: 4,
      image: watch,
      name: 'Samsung Watch Ultra',
      description: 'Advanced smartwatch with a variety of features.',
      price: '₹59,999'
    },
    {
      id: 5,
      image: fold8Img,
      name: 'Samsung Galaxy Fold 8',
      description: 'Advanced foldable smartphone with a large display and cutting-edge features.',
      price: '₹1,74,999'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  function addProduct() {
    setEditId(null)
    setName('')
    setDescription('')
    setPrice('')
    setImage(null)
    setShowForm(true)
  }

  function saveProduct() {

    if (!name || !description || !price) {
      alert('Please fill all details')
      return
    }

    if (editId) {

      let updatedProducts = products.map(product => {
        if (product.id === editId) {
          return {
            ...product,
            name: name,
            description: description,
            price: price,
            image: image || product.image
          }
        }

        return product
      })

      setProducts(updatedProducts)

    } else {

      let newProduct = {
        id: Date.now(),
        image: image,
        name: name,
        description: description,
        price: price
      }

      setProducts([...products, newProduct])
    }

    setShowForm(false)
    setEditId(null)
    setImage(null)
  }

  function chooseImage(event) {
    let file = event.target.files[0]

    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  function modifyProduct(id) {

    let product = products.find(product => product.id === id)

    setEditId(id)
    setName(product.name)
    setDescription(product.description)
    setPrice(product.price)
    setImage(null)
    setShowForm(true)
  }

  function deleteProduct(id) {

    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id))
    }
  }

  return (
    <div className="App">

      <div className="heading">

        <h1>Samsung Products</h1>

        <p>Explore our latest products</p>

        <button className="addButton" onClick={addProduct}>
          + Add Product
        </button>

        {showForm && (

          <div className="form">

            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <input
              type="text"
              placeholder="Product description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <input
              type="text"
              placeholder="Product price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={chooseImage}
            />

            <button className="saveButton" onClick={saveProduct}>
              Save Product
            </button>

          </div>

        )}

      </div>

      <div className="products">

        {products.map(product => (

          <div className="product" key={product.id}>

            {product.image ? (
              <img src={product.image} alt="Product" />
            ) : (
              <p className="noImage">No image added</p>
            )}

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>{product.price}</h3>

            <div className="buttons">

              <button
                className="modifyButton"
                onClick={() => modifyProduct(product.id)}
              >
                Modify
              </button>

              <button
                className="deleteButton"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default App