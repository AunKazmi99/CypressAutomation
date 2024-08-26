class ProductPage {
    checkoutButton() {
        return cy.get('a.nav-link.btn.btn-primary')
    }

    checkoutSuccessButton() {
        return cy.get('.btn.btn-success')
    }

    countryEditBox() {
        return cy.get('#country')
    }

    suggestionPakistan() {
        return cy.get('.suggestions a', { timeout: 10000})
    }

    termsAndConditionCheckbox() {
        return cy.get('input[id="checkbox2"]')
    }

    purchaseButton() {
        return cy.get('.btn.btn-success.btn-lg')
    }

    successMessage() {
        return cy.get('.alert strong')
    }

    individualTotalPrice() {
        return cy.get('tr td:nth-child(4) strong')
    }

    totalPrice() {
        return cy.get('td[class="text-right"] h3 strong')
    }
}

export default ProductPage