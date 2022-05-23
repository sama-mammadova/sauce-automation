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