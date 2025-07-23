import { expect, test } from "@playwright/test";
import { MainPage } from "../pages/mainPage";

let mainPage: MainPage;
//Creates Todo List
const todoList = ["todo 1", "todo 2", "todo 3"];

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page, todoList);
  await mainPage.navigate();
});
test("Create and verify toDo items from MainPage class", async ({ page }) => {
  await mainPage.addTodoItems();
  for (let i = 0; i < todoList.length; i++) {
    await expect(mainPage.todoItemsLocator(i)).toBeVisible();
    await expect(mainPage.todoItemToggle(i)).toBeVisible();
  }
});
test("Create toDo items from MainPage class and count items to left", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await expect(mainPage.todoCount).toContainText(`${todoList.length} item`);
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(3);
});
test("Create todo items and click second one to activate", async ({ page }) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await expect(mainPage.todoItemContainer(1)).toHaveClass("completed");
});

test("Create todo items and click second one to activate and delete it", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await mainPage.todoItemContainer(1).hover();
  await mainPage.deleteButton.click();
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(2);
});

test("Create todo items and click second one to activate then clear complete", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await mainPage.clearCompleted.click();
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(2);
});

test("Create todo items and click second one to activate then click completed", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await mainPage.completed.click();
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(1);
});

test("Create todo items and click second one to activate then click Active", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await mainPage.activeButton.click();
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(2);
});

test("Create todo items and click second one to activate then click All", async ({
  page,
}) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemToggle(1).click();
  await mainPage.allButton.click();
  const todoItemsCount = await mainPage.todoItemLabel.count();
  await expect(todoItemsCount).toBe(3);
});

test("Create todo items. Edit second item to 'new entry'", async ({ page }) => {
  await mainPage.addTodoItems();
  await mainPage.todoItemsLocator(1).dblclick();
  await mainPage.textEditor.fill("new entry");
  await mainPage.textEditor.press("Enter");
  const updatedLabel = mainPage.todoItemLabel.filter({ hasText: "new entry" });
  await expect(updatedLabel).toHaveText("new entry");
});
