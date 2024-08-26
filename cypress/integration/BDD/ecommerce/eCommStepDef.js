import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pageObjects/HomePage";
import ProductPage from "../../pageObjects/ProductPage";


const homePage = new HomePage()
const productPage = new ProductPage()

Given('I Open the ECommerce Page', function(){
    cy.visit(Cypress.env('url') + 'angularpractice/')
})

When('I add items to the cart', function(){
    homePage.shopTab().click()
    this.data.productName.forEach(function (element) {
        cy.selectProduct(element)
    })
    productPage.checkoutButton().click()
})

Then('Validate the total prices', function(){
    var sum = 0
    var totalPrice = 0
    productPage.individualTotalPrice().each(($el, index, $list) => {
        const amount = $el.text()
        var res = amount.split(" ")
        res = res[1].trim()
        sum = sum + Number(res)
    })
    productPage.totalPrice().then(function (price) {
        totalPrice = price.text().split(" ")
        totalPrice = totalPrice[1].trim()
        expect(Number(totalPrice)).to.equal(sum)
    })
})

Then('Select the country, submit and verify the success message', function(){
    productPage.checkoutSuccessButton().click()
    productPage.countryEditBox().type('Pakistan')
    productPage.suggestionPakistan().click()
    productPage.termsAndConditionCheckbox().check({ force: true }).should('be.checked')
    productPage.purchaseButton().click()
    productPage.successMessage().should('have.text', 'Success!')
    productPage.successMessage().then(function (message) {
        const actualMessage = message.text()
        expect(actualMessage).include('Success!')
        expect(actualMessage.includes('Success!')).to.be.true
    })
})

When('I fill the form details', function(dataTable){
    homePage.nameEditBox().type(dataTable.rawTable[1][0])
    homePage.emailEditBox().type(dataTable.rawTable[1][2])
    homePage.genderDropdown().select(dataTable.rawTable[1][1])

    // homePage.nameEditBox().type(this.data.name)
    // homePage.emailEditBox().type(this.data.email)
    // homePage.genderDropdown().select(this.data.gender)
})

Then('Validate the form behavior', function(){
    homePage.genderDropdown().should('have.value', this.data.gender)
    homePage.twoWayDataBindingBox().should('have.value', this.data.name)
    homePage.entrepreneurCheckBox().should('not.be.enabled')
    homePage.entrepreneurCheckBox().should('be.disabled')
    homePage.nameEditBox().should('have.attr', 'minLength', '2')
    homePage.nameEditBox().then(function (text) {
        const minimumLength = text.prop('minLength')
        expect(minimumLength).to.equal(2)
    })
})

Then('Select the Shop Page', function(){
    homePage.shopTab().click()
})