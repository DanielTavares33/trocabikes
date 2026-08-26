Feature: Sign in
  As a marketplace user
  I want to sign in
  So that I can access my account

  Scenario: Buyer signs in successfully
    When I sign in as the buyer
    Then I should see the account menu

  Scenario: Invalid credentials show an error
    When I sign in with invalid credentials
    Then I should see the error "The provided credentials do not match our records."

  Scenario: Unverified user cannot sign in
    When I sign in as the unverified user
    Then I should see the error "Please verify your email address before signing in."
