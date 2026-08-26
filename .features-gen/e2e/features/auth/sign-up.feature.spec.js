// Generated from: e2e/features/auth/sign-up.feature
import { test } from "playwright-bdd";

test.describe('Sign up', () => {

  test('Visitor registers and sees verification notice', async ({ When, Then, page }) => { 
    await When('I register with name "New User" and email "new-user@trocabikes.test"', null, { page }); 
    await Then('I should see the email verification notice', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/auth/sign-up.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I register with name \"New User\" and email \"new-user@trocabikes.test\"","stepMatchArguments":[{"group":{"start":21,"value":"\"New User\"","children":[{"start":22,"value":"New User","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"new-user@trocabikes.test\"","children":[{"start":43,"value":"new-user@trocabikes.test","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the email verification notice","stepMatchArguments":[]}]},
]; // bdd-data-end