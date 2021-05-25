import ProductCard from './ProductCard.client'
import {fetch} from 'react-fetch'

export default function Products({searchText}) {
  console.info(searchText)
  const products = fetch(`http://localhost:4000/products?searchText=${encodeURIComponent(searchText)}`).json()

  return products.length > 0 ? (
    products.map(product => <ProductCard key={product.id} product={product} />)
  ) : (
    <div className="notes-empty">
      {searchText ? `Couldn't find any notes titled "${searchText}".` : 'No notes created yet!'}{' '}
    </div>
  )
}
