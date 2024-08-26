import HomePage from "../pageObjects/HomePage"
import ProductPage from "../pageObjects/ProductPage"

describe('Test Framework', function () {
    before(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })
    it('My First Test Case', function () {
        const homePage = new HomePage()
        const productPage = new ProductPage()
        cy.visit(Cypress.env('url') + 'angularpractice/')
        homePage.nameEditBox().type(this.data.name)
        homePage.emailEditBox().type(this.data.email)
        homePage.genderDropdown().select(this.data.gender).should('have.value', this.data.gender)
        homePage.twoWayDataBindingBox().should('have.value', this.data.name)
        homePage.entrepreneurCheckBox().should('not.be.enabled')
        homePage.entrepreneurCheckBox().should('be.disabled')
        homePage.nameEditBox().should('have.attr', 'minLength', '2')
        homePage.nameEditBox().then(function (text) {
            const minimumLength = text.prop('minLength')
            expect(minimumLength).to.equal(2)
        })
        homePage.shopTab().click()
        this.data.productName.forEach(function (element) {
            cy.selectProduct(element)
        })
        
        productPage.checkoutButton().click()

        var sum = 0
        var totalPrice = 0
        productPage.individualTotalPrice().each(($el, index, $list) => {
            const amount = $el.text()
            var res = amount.split(" ")
            res = res[1].trim()
            sum = sum + Number(res)
        }).then(function() {
            cy.log(sum)
        })
        productPage.totalPrice().then(function(price) {
            totalPrice = price.text().split(" ")
            totalPrice = totalPrice[1].trim()
            expect(Number(totalPrice)).to.equal(sum)
        })
        productPage.checkoutSuccessButton().click()
        productPage.countryEditBox().type('Pakistan')
        productPage.suggestionPakistan().click()
        productPage.termsAndConditionCheckbox().check({ force: true}).should('be.checked')
        productPage.purchaseButton().click()
        productPage.successMessage().should('have.text', 'Success!')
        productPage.successMessage().then(function(message) {
            const actualMessage = message.text()
            expect(actualMessage).include('Success!')
            expect(actualMessage.includes('Success!')).to.be.true
        })
    })
})