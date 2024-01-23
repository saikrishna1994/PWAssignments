import { test, chromium, expect } from "@playwright/test";

test(`Edit existing individual`, async () => {

    const browser = await chromium.launch({ headless: false, channel: "chrome" });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const loginUsername = "h.saikrishna.94@gmail.com";
    const loginPassword = "SaiTLSF123";
    const individualSalutation = "Mr.";
    const individualFirstName = "Hari";
    const individualLastName = "haran";
    const individualFullName = individualFirstName + " " + individualLastName;

    //Launching the browser and url
    await page.goto("https://developer224-dev-ed.develop.my.salesforce.com");
    console.log(`URL is ${page.url()}`);
    await expect(page).toHaveURL("https://developer224-dev-ed.develop.my.salesforce.com");

    //Login
    await page.fill("input#username", loginUsername);
    await page.fill("input#password", loginPassword);
    await page.click("input#Login");

    //Clicking on Toggle button
    await page.locator("div.slds-icon-waffle").click();

    //Clicking on View All button
    await page.getByRole('button', { name: 'View All' }).click();

    //Clicking on Individuals
    await page.click('[data-label="Individuals"]');

    //Enter the Individual to be searched in the search box
    await page.locator('[name="Individual-search-input"]').fill(individualLastName);
    //await page.locator("a[title='Hari haran']").click();

    //navigating through the table and clicking on the specified individual
    const individualTableRowsCount = await page.locator('table[role="grid"] tbody tr th').count();
    for (let i = 0; i < individualTableRowsCount; i++) {
        let rowValue = await page.locator('table[role="grid"] tbody tr th').nth(i).innerText();
        if (rowValue.includes(individualLastName)) {
            await page.locator('table[role="grid"] tbody tr th').nth(i).locator('a').click();
            break;
        }
    }

    //await page.pause();

    //Editing the newly created individual
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    //Entering first name
    await page.getByPlaceholder('First Name').fill(individualFirstName);
    //Clicking on Save button
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    //Validating the edit is saved successfully
    await expect(page.locator("div.slds-line-clamp")).toContainText(individualFirstName);
    
    //closing the browser
    await browserContext.close();
    await browser.close();
})