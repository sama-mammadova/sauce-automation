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

    it('Purchase multiple items', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        //check if items are added
        cy.get('.cart_item').should('have.length', 2)
        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Sama')
        cy.get('[data-test="lastName"]').type('Mammadova')
        cy.get('[data-test="postalCode"]').type('11111')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.location('pathname').should('be.eq', '/checkout-complete.html')
    })
    
    it('Remove item from card', () => {
        //add to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        //go to cart
        cy.get('#shopping_cart_container').click()
        cy.get('.cart_item').should('have.length', 2)
        //remove item
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        //check item is removed
        cy.get('.cart_item').should('have.length', 1)
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
        cy.get('[data-test="firstName"]')
        cy.get('[data-test="lastName"]').type("Mammadova")
        cy.get('[data-test="postalCode"]').type("11111")
        cy.get('[data-test="continue"]').click()
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
        cy.get('[data-test="firstName"]').type("Sama")
        cy.get('[data-test="lastName"]')
        cy.get('[data-test="postalCode"]').type("11111")
        cy.get('[data-test="continue"]').click()
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
        cy.get('[data-test="firstName"]').type("Sama")
        cy.get('[data-test="lastName"]').type("Mammadova")
        cy.get('[data-test="postalCode"]')
        cy.get('[data-test="continue"]').click()
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
        cy.get('[data-test="firstName"]').type(" ")
        cy.get('[data-test="lastName"]').type("Mammadova")
        cy.get('[data-test="postalCode"]').type("11111")
        cy.get('[data-test="continue"]').click()
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
        cy.get('[data-test="firstName"]').type("Sama")
        cy.get('[data-test="lastName"]').type(" ")
        cy.get('[data-test="postalCode"]').type("11111")
        cy.get('[data-test="continue"]').click()
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
        cy.get('[data-test="firstName"]').type("Sama")
        cy.get('[data-test="lastName"]').type("Mammadova")
        cy.get('[data-test="postalCode"]').type(" ")
        cy.get('[data-test="continue"]').click()
        cy.location('pathname').should('not.be.eq', '/checkout-step-two.html')
    })

})