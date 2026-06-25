import {Locator, Page} from "@playwright/test";

export class User{

    private readonly page: Page;
    private readonly optionsDropdown: Locator

    constructor(page: Page) {
        this.page = page;
        this.optionsDropdown = page.getByRole('listbox').getByRole("option")

    }

    async clickOnDropdown(option:string){
        const selectDropDownOption =  this.page.locator(`//label [text()='${option}'] /parent::div/following-sibling::div`)
        await selectDropDownOption.click();
    }

    async getAllDropdownOptions(): Promise<string[]> {
       return await this.optionsDropdown.allInnerTexts()
    }

}


export enum labelOptions {
    USERNAME = 'Username',
    USER_ROLE = 'User Role',
    EMPLOYEE = 'Employee Name',
    STATUS = 'Status',
}