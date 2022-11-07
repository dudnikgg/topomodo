import { shallowMount } from "@vue/test-utils"
import { expect, it, describe } from "vitest"

import TodoItem from "@/components/ToDo/TodoItem/TodoItem.vue"

describe("TodoItem.vue test", () => {
  it("Toggle todo done/not done", async () => {
    const wrapper = Wrapper({
      todo: {
        id: 1,
        text: "todo1",
        done: false,
      },
    })
    wrapper.find("input[data-test='toggleTodo']").trigger("click")

    expect(wrapper.emitted("toggleTodo")).toHaveLength(1)
    expect(wrapper.emitted("toggleTodo")[0]).toEqual([1, true])

    const wrapper2 = Wrapper({
      todo: {
        id: 1,
        text: "todo1",
        done: true,
      },
    })
    wrapper2.find("input[data-test='toggleTodo']").trigger("click")

    expect(wrapper2.emitted("toggleTodo")).toHaveLength(1)
    expect(wrapper2.emitted("toggleTodo")[0]).toEqual([1, false])
  })

  it("Emits a remove event with todo id", async () => {
    const wrapper = Wrapper({
      todo: {
        id: 1,
        text: "todo1",
        done: false,
      },
    })
    wrapper.find("[data-test='removeTodo']").trigger("click")

    expect(wrapper.emitted("removeTodo")).toHaveLength(1)
  })

  // it("Emits a pomodoro event (pomodoros estimate) with todo id", async () => {
  //   const wrapper = Wrapper({
  //     todo: {
  //       id: 1,
  //       text: "todo1",
  //       done: false,
  //       pomodoros: 3
  //     }
  //   })

  //   wrapper.find("button[data-test='pomodorosTodo']").trigger("click")

  //   expect(wrapper.emitted("pomodorosTodo")).toHaveLength(1)
  // })
})

function Wrapper(props: object) {
  return shallowMount(TodoItem, {
    props: {
      ...props,
    },
  })
}
