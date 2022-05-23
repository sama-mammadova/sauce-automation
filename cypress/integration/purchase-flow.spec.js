import {Cart} from "../components/cart";
import {CheckoutForm} from "../components/checkoutForm";
import {Product} from "../components/product";
import {Header} from "../components/header";
import {CheckoutOverview} from "../components/checkoutOverview";

describe('Purchase flow', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login()
    })

    it('Purchase single item', () => {
        //pick the first item and add to cart
        Product.items().eq(0).find(Product.queries.addToCart).click()
        //go to cart
        Product.goToCartButton().click()
        Header.title().should('have.text', 'Your Cart')
        //check if it is added
        Cart.items().should('have.length', 1)
        //checkout
        Cart.checkoutButton().click()
        Header.title().should('have.text', 'Checkout: Your Information')
        CheckoutForm.firstNameInput().type('Sama')
        CheckoutForm.lastNameInput().type('Mammadova')
        CheckoutForm.postalCodeInput().type('11111')
        CheckoutForm.continueButton().click()
        Header.title().should('have.text', 'Checkout: Overview')
        CheckoutOverview.finishButton().click()
        Header.title().should('have.text', 'Checkout: Complete!')
        cy.location('pathname').should('be.eq', '/checkout-complete.html')
    })

    it('Purchase multiple items', () => {
        //add first two items to cart
        Product.items().eq(0).find(Product.queries.price).invoke('text').as('price1')
        Product.items().eq(0).find(Product.queries.addToCart).click()

        Product.items().eq(1).find(Product.queries.price).invoke('text').as('price2')
        Product.items().eq(1).find(Product.queries.addToCart).click()

        //go to cart
        Product.goToCartButton().click()
        //check if items are added
        Cart.items().should('have.length', 2)
        //checkout
        Cart.checkoutButton().click()
        CheckoutForm.firstNameInput().type('Sama')
        CheckoutForm.lastNameInput().type('Mammadova')
        CheckoutForm.postalCodeInput().type('11111')
        CheckoutForm.continueButton().click()

        //check if item total price calculation is correct
        CheckoutOverview.subtotalLabel().invoke('text').then(subtotalText => {
            cy.get('@price1').then(price1Text => {
                cy.get('@price2').then(price2Text => {
                    let subtotal = +subtotalText.replace('Item total: $', '')
                    let price1 = +price1Text.replace('$', '')
                    let price2 = +price2Text.replace('$', '')
                    let expectedSubtotal = price1 + price2
                    expect(subtotal).to.be.eq(expectedSubtotal)
                })
            })
        })
        CheckoutOverview.finishButton().click()
        cy.location('pathname').should('be.eq', '/checkout-complete.html')
    })

    it('Purchase after modifying cart', () => {
        //add to cart
        Product.items().eq(0).find(Product.queries.price).invoke('text').as('price1')
        Product.items().eq(0).find(Product.queries.addToCart).click()

        Product.items().eq(1).find(Product.queries.addToCart).click()
        //go to cart
        Product.goToCartButton().click()
        Cart.items().should('have.length', 2)
        //remove an item
        Cart.items().eq(1).find(Cart.queries.remove).click()
        //check item is removed
        Cart.items().should('have.length', 1)
        //checkout
        Cart.checkoutButton().click()
        CheckoutForm.firstNameInput().type('Sama')
        CheckoutForm.lastNameInput().type('Mammadova')
        CheckoutForm.postalCodeInput().type('11111')
        CheckoutForm.continueButton().click()
        CheckoutOverview.subtotalLabel().invoke('text').then(subtotalText => {
            cy.get('@price1').then(price1Text => {
                let price1 = +price1Text.replace('$', '')
                let subtotal = +subtotalText.replace('Item total: $', '')
                expect(subtotal).to.be.eq(price1)
            })
        })
    })

    it('Checkout should fail when removing all items from cart', () => {
        //add to cart
        Product.items().eq(0).find(Product.queries.addToCart).click()
        //go to cart
        Product.goToCartButton().click()
        //remove item
        Cart.items().eq(0).find(Cart.queries.remove).click()
        //check item is removed
        Cart.items().should('not.exist')
        //checkout
        Cart.checkoutButton().click()
        cy.location('pathname').should('not.eq', '/checkout-step-one.html')
    })


})