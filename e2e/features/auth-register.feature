Feature: Guest creates an account
  A guest can register and is asked to verify their email before using the marketplace.

  Scenario: Guest registers and sees the verification notice
    Given I am a guest
    And I am on the home page
    When I register with a unique email
    Then I should see the email verification notice for that address
