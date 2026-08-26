// Generated from: e2e/features/listings/create.feature
import { test } from "playwright-bdd";

test.describe('Create bike listing', () => {

  test('Buyer publishes a new bike', async ({ Given, When, Then, And, page }) => { 
    await Given('I am signed in as the buyer', null, { page }); 
    await When('I start selling a bike', null, { page }); 
    await And('I fill in a new bike listing titled "Custom Gravel Build"', null, { page }); 
    await And('I publish the bike listing', null, { page }); 
    await Then('I should be on the bike detail page for "Custom Gravel Build"', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/listings/create.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am signed in as the buyer","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I start selling a bike","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I fill in a new bike listing titled \"Custom Gravel Build\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Custom Gravel Build\"","children":[{"start":37,"value":"Custom Gravel Build","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I publish the bike listing","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should be on the bike detail page for \"Custom Gravel Build\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Custom Gravel Build\"","children":[{"start":41,"value":"Custom Gravel Build","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end