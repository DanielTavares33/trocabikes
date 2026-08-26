Feature: Create bike listing
  As a verified seller
  I want to publish a bike listing
  So that buyers can find my bike

  Scenario: Buyer publishes a new bike
    Given I am signed in as the buyer
    When I start selling a bike
    And I fill in a new bike listing with key "custom-gravel"
    And I publish the bike listing
    Then I should be on the bike detail page for key "custom-gravel"
