describe('Purchase flow', () => {
    beforeEach(()=> {
        cy.visit('/')
        cy.login()
    })

    it('Purchase one item', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //check if it is added
        cy.get('.cart_item').should('have.length', 1)
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

    it('Purchase two items', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        cy.get('#header_container .title').should('have.text', 'Your Cart')
        //check if items are added
        cy.get('.cart_item').should('have.length', 2)
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

})