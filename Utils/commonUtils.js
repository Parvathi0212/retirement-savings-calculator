import { $ } from '@wdio/globals';
import { logger } from './logUtils.js';
import { timeOut } from './timeOutUtils.js';

export class CommonUtils {
    // async click(element) {
    //     await element.waitForClickable();
    //     await element.click();
    // }

    // async clickJS(element) {
    //     await element.waitForClickable();
    //     await browser.execute("arguments[0].click();", await element);
    // }

    // async setValue(element, value) {
    //     await element.waitForEnabled();
    //     await element.setValue(value);
    // }

    async setValue(element, value) {
        try {
        await element.waitForDisplayed({timeout : timeOut.MEDIUM});
        await element.waitForClickable({timeout : timeOut.MEDIUM});
        await element.click();
        await element.setValue(value);
        }
        catch (error){
            logger.error('Failed to set value to the Webelement' + error);
        }
    }

    /**
    * Clicks on a specified element.
    */
    async click(element){
        try {
        await element.waitForDisplayed({timeout : timeOut.LONG});
        await element.waitForClickable({timeout: timeOut.LONG});
        await element.click();
    }
    catch (error){
        logger.error('Failed to click the Webelement' + element);
    }
    }

    /**
    * Clicks on a specified element using javascript.
    */
    async clickJS(element){
        try {
        await element.waitForDisplayed({timeout: timeOut.MEDIUM });
        await browser.execute((e1) => e1.click(), await element);
    }
    catch (error){
        console.log("Error");
        logger.error('Failed to click the Webelement' + element);
    }
    }

    async getText(element){
        try {
        await element.waitForDisplayed({timeout: timeOut.MEDIUM});
        return await element.getText();
    }
    catch (error){
        console.log("Error");
        logger.error('Failed to get text for the Webelement' + element);
    }
    }
}

export const commonUtils = new CommonUtils();