# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) 
   1. A

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   1. A unit test for a message feature would not work because writing and sending a message uses a lot of different components that would be interacting with each other.
   
3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   1. A unit test for max message length would work because it only tests one component.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   1. If it were true, I would expect it to run my tests with the browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   1. describe('Start tests at settings page ', () => {
		beforeAll(asynch () => {
			await page.url("http://127.0.0.1:5500/#settings");
			await page.waitForTimeout(500);
		})   
   	}