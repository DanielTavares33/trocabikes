// Generated from: e2e/features/auth/sign-out.feature
import { test } from "playwright-bdd";

test.describe('Sign out', () => {

  test('Buyer signs out', async ({ Given, When, Then, page }) => { 
    await Given('I am signed in as the buyer', null, { page }); 
    await When('I sign out from the account menu', null, { page }); 
    await Then('I should see the sign in link in the navbar', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/auth/sign-out.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am signed in as the buyer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I sign out from the account menu","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should see the sign in link in the navbar","stepMatchArguments":[]}]},
]; // bdd-data-end