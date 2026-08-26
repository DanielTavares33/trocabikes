// Generated from: e2e/features/browse/home.feature
import { test } from "playwright-bdd";

test.describe('Home page', () => {

  test('Visitor opens the bike catalog from home', async ({ Given, When, Then, page }) => { 
    await Given('I am on the home page', null, { page }); 
    await When('I click "Browse bikes"', null, { page }); 
    await Then('I should see the heading "Browse bikes"', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/browse/home.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I click \"Browse bikes\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Browse bikes\"","children":[{"start":9,"value":"Browse bikes","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should see the heading \"Browse bikes\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Browse bikes\"","children":[{"start":26,"value":"Browse bikes","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end