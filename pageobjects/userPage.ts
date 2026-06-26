import {Locator, Page} from "@playwright/test";

export class User{

    private readonly page: Page;
    private readonly optionsDropdown: Locator
    private readonly searchButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.optionsDropdown = page.getByRole('listbox').getByRole("option")
        this.searchButton = page.getByRole('button', {name: 'Search'})
    }

    async clickOnUserLabels(option:string){
        const selectDropDown =  this.page.locator(`//label [text()='${option}'] /parent::div/following-sibling::div`)
        await selectDropDown.click();
    }

    async getAllDropdownOptions(): Promise<string[]> {
       return await this.optionsDropdown.allInnerTexts()
    }

    async chooseOptionDropDown(option:string){
        await this.page.getByRole('listbox').getByRole('option',{name: option}).click()
    }

    async clickOnSearch(){
        await this.searchButton.click()
    }

}


export enum labelOptions {
    USERNAME = 'Username',
    USER_ROLE = 'User Role',
    EMPLOYEE = 'Employee Name',
    STATUS = 'Status',
}

export enum UserRoleOptions {
    ADMIN = 'Admin',
    ESS = 'ESS'
}