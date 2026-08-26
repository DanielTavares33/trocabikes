Feature: Delete bike listing
  As a bike owner
  I want to delete my listing
  So that it is removed from the marketplace

  Scenario: Seller deletes a listing
    Given I am signed in as the seller
    When I start selling a bike
    And I fill in a new bike listing with key "delete-target"
    And I publish the bike listing
    And I open my bikes
    And I delete the bike with key "delete-target"
    Then the bike with key "delete-target" should not appear in my bikes
