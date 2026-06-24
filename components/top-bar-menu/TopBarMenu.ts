import {Locator, Page} from "@playwright/test"
import {JobMenu} from "./JobMenu";
import {UserManagementMenu} from "./UserManagementMenu";


export class TopBarMenu {

    private readonly page: Page;
    readonly menu: Locator
    readonly subMenu: Locator
    //readonly userManagement: UserManagementMenu
    //readonly job: JobMenu

    constructor(page: Page) {
        this.page = page;
        //this.userManagement= new UserManagementMenu(page);
        //this.job = new JobMenu(page);
        this.menu = page.getByRole('navigation', {name: 'Topbar Menu'})
        this.subMenu = page.getByRole('menuitem')
    }

    async clickOnMenuTopBar(option: MenuOptions) {
        await this.menu.getByText(option).click()
    }

    async clickOnSubMenuTopBar(option: SubMenuOptions) {
        await this.subMenu.getByText(option).click()
    }

}

export enum MenuOptions {
    USER_MANAGEMENT = 'User Management',
    Job = 'Job',
    ORGANIZATION = 'Organization',
    QUALIFICATIONS = 'Qualifications',
    NATIONALITIES = 'Nationalities',
    CORPORATE_BRANDING = 'Corporate Branding',
    CONFIGURATION = 'Configuration'
}

export enum SubMenuOptions {
    JOB_TITLES = 'Job Titles',
    PAY_GRADES = 'Pay Grades',
    EMPLOYMENT_STATUS = 'Employment Status',
    JOB_CATEGORIES = 'Job Categories',
    WORK_SHIFTS = 'Work Shifts',
    GENERAL_INFORMATION = 'General Information',
    LOCATIONS = 'Locations',
    STRUCTURE = 'Structure',
    SKILLS = 'Skills',
    EDUCATION = 'Education',
    LICENSES = 'Licenses',
    LANGUAGES = 'Languages',
    MEMBERSHIPS = 'Memberships',
    EMAIL_CONFIGURATION = 'Email Configuration',
    EMAIL_SUBSCRIPTIONS = 'Email Subscriptions',
    LOCALIZATION = 'Localization',
    LANGUAGE_PACKAGES = 'Language Packages',
    MODULES = 'Modules',
    SOCIAL_MEDIA_AUTHENTICATION = 'Social Media Authentication',
    REGISTER_OAUTH_CLIENT = 'Register OAuth Client',
    LDAP_CONFIGURATION = 'LDAP Configuration'
}