// Generated from: e2e/features/auth/sign-in.feature
import { test } from "playwright-bdd";

test.describe('Sign in', () => {

  test('Buyer signs in successfully', async ({ When, Then, page }) => { 
    await When('I sign in as the buyer', null, { page }); 
    await Then('I should see the account menu', null, { page }); 
  });

  test('Invalid credentials show an error', async ({ When, Then, page }) => { 
    await When('I sign in with invalid credentials', null, { page }); 
    await Then('I should see the error "The provided credentials do not match our records."', null, { page }); 
  });

  test('Unverified user cannot sign in', async ({ When, Then, page }) => { 
    await When('I sign in as the unverified user', null, { page }); 
    await Then('I should see the error "Please verify your email address before signing in."', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/auth/sign-in.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I sign in as the buyer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the account menu","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I sign in with invalid credentials","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should see the error \"The provided credentials do not match our records.\"","stepMatchArguments":[{"group":{"start":23,"value":"\"The provided credentials do not match our records.\"","children":[{"start":24,"value":"The provided credentials do not match our records.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I sign in as the unverified user","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see the error \"Please verify your email address before signing in.\"","stepMatchArguments":[{"group":{"start":23,"value":"\"Please verify your email address before signing in.\"","children":[{"start":24,"value":"Please verify your email address before signing in.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end