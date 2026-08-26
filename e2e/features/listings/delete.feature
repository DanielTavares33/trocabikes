Feature: Delete bike listing
  As a bike owner
  I want to delete my listing
  So that it is removed from the marketplace

  Scenario: Seller deletes a listing
    Given I am signed in as the seller
    When I open my bikes
    And I delete the bike "Trek Domane SL 5"
    Then the bike "Trek Domane SL 5" should not appear in my bikes
