import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  receiveToken, requestQuestions,
  increaseScore, toggleStatusCronometer } from '../actions';
import '../style/question.css';

const CORRECT_ANSWER = 'correct-answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.generateRandomAnswers = this.generateRandomAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.insertClass = this.insertClass.bind(this);
  }

  componentDidMount() {
    const { getQuestions, getToken, token } = this.props;
    getToken();
    getQuestions(token);
  }

  generateRandomAnswers(correctAnswer, incorrectAnswer) {
    const range = 20;
    const getRandom = () => Math.ceil(Math.random() * range);
    if (incorrectAnswer.length < 2) {
      return [
        { id: getRandom(), answer: correctAnswer, dataTestId: CORRECT_ANSWER },
        { id: getRandom(), answer: incorrectAnswer, dataTestId: 'wrong-answer-0' },
      ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    }
    return [
      { id: getRandom(), answer: correctAnswer, dataTestId: CORRECT_ANSWER },
      { id: getRandom(), answer: incorrectAnswer[0], dataTestId: 'wrong-answer-0' },
      { id: getRandom(), answer: incorrectAnswer[1], dataTestId: 'wrong-answer-1' },
      { id: getRandom(), answer: incorrectAnswer[2], dataTestId: 'wrong-answer-2' },
    ].sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  }

  insertClass() {
    const correctButton = document.querySelector('button[data-testid="correct-answer"]');
    const wrongButton = document.querySelectorAll('button[data-testid*="wrong-answer"]');
    correctButton.classList.add('correct');
    wrongButton.forEach((button) => button.classList.add('incorrect'));
  }

  handleClick({ target: { id } }) {
    const { setStatusCronometer, seconds, setScore, questions } = this.props;
    const TEN = 10;
    const { index } = this.state;
    const { difficulty } = questions[index];
    const difficultyScore = { hard: 3, medium: 2, easy: 1 };
    this.insertClass();
    setStatusCronometer('off');
   /*  if (id === CORRECT_ANSWER) {
      const score = TEN + (difficultyScore[difficulty] * seconds);
      setScore(score);
    } */
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;

    if (questions.length) {
      const {
        category,
        question,
        correct_answer: correct,
        incorrect_answers: incorrects } = questions[index];
      const randonAnswers = this.generateRandomAnswers(correct, incorrects);
      return (
        <section>
          <div data-testid="question-category">{ category }</div>
          <div data-testid="question-text">{ question }</div>
          <div>
            {randonAnswers.map(({ id, answer, dataTestId }) => (
              <button
                onClick={ (event) => this.handleClick(event) }
                type="button"
                data-testid={ `${dataTestId}` }
                key={ id }
                id={ `${dataTestId}` }
              >
                {answer}
              </button>
            ))}
          </div>
        </section>
      );
    }
    return <section>carregando...</section>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  token: state.trivia.token,
  seconds: state.trivia.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestions(token)),
  getToken: () => dispatch(receiveToken()),
  setScore: (score) => dispatch(increaseScore(score)),
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  getQuestions: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  setScore: propTypes.func.isRequired,
  setStatusCronometer: propTypes.func.isRequired,
  seconds: propTypes.number.isRequired,
};
