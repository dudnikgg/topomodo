import { shallowMount } from "@vue/test-utils"
import { expect, it, describe } from "vitest"

import TodoItem from "./TodoItem.vue"

describe("TodoItem.vue test", () => {
  it("Show correct text 'TodoItem'", () =>{
    const wrapper = shallowMount(TodoItem)
    expect(wrapper.text()).toMatch("TodoItem")
  })
})
