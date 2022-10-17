import { shallowMount } from "@vue/test-utils";
import { expect, it, describe } from "vitest";

import TodoList from "./TodoList.vue";

describe("TodoList.vue test", () => {
    it("Shows add todo input and button", () => {
        const wrapper = Wrapper(TodoList);
        expect(wrapper.exists()).toBeTruthy();
    });

    it("Enables the add new todo button when input is not empty", async () => {
        const wrapper = Wrapper(TodoList);
        const input = wrapper.find('input[type="text"]');
        const button = wrapper.find('button[data-test="addTodo"]');

        expect(button.attributes("disabled")).toBeDefined();
        await input.setValue("todo2");
        expect(button.attributes("disabled")).toBeUndefined();
    })

    it("Adds new todo when 'add' button clicked and clears input", async () => {
        const wrapper = Wrapper(TodoList);
        const input = wrapper.get('input[type="text"]');
        const button = wrapper.get('button[data-test="addTodo"]');
        await input.setValue("todo2");
        await button.trigger("click");

        expect(wrapper.findAll("[data-test='todoItem']")).toHaveLength(1)

        expect(input.text()).toBe("");
    })

    it("Adds new todo when enter pressed and clears input", async () => {
        const wrapper = Wrapper(TodoList);
        const input = wrapper.get('input[type="text"]');
        await input.setValue("todo2");
        await input.trigger("keyup.enter");

        expect(wrapper.findAll("[data-test='todoItem']")).toHaveLength(1)

        expect(input.text()).toBe("");
    })

    // it("Removes todo from todoList when remove button clicked", async () => {
    //     const wrapper = Wrapper(TodoList);
    //     const input = wrapper.find('input[type="text"]');
    //     const button = wrapper.find('button[data-test="removeTodo"]');
    //     await input.setValue("todo2");
    //     await button.trigger("click");
    //     const removeButton = wrapper.find('button[data-test="removeTodo"]');
    //     await removeButton.trigger("click");
    //     expect(wrapper.vm.$.setupState.todos.length).toBe(0);
    // })
});

function Wrapper(props: object) {
    return shallowMount(TodoList, {
        props: {
        ...props,
        },
    });
}