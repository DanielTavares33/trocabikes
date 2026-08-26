Feature: Edit bike listing
  As a bike owner
  I want to edit my listing
  So that I can keep details accurate

  Scenario: Seller updates a listing title
    Given I am signed in as the seller
    When I open my bikes
    And I edit the bike "Canyon Spectral CF 7" title to "Canyon Spectral CF 7 Updated"
    Then I should be on the bike detail page for "Canyon Spectral CF 7 Updated"
