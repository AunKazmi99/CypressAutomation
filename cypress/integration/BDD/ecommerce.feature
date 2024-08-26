Feature: End to End Ecommerce Validation

    Application Regression
    @Regression
    Scenario: Ecommerce Product Delivery
    Given I Open the ECommerce Page
    When I add items to the cart
    And Validate the total prices
    Then Select the country, submit and verify the success message

    @Smoke
    Scenario: Filling the form to Shop
    Given I Open the ECommerce Page
    When I fill the form details
    | name | gender | email            |
    | Aun  | Male   | hello@cypress.io |
    Then Validate the form behavior
    And Select the Shop Page