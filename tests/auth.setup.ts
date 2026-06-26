import {test as setup, expect} from "@playwright/test";
import {LoginPage} from "../pageobjects/loginPage";


setup('authentication as admin', async ({page}) => {

    console.log('Autenticacion iniciada usando el setup')
    // iniciar sesion
    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();

    //nos aseguramos que el inicio de sesion
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    // Guardar el estado
    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Autenticacion completada usando el setup ')
})


setup('authentication as ess', async ({page}) => {

    console.log('Autenticacion iniciada usando el setup')
    // iniciar sesion
    const loginPage = new LoginPage(page);
    await loginPage.loginAsESS();

    //nos aseguramos que el inicio de sesion no fuera con un user admin
    await expect(page.getByRole("link", { name: 'Admin' })).not.toBeVisible()

    // Guardar el estado
    await page.context().storageState({path: '.auth/ess.json'})

    console.log('Autenticacion completada usando el setup ')
})