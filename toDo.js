import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], title: '', text: ''};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleChangeText(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.title.length && !this.state.text.length) {
      return;
    }
    const newItem = {
      title: this.state.title,
      text: this.state.text,
      date: new Date(),
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem)
    }));
  }

  render() {
    return (
      <div>
        <h3>To do</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-title">Title</label>
          <input
            id="new-title"
            onChange={this.handleChangeTitle}
            value={this.state.title}
          />
          <br />
          <label htmlFor="new-text">Text</label>
          <input
            id="new-text"
            onChange={this.handleChangeText}
            value={this.state.text}
          />
          <button>Add</button>
        </form>
        <TodoList items={this.state.items} />
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <Inner item={item} />
        ))}
      </ul>
    );
  }
}

class Inner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false, complited: false, 
      title: this.props.item.title, text: this.props.item.text};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
    this.handleComplition = this.handleComplition.bind(this);
  }
  handleTextEdit(e) {
    this.setState({ text: e.target.value });
  }
  handleComplition(e) {
    this.setState({ complited: !this.state.complited });
  }
  handleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  render() {
    return (
      <li key={this.props.item.id}>
      <div className='checker'><input onClick={this.handleComplition} type='checkbox'/></div>
        <h4>{this.state.title}</h4>
        {!this.state.edit ? 
        <div>{this.state.text}</div> : 
          <textarea onChange={this.handleTextEdit} value={this.state.text}></textarea> }
          <div>{this.props.item.date.toLocaleString()}</div>
        {!this.state.complited ? 
        <button onClick={this.handleEdit}>Edit</button> : <span />}
      </li>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));