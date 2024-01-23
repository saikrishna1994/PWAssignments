import { test, chromium, expect } from "@playwright/test"

test(`Create a new Lead in Salesforce`, async () => {

    const browser = await chromium.launch({ headless: false, channel: "chrome" });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const loginUsername = "h.saikrishna.94@gmail.com";
    const loginPassword = "SaiTLSF123";
    const leadsalutation = "Mr.";
    const leadFirstName = "Sai";
    const leadLastName = "Krishna";
    const leadCompany = "Testleaf";

    //Test steps
    await page.goto("https://developer224-dev-ed.develop.my.salesforce.com");
    console.log(`URL is ${page.url()}`);
    await expect(page).toHaveURL("https://developer224-dev-ed.develop.my.salesforce.com");

    //Login
    await page.fill("input#username", loginUsername);
    await page.fill("input#password", loginPassword);
    await page.click("input#Login");

    //Clicking on Toggle Menu Button
    await page.locator("div.slds-icon-waffle").click();

    //Clicking on View All
    //await page.getByRole('button', { name: 'View All' }).click();
    await page.locator("text=View All").click();
   
    //Clicking on Sales from App Launcher
    await page.click('[data-name="Sales"]');

    //Clicking on Leads button
    await page.locator("a[title='Leads']").waitFor();
    await page.locator("a[title='Leads']").click();

    //Clicking on New button to create a new lead
    await page.getByRole('button', { name: 'New' }).click();

    //Entering Lead details in Modal Pop-up
    await page.click('button[name="salutation"]');
    await page.click('[title="Mr."]');
    await page.fill("input[name='firstName']", leadFirstName);
    await page.fill("input[name='lastName']", leadLastName);
    await page.fill('input[name="Company"]', leadCompany);
    await page.click("button[name='SaveEdit']");

    //Validating the Toast message to see if new lead is created
    await expect(page.locator("div[class*='slds-theme--success']")).toContainText('was created');
    
    //Validating the full name of the new lead
    const leadFullNameName = await page.locator('[name="primaryField"]').textContent();
    expect(leadFullNameName).toBe(leadsalutation + " " + leadFirstName + " " + leadLastName); 
    
    //closing the browser
    await browserContext.close();
    await browser.close();
})