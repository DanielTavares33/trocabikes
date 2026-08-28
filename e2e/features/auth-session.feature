Feature: Seller signs in and out
  A verified seller can open a session from the navbar and end it from the account menu.

  Scenario: Seller signs in from the navbar
    Given I am a guest
    And I am on the home page
    When I sign in as the seller
    Then I should be signed in

  Scenario: Seller signs out from the account menu
    Given I am signed in as the seller
    When I sign out
    Then I should be signed out
