import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestAPI, saveNamePlayer } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setDisabled = this.setDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setDisabled() {
    this.setState((prevState) => {
      if (prevState.name.length > 0 && prevState.email.length > 0) {
        return {
          isDisabled: false,
        };
      } return {
        isDisabled: true,
      };
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { name } = this.state;
    const { requestTriviaToken, registerName } = this.props;
    requestTriviaToken();
    registerName(name);
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <main>
        <form>
          <label htmlFor="name">
            Nome do Jogador:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ (event) => {
                this.handleChange(event);
                this.setDisabled();
              } }
            />
          </label>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ (event) => {
                this.handleChange(event);
                this.setDisabled();
              } }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
        <Link to="/setting">
          <button data-testid="btn-settings" type="button">Configuração</button>
        </Link>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestTriviaToken: () => dispatch(requestAPI()),
  registerName: (name) => dispatch(saveNamePlayer(name)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  requestTriviaToken: propTypes.func.isRequired,
  registerName: propTypes.func.isRequired,
};
