describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);
  //toContain()

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
	let str = await page.click('journal-entry');
	expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
	await page.waitForSelector('h1');
	expect(await page.evaluate(() => document.querySelector('h1').textContent)).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
    */
	await page.waitForSelector("body > entry-page");
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > h2").textContent)).toBe('You like jazz?');
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > p").textContent)).toBe("4/25/2021");
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-content-section > p").textContent)).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").getAttribute("src"))).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > img").getAttribute("alt"))).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
	await page.waitForSelector("body");
	expect(await page.evaluate(() => document.querySelector("body").getAttribute("class"))).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
	//await page.waitForSelector("body > header");
	await page.click("body > header > img");
	expect(page.url()).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
	await page.url("127.0.0.1:5500/#settings");
	expect(await page.evaluate(() => document.querySelector("body > header > h1").textContent)).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
	await page.url("127.0.0.1:5500/#settings");
	expect(await page.evaluate(() => document.querySelector("body").getAttribute("class"))).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
	await page.url("http://127.0.0.1:5500/#settings");
	await page.evaluate(() => window.onhashchange = function() {
		expect(page.url()).toBe("http://127.0.0.1:5500/#entry1");
	});
  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
	// define and implement test11: Clicking the back button once should bring the user back to the home page
	await page.url("http://127.0.0.1:5500/#entry1");
	await page.evaluate(() => window.onhashchange = function() {
		expect(page.url()).toBe("http://127.0.0.1:5500");
	});
  });

  it('Test12: When the user if on the homepage, the header title should be "Journal Entries"', async() => {
  	// define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
	await page.goto('http://127.0.0.1:5500');
	expect(await page.evaluate(() => document.querySelector("body > header > h1").textContent)).toBe("Journal Entries");
  });

  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
	// define and implement test13: On the home page the <body> element should not have any class attribute 
	await page.goto('http://127.0.0.1:5500');
	await page.waitForSelector("body");
	expect(await page.evaluate(() => document.querySelector("body").getAttribute("class"))).toBe(null);
  });

  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
  	// define and implement test14: Verify the url is correct when clicking on the second entry
	await page.click("body > main > journal-entry:nth-child(2)");
	expect(await page.url()).toBe('http://127.0.0.1:5500/#entry2');
  });

  it('Test15: Verify the title is current when clicking on the second entry', async() => {
  	// define and implement test15: Verify the title is current when clicking on the second entry
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > h2").textContent)).toBe("Run, Forrest! Run!");
  });

  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-content-section > p").textContent)).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
  });

  // create your own test 17
  it('Test17: Verify the entry page date is correct when clicking on the second entry', async() => {
	// Verify the entry page date is correct when clicking on the second entry
	  	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > p").textContent)).toBe("4/26/2021");
	});

  // create your own test 18
  it('Test18: Verify the title is current when clicking on the third entry', async() => {
	//Verify the title is correct when clicking on the second entry
	await page.goto("http://127.0.0.1:5500");
	await page.click("body > main > journal-entry:nth-child(3)");
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > h2").textContent)).toBe("Ogres are like onions");
  });

  // create your own test 19
  it('Test19: Verify the contents is current when clicking on the third entry', async() => {
	//Verify the contents is correct when clicking on the second entry
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-content-section > p").textContent)).toBe("Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.");
  });

  // create your own test 20
  it('Test20: Verify the date is current when clicking on the third entry', async() => {
	//Verify the date is correct when clicking on the second entry
	expect(await page.evaluate(() => document.querySelector("body > entry-page").shadowRoot.querySelector("section > section.entry-title-section > p").textContent)).toBe("4/27/2021");
  });
  
});
