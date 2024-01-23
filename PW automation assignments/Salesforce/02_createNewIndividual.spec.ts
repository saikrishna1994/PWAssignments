import {test, chromium, expect} from "@playwright/test";

test(`Create new individual`, async () => {

    const browser = await chromium.launch({ headless: false, channel: "chrome" });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const loginUsername = "h.saikrishna.94@gmail.com";
    const loginPassword = "SaiTLSF123";
    const individualSalutation = "Mr.";
    const individualFirstName = "Hari";
    const individualLastName = "Haran";

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

    //await page.pause();
    
    //clicking on Individual dropDown icon
    await page.waitForLoadState("load");
    await page.locator("div[class*=slds-p-right--x-small]").last().click();
    //Clicking on "+ New Individual" button
    await page.click('a[href*="Individual&save_new"]');

    /* //Selecting Salutation as MR.
    await page.click('div.salutation');
    await page.click('a[title="Mr."]');
    //Entering only Last Name
    await page.fill("input.lastName", individualLastName);
    //Clicking on Save
    await page.click('button[title="Save"]');

    //Validating the Toast message to see if new lead is created
    await expect(page.locator("div[class*='slds-theme--success']")).toContainText('was created');
    expect(await page.locator("div.slds-line-clamp").innerText()).toBe(individualSalutation +" "+ individualLastName);

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
    await browser.close(); */
})