@browse @guest
Feature: Guest browses the marketplace

  Scenario: Guest sees recent bikes on home
    Given I am a guest
    When I visit the home page
    Then I should see the recent bike "trek-fuel-ex-8"

  Scenario: Guest opens the catalog from home
    Given I am on the home page
    When I open the catalog from home
    Then I should be on the catalog page
    And I should see the catalog bike "trek-fuel-ex-8"

  Scenario: Guest filters the catalog by brand
    Given I am on the catalog page
    When I filter the catalog by brand "trek"
    Then I should see the catalog bike "trek-fuel-ex-8"
    And I should not see the catalog bike "specialized-allez"

  Scenario: Guest filters the catalog by category
    Given I am on the catalog page
    When I filter the catalog by category "mountain-bikes-mtb"
    Then I should see the catalog bike "trek-fuel-ex-8"
    And I should not see the catalog bike "specialized-allez"

  Scenario: Guest opens a bike listing from the catalog
    Given I am on the catalog page
    When I open the catalog bike "trek-fuel-ex-8"
    Then I should be on the bike listing "trek-fuel-ex-8"
