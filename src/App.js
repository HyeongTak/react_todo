import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';


const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];


@observer
class App extends Component {

  id = 3; // 이미 0,1,2 가 존재하므로 3으로 설정

  @observable input= '';
  @observable todos= [
    { id: 0, text: ' 리액트 소개', checked: false },
    { id: 1, text: ' JSX 사용해보기', checked: true },
    { id: 2, text: ' 라이프 사이클 이해하기', checked: false }
  ];
  @observable color= '#343a40';
  

  @action
  handleChange = (e) => {
    this.input = e.target.value // input 의 다음 바뀔 값
  }

  @action
  handleCreate = () => {
    const { input, todos, color } = this;
    
    this.input= ''; // 인풋 비우고
      // concat 을 사용하여 배열에 추가
    this.todos= todos.concat({
      id: this.id++,
      text: input,
      checked: false,
      color
    });
  }

  @action
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  @action
  handleToggle = (id) => {
    const { todos } = this;
    const index = todos.findIndex(todos => todos.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.todos = nextTodos;
  }

  @action
  handleRemove = (id) => {
    const { todos } = this;
    this.todos = todos.filter(todo => todo.id !== id)
  }

  @action
  handleSelectColor = (color) => {
    this.color = color
  }

  render() {
    const { input, todos, color } = this;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
      palette={(
        <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;