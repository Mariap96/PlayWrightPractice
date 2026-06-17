import { expect, test } from "@playwright/test";

const URL_BASE = "https://opensource-demo.orangehrmlive.com";

test("Get all the usernames registered", async ({ page }) => {
  // Mapeo e interacción con los elementos
  await page.goto(URL_BASE);
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  // Aserción
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

  console.log(usernames);
});

test("Get all the employee names registered", async ({ page }) => {
  // Mapeo e interacción con los elementos
  await page.goto(URL_BASE);
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

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

  await page.goto(URL_BASE);
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
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


