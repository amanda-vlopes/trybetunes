import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  }

  render() {
    const { user, loading } = this.state;
    const { name, email, image, description } = user;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading
            ? (<Carregando />)
            : (
              <div>
                <p>{ name }</p>
                <p>{ email }</p>
                <img src={ image } alt={ name } data-testid="profile-image" />
                <p>{ description }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </>
    );
  }
}
