import { test, chromium, expect  } from "@playwright/test";

test('Create new lead in LeafTaps application',async () => {

    //setup
    const browser = await chromium.launch({headless:false, channel:"chrome"});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const loginUsername = "Demosalesmanager";
    const loginPassword = "crmsfa";
    const companyName = "TestLeaf"
    const leadFirstName = "Sai"
    const leadLastName = "Krishna"

    //launch browser with url
    await page.goto("http://leaftaps.com/opentaps/control/main");
    
    //Login
    await page.fill("#username", loginUsername);
    await page.fill("[id='password']", loginPassword);
    await page.click(".decorativeSubmit");

    //Click CRM/SFA
    await page.click("text=CRM/SFA");

    //Click on Leads tab
    await page.click("a[href*='leadsMain']");
    //Click on Create Lead
    await page.click("a[href*='createLeadForm']");
    //Enter Company Name
    await page.fill("#createLeadForm_companyName", companyName);
    //Enter First Name
    await page.fill("#createLeadForm_firstName",leadFirstName);
    //Enter Last Name
    await page.fill("#createLeadForm_lastName",leadLastName);
    //Select Source usng label
    await page.locator('[name="dataSourceId"]').selectOption({label: "Existing Customer"});
    //Select Marketing Campaign by value
    await page.locator('[name="marketingCampaignId"]').selectOption("CATRQ_CAMPAIGNS");
    //Select Industry by label
    await page.locator('[name="industryEnumId"]').selectOption({label: "Computer Software"});
    //Selecting Preferred Currency using only .selectOption() method
    await page.selectOption("#createLeadForm_currencyUomId", {label:'DKK - Danish Krone'});
    //Clicking on Create Lead button - Submitting the form
    await page.click('[name="submitButton"]');

    await page.pause()

    /* Editing or Modifying the existing record or Lead */
    
    //Clicking on Edit button
    //await page.click("text = Edit");
    await page.click('a[href*="updateLeadForm"]');
    //Selecting Ownership using only .selectOption() method
    await page.selectOption("#updateLeadForm_ownershipEnumId",{label: "Partnership"});
    //Click on Update to save the modifications
    await page.click('[value="Update"]');

    await page.pause()
})