export class CheckoutForm {
    static firstNameInput() {
        return cy.get('[data-test="firstName"]')
    }

    static lastNameInput() {
        return cy.get('[data-test="lastName"]')
    }

    static postalCodeInput() {
        return cy.get('[data-test="postalCode"]')
    }

    static continueButton() {
        return cy.get('[data-test="continue"]')
    }
}