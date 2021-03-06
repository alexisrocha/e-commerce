import React from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import { withRouter } from "react-router";
import { finalCarrito, buscarCarrito } from "../../redux/actions/carrito";

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dir_entrega: "",
      ciudad_entrega: "",
      CP_entrega: "",
      name: this.props.user.name,
      email: this.props.user.email,
      valor_compra:0,
      estado: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.acumulador = this.acumulador.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    buscarCarrito(user.id);
  }

  handleChange(event) {
    switch (event.target.name) {
      case "codigoPostal":
        this.setState({ CP_entrega: event.target.value });
      case "ciudadEntraga":
        this.setState({ ciudad_entrega: event.target.value });
      case "direccionEntrega":
        this.setState({ dir_entrega: event.target.value });
    }
  }

  acumulador(event, total){
    event.preventDefault()
    return this.setState({
      valor_compra: total,
      estado: true
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const { finalCarrito, user, history } = this.props;
    finalCarrito(user.id, this.state).then(() => {
      return history.push("/reviews");
    });
  }

  render() {
    const { cart, user } = this.props;
    return (
      <Checkout
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        cart={cart}
        user={user}
        acumulador={this.acumulador}
        estado={this.state.estado}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.logUserReducer.isLogged,
    cart: state.carritoUser.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    finalCarrito: (id, carritoFinalizado) =>
      dispatch(finalCarrito(id, carritoFinalizado)),
    buscarCarrito: (id) => dispatch(buscarCarrito(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
);
