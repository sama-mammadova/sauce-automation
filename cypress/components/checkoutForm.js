export class CheckoutForm {
    static firstName() {
        return cy.get('[data-test="firstName"]')
    }

    static lastName() {
        return cy.get('[data-test="lastName"]')
    }

    static postalCode() {
        return cy.get('[data-test="postalCode"]')
    }

    static continueButton() {
        return cy.get('[data-test="continue"]')
    }
}