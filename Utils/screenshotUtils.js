import fs from 'fs';
import path from 'path';
import { browser } from '@wdio/globals';

export const takeScreenshot = async (name) => {
    try {
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
        await browser.saveScreenshot(`./screenshots/${name}_${timestamp}.png`);
    } catch (error) {
        console.error(`Failed to take screenshot: ${error}`);
    }
};
