import { expect, test } from "@playwright/test";
import {LoginPage} from "../pageobjects/loginPage";

test("Get all the usernames registered", async ({ page }) => {
  // LOGIN
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  // Assertion
  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();

  await page
    .getByRole("navigation", { name: "Topbar Menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");
  const usernames: string[] = [];

  const rowsCount = await rows.count();

  for (let i = 1; i < rowsCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(1);
    const username = await cell.textContent();
    if (username) {
      usernames.push(username);
    }
  }

  console.log(usernames);
});

test("Get all the employee names registered", async ({ page }) => {
  // LOGIN
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  // Aserción
  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click()

  await page
    .getByRole("navigation", { name: "Topbar Menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");
  const employees: string[] = [];

  const rowsCount = await rows.count();

  for (let i = 1; i < rowsCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(3);
    const employee = await cell.textContent();
    if (employee) {
      employees.push(employee);
    }
  }

  console.log(employees);
});

test("Select specific user for edition", async ({ page }) => {

  // LOGIN
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();
  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click()

  await page
      .getByRole("navigation", { name: "Topbar Menu" })
      .getByText("User Management")
      .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");
  const usernames: string[] = [];

  const rowsCount = await rows.count();

  for (let i = 1; i < rowsCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(1);
    const username = await cell.textContent();
    if (username) {
      usernames.push(username);
    }
  }

  const removeValue = 'Admin'

  const userToFilter = usernames.filter(user => user !==removeValue)

  const indRandom = Math.floor(Math.random() * userToFilter.length);

  const userForEdition = userToFilter[indRandom];

  console.log(userForEdition);

  const pencilButton = page.getByRole("table").getByRole("row")
      .filter({hasText:userForEdition})
      .locator('button').nth(1);

  await pencilButton.click();

  const currentUserName= await page.locator("//label[text()='Username'] /parent::div/following-sibling::div/input").inputValue()

  expect(currentUserName).toEqual(userForEdition);

})


