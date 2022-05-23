import {CheckoutForm} from "../components/CheckoutForm";

describe('Purchase flow validation', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login()
    })
    //Checkout information fields validation
    it('First name is required', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName()
        CheckoutForm.lastName().type("Mammadova")
        CheckoutForm.postalCode().type("11111")
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: First Name is required")

    })

    it('Last name is required', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName().type("Sama")
        CheckoutForm.lastName()
        CheckoutForm.postalCode().type("11111")
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: Last Name is required")
    })

    it('Postal code is required', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName().type("Sama")
        CheckoutForm.lastName().type("Mammadova")
        CheckoutForm.postalCode()
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: Postal Code is required")
    })

    it('Checkout should fail with empty first name', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName().type(" ")
        CheckoutForm.lastName().type("Mammadova")
        CheckoutForm.postalCode().type("11111")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })

    it('Checkout should fail with empty last name', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName().type("Sama")
        CheckoutForm.lastName().type(" ")
        CheckoutForm.postalCode().type("11111")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })

    it('Checkout should fail with empty postal code', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        cy.get('[data-test="checkout"]').click()
        //fill in fields
        CheckoutForm.firstName().type("Sama")
        CheckoutForm.lastName().type("Mammadova")
        CheckoutForm.postalCode().type(" ")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })
})