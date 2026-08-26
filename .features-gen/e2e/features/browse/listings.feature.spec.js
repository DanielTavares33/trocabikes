// Generated from: e2e/features/browse/listings.feature
import { test } from "playwright-bdd";

test.describe('Bike catalog', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('there are seeded bikes in the catalog', null, { page }); 
  });
  
  test('Visitor opens a bike detail page', async ({ When, Then, page }) => { 
    await When('I click the bike card "Canyon Spectral CF 7"', null, { page }); 
    await Then('I should be on the bike detail page for "Canyon Spectral CF 7"', null, { page }); 
  });

  test('Visitor filters bikes by brand', async ({ When, Then, And, page }) => { 
    await When('I filter bikes by brand "Canyon"', null, { page }); 
    await Then('I should see the bike "Canyon Spectral CF 7"', null, { page }); 
    await And('I should not see the bike "Trek Domane SL 5"', null, { page }); 
    await When('I clear bike filters', null, { page }); 
    await Then('I should see "3" bikes found', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/browse/listings.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given there are seeded bikes in the catalog","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I click the bike card \"Canyon Spectral CF 7\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Canyon Spectral CF 7\"","children":[{"start":23,"value":"Canyon Spectral CF 7","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should be on the bike detail page for \"Canyon Spectral CF 7\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Canyon Spectral CF 7\"","children":[{"start":41,"value":"Canyon Spectral CF 7","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given there are seeded bikes in the catalog","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I filter bikes by brand \"Canyon\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Canyon\"","children":[{"start":25,"value":"Canyon","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should see the bike \"Canyon Spectral CF 7\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Canyon Spectral CF 7\"","children":[{"start":23,"value":"Canyon Spectral CF 7","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And I should not see the bike \"Trek Domane SL 5\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Trek Domane SL 5\"","children":[{"start":27,"value":"Trek Domane SL 5","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I clear bike filters","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then I should see \"3\" bikes found","stepMatchArguments":[{"group":{"start":13,"value":"\"3\"","children":[{"start":14,"value":"3","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end