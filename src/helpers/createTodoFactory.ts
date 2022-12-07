import { ITodoItem } from "@/types/TodoItem"
import uniqeId from "uniqid"

class InitTodoItem implements ITodoItem {
  readonly id: string = uniqeId()
  text: string
  done = false
  selected = false
  pomodoros = {
    count: 1,
    inSeconds: 1500,
    completedInSeconds: 0,
  }

  constructor(text: string) {
    this.text = text
  }
}

const TodoItemFactory = {
  makeTodoItem: function(text: string) {
    return new InitTodoItem(text);
  },
};

export default TodoItemFactory;