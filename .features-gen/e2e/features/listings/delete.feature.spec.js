// Generated from: e2e/features/listings/delete.feature
import { test } from "playwright-bdd";

test.describe('Delete bike listing', () => {

  test('Seller deletes a listing', async ({ Given, When, Then, And, page }) => { 
    await Given('I am signed in as the seller', null, { page }); 
    await When('I open my bikes', null, { page }); 
    await And('I delete the bike "Trek Domane SL 5"', null, { page }); 
    await Then('the bike "Trek Domane SL 5" should not appear in my bikes', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('before', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/listings/delete.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am signed in as the seller","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When I open my bikes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I delete the bike \"Trek Domane SL 5\"","stepMatchArguments":[{"group":{"start":18,"value":"\"Trek Domane SL 5\"","children":[{"start":19,"value":"Trek Domane SL 5","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the bike \"Trek Domane SL 5\" should not appear in my bikes","stepMatchArguments":[{"group":{"start":9,"value":"\"Trek Domane SL 5\"","children":[{"start":10,"value":"Trek Domane SL 5","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end