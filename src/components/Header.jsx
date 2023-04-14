import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
        </ul>
      </header>
    );
  }
}
