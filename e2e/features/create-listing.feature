Feature: Seller publishes a listing
  A verified seller can list a bike for sale from My Bikes.

  Scenario: Seller publishes a new bike listing
    Given I am signed in as the seller
    When I publish a new listing
    Then I should see the published listing
