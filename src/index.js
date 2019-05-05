
import React from "react";
import ReactDOM from "react-dom";
import products from './products';
/*
- Display products in a grid
- Users should be able to sort products by
  id and price
- Users should be able to go to the details page 
  for each of the displayed products

- You can go wild with styles and other features 
  that come to your mind


  optional features:
  - product grid should auto load more items as 
    you scroll down
  - add to the product list

*/

import "./index.css";

export const Filter = ({ id, price, idChange, priceChange, clicked }) => {
  return (
    <div className="filter">
      <input type="text" name="id" value={id} placeholder="ID" onChange={idChange} />
      <br />
      <input type="number" name="price" value={price} placeholder="Price" onChange={priceChange} />
      <br />
      <button onClick={clicked}>FIlter</button>
    </div>
  );
}

export const ProductList = ({children}) => {

  return (
    <div className="products">
      {children}
    </div>
  );
}

export const Product = ({ name, price, image, dateAdded, clicked }) => {
  return (
    <div className="product" onClick={clicked}>
      <div className="product-image">
        <img src={image} alt=""/>
      </div>
      <div className="product-details">
        <p>Name: {name}</p>
        <p>Price: {price}NAIRA</p>
        <p>Date Added: {dateAdded}</p>
      </div>
    </div>
  );
}

export const FullProduct = ({ name, price, image, dateAdded, click }) => {
  return (
    <div className="full-product">
      <div className="full-product-image">
        <img src={image} alt=""/>
      </div>
      <div className="full-product-details">
        <p>Welcome to the page for {name}, one of our many products with wonderful reviews and excellent customer feedback. This product goes for {price} NAIRA ONLY and has been going on fast sales 
        immediately it got added on {dateAdded}. With great assurance, we're convinced you'll enjoy this {name}. Cheers!</p>
      </div>
      <button onClick={click}>back to product list</button>
    </div>
  );
}

export const AddProduct = ({ name, imageURL, price, change, clicked, disabled }) => {
  return (
    <div className="add-product">
      <h2>Kindly Enter Your New Product Here</h2>
      <input type="text" name="new_name" value={name} placeholder="Product Name" onChange={change} />
      <br />
      <input type="number" name="new_price" value={price} placeholder="Product Price" onChange={change} />
      <br />
      <input type="text" name="imageURL" value={imageURL} placeholder="Please Enter Image URL here" onChange={change} />
      <br />
      <button disabled={disabled} onClick={clicked}>Add Product</button>
    </div>
  );
}

class App extends React.Component {

  state = {
    productList: products,
    id: '',
    name: '',
    price: '',
    dateAdded: '',
    imageURL: '',
    fullProductView: false,
    disabled: true,
    new_name: '',
    new_price: ''
  }

  handleIdChange = event => {
    this.setState({ id: event.target.value });
  }

  handlePriceChange = event => {
    this.setState({ price: event.target.value });
  }

  handleFilterClick = () => {
    const id = this.state.id.toString();
    const price = this.state.price.toString();

    var filteredList = this.state.productList.filter(product =>product.id === +id &&  product.price === +price)

    this.setState({ productList: filteredList, id: '', price: '' })

  }

  productViewHandler = (id) => {
    const product = this.state.productList.filter(product => product.id === +id);

    this.setState({ productList: product, fullProductView: true });

  }

  newProductChange = event => {
      const {name, value } = event.target;

      this.setState({ [name]: value });

      if (this.state.new_name !== '' && this.state.new_price !== '' && this.state.imageURL !== '') {
        this.setState({ disabled: false });
      }

    }

  newProductHandler = () => {
    if ( !this.state.disabled ) {

        const productData = {
            id: this.state.productList.length + 1,
            name: this.state.new_name,
            price: this.state.new_price,
            image: this.state.imageURL,
            dateAdded: new Date()
        };
        // state can be updated immmutably with the 'concat' method
        this.setState( prevState => {

            const updatedProductList = prevState.productList.concat(productData);

            return {
                productList: updatedProductList,
                new_name: '',
                new_price: '',
                imageURL: '',
                disabled: true
    
            }
        });

        //***** OR it can be updated immmutably with the 'destructuring' method ****//
        
        // const productList = this.state.productList;

        // this.setState({
        //     productList: [...productList, productData],
        //     name: '',
        //     price: '',
        //     imageURL: '',
        //     disabled: true
        // });
    }


  }

  fullProductViewHandler = () => {
    this.setState({ fullProductView: false });
  }

  render () {
    let posts = 'Sorry, no items matched by that ID and Price';

    if ( this.state.productList.length > 0 ) {
        posts = this.state.productList.map(product => <Product key={product.id} name={product.name} price={product.price} image={product.image} dateAdded={product.dateAdded.toDateString()} clicked={() => this.productViewHandler(product.id)}/> );

    };

    const fullProductView = this.state.productList.map(product => <FullProduct key={product.id} name={product.name} price={product.price} image={product.image} dateAdded={product.dateAdded.toDateString()} click={this.fullProductViewHandler}/>);

    return (
      <div className="App">
        <h1>Home of Products</h1>

        <Filter 
            idChange={this.handleIdChange} 
            priceChange={this.handlePriceChange} 
            id={this.state.id} 
            price={this.state.price} 
            clicked={this.handleFilterClick}        
        />

        {this.state.fullProductView ? 
            <ProductList>
                {fullProductView} 
            </ProductList>
                :
            <ProductList>
                {posts}                
            </ProductList>
        }

        <AddProduct 
            name={this.state.new_name} 
            imageURL={this.state.imageURL} 
            price={this.state.new_price} 
            change={this.newProductChange} 
            clicked={this.newProductHandler}
            disabled={this.state.disabled}
        />
      </div>
    );  
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);