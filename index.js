const playwright = require('playwright');
const chalk = require('chalk');

const log = console.log;

async function main(headless = true) {
    const browser = await playwright.chromium.launch({
        headless: headless
    });

    const page = await browser.newPage();

    await page.goto('https://www.mtvema.com/de-de/wahl/bestgermanact/');

    // Check if voting buttons are visible
    await page.waitForFunction(() => {
        const buttons = document.querySelectorAll('.elements-accordion-components-item-styles_button_Nae_sr9iGBxv0mK2bG9iD.sc-bZQynM.etYaFo');
        return buttons.length > 0;
    });

    const selector = 'div.elements-accordion-components-item-styles_item_3UqYKLNwlTA3-XlJkgIjHA:nth-child(4) > .elements-accordion-components-item-styles_button_Nae_sr9iGBxv0mK2bG9iD';

    // Check if we have selected the correct button (style it pink)
    log(`🕵️Check if we have selected the right element`);

    await page.waitForFunction((selector) => {
        const button = document.querySelector(selector);

        // Change color to make sure we have selected the right button
        button.style.background = 'deeppink';

        return button !== null && button.parentElement.querySelectorAll('img')[0].alt === 'Fynn Kliemann';
    }, selector);

    log(`✅  ${chalk.green('Found button for Fynn')}`);

    await page.click(selector);

    log(`🎉 ${chalk.cyan('Vote for Fynn')} ${chalk.underline('#javascriptfürfynn')} ${chalk.underline('#ventilatorfürfynn')}`);

    await page.waitForTimeout(1000);

    console.log('------------------------------------------------------');

    browser.close();

    main();
}

main(false);