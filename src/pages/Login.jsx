import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    nameLogin: '',
    buttonDisabled: true,
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const tamanhoMinimo = 3;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < tamanhoMinimo,
    });
  };

  handleLogin = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const { nameLogin, buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? (<Carregando />)
          : (
            <form action="">
              <input
                type="text"
                name="nameLogin"
                id="nameLogin"
                data-testid="login-name-input"
                placeholder="Digite o seu nome"
                onChange={ this.onInputChange }
                value={ nameLogin }
              />
              <button
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.handleLogin }
              >
                Entrar
              </button>
            </form>
          )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
