// Generated from: e2e/features/profile/update.feature
import { test } from "playwright-bdd";

test.describe('Profile settings', () => {

  test('Buyer updates profile details', async ({ Given, When, Then, And, page }) => { 
    await Given('I am signed in as the buyer', null, { page }); 
    await When('I open my profile', null, { page }); 
    await And('I update my profile name to "Updated Buyer"', null, { page }); 
    await Then('I should see a success toast "Profile updated successfully."', null, { page }); 
    await And('my profile should show the name "Updated Buyer"', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/profile/update.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am signed in as the buyer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I open my profile","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I update my profile name to \"Updated Buyer\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Updated Buyer\"","children":[{"start":29,"value":"Updated Buyer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see a success toast \"Profile updated successfully.\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Profile updated successfully.\"","children":[{"start":30,"value":"Profile updated successfully.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And my profile should show the name \"Updated Buyer\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Updated Buyer\"","children":[{"start":33,"value":"Updated Buyer","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end