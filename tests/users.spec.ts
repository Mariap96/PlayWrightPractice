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

