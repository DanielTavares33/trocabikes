Feature: Sign up
  As a new visitor
  I want to create an account
  So that I can join the marketplace

  Scenario: Visitor registers and sees verification notice
    When I register with name "New User" and email "new-user@trocabikes.test"
    Then I should see the email verification notice
