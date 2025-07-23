import { Locator, Page } from "@playwright/test";

export class MainPage {
  page: Page;
  textInput: Locator;
  todoItemsLocator: (index: number) => Locator;
  todoItemToggle: (index: number) => Locator;
  todoItemContainer: (index: number) => Locator;
  todoItems: string[];
  todoCount: Locator;
  todoItemLabel: Locator;
  deleteButton: Locator;
  clearCompleted: Locator;
  completed: Locator;
  activeButton: Locator;
  allButton: Locator;
  textEditor: Locator;

  constructor(page: Page, todoItems: string[]) {
    this.page = page;
    this.todoItems = todoItems;
    this.textInput = page.getByTestId("text-input");
    this.todoItemsLocator = (index: number) =>
      page.getByTestId("todo-item-label").filter({ hasText: todoItems[index] });
    this.todoItemToggle = (index: number) =>
      page
        .getByRole("listitem")
        .filter({ hasText: todoItems[index] })
        .getByTestId("todo-item-toggle");
    this.todoItemContainer = (index: number) =>
      page.getByTestId("todo-item").filter({ hasText: this.todoItems[index] });
    this.todoCount = page.locator(".todo-count");
    this.todoItemLabel = page.getByTestId("todo-item-label");
    this.deleteButton = page.getByRole("button", { name: "×" });
    this.clearCompleted = page.getByRole("button", { name: "Clear completed" });
    this.completed = page.getByRole("link", { name: "Completed" });
    this.activeButton = page.getByRole("link", { name: "Active" });
    this.allButton = page.getByRole("link", { name: "All" });
    this.textEditor = page.getByTestId("todo-list").getByTestId("text-input");
  }
  async navigate() {
    this.page.goto("https://todo-app.tallinn-learning.ee");
  }
  async addTodoItems() {
    for (let item of this.todoItems) {
      await this.textInput.fill(item);
      await this.textInput.press("Enter");
    }
  }
}
