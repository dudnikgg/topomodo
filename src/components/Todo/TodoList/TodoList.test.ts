import { shallowMount } from "@vue/test-utils";
import { expect, it, describe } from "vitest";

import TodoList from "@/components/ToDo/TodoList/TodoList.vue";

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
        await input.setValue("todo");
        expect(button.attributes("disabled")).toBeUndefined();
    })

    it("Adds new todo when 'add' button clicked and clears input", async () => {
        const wrapper = Wrapper(TodoList);
        const input = wrapper.get('input[type="text"]');
        const button = wrapper.get('button[data-test="addTodo"]');
        await input.setValue("todo");
        await button.trigger("click");

        expect(wrapper.findAll("[data-test='todoItem']")).toHaveLength(2)

        expect(input.text()).toBe("");
    })

    it("Adds new todo when enter pressed and clears input", async () => {
        const wrapper = Wrapper(TodoList);
        const form = wrapper.get('form[data-test="addTodoForm"]');
        const input = form.get('input[type="text"]');
        await input.setValue("todo");
        await form.trigger("submit.prevent");

        expect(wrapper.findAll("[data-test='todoItem']")).toHaveLength(2)

        expect(input.text()).toBe("");
    })
});

function Wrapper(props: object) {
    return shallowMount(TodoList, {
        props: {
        ...props,
        },
    });
}