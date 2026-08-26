Feature: Sign out
  As a signed-in user
  I want to sign out
  So that my session ends on this device

  Scenario: Buyer signs out
    Given I am signed in as the buyer
    When I sign out from the account menu
    Then I should see the sign in link in the navbar
