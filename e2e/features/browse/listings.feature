Feature: Bike catalog
  As a visitor
  I want to browse and filter bikes
  So that I can find listings that match my needs

  Background:
    Given the seeded catalog bikes are visible

  Scenario: Visitor opens a bike detail page
    When I click the bike card "Canyon Spectral CF 7"
    Then I should be on the bike detail page for "Canyon Spectral CF 7"

  Scenario: Visitor filters bikes by brand
    When I filter bikes by brand "Canyon"
    Then I should see the bike "Canyon Spectral CF 7"
    And I should not see the bike "Trek Domane SL 5"
    When I clear bike filters
    Then the seeded catalog bikes should be visible
