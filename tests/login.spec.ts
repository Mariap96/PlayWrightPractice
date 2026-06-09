import {expect, test} from '@playwright/test'

const URL_BASE = 'https://opensource-demo.orangehrmlive.com'

test('Login to HRM', async ({page}) =>{

    // Mapeo e interacción con los elementos
    await page.goto(URL_BASE)
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button', {name:'Login'}).click()

    // Aserción
    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()
});

test('Login to HRM with invalid username', async ({page})=> {

    // Mapeo e interacción con los elementos
    await page.goto(URL_BASE)
    await page.getByRole('textbox', {name:'Username'}).fill('Admin1')
    await page.getByRole('textbox', {name:'Password'}).fill('admin123')
    await page.getByRole('button', {name:'Login'}).click()

    //Aserción 
    await expect(page.locator('xpath=//p[text()="Invalid credentials"]')).toBeVisible()
    await expect(page.locator('xpath=//p[text()="Invalid credentials"]')).toHaveText('Invalid credentials')

});

test('Login to HRM with invalid password', async ({page})=> {

    // Mapeo e interacción con los elementos
    await page.goto(URL_BASE)
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')
    await page.getByRole('textbox', {name:'Password'}).fill('admin1234')
    await page.getByRole('button', {name:'Login'}).click()

    //Aserción 
    await expect(page.locator('xpath=//p[text()="Invalid credentials"]')).toBeVisible()
    await expect(page.locator('xpath=//p[text()="Invalid credentials"]')).toHaveText('Invalid credentials')
});

test('Login to HRM where you do not send user and password', async ({page})=> {

    // Mapeo e interacción con los elementos
    await page.goto(URL_BASE)
    await page.getByRole('button', {name:'Login'}).click()

    //Aserción 
    await expect(page.locator('xpath=//div[@class="oxd-form-row"][1]//span[text()="Required"]')).toBeVisible()
    await expect(page.locator('xpath=//div[@class="oxd-form-row"][2]//span[text()="Required"]')).toBeVisible()
});
