class HomePage {
    nameEditBox() {
        return cy.get("form input[name='name']")
    }

    emailEditBox() {
        return cy.get("form input[name='email']")
    }

    twoWayDataBindingBox() {
        return cy.get('h4 input[name="name"]')
    }

    genderDropdown() {
        return cy.get('select')
    }

    entrepreneurCheckBox() {
        return cy.get('#inlineRadio3')
    }

    shopTab() {
        return cy.get('a[href*="shop"]')
    }
}

export default HomePage