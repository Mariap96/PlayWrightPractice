import { expect, test } from "@playwright/test";
import {LoginPage} from "../pageobjects/loginPage";
import {SideMenuOptions, SidePanel} from "../components/SidePanel";


test("Login to HRM with Admin", async ({ page }) => {

  // Constructores
  const sidePanel = new SidePanel(page);

  await page.goto('/web/index.php/dashboard/index')

  // Aserción
  await sidePanel.validateSideBarOption(SideMenuOptions.ADMIN)

  await sidePanel.searchOption("Aqui Toy")

});

test("Login to HRM with ESS", async ({ page }) => {

  // Constructores
  const loginPage = new LoginPage(page);
  const sidePanel = new SidePanel(page);

  // LOGIN
  await loginPage.loginAsESS();

  // Aserción
  await expect(page.getByRole("link", { name: 'Admin' })).not.toBeVisible()

});

test("Login to HRM with invalid username", async ({ page }) => {
  // LOGIN
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin123", "admin123");

  //Aserción
  await expect(
    page.locator('xpath=//p[text()="Invalid credentials"]'),
  ).toBeVisible();
  await expect(
    page.locator('xpath=//p[text()="Invalid credentials"]'),
  ).toHaveText("Invalid credentials");
});

test("Login to HRM with invalid password", async ({ page }) => {
  // LOGIN
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin");

  //Aserción
  await expect(
    page.locator('xpath=//p[text()="Invalid credentials"]'),
  ).toBeVisible();
  await expect(
    page.locator('xpath=//p[text()="Invalid credentials"]'),
  ).toHaveText("Invalid credentials");
});

test("Login to HRM where you do not send user and password", async ({
  page,
}) => {
  // Mapeo e interacción con los elementos
  await page.goto('');
  await page.getByRole("button", { name: "Login" }).click();

  //Aserción
  await expect(
    page.locator(
      'xpath=//div[@class="oxd-form-row"][1]//span[text()="Required"]',
    ),
  ).toBeVisible();
  await expect(
    page.locator(
      'xpath=//div[@class="oxd-form-row"][2]//span[text()="Required"]',
    ),
  ).toBeVisible();
});
