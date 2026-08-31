@listings @seller
Feature: Seller manages listings
  A verified seller can update or remove bikes they own.

  Background:
    Given I am signed in as the seller

  Scenario: Seller updates a listing
    When I edit my bike "trek-fuel-ex-8"
    And I update the listing price to "1500"
    Then I should see the listing price "1500"

  Scenario: Seller deletes a listing
    When I publish a new listing
    Then I should see the published listing
    When I delete my published listing
    Then I should not see my published listing
