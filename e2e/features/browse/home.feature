Feature: Home page
  As a visitor
  I want to browse from the home page
  So that I can discover bikes quickly

  Scenario: Visitor opens the bike catalog from home
    Given I am on the home page
    When I click "Browse bikes"
    Then I should see the heading "Browse bikes"
