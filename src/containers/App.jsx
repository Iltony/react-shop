// @flow
import React from 'react';
import axios, { type $AxiosXHR } from 'axios';
import { Route, Redirect, Switch, type ContextRouter } from 'react-router';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
import { type Product, type Category } from '../types';
import s from './App.css';

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  loading: boolean,
};

export default class App extends React.Component<Props, State> {
  state = {
    products: [],
    categories: [],
    loading: true,
  }

  componentDidMount() {
    Promise.all([this.fetchProducts(), this.fetchCategories()])
      .then(() => this.setState({ loading: false }));
  }

  fetchProducts() {
    return axios.get('http://develop.plataforma5.la:3000/api/products')
      .then((res: $AxiosXHR<Product[]>) => res.data)
      .then((products: Product[]) => this.setState({ products }));
  }

  fetchCategories() {
    return axios.get('http://develop.plataforma5.la:3000/api/categories')
      .then((res: $AxiosXHR<Category[]>) => res.data)
      .then((categories: Category[]) => this.setState({ categories }));
  }

  addProduct = (product: Product) => {
    this.setState({
      products: [product, ...this.state.products],
    });
  }

<<<<<<< HEAD
  addProductToCart = (productId: ?string) => {
    axios.post('http://develop.plataforma5.la:3000/api/cart/', { productId });
  }

=======
>>>>>>> d82b476fae166b5378ecb57f5b7354fbe94c140c
  render() {
    return (
      this.state.loading ?
        <div>Loading...</div>
        :
        <div className={s.layout}>
          <div>
            <Sidebar
              addProduct={this.addProduct}
              categories={this.state.categories}
            />
          </div>
          <div>
            <Switch>
              <Route
                path="/products"
                exact
                render={(props: ContextRouter) => (
                  <Grid
                    products={this.state.products}
                    selectedCategory={Number(new URLSearchParams(props.location.search).get('category'))}
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
                render={(props: ContextRouter) => (
                  <ProductComponent
                    {...props}
                    product={this.state.products.find(product =>
                      String(product.id) === props.match.params.id)}
                  />
                )}
              />
              <Redirect exact from="/" to="/products" />
              <Route render={() => <div>Page Not Found</div>} />
            </Switch>
          </div>
        </div>
    );
  }
}
