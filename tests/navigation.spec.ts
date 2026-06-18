import {expect, test} from "@playwright/test";
import {LoginPage} from "../pageobjects/loginPage";


test("Check left menu options", async({page})=>{

    // LOGIN
    const loginPage = new LoginPage(page);
    await loginPage.doLogin("Admin", "admin123");
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole("listitem")
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log("Current menu items count", currentMenuItemsCount)

    const currentMenuItems: string[] = []
    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuText = await leftMenuItems.nth(i).innerText();
        currentMenuItems.push(menuText);
    }
    console.log(currentMenuItems);
    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ]

    expect(currentMenuItems).toEqual(expectedMenuItems);
    expect(currentMenuItems[0]).toEqual(expectedMenuItems[0]);
})


test("Navigate to the left panel", async({page})=>{
    // LOGIN
    const loginPage = new LoginPage(page);
    await loginPage.doLogin("Admin", "admin123");
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    // LEFT MENU
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole("listitem")
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText();

        console.log("Current menu item", menuText)
        if(menuText =='Maintenance'){
            await menuItem.click();
            await expect(page.getByRole("heading",{name:"Administrator Access"})).toBeVisible()
            await page.goBack()
            await expect(page.getByLabel('Sidepanel')).toBeVisible();
        }else{
            await menuItem.click();
        }

    }
})

test("Check all the qualification links", async({page})=>{

    const expectedPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills',
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation',
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },
        {
            menu: 'Languages',
            url: '/web/index.php/admin/viewLanguages'
        },
        {
            menu: 'Memberships',
            url: '/web/index.php/admin/membership'
        }
    ]

    // LOGIN
    const loginPage = new LoginPage(page);
    await loginPage.doLogin("Admin", "admin123");
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Qualifications").click();

    const qualificationOptions = page.getByRole("menu").locator('li')

    for (let expectedPage of expectedPages) {
        const menuOptions = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOptions.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Qualifications").click();
    }

})

test("Check all the job links", async({page})=>{

    const expectedPages = [
        {
            menu: 'Job Titles',
            url: '/web/index.php/admin/viewJobTitleList',
        },
        {
            menu: 'Pay Grades',
            url: '/web/index.php/admin/viewPayGrades',
        },
        {
            menu: 'Employment Status',
            url: '/web/index.php/admin/employmentStatus'
        },
        {
            menu: 'Job Categories',
            url: '/web/index.php/admin/jobCategory'
        },
        {
            menu: 'Work Shifts',
            url: '/web/index.php/admin/workShift'
        }
    ]

    // LOGIN
    // LOGIN
    const loginPage = new LoginPage(page);
    await loginPage.doLogin("Admin", "admin123");
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job").click();

    const jobOptions = page.getByRole("menu").locator('li')

    for (let expectedPage of expectedPages) {
        const menuOptions = jobOptions.filter({hasText: expectedPage.menu})
        await menuOptions.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job").click();
    }

})