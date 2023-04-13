import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    loading: true,
    nameUser: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      loading: false,
      nameUser: name,
    });
  }

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? (<Carregando />)
          : (
            <p data-testid="header-user-name">{ nameUser }</p>
          )}
      </header>
    );
  }
}
