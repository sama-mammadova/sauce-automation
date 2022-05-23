import {CheckoutForm} from "../components/CheckoutForm";
import {Cart} from "../components/cart";
import {Product} from "../components/product";

describe('Purchase flow validation', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login()
        //add to cart
        Product.items().eq(0).find(Product.queries.addToCart).click()
        //go to cart
        Product.goToCartButton().click()
        //checkout
        Cart.checkoutButton().click()
    })
    //Checkout information fields validation
    it('First name is required', () => {

        //fill in fields
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        CheckoutForm.errorLabel().should('contain.text', "Error: First Name is required")
    })

    it('Last name is required', () => {
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.postalCodeInput().type("11111")
        CheckoutForm.continueButton().click()
        CheckoutForm.errorLabel().should('contain.text', "Error: Last Name is required")
    })

    it('Postal code is required', () => {
        //fill in fields
        CheckoutForm.firstNameInput().type("Sama")
        CheckoutForm.lastNameInput().type("Mammadova")
        CheckoutForm.continueButton().click()
        CheckoutForm.errorLabel().should('contain.text', "Error: Postal Code is required")
    })

})