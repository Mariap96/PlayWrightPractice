import {expect, Locator, Page} from "@playwright/test";

export class SidePanel {

    readonly page:Page

    constructor(page:Page) {
        this.page = page;
    }

    private menuOption(option:SideMenuOptions):Locator{
        return this.page.getByRole("link", { name: option })
    }

    private searchTextbox():Locator{
        return this.page.getByRole("textbox", {name: 'Search'})
    }

    async clickOnSideBarOption(option:SideMenuOptions){
        await this.menuOption(option).click()
    }

    async validateSideBarOption(option:SideMenuOptions){
        await expect(this.menuOption(option)).toBeVisible();
    }

    async searchOption(value:string){
        await this.searchTextbox().click()
        await this.searchTextbox().fill(value)
    }

}

export enum SideMenuOptions {
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUITMENT =  'Recruitment',
    MY_INFO = 'My info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY = 'Directory',
    MAINTENANCE = 'Maintenance',
    CLAIM = 'Claim',
    BUZZ = 'Buzz',
}