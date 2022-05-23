import {Cart} from "../components/cart";

describe('Purchase flow', () => {
    beforeEach(()=> {
        cy.visit('/')
        cy.login()
    })

    it('Purchase single item', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //check if it is added
        Cart.items().should('have.length', 1)
        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('#header_container .title').should('have.text', 'Checkout: Your Information')
        cy.get('[data-test="firstName"]').type('Sama')
        cy.get('[data-test="lastName"]').type('Mammadova')
        cy.get('[data-test="postalCode"]').type('11111')
        cy.get('[data-test="continue"]').click()
        cy.get('#header_container .title').should('have.text', 'Checkout: Overview')
        cy.get('[data-test="finish"]').click()
        cy.get('#header_container .title').should('have.text', 'Checkout: Complete!')
        cy.location('pathname').should('be.eq', '/checkout-complete.html')
    })

    it('Purchase multiple items', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').parent().find('.inventory_item_price').invoke('text').as('price1')
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').parent().find('.inventory_item_price').invoke('text').as('price2')

        //go to cart
        cy.get('#shopping_cart_container').click()
        //check if items are added
        Cart.items().should('have.length', 2)
        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Sama')
        cy.get('[data-test="lastName"]').type('Mammadova')
        cy.get('[data-test="postalCode"]').type('11111')
        cy.get('[data-test="continue"]').click()
        //check item total price
        cy.get('.summary_subtotal_label').invoke('text').then(subtotalText => {
            cy.get('@price1').then(price1Text => {
                cy.get('@price2').then(price2Text => {
                    let price1 = +price1Text.replace('$', '')
                    let price2 = +price2Text.replace('$', '')
                    let expectedSubtotal = price1 + price2
                    let subtotal = +subtotalText.replace('Item total: $', '')
                    expect(subtotal).to.be.eq(expectedSubtotal)
                })
            })
        })
        cy.get('[data-test="finish"]').click()
        cy.location('pathname').should('be.eq', '/checkout-complete.html')
    })
    
    it('Remove item from card', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').parent().find('.inventory_item_price').invoke('text').as('price1')
        //go to cart
        cy.get('#shopping_cart_container').click()
        Cart.items().should('have.length', 2)
        //remove item
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()
        //check item is removed
        Cart.items().should('have.length', 1)
        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Sama')
        cy.get('[data-test="lastName"]').type('Mammadova')
        cy.get('[data-test="postalCode"]').type('11111')
        cy.get('[data-test="continue"]').click()
        cy.get('.summary_subtotal_label').invoke('text').then(subtotalText => {
            cy.get('@price1').then(price1Text => {
                    let price1 = +price1Text.replace('$', '')
                    let subtotal = +subtotalText.replace('Item total: $', '')
                    expect(subtotal).to.be.eq(price1)
            })
        })
    })

    it('Checkout should fail when removing all items from cart', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //remove item
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        //check item is removed
        Cart.items().should('not.exist')
        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Sama')
        cy.get('[data-test="lastName"]').type('Mammadova')
        cy.get('[data-test="postalCode"]').type('11111')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.location('pathname').should('not.eq', '/checkout-complete.html')
    })

    
})