import {CheckoutForm} from "../components/CheckoutForm";
import {Cart} from "../components/cart";

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
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput()
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: First Name is required")

    })

    it('Last name is required', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.lastNameInput()
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: Last Name is required")
    })

    it('Postal code is required', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.postalCodeInput()
        CheckoutForm.continueButton().click()
        cy.get('[data-test="error"]').should('contain.text', "Error: Postal Code is required")
    })

    it('Checkout should fail with empty first name', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput().type(" ")
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })

    it('Checkout should fail with empty last name', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.lastNameInput().type(" ")
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })

    it('Checkout should fail with empty postal code', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //checkout
        Cart.checkoutButton().click()
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.postalCodeInput().type(" ")
        CheckoutForm.continueButton().click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })
})