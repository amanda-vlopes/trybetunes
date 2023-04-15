import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    // user: {},
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
  };

  async componentDidMount() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      loading: false,
      // user,
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isButtonDisabled = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isNameValid = userName.length > 0;
    const isEmailValid = (userEmail.length > 0) && (regexEmail.test(userEmail));
    const isImageValid = userImage.length > 0;
    const isDescriptionValid = userDescription.length > 0;
    return isNameValid && isEmailValid && isImageValid && isDescriptionValid;
  };

  render() {
    const { loading, userName, userEmail, userImage, userDescription } = this.state;
    // const { name, email, image, description } = user;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading
            ? (<Carregando />)
            : (
              <div>
                <label htmlFor="userName">
                  Nome:
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    data-testid="edit-input-name"
                    value={ userName }
                    onChange={ this.onInputChange }
                  />
                </label>

                <label htmlFor="userEmail">
                  Email:
                  <input
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    data-testid="edit-input-email"
                    value={ userEmail }
                    onChange={ this.onInputChange }
                  />
                </label>

                <label htmlFor="">
                  URL imagem:
                  <input
                    type="text"
                    name="userImage"
                    id="userImage"
                    data-testid="edit-input-image"
                    value={ userImage }
                    onChange={ this.onInputChange }
                  />
                </label>

                <label htmlFor="userDescription">
                  Descrição:
                  <textarea
                    name="userDescription"
                    id="userDescription"
                    cols="30"
                    rows="10"
                    data-testid="edit-input-description"
                    value={ userDescription }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  disabled={ !this.isButtonDisabled() }
                  data-testid="edit-button-save"
                  onClick={ this.updateInfo }
                >
                  Salvar
                </button>
              </div>
            )}
        </div>
      </>
    );
  }
}
