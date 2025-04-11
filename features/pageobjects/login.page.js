import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputCurrentAge () {
        return $('#current-age');
    }

    get inputRetireAge () {
        return $('#retirement-age');
    }

    get inputCurrentSalary(){return $('//*[@id = "current-income"]');}

    get inputSpouseSalary () {
        return $('#spouse-income');
    }

    get inputcurrentRetirementSaving () {
        return $('//*[@id="current-total-savings"]');
        //*[@id="current-total-savings"]
    }

    get inputRetirementContribution () {
        return $('#current-annual-savings');
    }

    get inputRateContribution () {
        return $('#savings-increase-rate');
    }
    get NoSocialSecurity () {
        return $('//*[@id="no-social-benefits"]');
    }

    get YesSocialSecurity () {
        return $('//*[@id="yes-social-benefits"]');
    }

    get SecurityOverride () {
        return $('//*[@id="social-security-override"]');
    }

    get MaritalStatusSingle () {  return $('//*[@id="single"]');}
    get MaritalStatusMarried () {  return $('//*[@id="married"]');}

    get btnSubmit () {
        return $('//*[@data-tag-id="submit"]');
    }

    get message () {
        return $('//*[@id="result-message"]');
    }

    get editInfo () {
        return $('//*[@id="calculator-results-container"]/div[2]/div[2]/div[2]/div/div/div/button[2]');
    }

    get errorMessage () {
        return $('//*[@id="calculator-input-alert-desc"]');
    }

    get errorMessage1 () {  
        return $('//*[@id="invalid-retirement-age-error"]');
    }

    get adjustDefaultValues() {return $('=Adjust default values');}
    get inputAdditionalIncome() {return $('#additional-income');}
    get inputRetirementDuration() {return $('//*[@id="retirement-duration"]');}
    get inputRetirementAnnualIncome() {return $('#retirement-annual-income');}
    get inputPreRetirementROI() {return $('#pre-retirement-roi');}
    get inputPostRetirementROI() {return $('#post-retirement-roi');}
    get buttonSaveChanges() {return $("//*[text()='Save changes']");}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    // async login (username, password) {
    //     await browser.maximizeWindow(); // Maximizes the browser window
    //     await this.inputCurrentAge.setValue(username);
    //     await browser.pause(6000);
    //     await this.inputRetireAge.setValue(password);
    //     await browser.pause(6000);
    //     browser.setTimeout({
    //                 'pageLoad': 60000,
    //                 'script': 60000
    //             });
        // await this.btnSubmit.click();
    // }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        try {
            const cookieButton =  $("//*[@class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']");
            if ( cookieButton.waitForDisplayed({ timeout: 5000 })) { // Wait for the element to be displayed
                if ( cookieButton.waitForClickable({ timeout: 5000 })) { // Wait for the element to be clickable
                        cookieButton.click(); // Click the button
                }
            }
        } catch (error) {
            console.log('Cookie consent button not found or not clickable, continuing...');
        }
        return super.open('login');
    }

}

export default new LoginPage();
