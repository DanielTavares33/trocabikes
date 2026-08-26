Feature: Edit bike listing
  As a bike owner
  I want to edit my listing
  So that I can keep details accurate

  Scenario: Seller updates a listing title
    Given I am signed in as the seller
    When I start selling a bike
    And I fill in a new bike listing with key "edit-target"
    And I publish the bike listing
    And I open my bikes
    And I edit the bike with key "edit-target" to title key "edit-target-updated"
    Then I should be on the bike detail page for key "edit-target-updated"
