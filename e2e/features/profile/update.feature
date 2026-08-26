Feature: Profile settings
  As a signed-in user
  I want to update my profile
  So that my account information stays current

  Scenario: Buyer updates profile details
    Given I am signed in as the buyer
    When I open my profile
    And I update my profile with a unique display name
    Then I should see a success toast "Profile updated successfully."
    And my profile should show my updated display name
