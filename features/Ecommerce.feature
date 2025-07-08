Feature: Ecommerce Validations

    Feature Description
    @Regression
    Scenario: Placing the Order
    Given login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order is present in the order History

    @Validations
    Scenario Outline: Placing the Order
    Given login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username            | password    |
    | anshika@gmail.com   | Iamking@000 |
    | hello@123.com       | Iamhello@12 |