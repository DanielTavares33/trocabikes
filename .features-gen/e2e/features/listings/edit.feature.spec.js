// Generated from: e2e/features/listings/edit.feature
import { test } from "playwright-bdd";

test.describe('Edit bike listing', () => {

  test('Seller updates a listing title', async ({ Given, When, Then, And, page }) => { 
    await Given('I am signed in as the seller', null, { page }); 
    await When('I open my bikes', null, { page }); 
    await And('I edit the bike "Canyon Spectral CF 7" title to "Canyon Spectral CF 7 Updated"', null, { page }); 
    await Then('I should be on the bike detail page for "Canyon Spectral CF 7 Updated"', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/listings/edit.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am signed in as the seller","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I open my bikes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I edit the bike \"Canyon Spectral CF 7\" title to \"Canyon Spectral CF 7 Updated\"","stepMatchArguments":[{"group":{"start":16,"value":"\"Canyon Spectral CF 7\"","children":[{"start":17,"value":"Canyon Spectral CF 7","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":48,"value":"\"Canyon Spectral CF 7 Updated\"","children":[{"start":49,"value":"Canyon Spectral CF 7 Updated","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should be on the bike detail page for \"Canyon Spectral CF 7 Updated\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Canyon Spectral CF 7 Updated\"","children":[{"start":41,"value":"Canyon Spectral CF 7 Updated","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end