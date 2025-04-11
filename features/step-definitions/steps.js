import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'
import chalk from 'chalk';

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
import { commonUtils } from '../../Utils/commonUtils.js'; // Adjust the path as needed
import { takeScreenshot } from '../../Utils/screenshotUtils.js';


const pages = {
    login: LoginPage
}

Given(/^I (\w+) the Pre-retirement calculator application$/, async (page) => {
    await pages[page].open()
    await takeScreenshot("MainPage"); 
    await browser.pause(5000);                                                      
});

When(/^I input the data with required details$/, async (dataTable) => {
    const data = dataTable.rowsHash(); // Converts the table into a key-value object
    for (const [key, value] of Object.entries(data)) {
        const stringValue = value.toString(); // Ensure the value is a string
        switch (key) {
            case 'Current Age':
                await LoginPage.inputCurrentAge.setValue(stringValue);
                await browser.maximizeWindow();
                await browser.pause(6000); 
                break;
            case 'Retirement Age':
                await LoginPage.inputRetireAge.setValue(stringValue);
                break;
            case 'Current Salary':
                await commonUtils.setValue(LoginPage.inputCurrentSalary, stringValue);
                break;
            case 'Spouse Salary':
                await commonUtils.setValue(LoginPage.inputSpouseSalary, stringValue);
                break;
            case 'Current Savings':
                await commonUtils.setValue(LoginPage.inputcurrentRetirementSaving, stringValue);
                await browser.pause(5000);
                await takeScreenshot("Input Data1"); 
                break;
            case 'Retirement Contribution':
                await LoginPage.inputRetirementContribution.setValue(stringValue);
                break;
            case 'Increase Rate':
                await LoginPage.inputRateContribution.setValue(stringValue);
                await browser.pause(2000);
                break;
            case 'Social Security benefits': 
                if (value === 'Yes') {
                    await commonUtils.clickJS(LoginPage.YesSocialSecurity);
                }
                else if (value === 'No') {
                    await commonUtils.clickJS(LoginPage.NoSocialSecurity);
                }
                break; 
            case 'Marital Status':
                if (value === 'Single') {
                    if (await LoginPage.MaritalStatusSingle.isClickable()){
                        await commonUtils.clickJS(LoginPage.MaritalStatusSingle);
                    }
                }
                else if (value === 'Married') {
                    if (await LoginPage.MaritalStatusMarried.isClickable()){
                        await commonUtils.clickJS(LoginPage.MaritalStatusMarried);
                    }
                }
                break;   
            case 'SS override amount':
                if (await LoginPage.SecurityOverride.isClickable()){  
                    await commonUtils.setValue(LoginPage.SecurityOverride, stringValue);}
                    console.log("SS override amount is  displayed");
                    await browser.pause(6000);
                    await takeScreenshot("Input Data3");
                break;    
            default:
                break;
        }
        }
});

Then(/^I should validate the results$/, async () => {
    await takeScreenshot("Input Data2");   
    await browser.pause(5000);
    await LoginPage.btnSubmit.click();
    await browser.pause(5000);
    const msg = await LoginPage.message.getText();
    if (msg.includes('Congratulations!')){
        console.log(chalk.green(msg));
        await takeScreenshot("Postive Results");
        expect(msg).toContain('Congratulations!');
        await LoginPage.editInfo.click();
        await browser.pause(5000);
    }
    else {
        await takeScreenshot("Negative Results");
        console.log(chalk.red(msg));
        await LoginPage.editInfo.click();
    }
}
);

Then(/^validate  Social Security Additional fields are hidden/, async () => {
    if (await LoginPage.MaritalStatusMarried.isClickable() && await LoginPage.SecurityOverride.isClickable()){ 
        console.log(chalk.blue("Social Security Override and Martial status is displayed"));}

    else {
        console.log(chalk.blue("Social Security Override and Martial status is not displayed"));        
    }
    });

Then(/^validate message displayed (.*)$/, async (message) => {
    await takeScreenshot("Input Data2");   
    // await browser.pause(5000);
    await LoginPage.btnSubmit.click();
    await browser.pause(5000);
    await expect(LoginPage.errorMessage).toBeExisting();
    const m1= await LoginPage.errorMessage.getText();
    // console.log(message)
    //   expect(await LoginPage.errorMessage.getText()).toHaveTextContaining(message);
    await takeScreenshot("Error Message");
    if(message.includes('Planned retirement age must be')){
        await browser.pause(5000); 
        const m2 = await LoginPage.errorMessage1.getText(); 
        expect(m2).toContain(message);
    }
    else {
        expect(m1).toContain(message);}
    });

When(/^I update below values on default calculator page$/, async (dataTable) => {
    await commonUtils.clickJS(LoginPage.adjustDefaultValues);
    const data = dataTable.rowsHash(); // Converts the table into a key-value object
    for (const [key, value] of Object.entries(data)) {
        const stringValue = value.toString(); // Ensure the value is a string
        await browser.pause(5000);
        switch (key) {
            case 'Other Income':
                await commonUtils.setValue(LoginPage.inputAdditionalIncome, stringValue);
                await browser.pause(2000);
                break;
            case 'Retirement Duration':
                console.log(stringValue);
                await commonUtils.setValue(LoginPage.inputRetirementDuration, stringValue);
                break;
            case 'Retirement Annual Income': 
                await LoginPage.inputRetirementAnnualIncome.setValue(stringValue);
                break;
            case 'Pre-retirement investment':
                await LoginPage.inputPreRetirementROI.setValue(stringValue);
                break;
            case 'Post-retirement investment':
                await LoginPage.inputPostRetirementROI.setValue(stringValue);
                await browser.pause(2000);
                await takeScreenshot("Input Data3");
                await LoginPage.buttonSaveChanges.click();
                await browser.pause(5000);
                break;
            default:
                break;       
            }
    }
}   );
