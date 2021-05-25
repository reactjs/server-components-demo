import {ProductCardStyles as UI} from './ProductCardStyles.server'

export default function ProductCard({product}) {
  const {name, image, description} = product
  return (
    <UI.Card className="col-md-4 col-sm-6 col-lg-2">
      <div className="card">
        <img src={image} className="card-img-top" height="100rem" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </UI.Card>
  )
}
