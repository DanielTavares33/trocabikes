Feature: Seller manages their account
  A signed-in seller can open their profile and the list of bikes they own.

  Background:
    Given I am signed in as the seller

  Scenario: Seller opens their profile
    When I open my profile
    Then I should see the profile name "E2E Seller"

  Scenario: Seller opens my bikes
    When I open my bikes
    Then I should see my bike "trek-fuel-ex-8"
